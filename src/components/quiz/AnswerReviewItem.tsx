import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { QuizQuestion } from '@/data/mockQuizQuestions';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

interface AnswerReviewItemProps {
  questionData: QuizQuestion;
  questionIndex: number;
  userAnswerIndex: number | null;
}

export function AnswerReviewItem({
  questionData,
  questionIndex,
  userAnswerIndex,
}: AnswerReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { question, options, correctAnswerIndex, topic, explanation } = questionData;
  const isCorrect = userAnswerIndex === correctAnswerIndex;

  return (
    <View
      className={`bg-white rounded-2xl border overflow-hidden shadow-2xs mb-3.5 ${
        isCorrect ? 'border-emerald-200' : 'border-amber-200'
      }`}
    >
      {/* Header Row */}
      <TouchableOpacity
        onPress={() => setIsExpanded((prev) => !prev)}
        activeOpacity={0.8}
        className="p-4 flex-row items-start justify-between gap-3 bg-white"
      >
        <View className="flex-1 flex-row items-start gap-3">
          {/* Result Icon */}
          <View className="mt-0.5 shrink-0">
            <Icon
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={22}
              color={isCorrect ? '#059669' : '#d97706'}
            />
          </View>

          {/* Question Summary */}
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5 flex-wrap mb-1">
              <Text className="text-[11px] font-bold text-gray uppercase tracking-wider">
                Q{questionIndex + 1}
              </Text>
              <View className="px-2 py-0.5 rounded-full bg-light border border-muted/20">
                <Text className="text-[10px] font-semibold text-gray">
                  {topic}
                </Text>
              </View>
              <View
                className={`px-2 py-0.5 rounded-full border ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <Text
                  className={`text-[10px] font-bold ${
                    isCorrect ? 'text-emerald-700' : 'text-amber-800'
                  }`}
                >
                  {isCorrect ? 'Correct (+1)' : 'Incorrect'}
                </Text>
              </View>
            </View>

            <Text className="text-sm font-bold text-brand leading-snug">
              {question}
            </Text>
          </View>
        </View>

        {/* Chevron */}
        <View className="pt-0.5">
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color="#5d5a5b"
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <View className="px-4 pb-4 pt-3 border-t border-muted/20 bg-gray-50/50 gap-2.5">
          {/* Options Breakdown */}
          {options.map((optText, idx) => {
            const isSelectedByUser = idx === userAnswerIndex;
            const isActualCorrect = idx === correctAnswerIndex;
            const letter = OPTION_LETTERS[idx] || `${idx + 1}`;

            let bgColor = '#ffffff';
            let borderColor = 'rgba(174, 171, 172, 0.2)';
            let textColor = '#5d5a5b';

            if (isActualCorrect) {
              bgColor = '#ecfdf5';
              borderColor = '#a7f3d0';
              textColor = '#065f46';
            } else if (isSelectedByUser && !isCorrect) {
              bgColor = '#fffbeb';
              borderColor = '#fde68a';
              textColor = '#92400e';
            }

            return (
              <View
                key={idx}
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <View className="flex-1 flex-row items-center gap-2">
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: 'rgba(174, 171, 172, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text className="text-[10px] font-bold text-gray-700">
                      {letter}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: textColor,
                      fontWeight: isActualCorrect || isSelectedByUser ? '700' : '500',
                      flex: 1,
                    }}
                  >
                    {optText}
                  </Text>
                </View>

                {/* Status Badges */}
                <View className="shrink-0">
                  {isActualCorrect && (
                    <View className="px-2 py-0.5 rounded-md bg-emerald-200/60">
                      <Text className="text-[10px] font-bold text-emerald-800">
                        Correct Answer
                      </Text>
                    </View>
                  )}
                  {isSelectedByUser && !isCorrect && (
                    <View className="px-2 py-0.5 rounded-md bg-amber-200/60">
                      <Text className="text-[10px] font-bold text-amber-900">
                        Your Choice
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {/* Explanation Box */}
          {explanation && (
            <View className="p-3 rounded-xl bg-white border border-muted/30 mt-1">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Icon name="sparkles" size={13} color="#d97706" />
                <Text className="text-xs font-bold text-brand">
                  Explanation
                </Text>
              </View>
              <Text className="text-xs text-gray-600 leading-relaxed">
                {explanation}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default AnswerReviewItem;
