import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert, Share } from 'react-native';
import { Icon, IconName } from '@/components/ui/Icon';
import { StudyFile } from '@/data/mockFiles';

interface FileRowProps {
  file: StudyFile;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
  onDownload?: (id: string) => void;
}

interface BadgeConfig {
  icon: IconName;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

function getFileTypeBadge(file: StudyFile): BadgeConfig {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const type = file.type?.toLowerCase() || ext;

  if (type === 'pdf' || ext === 'pdf') {
    return {
      icon: 'document-text-outline',
      bgColor: 'bg-rose-50',
      textColor: '#e11d48',
      borderColor: 'border-rose-200',
    };
  }
  if (type === 'docx' || ext === 'docx' || ext === 'doc') {
    return {
      icon: 'document-text-outline',
      bgColor: 'bg-blue-50',
      textColor: '#2563eb',
      borderColor: 'border-blue-200',
    };
  }
  if (type === 'pptx' || ext === 'pptx' || ext === 'ppt') {
    return {
      icon: 'easel-outline',
      bgColor: 'bg-amber-50',
      textColor: '#d97706',
      borderColor: 'border-amber-200',
    };
  }
  if (['image', 'png', 'jpg', 'jpeg', 'webp'].includes(type) || ['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
    return {
      icon: 'image-outline',
      bgColor: 'bg-emerald-50',
      textColor: '#059669',
      borderColor: 'border-emerald-200',
    };
  }
  return {
    icon: 'document-outline',
    bgColor: 'bg-gray-100',
    textColor: '#5d5a5b',
    borderColor: 'border-muted/30',
  };
}

export function FileRow({ file, onDelete, onRename, onDownload }: FileRowProps) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const badge = getFileTypeBadge(file);

  const handleDownload = () => {
    setShowOptionsModal(false);
    if (onDownload) {
      onDownload(file.id);
    } else {
      Alert.alert('Download File', `Downloading "${file.name}"...`);
    }
  };

  const handleRename = () => {
    setShowOptionsModal(false);
    if (onRename) {
      onRename(file.id);
    } else {
      Alert.alert('Rename File', `Enter new name for "${file.name}"`);
    }
  };

  const handleDelete = () => {
    setShowOptionsModal(false);
    Alert.alert(
      'Delete File',
      `Are you sure you want to delete "${file.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(file.id);
          },
        },
      ]
    );
  };

  return (
    <>
      <View className="bg-white p-4 rounded-2xl border border-muted/30 shadow-xs mb-3">
        {/* Top / Main Row: Icon + Details */}
        <View className="flex-row items-center gap-3.5 mb-3">
          {/* File Type Badge */}
          <View
            className={`w-11 h-11 rounded-xl items-center justify-center border ${badge.bgColor} ${badge.borderColor}`}
          >
            <Icon name={badge.icon} size={22} color={badge.textColor} />
          </View>

          {/* File Name & Metadata */}
          <View className="flex-1 min-w-0">
            <Text
              numberOfLines={1}
              className="text-sm font-bold text-brand mb-1"
            >
              {file.name}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-xs font-semibold text-gray-500">
                {file.size}
              </Text>
              <Text className="text-xs text-muted">•</Text>
              <Text className="text-xs text-gray-500">
                Uploaded {file.uploadedAt}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Bar: Processed Status & Overflow Menu */}
        <View className="flex-row items-center justify-between pt-2.5 border-t border-muted/20">
          {/* Status Badge */}
          <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <Icon name="checkmark-circle" size={13} color="#059669" />
            <Text className="text-[11px] font-bold text-emerald-700">
              Processed
            </Text>
          </View>

          {/* Overflow Menu Trigger */}
          <TouchableOpacity
            onPress={() => setShowOptionsModal(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            className="p-1 rounded-lg"
            activeOpacity={0.7}
          >
            <Icon name="ellipsis-horizontal" size={20} color="#5d5a5b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Overflow Action Modal */}
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOptionsModal(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View className="w-full max-w-xs bg-white rounded-2xl p-4 shadow-xl border border-muted/30">
                <Text className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 pb-3 mb-1 border-b border-muted/20">
                  File Options
                </Text>

                <TouchableOpacity
                  onPress={handleDownload}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100"
                >
                  <Icon name="download-outline" size={18} color="#5d5a5b" />
                  <Text className="text-sm font-semibold text-brand">
                    Download
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleRename}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-100"
                >
                  <Icon name="pencil-outline" size={18} color="#5d5a5b" />
                  <Text className="text-sm font-semibold text-brand">
                    Rename
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDelete}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-xl active:bg-rose-50"
                >
                  <Icon name="trash-outline" size={18} color="#e11d48" />
                  <Text className="text-sm font-semibold text-rose-600">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

export default FileRow;
