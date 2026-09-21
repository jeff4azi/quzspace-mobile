import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface QuizEmptyStateProps {
  onGenerateClick?: () => void;
}

export function QuizEmptyState({ onGenerateClick }: QuizEmptyStateProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-8 items-center text-center shadow-xs my-6">
      <View className="w-16 h-16 rounded-2xl bg-brand/10 items-center justify-center mb-5">
        <Icon name="help-circle-outline" size={32} color="#242021" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Quizzes Generated Yet
      </Text>

      <Text className="text-sm text-gray leading-relaxed mb-6 text-center max-w-xs">
        Create customized multiple-choice tests from your notes to evaluate your
        knowledge and track mastery.
      </Text>

      {onGenerateClick && (
        <Button variant="primary" onPress={onGenerateClick} className="px-6 py-3">
          <View className="flex-row items-center gap-2">
            <Icon name="sparkles" size={16} color="#fbbf24" />
            <Text className="text-xs font-bold text-light">
              Generate New Quiz
            </Text>
          </View>
        </Button>
      )}
    </View>
  );
}

export default QuizEmptyState;
