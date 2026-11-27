import type { CaseData } from '../types/case';

export const CASE_6_EN: CaseData = {
  id: 'case-06-suara-gunung',
  number: 6,
  title: 'Voices from the Mountain',
  subtitle: 'A Documentarian Vanishes on a Midnight Foggy Ridge',
  difficulty: 'Sulit',
  ownerName: 'Bagas Pratama',
  lastSeenTime: '03:18 WIB',
  recap: {
    title: 'Previously on Last Seen...',
    points: [
      'After the Room 404 case shook the harbor, the syndicate’s laundering network shifted funds into illegal mountain logging.',
      'Bagas Pratama (23), an independent documentarian, hiked Misty Peak at night with his crew to investigate mysterious trucks entering the protected forest.',
      'At 03:18 WIB, Search & Rescue found Bagas’s phone still powered on near the Post 3 cliff edge—with no sign of Bagas.',
    ],
  },
  briefing:
    'Bagas Pratama (23) was separated from his night-hiking group at Post 3 Misty Peak at 03:18 WIB. The local guide claims Bagas panicked and ran toward the cliff after hearing "the mountain’s ghost." Inspect the remaining Voice Note, restore the deleted group chat, and find where Bagas is really hiding!',
  wallpaperGradient: 'from-slate-950 via-emerald-950 to-zinc-950',
  hints: [
    'Check the Post 3 trail sign photo in Gallery for the 4-digit elevation (MDPL) to unlock the encrypted Note.',
    'There is a deleted message in the Fog Expedition Group. Use the 1-word weather/expedition name from their group title to recover it.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-6',
    delayMs: 10000,
    senderName: 'Unknown Number',
    text: 'SAR is already at Post 3. Do not play that voice recording if you want to make it down the mountain.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-nisa',
      name: 'Nisa (Sister)',
      avatarInitials: 'NS',
      avatarColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c6-n1',
          senderName: 'Nisa',
          senderType: 'contact',
          text: 'Bagas, did you reach Post 3 yet? Heavy rain back home, be careful.',
          time: '01:55',
        },
        {
          id: 'c6-n2',
          senderName: 'Bagas Pratama',
          senderType: 'owner',
          text: 'Yeah Nis. Something’s weird tho... f█g is thick & there’s a tr█ck engine rumbling below at this hour.',
          time: '02:48',
        },
        {
          id: 'c6-n3',
          senderName: 'Bagas Pratama',
          senderType: 'owner',
          text: 'Voice Note (0:14)',
          time: '03:11',
          voiceNote: {
            duration: '0:14',
            transcript:
              '"Nis... do█n’t believe the Post 3 ghost story... they caught me filming—I’m leaving this phone behind so they can’t track my GPS—"',
            backgroundCue:
              'Background audio: diesel truck rumbling below, radio static, and Pak Yanto whispering harshly: "Chase that kid, grab his memory card before dawn!"',
          },
          clueId: 'clue6-voicenote',
          clueLabel: '03:11 Voice Note reveals Pak Yanto chased Bagas for filming illegal logging trucks',
        },
      ],
    },
    {
      id: 'chat-yanto',
      name: 'Pak Yanto (Guide)',
      avatarInitials: 'PY',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 04:10',
      messages: [
        {
          id: 'c6-y1',
          senderName: 'Pak Yanto',
          senderType: 'contact',
          text: 'Bagas, stay close to the group. Around 2 AM the north sector gets "strange voices"—never shine your flashlight down there.',
          time: '01:40',
        },
        {
          id: 'c6-y2',
          senderName: 'Pak Yanto',
          senderType: 'contact',
          text: 'I’ve briefed SAR. There were no vehicles or outsiders on the mountain tonight, the fog is too thick. Bagas must have slipped off the cliff.',
          time: '04:05',
          clueId: 'clue6-yanto-alibi',
          clueLabel: 'Pak Yanto insists no vehicles were on the mountain & Bagas fell off the cliff',
        },
      ],
    },
    {
      id: 'chat-grup-kabut',
      name: 'Fog Expedition Group',
      avatarInitials: 'EK',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      isGroup: true,
      statusText: '4 members',
      recoveryKeyword: 'FOG',
      recoveryHint: '1-word weather/expedition name from their group title',
      messages: [
        {
          id: 'c6-g1',
          senderName: 'Riko',
          senderType: 'contact',
          text: 'Guys, the fog is dropping super fast. Sinta’s leg is cramping near Post 2.',
          time: '02:15',
        },
        {
          id: 'c6-g2',
          senderName: 'Sinta',
          senderType: 'contact',
          text: 'I’m fine, keep going a bit. Wait, where’s Bagas? He walked toward the old trail earlier.',
          time: '02:30',
        },
        {
          id: 'c6-g3',
          senderName: 'Bagas Pratama',
          senderType: 'owner',
          text: 'G█ys... don’t fol█ow Yanto’s route. He’s le█ding us away so we don’t see the tr█cks below.',
          time: '02:55',
        },
      ],
      deletedMessages: [
        {
          id: 'c6-gd1',
          senderName: 'Riko',
          senderType: 'contact',
          text: 'OMG! I just saw Pak Yanto’s walkie-talkie tuned to 142.85—the exact same frequency as the logging truck drivers below! He’s paid to clear the trail tonight!',
          time: '03:04',
          clueId: 'clue6-deleted-grup',
          clueLabel: 'Riko’s deleted chat: Pak Yanto’s radio is synced with the illegal logging truck drivers',
        },
      ],
    },
    {
      id: 'chat-unknown-6',
      name: 'Unknown Number',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'unknown',
      messages: [
        {
          id: 'c6-u1',
          senderName: 'Unknown Number',
          senderType: 'contact',
          text: 'Sector 142.85 clear. The hiker with the camera has been steered toward the cliff.',
          time: '03:20',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'p6-sign',
      title: 'IMG_0312.JPG',
      timestamp: '02:10 WIB',
      location: 'Post 3 Misty Peak',
      visualType: 'trail-sign',
      caption: 'Wooden trail marker showing Post 3 elevation: 2840 MDPL, pointing toward North Cliff and Post 2 Bunker.',
    },
    {
      id: 'p6-fog',
      title: 'IMG_0319.JPG',
      timestamp: '02:44 WIB',
      location: 'Restricted Ridge',
      visualType: 'fog-silhouettes',
      caption: 'Blurry night fog photo: clearly shows two heavy truck headlights and three silhouettes logging timber in the restricted zone.',
      clueId: 'clue6-photo-fog',
      clueLabel: '02:44 photo proves illegal trucks & logging in the fog',
    },
    {
      id: 'p6-ht',
      title: 'IMG_0321.JPG',
      timestamp: '02:58 WIB',
      location: 'Post 3 Bushes',
      visualType: 'radio-ht',
      caption: 'Dropped portable walkie-talkie belonging to the guide, active on 142.85 MHz (Channel: LOG-MALAM).',
    },
  ],
  notes: [
    {
      id: 'n6-plan',
      title: 'Documentary Production Notes',
      updatedAt: 'Yesterday, 21:00',
      isLocked: false,
      content:
        'Target: expose the illegal logging truck route operating between 02:00–04:00 when mountain fog rolls in. Locals scare hikers off with the "Voices of the Mountain" ghost myth so nobody gets close.',
    },
    {
      id: 'n6-shelter',
      title: 'EMERGENCY — MY LOCATION',
      updatedAt: '03:16 WIB',
      isLocked: true,
      pinCode: '2840',
      pinHint: 'Post 3 elevation (MDPL) shown on the wooden sign in Gallery',
      content:
        'If anyone finds this phone: I deliberately dropped it near the Post 3 cliff edge so Pak Yanto thinks I fell and stops chasing me. I am alive and hiding inside the Old Bunker at Post 2 with the evidence memory card. Send SAR to Post 2 Bunker!',
      clueId: 'clue6-note-koordinat',
      clueLabel: 'Emergency note: Bagas is alive and hiding inside the Old Bunker at Post 2',
    },
  ],
  locations: [
    {
      id: 'loc6-1',
      time: '01:55 WIB',
      place: 'Post 3 Misty Peak',
      address: 'Elevation 2,840 MDPL',
      note: 'Group paused for rest before heavy fog descended.',
    },
    {
      id: 'loc6-2',
      time: '02:44 WIB',
      place: 'Restricted Sector Slope',
      address: '400m off main trail',
      note: 'Bagas left the main trail to photograph truck headlights below.',
    },
    {
      id: 'loc6-3',
      time: '03:15 WIB',
      place: 'Old Bunker Post 2 ➔ Post 3 Cliff',
      address: 'South Descent Trail',
      note: 'GPS trail moves from Old Bunker Post 2 and stops abruptly at the Post 3 cliff edge where the phone was dropped.',
      clueId: 'clue6-gps-bunker',
      clueLabel: '03:15 GPS shows Bagas reached Post 2 Bunker before dropping his phone at the cliff',
    },
  ],
  browserHistory: [
    {
      id: 'bh6-1',
      time: 'Yesterday, 22:15',
      title: 'Mystery of Missing Hikers at Misty Peak North Sector',
      url: 'berita-lokal.id/arsip/puncak-kabut',
      snippet: 'Locals claim eerie voices echo from the protected forest every night at 2 AM, blamed on mountain spirits.',
    },
    {
      id: 'bh6-2',
      time: '02:51 WIB',
      title: 'Amateur Radio Frequency Lookup 142.85 MHz',
      url: 'radio-freq.id/lookup?f=142.85',
      snippet: 'Registered as night logistics channel for PT Surya Rimba (a logging company whose permit was revoked).',
    },
  ],
  deductions: [
    {
      id: 'q6-culprit',
      question: 'Who actually trapped and chased Bagas on the mountain that night?',
      options: [
        { id: 'a', label: 'Pak Yanto (local guide) working with the illegal logging syndicate' },
        { id: 'b', label: 'Riko and Sinta out of personal jealousy' },
        { id: 'c', label: 'The mountain spirit guarding Post 3' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q6-motive',
      question: 'What were the "Voices from the Mountain" really, and why was Bagas chased?',
      options: [
        { id: 'a', label: 'Bagas hallucinated from severe hypothermia' },
        { id: 'b', label: 'Illegal logging trucks disguised by a ghost myth; Bagas filmed their operation' },
        { id: 'c', label: 'Secret military training in the protected forest' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q6-location',
      question: 'Where is Bagas right now so SAR can rescue him?',
      options: [
        { id: 'a', label: 'At the bottom of the Post 3 North Cliff' },
        { id: 'b', label: 'Alive and hiding inside the Old Bunker at Post 2' },
        { id: 'c', label: 'Already smuggled out of town on a truck' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'SPOT ON! Thanks to your analysis, the joint SAR team swept into the Old Bunker at Post 2 before dawn and rescued Bagas Pratama alive along with the memory card containing full footage of the illegal logging syndicate. Pak Yanto and PT Surya Rimba’s crew were arrested at the trailhead!',
  epiloguePartial:
    'Case partially closed. SAR uncovered the illegal truck route, but missed key deductions delayed Bagas’s rescue.',
};

