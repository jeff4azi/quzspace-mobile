import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen';
import { Icon } from '@/components/ui/Icon';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light">
      <PlaceholderScreen
        label="Dashboard"
        description="Study Spaces grid, quick stats, and recent activity will appear here."
        icon="grid-outline"
      />

      {/* Quick link to test Space navigation */}
      <View className="p-6 bg-white border-t border-muted/20 items-center">
        <TouchableOpacity
          onPress={() => router.push('/spaces/1/summary')}
          className="flex-row items-center gap-2 px-5 py-3 rounded-xl bg-brand active:opacity-90"
          activeOpacity={0.8}
        >
          <Icon name="folder-open-outline" size={18} color="#f1f1f1" />
          <Text className="text-sm font-bold text-light">
            Open Demo Study Space
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
