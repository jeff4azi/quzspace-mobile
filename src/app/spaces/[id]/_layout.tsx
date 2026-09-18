import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Slot, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { SpaceHeader } from '@/components/study-space/SpaceHeader';
import { Icon, IconName } from '@/components/ui/Icon';

export interface SpaceTabItem {
  id: string;
  label: string;
  icon: IconName;
}

export const SPACE_TABS: SpaceTabItem[] = [
  { id: 'files', label: 'Files', icon: 'folder-outline' },
  { id: 'summary', label: 'Summary', icon: 'document-text-outline' },
  { id: 'flashcards', label: 'Flashcards', icon: 'albums-outline' },
  { id: 'quiz', label: 'Quiz', icon: 'help-circle-outline' },
  { id: 'chat', label: 'AI Chat', icon: 'chatbubbles-outline' },
  { id: 'weak-areas', label: 'Weak Areas', icon: 'warning-outline' },
  { id: 'community', label: 'Community', icon: 'people-outline' },
  { id: 'progress', label: 'Progress', icon: 'trending-up-outline' },
];

export default function SpaceLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();

  // Extract current active tab segment from pathname (e.g., /spaces/1/summary -> summary)
  const currentTab = pathname.split('/').pop() || 'summary';

  const handleTabPress = (tabId: string) => {
    router.replace(`/spaces/${id}/${tabId}` as any);
  };

  return (
    <View className="flex-1 bg-light">
      <SpaceHeader spaceId={id} />

      {/* Horizontal Scrollable SpaceTabs Bar */}
      <View className="bg-white border-b border-muted/20 py-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {SPACE_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                  isActive ? 'bg-brand shadow-sm' : 'bg-light/80'
                }`}
                activeOpacity={0.7}
              >
                <Icon
                  name={tab.icon}
                  size={15}
                  color={isActive ? '#f1f1f1' : '#5d5a5b'}
                />
                <Text
                  className={`text-xs font-bold ${
                    isActive ? 'text-light' : 'text-gray'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}
