import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '@/components/ui/Icon';

interface InviteCollaboratorModalProps {
  visible: boolean;
  onClose: () => void;
  onInviteSent?: (email: string) => void;
}

export function InviteCollaboratorModal({
  visible,
  onClose,
  onInviteSent,
}: InviteCollaboratorModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendInvite = () => {
    if (!email.trim() || isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      onInviteSent?.(email.trim());

      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        onClose();
      }, 1200);
    }, 1000);
  };

  const handleClose = () => {
    if (isLoading) return;
    setEmail('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 360,
            backgroundColor: '#ffffff',
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: 'rgba(174, 171, 172, 0.25)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2.5">
              <View className="w-10 h-10 rounded-xl bg-brand/10 items-center justify-center">
                <Icon name="person-add-outline" size={20} color="#242021" />
              </View>
              <View>
                <Text className="text-base font-extrabold text-brand">
                  Invite Collaborator
                </Text>
                <Text className="text-[11px] text-gray-500 font-medium">
                  Add peers to study together
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              className="w-7 h-7 rounded-full bg-light items-center justify-center"
            >
              <Icon name="close" size={16} color="#5d5a5b" />
            </TouchableOpacity>
          </View>

          {isSuccess ? (
            <View className="py-6 items-center justify-center">
              <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mb-2.5">
                <Icon name="checkmark" size={24} color="#059669" />
              </View>
              <Text className="text-sm font-bold text-emerald-800 text-center mb-1">
                Invitation Sent!
              </Text>
              <Text className="text-xs text-gray-500 text-center">
                We've sent an invite link to {email}.
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-xs font-bold text-gray-700 mb-1.5">
                Student Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="colleague@university.edu"
                placeholderTextColor="#aeabac"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: '#f8f8f8',
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: 'rgba(174, 171, 172, 0.35)',
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  fontSize: 13,
                  color: '#242021',
                  marginBottom: 16,
                }}
              />

              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  className="flex-1 py-3 rounded-xl border border-muted/30 bg-gray-100/80 items-center justify-center"
                >
                  <Text className="text-xs font-bold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSendInvite}
                  disabled={!email.trim() || isLoading}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 12,
                    backgroundColor: email.trim() ? '#242021' : '#aeabac',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#f1f1f1" />
                  ) : (
                    <Text className="text-xs font-bold text-light">
                      Send Invite
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default InviteCollaboratorModal;
