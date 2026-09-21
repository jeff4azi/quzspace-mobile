import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { QuizItem } from '@/data/mockQuizzes';
import { QuizLeaderboardPreview } from './QuizLeaderboardPreview';

interface QuizCardProps {
  quiz: QuizItem;
  spaceId?: string;
  onDelete?: (quizId: string) => void;
}

function getDifficultyStyle(difficulty: QuizItem['difficulty']) {
  switch (difficulty) {
    case 'Easy':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
      };
    case 'Medium':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
      };
    case 'Hard':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
      };
    case 'Mixed':
    default:
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
      };
  }
}

export function QuizCard({ quiz, spaceId = 'cs-301', onDelete }: QuizCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const diffStyle = getDifficultyStyle(quiz.difficulty);

  const handleTakeQuiz = () => {
    setShowMenu(false);
    router.push(`/quiz/${quiz.id}` as any);
  };

  const handleViewResults = () => {
    setShowMenu(false);
    router.push(`/quiz/${quiz.id}/history` as any);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete?.(quiz.id);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.95}
        onLongPress={() => setShowMenu(true)}
        delayLongPress={300}
        className="bg-white rounded-2xl border border-muted/30 p-5 shadow-xs mb-4"
        style={{ zIndex: showMenu ? 50 : 1 }}
      >
        {/* Top Row: Difficulty, Question Count & 3-Dots Menu */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <View
              className={`px-2.5 py-0.5 rounded-full border ${diffStyle.bg} ${diffStyle.border}`}
            >
              <Text className={`text-[11px] font-bold ${diffStyle.text}`}>
                {quiz.difficulty}
              </Text>
            </View>
            <Text className="text-xs font-semibold text-gray-500">
              {quiz.questionCount} Questions
            </Text>
          </View>

          {/* Right Action Container: Created Date + 3-Dots with Custom Dropdown */}
          <View className="flex-row items-center gap-2 relative">
            <View className="flex-row items-center gap-1">
              <Icon name="time-outline" size={13} color="#aeabac" />
              <Text className="text-[11px] font-medium text-gray-400">
                {quiz.createdAt}
              </Text>
            </View>

            {/* 3-Dots Action Button */}
            <TouchableOpacity
              onPress={() => setShowMenu((prev) => !prev)}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-xl items-center justify-center bg-gray-100/90 -mr-1"
            >
              <Icon name="ellipsis-horizontal" size={16} color="#242021" />
            </TouchableOpacity>

            {/* Custom Floating Dropdown Menu (Anchored below 3-dots) */}
            {showMenu && (
              <View
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 0,
                  width: 175,
                  backgroundColor: '#ffffff',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(174, 171, 172, 0.25)',
                  padding: 6,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 10,
                  zIndex: 100,
                }}
              >
                {/* Retake Option */}
                <TouchableOpacity
                  onPress={handleTakeQuiz}
                  activeOpacity={0.7}
                  className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-xl active:bg-gray-100"
                >
                  <Icon name="sync-outline" size={15} color="#5d5a5b" />
                  <Text className="text-xs font-semibold text-gray-700">
                    Retake Quiz
                  </Text>
                </TouchableOpacity>

                {/* View Results Option */}
                <TouchableOpacity
                  onPress={handleViewResults}
                  activeOpacity={0.7}
                  className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-xl active:bg-gray-100"
                >
                  <Icon name="bar-chart-outline" size={15} color="#5d5a5b" />
                  <Text className="text-xs font-semibold text-gray-700">
                    View Results
                  </Text>
                </TouchableOpacity>

                <View className="h-px bg-gray-100 my-1" />

                {/* Delete Quiz Option */}
                <TouchableOpacity
                  onPress={() => {
                    setShowMenu(false);
                    setShowDeleteModal(true);
                  }}
                  activeOpacity={0.7}
                  className="flex-row items-center gap-2.5 px-3 py-2.5 rounded-xl active:bg-rose-50"
                >
                  <Icon name="trash-outline" size={15} color="#e11d48" />
                  <Text className="text-xs font-bold text-rose-600">
                    Delete Quiz
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Quiz Title */}
        <Text className="text-base font-bold text-brand leading-snug mb-2">
          {quiz.title}
        </Text>

        {/* Attempts Metadata */}
        <View className="flex-row items-center gap-3 mb-3">
          {quiz.attemptsCount > 0 ? (
            <Text className="text-xs font-medium text-gray-500">
              {quiz.attemptsCount} {quiz.attemptsCount === 1 ? 'attempt' : 'attempts'} completed
            </Text>
          ) : (
            <Text className="text-xs font-medium text-gray-400">
              Not attempted yet
            </Text>
          )}
        </View>

        {/* Per-Quiz Leaderboard Preview */}
        <View className="mb-4">
          <QuizLeaderboardPreview leaderboard={quiz.leaderboard} />
        </View>

        {/* Best Score Bar or Unattempted State */}
        <View className="mb-4 pt-3 border-t border-muted/20">
          {quiz.bestScore !== null ? (
            <View>
              <View className="flex-row items-center justify-between mb-1.5">
                <View className="flex-row items-center gap-1">
                  <Icon name="sparkles" size={12} color="#d97706" />
                  <Text className="text-[11px] font-semibold text-gray-500">
                    Best Score
                  </Text>
                </View>
                <Text className="text-xs font-extrabold text-emerald-700">
                  {quiz.bestScore}%
                </Text>
              </View>
              <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  style={{ width: `${quiz.bestScore}%` }}
                  className="h-full bg-emerald-600 rounded-full"
                />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center gap-1.5 py-0.5">
              <Icon name="help-circle-outline" size={14} color="#aeabac" />
              <Text className="text-xs text-gray-400 font-medium">
                Ready for your first attempt
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View className="flex-row items-center gap-2.5">
          <TouchableOpacity
            onPress={handleTakeQuiz}
            activeOpacity={0.8}
            className="flex-1 flex-row items-center justify-center gap-2 bg-brand py-3 px-4 rounded-xl shadow-2xs active:bg-darker"
          >
            <Icon name="play-circle-outline" size={16} color="#f1f1f1" />
            <Text className="text-xs font-bold text-light">
              {quiz.bestScore !== null ? 'Retake Quiz' : 'Take Quiz'}
            </Text>
          </TouchableOpacity>

          {quiz.bestScore !== null && (
            <TouchableOpacity
              onPress={handleViewResults}
              activeOpacity={0.8}
              className="flex-row items-center justify-center gap-1.5 bg-white border border-muted/30 py-3 px-3.5 rounded-xl active:bg-gray-50"
            >
              <Icon name="bar-chart-outline" size={15} color="#242021" />
              <Text className="text-xs font-bold text-brand">Scores</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Backdrop overlay to close menu when tapping outside */}
      {showMenu && (
        <Modal transparent visible={showMenu} animationType="none">
          <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }} />
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Custom Delete Confirmation Modal */}
      <Modal
        transparent
        visible={showDeleteModal}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <View
            style={{
              width: '100%',
              maxWidth: 340,
              backgroundColor: '#ffffff',
              borderRadius: 24,
              padding: 24,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(174, 171, 172, 0.3)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            {/* Trash Icon Badge */}
            <View className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 items-center justify-center mb-4">
              <Icon name="trash-outline" size={26} color="#e11d48" />
            </View>

            <Text className="text-lg font-extrabold text-brand text-center mb-1.5">
              Delete Quiz?
            </Text>

            <Text className="text-xs text-gray-500 text-center leading-relaxed mb-6">
              Are you sure you want to delete "{quiz.title}"? All historical scores and rankings for this quiz will be permanently removed.
            </Text>

            {/* Modal Actions */}
            <View className="flex-row items-center gap-3 w-full">
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                activeOpacity={0.7}
                className="flex-1 py-3 px-4 rounded-xl border border-muted/30 bg-gray-100/80 items-center justify-center"
              >
                <Text className="text-xs font-bold text-gray-700">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmDelete}
                activeOpacity={0.8}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 items-center justify-center shadow-xs active:bg-rose-700"
              >
                <Text className="text-xs font-bold text-white">Delete Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default QuizCard;
