import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-8 text-center items-center shadow-xs my-6">
      {/* Icon Circle / Square */}
      <View className="w-16 h-16 rounded-2xl bg-brand/10 items-center justify-center mb-5">
        <Icon name="folder-open-outline" size={32} color="#242021" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Study Spaces Yet
      </Text>

      <Text className="text-sm text-gray leading-relaxed mb-6 text-center max-w-xs">
        Upload your first lecture notes, PowerPoint slides, or PDF documents to generate an AI study suite with smart flashcards and quizzes.
      </Text>

      <Button
        variant="primary"
        onPress={onCreateClick}
        className="w-full sm:w-auto"
      >
        <Icon name="add" size={18} color="#f1f1f1" />
        <Text className="text-light font-bold text-sm ml-2">Create Your First Study Space</Text>
      </Button>
    </View>
  );
}

export default EmptyState;
