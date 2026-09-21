export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  score: number;
  completedAt: string;
}

export interface QuizAttempt {
  id: string;
  attemptNumber: number;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  timeSpent: string;
  completedAt: string;
}

export interface QuizItem {
  id: string;
  title: string;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  createdAt: string;
  bestScore: number | null;
  attemptsCount: number;
  history: QuizAttempt[];
  leaderboard: LeaderboardEntry[];
}

export const mockQuizzes: QuizItem[] = [
  {
    id: 'q-101',
    title: 'Comprehensive OSI Layer & Protocols Quiz',
    questionCount: 8,
    difficulty: 'Medium',
    createdAt: '2 hours ago',
    bestScore: 85,
    attemptsCount: 2,
    history: [
      {
        id: 'att-101-2',
        attemptNumber: 2,
        scorePercent: 85,
        correctCount: 7,
        totalQuestions: 8,
        timeSpent: '6m 45s',
        completedAt: '2 hours ago',
      },
      {
        id: 'att-101-1',
        attemptNumber: 1,
        scorePercent: 62,
        correctCount: 5,
        totalQuestions: 8,
        timeSpent: '8m 12s',
        completedAt: 'Yesterday at 4:30 PM',
      },
    ],
    leaderboard: [
      {
        id: 'p-1',
        name: 'Sarah Jenkins',
        avatarInitials: 'SJ',
        avatarColor: '#d97706',
        score: 95,
        completedAt: '1 hour ago',
      },
      {
        id: 'p-2',
        name: 'Jeffrey A.',
        avatarInitials: 'JA',
        avatarColor: '#242021',
        score: 85,
        completedAt: '2 hours ago',
      },
      {
        id: 'p-3',
        name: 'Alex Chen',
        avatarInitials: 'AC',
        avatarColor: '#2563eb',
        score: 80,
        completedAt: 'Yesterday',
      },
    ],
  },
  {
    id: 'q-102',
    title: 'Subnetting & IPv4 Address Calculation',
    questionCount: 10,
    difficulty: 'Hard',
    createdAt: 'Yesterday',
    bestScore: 90,
    attemptsCount: 3,
    history: [
      {
        id: 'att-102-3',
        attemptNumber: 3,
        scorePercent: 90,
        correctCount: 9,
        totalQuestions: 10,
        timeSpent: '9m 10s',
        completedAt: 'Yesterday at 7:15 PM',
      },
      {
        id: 'att-102-2',
        attemptNumber: 2,
        scorePercent: 70,
        correctCount: 7,
        totalQuestions: 10,
        timeSpent: '11m 30s',
        completedAt: '2 days ago',
      },
      {
        id: 'att-102-1',
        attemptNumber: 1,
        scorePercent: 50,
        correctCount: 5,
        totalQuestions: 10,
        timeSpent: '13m 45s',
        completedAt: '3 days ago',
      },
    ],
    leaderboard: [
      {
        id: 'p-1',
        name: 'David Rodriguez',
        avatarInitials: 'DR',
        avatarColor: '#059669',
        score: 100,
        completedAt: 'Yesterday',
      },
      {
        id: 'p-2',
        name: 'Sarah Jenkins',
        avatarInitials: 'SJ',
        avatarColor: '#d97706',
        score: 90,
        completedAt: 'Yesterday',
      },
    ],
  },
  {
    id: 'q-103',
    title: 'TCP vs UDP & Transport Layer Mechanics',
    questionCount: 8,
    difficulty: 'Easy',
    createdAt: 'Aug 10, 2026',
    bestScore: null,
    attemptsCount: 0,
    history: [],
    leaderboard: [],
  },
  {
    id: 'q-104',
    title: 'Network Security & Wireless Fundamentals',
    questionCount: 8,
    difficulty: 'Mixed',
    createdAt: 'Aug 05, 2026',
    bestScore: 70,
    attemptsCount: 1,
    history: [
      {
        id: 'att-104-1',
        attemptNumber: 1,
        scorePercent: 70,
        correctCount: 6,
        totalQuestions: 8,
        timeSpent: '7m 20s',
        completedAt: 'Aug 05, 2026',
      },
    ],
    leaderboard: [
      {
        id: 'p-1',
        name: 'Elena Torres',
        avatarInitials: 'ET',
        avatarColor: '#9333ea',
        score: 85,
        completedAt: '2 days ago',
      },
    ],
  },
];
