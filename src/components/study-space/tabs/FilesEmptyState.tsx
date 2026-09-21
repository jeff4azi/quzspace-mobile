import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface FilesEmptyStateProps {
  onAddFilesClick: () => void;
}

export function FilesEmptyState({ onAddFilesClick }: FilesEmptyStateProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-8 text-center items-center shadow-xs my-6">
      {/* Icon */}
      <View className="w-16 h-16 rounded-2xl bg-brand/10 items-center justify-center mb-5">
        <Icon name="folder-open-outline" size={32} color="#242021" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Files Uploaded Yet
      </Text>

      <Text className="text-sm text-gray leading-relaxed mb-6 text-center max-w-xs">
        Upload your lecture slides, textbook PDFs, or notes to generate smart summaries, flashcards, and quizzes.
      </Text>

      <Button
        variant="primary"
        onPress={onAddFilesClick}
        className="w-full sm:w-auto"
      >
        <Icon name="add" size={18} color="#f1f1f1" />
        <Text className="text-light font-bold text-sm ml-2">Add Your First File</Text>
      </Button>
    </View>
  );
}

export default FilesEmptyState;
