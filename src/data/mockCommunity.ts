export interface CommunityMember {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  role: 'owner' | 'collaborator' | 'visitor';
  joinedDate?: string;
  firstVisited?: string;
  email?: string;
  quizzesTaken: number;
  flashcardsReviewed: number;
  avgScore: number;
}

export interface LeaderboardRankItem {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  role: 'owner' | 'collaborator' | 'visitor';
  bestScore: number;
  quizzesTaken: number;
  flashcardsReviewed: number;
  isCurrentUser?: boolean;
}

export const mockCollaborators: CommunityMember[] = [
  {
    id: 'collab-1',
    name: 'Sarah Jenkins',
    avatarInitials: 'SJ',
    avatarColor: '#d97706',
    role: 'collaborator',
    joinedDate: 'Joined 3 days ago',
    email: 'sarah.j@university.edu',
    quizzesTaken: 6,
    flashcardsReviewed: 48,
    avgScore: 96,
  },
  {
    id: 'collab-2',
    name: 'Alex Chen',
    avatarInitials: 'AC',
    avatarColor: '#2563eb',
    role: 'collaborator',
    joinedDate: 'Joined 1 week ago',
    email: 'alex.c@university.edu',
    quizzesTaken: 5,
    flashcardsReviewed: 36,
    avgScore: 92,
  },
  {
    id: 'collab-3',
    name: 'David Rodriguez',
    avatarInitials: 'DR',
    avatarColor: '#059669',
    role: 'collaborator',
    joinedDate: 'Joined 2 weeks ago',
    email: 'david.r@university.edu',
    quizzesTaken: 4,
    flashcardsReviewed: 30,
    avgScore: 88,
  },
];

export const mockLinkTakers: CommunityMember[] = [
  {
    id: 'visitor-1',
    name: 'Elena Torres',
    avatarInitials: 'ET',
    avatarColor: '#9333ea',
    role: 'visitor',
    firstVisited: 'First visited Yesterday',
    quizzesTaken: 3,
    flashcardsReviewed: 24,
    avgScore: 84,
  },
  {
    id: 'visitor-2',
    name: 'Marcus Lee',
    avatarInitials: 'ML',
    avatarColor: '#e11d48',
    role: 'visitor',
    firstVisited: 'First visited 3 days ago',
    quizzesTaken: 2,
    flashcardsReviewed: 18,
    avgScore: 81,
  },
  {
    id: 'visitor-3',
    name: 'Hannah Patel',
    avatarInitials: 'HP',
    avatarColor: '#4f46e5',
    role: 'visitor',
    firstVisited: 'First visited 5 days ago',
    quizzesTaken: 2,
    flashcardsReviewed: 15,
    avgScore: 76,
  },
  {
    id: 'visitor-4',
    name: 'Sam Wilson',
    avatarInitials: 'SW',
    avatarColor: '#0d9488',
    role: 'visitor',
    firstVisited: 'First visited 1 week ago',
    quizzesTaken: 1,
    flashcardsReviewed: 10,
    avgScore: 70,
  },
];

export const mockOverallLeaderboard: LeaderboardRankItem[] = [
  {
    id: 'u-owner',
    name: 'Jeffrey A. (Owner)',
    avatarInitials: 'JA',
    avatarColor: '#242021',
    role: 'owner',
    bestScore: 98,
    quizzesTaken: 14,
    flashcardsReviewed: 128,
  },
  {
    id: 'collab-1',
    name: 'Sarah Jenkins',
    avatarInitials: 'SJ',
    avatarColor: '#d97706',
    role: 'collaborator',
    bestScore: 96,
    quizzesTaken: 6,
    flashcardsReviewed: 48,
  },
  {
    id: 'collab-2',
    name: 'Alex Chen',
    avatarInitials: 'AC',
    avatarColor: '#2563eb',
    role: 'collaborator',
    bestScore: 92,
    quizzesTaken: 5,
    flashcardsReviewed: 36,
  },
  {
    id: 'collab-3',
    name: 'David Rodriguez',
    avatarInitials: 'DR',
    avatarColor: '#059669',
    role: 'collaborator',
    bestScore: 88,
    quizzesTaken: 4,
    flashcardsReviewed: 30,
  },
  {
    id: 'visitor-1',
    name: 'Elena Torres',
    avatarInitials: 'ET',
    avatarColor: '#9333ea',
    role: 'visitor',
    bestScore: 84,
    quizzesTaken: 3,
    flashcardsReviewed: 24,
  },
  {
    id: 'visitor-2',
    name: 'Marcus Lee',
    avatarInitials: 'ML',
    avatarColor: '#e11d48',
    role: 'visitor',
    bestScore: 81,
    quizzesTaken: 2,
    flashcardsReviewed: 18,
  },
  {
    id: 'visitor-3',
    name: 'Hannah Patel',
    avatarInitials: 'HP',
    avatarColor: '#4f46e5',
    role: 'visitor',
    bestScore: 76,
    quizzesTaken: 2,
    flashcardsReviewed: 15,
  },
  {
    id: 'visitor-4',
    name: 'Sam Wilson',
    avatarInitials: 'SW',
    avatarColor: '#0d9488',
    role: 'visitor',
    bestScore: 70,
    quizzesTaken: 1,
    flashcardsReviewed: 10,
  },
];
