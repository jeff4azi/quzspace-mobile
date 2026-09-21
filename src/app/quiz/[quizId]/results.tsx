import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';
import { Icon } from '@/components/ui/Icon';
import { AnswerReviewItem } from '@/components/quiz/AnswerReviewItem';
import { mockQuizQuestions, getQuizDetailsById } from '@/data/mockQuizQuestions';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function QuizResultsScreen() {
  const { quizId, answers: answersParam } = useLocalSearchParams<{
    quizId: string;
    answers?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quizDetails = getQuizDetailsById(quizId);
  const questions = mockQuizQuestions;

  // Parse user answers from route query params, or default to mock answers
  let parsedAnswers: Record<string, number> = {};
  try {
    if (answersParam) {
      parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
    }
  } catch {
    parsedAnswers = {};
  }

  // Calculate score
  let correctCount = 0;
  questions.forEach((q) => {
    const userAns = parsedAnswers[q.id];
    // If no answer passed (e.g., opened from quiz card direct link), simulate 7/8 correct
    if (userAns !== undefined) {
      if (userAns === q.correctAnswerIndex) {
        correctCount++;
      }
    } else {
      // Default mock score
      if (q.id !== 'q-3') correctCount++;
    }
  });

  const totalQuestions = questions.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // SVG Circular Ring Animation
  const radius = 52;
  const strokeWidth = 9;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: scorePercent / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [scorePercent]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const getFeedback = (percent: number) => {
    if (percent >= 90) {
      return {
        title: 'Outstanding Mastery!',
        message:
          "You've demonstrated exceptional understanding of these topics. Keep up the great work!",
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700',
        badgeBorder: 'border-emerald-200',
        ringColor: '#059669',
      };
    }
    if (percent >= 75) {
      return {
        title: 'Great Performance!',
        message:
          'A quick review of the explanations below will get your score to 100%.',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700',
        badgeBorder: 'border-emerald-200',
        ringColor: '#059669',
      };
    }
    if (percent >= 50) {
      return {
        title: 'Solid Effort!',
        message:
          'Review the missed questions below to solidify these core concepts for your exam.',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-800',
        badgeBorder: 'border-amber-200',
        ringColor: '#d97706',
      };
    }
    return {
      title: 'Keep Practicing!',
      message:
        'Use the flashcards deck and explanation notes below to strengthen weak areas.',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      badgeBorder: 'border-amber-200',
      ringColor: '#d97706',
    };
  };

  const feedback = getFeedback(scorePercent);

  const handleRetake = () => {
    router.replace(`/quiz/${quizId || 'q-101'}` as any);
  };

  const handleBackToSpace = () => {
    router.replace('/spaces/cs-301/summary' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      {/* Chrome-Free Minimal Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 14,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(174, 171, 172, 0.2)',
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-3">
            <Text
              numberOfLines={1}
              className="text-xs font-bold text-gray uppercase tracking-wider mb-0.5"
            >
              {quizDetails.title}
            </Text>
            <Text className="text-base font-extrabold text-brand">
              Assessment Results
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleBackToSpace}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-light border border-muted/30 items-center justify-center"
          >
            <Icon name="close" size={18} color="#242021" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Results Scroll Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Summary Card with Circular Ring */}
        <View className="bg-white rounded-3xl border border-muted/30 p-6 shadow-xs mb-6 items-center">
          {/* Circular SVG Ring */}
          <View className="w-36 h-36 items-center justify-center mb-4">
            <Svg width="140" height="140" viewBox="0 0 140 140">
              <G rotation="-90" origin="70, 70">
                {/* Background Ring */}
                <Circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Foreground Animated Ring */}
                <AnimatedCircle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke={feedback.ringColor}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </G>
            </Svg>

            {/* Score Text Overlay in Center */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text className="text-2xl font-black text-brand tracking-tight">
                {scorePercent}%
              </Text>
              <Text className="text-[11px] font-bold text-gray-500">
                {correctCount} of {totalQuestions}
              </Text>
            </View>
          </View>

          {/* Contextual Feedback Title & Description */}
          <View
            className={`px-3 py-1 rounded-full border mb-2 ${feedback.badgeBg} ${feedback.badgeBorder}`}
          >
            <Text className={`text-xs font-bold ${feedback.badgeText}`}>
              {feedback.title}
            </Text>
          </View>

          <Text className="text-xs text-gray-600 text-center leading-relaxed max-w-xs mb-5">
            {feedback.message}
          </Text>

          {/* Quick Metrics Bar */}
          <View className="w-full flex-row items-center justify-around pt-4 border-t border-muted/20">
            <View className="items-center">
              <Text className="text-lg font-bold text-emerald-700">
                {correctCount}
              </Text>
              <Text className="text-[11px] font-medium text-gray-400">
                Correct
              </Text>
            </View>

            <View className="w-px h-8 bg-gray-200" />

            <View className="items-center">
              <Text className="text-lg font-bold text-amber-700">
                {totalQuestions - correctCount}
              </Text>
              <Text className="text-[11px] font-medium text-gray-400">
                Missed
              </Text>
            </View>

            <View className="w-px h-8 bg-gray-200" />

            <View className="items-center">
              <Text className="text-lg font-bold text-brand">
                {quizDetails.timeEstimate}
              </Text>
              <Text className="text-[11px] font-medium text-gray-400">
                Time Spent
              </Text>
            </View>
          </View>
        </View>

        {/* Answer Breakdown Header */}
        <View className="flex-row items-center justify-between mb-3 px-1">
          <Text className="text-base font-extrabold text-brand">
            Detailed Review
          </Text>
          <Text className="text-xs font-semibold text-gray-400">
            {totalQuestions} Questions
          </Text>
        </View>

        {/* Question Review Items */}
        <View className="mb-6">
          {questions.map((q, idx) => {
            const userAns =
              parsedAnswers[q.id] !== undefined
                ? parsedAnswers[q.id]
                : idx === 2
                ? 0 // simulated incorrect answer for preview if no answers passed
                : q.correctAnswerIndex;

            return (
              <AnswerReviewItem
                key={q.id}
                questionData={q}
                questionIndex={idx}
                userAnswerIndex={userAns}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View
        style={{
          paddingBottom: Math.max(insets.bottom, 16),
          paddingTop: 14,
          paddingHorizontal: 20,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(174, 171, 172, 0.2)',
        }}
      >
        <View className="flex-row items-center gap-3">
          {/* Retake Button */}
          <TouchableOpacity
            onPress={handleRetake}
            activeOpacity={0.7}
            className="flex-1 py-3.5 px-4 rounded-xl border border-muted/40 bg-white flex-row items-center justify-center gap-2 active:bg-gray-50"
          >
            <Icon name="sync-outline" size={16} color="#242021" />
            <Text className="text-xs font-bold text-brand">Retake Quiz</Text>
          </TouchableOpacity>

          {/* Back to Study Space Button */}
          <TouchableOpacity
            onPress={handleBackToSpace}
            activeOpacity={0.8}
            className="flex-1 py-3.5 px-4 rounded-xl bg-brand flex-row items-center justify-center gap-2 shadow-xs active:bg-darker"
          >
            <Icon name="arrow-back" size={16} color="#f1f1f1" />
            <Text className="text-xs font-bold text-light">
              Back to Space
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
