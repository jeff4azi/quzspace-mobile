import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { SuggestedPrompt } from './SuggestedPrompt';
import { mockSuggestedPrompts } from '@/data/mockChatMessages';

interface ChatEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export function ChatEmptyState({ onSelectPrompt }: ChatEmptyStateProps) {
  return (
    <View className="py-6 items-center">
      {/* Sparkle Badge */}
      <View className="w-14 h-14 rounded-2xl bg-brand/10 items-center justify-center mb-4">
        <Icon name="chatbubbles-outline" size={28} color="#242021" />
      </View>

      <Text className="text-lg font-extrabold text-brand tracking-tight mb-1.5 text-center">
        Ask Anything About Your Study Space
      </Text>

      <Text className="text-xs text-gray text-center leading-relaxed max-w-xs mb-6">
        Ask questions, request summaries, or clarify complex topics from your
        uploaded lecture slides and notes.
      </Text>

      {/* Suggested Questions Header */}
      <View className="w-full">
        <View className="flex-row items-center gap-1.5 mb-2.5 px-1">
          <Icon name="sparkles" size={13} color="#d97706" />
          <Text className="text-xs font-bold text-brand uppercase tracking-wider">
            Suggested Prompts
          </Text>
        </View>

        {mockSuggestedPrompts.map((prompt, idx) => (
          <SuggestedPrompt
            key={idx}
            prompt={prompt}
            onPress={onSelectPrompt}
          />
        ))}
      </View>
    </View>
  );
}

export default ChatEmptyState;
