import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { LeaderboardEntry } from '@/data/mockQuizzes';

interface QuizLeaderboardPreviewProps {
  leaderboard?: LeaderboardEntry[];
}

export function QuizLeaderboardPreview({
  leaderboard = [],
}: QuizLeaderboardPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <View className="flex-row items-center gap-1.5 py-1">
        <Icon name="trophy-outline" size={13} color="#d97706" />
        <Text className="text-[11px] font-medium text-gray-400">
          Be the first to top this quiz!
        </Text>
      </View>
    );
  }

  const topViewers = leaderboard.slice(0, 3);
  const topScore = leaderboard[0];

  return (
    <View className="pt-1">
      {/* Compact Trigger Row */}
      <TouchableOpacity
        onPress={() => setIsExpanded((prev) => !prev)}
        activeOpacity={0.8}
        className="flex-row items-center justify-between gap-2 p-2 rounded-xl bg-light/70 border border-muted/20"
      >
        <View className="flex-1 flex-row items-center gap-2 min-w-0">
          <Icon name="trophy" size={15} color="#d97706" />

          {/* Overlapping Top Avatars */}
          <View className="flex-row items-center">
            {topViewers.map((user, idx) => (
              <View
                key={user.id}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: user.avatarColor,
                  borderWidth: 1.5,
                  borderColor: '#ffffff',
                  marginLeft: idx === 0 ? 0 : -6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: '800',
                    color: '#ffffff',
                  }}
                >
                  {user.avatarInitials}
                </Text>
              </View>
            ))}
          </View>

          <Text
            numberOfLines={1}
            className="text-[11px] font-semibold text-brand flex-1 ml-0.5"
          >
            Top: {topScore.name} ({topScore.score}%)
          </Text>
        </View>

        <View className="flex-row items-center gap-0.5 shrink-0">
          <Text className="text-[10px] font-bold text-brand">
            {isExpanded ? 'Hide' : 'Leaderboard'}
          </Text>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={12}
            color="#242021"
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Per-Quiz Leaderboard */}
      {isExpanded && (
        <View className="p-3 mt-1.5 rounded-xl bg-white border border-muted/30 shadow-2xs gap-1.5">
          <View className="flex-row items-center justify-between border-b border-muted/20 pb-1.5 mb-1">
            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Quiz Rankings
            </Text>
            <Text className="text-[10px] font-semibold text-gray-400">
              {leaderboard.length} learners
            </Text>
          </View>

          {leaderboard.map((item, idx) => {
            const rank = idx + 1;
            let rankBg = '#f1f1f1';
            let rankText = '#5d5a5b';

            if (rank === 1) {
              rankBg = '#f59e0b';
              rankText = '#ffffff';
            } else if (rank === 2) {
              rankBg = '#94a3b8';
              rankText = '#ffffff';
            } else if (rank === 3) {
              rankBg = '#b45309';
              rankText = '#ffffff';
            }

            return (
              <View
                key={item.id || idx}
                className="flex-row items-center justify-between gap-2 p-1.5 rounded-lg bg-gray-50/70"
              >
                <View className="flex-1 flex-row items-center gap-2 min-w-0">
                  {/* Rank Badge */}
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: rankBg,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '800',
                        color: rankText,
                      }}
                    >
                      {rank}
                    </Text>
                  </View>

                  {/* Avatar */}
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: item.avatarColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: '800',
                        color: '#ffffff',
                      }}
                    >
                      {item.avatarInitials}
                    </Text>
                  </View>

                  {/* Name */}
                  <Text
                    numberOfLines={1}
                    className="text-xs font-semibold text-brand flex-1"
                  >
                    {item.name}
                  </Text>
                </View>

                {/* Completed Date & Score */}
                <View className="flex-row items-center gap-2 shrink-0">
                  <Text className="text-[10px] text-gray-400 font-medium">
                    {item.completedAt}
                  </Text>
                  <View className="px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                    <Text className="text-[10px] font-extrabold text-emerald-700">
                      {item.score}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default QuizLeaderboardPreview;
