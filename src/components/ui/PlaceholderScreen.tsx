import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon, IconName } from './Icon';

interface PlaceholderScreenProps {
  label: string;
  description?: string;
  icon?: IconName;
  showHomeLink?: boolean;
}

/**
 * Reusable placeholder screen component mirroring the web app's TabPlaceholder / Screen Placeholder.
 */
export function PlaceholderScreen({
  label,
  description = 'This screen is under active development.',
  icon = 'construct-outline',
  showHomeLink = false,
}: PlaceholderScreenProps) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light justify-center items-center px-6 py-12">
      <View className="w-16 h-16 rounded-2xl bg-white border border-muted/30 items-center justify-center mb-4 shadow-sm">
        <Icon name={icon} size={30} color="#242021" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight text-center mb-2">
        {label}
      </Text>

      <Text className="text-sm font-medium text-gray text-center max-w-xs mb-6 leading-relaxed">
        {description}
      </Text>

      <View className="px-3.5 py-1.5 rounded-full bg-muted/20 border border-muted/30">
        <Text className="text-xs font-semibold text-gray">Coming Soon</Text>
      </View>

      {showHomeLink && (
        <TouchableOpacity
          onPress={() => router.navigate('/(app)/dashboard' as any)}
          className="mt-6 px-5 py-2.5 rounded-xl bg-brand items-center justify-center shadow-sm active:opacity-90"
        >
          <Text className="text-sm font-bold text-light">Go to Dashboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default PlaceholderScreen;
