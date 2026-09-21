export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  score: number;
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
