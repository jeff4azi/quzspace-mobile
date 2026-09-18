import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function CreateScreen() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Create Study Space"
        description="Upload documents, set subject tags, and create custom AI study spaces."
        icon="add-circle-outline"
      />
    </View>
  );
}
