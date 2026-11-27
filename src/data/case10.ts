import type { CaseData } from '../types/case';

export const CASE_10: CaseData = {
  id: 'case-10-wajah-01',
  number: 10,
  title: 'Wajah #01',
  subtitle: 'SEASON 1 FINALE • Ponsel Sang Dalang Utama Akhirnya Disita',
  difficulty: 'Sulit',
  ownerName: '#01 (The Broker)',
  lastSeenTime: '04:05 WIB',
  recap: {
    title: 'Lanjutan dari Case #09 • Sebelumnya...',
    points: [
      'Dari Kos Melati, Proyek Helios, hingga Kamar Operasi 09—seluruh benang merah kejahatan mengarah pada satu sosok bayangan: #01 (The Broker).',
      'Berkat catatan darurat Suster Maya, tim taktis Satgas menggerebek Villa Kabut Puncak sebelum fajar.',
      'Sosok #01 sempat kabur lewat jalur belakang saat penggerebekan—namun ponsel utamanya tertinggal di atas meja kerja dengan baterai tersisa 4%. Inilah kesempatan terakhir menangkapnya.',
    ],
  },
  briefing:
    'FINAL SEASON 1: Ponsel milik #01 (The Broker) sendiri berhasil disita Satgas dari Villa Kabut pukul 04:05 WIB! Bongkar identitas asli #01, pulihkan pesan rahasianya, buka brankas Catatan berisi daftar seluruh jaringan sindikat, dan cegat pelariannya sebelum ia menyeberang keluar negeri!',
  wallpaperGradient: 'from-zinc-950 via-red-950 to-black',
  hints: [
    'Gunakan jam terakhir ponsel #01 aktif (format 4 digit HHMM) sebagai PIN untuk membuka Catatan Ledger Utama.',
    'Di chat #02 (Operasional) ada pesan terhapus. Gunakan kata kunci 1 kata nama villa markas penggerebekan mereka untuk memulihkannya.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-02',
    delayMs: 10000,
    senderName: '#02 (Operasional)',
    text: 'Bos, tim Satgas udah jebol gerbang Villa Kabut! Perahu cepat di dermaga sudah siap, tinggal tunggu Bapak!',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-02',
      name: '#02 (Operasional)',
      avatarInitials: '02',
      avatarColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      statusText: 'online',
      unreadCount: 1,
      recoveryKeyword: 'KABUT',
      recoveryHint: 'Nama villa markas penggerebekan mereka (1 kata: Villa _____)',
      messages: [
        {
          id: 'c10-2a',
          senderName: '#02',
          senderType: 'contact',
          text: 'Bos, ambulans hitam dari RS Medika baru tiba bawa koper enkripsi. Mau ditaruh di ruang server?',
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
              '"Bakar semua server di Villa Kabut sekarang! Aku pakai rute umpan ke Bandara Soekarno-Hatta di sistem, padahal aku langsung ke Dermaga Nelayan Merak naik perahu cepat!"',
            backgroundCue:
              'Suara latar: bunyi sirine kejauhan, kertas dibakar, dan suara mesin mobil SUV melaju kencang di jalan basah.',
          },
          clueId: 'clue10-voicenote',
          clueLabel: 'Voice Note 03:58: #01 kabur ke Dermaga Nelayan Merak, Bandara hanya umpan',
        },
      ],
      deletedMessages: [
        {
          id: 'c10-2d1',
          senderName: '#01 (The Broker)',
          senderType: 'owner',
          text: 'Siapkan paspor baru atas nama asliku: Ardian Kusuma. Semua dana cadangan sudah kupindahkan ke rekening offshore sebelum kita tinggalkan Villa Kabut.',
          time: '03:46',
          clueId: 'clue10-deleted-identity',
          clueLabel: 'Chat terhapus #01 mengungkap identitas aslinya: Ardian Kusuma',
        },
      ],
    },
    {
      id: 'chat-komisaris',
      name: 'Komisaris H (Arsip)',
      avatarInitials: 'KH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 01:18',
      messages: [
        {
          id: 'c10-k1',
          senderName: 'Komisaris H',
          senderType: 'contact',
          text: 'Grup #00 sudah ketahuan Satgas. Saya tidak bisa menahan berkas Proyek Helios lebih lama lagi.',
          time: '01:15',
        },
        {
          id: 'c10-k2',
          senderName: '#01 (The Broker)',
          senderType: 'owner',
          text: 'Tenang, semua pion dari Kos Melati sampai RS Medika sudah kubuang. Mereka tidak akan pernah tahu wajahku.',
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
      location: 'Villa Kabut • Puncak',
      caption:
        'Hendro, Dr. Hendra, Yanto, sampai Rendy hanyalah bidak catur. Selama identitas Ardian Kusuma tetap terkubur di balik layar, Satgas hanya mengejar bayangan.',
      likes: 2,
      comments: [
        {
          id: 'cm10-1',
          author: '@ops.02',
          text: 'Semua jalur laut sudah bersih sesuai arahan, Pak.',
          time: '03:43',
        },
      ],
      clueId: 'clue10-social-alt',
      clueLabel: 'Postingan @broker.private menegaskan semua pelaku sebelumnya adalah bidak Ardian Kusuma',
    },
  ],
  photos: [
    {
      id: 'p10-helios',
      title: 'SCAN_HELIOS_FINAL.JPG',
      timestamp: '03:20 WIB',
      location: 'Villa Kabut',
      visualType: 'audit-transfer',
      isPuzzle: true,
      caption: 'Dokumen final aliran dana Proyek Helios Rp 4 Miliar yang terhubung ke rekening #01.',
    },
  ],
  callLogs: [
    {
      id: 'call10-1',
      callerName: 'Dermaga Merak Charter',
      phoneNumber: '+62 813-9001-4410',
      type: 'outgoing',
      time: '03:58 WIB',
      duration: '2:15',
      note: 'Konfirmasi sewa speedboat darurat pukul 05:00 WIB dari Dermaga Eksekutif Merak.',
    },
    {
      id: 'call10-2',
      callerName: 'Komisaris H',
      phoneNumber: '+62 811-0029-881',
      type: 'incoming',
      time: '04:02 WIB',
      duration: '0:31',
      voicemailTranscript:
        '"Ardian, tim Satgas sudah mengepung Villa Kabut. Segera bakar semua berkas dan bergerak ke Merak sekarang!"',
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
      passwordHint: 'Kunci enkripsi server offshore yang tertulis di Catatan Ledger Utama #01',
      content:
        'ARSIP PEMINDAHAN DANA SINDIKAT\nPemilik Utama: Ardian Kusuma (#01)\nTujuan Pelarian: Dermaga Eksekutif Merak -> Speedboat 05:00 WIB\nRekening Tujuan: Cayman Holding #884-XK',
    },
    {
      id: 'file10-passport',
      filename: 'PASPOR_DARURAT_ARDIAN.pdf',
      fileType: 'pdf',
      size: '620 KB',
      date: '03:45 WIB',
      content:
        'Permohonan Paspor Ekspres atas nama samaran: A. Wijaya (Foto: Ardian Kusuma). Status: Siap diambil di Merak.',
    },
  ],
  notes: [
    {
      id: 'n10-ledger',
      title: 'LEDGER UTAMA SINDIKAT #01',
      updatedAt: '04:01 WIB',
      isLocked: true,
      pinCode: '0405',
      pinHint: 'Jam tepat saat ponsel #01 terakhir aktif (format 4 digit HHMM)',
      content:
        'Daftar lengkap jaringan Ardian Kusuma (#01 / mantan jaksa): 1) Kos Melati & Taksi Kemang (pencucian tunai), 2) Proyek Helios & Hendro (dana korporasi), 3) PT Surya Rimba & Agensi Rendy (ekspansi ilegal), 4) RS Medika Kamar 09 (penghapusan jejak). Kunci enkripsi server offshore: KUSUMA-01.',
      clueId: 'clue10-note-ledger',
      clueLabel: 'Ledger Utama membuktikan Ardian Kusuma (mantan jaksa) adalah dalang seluruh kasus 1–9',
    },
  ],
  locations: [
    {
      id: 'loc10-1',
      time: '03:40 WIB',
      place: 'Villa Kabut Puncak',
      address: 'Markas Utama #01',
      note: 'Lokasi penggerebekan Satgas.',
    },
    {
      id: 'loc10-2',
      time: '04:02 WIB',
      place: 'Jalur Tikus ➔ Dermaga Nelayan Merak',
      address: 'Banten • Akses Perahu Cepat',
      note: 'GPS mobil pelarian #01 terdeteksi menuju Dermaga Nelayan Merak (bukan bandara).',
      clueId: 'clue10-gps-merak',
      clueLabel: 'GPS 04:02 mengonfirmasi pelarian #01 menuju Dermaga Nelayan Merak',
    },
  ],
  browserHistory: [
    {
      id: 'bh10-1',
      time: '03:50 WIB',
      title: 'Pemesanan Paspor Darurat & Jadwal Speedboat Merak',
      url: 'dark-transit.onion/booking/ardian-kusuma',
      snippet: 'Penumpang: Ardian Kusuma. Keberangkatan perahu cepat pukul 04:45 WIB dari Dermaga Nelayan Merak menuju perairan internasional.',
      clueId: 'clue10-browser-passport',
      clueLabel: 'Browser 03:50 mencatat pemesanan speedboat Merak pukul 04:45 atas nama Ardian Kusuma',
    },
  ],
  deductions: [
    {
      id: 'q10-identity',
      question: 'Siapakah identitas asli di balik sosok misterius #01 (The Broker)?',
      options: [
        { id: 'a', label: 'Ardian Kusuma, mantan jaksa yang mengendalikan seluruh jaringan sindikat' },
        { id: 'b', label: 'Komisaris Hendro yang memalsukan kematiannya' },
        { id: 'c', label: 'Bima Pratama dari NusaTech' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q10-escape',
      question: 'Lewat mana #01 sebenarnya mencoba melarikan diri agar Satgas bisa mencegatnya?',
      options: [
        { id: 'a', label: 'Bandara Internasional Soekarno-Hatta' },
        { id: 'b', label: 'Dermaga Nelayan Merak menggunakan perahu cepat pukul 04:45 WIB' },
        { id: 'c', label: 'Pelabuhan Muara Baru dengan kapal kargo' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q10-network',
      question: 'Apa peran para pelaku dari Case #1 hingga Case #9 bagi #01?',
      options: [
        { id: 'a', label: 'Kejahatan acak yang tidak saling berhubungan sama sekali' },
        { id: 'b', label: 'Pion pengalih perhatian & simpul pencucian uang dalam satu jaringan terpusat #01' },
        { id: 'c', label: 'Anggota Satgas yang menyamar' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'KASUS DITUTUP SEMPURNA — SEASON 1 TAMAT! Berkat analisismu dari Kasus #1 hingga #10, tim laut Satgas langsung mengepung Dermaga Nelayan Merak pukul 04:35 WIB—sepuluh menit sebelum perahu cepat bertolak—dan memborgol Ardian Kusuma (#01 / The Broker)! Seluruh jaringan sindikat resmi runtuh. Terima kasih telah bermain, Analis!',
  epiloguePartial:
    'SEASON 1 SELESAI (SEBAGIAN). Ardian Kusuma berhasil diamankan di Merak, namun beberapa simpul bukti di Ledger Utama masih perlu ditelusuri lebih lanjut.',
};

