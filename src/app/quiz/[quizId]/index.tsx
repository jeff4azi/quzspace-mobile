import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function QuizTakingScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light">
      {/* Distraction-Free Header: Close & Quiz Title */}
      <View className="px-5 py-3 border-b border-muted/20 flex-row items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1 -ml-1"
          activeOpacity={0.7}
        >
          <Icon name="close" size={22} color="#242021" />
        </TouchableOpacity>

        <Text className="text-sm font-bold text-brand">
          Quiz Assessment
        </Text>

        <View className="w-6" />
      </View>

      <PlaceholderScreen
        label={`Taking Quiz #${quizId}`}
        description="Distraction-free question cards, timer, multiple-choice options, and submit action."
        icon="checkbox-outline"
      />

      <View className="p-4 bg-white border-t border-muted/20 items-center">
        <TouchableOpacity
          onPress={() => router.push(`/quiz/${quizId}/results` as any)}
          className="flex-row items-center gap-2 px-5 py-3 rounded-xl bg-brand active:opacity-90"
          activeOpacity={0.8}
        >
          <Icon name="trophy-outline" size={18} color="#f1f1f1" />
          <Text className="text-sm font-bold text-light">
            View Results Demo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
