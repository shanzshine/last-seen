export type Language = 'id' | 'en';

export const UI_STRINGS: Record<
  Language,
  {
    statusTag: string;
    heroDesc: string;
    caseListTitle: string;
    autoSaved: string;
    startCase: string;
    continueCase: string;
    locked: string;
    solvedBadge: string;
    backToDesk: string;
    ownerLabel: string;
    evidenceBtn: string;
    solveCaseBtn: string;
    briefingTitle: string;
    evidenceBoardTitle: string;
    evidenceEmpty: string;
    tipsLabel: string;
    tipsText: string;
    phoneCloned: string;
    appMessages: string;
    appGallery: string;
    appNotes: string;
    reportBtn: string;
    homeScreen: string;
    toastClue: string;
    toastUnlock: string;
  }
> = {
  id: {
    statusTag: 'terakhir dilihat pukul 01:47',
    heroDesc:
      'Selamat datang di Meja Kerja Forensik Digital. Periksa kloningan HP barang bukti, cocokkan kebohongan antar-chat, buka catatan terkunci, dan pecahkan misterinya.',
    caseListTitle: 'Daftar Kasus',
    autoSaved: 'Progres tersimpan otomatis',
    startCase: 'Mulai Investigasi',
    continueCase: 'Lanjutkan',
    locked: 'Terkunci',
    solvedBadge: 'Selesai',
    backToDesk: 'Meja Kerja',
    ownerLabel: 'Pemilik HP',
    evidenceBtn: 'Bukti',
    solveCaseBtn: 'Selesaikan Kasus',
    briefingTitle: 'Briefing Kasus',
    evidenceBoardTitle: 'Papan Bukti',
    evidenceEmpty:
      'Belum ada bukti yang dicatat. Saat membaca pesan, foto, atau catatan mencurigakan, klik Catat Bukti untuk menyimpannya di sini.',
    tipsLabel: 'Tips Investigasi:',
    tipsText:
      'Periksa semua chat, cocokkan waktu di foto Galeri, dan temukan PIN untuk membuka Catatan yang terkunci.',
    phoneCloned: 'Perangkat Kloning',
    appMessages: 'Pesan',
    appGallery: 'Galeri',
    appNotes: 'Catatan',
    reportBtn: 'Laporkan & Pecahkan Kasus',
    homeScreen: 'Layar Utama',
    toastClue: 'Bukti baru dicatat ke Papan Bukti!',
    toastUnlock: 'Catatan rahasia berhasil dibuka!',
  },
  en: {
    statusTag: 'last seen at 01:47',
    heroDesc:
      'Welcome to the Digital Forensics Desk. Inspect cloned evidence phones, spot lies across chats, unlock hidden notes, and crack the case.',
    caseListTitle: 'Case Files',
    autoSaved: 'Progress auto-saved',
    startCase: 'Start Investigation',
    continueCase: 'Continue',
    locked: 'Locked',
    solvedBadge: 'Solved',
    backToDesk: 'Case Desk',
    ownerLabel: 'Device Owner',
    evidenceBtn: 'Clues',
    solveCaseBtn: 'Solve Case',
    briefingTitle: 'Case Briefing',
    evidenceBoardTitle: 'Evidence Board',
    evidenceEmpty:
      'No clues recorded yet. Tap "Catat Bukti" on suspicious messages, photos, or notes to pin them here.',
    tipsLabel: 'Investigation Tip:',
    tipsText:
      'Check all chats, cross-reference timestamps in Gallery photos, and find the PIN to unlock hidden Notes.',
    phoneCloned: 'Cloned Device',
    appMessages: 'Messages',
    appGallery: 'Gallery',
    appNotes: 'Notes',
    reportBtn: 'Submit Investigation Report',
    homeScreen: 'Home Screen',
    toastClue: 'New clue pinned to Evidence Board!',
    toastUnlock: 'Locked note unlocked!',
  },
};

