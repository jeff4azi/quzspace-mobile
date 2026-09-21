export interface SharedStudySpace {
  id: string;
  shareCode: string;
  title: string;
  subject: string;
  ownerName: string;
  ownerAvatar?: string;
  filesVisible: boolean;
  fileCount: number;
  sharedDate: string;
  lastAccessed: string;
  progressPercent: number;
  description: string;
}

export const mockSharedSpace: SharedStudySpace = {
  id: 'shared-net-101',
  shareCode: 'net-101-cs301',
  title: 'Computer Networks (CS 301)',
  subject: 'Computer Networks',
  ownerName: 'Jeffrey A.',
  filesVisible: false,
  fileCount: 8,
  sharedDate: '2 days ago',
  lastAccessed: 'Today',
  progressPercent: 84,
  description:
    'Complete study pack covering OSI model layers, TCP/IP handshakes, CIDR subnetting, DNS resolution, and flow control protocol mechanics.',
};
