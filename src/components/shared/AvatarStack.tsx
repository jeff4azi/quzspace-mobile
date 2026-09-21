import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { ActiveMember } from '@/data/mockStudySpaces';
import { Icon } from '@/components/ui/Icon';

interface AvatarStackProps {
  viewers?: ActiveMember[];
  size?: 'sm' | 'default';
  showLabel?: boolean;
  labelSuffix?: string;
}

export function AvatarStack({
  viewers = [],
  size = 'default',
  showLabel = true,
  labelSuffix = 'studying now',
}: AvatarStackProps) {
  const [modalVisible, setModalVisible] = useState(false);

  if (!viewers || viewers.length === 0) return null;

  const isSmall = size === 'sm';
  const visibleViewers = viewers.slice(0, isSmall ? 3 : 4);
  const extraCount = viewers.length - visibleViewers.length;

  const avatarDim = isSmall ? 22 : 26;
  const fontSize = isSmall ? 9 : 11;

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.75}
        className={`flex-row items-center bg-white rounded-full border border-muted/30 shadow-xs ${
          isSmall ? 'px-2 py-1' : 'px-2.5 py-1.5'
        }`}
      >
        {/* Pulsing Green Dot */}
        <View className="mr-1.5 flex-row items-center justify-center">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
        </View>

        {/* Stack of Avatars */}
        <View className="flex-row items-center">
          {visibleViewers.map((viewer, index) => (
            <View
              key={viewer.id}
              style={{
                width: avatarDim,
                height: avatarDim,
                borderRadius: avatarDim / 2,
                backgroundColor: viewer.avatarColor || '#242021',
                marginLeft: index === 0 ? 0 : -6,
                borderWidth: 1.5,
                borderColor: '#ffffff',
              }}
              className="items-center justify-center"
            >
              <Text
                style={{ fontSize, color: '#f1f1f1', fontWeight: '700' }}
              >
                {viewer.avatarInitials}
              </Text>
            </View>
          ))}

          {extraCount > 0 && (
            <View
              style={{
                width: avatarDim,
                height: avatarDim,
                borderRadius: avatarDim / 2,
                backgroundColor: '#e5e7eb',
                marginLeft: -6,
                borderWidth: 1.5,
                borderColor: '#ffffff',
              }}
              className="items-center justify-center"
            >
              <Text
                style={{
                  fontSize: fontSize - 1,
                  color: '#374151',
                  fontWeight: '800',
                }}
              >
                +{extraCount}
              </Text>
            </View>
          )}
        </View>

        {/* Label Count */}
        {showLabel && (
          <Text
            className={`font-bold text-darker ml-1.5 ${
              isSmall ? 'text-[10px]' : 'text-[11px]'
            }`}
          >
            {viewers.length} {labelSuffix}
          </Text>
        )}
      </TouchableOpacity>

      {/* Active Members Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-xl border border-muted/30">
                <View className="flex-row items-center justify-between border-b border-muted/20 pb-3 mb-3">
                  <View className="flex-row items-center gap-2">
                    <View className="w-2 h-2 rounded-full bg-emerald-500" />
                    <Text className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Active Members ({viewers.length})
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Icon name="close" size={18} color="#5d5a5b" />
                  </TouchableOpacity>
                </View>

                <View className="space-y-2.5">
                  {viewers.map((viewer) => (
                    <View
                      key={viewer.id}
                      className="flex-row items-center justify-between py-1.5"
                    >
                      <View className="flex-row items-center gap-2.5">
                        <View
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            backgroundColor: viewer.avatarColor || '#242021',
                          }}
                          className="items-center justify-center"
                        >
                          <Text className="text-xs font-bold text-light">
                            {viewer.avatarInitials}
                          </Text>
                        </View>
                        <Text className="text-sm font-semibold text-brand">
                          {viewer.name}
                        </Text>
                      </View>
                      <View className="w-2 h-2 rounded-full bg-emerald-500" />
                    </View>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

export default AvatarStack;
