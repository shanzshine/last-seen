import type { CaseData } from '../types/case';

export const CASE_10_EN: CaseData = {
  id: 'case-10-wajah-01',
  number: 10,
  title: 'Face of #01',
  subtitle: 'SEASON 1 FINALE • The Mastermind’s Own Phone Is Seized',
  difficulty: 'Sulit',
  ownerName: '#01 (The Broker)',
  lastSeenTime: '04:05 WIB',
  recap: {
    title: 'Continued from Case #09 • Previously...',
    points: [
      'From Boarding Room 07 and Project Helios to Operating Room 09—every thread led back to one shadow mastermind: #01 (The Broker).',
      'Using Nurse Maya’s emergency coordinates, the Task Force raided Misty Villa in Puncak before dawn.',
      '#01 slipped out the back during the breach—but left his primary phone on the desk at 4% battery. This is your final shot to catch him.',
    ],
  },
  briefing:
    'SEASON 1 FINALE: #01 (The Broker)’s own phone was seized by the Task Force at Misty Villa at 04:05 WIB! Uncover #01’s real identity, restore his deleted message, unlock the Master Syndicate Ledger in Notes, and intercept his escape before he crosses international waters!',
  wallpaperGradient: 'from-zinc-950 via-red-950 to-black',
  hints: [
    'Use the exact time #01’s phone was last active (4-digit HHMM format) as the PIN to unlock the Master Syndicate Ledger.',
    'There is a deleted message in #02 (Operations)’s chat. Use the 1-word Indonesian name of their raided villa base (Villa _____) to restore it.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-02',
    delayMs: 10000,
    senderName: '#02 (Operations)',
    text: 'Boss, Task Force just breached Misty Villa’s gate! The speedboat at the pier is fueled and waiting for you!',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-02',
      name: '#02 (Operations)',
      avatarInitials: '02',
      avatarColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      statusText: 'online',
      unreadCount: 1,
      recoveryKeyword: 'KABUT',
      recoveryHint: '1-word Indonesian name of their villa base (Villa _____)',
      messages: [
        {
          id: 'c10-2a',
          senderName: '#02',
          senderType: 'contact',
          text: 'Boss, the black ambulance from Medika Hospital just arrived with the encrypted briefcase. Put it in the server room?',
          time: '03:35',
        },
        {
          id: 'c10-2b',
          senderName: '#01 (The Broker)',
          senderType: 'owner',
          text: 'Voice Note (0:15)',
          time: '03:58',
          voiceNote: {
            duration: '0:15',
            transcript:
              '"Burn all the servers at Misty Villa right now! I planted a decoy route to Soekarno-Hatta Airport in the system—I’m heading straight to Merak Fisherman Pier for the speedboat!"',
            backgroundCue:
              'Background audio: distant sirens, paper burning, and an SUV engine speeding down wet asphalt.',
          },
          clueId: 'clue10-voicenote',
          clueLabel: '03:58 Voice Note: #01 is fleeing to Merak Fisherman Pier; the airport is a decoy',
        },
      ],
      deletedMessages: [
        {
          id: 'c10-2d1',
          senderName: '#01 (The Broker)',
          senderType: 'owner',
          text: 'Prep the new passport under my real name: Ardian Kusuma. All reserve funds are wired offshore before we abandon Misty Villa.',
          time: '03:46',
          clueId: 'clue10-deleted-identity',
          clueLabel: '#01’s deleted chat reveals his real identity: Ardian Kusuma',
        },
      ],
    },
    {
      id: 'chat-komisaris',
      name: 'Commissioner H (Archive)',
      avatarInitials: 'KH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 01:18',
      messages: [
        {
          id: 'c10-k1',
          senderName: 'Commissioner H',
          senderType: 'contact',
          text: 'Group #00 is compromised. I can’t hold back the Project Helios files any longer.',
          time: '01:15',
        },
        {
          id: 'c10-k2',
          senderName: '#01 (The Broker)',
          senderType: 'owner',
          text: 'Relax, every pawn from Kos Melati to Medika Hospital has been cut loose. They’ll never know my face.',
          time: '01:18',
        },
      ],
    },
  ],
  socialPosts: [
    {
      id: 'soc10-1',
      accountHandle: '@broker.private',
      isPrivateAlt: true,
      isCloseFriends: true,
      time: '03:40 WIB',
      location: 'Misty Villa • Puncak',
      caption:
        'Hendro, Dr. Hendra, Yanto, and Rendy were all just chess pieces. As long as Ardian Kusuma stays buried behind the screen, the Task Force is only chasing shadows.',
      likes: 2,
      comments: [
        {
          id: 'cm10-1',
          author: '@ops.02',
          text: 'All sea routes are clear as ordered, Sir.',
          time: '03:43',
        },
      ],
      clueId: 'clue10-social-alt',
      clueLabel: '@broker.private post confirms previous culprits were all pawns of Ardian Kusuma',
    },
  ],
  photos: [
    {
      id: 'p10-helios',
      title: 'SCAN_HELIOS_FINAL.JPG',
      timestamp: '03:20 WIB',
      location: 'Misty Villa',
      visualType: 'audit-transfer',
      isPuzzle: true,
      caption: 'Final Project Helios Rp 4 Billion audit trail linked directly to #01’s accounts.',
    },
  ],
  callLogs: [
    {
      id: 'call10-1',
      callerName: 'Merak Pier Charter',
      phoneNumber: '+62 813-9001-4410',
      type: 'outgoing',
      time: '03:58 WIB',
      duration: '2:15',
      note: 'Confirmed emergency speedboat departure at 05:00 WIB from Merak Executive Pier.',
    },
    {
      id: 'call10-2',
      callerName: 'Commissioner H',
      phoneNumber: '+62 811-0029-881',
      type: 'incoming',
      time: '04:02 WIB',
      duration: '0:31',
      voicemailTranscript:
        '"Ardian, the task force has surrounded Misty Villa. Burn the files and head to Merak immediately!"',
    },
  ],
  files: [
    {
      id: 'file10-offshore',
      filename: 'OFFSHORE_MANIFEST_01.zip',
      fileType: 'zip',
      size: '2.4 MB',
      date: '04:01 WIB',
      isLocked: true,
      password: 'KUSUMA-01',
      passwordHint: 'Offshore server key written inside Master Syndicate Ledger #01 Note',
      content:
        'SYNDICATE WIRE ARCHIVE\nPrimary Owner: Ardian Kusuma (#01)\nEscape Route: Merak Executive Pier -> 05:00 WIB Speedboat\nDestination Account: Cayman Holding #884-XK',
    },
    {
      id: 'file10-passport',
      filename: 'EMERGENCY_PASSPORT_ARDIAN.pdf',
      fileType: 'pdf',
      size: '620 KB',
      date: '03:45 WIB',
      content:
        'Express Passport Request under alias: A. Wijaya (Photo: Ardian Kusuma). Status: Ready for pickup at Merak.',
    },
  ],
  notes: [
    {
      id: 'n10-ledger',
      title: 'MASTER SYNDICATE LEDGER #01',
      updatedAt: '04:01 WIB',
      isLocked: true,
      pinCode: '0405',
      pinHint: 'Exact time #01’s phone was last active (4-digit HHMM format)',
      content:
        'Full network of Ardian Kusuma (#01 / former prosecutor): 1) Kos Melati & Kemang Taxi (cash laundering), 2) Project Helios & Hendro (corporate siphon), 3) PT Surya Rimba & Rendy’s Agency (illegal fronts), 4) Medika OR 09 (erasing trails). Offshore server key: KUSUMA-01.',
      clueId: 'clue10-note-ledger',
      clueLabel: 'Master Ledger proves Ardian Kusuma (former prosecutor) masterminded Cases 1–9',
    },
  ],
  locations: [
    {
      id: 'loc10-1',
      time: '03:40 WIB',
      place: 'Misty Villa Puncak',
      address: '#01 Main Headquarters',
      note: 'Task Force raid site.',
    },
    {
      id: 'loc10-2',
      time: '04:02 WIB',
      place: 'Backroad ➔ Merak Fisherman Pier',
      address: 'Banten • Speedboat Access',
      note: '#01’s getaway SUV GPS tracked heading toward Merak Fisherman Pier (not the airport).',
      clueId: 'clue10-gps-merak',
      clueLabel: '04:02 GPS confirms #01’s escape route to Merak Fisherman Pier',
    },
  ],
  browserHistory: [
    {
      id: 'bh10-1',
      time: '03:50 WIB',
      title: 'Emergency Passport & Merak Speedboat Charter',
      url: 'dark-transit.onion/booking/ardian-kusuma',
      snippet: 'Passenger: Ardian Kusuma. Speedboat departs 04:45 WIB from Merak Fisherman Pier toward international waters.',
      clueId: 'clue10-browser-passport',
      clueLabel: '03:50 Browser logs a 04:45 Merak speedboat booking under Ardian Kusuma',
    },
  ],
  alibiChallenge: {
    suspectName: 'Ardian Kusuma (#01)',
    suspectClaim:
      'I am merely a retired official resting at my villa—I have zero ties to any syndicate or escape plan.',
    prompt: 'Which evidence seals Ardian Kusuma’s involvement and escape plan?',
    options: [
      { id: 'a', label: 'A scenic photo of Misty Villa with no metadata' },
      { id: 'b', label: 'Master Ledger #01, OFFSHORE_MANIFEST_01.zip, & 05:00 Merak speedboat charter call' },
      { id: 'c', label: 'Morning greeting from the villa receptionist' },
    ],
    correctOptionId: 'b',
  },
  deductions: [
    {
      id: 'q10-identity',
      question: 'Who is the real person behind the mysterious #01 (The Broker)?',
      options: [
        { id: 'a', label: 'Ardian Kusuma, a former prosecutor controlling the entire syndicate' },
        { id: 'b', label: 'Commissioner Hendro who faked his arrest' },
        { id: 'c', label: 'Bima Pratama from NusaTech' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q10-escape',
      question: 'Where is #01 actually trying to escape so the Task Force can intercept him?',
      options: [
        { id: 'a', label: 'Soekarno-Hatta International Airport' },
        { id: 'b', label: 'Merak Fisherman Pier by speedboat at 04:45 WIB' },
        { id: 'c', label: 'Muara Baru Harbor aboard a cargo ship' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q10-network',
      question: 'How do the culprits from Cases #1 through #9 connect to #01?',
      options: [
        { id: 'a', label: 'Completely unrelated random crimes' },
        { id: 'b', label: 'Disposable pawns and money-laundering nodes in #01’s centralized network' },
        { id: 'c', label: 'Undercover Task Force agents' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'CASE CLOSED — SEASON 1 COMPLETE! Thanks to your investigation from Case #1 to #10, the Task Force maritime unit surrounded Merak Fisherman Pier at 04:35 WIB—ten minutes before departure—and arrested Ardian Kusuma (#01 / The Broker)! The entire syndicate has fallen. Thank you for playing, Analyst!',
  epiloguePartial:
    'SEASON 1 COMPLETE (PARTIAL). Ardian Kusuma was apprehended at Merak, though a few evidence nodes in the Master Ledger remain under review.',
};

