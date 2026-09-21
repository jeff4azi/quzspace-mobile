import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SegmentedControl, SegmentOption } from '@/components/create-space/SegmentedControl';
import { FlashcardTile } from '@/components/study-space/FlashcardTile';
import { FlashcardStudyMode } from '@/components/study-space/FlashcardStudyMode';
import { FlashcardsEmptyState } from '@/components/study-space/FlashcardsEmptyState';
import { Icon } from '@/components/ui/Icon';
import { mockFlashcards, Flashcard } from '@/data/mockFlashcards';

type ViewMode = 'grid' | 'study';

const VIEW_MODE_OPTIONS: SegmentOption<ViewMode>[] = [
  { id: 'grid', label: 'Grid View', icon: 'grid-outline' },
  { id: 'study', label: 'Study Mode', icon: 'school-outline' },
];

export default function SpaceFlashcardsTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cards, setCards] = useState<Flashcard[]>(mockFlashcards);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const masteredCount = cards.filter((c) => c.mastered).length;

  const handleToggleMastered = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, mastered: !c.mastered } : c
      )
    );
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setCards(mockFlashcards);
    }, 1200);
  };

  if (!cards || cards.length === 0) {
    return (
      <ScrollView
        className="flex-1 bg-light"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <FlashcardsEmptyState onGenerateClick={handleRegenerate} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Row: Title & Count Badge */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between flex-wrap gap-2 mb-3">
          <View className="flex-row items-center gap-2.5">
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              Flashcards
            </Text>
            <View className="px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/20">
              <Text className="text-xs font-bold text-brand">
                {cards.length} cards · <Text className="text-emerald-700">{masteredCount} mastered</Text>
              </Text>
            </View>
          </View>

          {/* Regenerate Button */}
          <TouchableOpacity
            onPress={handleRegenerate}
            disabled={isRegenerating}
            activeOpacity={0.7}
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-muted/30 shadow-2xs"
          >
            {isRegenerating ? (
              <ActivityIndicator size="small" color="#242021" />
            ) : (
              <Icon name="sync-outline" size={13} color="#242021" />
            )}
            <Text className="text-xs font-bold text-brand">
              {isRegenerating ? 'Generating...' : 'Regenerate'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* View Mode Segmented Control */}
        <SegmentedControl<ViewMode>
          options={VIEW_MODE_OPTIONS}
          activeId={viewMode}
          onChange={(newMode) => setViewMode(newMode)}
        />
      </View>

      {/* Main Flashcard View */}
      {viewMode === 'grid' ? (
        <View className="pt-2">
          {cards.map((card, idx) => (
            <FlashcardTile
              key={card.id}
              card={card}
              cardNumber={idx + 1}
              onToggleMastered={handleToggleMastered}
            />
          ))}
        </View>
      ) : (
        <FlashcardStudyMode
          cards={cards}
          onToggleMastered={handleToggleMastered}
        />
      )}
    </ScrollView>
  );
}
