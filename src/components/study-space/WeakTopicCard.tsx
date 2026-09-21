import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { WeakTopic } from '@/data/mockWeakAreas';

interface WeakTopicCardProps {
  topicData: WeakTopic;
  onPracticeFlashcards?: (topicName: string) => void;
}

interface MasteryStyle {
  barColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  label: string;
}

function getMasteryStyle(percent: number): MasteryStyle {
  if (percent < 30) {
    return {
      barColor: '#f59e0b',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      badgeBorder: 'border-amber-200',
      label: 'Needs Priority Review',
    };
  }
  if (percent < 45) {
    return {
      barColor: '#f59e0b',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      badgeBorder: 'border-amber-200',
      label: 'Low Mastery',
    };
  }
  return {
    barColor: '#242021',
    badgeBg: 'bg-brand/10',
    badgeText: 'text-brand',
    badgeBorder: 'border-brand/20',
    label: 'Moderate Mastery',
  };
}

export function WeakTopicCard({
  topicData,
  onPracticeFlashcards,
}: WeakTopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    topic,
    masteryPercent,
    relatedQuizzes,
    lastReviewed,
    explanation,
    keyTips,
  } = topicData;

  const style = getMasteryStyle(masteryPercent);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  return (
    <View
      className={`bg-white rounded-2xl border overflow-hidden shadow-xs mb-4 ${
        isExpanded ? 'border-brand/40' : 'border-muted/30'
      }`}
    >
      {/* Main Header / Summary Section */}
      <View className="p-5">
        {/* Top Tag & Mastery Pill */}
        <View className="flex-row items-center justify-between gap-2 mb-2 flex-wrap">
          <View
            className={`flex-row items-center gap-1 px-2.5 py-0.5 rounded-full border ${style.badgeBg} ${style.badgeBorder}`}
          >
            <Icon name="warning-outline" size={12} color={style.barColor} />
            <Text className={`text-[11px] font-bold ${style.badgeText}`}>
              {style.label} · {masteryPercent}%
            </Text>
          </View>

          {/* Expand / Close Trigger */}
          <TouchableOpacity
            onPress={toggleExpand}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isExpanded ? '#f1f1f1' : '#242021',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: isExpanded ? '#242021' : '#f1f1f1',
                marginRight: 4,
              }}
            >
              {isExpanded ? 'Close' : 'Review'}
            </Text>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={13}
              color={isExpanded ? '#242021' : '#f1f1f1'}
            />
          </TouchableOpacity>
        </View>

        {/* Topic Title */}
        <Text className="text-base font-bold text-brand leading-snug mb-2">
          {topic}
        </Text>

        {/* Metadata row */}
        <View className="flex-row items-center gap-4 flex-wrap mb-3.5">
          <View className="flex-row items-center gap-1.5">
            <Icon name="document-text-outline" size={13} color="#aeabac" />
            <Text className="text-xs font-medium text-gray-500">
              Missed in {relatedQuizzes} quiz attempt{relatedQuizzes > 1 ? 's' : ''}
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Icon name="time-outline" size={13} color="#aeabac" />
            <Text className="text-xs font-medium text-gray-500">
              {lastReviewed ? `Last reviewed ${lastReviewed}` : 'Not reviewed yet'}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View>
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-[11px] font-semibold text-gray-500">
              Mastery Level
            </Text>
            <Text className="text-[11px] font-bold text-brand">
              {masteryPercent}%
            </Text>
          </View>
          <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <View
              style={{
                width: `${masteryPercent}%`,
                backgroundColor: style.barColor,
              }}
              className="h-full rounded-full"
            />
          </View>
        </View>
      </View>

      {/* Expandable Accordion Body */}
      {isExpanded && (
        <View className="px-5 pb-5 pt-4 border-t border-muted/20 bg-gray-50/60">
          <View className="flex-row items-center gap-1.5 mb-2.5">
            <Icon name="sparkles" size={14} color="#d97706" />
            <Text className="text-xs font-bold text-brand uppercase tracking-wider">
              AI Quick Tutor Recap
            </Text>
          </View>

          {/* Explanation box */}
          <View className="bg-white p-4 rounded-xl border border-muted/30 shadow-2xs mb-3.5">
            <Text className="text-xs text-brand leading-relaxed">
              {explanation}
            </Text>
          </View>

          {/* Key Tips */}
          {keyTips && keyTips.length > 0 && (
            <View className="mb-4">
              <Text className="text-xs font-bold text-gray-700 mb-2">
                Key Concepts to Remember:
              </Text>
              {keyTips.map((tip, idx) => (
                <View key={idx} className="flex-row items-start gap-2 mb-1.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <Text className="text-xs text-gray-600 leading-relaxed flex-1">
                    {tip}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Practice Action Button */}
          <TouchableOpacity
            onPress={() => onPracticeFlashcards?.(topic)}
            activeOpacity={0.8}
            className="flex-row items-center justify-center gap-2 bg-white border border-brand/30 py-3 px-4 rounded-xl shadow-2xs active:bg-gray-100"
          >
            <Icon name="school-outline" size={16} color="#242021" />
            <Text className="text-xs font-bold text-brand">
              Practice Flashcards for this Topic
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default WeakTopicCard;
