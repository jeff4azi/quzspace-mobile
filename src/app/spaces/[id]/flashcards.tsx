import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceFlashcardsTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Flashcards Deck"
        description="Interactive flip cards, spaced repetition study mode, and mastery tracking."
        icon="albums-outline"
      />
    </View>
  );
}
