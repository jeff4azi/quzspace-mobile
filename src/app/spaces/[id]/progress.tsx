import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { mockProgressData } from '@/data/mockProgress';
import { StatCard } from '@/components/study-space/StatCard';
import { ActivityChart } from '@/components/study-space/ActivityChart';
import { MasteryTrendChart } from '@/components/study-space/MasteryTrendChart';
import { Icon } from '@/components/ui/Icon';

export default function ProgressTabScreen() {
  const {
    quizzesCompleted,
    flashcardsStudied,
    studyStreak,
    averageScore,
    quizzesTrend,
    flashcardsTrend,
    scoreTrend,
    weeklyActivity,
    masteryOverTime,
    motivationalHeading,
    motivationalText,
  } = mockProgressData;

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs mb-5">
        <View className="flex-row items-center justify-between gap-2 mb-1 flex-wrap">
          <View className="flex-row items-center gap-2">
            <Icon name="trending-up-outline" size={20} color="#242021" />
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              Your Progress
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200">
            <Icon name="sparkles" size={12} color="#059669" />
            <Text className="text-xs font-bold text-emerald-700">
              On Track for A Grade
            </Text>
          </View>
        </View>

        <Text className="text-xs text-gray leading-relaxed">
          Track how you're mastering this study space over time.
        </Text>
      </View>

      {/* 2x2 Stat Cards Grid */}
      <View className="mb-5">
        {/* Row 1 */}
        <View className="flex-row gap-3 mb-3">
          <StatCard
            icon="school-outline"
            label="Quizzes Taken"
            value={quizzesCompleted}
            trend={quizzesTrend}
          />
          <StatCard
            icon="sparkles-outline"
            label="Flashcards Studied"
            value={flashcardsStudied}
            trend={flashcardsTrend}
          />
        </View>

        {/* Row 2 */}
        <View className="flex-row gap-3">
          <StatCard
            icon="flame"
            label="Study Streak"
            value={`${studyStreak} Days`}
            trend="Personal Best!"
            isHighlight
          />
          <StatCard
            icon="bar-chart-outline"
            label="Average Score"
            value={`${averageScore}%`}
            trend={scoreTrend}
          />
        </View>
      </View>

      {/* Weekly Activity Bar Chart */}
      <ActivityChart data={weeklyActivity} />

      {/* Mastery Trend SVG Chart */}
      <MasteryTrendChart data={masteryOverTime} />

      {/* Motivational Callout Banner */}
      <View className="bg-amber-500/10 border border-amber-300/60 p-5 rounded-2xl shadow-xs">
        <View className="flex-row items-center gap-2 mb-2">
          <Icon name="flame" size={20} color="#d97706" />
          <Text className="text-sm font-extrabold text-amber-950 tracking-tight flex-1">
            {motivationalHeading}
          </Text>
        </View>
        <Text className="text-xs text-amber-950/80 leading-relaxed pl-7">
          {motivationalText}
        </Text>
      </View>
    </ScrollView>
  );
}
