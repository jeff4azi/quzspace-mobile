import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';

interface SpaceHeaderProps {
  spaceId?: string;
  title?: string;
  subject?: string;
  fileCount?: number;
  masteryPercent?: number;
}

/**
 * Reusable SpaceHeader component for study spaces, mirroring web StudySpaceOverview header.
 */
export function SpaceHeader({
  spaceId = '1',
  title = 'Introduction to Biology',
  subject = 'Science',
  fileCount = 3,
  masteryPercent = 85,
}: SpaceHeaderProps) {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my QuzSpace study space: ${title}! https://quzspace.app/s/share-${spaceId}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView edges={['top']} className="bg-white border-b border-muted/20">
      <View className="px-5 pt-3 pb-3">
        {/* Top bar: Back Button + Share Button */}
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            onPress={() => router.push('/(app)/dashboard')}
            className="flex-row items-center gap-1.5 py-1 px-1.5 -ml-1.5 active:opacity-70"
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={18} color="#5d5a5b" />
            <Text className="text-xs font-bold text-gray">Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light border border-muted/30 active:opacity-80"
            activeOpacity={0.8}
          >
            <Icon name="share-outline" size={15} color="#242021" />
            <Text className="text-xs font-bold text-brand">Share</Text>
          </TouchableOpacity>
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

        {/* Metadata Row */}
        <View className="flex-row items-center gap-4 pt-1">
          <View className="flex-row items-center gap-1.5">
            <Icon name="document-text-outline" size={14} color="#5d5a5b" />
            <Text className="text-xs font-medium text-gray">
              {fileCount} {fileCount === 1 ? 'file' : 'files'}
            </Text>
          </View>

          <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
            <Icon name="sparkles" size={12} color="#059669" />
            <Text className="text-xs font-bold text-emerald-700">
              {masteryPercent}% Mastery
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SpaceHeader;
