import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';
import { ChatMessage } from '@/components/study-space/ChatMessage';
import { ChatEmptyState } from '@/components/study-space/ChatEmptyState';
import { TypingIndicator } from '@/components/study-space/TypingIndicator';
import {
  mockChatMessages,
  ChatMessageItem,
  cannedResponses,
} from '@/data/mockChatMessages';

export default function SpaceChatTab() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessageItem[]>(mockChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    scrollToBottom(true);

    setTimeout(() => {
      const randomResponse =
        cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
      const botMsg: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      scrollToBottom(true);
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    // react-native-keyboard-controller's KeyboardAvoidingView reads exact
    // keyboard height (incl. suggestion bar) from the native layer, so no
    // manual Animated.Value or hardcoded offsets are needed.
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: '#f1f1f1' }}
    >
      {/* Header Info Bar */}
      <View className="flex-row items-center justify-between px-5 py-2.5 bg-white border-b border-muted/20">
        <View className="flex-row items-center gap-2">
          <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <Text className="text-xs font-bold text-brand">
            AI Study Buddy Online
          </Text>
        </View>

        {messages.length > 0 && (
          <TouchableOpacity
            onPress={handleClearChat}
            activeOpacity={0.7}
            className="flex-row items-center gap-1 py-1 px-2 rounded-lg"
          >
            <Icon name="refresh-outline" size={13} color="#5d5a5b" />
            <Text className="text-[11px] font-bold text-gray">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Messages Scroll Area */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollToBottom(true)}
      >
        {messages.length === 0 ? (
          <ChatEmptyState onSelectPrompt={(p) => handleSend(p)} />
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}

        {isTyping && <TypingIndicator />}
      </ScrollView>

      {/* Pinned Bottom Message Input Bar */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 12) + 4,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(174, 171, 172, 0.25)',
        }}
      >
        <View className="flex-row items-end gap-2">
          {/* Text Input Box */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#f8f8f8',
              borderRadius: 18,
              borderWidth: 1,
              borderColor: 'rgba(174, 171, 172, 0.35)',
              paddingHorizontal: 14,
              paddingVertical: 8,
              minHeight: 44,
              maxHeight: 120,
              justifyContent: 'center',
            }}
          >
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask anything about your notes..."
              placeholderTextColor="#aeabac"
              multiline
              style={{
                fontSize: 13,
                color: '#242021',
                maxHeight: 100,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            activeOpacity={0.8}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: inputText.trim() && !isTyping ? '#242021' : '#aeabac',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: inputText.trim() ? 0.15 : 0,
              shadowRadius: 3,
              elevation: inputText.trim() ? 2 : 0,
            }}
          >
            <Icon name="send" size={17} color="#f1f1f1" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
