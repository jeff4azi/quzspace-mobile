import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light justify-between px-6 py-8">
      {/* Top Navbar Area */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image
            source={require('@/assets/images/Quzspace_logo.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text className="text-xl font-extrabold text-brand tracking-tight">
            Quz<Text className="text-gray font-semibold">Space</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(public)/login')}
          className="px-4 py-2 rounded-xl bg-white border border-muted/30 active:opacity-80"
          activeOpacity={0.8}
        >
          <Text className="text-xs font-bold text-brand">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Content Area */}
      <View className="items-center text-center my-auto">
        <View className="w-16 h-16 rounded-2xl bg-white border border-muted/30 items-center justify-center mb-5 shadow-sm">
          <Icon name="sparkles" size={28} color="#242021" />
        </View>

        <View className="px-3.5 py-1 rounded-full bg-muted/20 border border-muted/30 mb-4">
          <Text className="text-xs font-semibold text-gray">
            AI-Powered Study Spaces
          </Text>
        </View>

        <Text className="text-3xl font-extrabold text-brand text-center tracking-tight leading-tight mb-3">
          Master Any Topic,{'\n'}Fast and Efficiently
        </Text>

        <Text className="text-sm font-medium text-gray text-center max-w-xs leading-relaxed mb-8">
          Upload notes, generate flashcards, take quizzes, and track your mastery all in one place.
        </Text>

        <View className="w-full max-w-xs gap-3">
          <TouchableOpacity
            onPress={() => router.push('/(public)/signup')}
            className="w-full py-3.5 rounded-xl bg-brand items-center justify-center shadow-md active:opacity-90"
            activeOpacity={0.9}
          >
            <Text className="text-sm font-bold text-light">Get Started for Free</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(app)/dashboard')}
            className="w-full py-3 rounded-xl bg-white border border-muted/30 items-center justify-center active:opacity-80"
            activeOpacity={0.8}
          >
            <Text className="text-sm font-bold text-brand">Explore App Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer / Coming Soon Notice */}
      <View className="items-center">
        <Text className="text-xs font-medium text-muted">
          QuzSpace Mobile v1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}
