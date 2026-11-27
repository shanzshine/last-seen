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
  isPuzzle?: boolean;
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

export interface PhoneNotification {
  id: number;
  kind: 'clue' | 'unlock' | 'recover' | 'alert';
  title: string;
  body: string;
  time?: string;
}

export interface CaseRecap {
  title: string;
  points: string[];
}

export interface SocialComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface SocialPost {
  id: string;
  accountHandle: string;
  accountLabel?: string;
  isPrivateAlt?: boolean;
  isCloseFriends?: boolean;
  time: string;
  location?: string;
  caption: string;
  likes: number;
  comments: SocialComment[];
  clueId?: string;
  clueLabel?: string;
}

export interface CallLogEntry {
  id: string;
  callerName: string;
  phoneNumber: string;
  type: 'incoming' | 'outgoing' | 'missed' | 'blocked';
  time: string;
  duration: string;
  note?: string;
  voicemailTranscript?: string;
  clueId?: string;
  clueLabel?: string;
}

export interface CaseFileItem {
  id: string;
  filename: string;
  fileType: 'pdf' | 'doc' | 'zip';
  size: string;
  date: string;
  isLocked?: boolean;
  password?: string;
  passwordHint?: string;
  content: string;
  clueId?: string;
  clueLabel?: string;
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
  socialPosts?: SocialPost[];
  callLogs?: CallLogEntry[];
  files?: CaseFileItem[];
  liveAlert?: LiveAlert;
  hints: string[];
  totalClues: number;
  deductions: DeductionQuestion[];
  epilogueSuccess: string;
  epiloguePartial: string;
  customEpilogues?: Record<string, string>;
}
