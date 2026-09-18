import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function SpaceQuizTab() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Quizzes & Assessments"
        description="Practice tests, multiple-choice quizzes, and AI question generators."
        icon="help-circle-outline"
      />

      <View className="p-4 bg-white border-t border-muted/20 items-center gap-2">
        <TouchableOpacity
          onPress={() => router.push('/quiz/101' as any)}
          className="flex-row items-center gap-2 px-5 py-3 rounded-xl bg-brand active:opacity-90"
          activeOpacity={0.8}
        >
          <Icon name="play-circle-outline" size={18} color="#f1f1f1" />
          <Text className="text-sm font-bold text-light">
            Launch Quiz Screen Demo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
