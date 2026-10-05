import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/Icon";
import { QuizItem } from "@/data/mockQuizzes";
import { supabase } from "@/lib/supabase";

interface GenerateQuizModalProps {
  visible: boolean;
  onClose: () => void;
  onQuizGenerated: (newQuiz: QuizItem) => void;
  currentQuizCount?: number;
  spaceId?: string;
}

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 50];
const DIFFICULTY_OPTIONS: QuizItem["difficulty"][] = [
  "Easy",
  "Medium",
  "Hard",
  "Mixed",
];

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://quzspace-backend.vercel.app/api/v1";

function normalizeQuizListItem(q: any = {}): QuizItem {
  const leaderboard = Array.isArray(q.leaderboard)
    ? q.leaderboard.map((e: any) => ({
        id: e.user_id || e.id || "",
        name: e.name || e.full_name || "Anonymous",
        score: e.score ?? e.percent ?? 0,
        avatarInitials: e.avatar_initials || e.avatarInitials || "??",
        avatarColor: e.avatar_color || e.avatarColor || "#242021",
        completedAt: e.completedAt || e.completed_at || "Just now",
      }))
    : [];
  const history = Array.isArray(q.history) ? q.history : [];
  const selectedTopics = Array.isArray(q.selected_topics)
    ? q.selected_topics
    : Array.isArray(q.selectedTopics)
      ? q.selectedTopics
      : undefined;
  return {
    id: q.id || q.quiz_id || `q-${Date.now()}`,
    title:
      q.title ||
      `Custom ${q.difficulty || "Mixed"} Quiz (${q.question_count || q.questionCount || 10} Qs)`,
    questionCount: q.question_count || q.questionCount || 10,
    difficulty: q.difficulty || "Mixed",
    selectedTopics,
    createdAt: "Just now",
    bestScore:
      typeof q.best_score === "number"
        ? q.best_score
        : typeof q.bestScore === "number"
          ? q.bestScore
          : null,
    attemptsCount: q.attempts_count ?? q.attemptsCount ?? 0,
    history,
    leaderboard,
  };
}

async function getAuthToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token ?? null;
  } catch {
    return null;
  }
}

async function fetchSpaceTopics(
  spaceId: string,
): Promise<{
  status: "ready" | "not_generated";
  topics: string[];
  retryAfterMs: number;
}> {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE}/spaces/${spaceId}/topics`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.status === 425) {
      return { status: "not_generated", topics: [], retryAfterMs: 2500 };
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json().catch(() => ({}));
    const data = json?.data ?? json;
    const topics = Array.isArray(data?.topics) ? data.topics : [];
    return {
      status: data?.status || topics.length > 0 ? "ready" : "not_generated",
      topics,
      retryAfterMs: data?.retry_after_ms ?? data?.retryAfterMs ?? 2500,
    };
  } catch (err) {
    return { status: "not_generated", topics: [], retryAfterMs: 2500 };
  }
}

async function generateQuizRequest(params: {
  spaceId: string;
  questionCount: number;
  difficulty: string;
  selectedTopics: string[];
  idempotencyKey: string;
}) {
  const token = await getAuthToken();
  const res = await fetch(
    `${API_BASE}/spaces/${params.spaceId}/quizzes/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": params.idempotencyKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        questionCount: params.questionCount,
        difficulty: params.difficulty,
        selectedTopics: params.selectedTopics,
      }),
    },
  );
  if (!res.ok) {
    const err: any = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  const json = await res.json().catch(() => ({}));
  return json?.quiz || json?.data || json;
}

export function GenerateQuizModal({
  visible,
  onClose,
  onQuizGenerated,
  currentQuizCount = 0,
  spaceId,
}: GenerateQuizModalProps) {
  const insets = useSafeAreaInsets();
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState<QuizItem["difficulty"]>("Easy");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<string[]>([]);
  const [topicsStatus, setTopicsStatus] = useState<
    "idle" | "loading" | "ready" | "not_generated" | "error"
  >("idle");
  const [pollToken, setPollToken] = useState(0);

  const loadTopics = useCallback(async () => {
    if (!spaceId) return;
    setTopicsStatus("loading");
    const res = await fetchSpaceTopics(spaceId);
    setTopics(res.topics || []);
    if (res.status === "ready" && (res.topics || []).length > 0) {
      setTopicsStatus("ready");
    } else {
      setTopicsStatus("not_generated");
    }
  }, [spaceId]);

  useEffect(() => {
    if (!visible) return;
    setSelected(new Set());
    setTopics([]);
    setTopicsStatus("idle");
    setError(null);
    void loadTopics();
  }, [visible, spaceId, pollToken, loadTopics]);

  useEffect(() => {
    if (!visible || topicsStatus !== "not_generated") return;
    const t = setTimeout(() => setPollToken((n) => n + 1), 2500);
    return () => clearTimeout(t);
  }, [visible, topicsStatus, pollToken]);

  const allSelected = selected.size === topics.length && topics.length > 0;

  const toggleTopic = (topic: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => {
      const all = prev.size === topics.length && topics.length > 0;
      return new Set(all ? [] : topics);
    });
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setError(null);

    const selectedTopics = allSelected ? [] : Array.from(selected);

    try {
      let normalized: QuizItem;
      if (spaceId) {
        const idemKey = `quiz-gen-${spaceId}-${questionCount}-${difficulty}-${selectedTopics.join("|")}-${Date.now()}`;
        const raw = await generateQuizRequest({
          spaceId,
          questionCount,
          difficulty,
          selectedTopics,
          idempotencyKey: idemKey,
        });
        normalized = normalizeQuizListItem(raw);
      } else {
        await new Promise((r) => setTimeout(r, 1200));
        normalized = {
          id: `q-${Date.now()}`,
          title: `Custom ${difficulty} Quiz (${questionCount} Qs)`,
          questionCount,
          difficulty,
          selectedTopics:
            selectedTopics.length > 0 ? selectedTopics : undefined,
          createdAt: "Just now",
          bestScore: null,
          attemptsCount: 0,
          history: [],
          leaderboard: [],
        };
      }
      onQuizGenerated(normalized);
      onClose();
    } catch (err: any) {
      setError(
        err?.status === 429
          ? "You've generated too many quizzes recently. Please wait a moment and try again."
          : err?.message ||
              "The AI service might be busy. Try again in a moment.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (isGenerating) return;
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: Math.max(insets.bottom, 16) + 16,
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "rgba(174, 171, 172, 0.25)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 12,
            width: "100%",
            maxHeight: "92%",
          }}
        >
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#e5e7eb",
              alignSelf: "center",
              marginBottom: 16,
            }}
          />

          <View className="flex-row items-center justify-between pb-3.5 border-b border-muted/20 mb-5">
            <View
              className="flex-row items-center gap-2.5"
              style={{ flex: 1, marginRight: 8 }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: "rgba(36, 32, 33, 0.08)",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name="help-circle-outline" size={20} color="#242021" />
              </View>

              <View style={{ flexShrink: 1 }}>
                <Text
                  className="text-base font-extrabold text-brand tracking-tight"
                  numberOfLines={1}
                >
                  Generate New Quiz
                </Text>
                <Text
                  className="text-[11px] font-semibold text-gray-400"
                  numberOfLines={1}
                >
                  {currentQuizCount}{" "}
                  {currentQuizCount === 1 ? "quiz" : "quizzes"} in this space
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-light items-center justify-center"
              style={{ flexShrink: 0 }}
            >
              <Icon name="close" size={16} color="#5d5a5b" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
            style={{ maxHeight: 480 }}
          >
            {!!error && (
              <View
                style={{
                  backgroundColor: "rgba(244, 63, 94, 0.07)",
                  borderWidth: 1,
                  borderColor: "rgba(244, 63, 94, 0.3)",
                  borderRadius: 14,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <Text className="text-xs font-extrabold text-rose-900">
                  Couldn't generate your quiz
                </Text>
                <Text className="text-[11px] text-rose-700/80 mt-1 leading-relaxed">
                  {error}
                </Text>
              </View>
            )}

            <View className="mb-5">
              <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2.5">
                Number of Questions
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  padding: 4,
                  borderRadius: 14,
                  backgroundColor: "#f3f4f6",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                {QUESTION_COUNT_OPTIONS.map((count) => {
                  const isSelected = questionCount === count;
                  return (
                    <TouchableOpacity
                      key={count}
                      onPress={() => setQuestionCount(count)}
                      activeOpacity={0.7}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        backgroundColor: isSelected ? "#ffffff" : "transparent",
                        borderWidth: 1,
                        borderColor: isSelected
                          ? "rgba(0, 0, 0, 0.08)"
                          : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: isSelected ? 1 : 0 },
                        shadowOpacity: isSelected ? 0.06 : 0,
                        shadowRadius: 2,
                        elevation: isSelected ? 1 : 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: isSelected ? "800" : "600",
                          color: isSelected ? "#242021" : "#737373",
                        }}
                      >
                        {count}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2.5">
                Difficulty Level
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  padding: 4,
                  borderRadius: 14,
                  backgroundColor: "#f3f4f6",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                {DIFFICULTY_OPTIONS.map((level) => {
                  const isSelected = difficulty === level;
                  return (
                    <TouchableOpacity
                      key={level}
                      onPress={() => setDifficulty(level)}
                      activeOpacity={0.7}
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        backgroundColor: isSelected ? "#ffffff" : "transparent",
                        borderWidth: 1,
                        borderColor: isSelected
                          ? "rgba(0, 0, 0, 0.08)"
                          : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: isSelected ? 1 : 0 },
                        shadowOpacity: isSelected ? 0.06 : 0,
                        shadowRadius: 2,
                        elevation: isSelected ? 1 : 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: isSelected ? "800" : "600",
                          color: isSelected ? "#242021" : "#737373",
                        }}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-6">
              <View className="flex-row items-baseline gap-1.5 mb-2.5">
                <Text className="text-xs font-bold uppercase tracking-wider text-brand">
                  Focus Topics
                </Text>
                <Text className="text-[11px] text-gray-400 font-medium">
                  (optional)
                </Text>
              </View>

              {topicsStatus === "loading" || topicsStatus === "idle" ? (
                <View className="flex flex-wrap flex-row gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <View
                      key={i}
                      style={{
                        height: 28,
                        width: 80 + ((i * 23) % 60),
                        borderRadius: 999,
                        backgroundColor: "#f3f4f6",
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </View>
              ) : topicsStatus === "not_generated" || topics.length === 0 ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(36, 32, 33, 0.14)",
                    backgroundColor: "rgba(36, 32, 33, 0.03)",
                    borderRadius: 14,
                    padding: 12,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Icon
                    name="list-outline"
                    size={18}
                    color="rgba(36,32,33,0.55)"
                  />
                  <View style={{ flex: 1 }}>
                    <Text className="text-xs font-extrabold text-brand/90">
                      Topics are still generating
                    </Text>
                    <Text className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      Once your files finish processing we'll surface them here.
                      Quiz will cover all content for now.
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  <View className="flex-row items-center gap-2 mb-2.5">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={toggleAll}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: allSelected
                          ? "#242021"
                          : "rgba(174,171,172,0.4)",
                        backgroundColor: allSelected ? "#242021" : "#ffffff",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "800",
                          color: allSelected ? "#f1f1f1" : "#5d5a5b",
                        }}
                      >
                        {allSelected
                          ? "All Topics"
                          : selected.size > 0
                            ? `${selected.size} selected`
                            : "Select Topics"}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-[11px] text-gray-400 font-semibold">
                      · {topics.length} available
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap gap-2">
                    {topics.map((t) => {
                      const isSelected = selected.has(t);
                      return (
                        <TouchableOpacity
                          key={t}
                          activeOpacity={0.7}
                          onPress={() => toggleTopic(t)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            paddingLeft: 10,
                            paddingRight: 8,
                            paddingVertical: 6,
                            borderRadius: 999,
                            borderWidth: 1,
                            borderColor: isSelected
                              ? "#242021"
                              : "rgba(174,171,172,0.4)",
                            backgroundColor: isSelected ? "#242021" : "#ffffff",
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{
                              maxWidth: 180,
                              fontSize: 11,
                              fontWeight: "800",
                              color: isSelected ? "#f1f1f1" : "#5d5a5b",
                            }}
                          >
                            {t}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: "800",
                              color: isSelected
                                ? "rgba(241,241,241,0.8)"
                                : "rgba(93,90,91,0.6)",
                              marginLeft: 2,
                            }}
                          >
                            {isSelected ? "✓" : "+"}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              )}
            </View>
          </ScrollView>

          <View className="gap-2.5">
            <TouchableOpacity
              onPress={handleGenerate}
              disabled={isGenerating}
              activeOpacity={0.8}
              style={{
                paddingVertical: 14,
                borderRadius: 14,
                backgroundColor: "#242021",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="#f1f1f1" />
              ) : (
                <>
                  <Icon name="sparkles" size={16} color="#fbbf24" />
                  <Text
                    className="text-xs font-bold text-light"
                    numberOfLines={1}
                  >
                    Generate Quiz
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleClose}
              disabled={isGenerating}
              activeOpacity={0.7}
              className="py-3 rounded-xl border border-muted/30 bg-gray-100/80 items-center justify-center"
            >
              <Text
                className="text-xs font-bold text-gray-700"
                numberOfLines={1}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GenerateQuizModal;
