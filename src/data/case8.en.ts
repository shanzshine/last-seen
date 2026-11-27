import type { CaseData } from '../types/case';

export const CASE_8_EN: CaseData = {
  id: 'case-08-siaran-tengah-malam',
  number: 8,
  title: 'Midnight Livestream',
  subtitle: 'A Ghost-Hunt Livestream Cut Off at 02:33 WIB',
  difficulty: 'Sulit',
  ownerName: 'Dika Mahendra',
  lastSeenTime: '02:33 WIB',
  recap: {
    title: 'Continued from Case #07 • Previously...',
    points: [
      'After the Second Account case exposed the digital agency’s laundering scheme, #01 (The Broker)’s syndicate was forced into hiding.',
      'Dika Mahendra (25), an urban-exploration livestreamer, began a midnight ghost hunt at the Abandoned Harbor Hospital without knowing its basement was in use.',
      'At 02:33 WIB, the stream went black in front of 14,000 viewers. Police found Dika’s cracked phone in the 1st-floor lobby—with no sign of Dika.',
    ],
  },
  briefing:
    'Dika Mahendra (25) vanished during a midnight livestream at the Abandoned Harbor Hospital at 02:33 WIB. Viewers blamed a paranormal attack, while the caretaker insists the gates were padlocked at 10 PM. Check his Social post, panicked Voice Note, recover the deleted chat, and find which floor he is hiding on!',
  wallpaperGradient: 'from-zinc-950 via-red-950 to-black',
  hints: [
    'Use the exact timestamp when Dika’s livestream cut off (4-digit HHMM format) as the PIN for his Emergency Note.',
    'There is a deleted message in Pak Haris (Caretaker)’s chat. Use the 1-word name of the underground floor where the generator room is located to restore it.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-8',
    delayMs: 10000,
    senderName: 'Unknown Number',
    text: 'We killed your stream. If you are still inside the building, do not try leaving through the lobby.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-kiki',
      name: 'Kiki (Camera Crew)',
      avatarInitials: 'KK',
      avatarColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c8-k1',
          senderName: 'Kiki',
          senderType: 'contact',
          text: 'Dika, I’m on standby in the car outside the gate. Signal inside the old hospital is terrible, stay safe.',
          time: '01:45',
        },
        {
          id: 'c8-k2',
          senderName: 'Dika Mahendra',
          senderType: 'owner',
          text: 'All clear here, lobby’s empty. Heading down the basement stairs for a quick look.',
          time: '02:18',
        },
        {
          id: 'c8-k3',
          senderName: 'Dika Mahendra',
          senderType: 'owner',
          text: 'Voice Note (0:13)',
          time: '02:31',
          voiceNote: {
            duration: '0:13',
            transcript:
              '"Kiki... it’s not a ghost in the basement... two guys with metal briefcases just went into the generator room... I heard them mention The Broker! Running to the fire stairs—"',
            backgroundCue:
              'Background audio: heavy boots running down a concrete corridor, a metal door slamming, and a distant shout: "Kill the signal!"',
          },
          clueId: 'clue8-voicenote',
          clueLabel: '02:31 Voice Note reveals two armed men carrying briefcases mentioning "The Broker"',
        },
      ],
    },
    {
      id: 'chat-haris',
      name: 'Pak Haris (Caretaker)',
      avatarInitials: 'PH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 03:00',
      recoveryKeyword: 'BASEMENT',
      recoveryHint: 'Underground floor of the building (1 word)',
      messages: [
        {
          id: 'c8-h1',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'Dika, just film in the lobby tonight, don’t go downstairs. Lots of exposed wiring.',
          time: '01:10',
        },
        {
          id: 'c8-h2',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'I already told the police, the back gate has been padlocked since 10 PM. Impossible for any vehicle or anyone else to be inside.',
          time: '03:15',
          clueId: 'clue8-haris-alibi',
          clueLabel: 'Pak Haris insists the back gate was locked at 22:00 & nobody else was inside',
        },
      ],
      deletedMessages: [
        {
          id: 'c8-hd1',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'Got the hush money. Basement gate is unlocked for your box truck at 2 AM, and I killed the gate CCTV.',
          time: '00:55',
          clueId: 'clue8-deleted-haris',
          clueLabel: 'Pak Haris’s deleted chat: paid off to unlock the basement for a syndicate box truck at 02:00',
        },
      ],
    },
    {
      id: 'chat-unknown-8',
      name: 'Unknown Number',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'unknown',
      messages: [
        {
          id: 'c8-u1',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: 'Stop filming Sector B.',
          time: '02:34',
        },
      ],
    },
  ],
  socialPosts: [
    {
      id: 'soc8-1',
      accountHandle: '@dika.explore',
      time: '01:30 WIB',
      location: 'Old Harbor Hospital (Sector B)',
      caption:
        'LIVE NOW! Solo ghost hunt inside the Abandoned Harbor Hospital. Locals say footsteps echo from the generator room every 2 AM...',
      likes: 1240,
      comments: [
        {
          id: 'cm8-1',
          author: '@kiki.crew',
          text: 'Be careful bro, watching from the car outside!',
          time: '01:32',
        },
        {
          id: 'cm8-2',
          author: '@anon_019',
          text: 'Dude do NOT go down to Basement B, those aren’t ghosts down there tonight.',
          time: '02:05',
        },
      ],
      clueId: 'clue8-social-stream',
      clueLabel: '@anon_019’s 02:05 comment warned Dika not to go down to Basement B',
    },
  ],
  photos: [
    {
      id: 'p8-gate',
      title: 'IMG_0214.JPG',
      timestamp: '01:25 WIB',
      location: 'Old Hospital Side Gate',
      visualType: 'side-gate',
      caption: 'Side gate photo taken right before Dika entered for his livestream.',
    },
    {
      id: 'p8-cctv',
      title: 'IMG_0228.JPG',
      timestamp: '02:02 WIB',
      location: 'Sector B Corridor',
      visualType: 'office-cctv',
      isPuzzle: true,
      caption: 'Old security monitor snapshot that flickered briefly in the corridor.',
    },
  ],
  callLogs: [
    {
      id: 'call8-1',
      callerName: 'Unknown Caller',
      phoneNumber: 'Private Number',
      type: 'blocked',
      time: '02:29 WIB',
      duration: '0:09',
      voicemailTranscript:
        '"That kid is still on B1. Do not let him out the back gate before our cases are loaded into the box truck."',
    },
    {
      id: 'call8-2',
      callerName: 'Kiki (Editor)',
      phoneNumber: '+62 812-8840-1920',
      type: 'missed',
      time: '02:34 WIB',
      duration: '0:00',
      note: 'Missed call 1 minute after the livestream cut off.',
    },
  ],
  notes: [
    {
      id: 'n8-gear',
      title: 'Ghost Hunt Gear Checklist',
      updatedAt: '01:05 WIB',
      isLocked: false,
      content:
        '20,000mAh powerbank, gimbal, wireless mic. Turn off flashlight if battery gets critical so I’m harder to spot.',
    },
    {
      id: 'n8-hide',
      title: 'EMERGENCY — HIDING SPOT',
      updatedAt: '02:32 WIB',
      isLocked: true,
      pinCode: '0233',
      pinHint: 'Exact time the livestream cut off (4-digit HHMM format)',
      content:
        'My phone cracked and signal is jammed near the lobby. I deliberately dropped it by the lobby door so they think I ran outside. I’m still inside, locked in the 3rd Floor Archive Room! Their black box truck is parked in Basement B.',
      clueId: 'clue8-note-hide',
      clueLabel: 'Emergency note: Dika is alive and locked inside the 3rd Floor Archive Room',
    },
  ],
  locations: [
    {
      id: 'loc8-1',
      time: '01:45 WIB',
      place: 'Old Harbor Hospital Lobby',
      address: 'Sector B • 1st Floor',
      note: 'Starting point of Dika’s livestream.',
    },
    {
      id: 'loc8-2',
      time: '02:30 WIB',
      place: 'Basement B Generator Room',
      address: 'Level B1 • Box Truck Access',
      note: 'Dika’s GPS pinged inside Basement B right before sprinting up the emergency stairs.',
      clueId: 'clue8-gps-basemen',
      clueLabel: '02:30 GPS proves Dika entered Basement B Generator Room before fleeing upstairs',
    },
  ],
  browserHistory: [
    {
      id: 'bh8-1',
      time: '00:40 WIB',
      title: 'History of Old Harbor Hospital Sector B (Closed 2012)',
      url: 'arsip-kota.id/rs-pelabuhan',
      snippet: '3-story abandoned building with a basement ramp connecting directly to the back pier road.',
    },
  ],
  deductions: [
    {
      id: 'q8-culprit',
      question: 'Who was really inside Basement B that night, and who helped them get in?',
      options: [
        { id: 'a', label: '#01 (The Broker)’s syndicate members, assisted by Pak Haris the caretaker' },
        { id: 'b', label: 'Kiki (camera crew) staging a prank for views' },
        { id: 'c', label: 'The ghost haunting the Old Harbor Hospital' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q8-motive',
      question: 'Why was Dika’s livestream forcibly shut down at 02:33 WIB?',
      options: [
        { id: 'a', label: 'His camera battery died naturally' },
        { id: 'b', label: 'Dika stumbled onto #01’s hidden transit base and briefcases in Basement B' },
        { id: 'c', label: 'Nighttime building demolition crew cleared the area' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q8-location',
      question: 'Where should the rescue team find Dika right now?',
      options: [
        { id: 'a', label: 'Inside Kiki’s car outside the gate' },
        { id: 'b', label: 'Inside the Basement B Generator Room' },
        { id: 'c', label: 'Locked inside the 3rd Floor Archive Room' },
      ],
      correctOptionId: 'c',
    },
  ],
  epilogueSuccess:
    'RIGHT ON TIME! The Task Force tactical team surrounded the Basement B rear ramp and rescued Dika Mahendra safely from the 3rd Floor Archive Room. From the seized black box truck in the basement, investigators uncovered a lead pointing to a secret medical facility used by #01’s syndicate!',
  epiloguePartial:
    'Case partially closed. Dika was rescued safely, though the syndicate operatives in the basement slipped away before the box truck could be intercepted.',
};

