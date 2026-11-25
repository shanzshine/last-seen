import type { CaseData } from '../types/case';

export const CASE_4_EN: CaseData = {
  id: 'case-04-grup-tanpa-nama',
  number: 4,
  title: 'Nameless Group',
  subtitle: 'The Secret Syndicate Behind Previous Cases',
  difficulty: 'Sulit',
  ownerName: 'Anonymous (#09)',
  lastSeenTime: '03:11 WIB',
  briefing:
    'An anonymous cloned phone with no owner name arrived on your desk. Every contact uses number codes, yet their chats mention Kos Melati, Project Helios, and the Cikunir Toll incident. Inspect Browser History, recover deleted chats, unlock the private Note, and choose carefully who receives this report.',
  wallpaperGradient: 'from-zinc-900 via-neutral-950 to-emerald-950',
  hints: [
    'Open the Browser app to find the 4-digit locker code for the locked Note, and check Group #00 for the log-wipe keyword.',
    'Read the locked Note and the news article in Browser before deciding who should receive your police report.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-broker',
    delayMs: 9000,
    senderName: '#01 (The Broker)',
    text: 'We know #09’s clone is in your hands. Be careful who you trust.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-grup00',
      name: 'Group #00 (Archive)',
      avatarInitials: '00',
      avatarColor: 'bg-zinc-800 text-zinc-200 border-zinc-700',
      isGroup: true,
      statusText: '#01, #04, #09',
      unreadCount: 2,
      messages: [
        {
          id: 'c4-g1',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Project Helios is wrapped up. The Kos Melati issue was also cleaned up so it doesn’t trace back to our fences.',
          time: '01:05',
          clueId: 'clue4-cross-case',
          clueLabel: 'Group #00 links Project Helios, Kos Melati, and a criminal syndicate',
        },
        {
          id: 'c4-g2',
          senderName: '#04',
          senderType: 'contact',
          text: 'What about the B 2841 KJL driver in Kemang? Police started tracking the plate.',
          time: '01:12',
        },
        {
          id: 'c4-g3',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Relax. Our insider, Commissioner H, is holding the files. Wipe all DMs using code: BROKER01.',
          time: '01:18',
          clueId: 'clue4-insider-h',
          clueLabel: 'An insider named Commissioner H protects the syndicate from investigations',
        },
      ],
    },
    {
      id: 'chat-broker',
      name: '#01 (The Broker)',
      avatarInitials: '01',
      avatarColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      statusText: 'encrypted',
      unreadCount: 1,
      recoveryKeyword: 'BROKER01',
      recoveryHint: 'Enter the log-wipe code mentioned by #01 in Group #00.',
      messages: [
        {
          id: 'c4-b1',
          senderName: 'Anonymous (#09)',
          senderType: 'owner',
          text: 'I want out. I didn’t sign up for taking lives like Bima.',
          time: '02:02',
        },
        {
          id: 'c4-b2',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Too late to walk away, #09. You already know too much.',
          time: '02:08',
        },
      ],
      deletedMessages: [
        {
          id: 'c4-bd1',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Emergency meet tomorrow at 23:00 at Sunda Kelapa Port Warehouse 4. Bring the server key.',
          time: '02:15',
          clueId: 'clue4-warehouse',
          clueLabel: 'Recovered chat reveals the syndicate meet at Sunda Kelapa Warehouse 4',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'photo4-vault',
      title: 'IMG_LOCKER_7709.jpg',
      timestamp: 'Yesterday • 23:40',
      location: 'Kota Station',
      visualType: 'room-key',
      caption: 'Old evidence photo of a storage locker.',
    },
  ],
  notes: [
    {
      id: 'note4-codes',
      title: 'Member Code List',
      updatedAt: 'Yesterday, 22:00',
      isLocked: false,
      content:
        '• #01 = The Broker (Mastermind)\n• #04 = Field Coordinator & Courier\n• #09 = Me (Server Admin)\n• Internal Protector = Commissioner Hendro',
    },
    {
      id: 'note4-warning',
      title: '🔒 Emergency Warning (Read Before Reporting)',
      updatedAt: 'Today, 02:55',
      isLocked: true,
      pinCode: '7709',
      pinHint: '4-digit locker number from the vault portal in Browser History.',
      content:
        'If this phone reaches a forensics analyst, DO NOT send the report to Commissioner Hendro! He is on #01’s payroll.\n\nSend all evidence directly to the Independent Cyber Taskforce so Warehouse 4 can be raided without leaks.',
      clueId: 'clue4-secret-note',
      clueLabel: 'Note #09 warns to report to Independent Cyber Taskforce, not Commissioner Hendro',
    },
  ],
  browserHistory: [
    {
      id: 'bh-1',
      time: '01:12 WIB',
      title: 'Old Port & Warehouse Map',
      url: 'maps.local/sunda-kelapa-4',
      snippet: 'Night access route to Sunda Kelapa Port Warehouse 4.',
    },
    {
      id: 'bh-2',
      time: '01:45 WIB',
      title: 'Internal Vault — Login #09',
      url: 'vault-internal.onion/login',
      snippet: 'Broker #01 Portal • Emergency Locker Access Code: 7709.',
      clueId: 'clue4-browser-vault',
      clueLabel: 'Browser History logged emergency locker access code: 7709',
    },
    {
      id: 'bh-3',
      time: '02:30 WIB',
      title: 'News: Sudden Oversight Division Transfer',
      url: 'berita.id/commissioner-hendro-oversight',
      snippet: 'Commissioner Hendro holds full authority over cyber and financial case reports.',
      clueId: 'clue4-browser-news',
      clueLabel: 'News article reveals Commissioner Hendro controls cyber case reports',
    },
  ],
  deductions: [
    {
      id: 'c4-q1',
      question: 'Who is the main mastermind behind Cases 1, 2, and 3?',
      options: [
        { id: 'broker', label: '#01 (The Broker)' },
        { id: 'kurir', label: '#04 (Field Coordinator)' },
        { id: 'server', label: '#09 (Server Admin)' },
      ],
      correctOptionId: 'broker',
    },
    {
      id: 'c4-q2',
      question: 'Where is the syndicate’s next emergency meeting?',
      options: [
        { id: 'cikunir', label: 'Rest Area KM 19 Cikampek Toll' },
        { id: 'sunda-kelapa', label: 'Sunda Kelapa Port Warehouse 4' },
        { id: 'kos', label: 'Kos Melati Room 07' },
      ],
      correctOptionId: 'sunda-kelapa',
    },
    {
      id: 'c4-q3',
      question: 'Who should receive all of this evidence?',
      options: [
        { id: 'satgas', label: 'Independent Cyber Taskforce' },
        { id: 'hendro', label: 'Commissioner Hendro (Oversight Division)' },
      ],
      correctOptionId: 'satgas',
    },
  ],
  customEpilogues: {
    hendro:
      '⚠️ BAD ENDING (LEAKED!): The moment your report hit Commissioner Hendro’s desk, all evidence logs were forcibly wiped from the server! The raid on Warehouse 4 failed, and a new message blinked on your screen from #01: "Thanks for reporting to our guy."',
  },
  epilogueSuccess:
    '✅ TRUE ENDING: The Independent Cyber Taskforce raided Sunda Kelapa Warehouse 4 and arrested Commissioner Hendro along with a dozen syndicate members! However, #01 (The Broker) slipped away at the last second, leaving one message in your system: "The game has only just begun." (To be continued in future cases!)',
  epiloguePartial:
    'Your report reached the Taskforce, but missed deductions delayed the Warehouse 4 raid and several syndicate members escaped.',
};
