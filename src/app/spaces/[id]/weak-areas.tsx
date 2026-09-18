import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceWeakAreasTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Weak Areas & Recommendations"
        description="Targeted topic insights, missed question reviews, and tailored study suggestions."
        icon="warning-outline"
      />
    </View>
  );
}
