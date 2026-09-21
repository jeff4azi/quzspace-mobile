import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { QuizCard } from '@/components/study-space/QuizCard';
import { QuizEmptyState } from '@/components/study-space/QuizEmptyState';
import { Icon } from '@/components/ui/Icon';
import { mockQuizzes, QuizItem } from '@/data/mockQuizzes';

export default function SpaceQuizTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const spaceId = id || 'cs-301';

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4 flex-wrap gap-2">
        <View className="flex-row items-center gap-2.5">
          <Text className="text-xl font-extrabold text-brand tracking-tight">
            Quizzes
          </Text>
          <View className="px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/20">
            <Text className="text-xs font-bold text-brand">
              {quizzes.length} {quizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/quiz/q-101` as any)}
          activeOpacity={0.8}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-brand active:bg-darker"
        >
          <Icon name="add-outline" size={15} color="#f1f1f1" />
          <Text className="text-xs font-bold text-light">Quick Start</Text>
        </TouchableOpacity>
      </View>

      {/* Quizzes List */}
      {quizzes && quizzes.length > 0 ? (
        <View className="pt-1">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              spaceId={spaceId}
              onDelete={handleDeleteQuiz}
            />
          ))}
        </View>
      ) : (
        <QuizEmptyState />
      )}
    </ScrollView>
  );
}
