import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Slot, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { SpaceHeader } from '@/components/study-space/SpaceHeader';
import { Icon, IconName } from '@/components/ui/Icon';
import { mockStudySpaces } from '@/data/mockStudySpaces';

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

  const activeSpaceId = id || 'cs-301';
  const currentSpace =
    mockStudySpaces.find((s) => s.id === activeSpaceId) || mockStudySpaces[0];

  // Extract current active tab segment from pathname (e.g., /spaces/cs-301/summary -> summary)
  const currentTab = pathname.split('/').pop() || 'summary';

  const handleTabPress = (tabId: string) => {
    router.replace(`/spaces/${activeSpaceId}/${tabId}` as any);
  };

  return (
    <View className="flex-1 bg-light">
      <SpaceHeader
        spaceId={currentSpace.id}
        title={currentSpace.title}
        subject={currentSpace.subject}
        fileCount={currentSpace.fileCount}
        masteryPercent={currentSpace.progressPercent}
      />

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
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: isActive ? '#242021' : '#f1f1f1',
                }}
              >
                <Icon
                  name={tab.icon}
                  size={15}
                  color={isActive ? '#f1f1f1' : '#5d5a5b'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: isActive ? '#f1f1f1' : '#5d5a5b',
                    marginLeft: 6,
                  }}
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

