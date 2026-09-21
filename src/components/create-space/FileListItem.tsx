import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconName } from '@/components/ui/Icon';

export interface UploadFileItem {
  id: string;
  name: string;
  size?: number | string;
  uri?: string;
  progress?: number;
  isComplete?: boolean;
}

interface FileListItemProps {
  file: UploadFileItem;
  onRemove: (fileId: string) => void;
}

interface BadgeConfig {
  icon: IconName;
  bgColor: string;
  textColor: string;
  borderColor: string;
  label: string;
}

function getFileBadge(filename: string): BadgeConfig {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') {
    return {
      icon: 'document-text-outline',
      bgColor: 'bg-rose-50',
      textColor: '#e11d48',
      borderColor: 'border-rose-200',
      label: 'PDF',
    };
  }
  if (ext === 'docx' || ext === 'doc') {
    return {
      icon: 'document-text-outline',
      bgColor: 'bg-blue-50',
      textColor: '#2563eb',
      borderColor: 'border-blue-200',
      label: 'DOCX',
    };
  }
  if (ext === 'pptx' || ext === 'ppt') {
    return {
      icon: 'easel-outline',
      bgColor: 'bg-amber-50',
      textColor: '#d97706',
      borderColor: 'border-amber-200',
      label: 'PPTX',
    };
  }
  if (['png', 'jpg', 'jpeg', 'webp', 'heic'].includes(ext)) {
    return {
      icon: 'image-outline',
      bgColor: 'bg-emerald-50',
      textColor: '#059669',
      borderColor: 'border-emerald-200',
      label: 'IMG',
    };
  }
  return {
    icon: 'document-outline',
    bgColor: 'bg-gray-100',
    textColor: '#5d5a5b',
    borderColor: 'border-muted/30',
    label: 'TXT',
  };
}

function formatSize(bytes?: number | string): string {
  if (typeof bytes === 'string') return bytes;
  if (!bytes || isNaN(bytes)) return '1.2 MB';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
  const [progress, setProgress] = useState(file.progress ?? 0);
  const [isComplete, setIsComplete] = useState(file.isComplete ?? false);

  const badge = getFileBadge(file.name);

  // Simulate upload progress over ~1s
  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <View className="bg-white p-3.5 rounded-xl border border-muted/30 shadow-xs flex-row items-center justify-between gap-3 mb-2.5">
      {/* Left: Badge Icon */}
      <View
        className={`w-10 h-10 rounded-lg items-center justify-center border ${badge.bgColor} ${badge.borderColor}`}
      >
        <Icon name={badge.icon} size={20} color={badge.textColor} />
      </View>

      {/* Center: File Name, Size & Progress Bar */}
      <View className="flex-1 min-w-0">
        <View className="flex-row items-center justify-between gap-2 mb-1.5">
          <Text
            numberOfLines={1}
            className="text-xs font-bold text-brand flex-1"
          >
            {file.name}
          </Text>
          <Text className="text-[11px] font-medium text-gray-500">
            {formatSize(file.size)}
          </Text>
        </View>

        {/* Progress bar track */}
        <View className="flex-row items-center gap-2">
          <View className="flex-1 bg-muted/20 h-1.5 rounded-full overflow-hidden">
            <View
              style={{ width: `${progress}%` }}
              className={`h-full rounded-full ${
                isComplete ? 'bg-emerald-500' : 'bg-brand'
              }`}
            />
          </View>
          <Text className="text-[10px] font-bold text-gray w-8 text-right">
            {isComplete ? '100%' : `${progress}%`}
          </Text>
        </View>
      </View>

      {/* Right: Checkmark and Remove Button */}
      <View className="flex-row items-center gap-1.5">
        {isComplete && (
          <Icon name="checkmark-circle" size={18} color="#10b981" />
        )}
        <TouchableOpacity
          onPress={() => onRemove(file.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          className="p-1 rounded-lg"
          activeOpacity={0.7}
        >
          <Icon name="close" size={18} color="#5d5a5b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FileListItem;
