import React from 'react';
import { View, Text } from 'react-native';
import { Icon, IconName } from '@/components/ui/Icon';

export interface StatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  trend?: string;
  isHighlight?: boolean;
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  isHighlight = false,
}: StatCardProps) {
  return (
    <View
      className={`p-4 rounded-2xl border shadow-xs justify-between flex-1 ${
        isHighlight
          ? 'bg-amber-500/10 border-amber-300/70'
          : 'bg-white border-muted/30'
      }`}
      style={{ minHeight: 110 }}
    >
      {/* Top Row: Label & Icon */}
      <View className="flex-row items-center justify-between gap-1 mb-2">
        <Text
          numberOfLines={1}
          className="text-xs font-semibold text-gray flex-1 pr-1"
        >
          {label}
        </Text>
        <View
          className={`w-8 h-8 rounded-xl items-center justify-center ${
            isHighlight ? 'bg-amber-500' : 'bg-brand/10'
          }`}
        >
          <Icon
            name={icon}
            size={16}
            color={isHighlight ? '#ffffff' : '#242021'}
          />
        </View>
      </View>

      {/* Value and Trend */}
      <View>
        <Text className="text-2xl font-extrabold text-brand tracking-tight mb-1">
          {value}
        </Text>

        {trend && (
          <View className="flex-row items-center gap-1">
            <Icon
              name="trending-up-outline"
              size={12}
              color={isHighlight ? '#d97706' : '#059669'}
            />
            <Text
              className={`text-[10px] font-bold ${
                isHighlight ? 'text-amber-700' : 'text-emerald-600'
              }`}
            >
              {trend}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default StatCard;
