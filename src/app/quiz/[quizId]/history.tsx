import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';
import { mockQuizzes } from '@/data/mockQuizzes';

export default function QuizHistoryScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const activeQuizId = quizId || 'q-101';
  const quiz =
    mockQuizzes.find((q) => q.id === activeQuizId) || mockQuizzes[0];

  const attempts = quiz.history || [];

  // Calculate average score
  const avgScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, att) => sum + att.scorePercent, 0) /
            attempts.length
        )
      : null;

  const handleRetake = () => {
    router.push(`/quiz/${quiz.id}` as any);
  };

  const handleViewBreakdown = (attemptId: string) => {
    router.push(`/quiz/${quiz.id}/results` as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      {/* Top Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 14,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(174, 171, 172, 0.2)',
        }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="flex-row items-center gap-1.5 py-1 px-1.5 -ml-1.5"
          >
            <Icon name="arrow-back" size={18} color="#5d5a5b" />
            <Text className="text-xs font-bold text-gray">Back</Text>
          </TouchableOpacity>

          <Text
            numberOfLines={1}
            className="text-xs font-bold text-gray uppercase tracking-wider max-w-[200px]"
          >
            Past Attempts
          </Text>

          <View className="w-8" />
        </View>

        <View className="pt-2">
          <Text className="text-lg font-extrabold text-brand leading-snug">
            {quiz.title}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Performance Overview Banner */}
        <View className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-5">
          <Text className="text-xs font-bold text-gray uppercase tracking-wider mb-3">
            Performance Overview
          </Text>

          <View className="flex-row items-center justify-around">
            <View className="items-center">
              <Text className="text-2xl font-black text-emerald-700">
                {quiz.bestScore !== null ? `${quiz.bestScore}%` : '—'}
              </Text>
              <Text className="text-[11px] font-medium text-gray-500">
                Best Score
              </Text>
            </View>

            <View className="w-px h-10 bg-gray-200" />

            <View className="items-center">
              <Text className="text-2xl font-black text-brand">
                {avgScore !== null ? `${avgScore}%` : '—'}
              </Text>
              <Text className="text-[11px] font-medium text-gray-500">
                Average
              </Text>
            </View>

            <View className="w-px h-10 bg-gray-200" />

            <View className="items-center">
              <Text className="text-2xl font-black text-gray-700">
                {attempts.length}
              </Text>
              <Text className="text-[11px] font-medium text-gray-500">
                {attempts.length === 1 ? 'Attempt' : 'Attempts'}
              </Text>
            </View>
          </View>
        </View>

        {/* Attempts List */}
        <View className="mb-3">
          <Text className="text-base font-extrabold text-brand mb-3">
            Attempt History
          </Text>

          {attempts.length > 0 ? (
            attempts.map((attempt) => {
              const isHigh = attempt.scorePercent >= 80;
              return (
                <View
                  key={attempt.id}
                  className="bg-white rounded-2xl border border-muted/30 p-4 shadow-2xs mb-3.5"
                >
                  {/* Top Row: Attempt Number & Score Badge */}
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2">
                      <View className="px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/20">
                        <Text className="text-xs font-bold text-brand">
                          Attempt #{attempt.attemptNumber}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400 font-medium">
                        {attempt.completedAt}
                      </Text>
                    </View>

                    <View
                      className={`px-3 py-1 rounded-full border ${
                        isHigh
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <Text
                        className={`text-xs font-extrabold ${
                          isHigh ? 'text-emerald-700' : 'text-amber-800'
                        }`}
                      >
                        {attempt.scorePercent}%
                      </Text>
                    </View>
                  </View>

                  {/* Metadata Info */}
                  <View className="flex-row items-center gap-4 py-2 border-t border-muted/20 my-1">
                    <View className="flex-row items-center gap-1.5">
                      <Icon
                        name="checkmark-circle-outline"
                        size={14}
                        color="#059669"
                      />
                      <Text className="text-xs font-semibold text-gray-600">
                        {attempt.correctCount} / {attempt.totalQuestions} correct
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-1.5">
                      <Icon name="time-outline" size={14} color="#5d5a5b" />
                      <Text className="text-xs font-medium text-gray-500">
                        {attempt.timeSpent}
                      </Text>
                    </View>
                  </View>

                  {/* Action Link to Results Breakdown */}
                  <TouchableOpacity
                    onPress={() => handleViewBreakdown(attempt.id)}
                    activeOpacity={0.7}
                    className="pt-2 border-t border-muted/20 flex-row items-center justify-between"
                  >
                    <Text className="text-xs font-bold text-brand">
                      View Result Breakdown
                    </Text>
                    <Icon name="chevron-forward" size={14} color="#242021" />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View className="bg-white rounded-2xl border border-muted/30 p-8 items-center text-center">
              <Icon name="help-circle-outline" size={32} color="#aeabac" />
              <Text className="text-sm font-bold text-brand mt-2">
                No past attempts yet
              </Text>
              <Text className="text-xs text-gray-500 mt-1 text-center">
                Take this quiz to record your first score.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View
        style={{
          paddingBottom: Math.max(insets.bottom, 16),
          paddingTop: 14,
          paddingHorizontal: 20,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(174, 171, 172, 0.2)',
        }}
      >
        <TouchableOpacity
          onPress={handleRetake}
          activeOpacity={0.8}
          className="w-full py-3.5 px-4 rounded-xl bg-brand flex-row items-center justify-center gap-2 shadow-xs active:bg-darker"
        >
          <Icon name="play-circle-outline" size={16} color="#f1f1f1" />
          <Text className="text-xs font-bold text-light">Retake Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
