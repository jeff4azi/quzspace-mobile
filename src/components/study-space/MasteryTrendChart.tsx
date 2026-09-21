import React from 'react';
import { View, Text } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Line,
  Text as SvgText,
  G,
} from 'react-native-svg';
import { Icon } from '@/components/ui/Icon';
import { MasteryDataPoint } from '@/data/mockProgress';

interface MasteryTrendChartProps {
  data?: MasteryDataPoint[];
}

export function MasteryTrendChart({ data = [] }: MasteryTrendChartProps) {
  if (!data || data.length === 0) return null;

  const width = 320;
  const height = 150;
  const paddingX = 24;
  const paddingTop = 20;
  const paddingBottom = 25;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;

  // Calculate coordinates
  const points = data.map((item, index) => {
    const x = paddingX + (index / (data.length - 1)) * chartWidth;
    const y = height - paddingBottom - (item.masteryPercent / 100) * chartHeight;
    return { x, y, date: item.date, percent: item.masteryPercent };
  });

  // Line path
  const linePath = points.reduce((acc, point, index) => {
    return index === 0
      ? `M ${point.x} ${point.y}`
      : `${acc} L ${point.x} ${point.y}`;
  }, '');

  // Area path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    height - paddingBottom
  } L ${points[0].x} ${height - paddingBottom} Z`;

  const latestPercent = points[points.length - 1]?.percent || 0;
  const firstPercent = points[0]?.percent || 0;
  const totalGain = latestPercent - firstPercent;

  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Icon name="trending-up-outline" size={18} color="#059669" />
          <View>
            <Text className="text-base font-bold text-brand">
              Mastery Trend
            </Text>
            <Text className="text-[11px] text-gray">
              Retention & quiz accuracy
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-base font-extrabold text-emerald-600">
            +{totalGain}%
          </Text>
          <Text className="text-[10px] text-gray-400">
            Total gain
          </Text>
        </View>
      </View>

      {/* SVG Chart Area */}
      <View className="items-center justify-center my-1">
        <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id="masteryGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#242021" stopOpacity="0.2" />
              <Stop offset="1" stopColor="#242021" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Grid lines */}
          <Line
            x1={paddingX}
            y1={height - paddingBottom}
            x2={width - paddingX}
            y2={height - paddingBottom}
            stroke="#aeabac"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
          <Line
            x1={paddingX}
            y1={paddingTop + chartHeight / 2}
            x2={width - paddingX}
            y2={paddingTop + chartHeight / 2}
            stroke="#aeabac"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />

          {/* Area Fill */}
          <Path d={areaPath} fill="url(#masteryGrad)" />

          {/* Line Path */}
          <Path
            d={linePath}
            fill="none"
            stroke="#242021"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point Dots & Labels */}
          {points.map((pt, idx) => (
            <G key={idx}>
              <Circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#ffffff"
                stroke="#242021"
                strokeWidth="2"
              />
              <SvgText
                x={pt.x}
                y={pt.y - 7}
                fontSize="9"
                fontWeight="700"
                fill="#242021"
                textAnchor="middle"
              >
                {pt.percent}%
              </SvgText>
            </G>
          ))}
        </Svg>
      </View>

      {/* Date Axis Row */}
      <View className="flex-row justify-between pt-2 border-t border-muted/20 px-1">
        <Text className="text-xs font-semibold text-gray-400">
          {data[0]?.date}
        </Text>
        <Text className="text-xs font-bold text-brand">
          Current: {latestPercent}%
        </Text>
        <Text className="text-xs font-semibold text-gray-400">
          {data[data.length - 1]?.date}
        </Text>
      </View>
    </View>
  );
}

export default MasteryTrendChart;
