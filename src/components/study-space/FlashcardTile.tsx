import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { Flashcard } from '@/data/mockFlashcards';

interface FlashcardTileProps {
  card: Flashcard;
  cardNumber: number;
  onToggleMastered: (cardId: string) => void;
}

export function FlashcardTile({
  card,
  cardNumber,
  onToggleMastered,
}: FlashcardTileProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleFlip = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    Animated.spring(animatedValue, {
      toValue: nextState ? 180 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
  };

  return (
    <View className="w-full h-72 mb-4">
      {/* Front Face */}
      <Animated.View
        style={[
          frontAnimatedStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backfaceVisibility: 'hidden',
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toggleFlip}
          className="w-full h-full bg-white rounded-2xl border border-muted/30 p-5 shadow-xs flex justify-between"
        >
          {/* Top Row */}
          <View className="flex-row items-center justify-between">
            <View className="px-2.5 py-1 rounded-full bg-light border border-muted/20">
              <Text className="text-[11px] font-bold text-brand">
                Card {cardNumber}
              </Text>
            </View>

            {card.mastered ? (
              <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                <Icon name="checkmark-circle" size={13} color="#059669" />
                <Text className="text-[11px] font-bold text-emerald-700">
                  Mastered
                </Text>
              </View>
            ) : (
              <Text className="text-[11px] font-semibold text-muted">
                Not Mastered
              </Text>
            )}
          </View>

          {/* Question Body */}
          <View className="flex-1 justify-center items-center py-2">
            <Text className="text-base font-bold text-brand text-center leading-snug">
              {card.front}
            </Text>
          </View>

          {/* Flip Hint Footer */}
          <View className="pt-3 border-t border-muted/20 flex-row items-center justify-between">
            <Text className="text-[11px] font-semibold text-gray-400">
              Tap to flip and reveal answer
            </Text>
            <Icon name="sync-outline" size={15} color="#aeabac" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Back Face */}
      <Animated.View
        style={[
          backAnimatedStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backfaceVisibility: 'hidden',
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toggleFlip}
          className="w-full h-full bg-[#161314] rounded-2xl border border-brand/40 p-5 shadow-lg flex justify-between"
        >
          {/* Top Row: Answer Tag & Mastered Toggle */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30">
              <Icon name="sparkles" size={12} color="#fbbf24" />
              <Text className="text-[11px] font-bold text-amber-300">Answer</Text>
            </View>

            <TouchableOpacity
              onPress={(e) => {
                onToggleMastered(card.id);
              }}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                backgroundColor: card.mastered
                  ? 'rgba(5, 150, 105, 0.25)'
                  : 'rgba(255, 255, 255, 0.12)',
                borderWidth: 1,
                borderColor: card.mastered
                  ? 'rgba(5, 150, 105, 0.4)'
                  : 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Icon
                name={card.mastered ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={14}
                color={card.mastered ? '#34d399' : '#d1d5db'}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: card.mastered ? '#34d399' : '#d1d5db',
                }}
              >
                {card.mastered ? 'Mastered' : 'Mark Mastered'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Answer Body */}
          <View className="flex-1 justify-center items-center py-2 px-2">
            <Text
              style={{
                color: '#f9fafb',
                fontSize: 13,
                fontWeight: '500',
                lineHeight: 20,
                textAlign: 'center',
              }}
            >
              {card.back}
            </Text>
          </View>

          {/* Bottom Row */}
          <View className="pt-3 border-t border-gray-800 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => onToggleMastered(card.id)}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: card.mastered ? '#34d399' : '#fde047',
                }}
              >
                {card.mastered ? '✓ Mastered (tap to unmark)' : '+ Mark as Mastered'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-1">
              <Icon name="sync-outline" size={13} color="#9ca3af" />
              <Text style={{ fontSize: 11, fontWeight: '500', color: '#9ca3af' }}>
                Flip back
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default FlashcardTile;
