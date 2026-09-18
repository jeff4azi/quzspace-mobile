import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AppHeader() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="bg-white border-b border-muted/20">
      <View className="flex-row items-center justify-between px-5 py-3">
        {/* Brand Logo & Wordmark */}
        <TouchableOpacity
          onPress={() => router.push('/(app)/dashboard')}
          className="flex-row items-center gap-2"
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/Quzspace_logo.png')}
            className="w-7 h-7"
            resizeMode="contain"
          />
          <Text className="text-lg font-extrabold text-brand tracking-tight">
            Quz<Text className="text-gray font-semibold">Space</Text>
          </Text>
        </TouchableOpacity>

        {/* User avatar circle placeholder */}
        <TouchableOpacity
          onPress={() => router.push('/(app)/settings')}
          className="w-8 h-8 rounded-full bg-brand items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <Text className="text-xs font-bold text-light">QS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AppHeader;
