import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceProgressTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Space Mastery Progress"
        description="Mastery trend charts, study consistency logs, and performance metrics."
        icon="trending-up-outline"
      />
    </View>
  );
}
