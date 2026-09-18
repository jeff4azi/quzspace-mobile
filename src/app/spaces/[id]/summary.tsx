import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceSummaryTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Summary & Key Concepts"
        description="AI-generated executive summary, definitions, and key takeaways for this space."
        icon="document-text-outline"
      />
    </View>
  );
}
