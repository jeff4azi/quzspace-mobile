import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { mockQuizQuestions, getQuizDetailsById } from '@/data/mockQuizQuestions';

export default function QuizTakingScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quizDetails = getQuizDetailsById(quizId);
  const questions = mockQuizQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion.id] ?? null;
  const canProceed = currentAnswer !== null;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to results screen with serialized answers
      const answersParam = encodeURIComponent(JSON.stringify(answers));
      router.replace(`/quiz/${quizId || 'q-101'}/results?answers=${answersParam}` as any);
    }, 1000);
  };

  const handleExit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 && answeredCount < questions.length) {
      Alert.alert(
        'Exit Quiz?',
        'Your progress on this quiz will be lost. Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

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
        {/* Top Header Row */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1 mr-3">
            <Text
              numberOfLines={1}
              className="text-xs font-bold text-gray uppercase tracking-wider mb-0.5"
            >
              {quizDetails.title}
            </Text>
            <Text className="text-sm font-extrabold text-brand">
              Question {currentIndex + 1} of {questions.length}
            </Text>
          </View>

          {/* Close / Exit Button */}
          <TouchableOpacity
            onPress={handleExit}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-light border border-muted/30 items-center justify-center"
          >
            <Icon name="close" size={18} color="#242021" />
          </TouchableOpacity>
        </View>

        {/* Slim Progress Bar */}
        <View className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <View
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-brand rounded-full"
          />
        </View>
      </View>

      {/* Main Question Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard
          questionData={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedOptionIndex={currentAnswer}
          onSelectOption={handleSelectOption}
        />
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
        <View className="flex-row items-center justify-between gap-3">
          {/* Previous Link / Button */}
          <TouchableOpacity
            onPress={handlePrev}
            disabled={isFirst}
            activeOpacity={0.7}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 14,
              backgroundColor: isFirst ? 'transparent' : '#f1f1f1',
              opacity: isFirst ? 0.4 : 1,
            }}
          >
            <View className="flex-row items-center gap-1.5">
              <Icon
                name="chevron-back"
                size={16}
                color={isFirst ? '#aeabac' : '#242021'}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: isFirst ? '#aeabac' : '#242021',
                }}
              >
                Previous
              </Text>
            </View>
          </TouchableOpacity>

          {/* Next / Submit Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={!canProceed || isSubmitting}
            activeOpacity={0.8}
            style={{
              flex: 1,
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderRadius: 14,
              backgroundColor: canProceed ? '#242021' : '#aeabac',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: canProceed ? 0.15 : 0,
              shadowRadius: 4,
              elevation: canProceed ? 2 : 0,
            }}
          >
            {isSubmitting ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator size="small" color="#f1f1f1" />
                <Text className="text-xs font-bold text-light">
                  Calculating Score...
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-xs font-bold text-light">
                  {isLast ? 'Submit Quiz' : 'Next Question'}
                </Text>
                <Icon
                  name={isLast ? 'checkmark-circle-outline' : 'chevron-forward'}
                  size={16}
                  color="#f1f1f1"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
