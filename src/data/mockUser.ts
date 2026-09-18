export interface UserPreferences {
  emailNotifications: boolean;
  studyReminders: boolean;
  weeklyReport: boolean;
  soundEffects: boolean;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  avatarColor: string;
  joinedDate: string;
  preferences: UserPreferences;
}

export const mockUser: MockUser = {
  id: 'usr-1',
  name: 'Jeffrey A.',
  email: 'jeffrey@quzspace.io',
  avatarInitials: 'JA',
  avatarColor: 'bg-brand',
  joinedDate: 'August 2026',
  preferences: {
    emailNotifications: true,
    studyReminders: true,
    weeklyReport: true,
    soundEffects: false,
  },
};

export default mockUser;
