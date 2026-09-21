import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconName } from '@/components/ui/Icon';
import { AvatarStack } from '@/components/shared/AvatarStack';
import { DefinitionCard } from '@/components/study-space/DefinitionCard';
import { FlashcardTile } from '@/components/study-space/FlashcardTile';
import { QuizCard } from '@/components/study-space/QuizCard';
import { Leaderboard } from '@/components/study-space/Leaderboard';
import { mockSharedSpace } from '@/data/mockSharedSpace';
import { mockSummary } from '@/data/mockSummary';
import { mockFlashcards } from '@/data/mockFlashcards';
import { mockQuizzes } from '@/data/mockQuizzes';
import { mockOverallLeaderboard } from '@/data/mockCommunity';
import { ActiveMember } from '@/data/mockStudySpaces';

type SharedTab = 'summary' | 'flashcards' | 'quiz' | 'leaderboard';

interface SharedTabItem {
  id: SharedTab;
  label: string;
  icon: IconName;
}

const SHARED_TABS: SharedTabItem[] = [
  { id: 'summary', label: 'Summary', icon: 'document-text-outline' },
  { id: 'flashcards', label: 'Flashcards', icon: 'albums-outline' },
  { id: 'quiz', label: 'Quizzes', icon: 'help-circle-outline' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'trophy-outline' },
];

const INITIAL_VIEWERS: ActiveMember[] = [
  { id: 'v-1', name: 'Alex Chen', avatarInitials: 'AC', avatarColor: '#2563eb' },
  { id: 'v-2', name: 'Sarah Jenkins', avatarInitials: 'SJ', avatarColor: '#d97706' },
  { id: 'v-3', name: 'David Rodriguez', avatarInitials: 'DR', avatarColor: '#059669' },
  { id: 'v-4', name: 'Elena Torres', avatarInitials: 'ET', avatarColor: '#9333ea' },
];

export default function SharedStudySpaceScreen() {
  const { shareCode } = useLocalSearchParams<{ shareCode: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<SharedTab>('summary');
  const [showBanner, setShowBanner] = useState(true);
  const [activeViewers, setActiveViewers] = useState<ActiveMember[]>(INITIAL_VIEWERS);
  const [cards, setCards] = useState(mockFlashcards);

  const space = mockSharedSpace;

  // Periodic subtle viewer presence fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers((prev) => {
        if (prev.length < 5) {
          return [
            ...prev,
            {
              id: `v-${Date.now()}`,
              name: 'Marcus Lee',
              avatarInitials: 'ML',
              avatarColor: '#e11d48',
            },
          ];
        } else {
          return prev.slice(0, 3);
        }
      });
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleMastered = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, mastered: !c.mastered } : c
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      {/* Top Navbar */}
      <View
        style={{
          paddingTop: insets.top + 6,
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(174, 171, 172, 0.25)',
        }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.push('/(app)/dashboard')}
            activeOpacity={0.7}
            className="flex-row items-center gap-2"
          >
            <Image
              source={require('@/assets/images/Quzspace_logo.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
            <Text className="text-lg font-black text-brand tracking-tight">
              Quz<Text className="text-gray font-semibold">Space</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(public)/signup')}
            activeOpacity={0.8}
            className="px-3.5 py-1.5 rounded-xl bg-brand active:bg-darker shadow-2xs"
          >
            <Text className="text-xs font-bold text-light">Sign Up Free</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dismissible Banner */}
      {showBanner && (
        <View className="bg-[#242021] px-4 py-2.5 flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center justify-center gap-1.5 mr-2">
            <Icon name="sparkles" size={13} color="#fde047" />
            <Text className="text-xs font-medium text-light text-center">
              Shared Study Space ·{' '}
              <Text
                onPress={() => router.push('/(public)/signup')}
                className="font-bold underline text-amber-300"
              >
                Sign up free to edit & save
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowBanner(false)}
            activeOpacity={0.7}
            className="p-1"
          >
            <Icon name="close" size={14} color="#f1f1f1" />
          </TouchableOpacity>
        </View>
      )}

      {/* Main Scroll Area */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Space Header Card */}
        <View className="bg-white rounded-3xl border border-muted/30 p-5 shadow-xs mb-5">
          {/* Top Row Tags & Viewers */}
          <View className="flex-row items-center justify-between gap-2 flex-wrap mb-3">
            <View className="flex-row items-center gap-2 flex-wrap">
              <View className="px-2.5 py-0.5 rounded-md bg-brand/10 border border-brand/20">
                <Text className="text-[11px] font-bold text-brand uppercase tracking-wider">
                  {space.subject}
                </Text>
              </View>

              <View className="flex-row items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-50 border border-muted/30">
                <Icon name="person-circle-outline" size={13} color="#242021" />
                <Text className="text-[11px] font-semibold text-gray-700">
                  Shared by {space.ownerName}
                </Text>
              </View>
            </View>

            {/* Active Viewers Live Stack */}
            <AvatarStack viewers={activeViewers} size="sm" />
          </View>

          {/* Title */}
          <Text className="text-xl font-extrabold text-brand tracking-tight mb-2">
            {space.title}
          </Text>

          {/* Description */}
          <Text className="text-xs text-gray leading-relaxed mb-4">
            {space.description}
          </Text>

          {/* Metadata Row */}
          <View className="flex-row items-center gap-3 pt-3 border-t border-muted/20 flex-wrap">
            {/* Locked Files indicator */}
            {!space.filesVisible && (
              <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                <Icon name="lock-closed" size={12} color="#d97706" />
                <Text className="text-[11px] font-semibold text-amber-800">
                  Files not shared
                </Text>
              </View>
            )}

            <View className="flex-row items-center gap-1">
              <Icon name="calendar-outline" size={13} color="#5d5a5b" />
              <Text className="text-xs font-medium text-gray">
                Shared {space.sharedDate}
              </Text>
            </View>

            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
              <Icon name="sparkles" size={11} color="#059669" />
              <Text className="text-[11px] font-bold text-emerald-700">
                {space.progressPercent}% Mastery
              </Text>
            </View>
          </View>
        </View>

        {/* Tab Switcher */}
        <View className="flex-row p-1 rounded-2xl bg-white border border-muted/30 mb-5">
          {SHARED_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: isActive ? '#242021' : 'transparent',
                }}
              >
                <Icon
                  name={tab.icon}
                  size={14}
                  color={isActive ? '#f1f1f1' : '#5d5a5b'}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: isActive ? '#f1f1f1' : '#5d5a5b',
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Active Tab Content */}
        {activeTab === 'summary' && (
          <View>
            {/* Key Takeaways */}
            <View className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-5">
              <View className="flex-row items-center gap-2 mb-3">
                <Icon name="bulb-outline" size={17} color="#242021" />
                <Text className="text-base font-extrabold text-brand">
                  Key Takeaways
                </Text>
              </View>

              <View className="gap-2.5">
                {mockSummary.keyPoints.map((point, idx) => (
                  <View key={idx} className="flex-row items-start gap-2.5">
                    <View className="w-5 h-5 rounded-full bg-brand/10 items-center justify-center shrink-0 mt-0.5">
                      <Text className="text-[10px] font-bold text-brand">
                        {idx + 1}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-700 flex-1 leading-relaxed">
                      {point}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Core Definitions */}
            <View className="mb-5">
              <Text className="text-base font-extrabold text-brand mb-3 px-1">
                Core Definitions
              </Text>
              <View className="gap-3">
                {mockSummary.definitions.map((def, idx) => (
                  <DefinitionCard
                    key={idx}
                    term={def.term}
                    definition={def.definition}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'flashcards' && (
          <View>
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-base font-extrabold text-brand">
                Flashcards Deck
              </Text>
              <Text className="text-xs font-bold text-gray-500">
                {cards.length} cards
              </Text>
            </View>

            {cards.map((card, idx) => (
              <FlashcardTile
                key={card.id}
                card={card}
                cardNumber={idx + 1}
                onToggleMastered={handleToggleMastered}
              />
            ))}
          </View>
        )}

        {activeTab === 'quiz' && (
          <View>
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-base font-extrabold text-brand">
                Available Quizzes
              </Text>
              <Text className="text-xs font-bold text-gray-500">
                {mockQuizzes.length} Quizzes
              </Text>
            </View>

            {mockQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} spaceId="shared-net-101" />
            ))}
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View>
            <Leaderboard
              entries={mockOverallLeaderboard}
              title="Space Leaderboard"
              subtext="Public learners rankings on this shared study space"
            />
          </View>
        )}

        {/* Create Your Own Space CTA Banner */}
        <View className="bg-white rounded-3xl border border-brand/20 p-6 shadow-xs mt-6 items-center text-center">
          <View className="w-12 h-12 rounded-2xl bg-amber-400/20 items-center justify-center mb-3">
            <Icon name="sparkles" size={22} color="#d97706" />
          </View>

          <Text className="text-base font-extrabold text-brand text-center mb-1">
            Want to create your own Study Spaces?
          </Text>

          <Text className="text-xs text-gray text-center leading-relaxed mb-5 max-w-xs">
            Sign up free to upload your PDFs, get 24/7 AI tutoring, generate
            custom quizzes, and study with classmates.
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(public)/signup')}
            activeOpacity={0.8}
            className="w-full py-3.5 px-5 rounded-xl bg-brand items-center justify-center shadow-xs active:bg-darker mb-3"
          >
            <Text className="text-xs font-bold text-light">
              Sign Up Free · 100% Free
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(public)/login')}
            activeOpacity={0.7}
          >
            <Text className="text-xs font-semibold text-gray">
              Already have an account?{' '}
              <Text className="font-bold text-brand underline">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
