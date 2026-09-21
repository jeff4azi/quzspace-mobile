import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface WeakAreasEmptyStateProps {
  onTakeQuiz: () => void;
  onRestoreSample?: () => void;
}

export function WeakAreasEmptyState({
  onTakeQuiz,
  onRestoreSample,
}: WeakAreasEmptyStateProps) {
  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-8 text-center items-center shadow-xs my-6">
      {/* Trophy Icon */}
      <View className="w-16 h-16 rounded-2xl bg-amber-500/10 items-center justify-center mb-3">
        <Icon name="trophy-outline" size={32} color="#d97706" />
      </View>

      {/* Encouraging Chip */}
      <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-3">
        <Icon name="sparkles" size={13} color="#d97706" />
        <Text className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
          Great Job!
        </Text>
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Weak Areas Detected Yet
      </Text>

      <Text className="text-sm text-gray leading-relaxed mb-6 text-center max-w-xs">
        You're doing great! Take a quiz or attempt flashcards to generate targeted AI insights on topics that need extra practice.
      </Text>

      <View className="w-full sm:w-auto items-center gap-3">
        <Button
          variant="primary"
          onPress={onTakeQuiz}
          className="w-full sm:w-auto"
        >
          <Icon name="school-outline" size={18} color="#f1f1f1" />
          <Text className="text-light font-bold text-sm ml-2">Take a Quiz</Text>
        </Button>

        {onRestoreSample && (
          <TouchableOpacity
            onPress={onRestoreSample}
            activeOpacity={0.7}
            className="py-2 px-4 rounded-xl"
          >
            <Text className="text-xs font-semibold text-gray-500">
              Show Sample Weak Areas
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default WeakAreasEmptyState;
