import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { CommunityMember } from '@/data/mockCommunity';

interface CommunityMemberRowProps {
  member: CommunityMember;
}

export function CommunityMemberRow({ member }: CommunityMemberRowProps) {
  const isCollaborator = member.role === 'collaborator';
  const isOwner = member.role === 'owner';

  return (
    <View className="bg-white rounded-2xl border border-muted/30 p-4 shadow-2xs mb-3">
      <View className="flex-row items-center justify-between gap-3">
        {/* Left: Avatar + Name & Date */}
        <View className="flex-1 flex-row items-center gap-3 min-w-0">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: member.avatarColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#ffffff' }}>
              {member.avatarInitials}
            </Text>
          </View>

          <View className="flex-1 min-w-0">
            <View className="flex-row items-center gap-1.5 flex-wrap">
              <Text
                numberOfLines={1}
                className="text-sm font-bold text-brand leading-tight"
              >
                {member.name}
              </Text>

              {/* Role Pill */}
              <View
                className={`px-2 py-0.5 rounded-md border ${
                  isOwner
                    ? 'bg-amber-100 border-amber-200'
                    : isCollaborator
                    ? 'bg-brand/10 border-brand/20'
                    : 'bg-gray-100 border-muted/20'
                }`}
              >
                <Text
                  className={`text-[9px] font-bold ${
                    isOwner
                      ? 'text-amber-800'
                      : isCollaborator
                      ? 'text-brand'
                      : 'text-gray-600'
                  }`}
                >
                  {isOwner ? 'Owner' : isCollaborator ? 'Collaborator' : 'Visitor'}
                </Text>
              </View>
            </View>

            <Text className="text-[11px] text-gray-400 font-medium mt-0.5">
              {member.joinedDate || member.firstVisited}
            </Text>
          </View>
        </View>

        {/* Right: Avg Score Badge */}
        <View className="items-end shrink-0">
          <View className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200">
            <Text className="text-xs font-extrabold text-emerald-700">
              {member.avgScore}%
            </Text>
          </View>
          <Text className="text-[10px] text-gray-400 font-medium mt-1">
            {member.quizzesTaken} {member.quizzesTaken === 1 ? 'quiz' : 'quizzes'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CommunityMemberRow;
