import React from 'react';
import { View } from 'react-native';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';

export default function SpaceChatTab() {
  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="AI Study Assistant"
        description="Ask questions about your uploaded documents, clarify concepts, and get instant explanations."
        icon="chatbubbles-outline"
      />
    </View>
  );
}
