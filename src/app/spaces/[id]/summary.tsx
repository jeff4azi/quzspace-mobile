import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { mockSummary, StudySummary } from '@/data/mockSummary';
import { DefinitionCard } from '@/components/study-space/DefinitionCard';
import { SummaryEmptyState } from '@/components/study-space/tabs/SummaryEmptyState';
import { Icon } from '@/components/ui/Icon';

export default function SummaryTabScreen() {
  const [summary, setSummary] = useState<StudySummary | null>(mockSummary);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setSummary({
        ...mockSummary,
        generatedAt: 'Just now',
      });
    }, 1200);
  };

  if (!summary) {
    return (
      <ScrollView
        className="flex-1 bg-light"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        <SummaryEmptyState onGenerateClick={handleRegenerate} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Row: Title, Timestamp & Regenerate Action */}
      <View className="flex-row items-center justify-between mb-6 pb-4 border-b border-muted/20">
        <View className="flex-row items-center gap-2 flex-wrap">
          <View className="flex-row items-center gap-1.5">
            <Icon name="sparkles" size={18} color="#d97706" />
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              AI Summary
            </Text>
          </View>
          <View className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-muted/20">
            <Text className="text-[11px] font-semibold text-gray-600">
              {summary.generatedAt}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegenerate}
          disabled={isRegenerating}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(174, 171, 172, 0.35)',
            flexShrink: 0,
          }}
        >
          {isRegenerating ? (
            <ActivityIndicator size="small" color="#242021" />
          ) : (
            <>
              <Icon name="refresh-outline" size={15} color="#242021" />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: '#242021',
                  marginLeft: 5,
                }}
              >
                Regenerate
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* 1. Key Takeaways Section */}
      <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs mb-6">
        <View className="flex-row items-center gap-2 mb-4">
          <Icon name="sparkles-outline" size={18} color="#242021" />
          <Text className="text-base font-extrabold text-brand tracking-tight">
            Key Takeaways
          </Text>
        </View>

        <View className="space-y-3">
          {summary.keyPoints.map((point, idx) => (
            <View key={idx} className="flex-row items-start gap-3 mb-3">
              <Icon name="checkmark-circle" size={18} color="#059669" style={{ marginTop: 2 }} />
              <Text className="text-xs text-gray leading-relaxed flex-1">
                {point}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 2. Important Definitions Section */}
      <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Icon name="book-outline" size={18} color="#242021" />
          <Text className="text-base font-extrabold text-brand tracking-tight">
            Important Definitions
          </Text>
        </View>

        {summary.definitions.map((def, idx) => (
          <DefinitionCard
            key={idx}
            term={def.term}
            definition={def.definition}
          />
        ))}
      </View>

      {/* 3. Core Concepts & Mechanics Section */}
      <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Icon name="hardware-chip-outline" size={18} color="#242021" />
          <Text className="text-base font-extrabold text-brand tracking-tight">
            Core Concepts & Mechanics
          </Text>
        </View>

        {summary.mainConcepts.map((concept, idx) => (
          <View
            key={idx}
            className="border-l-4 border-brand bg-white rounded-r-2xl p-5 shadow-xs border-y border-r border-muted/20 mb-3.5"
          >
            <Text className="text-sm font-bold text-brand tracking-tight mb-1.5">
              {concept.title}
            </Text>
            <Text className="text-xs text-gray leading-relaxed">
              {concept.description}
            </Text>
          </View>
        ))}
      </View>

      {/* 4. High-Yield Exam Tips Callout Box */}
      <View className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 shadow-xs mb-2">
        <View className="flex-row items-center gap-2.5 mb-3.5">
          <View className="w-8 h-8 rounded-xl bg-amber-500 items-center justify-center shadow-xs">
            <Icon name="bulb-outline" size={18} color="#ffffff" />
          </View>
          <View>
            <Text className="text-sm font-extrabold text-amber-950 tracking-tight">
              High-Yield Exam Tips
            </Text>
            <Text className="text-[11px] text-amber-900/80 font-medium">
              Actionable advice for midterms and final exams
            </Text>
          </View>
        </View>

        <View className="space-y-2.5">
          {summary.examTips.map((tip, idx) => (
            <View key={idx} className="flex-row items-start gap-2.5 mb-2.5">
              <View className="w-5 h-5 rounded-full bg-amber-500/20 items-center justify-center shrink-0 mt-0.5">
                <Text className="text-[10px] font-bold text-amber-950">
                  {idx + 1}
                </Text>
              </View>
              <Text className="text-xs text-amber-950 font-medium leading-relaxed flex-1">
                {tip}
              </Text>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}
