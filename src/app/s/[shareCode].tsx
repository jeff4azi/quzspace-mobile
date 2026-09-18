import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function SharedStudySpaceScreen() {
  const { shareCode } = useLocalSearchParams<{ shareCode: string }>();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light">
      {/* Distraction-Free Header with Logo & Join Action */}
      <View className="px-5 py-3 border-b border-muted/20 flex-row items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(app)/dashboard')}
          className="flex-row items-center gap-2"
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/Quzspace_logo.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="text-base font-extrabold text-brand tracking-tight">
            Quz<Text className="text-gray font-semibold">Space</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(public)/signup')}
          className="px-3.5 py-1.5 rounded-lg bg-brand active:opacity-90"
          activeOpacity={0.8}
        >
          <Text className="text-xs font-bold text-light">Join Space</Text>
        </TouchableOpacity>
      </View>

      <PlaceholderScreen
        label={`Shared Space #${shareCode}`}
        description="Public view of shared flashcards, community quiz sets, and collaborative materials."
        icon="share-social-outline"
        showHomeLink={true}
      />
    </SafeAreaView>
  );
}
