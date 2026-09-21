import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { QuizItem } from '@/data/mockQuizzes';

interface QuizCardProps {
  quiz: QuizItem;
  spaceId?: string;
  onDelete?: (quizId: string) => void;
}

function getDifficultyStyle(difficulty: QuizItem['difficulty']) {
  switch (difficulty) {
    case 'Easy':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
      };
    case 'Medium':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
      };
    case 'Hard':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
      };
    case 'Mixed':
    default:
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
      };
  }
}

export function QuizCard({ quiz, spaceId = 'cs-301' }: QuizCardProps) {
  const router = useRouter();
  const diffStyle = getDifficultyStyle(quiz.difficulty);

  const handleTakeQuiz = () => {
    router.push(`/quiz/${quiz.id}` as any);
  };

  const handleViewResults = () => {
    router.push(`/quiz/${quiz.id}/results` as any);
  };

  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-4">
      {/* Top Row: Difficulty & Question Count */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <View
            className={`px-2.5 py-0.5 rounded-full border ${diffStyle.bg} ${diffStyle.border}`}
          >
            <Text className={`text-[11px] font-bold ${diffStyle.text}`}>
              {quiz.difficulty}
            </Text>
          </View>
          <Text className="text-xs font-semibold text-gray-500">
            {quiz.questionCount} Questions
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Icon name="time-outline" size={13} color="#aeabac" />
          <Text className="text-[11px] font-medium text-gray-400">
            {quiz.createdAt}
          </Text>
        </View>
      </View>

      {/* Quiz Title */}
      <Text className="text-base font-bold text-brand leading-snug mb-2">
        {quiz.title}
      </Text>

      {/* Attempts Metadata */}
      <View className="flex-row items-center gap-3 mb-4">
        {quiz.attemptsCount > 0 ? (
          <Text className="text-xs font-medium text-gray-500">
            {quiz.attemptsCount} {quiz.attemptsCount === 1 ? 'attempt' : 'attempts'} completed
          </Text>
        ) : (
          <Text className="text-xs font-medium text-gray-400">
            Not attempted yet
          </Text>
        )}
      </View>

      {/* Best Score Bar or Unattempted State */}
      <View className="mb-4 pt-3 border-t border-muted/20">
        {quiz.bestScore !== null ? (
          <View>
            <View className="flex-row items-center justify-between mb-1.5">
              <View className="flex-row items-center gap-1">
                <Icon name="sparkles" size={12} color="#d97706" />
                <Text className="text-[11px] font-semibold text-gray-500">
                  Best Score
                </Text>
              </View>
              <Text className="text-xs font-extrabold text-emerald-700">
                {quiz.bestScore}%
              </Text>
            </View>
            <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <View
                style={{ width: `${quiz.bestScore}%` }}
                className="h-full bg-emerald-600 rounded-full"
              />
            </View>
          </View>
        ) : (
          <View className="flex-row items-center gap-1.5 py-0.5">
            <Icon name="help-circle-outline" size={14} color="#aeabac" />
            <Text className="text-xs text-gray-400 font-medium">
              Ready for your first attempt
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center gap-2.5">
        <TouchableOpacity
          onPress={handleTakeQuiz}
          activeOpacity={0.8}
          className="flex-1 flex-row items-center justify-center gap-2 bg-brand py-3 px-4 rounded-xl shadow-2xs active:bg-darker"
        >
          <Icon name="play-circle-outline" size={16} color="#f1f1f1" />
          <Text className="text-xs font-bold text-light">
            {quiz.bestScore !== null ? 'Retake Quiz' : 'Take Quiz'}
          </Text>
        </TouchableOpacity>

        {quiz.bestScore !== null && (
          <TouchableOpacity
            onPress={handleViewResults}
            activeOpacity={0.8}
            className="flex-row items-center justify-center gap-1.5 bg-white border border-muted/30 py-3 px-3.5 rounded-xl active:bg-gray-50"
          >
            <Icon name="bar-chart-outline" size={15} color="#242021" />
            <Text className="text-xs font-bold text-brand">Results</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default QuizCard;
