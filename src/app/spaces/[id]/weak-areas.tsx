import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { mockWeakAreas, WeakTopic } from '@/data/mockWeakAreas';
import { WeakTopicCard } from '@/components/study-space/WeakTopicCard';
import { WeakAreasEmptyState } from '@/components/study-space/tabs/WeakAreasEmptyState';
import { Icon } from '@/components/ui/Icon';

export default function WeakAreasTabScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>(
    [...mockWeakAreas].sort((a, b) => a.masteryPercent - b.masteryPercent)
  );

  const handleTakeQuiz = () => {
    router.replace(`/spaces/${id}/quiz` as any);
  };

  const handlePracticeFlashcards = (topicName: string) => {
    Alert.alert(
      'Flashcards Practice',
      `Focused practice deck created for "${topicName}".`,
      [
        {
          text: 'Go to Flashcards',
          onPress: () => router.replace(`/spaces/${id}/flashcards` as any),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleClear = () => {
    setWeakTopics([]);
  };

  const handleRestore = () => {
    setWeakTopics(
      [...mockWeakAreas].sort((a, b) => a.masteryPercent - b.masteryPercent)
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs mb-5">
        <View className="flex-row items-center justify-between gap-2 mb-2 flex-wrap">
          <View className="flex-row items-center gap-2">
            <Icon name="warning-outline" size={20} color="#d97706" />
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              Weak Areas
            </Text>
          </View>

          {weakTopics.length > 0 && (
            <View className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200">
              <Text className="text-xs font-bold text-amber-800">
                {weakTopics.length} {weakTopics.length === 1 ? 'topic needs' : 'topics need'} review
              </Text>
            </View>
          )}
        </View>

        <Text className="text-xs text-gray leading-relaxed mb-4">
          Topics you've struggled with based on your quiz performance and flashcard reviews.
        </Text>

        <View className="flex-row justify-end">
          {weakTopics.length === 0 ? (
            <TouchableOpacity
              onPress={handleRestore}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl border border-muted/30 bg-white"
              activeOpacity={0.8}
            >
              <Icon name="refresh-outline" size={14} color="#242021" />
              <Text className="text-xs font-bold text-brand">Restore Sample</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleClear}
              className="px-2 py-1 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-[11px] font-semibold text-gray-400">
                Simulate 100% Mastery
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sorted List or Empty State */}
      {weakTopics.length === 0 ? (
        <WeakAreasEmptyState
          onTakeQuiz={handleTakeQuiz}
          onRestoreSample={handleRestore}
        />
      ) : (
        <View>
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Sorted by lowest mastery
            </Text>
            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {weakTopics.length} topics
            </Text>
          </View>

          {weakTopics.map((item) => (
            <WeakTopicCard
              key={item.id}
              topicData={item}
              onPracticeFlashcards={handlePracticeFlashcards}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
