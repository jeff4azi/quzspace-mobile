import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { QuizItem } from '@/data/mockQuizzes';

interface GenerateQuizModalProps {
  visible: boolean;
  onClose: () => void;
  onQuizGenerated: (newQuiz: QuizItem) => void;
  currentQuizCount?: number;
}

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 50];
const DIFFICULTY_OPTIONS: QuizItem['difficulty'][] = [
  'Easy',
  'Medium',
  'Hard',
  'Mixed',
];

export function GenerateQuizModal({
  visible,
  onClose,
  onQuizGenerated,
  currentQuizCount = 0,
}: GenerateQuizModalProps) {
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState<QuizItem['difficulty']>('Easy');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const newQuiz: QuizItem = {
        id: `q-${Date.now()}`,
        title: `Custom ${difficulty} Quiz (${questionCount} Qs)`,
        questionCount,
        difficulty,
        createdAt: 'Just now',
        bestScore: null,
        attemptsCount: 0,
        history: [],
        leaderboard: [],
      };

      onQuizGenerated(newQuiz);
      onClose();
    }, 1200);
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
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                paddingHorizontal: 24,
                paddingTop: 20,
                paddingBottom: 36,
                borderWidth: 1,
                borderColor: 'rgba(174, 171, 172, 0.25)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              {/* Top Drag Indicator */}
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#e5e7eb',
                  alignSelf: 'center',
                  marginBottom: 16,
                }}
              />

              {/* Header */}
              <View className="flex-row items-center justify-between pb-3.5 border-b border-muted/20 mb-5">
                <View className="flex-row items-center gap-2.5">
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      backgroundColor: 'rgba(36, 32, 33, 0.08)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="help-circle-outline" size={20} color="#242021" />
                  </View>

                  <View>
                    <Text className="text-base font-extrabold text-brand tracking-tight">
                      Generate New Quiz
                    </Text>
                    <Text className="text-[11px] font-semibold text-gray-400">
                      {currentQuizCount} {currentQuizCount === 1 ? 'quiz' : 'quizzes'} in this space
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  className="w-8 h-8 rounded-full bg-light items-center justify-center"
                >
                  <Icon name="close" size={16} color="#5d5a5b" />
                </TouchableOpacity>
              </View>

              {/* Number of Questions Section */}
              <View className="mb-5">
                <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2.5">
                  Number of Questions
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    borderRadius: 14,
                    backgroundColor: '#f3f4f6',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
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
                          backgroundColor: isSelected ? '#ffffff' : 'transparent',
                          borderWidth: 1,
                          borderColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: isSelected ? 1 : 0 },
                          shadowOpacity: isSelected ? 0.06 : 0,
                          shadowRadius: 2,
                          elevation: isSelected ? 1 : 0,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: isSelected ? '800' : '600',
                            color: isSelected ? '#242021' : '#737373',
                          }}
                        >
                          {count}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Difficulty Level Section */}
              <View className="mb-6">
                <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2.5">
                  Difficulty Level
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    borderRadius: 14,
                    backgroundColor: '#f3f4f6',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
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
                          backgroundColor: isSelected ? '#ffffff' : 'transparent',
                          borderWidth: 1,
                          borderColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: isSelected ? 1 : 0 },
                          shadowOpacity: isSelected ? 0.06 : 0,
                          shadowRadius: 2,
                          elevation: isSelected ? 1 : 0,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: isSelected ? '800' : '600',
                            color: isSelected ? '#242021' : '#737373',
                          }}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Action Buttons */}
              <View className="gap-2.5">
                <TouchableOpacity
                  onPress={handleGenerate}
                  disabled={isGenerating}
                  activeOpacity={0.8}
                  style={{
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor: '#242021',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 6,
                    shadowColor: '#000',
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
                      <Icon name="sparkles" size={15} color="#fbbf24" />
                      <Text className="text-xs font-bold text-light">
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
                  <Text className="text-xs font-bold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default GenerateQuizModal;
