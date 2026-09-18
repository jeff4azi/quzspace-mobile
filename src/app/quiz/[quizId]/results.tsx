import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function QuizResultsScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light">
      {/* Distraction-Free Header */}
      <View className="px-5 py-3 border-b border-muted/20 flex-row items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(app)/dashboard')}
          className="flex-row items-center gap-1.5 py-1 px-1.5 -ml-1.5"
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={18} color="#5d5a5b" />
          <Text className="text-xs font-bold text-gray">Dashboard</Text>
        </TouchableOpacity>

        <Text className="text-sm font-bold text-brand">
          Quiz Results
        </Text>

        <View className="w-12" />
      </View>

      <PlaceholderScreen
        label={`Results for Quiz #${quizId}`}
        description="Score breakdown, accuracy stats, detailed answer review, and topic mastery gains."
        icon="trophy-outline"
        showHomeLink={true}
      />
    </SafeAreaView>
  );
}
