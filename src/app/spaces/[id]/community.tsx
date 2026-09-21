import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { Leaderboard } from '@/components/study-space/Leaderboard';
import { CommunityMemberRow } from '@/components/study-space/CommunityMemberRow';
import { InviteCollaboratorModal } from '@/components/study-space/InviteCollaboratorModal';
import { CommunityEmptyState } from '@/components/study-space/CommunityEmptyState';
import {
  mockCollaborators,
  mockLinkTakers,
  mockOverallLeaderboard,
  CommunityMember,
} from '@/data/mockCommunity';

export default function SpaceCommunityTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [collaborators, setCollaborators] =
    useState<CommunityMember[]>(mockCollaborators);
  const [visitors, setVisitors] = useState<CommunityMember[]>(mockLinkTakers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const totalMembers = collaborators.length + visitors.length + 1;

  const handleInviteSent = (email: string) => {
    // Add simulated pending collaborator
    const newCollab: CommunityMember = {
      id: `collab-${Date.now()}`,
      name: email.split('@')[0],
      avatarInitials: email.slice(0, 2).toUpperCase(),
      avatarColor: '#2563eb',
      role: 'collaborator',
      joinedDate: 'Joined Just now',
      email,
      quizzesTaken: 0,
      flashcardsReviewed: 0,
      avgScore: 0,
    };
    setCollaborators((prev) => [newCollab, ...prev]);
  };

  const isEmpty = collaborators.length === 0 && visitors.length === 0;

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-5 gap-3">
        <View className="flex-1 min-w-0">
          <View className="flex-row items-center gap-2 flex-wrap">
            <Text className="text-xl font-extrabold text-brand tracking-tight">
              Community
            </Text>
            <View
              style={{
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: 'rgba(36, 32, 33, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(36, 32, 33, 0.15)',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#242021',
                  includeFontPadding: false,
                }}
              >{`${totalMembers} learners`}</Text>
            </View>
          </View>
          <Text className="text-xs text-gray font-medium mt-0.5">
            Everyone collaborating and studying in this space
          </Text>
        </View>

        {/* Invite CTA Button */}
        <TouchableOpacity
          onPress={() => setIsInviteModalOpen(true)}
          activeOpacity={0.8}
          className="flex-row items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand active:bg-darker shadow-2xs shrink-0"
        >
          <Icon name="person-add-outline" size={15} color="#f1f1f1" />
          <Text className="text-xs font-bold text-light">
            Invite
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard Section */}
      <Leaderboard
        entries={mockOverallLeaderboard}
        title="Space Leaderboard"
        subtext="Rankings calculated from quiz mastery and recall activity"
      />

      {isEmpty ? (
        <CommunityEmptyState onInviteClick={() => setIsInviteModalOpen(true)} />
      ) : (
        <>
          {/* Collaborators Sub-section */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <View className="flex-row items-center gap-2">
                <Icon name="people" size={16} color="#242021" />
                <Text className="text-sm font-extrabold text-brand">
                  Invited Collaborators ({collaborators.length})
                </Text>
              </View>
              <Text className="text-[11px] text-gray-400 font-medium">
                Full edit & study access
              </Text>
            </View>

            {collaborators.map((collab) => (
              <CommunityMemberRow key={collab.id} member={collab} />
            ))}
          </View>

          {/* Visitors via Shared Link Sub-section */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <View className="flex-row items-center gap-2">
                <Icon name="link-outline" size={16} color="#5d5a5b" />
                <Text className="text-sm font-extrabold text-brand">
                  Visitors via Shared Link ({visitors.length})
                </Text>
              </View>
              <Text className="text-[11px] text-gray-400 font-medium">
                Public learners
              </Text>
            </View>

            {visitors.map((visitor) => (
              <CommunityMemberRow key={visitor.id} member={visitor} />
            ))}
          </View>
        </>
      )}

      {/* Invite Modal */}
      <InviteCollaboratorModal
        visible={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInviteSent={handleInviteSent}
      />
    </ScrollView>
  );
}
