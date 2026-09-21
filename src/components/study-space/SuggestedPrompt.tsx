import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Icon } from '@/components/ui/Icon';

interface SuggestedPromptProps {
  prompt: string;
  onPress: (prompt: string) => void;
}

export function SuggestedPrompt({ prompt, onPress }: SuggestedPromptProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(prompt)}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 13,
        paddingVertical: 9,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(174, 171, 172, 0.35)',
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'rgba(217, 119, 6, 0.1)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="sparkles" size={11} color="#d97706" />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: '#242021',
          flex: 1,
        }}
      >
        {prompt}
      </Text>
      <Icon name="arrow-forward" size={13} color="#aeabac" />
    </TouchableOpacity>
  );
}

export default SuggestedPrompt;
