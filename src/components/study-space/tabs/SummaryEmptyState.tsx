import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface SummaryEmptyStateProps {
  onGenerateClick: () => void;
}

export function SummaryEmptyState({ onGenerateClick }: SummaryEmptyStateProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-8 text-center items-center shadow-xs my-6">
      {/* Icon Circle */}
      <View className="w-16 h-16 rounded-2xl bg-amber-500/10 items-center justify-center mb-5">
        <Icon name="sparkles" size={30} color="#d97706" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Summary Generated Yet
      </Text>

      <Text className="text-sm text-gray leading-relaxed mb-6 text-center max-w-xs">
        Generate a structured AI summary of your uploaded lecture slides and PDFs to get key takeaways, definitions, and exam tips.
      </Text>

      <Button
        variant="primary"
        onPress={onGenerateClick}
        className="w-full sm:w-auto"
      >
        <Icon name="sparkles" size={16} color="#fbbf24" />
        <Text className="text-light font-bold text-sm ml-2">Generate AI Summary</Text>
      </Button>
    </View>
  );
}

export default SummaryEmptyState;
