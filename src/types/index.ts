export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'premium';
}

export interface StudySpace {
  id: string;
  title: string;
  description?: string;
  courseCode?: string;
  filesCount: number;
  quizzesCount: number;
  flashcardsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  spaceId: string;
  title: string;
  totalQuestions: number;
  bestScore?: number;
  lastScore?: number;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  spaceId: string;
  front: string;
  back: string;
  isMastered?: boolean;
}
