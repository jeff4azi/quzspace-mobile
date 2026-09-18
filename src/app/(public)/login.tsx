import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light">
      <View className="px-5 py-3 border-b border-muted/20 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-1.5 py-1 px-1.5 -ml-1.5"
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={18} color="#5d5a5b" />
          <Text className="text-xs font-bold text-gray">Back</Text>
        </TouchableOpacity>
        <Text className="text-sm font-bold text-brand">Sign In</Text>
        <View className="w-8" />
      </View>

      <PlaceholderScreen
        label="Sign In"
        description="Login with email/password or Google authentication is coming soon."
        icon="log-in-outline"
        showHomeLink={true}
      />
    </SafeAreaView>
  );
}
