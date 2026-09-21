import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { ChatMessageItem } from '@/data/mockChatMessages';

interface ChatMessageProps {
  message: ChatMessageItem;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <View
      className={`mb-4 flex-row ${
        isUser ? 'justify-end' : 'justify-start items-start gap-2'
      }`}
    >
      {/* Assistant AI Avatar Icon */}
      {!isUser && (
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: '#242021',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <Icon name="sparkles" size={13} color="#fbbf24" />
        </View>
      )}

      {/* Message Content Container */}
      <View
        style={{
          maxWidth: '82%',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Bubble */}
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 11,
            borderRadius: 18,
            borderBottomRightRadius: isUser ? 4 : 18,
            borderBottomLeftRadius: isUser ? 18 : 4,
            backgroundColor: isUser ? '#242021' : '#ffffff',
            borderWidth: 1,
            borderColor: isUser ? '#242021' : 'rgba(174, 171, 172, 0.3)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isUser ? 0.05 : 0.03,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              lineHeight: 20,
              fontWeight: '500',
              color: isUser ? '#f1f1f1' : '#161314',
            }}
          >
            {message.content}
          </Text>
        </View>

        {/* Timestamp */}
        <Text
          style={{
            fontSize: 10,
            fontWeight: '500',
            color: '#aeabac',
            marginTop: 3,
            paddingHorizontal: 4,
          }}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

export default ChatMessage;
