import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Settings & Account"
        description="Account profile, plan management (Free / Pro), and app preferences."
        icon="settings-outline"
      />
    </View>
  );
}
