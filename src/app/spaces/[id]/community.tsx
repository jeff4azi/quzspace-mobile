import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceCommunityTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Space Community & Leaderboard"
        description="Collaborators, peer activity, shared decks, and leaderboard rankings."
        icon="people-outline"
      />
    </View>
  );
}
