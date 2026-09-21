import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon, IconName } from '@/components/ui/Icon';
import { ActiveMember } from '@/data/mockStudySpaces';
import { AvatarStack } from '@/components/shared/AvatarStack';

export interface StudySpaceCardProps {
  id: string;
  title: string;
  subject: string;
  fileCount: number;
  lastAccessed: string;
  progressPercent: number;
  accentColor?: string;
  activeMembers?: ActiveMember[];
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
}

function getSubjectIcon(subject: string = ''): IconName {
  const s = subject.toLowerCase();
  if (s.includes('computer') || s.includes('code') || s.includes('tech')) return 'hardware-chip-outline';
  if (s.includes('chem') || s.includes('science')) return 'flask-outline';
  if (s.includes('bio') || s.includes('med')) return 'school-outline';
  if (s.includes('math') || s.includes('stat') || s.includes('calc')) return 'calculator-outline';
  if (s.includes('hist') || s.includes('lit') || s.includes('read')) return 'book-outline';
  return 'folder-outline';
}

export function StudySpaceCard({
  id,
  title,
  subject,
  fileCount,
  lastAccessed,
  progressPercent,
  accentColor = '#242021',
  activeMembers = [],
  onDelete,
  onRename,
}: StudySpaceCardProps) {
  const router = useRouter();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const subjectIcon = getSubjectIcon(subject);

  const handleOpenSpace = () => {
    router.push(`/spaces/${id}/summary` as any);
  };

  const handleShare = async () => {
    setShowOptionsModal(false);
    try {
      await Share.share({
        message: `Join my QuzSpace study space: "${title}" - https://quzspace.com/spaces/${id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRename = () => {
    setShowOptionsModal(false);
    if (onRename) {
      onRename(id);
    } else {
      Alert.alert('Rename Study Space', `Enter new name for "${title}"`);
    }
  };

  const handleDelete = () => {
    setShowOptionsModal(false);
    Alert.alert(
      'Delete Study Space',
      `Are you sure you want to delete "${title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(id);
          },
        },
      ]
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenSpace}
        activeOpacity={0.88}
        className="bg-white rounded-2xl border border-muted/30 shadow-sm overflow-hidden mb-4"
      >
        {/* Top Accent Bar */}
        <View
          style={{
            height: 4,
            backgroundColor: accentColor,
            width: '100%',
          }}
        />

        <View className="p-5">
          {/* Top Row: Subject Tag Chip & Overflow Menu */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-muted/20">
              <Icon name={subjectIcon} size={14} color="#242021" />
              <Text className="text-xs font-bold text-brand">{subject}</Text>
            </View>

            {/* Overflow "•••" Trigger */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                setShowOptionsModal(true);
              }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="p-1 rounded-lg"
              activeOpacity={0.7}
            >
              <Icon name="ellipsis-horizontal" size={20} color="#5d5a5b" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text
            numberOfLines={2}
            className="text-lg font-bold text-brand leading-snug mb-3"
          >
            {title}
          </Text>

          {/* Metadata Row: File Count, Last Accessed & Active AvatarStack */}
          <View className="flex-row items-center justify-between flex-wrap gap-2 mb-4">
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1.5">
                <Icon name="document-text-outline" size={14} color="#242021" />
                <Text className="text-xs font-semibold text-gray-500">
                  {fileCount} {fileCount === 1 ? 'file' : 'files'}
                </Text>
              </View>

              <View className="flex-row items-center gap-1.5">
                <Icon name="time-outline" size={14} color="#aeabac" />
                <Text className="text-xs font-medium text-gray-500">{lastAccessed}</Text>
              </View>
            </View>

            {/* Active Members Stack (if > 1) */}
            {activeMembers && activeMembers.length > 1 && (
              <AvatarStack
                viewers={activeMembers}
                size="sm"
                labelSuffix="active"
              />
            )}
          </View>

          {/* Divider */}
          <View className="h-px bg-muted/20 my-1" />

          {/* Progress Section */}
          <View className="pt-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-semibold text-gray-500">Mastery Progress</Text>
              <Text className="text-sm font-extrabold text-brand">{progressPercent}%</Text>
            </View>

            {/* Progress Bar Track & Fill */}
            <View className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
              <View
                style={{ width: `${progressPercent}%` }}
                className="bg-brand h-full rounded-full"
              />
            </View>

            {/* Bottom Row Open Affordance */}
            <View className="flex-row justify-end items-center">
              <View className="flex-row items-center gap-1 bg-brand/5 px-3 py-1.5 rounded-xl">
                <Text className="text-xs font-bold text-brand">Open Space</Text>
                <Icon name="chevron-forward" size={14} color="#242021" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Overflow Action Modal */}
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOptionsModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View className="w-full max-w-xs bg-white rounded-2xl p-4 shadow-xl border border-muted/30">
                <Text className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 pb-3 mb-1 border-b border-muted/20">
                  Space Options
                </Text>

                <TouchableOpacity
                  onPress={handleRename}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100"
                >
                  <Icon name="pencil-outline" size={18} color="#5d5a5b" />
                  <Text className="text-sm font-semibold text-brand">Rename</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleShare}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100"
                >
                  <Icon name="share-social-outline" size={18} color="#5d5a5b" />
                  <Text className="text-sm font-semibold text-brand">Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDelete}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-rose-50"
                >
                  <Icon name="trash-outline" size={18} color="#e11d48" />
                  <Text className="text-sm font-semibold text-rose-600">Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

export default StudySpaceCard;
