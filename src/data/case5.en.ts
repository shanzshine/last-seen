import type { CaseData } from '../types/case';

export const CASE_5_EN: CaseData = {
  id: 'case-05-kamar-404',
  number: 5,
  title: 'Room 404',
  subtitle: 'Key Witness Vanishes from a Midnight Hotel',
  difficulty: 'Sulit',
  ownerName: 'Reza Mahendra',
  lastSeenTime: '01:22 WIB',
  recap: {
    title: 'Continued from Case #04 • Previously...',
    points: [
      'The Independent Cyber Taskforce raided Sunda Kelapa Warehouse 4 and arrested Commissioner Hendro.',
      'However, the mastermind #01 (The Broker) escaped at the last second.',
      'Reza Mahendra, the sole witness who saw #01’s real face, was hidden at Hotel Senja Room 404—until tonight, when he vanished too.',
    ],
  },
  briefing:
    'Reza Mahendra (28), the key witness who saw #01 (The Broker), vanished from Hotel Senja Room 404 at 01:22 WIB. Lobby CCTV was wiped. Play Reza’s last Voice Note, check Browser History for the hotel lock log, and intercept the culprits before their ship sails!',
  wallpaperGradient: 'from-slate-900 via-zinc-950 to-amber-950',
  hints: [
    'Play the Voice Note in Agent Tari’s chat to hear the background whisper naming the port, then use that 1-word port name to recover the deleted chat.',
    'Check Browser History for the exact time the Master Key opened Room 404 (HHMM format) as the PIN for the locked Note.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-5',
    delayMs: 9000,
    senderName: 'Unknown Number',
    text: 'You’re too late again, analyst. Your key witness is about to board.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-tari',
      name: 'Agent Tari (Taskforce)',
      avatarInitials: 'TR',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c5-t1',
          senderName: 'Agent Tari',
          senderType: 'contact',
          text: 'Reza, stay inside Room 404. Only I and Fajar (the night receptionist) know your room number for safety.',
          time: '23:10',
        },
        {
          id: 'c5-t2',
          senderName: 'Reza Mahendra',
          senderType: 'owner',
          text: 'Copy that Ma’am. I double-locked the door from inside.',
          time: '23:14',
        },
        {
          id: 'c5-t3',
          senderName: 'Reza Mahendra',
          senderType: 'owner',
          text: 'Voice Note (0:12)',
          time: '01:19',
          voiceNote: {
            duration: '0:12',
            transcript:
              '"Agent Tari, someone knocked claiming to be hotel staff... wait, the door just unlocked from outside?! Help—"',
            backgroundCue:
              'Background audio: Master Key card beep, followed by a man whispering: "Take him to Pier 2 Muara Baru, ship leaves at 3!"',
          },
          clueId: 'clue5-voicenote',
          clueLabel: 'Voice Note 01:19 reveals culprits are taking Reza to Pier 2 Muara Baru',
        },
      ],
    },
    {
      id: 'chat-fajar',
      name: 'Fajar (Hotel Reception)',
      avatarInitials: 'FJ',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 01:30',
      messages: [
        {
          id: 'c5-f1',
          senderName: 'Fajar',
          senderType: 'contact',
          text: 'Evening Mr. Reza, let me know if you need extra water or blankets.',
          time: '23:45',
        },
        {
          id: 'c5-f2',
          senderName: 'Fajar',
          senderType: 'contact',
          text: 'Mr. Reza? I stayed at the front desk all night, I never went up to the 4th floor.',
          time: '02:05',
          clueId: 'clue5-fajar-alibi',
          clueLabel: 'Fajar claimed he never went up to the 4th floor that night',
        },
      ],
    },
    {
      id: 'chat-unknown-5',
      name: 'Unknown Number',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-700/40 text-zinc-200 border-zinc-600/40',
      statusText: 'hidden',
      recoveryKeyword: 'MUARA',
      recoveryHint: 'Enter the 1-word port name heard in the Voice Note background audio.',
      messages: [
        {
          id: 'c5-u1',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: 'Make sure witness 404 never draws that face sketch for the Taskforce.',
          time: '00:55',
        },
      ],
      deletedMessages: [
        {
          id: 'c5-ud1',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: '50 million advance wired to Fajar. He’ll unlock Room 404 with the Master Key.',
          time: '01:04',
          clueId: 'clue5-bribe',
          clueLabel: 'Recovered chat reveals Fajar was bribed Rp 50M to unlock Room 404',
        },
        {
          id: 'c5-ud2',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: 'Bring him to Pier 2 Muara Baru Port before the 03:00 ship departs.',
          time: '01:21',
          clueId: 'clue5-dock',
          clueLabel: 'Target is being taken to Pier 2 Muara Baru Port before 03:00',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'photo5-cctv',
      title: 'LOBBY_HOTEL_SENJA.jpg',
      timestamp: 'Today • 01:15',
      location: 'Hotel Senja',
      visualType: 'office-cctv',
      caption: '4th floor elevator access alert.',
    },
  ],
  notes: [
    {
      id: 'note5-wajah',
      title: '#01 Facial Features (Sunda Kelapa)',
      updatedAt: 'Yesterday, 22:30',
      isLocked: false,
      content:
        '• Male, ~175cm tall\n• Small burn scar on left temple\n• Wearing a silver wristwatch\n• Need to complete official sketch with Agent Tari tomorrow morning.',
    },
    {
      id: 'note5-backup',
      title: '🔒 Sketch Backup & Suspicion',
      updatedAt: 'Today, 01:08',
      isLocked: true,
      pinCode: '0118',
      pinHint: '4 digits (HHMM) when Room 404 was unlocked by Master Key. Check Browser History.',
      content:
        'Night receptionist (Fajar) kept pacing on his phone and glancing at the 4th floor elevator.\nIf anything happens to me, I already uploaded #01’s facial sketch to the Taskforce cloud under code: SENJA-404.',
      clueId: 'clue5-secret-note',
      clueLabel: 'Locked note confirms Fajar’s suspicious behavior & #01 sketch backup',
    },
  ],
  browserHistory: [
    {
      id: 'c5-bh1',
      time: '01:18 WIB',
      title: 'Hotel Senja — Smart Lock Audit Log',
      url: 'hotelsystem.local/keycard-404',
      snippet: 'Room 404 unlocked from outside using Master Key #08 (Fajar) at 01:18 WIB.',
      clueId: 'clue5-masterkey',
      clueLabel: 'Smart Lock log proves Fajar’s Master Key #08 opened Room 404 at 01:18',
    },
    {
      id: 'c5-bh2',
      time: '01:20 WIB',
      title: 'Night Cargo Ship Schedule',
      url: 'pelabuhan-info.id/muara-baru',
      snippet: 'Pier 2 Muara Baru Port • Cargo vessel bound for Batam departs 03:00 WIB.',
    },
  ],
  alibiChallenge: {
    suspectName: 'Fajar (Receptionist)',
    suspectClaim:
      'I stayed at the lobby front desk all night and never went up to the 4th floor or opened Room 404.',
    prompt: 'Which evidence directly shatters Fajar’s alibi?',
    options: [
      { id: 'a', label: 'Room booking under Reza’s name on the 4th floor' },
      { id: 'b', label: 'Photo of the receptionist Master Key card log used at 01:12 on Room 404' },
      { id: 'c', label: 'Cargo ship schedule at Muara Baru Port' },
    ],
    correctOptionId: 'b',
  },
  deductions: [
    {
      id: 'c5-q1',
      question: 'Who at the hotel unlocked Room 404 for the syndicate?',
      options: [
        { id: 'fajar', label: 'Fajar (Night Receptionist)' },
        { id: 'tari', label: 'Agent Tari (Taskforce)' },
        { id: 'kurir', label: 'Hotel Valet Attendant' },
      ],
      correctOptionId: 'fajar',
    },
    {
      id: 'c5-q2',
      question: 'Which clue in Reza’s Voice Note revealed the culprits’ escape destination?',
      options: [
        { id: 'stasiun', label: 'Train announcement at Gambir Station' },
        { id: 'muara', label: 'Background whisper mentioning Pier 2 Muara Baru, 3 AM ship' },
        { id: 'tol', label: 'Bekasi toll gate chime' },
      ],
      correctOptionId: 'muara',
    },
    {
      id: 'c5-q3',
      question: 'Where must the Taskforce intercept the culprits before 03:00 WIB?',
      options: [
        { id: 'sunda-kelapa', label: 'Sunda Kelapa Warehouse 4' },
        { id: 'muara-baru', label: 'Pier 2 Muara Baru Port' },
        { id: 'hotel', label: 'Hotel Senja Lobby' },
      ],
      correctOptionId: 'muara-baru',
    },
  ],
  epilogueSuccess:
    'The Cyber Taskforce stormed Pier 2 Muara Baru Port just 15 minutes before departure! Reza was rescued safely, Fajar was arrested with the Rp 50M transfer record, and #01’s facial sketch was officially broadcast to every unit.',
  epiloguePartial:
    'Your report helped trace Fajar’s involvement, but delays in pinpointing Pier 2 allowed the vessel to pull away before coast patrol finally intercepted it.',
};

