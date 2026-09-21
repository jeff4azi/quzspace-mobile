import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';

interface DefinitionCardProps {
  term: string;
  definition: string;
}

export function DefinitionCard({ term, definition }: DefinitionCardProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-4 shadow-xs mb-3">
      {/* Term Header */}
      <View className="flex-row items-center gap-2 mb-2">
        <Icon name="bookmark-outline" size={16} color="#242021" />
        <Text className="text-sm font-extrabold text-brand tracking-tight flex-1">
          {term}
        </Text>
      </View>

      {/* Definition Body */}
      <Text className="text-xs text-gray leading-relaxed pl-6">
        {definition}
      </Text>
    </View>
  );
}

export default DefinitionCard;
