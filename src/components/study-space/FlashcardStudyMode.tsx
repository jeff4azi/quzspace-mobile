import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Flashcard } from '@/data/mockFlashcards';

interface FlashcardStudyModeProps {
  cards: Flashcard[];
  onToggleMastered: (cardId: string) => void;
}

export function FlashcardStudyMode({
  cards,
  onToggleMastered,
}: FlashcardStudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Reset flip state when card index changes
  useEffect(() => {
    setIsFlipped(false);
    animatedValue.setValue(0);
  }, [currentIndex]);

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === cards.length - 1;

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

  const flipToFront = (callback?: () => void) => {
    if (isFlipped) {
      setIsFlipped(false);
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => callback?.());
    } else {
      callback?.();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      flipToFront(() => {
        setCurrentIndex((prev) => prev - 1);
      });
    }
  };

  const handleNext = () => {
    if (!isLast) {
      flipToFront(() => {
        setCurrentIndex((prev) => prev + 1);
      });
    }
  };

  const handleGotIt = () => {
    if (!currentCard.mastered) {
      onToggleMastered(currentCard.id);
    }
    setTimeout(() => {
      if (!isLast) {
        handleNext();
      }
    }, 350);
  };

  const handleStillLearning = () => {
    if (currentCard.mastered) {
      onToggleMastered(currentCard.id);
    }
    setTimeout(() => {
      if (!isLast) {
        handleNext();
      }
    }, 350);
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

  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <View className="py-2">
      {/* Session Progress Header */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-bold text-brand uppercase tracking-wider">
            Focused Study Session
          </Text>
          <Text className="text-xs font-bold text-gray-500">
            Card {currentIndex + 1} of {cards.length}
          </Text>
        </View>
        <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-brand rounded-full"
          />
        </View>
      </View>

      {/* Main Centered 3D Card */}
      <View className="w-full h-96 mb-6">
        {/* FRONT FACE */}
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
            className="w-full h-full bg-white rounded-3xl border border-muted/30 p-6 shadow-md flex justify-between"
          >
            {/* Top Pill */}
            <View className="flex-row items-center justify-between">
              <View className="px-3 py-1 rounded-full bg-light border border-muted/20">
                <Text className="text-xs font-bold text-brand">
                  Card {currentIndex + 1} / {cards.length}
                </Text>
              </View>

              {currentCard.mastered && (
                <View className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  <Icon name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-xs font-bold text-emerald-700">
                    Mastered
                  </Text>
                </View>
              )}
            </View>

            {/* Question Text */}
            <View className="flex-1 justify-center items-center py-4 px-2">
              <Text className="text-lg font-bold text-brand text-center leading-relaxed">
                {currentCard.front}
              </Text>
            </View>

            {/* Tap Hint */}
            <View className="pt-4 border-t border-muted/20 flex-row items-center justify-between">
              <Text className="text-xs font-medium text-gray-400">
                Tap card to reveal answer
              </Text>
              <Icon name="sync-outline" size={16} color="#aeabac" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* BACK FACE */}
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
            className="w-full h-full bg-[#161314] rounded-3xl border border-brand/40 p-6 shadow-xl flex justify-between"
          >
            {/* Top Row */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30">
                <Icon name="sparkles" size={13} color="#fbbf24" />
                <Text className="text-xs font-bold text-amber-300">Answer</Text>
              </View>

              {currentCard.mastered && (
                <View className="flex-row items-center gap-1">
                  <Icon name="checkmark-circle" size={14} color="#34d399" />
                  <Text className="text-xs font-bold text-emerald-400">
                    Mastered
                  </Text>
                </View>
              )}
            </View>

            {/* Answer Content */}
            <View className="flex-1 justify-center items-center py-3 px-2">
              <Text className="text-sm font-medium text-gray-200 text-center leading-relaxed">
                {currentCard.back}
              </Text>
            </View>

            {/* Back Interactive Actions */}
            <View className="pt-4 border-t border-gray-800 flex-row gap-3">
              <TouchableOpacity
                onPress={handleStillLearning}
                activeOpacity={0.7}
                className="flex-1 py-3 px-2 rounded-xl border border-rose-500/30 bg-rose-500/10 flex-row items-center justify-center gap-1.5 active:bg-rose-500/20"
              >
                <Icon name="close-circle-outline" size={16} color="#fda4af" />
                <Text className="text-xs font-bold text-rose-300">
                  Still Learning
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleGotIt}
                activeOpacity={0.7}
                className="flex-1 py-3 px-2 rounded-xl bg-emerald-600 flex-row items-center justify-center gap-1.5 active:bg-emerald-700 shadow-xs"
              >
                <Icon name="checkmark-circle" size={16} color="#ffffff" />
                <Text className="text-xs font-bold text-white">
                  Got It!
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Navigation Buttons Row */}
      <View className="flex-row items-center justify-between pt-2">
        <Button
          variant="secondary"
          onPress={handlePrev}
          disabled={isFirst}
          className="px-4 py-2.5"
        >
          <View className="flex-row items-center gap-1">
            <Icon
              name="chevron-back"
              size={16}
              color={isFirst ? '#aeabac' : '#242021'}
            />
            <Text
              className={`text-xs font-bold ${
                isFirst ? 'text-gray-400' : 'text-brand'
              }`}
            >
              Previous
            </Text>
          </View>
        </Button>

        <Text className="text-[11px] text-gray-400 font-semibold">
          Tap card to flip
        </Text>

        <Button
          variant="primary"
          onPress={handleNext}
          disabled={isLast}
          className="px-4 py-2.5"
        >
          <View className="flex-row items-center gap-1">
            <Text
              className={`text-xs font-bold ${
                isLast ? 'text-gray-400' : 'text-light'
              }`}
            >
              Next
            </Text>
            <Icon
              name="chevron-forward"
              size={16}
              color={isLast ? '#aeabac' : '#f1f1f1'}
            />
          </View>
        </Button>
      </View>
    </View>
  );
}

export default FlashcardStudyMode;
