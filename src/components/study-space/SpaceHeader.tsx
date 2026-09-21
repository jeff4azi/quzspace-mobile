import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';
import { ActiveMember } from '@/data/mockStudySpaces';

interface SpaceHeaderProps {
  spaceId?: string;
  title?: string;
  subject?: string;
  fileCount?: number;
  lastActive?: string;
  createdAt?: string;
  masteryPercent?: number;
  activeMembers?: ActiveMember[];
}

/**
 * Reusable SpaceHeader component for study spaces, mirroring web StudySpaceOverview header.
 */
export function SpaceHeader({
  spaceId = '1',
  title = 'Introduction to Biology',
  subject = 'Science',
  fileCount = 3,
  lastActive = '2 hours ago',
  createdAt = 'Aug 14, 2026',
  masteryPercent = 85,
  activeMembers = [],
}: SpaceHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my QuzSpace study space: ${title}! https://quzspace.app/s/share-${spaceId}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const members = activeMembers.length > 0 ? activeMembers : [
    { id: 'm1', name: 'Alex Chen', avatarInitials: 'AC', avatarColor: '#2563eb' },
    { id: 'm2', name: 'Sarah Jenkins', avatarInitials: 'SJ', avatarColor: '#d97706' },
    { id: 'm3', name: 'David Rodriguez', avatarInitials: 'DR', avatarColor: '#059669' },
  ];

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(174, 171, 172, 0.2)',
      }}
    >
      <View className="px-5 pt-3 pb-3">
        {/* Top bar: Back Button + Online Presence + Share Button */}
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            onPress={() => {
              router.navigate('/(app)/dashboard' as any);
            }}
            className="flex-row items-center gap-1.5 py-1 px-1.5 -ml-1.5 active:opacity-70"
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={18} color="#5d5a5b" />
            <Text className="text-xs font-bold text-gray">Dashboard</Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            {/* Live Presence Pill with Avatars */}
            <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <View className="w-2 h-2 rounded-full bg-emerald-500" />

              {/* Overlapping small avatar circles */}
              <View className="flex-row items-center">
                {members.slice(0, 3).map((m, idx) => (
                  <View
                    key={m.id}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: m.avatarColor,
                      borderWidth: 1,
                      borderColor: '#ffffff',
                      marginLeft: idx === 0 ? 0 : -4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 7,
                        fontWeight: '800',
                        color: '#ffffff',
                      }}
                    >
                      {m.avatarInitials}
                    </Text>
                  </View>
                ))}
              </View>

              <Text className="text-[10px] font-bold text-emerald-800">
                {members.length} online
              </Text>
            </View>

            {/* Share Button */}
            <TouchableOpacity
              onPress={handleShare}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light border border-muted/30 active:opacity-80"
              activeOpacity={0.8}
            >
              <Icon name="share-outline" size={14} color="#242021" />
              <Text className="text-xs font-bold text-brand">Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subject Tag & Title */}
        <View className="mb-2">
          <View className="self-start px-2.5 py-0.5 rounded-md bg-light border border-muted/20 mb-1.5">
            <Text className="text-[11px] font-bold text-gray uppercase tracking-wider">
              {subject}
            </Text>
          </View>
          <Text className="text-xl font-extrabold text-brand tracking-tight">
            {title}
          </Text>
        </View>

        {/* Metadata Row: Files, Last Active, Created, Mastery */}
        <View className="flex-row items-center gap-3 pt-1 flex-wrap">
          {/* Files */}
          <View className="flex-row items-center gap-1">
            <Icon name="document-text-outline" size={13} color="#5d5a5b" />
            <Text className="text-xs font-medium text-gray">
              {fileCount} {fileCount === 1 ? 'file' : 'files'}
            </Text>
          </View>

          {/* Last Active */}
          <View className="flex-row items-center gap-1">
            <Icon name="time-outline" size={13} color="#5d5a5b" />
            <Text className="text-xs font-medium text-gray">
              Last active {lastActive}
            </Text>
          </View>

          {/* Created Date */}
          <View className="flex-row items-center gap-1">
            <Icon name="calendar-outline" size={13} color="#5d5a5b" />
            <Text className="text-xs font-medium text-gray">
              Created {createdAt}
            </Text>
          </View>

          {/* Mastery Badge */}
          <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
            <Icon name="sparkles" size={11} color="#059669" />
            <Text className="text-[11px] font-bold text-emerald-700">
              {masteryPercent}% Mastery
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SpaceHeader;
