import type { CaseData } from '../types/case';

export const CASE_7_EN: CaseData = {
  id: 'case-07-akun-kedua',
  number: 7,
  title: 'Second Account',
  subtitle: 'An Influencer Collapses & Secrets Behind Close Friends',
  difficulty: 'Menengah',
  ownerName: 'Clarina Putri',
  lastSeenTime: '23:52 WIB',
  recap: {
    title: 'Previously on Last Seen...',
    points: [
      'After Bagas Pratama was rescued at Misty Peak, the Task Force traced syndicate #01’s money laundering to a major digital talent agency.',
      'Clarina Putri (24), a popular lifestyle influencer, was found unconscious in her apartment from a sedative overdose, while her work laptop vanished.',
      'Two social media accounts were logged into her phone—one polished public feed, and a hidden second account.',
    ],
  },
  briefing:
    'Clarina Putri (24) was found unconscious in her apartment at 23:52 WIB and rushed to the ICU. Police initially suspected stress-induced overdose, but her work laptop is missing. Open the Social app—inspect both her Public Profile and 2nd Account (Close Friends)—and cross-check with her chats and locked notes!',
  wallpaperGradient: 'from-zinc-950 via-rose-950 to-slate-950',
  hints: [
    'Open the Social app and switch to the "2nd Account" tab to read Clarina’s Close Friends post and spot the 4-digit PIN.',
    'There is a deleted message in Rendy (Manager)’s chat. Use the 1-word term for brand promotions (ENDORSE) to restore it.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-rendy',
    delayMs: 11000,
    senderName: 'Rendy (Manager)',
    text: 'Clarina’s phone is still online?! Do NOT open the 2nd Account tab on her Social app—that’s private agency business!',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-rendy',
      name: 'Rendy (Manager)',
      avatarInitials: 'RN',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'last seen 00:15',
      recoveryKeyword: 'ENDORSE',
      recoveryHint: '1-word term for influencer brand promotion (ENDORSE)',
      messages: [
        {
          id: 'c7-r1',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Clar, get some rest tonight. I can’t swing by your apartment—heading straight home at 6 PM.',
          time: '17:50',
        },
        {
          id: 'c7-r2',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Just heard from building security... I never went to her place tonight at all, last time I saw Clarina was 6 PM at the office.',
          time: '00:12',
          clueId: 'clue7-rendy-alibi',
          clueLabel: 'Rendy claims he last saw Clarina at 18:00 & never visited her apartment tonight',
        },
      ],
      deletedMessages: [
        {
          id: 'c7-rd1',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Don’t you dare leak those fake endorse ledgers to the public, Clar. I’m coming to your unit at 11 PM to take the laptop.',
          time: '21:40',
          clueId: 'clue7-deleted-rendy',
          clueLabel: 'Rendy’s deleted chat: threatened Clarina & said he’d come at 23:00 to take her laptop',
        },
      ],
    },
    {
      id: 'chat-vina',
      name: 'Vina (Best Friend)',
      avatarInitials: 'VN',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c7-v1',
          senderName: 'Vina',
          senderType: 'contact',
          text: 'Clar, I just saw your Close Friends post on your 2nd account... are you really going to report Rendy?',
          time: '22:18',
        },
        {
          id: 'c7-v2',
          senderName: 'Clarina Putri',
          senderType: 'owner',
          text: 'Yes Vin, I saved all the transfer proofs in Notes locked with my birthday PIN (2411).',
          time: '22:25',
        },
        {
          id: 'c7-v3',
          senderName: 'Clarina Putri',
          senderType: 'owner',
          text: 'Voice Note (0:11)',
          time: '23:44',
          voiceNote: {
            duration: '0:11',
            transcript:
              '"Vin... Rendy just left my unit with my laptop... the tea he made tastes weird, my head feels so heavy..."',
            backgroundCue:
              'Background audio: apartment door clicking shut softly, followed by Clarina’s heavy breathing before the phone drops.',
          },
          clueId: 'clue7-voicenote',
          clueLabel: '23:44 Voice Note: Clarina says Rendy just left with her laptop & her tea tastes strange',
        },
      ],
    },
  ],
  socialPosts: [
    {
      id: 'soc7-1',
      accountHandle: '@clarina.putri',
      time: '19:30 WIB',
      location: 'Senopati Residence',
      caption:
        'Late night work session with warm chamomile tea. Don’t forget to rest, everyone ✨',
      likes: 4820,
      comments: [
        {
          id: 'cm7-1',
          author: '@rendy.mgmt',
          text: 'Left your tea and sleep vitamins on the kitchen counter Clar, finish it so you sleep well.',
          time: '22:55',
        },
        {
          id: 'cm7-2',
          author: '@vina.k',
          text: 'Stay healthy babe! ❤️',
          time: '20:05',
        },
      ],
      clueId: 'clue7-social-main',
      clueLabel: 'Rendy’s comment (22:55) proves he left "sleep vitamins" on Clarina’s kitchen counter',
    },
    {
      id: 'soc7-2',
      accountHandle: '@clara.unfiltered',
      isPrivateAlt: true,
      isCloseFriends: true,
      time: '22:10 WIB',
      location: 'Close Friends Only',
      caption:
        'Just realized the fake endorse contracts over the past 6 months were used by my own manager to launder dirty money. He’s coming at 11 PM to force me to delete everything. If anything happens to me, check Notes PIN 2411.',
      likes: 3,
      comments: [
        {
          id: 'cm7-3',
          author: '@vina.k',
          text: 'Clar don’t stay alone!! Ordering a cab to your place right now!',
          time: '22:15',
        },
      ],
      clueId: 'clue7-social-alt',
      clueLabel: '2nd Account post: Clarina exposes fake endorsement money laundering by Rendy',
    },
  ],
  photos: [
    {
      id: 'p7-cafe',
      title: 'IMG_8810.JPG',
      timestamp: '16:20 WIB',
      location: 'Kopi Sudut',
      visualType: 'cafe-receipt',
      caption: 'Afternoon coffee receipt before Clarina returned to her apartment.',
    },
  ],
  notes: [
    {
      id: 'n7-vault',
      title: 'Fake Endorse Ledger Archive',
      updatedAt: '22:30 WIB',
      isLocked: true,
      pinCode: '2411',
      pinHint: '4-digit PIN mentioned by Clarina in Vina’s chat & 2nd Account post',
      content:
        'Total Rp 1.8 Billion in fake endorsement funds routed through Rendy’s agency, then transferred to the same shell accounts linked to PT Surya Rimba & #01. All original contracts are in folder "BACKUP_AG" on my laptop.',
      clueId: 'clue7-note-vault',
      clueLabel: 'Locked note reveals Rp 1.8 Billion fake endorsement trail tied to #01’s network',
    },
  ],
  browserHistory: [
    {
      id: 'bh7-1',
      time: '21:50 WIB',
      title: 'How to Report Agency Money Laundering & Whistleblower Protection',
      url: 'lapor.go.id/panduan-pelaporan',
      snippet: 'Official procedure for reporting suspicious financial transactions and whistleblower safety.',
    },
  ],
  deductions: [
    {
      id: 'q7-culprit',
      question: 'Who drugged Clarina and stole her work laptop that night?',
      options: [
        { id: 'a', label: 'Rendy (Clarina’s Manager)' },
        { id: 'b', label: 'Vina (Clarina’s Best Friend)' },
        { id: 'c', label: 'Clarina intentionally overdosed on her own' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q7-motive',
      question: 'What was the culprit’s motive for harming Clarina?',
      options: [
        { id: 'a', label: 'Jealousy over Clarina switching agencies' },
        { id: 'b', label: 'Silencing Clarina before she exposed #01’s fake endorsement laundering' },
        { id: 'c', label: 'Random apartment burglary' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q7-evidence',
      question: 'Which evidence decisively disproves Rendy’s alibi that he never visited her apartment?',
      options: [
        { id: 'a', label: 'The 16:20 coffee receipt photo' },
        { id: 'b', label: 'Rendy’s 22:55 Social comment & Clarina’s 23:44 Voice Note' },
        { id: 'c', label: 'The whistleblower browser history' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'SPOT ON! Police and the Task Force intercepted Rendy at the airport before he could wipe Clarina’s laptop. With the archive in her Notes and 2nd Account, doctors administered the right antidote in time and Clarina regained consciousness in the ICU!',
  epiloguePartial:
    'Case partially closed. Rendy was brought in for questioning, though missed evidence left parts of the money trail incomplete.',
};

