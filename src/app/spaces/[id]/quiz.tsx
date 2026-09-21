import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { QuizCard } from '@/components/study-space/QuizCard';
import { QuizEmptyState } from '@/components/study-space/QuizEmptyState';
import { GenerateQuizModal } from '@/components/study-space/GenerateQuizModal';
import { Icon } from '@/components/ui/Icon';
import { mockQuizzes, QuizItem } from '@/data/mockQuizzes';

export default function SpaceQuizTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const spaceId = id || 'cs-301';

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  };

  const handleQuizGenerated = (newQuiz: QuizItem) => {
    setQuizzes((prev) => [newQuiz, ...prev]);
  };

  return (
    <>
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
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              Quizzes
            </Text>
            <View className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20">
              <Text className="text-xs font-bold text-brand">{`${quizzes.length} ${quizzes.length === 1 ? 'Quiz' : 'Quizzes'}`}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setIsGenerateModalOpen(true)}
            activeOpacity={0.8}
            className="flex-row items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand active:bg-darker"
            style={{ flexShrink: 0 }}
          >
            <Icon name="add-outline" size={16} color="#f1f1f1" />
            <Text className="text-xs font-bold text-light" numberOfLines={1}>
              Generate Quiz
            </Text>
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

    <GenerateQuizModal
      visible={isGenerateModalOpen}
      onClose={() => setIsGenerateModalOpen(false)}
      onQuizGenerated={handleQuizGenerated}
      currentQuizCount={quizzes.length}
    />
  </>
  );
}
