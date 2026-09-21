import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { LeaderboardRankItem } from '@/data/mockCommunity';

interface LeaderboardProps {
  entries?: LeaderboardRankItem[];
  currentUserId?: string;
  title?: string;
  subtext?: string;
}

export function Leaderboard({
  entries = [],
  currentUserId,
  title = 'Space Leaderboard',
  subtext = 'Top performers by quiz score',
}: LeaderboardProps) {
  if (!entries || entries.length === 0) return null;

  return (
    <View className="bg-white rounded-3xl border border-muted/30 p-5 shadow-xs mb-6">
      {/* Header Row */}
      <View className="flex-row items-center justify-between gap-2 border-b border-muted/20 pb-3.5 mb-3.5">
        <View className="flex-row items-center gap-2.5">
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              backgroundColor: 'rgba(217, 119, 6, 0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="trophy" size={17} color="#d97706" />
          </View>

          <View>
            <Text className="text-base font-extrabold text-brand tracking-tight">
              {title}
            </Text>
            <Text className="text-[11px] text-gray-500 font-medium">
              {subtext}
            </Text>
          </View>
        </View>

        <View className="px-2.5 py-1 rounded-full bg-light border border-muted/20">
          <Text className="text-[11px] font-bold text-gray-600">
            {entries.length} learners
          </Text>
        </View>
      </View>

      {/* Leaderboard Entries List */}
      <View className="gap-2">
        {entries.map((item, idx) => {
          const rank = idx + 1;
          const isUser = item.isCurrentUser || item.id === currentUserId;

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
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 11,
                borderRadius: 16,
                backgroundColor: isUser
                  ? 'rgba(36, 32, 33, 0.04)'
                  : rank === 1
                  ? 'rgba(245, 158, 11, 0.04)'
                  : '#ffffff',
                borderWidth: 1,
                borderColor: isUser
                  ? 'rgba(36, 32, 33, 0.3)'
                  : rank === 1
                  ? 'rgba(245, 158, 11, 0.3)'
                  : 'rgba(174, 171, 172, 0.2)',
              }}
            >
              {/* Rank + Avatar + Name */}
              <View className="flex-1 flex-row items-center gap-2.5 min-w-0">
                {/* Rank Number */}
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: rankBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
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
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: item.avatarColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '800',
                      color: '#ffffff',
                    }}
                  >
                    {item.avatarInitials}
                  </Text>
                </View>

                {/* Name & Quizzes */}
                <View className="flex-1 min-w-0">
                  <View className="flex-row items-center gap-1">
                    <Text
                      numberOfLines={1}
                      className="text-xs font-bold text-brand leading-tight"
                    >
                      {item.name}
                    </Text>
                    {isUser && (
                      <Text className="text-[10px] font-extrabold text-brand">
                        (You)
                      </Text>
                    )}
                  </View>
                  <Text className="text-[10px] text-gray-400 font-medium">
                    {item.quizzesTaken} quiz{item.quizzesTaken === 1 ? '' : 'zes'} completed
                  </Text>
                </View>
              </View>

              {/* Best Score Badge */}
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  backgroundColor:
                    rank === 1
                      ? '#fef3c7'
                      : isUser
                      ? '#242021'
                      : '#ecfdf5',
                  borderWidth: 1,
                  borderColor:
                    rank === 1
                      ? '#fde68a'
                      : isUser
                      ? '#242021'
                      : '#a7f3d0',
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '800',
                    color:
                      rank === 1
                        ? '#92400e'
                        : isUser
                        ? '#f1f1f1'
                        : '#065f46',
                  }}
                >
                  {item.bestScore}%
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default Leaderboard;
