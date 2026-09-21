import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { QuizQuestion } from '@/data/mockQuizQuestions';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

interface QuestionCardProps {
  questionData: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  onSelectOption: (index: number) => void;
}

export function QuestionCard({
  questionData,
  questionNumber,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
}: QuestionCardProps) {
  const { question, options, topic } = questionData;

  return (
    <View className="bg-white p-5 rounded-3xl border border-muted/30 shadow-xs mb-6">
      {/* Top Topic Tag & Counter */}
      <View className="flex-row items-center justify-between gap-2 pb-3 mb-4 border-b border-muted/20">
        <View className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20">
          <Text className="text-[11px] font-bold text-brand">
            Topic: {topic}
          </Text>
        </View>
        <Text className="text-xs font-semibold text-gray-400">
          Question {questionNumber} of {totalQuestions}
        </Text>
      </View>

      {/* Question Text */}
      <Text className="text-base font-extrabold text-brand leading-snug mb-5">
        {question}
      </Text>

      {/* Options List */}
      <View className="gap-3">
        {options.map((optionText, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const letter = OPTION_LETTERS[idx] || `${idx + 1}`;

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => onSelectOption(idx)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 14,
                borderRadius: 16,
                backgroundColor: isSelected ? '#242021' : '#ffffff',
                borderWidth: 1.5,
                borderColor: isSelected ? '#242021' : 'rgba(174, 171, 172, 0.35)',
                minHeight: 56,
              }}
            >
              {/* Option Letter + Text */}
              <View className="flex-1 flex-row items-center gap-3">
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected
                      ? 'rgba(241, 241, 241, 0.2)'
                      : '#f1f1f1',
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: 'rgba(174, 171, 172, 0.3)',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '800',
                      color: isSelected ? '#f1f1f1' : '#5d5a5b',
                    }}
                  >
                    {letter}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: isSelected ? '600' : '500',
                    color: isSelected ? '#f1f1f1' : '#161314',
                    flex: 1,
                    lineHeight: 18,
                  }}
                >
                  {optionText}
                </Text>
              </View>

              {/* Selection Badge */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isSelected ? '#fbbf24' : 'transparent',
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: 'rgba(174, 171, 172, 0.3)',
                  marginLeft: 8,
                }}
              >
                {isSelected && (
                  <Icon name="checkmark" size={13} color="#242021" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default QuestionCard;
