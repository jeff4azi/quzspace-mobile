import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SegmentedControl, SegmentOption } from '@/components/create-space/SegmentedControl';
import { FileListItem, UploadFileItem } from '@/components/create-space/FileListItem';

const PROCESSING_STAGES = [
  { id: 0, title: 'Uploading materials', desc: 'Encrypting and uploading your study files securely...' },
  { id: 1, title: 'Extracting text & concepts', desc: 'Parsing document structure, tables, and key definitions...' },
  { id: 2, title: 'Generating AI study suite', desc: 'Creating smart summaries, active recall flashcards, and quizzes...' },
  { id: 3, title: 'Ready!', desc: 'Your personalized study space is ready to explore.' },
];

const SEGMENT_OPTIONS: SegmentOption<'files' | 'text'>[] = [
  { id: 'files', label: 'Upload Files', icon: 'cloud-upload-outline' },
  { id: 'text', label: 'Paste Text', icon: 'document-text-outline' },
];

export default function CreateStudySpaceScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'files' | 'text'>('files');
  const [files, setFiles] = useState<UploadFileItem[]>([
    {
      id: 'init-1',
      name: 'Lecture_04_OSI_Model_and_TCP_IP.pdf',
      size: '3.4 MB',
      isComplete: true,
      progress: 100,
    },
  ]);
  const [pastedText, setPastedText] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  // Pick Document
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newFile: UploadFileItem = {
          id: `file-${Date.now()}`,
          name: asset.name,
          size: asset.size,
          uri: asset.uri,
          progress: 0,
          isComplete: false,
        };
        setFiles((prev) => [...prev, newFile]);
      }
    } catch (error) {
      console.warn('Document picker error:', error);
      Alert.alert('Error', 'Unable to pick document. Please try again.');
    }
  };

  // Pick Image
  const handlePickImage = async () => {
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
        const filename = asset.fileName || `Image_${Date.now()}.jpg`;
        const newFile: UploadFileItem = {
          id: `file-${Date.now()}`,
          name: filename,
          size: asset.fileSize || '1.8 MB',
          uri: asset.uri,
          progress: 0,
          isComplete: false,
        };
        setFiles((prev) => [...prev, newFile]);
      }
    } catch (error) {
      console.warn('Image picker error:', error);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Check form validity
  const isFormValid =
    title.trim().length > 0 &&
    ((activeTab === 'files' && files.length > 0) ||
      (activeTab === 'text' && pastedText.trim().length > 0));

  // Handle Form Submit
  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsProcessing(true);
    setCurrentStage(0);
  };

  // Auto-advance processing stages over time
  useEffect(() => {
    if (!isProcessing) return;

    if (currentStage < 3) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentStage]);

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Top Back Button & Heading */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-1.5 mb-3"
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={16} color="#5d5a5b" />
          <Text className="text-xs font-bold text-gray">
            Back to Dashboard
          </Text>
        </TouchableOpacity>

        <Text className="text-2xl font-extrabold text-brand tracking-tight">
          Create a Study Space
        </Text>
        <Text className="text-sm text-gray mt-1 leading-relaxed">
          Upload lecture notes, slides, or PDFs. Our AI will automatically generate summaries, flashcard decks, and quizzes for you.
        </Text>
      </View>

      {/* Main Form OR Processing State */}
      {!isProcessing ? (
        <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs space-y-6">
          
          {/* Step 1: Study Space Title */}
          <View className="mb-5">
            <Input
              label="Step 1: Study Space Title"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Computer Networks & Protocols"
              autoCapitalize="words"
            />
          </View>

          {/* Step 2: Add Material Method */}
          <View className="mb-5">
            <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2.5">
              Step 2: Add Study Material <Text className="text-rose-500">*</Text>
            </Text>

            {/* Segmented Control */}
            <View className="mb-4">
              <SegmentedControl
                options={SEGMENT_OPTIONS}
                activeId={activeTab}
                onChange={setActiveTab}
              />
            </View>

            {/* Tab A Content: File Picker & List */}
            {activeTab === 'files' ? (
              <View>
                {/* Native Picker Action Buttons */}
                <View className="flex-row gap-3 mb-4">
                  <TouchableOpacity
                    onPress={handlePickDocument}
                    activeOpacity={0.8}
                    className="flex-1 p-4 rounded-xl border border-dashed border-brand/30 bg-brand/5 items-center justify-center"
                  >
                    <Icon name="document-attach-outline" size={24} color="#242021" />
                    <Text className="text-xs font-bold text-brand mt-1.5">
                      Choose Document
                    </Text>
                    <Text className="text-[10px] text-gray mt-0.5">
                      PDF, DOCX, PPTX, TXT
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handlePickImage}
                    activeOpacity={0.8}
                    className="flex-1 p-4 rounded-xl border border-dashed border-brand/30 bg-brand/5 items-center justify-center"
                  >
                    <Icon name="image-outline" size={24} color="#242021" />
                    <Text className="text-xs font-bold text-brand mt-1.5">
                      Choose Photo
                    </Text>
                    <Text className="text-[10px] text-gray mt-0.5">
                      JPG, PNG, Slides
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Attached Files List */}
                {files.length > 0 && (
                  <View className="pt-2">
                    <Text className="text-xs font-bold text-brand uppercase tracking-wider mb-2.5">
                      Attached Files ({files.length})
                    </Text>
                    {files.map((file) => (
                      <FileListItem
                        key={file.id}
                        file={file}
                        onRemove={handleRemoveFile}
                      />
                    ))}
                  </View>
                )}
              </View>
            ) : (
              /* Tab B Content: Paste Text Area */
              <View>
                <TextInput
                  multiline
                  numberOfLines={7}
                  textAlignVertical="top"
                  value={pastedText}
                  onChangeText={setPastedText}
                  placeholder="Paste your raw lecture notes, textbook excerpt, or study outline here..."
                  placeholderTextColor="#aeabac"
                  className="w-full p-4 rounded-xl border border-muted/40 text-sm text-brand bg-white min-h-[160px] leading-relaxed mb-2"
                />
                <View className="flex-row items-center justify-between">
                  <Text className="text-[11px] text-gray flex-1 pr-2">
                    Detailed notes generate better quizzes and flashcards.
                  </Text>
                  <Text className="text-[11px] font-mono font-bold text-gray">
                    {pastedText.length.toLocaleString()} chars
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Step 3: Submit Action */}
          <View className="pt-4 border-t border-muted/20">
            <Text className="text-[11px] text-gray mb-3 text-center">
              Processing typically takes 5–10 seconds depending on file length.
            </Text>

            <Button
              variant="primary"
              disabled={!isFormValid}
              onPress={handleSubmit}
              className="py-3.5"
            >
              <Icon name="sparkles" size={18} color="#fbbf24" />
              <Text className="text-light font-bold text-base ml-2">
                Create Study Space
              </Text>
            </Button>
          </View>

        </View>
      ) : (
        /* Processing State View */
        <View className="bg-white p-6 rounded-2xl border border-muted/30 shadow-md items-center my-4">
          
          {/* Animated Icon Circle */}
          <View className="relative w-20 h-20 items-center justify-center mb-5">
            <View
              className={`w-18 h-18 rounded-full items-center justify-center shadow-md ${
                currentStage === 3 ? 'bg-emerald-600' : 'bg-brand'
              }`}
              style={{ width: 68, height: 68, borderRadius: 34 }}
            >
              {currentStage === 3 ? (
                <Icon name="checkmark" size={36} color="#ffffff" />
              ) : (
                <Icon name="hardware-chip-outline" size={32} color="#fbbf24" />
              )}
            </View>
          </View>

          {/* Stage Heading & Desc */}
          <Text className="text-xl font-extrabold text-brand tracking-tight text-center mb-1">
            {currentStage === 3 ? 'Your Study Space is Ready!' : 'Processing Your Material...'}
          </Text>
          <Text className="text-xs text-gray text-center leading-relaxed max-w-xs mb-6">
            {PROCESSING_STAGES[currentStage].desc}
          </Text>

          {/* Timeline Stages */}
          <View className="w-full bg-light/80 p-4 rounded-xl border border-muted/30 mb-6">
            {PROCESSING_STAGES.map((stage) => {
              const isDone = currentStage > stage.id;
              const isCurrent = currentStage === stage.id;

              return (
                <View
                  key={stage.id}
                  className="flex-row items-center gap-3 py-1.5"
                >
                  <View className="w-5 h-5 items-center justify-center">
                    {isDone ? (
                      <Icon name="checkmark-circle" size={20} color="#059669" />
                    ) : isCurrent && currentStage < 3 ? (
                      <ActivityIndicator size="small" color="#242021" />
                    ) : isCurrent && currentStage === 3 ? (
                      <Icon name="checkmark-circle" size={20} color="#059669" />
                    ) : (
                      <View className="w-5 h-5 rounded-full border-2 border-muted/40 items-center justify-center">
                        <Text className="text-[10px] font-bold text-gray">
                          {stage.id + 1}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text
                    className={`text-xs font-semibold ${
                      isDone || isCurrent ? 'text-brand' : 'text-gray-400'
                    }`}
                  >
                    {stage.title}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Ready State CTA Button */}
          {currentStage === 3 && (
            <Button
              variant="primary"
              onPress={() => router.replace('/spaces/cs-301/summary' as any)}
              className="w-full py-4 shadow-md"
            >
              <Text className="text-light font-bold text-sm mr-2">Go to Study Space</Text>
              <Icon name="arrow-forward" size={18} color="#f1f1f1" />
            </Button>
          )}

        </View>
      )}
    </ScrollView>
  );
}
