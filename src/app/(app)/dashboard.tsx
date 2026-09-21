import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { mockStudySpaces, StudySpace } from '@/data/mockStudySpaces';
import { StudySpaceCard } from '@/components/dashboard/StudySpaceCard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Icon } from '@/components/ui/Icon';

export default function DashboardScreen() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<StudySpace[]>(mockStudySpaces);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSpaces(mockStudySpaces);
      setRefreshing(false);
    }, 800);
  }, []);

  const handleDeleteSpace = (id: string) => {
    setSpaces((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRenameSpace = (id: string) => {
    setSpaces((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: `${s.title} (Updated)` } : s))
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#242021"
          colors={['#242021']}
        />
      }
    >
      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1 pr-3">
          <Text className="text-2xl font-extrabold text-brand tracking-tight">Your Study Spaces</Text>
          <Text className="text-sm text-gray mt-1 leading-relaxed">
            {spaces.length} active {spaces.length === 1 ? 'space' : 'spaces'} available
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.navigate('/(app)/create' as any)}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#242021',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 12,
            flexShrink: 0,
          }}
        >
          <Icon name="add" size={16} color="#f1f1f1" />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: '#f1f1f1',
              marginLeft: 5,
            }}
          >
            New Space
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards List or Empty State */}
      {spaces.length > 0 ? (
        <View>
          {spaces.map((space) => (
            <StudySpaceCard
              key={space.id}
              id={space.id}
              title={space.title}
              subject={space.subject}
              fileCount={space.fileCount}
              lastAccessed={space.lastAccessed}
              progressPercent={space.progressPercent}
              accentColor={space.accentColor}
              activeMembers={space.activeMembers}
              onDelete={handleDeleteSpace}
              onRename={handleRenameSpace}
            />
          ))}
        </View>
      ) : (
        <EmptyState onCreateClick={() => router.navigate('/(app)/create' as any)} />
      )}
    </ScrollView>
  );
}
