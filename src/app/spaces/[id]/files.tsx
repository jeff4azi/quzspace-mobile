import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { mockFiles, StudyFile } from '@/data/mockFiles';
import { FileRow } from '@/components/study-space/FileRow';
import { FilesEmptyState } from '@/components/study-space/tabs/FilesEmptyState';
import { Icon } from '@/components/ui/Icon';

export default function FilesTabScreen() {
  const [files, setFiles] = useState<StudyFile[]>(mockFiles);

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newFile: StudyFile = {
          id: `file-${Date.now()}`,
          name: asset.name,
          type: asset.name.split('.').pop()?.toLowerCase() || 'pdf',
          size: asset.size ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
          uploadedAt: 'Just now',
          status: 'processed',
        };
        setFiles((prev) => [newFile, ...prev]);
      }
    } catch (error) {
      console.warn('Document picker error:', error);
      Alert.alert('Error', 'Unable to pick document. Please try again.');
    }
  };

  const handleAddImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please grant access to your photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const filename = asset.fileName || `Photo_Notes_${Date.now()}.jpg`;
        const newFile: StudyFile = {
          id: `file-${Date.now()}`,
          name: filename,
          type: 'image',
          size: asset.fileSize ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
          uploadedAt: 'Just now',
          status: 'processed',
        };
        setFiles((prev) => [newFile, ...prev]);
      }
    } catch (error) {
      console.warn('Image picker error:', error);
    }
  };

  const handleAddFilesPrompt = () => {
    Alert.alert(
      'Add Files',
      'Choose source to upload your study material',
      [
        {
          text: 'Document (PDF, DOCX, PPTX)',
          onPress: handleAddDocument,
        },
        {
          text: 'Photo / Scan',
          onPress: handleAddImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleRenameFile = (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, name: `${f.name.replace(/\.[^/.]+$/, "")}_edited.${f.type}` } : f
      )
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Row: Title, File Count Badge & Add Files Button */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-2.5">
          <Text className="text-xl font-extrabold text-brand tracking-tight">
            Uploaded Files
          </Text>
          <View className="px-2.5 py-0.5 rounded-full bg-brand/10">
            <Text className="text-xs font-bold text-brand">
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddFilesPrompt}
          className="flex-row items-center gap-1.5 bg-brand px-3.5 py-2 rounded-xl shadow-xs active:opacity-85"
          activeOpacity={0.8}
        >
          <Icon name="add" size={16} color="#f1f1f1" />
          <Text className="text-xs font-bold text-light">Add Files</Text>
        </TouchableOpacity>
      </View>

      {/* Files List OR Empty State */}
      {files && files.length > 0 ? (
        <View>
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              onDelete={handleDeleteFile}
              onRename={handleRenameFile}
            />
          ))}
        </View>
      ) : (
        <FilesEmptyState onAddFilesClick={handleAddFilesPrompt} />
      )}
    </ScrollView>
  );
}
