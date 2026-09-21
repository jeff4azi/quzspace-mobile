import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface CommunityEmptyStateProps {
  onInviteClick?: () => void;
}

export function CommunityEmptyState({
  onInviteClick,
}: CommunityEmptyStateProps) {
  return (
    <View className="bg-white rounded-3xl border border-muted/30 p-8 items-center text-center shadow-xs my-6">
      <View className="w-16 h-16 rounded-2xl bg-brand/10 items-center justify-center mb-4">
        <Icon name="people-outline" size={32} color="#242021" />
      </View>

      <Text className="text-xl font-extrabold text-brand tracking-tight mb-2 text-center">
        No Study Space Members Yet
      </Text>

      <Text className="text-xs text-gray text-center leading-relaxed max-w-xs mb-6">
        Share this study space link or invite classmates to collaborate,
        practice quizzes together, and climb the leaderboard.
      </Text>

      {onInviteClick && (
        <Button variant="primary" onPress={onInviteClick} className="px-6 py-3">
          <View className="flex-row items-center gap-2">
            <Icon name="person-add-outline" size={16} color="#f1f1f1" />
            <Text className="text-xs font-bold text-light">
              Invite Collaborator
            </Text>
          </View>
        </Button>
      )}
    </View>
  );
}

export default CommunityEmptyState;
