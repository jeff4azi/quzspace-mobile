import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { DayActivity } from '@/data/mockProgress';

interface ActivityChartProps {
  data?: DayActivity[];
}

export function ActivityChart({ data = [] }: ActivityChartProps) {
  const maxMinutes = Math.max(...data.map((item) => item.minutes), 1);
  const totalMinutes = data.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <Icon name="time-outline" size={18} color="#242021" />
          <View>
            <Text className="text-base font-bold text-brand">
              Weekly Activity
            </Text>
            <Text className="text-[11px] text-gray">
              Minutes spent studying each day
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-base font-extrabold text-brand">
            {totalMinutes} mins
          </Text>
          <Text className="text-[10px] text-gray-400">
            Total this week
          </Text>
        </View>
      </View>

      {/* Bar Chart Container */}
      <View
        className="flex-row items-end justify-between pt-6 pb-2 border-b border-muted/20 px-1"
        style={{ height: 140 }}
      >
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.minutes / maxMinutes) * 100);

          return (
            <View key={idx} className="flex-1 items-center justify-end h-full px-1">
              {/* Today indicator pill */}
              {item.isToday && (
                <View className="bg-amber-100 px-1.5 py-0.5 rounded-full mb-1">
                  <Text className="text-[8px] font-extrabold text-amber-800 uppercase">
                    Today
                  </Text>
                </View>
              )}

              {/* Bar Track & Fill */}
              <View className="w-full max-w-[28px] bg-gray-100 rounded-t-lg overflow-hidden h-full justify-end">
                <View
                  style={{
                    height: `${Math.max(heightPercent, 10)}%`,
                    backgroundColor: item.isToday ? '#f59e0b' : '#242021',
                  }}
                  className="w-full rounded-t-lg"
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* X-Axis Day Labels */}
      <View className="flex-row justify-between pt-2 px-1">
        {data.map((item, idx) => (
          <Text
            key={idx}
            className={`flex-1 text-center text-xs font-semibold ${
              item.isToday ? 'text-brand font-bold' : 'text-gray-400'
            }`}
          >
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default ActivityChart;
