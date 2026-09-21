export interface ActiveMember {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface StudySpace {
  id: string;
  title: string;
  subject: string;
  fileCount: number;
  lastAccessed: string;
  progressPercent: number;
  accentStyle: string;
  accentColor?: string;
  activeMembers: ActiveMember[];
}

export const mockStudySpaces: StudySpace[] = [
  {
    id: "cs-301",
    title: "Computer Networks & Protocols",
    subject: "Computer Science",
    fileCount: 8,
    lastAccessed: "2 hours ago",
    progressPercent: 85,
    accentStyle: "from-brand to-gray-700",
    accentColor: "#242021",
    activeMembers: [
      { id: "v-1", name: "Alex Chen", avatarInitials: "AC", avatarColor: "#2563eb" },
      { id: "v-2", name: "Sarah Jenkins", avatarInitials: "SJ", avatarColor: "#d97706" },
      { id: "v-3", name: "David Rodriguez", avatarInitials: "DR", avatarColor: "#059669" },
      { id: "v-4", name: "Elena Torres", avatarInitials: "ET", avatarColor: "#9333ea" },
    ],
  },
  {
    id: "chem-202",
    title: "Organic Chemistry II: Reaction Mechanisms",
    subject: "Chemistry",
    fileCount: 14,
    lastAccessed: "Yesterday",
    progressPercent: 60,
    accentStyle: "from-emerald-700 to-brand",
    accentColor: "#047857",
    activeMembers: [
      { id: "v-3", name: "David Rodriguez", avatarInitials: "DR", avatarColor: "#059669" },
      { id: "v-4", name: "Elena Torres", avatarInitials: "ET", avatarColor: "#9333ea" },
      { id: "v-5", name: "Marcus Lee", avatarInitials: "ML", avatarColor: "#e11d48" },
    ],
  },
  {
    id: "cs-210",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    fileCount: 12,
    lastAccessed: "3 days ago",
    progressPercent: 92,
    accentStyle: "from-brand to-slate-800",
    accentColor: "#334155",
    activeMembers: [
      { id: "v-1", name: "Alex Chen", avatarInitials: "AC", avatarColor: "#2563eb" },
      { id: "v-6", name: "Hannah Patel", avatarInitials: "HP", avatarColor: "#4f46e5" },
    ],
  },
  {
    id: "bio-101",
    title: "Cellular Respiration & Genetics",
    subject: "Biology",
    fileCount: 6,
    lastAccessed: "5 days ago",
    progressPercent: 40,
    accentStyle: "from-amber-700 to-brand",
    accentColor: "#b45309",
    activeMembers: [
      { id: "v-0", name: "Jeffrey A. (Owner)", avatarInitials: "JA", avatarColor: "#242021" },
    ],
  },
  {
    id: "math-304",
    title: "Linear Algebra & Vector Spaces",
    subject: "Mathematics",
    fileCount: 9,
    lastAccessed: "1 week ago",
    progressPercent: 25,
    accentStyle: "from-indigo-800 to-brand",
    accentColor: "#3730a3",
    activeMembers: [
      { id: "v-5", name: "Marcus Lee", avatarInitials: "ML", avatarColor: "#e11d48" },
      { id: "v-2", name: "Sarah Jenkins", avatarInitials: "SJ", avatarColor: "#d97706" },
      { id: "v-4", name: "Elena Torres", avatarInitials: "ET", avatarColor: "#9333ea" },
    ],
  },
  {
    id: "hist-115",
    title: "Modern European History (1900-1945)",
    subject: "History",
    fileCount: 5,
    lastAccessed: "2 weeks ago",
    progressPercent: 100,
    accentStyle: "from-rose-800 to-brand",
    accentColor: "#9f1239",
    activeMembers: [
      { id: "v-6", name: "Hannah Patel", avatarInitials: "HP", avatarColor: "#4f46e5" },
      { id: "v-3", name: "David Rodriguez", avatarInitials: "DR", avatarColor: "#059669" },
    ],
  },
];
