export type CaseDifficulty = 'Mudah' | 'Menengah' | 'Sulit';

export type ChatSenderType = 'owner' | 'contact' | 'system';

export interface ChatMessage {
  id: string;
  senderName: string;
  senderType: ChatSenderType;
  text: string;
  time: string;
  clueId?: string;
  clueLabel?: string;
  attachmentPhotoId?: string;
}

export interface ChatThread {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  isGroup?: boolean;
  statusText: string;
  unreadCount?: number;
  messages: ChatMessage[];
}

export interface PhotoEvidence {
  id: string;
  title: string;
  timestamp: string;
  location: string;
  visualType: 'cafe-receipt' | 'room-key' | 'side-gate' | 'train-ticket';
  caption: string;
  clueId?: string;
  clueLabel?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  updatedAt: string;
  isLocked: boolean;
  pinCode?: string;
  pinHint?: string;
  content: string;
  clueId?: string;
  clueLabel?: string;
}

export interface DeductionOption {
  id: string;
  label: string;
}

export interface DeductionQuestion {
  id: string;
  question: string;
  options: DeductionOption[];
  correctOptionId: string;
}

export interface CaseData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: CaseDifficulty;
  ownerName: string;
  lastSeenTime: string;
  briefing: string;
  wallpaperGradient: string;
  chats: ChatThread[];
  photos: PhotoEvidence[];
  notes: NoteItem[];
  totalClues: number;
  deductions: DeductionQuestion[];
  epilogueSuccess: string;
  epiloguePartial: string;
}

