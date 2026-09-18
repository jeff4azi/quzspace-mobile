import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceFilesTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Files & Documents"
        description="View uploaded PDFs, slides, and notes. Add new materials to your study space."
        icon="folder-open-outline"
      />
    </View>
  );
}
