export type CaseDifficulty = 'Mudah' | 'Menengah' | 'Sulit';

export type ChatSenderType = 'owner' | 'contact' | 'system';

export interface VoiceNoteData {
  duration: string;
  transcript: string;
  backgroundCue: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderType: ChatSenderType;
  text: string;
  time: string;
  clueId?: string;
  clueLabel?: string;
  attachmentPhotoId?: string;
  voiceNote?: VoiceNoteData;
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
  deletedMessages?: ChatMessage[];
  recoveryKeyword?: string;
  recoveryHint?: string;
}

export interface PhotoEvidence {
  id: string;
  title: string;
  timestamp: string;
  location: string;
  visualType:
    | 'cafe-receipt'
    | 'room-key'
    | 'side-gate'
    | 'train-ticket'
    | 'access-card'
    | 'audit-transfer'
    | 'office-cctv'
    | 'toll-receipt'
    | 'taxi-plate'
    | 'trail-sign'
    | 'fog-silhouettes'
    | 'radio-ht';
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

export interface LocationLog {
  id: string;
  time: string;
  place: string;
  address: string;
  note: string;
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

export interface BrowserHistoryItem {
  id: string;
  time: string;
  title: string;
  url: string;
  snippet: string;
  clueId?: string;
  clueLabel?: string;
}

export interface LiveAlert {
  threadId: string;
  delayMs: number;
  senderName: string;
  text: string;
  time: string;
}

export interface CaseRecap {
  title: string;
  points: string[];
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
  recap?: CaseRecap;
  wallpaperGradient: string;
  chats: ChatThread[];
  photos: PhotoEvidence[];
  notes: NoteItem[];
  locations?: LocationLog[];
  browserHistory?: BrowserHistoryItem[];
  liveAlert?: LiveAlert;
  hints: string[];
  totalClues: number;
  deductions: DeductionQuestion[];
  epilogueSuccess: string;
  epiloguePartial: string;
  customEpilogues?: Record<string, string>;
}
