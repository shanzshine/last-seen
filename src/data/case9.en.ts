import type { CaseData } from '../types/case';

export const CASE_9_EN: CaseData = {
  id: 'case-09-kamar-operasi-09',
  number: 9,
  title: 'Operating Room 09',
  subtitle: 'A Night-Shift Nurse Vanishes & a Faked Death Certificate',
  difficulty: 'Sulit',
  ownerName: 'Maya Lestari',
  lastSeenTime: '02:47 WIB',
  recap: {
    title: 'Continued from Case #08 • Previously...',
    points: [
      'After rescuing Dika Mahendra at the Abandoned Harbor Hospital, the Task Force traced surgical supply shipments from the syndicate’s box truck to Medika Utama Hospital.',
      'At 02:47 WIB, night-shift nurse Maya Lestari (27) vanished right before the end of her shift.',
      'Maya’s phone was found neatly placed inside her 3rd-floor staff locker—while CCTV outside Operating Room 09 went dark for 40 minutes.',
    ],
  },
  briefing:
    'Nurse Maya Lestari (27) vanished during her night shift at Medika Utama Hospital at 02:47 WIB. The Chief Surgeon insists Operating Room 09 was empty and locked since 11 PM. Check her Voice Note, Browser history, restore the deleted message, and uncover the truth behind Patient 09!',
  wallpaperGradient: 'from-slate-950 via-teal-950 to-zinc-950',
  hints: [
    'Use the exact time Maya was last seen (4-digit HHMM format) as the PIN to unlock her Emergency Note.',
    'There is a deleted message in Dr. Hendra’s chat. Use the 1-word adjective from "_____ record" that Maya photographed in OR 09 to restore it.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-9',
    delayMs: 10000,
    senderName: 'Unknown Number',
    text: 'The Room 09 patient files have been destroyed. Put that nurse’s phone back in the locker before the morning shift.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-rian',
      name: 'Dr. Rian (Duty Doctor)',
      avatarInitials: 'DR',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c9-r1',
          senderName: 'Dr. Rian',
          senderType: 'contact',
          text: 'Maya, we don’t have any emergency surgeries scheduled tonight, right? Why are the lights on inside OR 09?',
          time: '01:50',
        },
        {
          id: 'c9-r2',
          senderName: 'Maya Lestari',
          senderType: 'owner',
          text: 'Yeah Doc, the board says empty. Let me go check the surgical wing real quick.',
          time: '02:05',
        },
        {
          id: 'c9-r3',
          senderName: 'Maya Lestari',
          senderType: 'owner',
          text: 'Voice Note (0:14)',
          time: '02:41',
          voiceNote: {
            duration: '0:14',
            transcript:
              '"Dr. Rian... the patient pronounced dead in OR 09 just walked out to the ambulance bay on his own! I managed to snap a photo of his fake medical record—"',
            backgroundCue:
              'Background audio: ECG monitor powering off, emergency door swinging open, and hurried footsteps echoing down the sterile corridor.',
          },
          clueId: 'clue9-voicenote',
          clueLabel: '02:41 Voice Note: the "deceased" OR 09 patient walked out alive',
        },
      ],
    },
    {
      id: 'chat-hendra',
      name: 'Dr. Hendra (Chief Surgeon)',
      avatarInitials: 'DH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 03:20',
      recoveryKeyword: 'MEDICAL',
      recoveryHint: '1-word adjective from "_____ record" mentioned in Maya’s Voice Note',
      messages: [
        {
          id: 'c9-h1',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'Maya, stay on the 3rd-floor ward tonight. Do not enter the 2nd-floor surgical wing.',
          time: '00:30',
        },
        {
          id: 'c9-h2',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'I already briefed the hospital director. OR 09 was empty and locked tight since 11 PM—no procedures or patients at all tonight.',
          time: '03:15',
          clueId: 'clue9-hendra-alibi',
          clueLabel: 'Dr. Hendra insists OR 09 was empty & locked since 23:00',
        },
      ],
      deletedMessages: [
        {
          id: 'c9-hd1',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'Nurse Maya caught the fake death certificate handoff! Stop her before she sends those medical records out, lock her in the B1 Archive Room!',
          time: '02:44',
          clueId: 'clue9-deleted-hendra',
          clueLabel: 'Dr. Hendra’s deleted chat: ordered guards to chase Maya & lock her in B1 Archive Room',
        },
      ],
    },
    {
      id: 'chat-unknown-9',
      name: 'Unknown Number',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'unknown',
      messages: [
        {
          id: 'c9-u1',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: 'Death certificate for Budi Santoso is finalized. All original files burned.',
          time: '02:50',
        },
      ],
    },
  ],
  socialPosts: [
    {
      id: 'soc9-1',
      accountHandle: '@maya.nurse',
      time: '01:15 WIB',
      location: 'Medika Utama Hospital • 3F',
      caption: '4th night shift this week. Quick coffee before ward rounds ☕',
      likes: 184,
      comments: [
        {
          id: 'cm9-1',
          author: '@suster.tika',
          text: 'Maya, I saw an unmarked black ambulance pull into B2 basement past 1 AM, VVIP patient?',
          time: '01:28',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'p9-cctv',
      title: 'IMG_0238.JPG',
      timestamp: '02:02 WIB',
      location: '2F Surgical Corridor',
      visualType: 'office-cctv',
      caption: 'Security monitor photo of the 2nd-floor corridor right before cameras were manually shut down.',
    },
  ],
  callLogs: [
    {
      id: 'call9-1',
      callerName: 'Dr. Hendra (Chief Surgeon)',
      phoneNumber: '+62 811-7720-009',
      type: 'incoming',
      time: '02:18 WIB',
      duration: '0:42',
      note: 'Dr. Hendra called from the 2F Surgical Wing extension—despite claiming he stayed on 3F.',
    },
    {
      id: 'call9-2',
      callerName: 'Contact #01 (Masked)',
      phoneNumber: 'Private Number',
      type: 'blocked',
      time: '02:49 WIB',
      duration: '1:14',
      voicemailTranscript:
        '"Make sure the OR 09 patient death certificate is finalized before dawn. Do not let that nurse talk to the police."',
    },
  ],
  files: [
    {
      id: 'file9-deathcert',
      filename: 'DEATH_CERTIFICATE_OR09.pdf',
      fileType: 'pdf',
      size: '412 KB',
      date: '02:50 WIB',
      isLocked: true,
      password: '0247',
      passwordHint: 'Maya’s last seen time (4-digit HHMM)',
      content:
        'CERTIFICATE OF DEATH (INTERNAL DRAFT)\nPatient: Budi Santoso\nLocation: Operating Room 09 — Medika Utama Hospital\nStatus: Falsified under orders from Dr. Hendra & #01 to erase a key witness identity.',
    },
    {
      id: 'file9-emr',
      filename: 'OR_2F_ACCESS_LOG.doc',
      fileType: 'doc',
      size: '84 KB',
      date: '02:05 WIB',
      content:
        'Keycard: DR-HENDRA-01\nDoor: Operating Room 09 (2nd Floor)\nStatus: UNLOCKED at 01:55 WIB (contradicts official report to Hospital Director).',
    },
  ],
  notes: [
    {
      id: 'n9-shift',
      title: 'Night Shift Checklist',
      updatedAt: '00:15 WIB',
      isLocked: false,
      content: 'Check IV stock for Wards 3A–3D, hand over shift report to Nurse Tika at 07:00 WIB.',
    },
    {
      id: 'n9-safe',
      title: 'EMERGENCY — PROOF & LOCATION',
      updatedAt: '02:46 WIB',
      isLocked: true,
      pinCode: '0247',
      pinHint: 'Exact time Maya was last seen (4-digit HHMM format)',
      content:
        'I’m locked from the outside inside the B1 Pharmacy Archive Room! Before running, I slipped my phone into my 3F staff locker so they couldn’t take it. That fake patient is #01’s top courier—their black ambulance is heading straight to Misty Villa in Puncak with #01’s encrypted briefcase!',
      clueId: 'clue9-note-safe',
      clueLabel: 'Emergency note: Maya is locked in B1 Archive Room & ambulance is heading to Misty Villa',
    },
  ],
  locations: [
    {
      id: 'loc9-1',
      time: '02:05 WIB',
      place: 'Operating Room 09',
      address: '2nd Floor • Sterile Zone',
      note: 'Maya checked the unscheduled lit operating room.',
    },
    {
      id: 'loc9-2',
      time: '02:45 WIB',
      place: 'B2 Ambulance Bay ➔ 3F Staff Locker',
      address: 'Medika Utama Hospital',
      note: 'Maya tracked the unmarked ambulance in B2, then stashed her phone in the locker before heading down.',
      clueId: 'clue9-gps-ambulans',
      clueLabel: '02:45 GPS tracked Maya at B2 Ambulance Bay before stashing her phone',
    },
  ],
  browserHistory: [
    {
      id: 'bh9-1',
      time: '02:30 WIB',
      title: 'Internal EMR — Patient "Budi Santoso" (OR 09)',
      url: 'simrs.medikautama.local/patient/kamar-09',
      snippet: 'Status: Pronounced Deceased (DOA) at 02:15 by Dr. Hendra. Alert: National ID matches Task Force Most-Wanted #01 syndicate fugitive.',
      clueId: 'clue9-browser-donor',
      clueLabel: '02:30 Browser proves OR 09 patient is a #01 fugitive whose death was faked',
    },
  ],
  deductions: [
    {
      id: 'q9-culprit',
      question: 'Who inside the hospital faked the OR 09 patient’s death and locked Maya away?',
      options: [
        { id: 'a', label: 'Dr. Hendra (Chief Surgeon) colluding with #01’s syndicate' },
        { id: 'b', label: 'Dr. Rian (Duty Doctor) covering up malpractice' },
        { id: 'c', label: 'Nurse Tika out of shift jealousy' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q9-motive',
      question: 'Why did #01’s syndicate use Operating Room 09 that night?',
      options: [
        { id: 'a', label: 'Illegal organ harvesting operation' },
        { id: 'b', label: 'Issuing a fake death certificate so a top #01 fugitive could evade capture' },
        { id: 'c', label: 'Ordinary hospital anesthetic theft' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q9-location',
      question: 'Where is Nurse Maya right now so the rescue team can free her?',
      options: [
        { id: 'a', label: 'Taken away inside the black ambulance to Misty Villa' },
        { id: 'b', label: 'Locked inside the B1 Pharmacy Archive Room' },
        { id: 'c', label: 'Hiding inside the 3rd-floor staff locker room' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'RESCUED! The Task Force breached the B1 Pharmacy Archive Room and freed Nurse Maya Lestari unharmed! Dr. Hendra was arrested in his office, and the Misty Villa coordinates Maya logged set up the final raid—hunting down the mastermind himself, #01 (The Broker)!',
  epiloguePartial:
    'Case partially closed. Nurse Maya was found safely, though Dr. Hendra managed to wipe part of the ambulance dispatch log leading to #01.',
};

