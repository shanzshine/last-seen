import type { CaseData } from '../types/case';

export const CASE_5: CaseData = {
  id: 'case-05-kamar-404',
  number: 5,
  title: 'Kamar 404',
  subtitle: 'Hilangnya Saksi Kunci di Hotel Tengah Malam',
  difficulty: 'Sulit',
  ownerName: 'Reza Mahendra',
  lastSeenTime: '01:22 WIB',
  recap: {
    title: 'Sebelumnya di Last Seen...',
    points: [
      'Satgas Siber Independen menggerebek Gudang 4 Sunda Kelapa dan meringkus Komisaris Hendro.',
      'Namun dalang utama #01 (The Broker) berhasil kabur di detik terakhir.',
      'Reza Mahendra, satu-satunya saksi yang sempat melihat wajah asli #01, diamankan di Hotel Senja Kamar 404—hingga malam ini ia ikut menghilang.',
    ],
  },
  briefing:
    'Reza Mahendra (28), saksi kunci yang melihat wajah #01 (The Broker), menghilang dari Hotel Senja Kamar 404 pukul 01:22 WIB. Rekaman CCTV lobi sengaja dihapus. Putar Voice Note terakhir Reza, periksa Browser History untuk log kunci hotel, dan cegat pelakunya sebelum mereka berlayar!',
  wallpaperGradient: 'from-slate-900 via-zinc-950 to-amber-950',
  hints: [
    'Putar Voice Note di chat Agent Tari (Satgas) untuk mendengar suara latar yang menyebut lokasi pelabuhan, lalu gunakan 1 kata nama pelabuhan itu untuk memulihkan chat terhapus.',
    'Buka Browser History untuk melihat jam persis Master Key membuka Kamar 404 (format HHMM) sebagai PIN Catatan terkunci.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-5',
    delayMs: 9000,
    senderName: 'Nomor Tidak Dikenal',
    text: 'Kamu telat lagi, analis. Saksi kuncimu sebentar lagi naik kapal.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-tari',
      name: 'Agent Tari (Satgas)',
      avatarInitials: 'TR',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c5-t1',
          senderName: 'Agent Tari',
          senderType: 'contact',
          text: 'Mas Reza, tetap di Kamar 404 ya. Yang tahu nomor kamar cuma saya dan Fajar (resepsionis malam) untuk keamanan.',
          time: '23:10',
        },
        {
          id: 'c5-t2',
          senderName: 'Reza Mahendra',
          senderType: 'owner',
          text: 'Siap Mbak Tari. Pintu udah saya kunci ganda dari dalam.',
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
              '"Mbak Tari, ada yang ketok pintu ngaku petugas hotel... eh kok langsung kebuka dari luar?! Tolong—"',
            backgroundCue:
              'Suara latar: bunyi gesekan kartu Master Key, lalu suara pria berbisik: "Bawa ke Dermaga 2 Muara Baru, kapal berangkat jam 3!"',
          },
          clueId: 'clue5-voicenote',
          clueLabel: 'Voice Note 01:19 mengungkap pelaku membawa Reza ke Dermaga 2 Muara Baru',
        },
      ],
    },
    {
      id: 'chat-fajar',
      name: 'Fajar (Resepsionis Hotel)',
      avatarInitials: 'FJ',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 01:30',
      messages: [
        {
          id: 'c5-f1',
          senderName: 'Fajar',
          senderType: 'contact',
          text: 'Malam Pak Reza, kalau butuh air mineral atau selimut tambahan kabari aja ya.',
          time: '23:45',
        },
        {
          id: 'c5-f2',
          senderName: 'Fajar',
          senderType: 'contact',
          text: 'Pak Reza? Tadi saya di meja resepsionis terus nggak pernah naik ke lantai 4 kok.',
          time: '02:05',
          clueId: 'clue5-fajar-alibi',
          clueLabel: 'Fajar mengaku tidak pernah naik ke lantai 4 malam itu',
        },
      ],
    },
    {
      id: 'chat-unknown-5',
      name: 'Nomor Tidak Dikenal',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-700/40 text-zinc-200 border-zinc-600/40',
      statusText: 'tersembunyi',
      recoveryKeyword: 'MUARA',
      recoveryHint: 'Masukkan 1 kata nama pelabuhan yang terdengar di suara latar Voice Note.',
      messages: [
        {
          id: 'c5-u1',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Pastikan saksi 404 tidak sempat membuat sketsa wajah ke Satgas.',
          time: '00:55',
        },
      ],
      deletedMessages: [
        {
          id: 'c5-ud1',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Uang muka 50 juta sudah ditransfer ke Fajar. Dia akan buka Kamar 404 pakai Master Key.',
          time: '01:04',
          clueId: 'clue5-bribe',
          clueLabel: 'Chat terhapus mengungkap Fajar disuap Rp 50 juta untuk membuka Kamar 404',
        },
        {
          id: 'c5-ud2',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Bawa dia ke Dermaga 2 Pelabuhan Muara Baru sebelum kapal jam 03:00 berangkat.',
          time: '01:21',
          clueId: 'clue5-dock',
          clueLabel: 'Target dibawa ke Dermaga 2 Pelabuhan Muara Baru sebelum pukul 03:00',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'photo5-cctv',
      title: 'LOBBY_HOTEL_SENJA.jpg',
      timestamp: 'Hari ini • 01:15',
      location: 'Hotel Senja',
      visualType: 'office-cctv',
      caption: 'Notifikasi akses lift lantai 4.',
    },
  ],
  notes: [
    {
      id: 'note5-wajah',
      title: 'Ciri Wajah #01 (Sunda Kelapa)',
      updatedAt: 'Kemarin, 22:30',
      isLocked: false,
      content:
        '• Pria, tinggi sekitar 175cm\n• Luka bakar kecil di pelipis kiri\n• Memakai jam tangan perak\n• Harus segera dibuatkan sketsa resmi bersama Mbak Tari besok pagi.',
    },
    {
      id: 'note5-backup',
      title: '🔒 Cadangan Sketsa & Kecurigaan',
      updatedAt: 'Hari ini, 01:08',
      isLocked: true,
      pinCode: '0118',
      pinHint: '4 digit (HHMM) jam pintu Kamar 404 dibuka oleh Master Key. Cek Browser History.',
      content:
        'Resepsionis shift malam (Fajar) dari tadi bolak-balik teleponan sambil melirik ke arah lift lantai 4.\nKalau terjadi sesuatu sama aku, sketsa wajah #01 sudah aku kirim ke brankas cloud Satgas dengan kode: SENJA-404.',
      clueId: 'clue5-secret-note',
      clueLabel: 'Catatan terkunci mengonfirmasi gerak-gerik mencurigakan Fajar & backup sketsa #01',
    },
  ],
  browserHistory: [
    {
      id: 'c5-bh1',
      time: '01:18 WIB',
      title: 'Hotel Senja — Smart Lock Audit Log',
      url: 'hotelsystem.local/keycard-404',
      snippet: 'Pintu Kamar 404 dibuka dari luar menggunakan Master Key #08 (Fajar) pukul 01:18 WIB.',
      clueId: 'clue5-masterkey',
      clueLabel: 'Log Smart Lock membuktikan Master Key #08 milik Fajar membuka Kamar 404 pukul 01:18',
    },
    {
      id: 'c5-bh2',
      time: '01:20 WIB',
      title: 'Jadwal Keberangkatan Kapal Kargo Malam',
      url: 'pelabuhan-info.id/muara-baru',
      snippet: 'Dermaga 2 Pelabuhan Muara Baru • Keberangkatan kapal tujuan Batam pukul 03:00 WIB.',
    },
  ],
  deductions: [
    {
      id: 'c5-q1',
      question: 'Siapa orang dalam hotel yang membukakan pintu Kamar 404 untuk sindikat?',
      options: [
        { id: 'fajar', label: 'Fajar (Resepsionis Shift Malam)' },
        { id: 'tari', label: 'Agent Tari (Satgas)' },
        { id: 'kurir', label: 'Petugas Parkir Hotel' },
      ],
      correctOptionId: 'fajar',
    },
    {
      id: 'c5-q2',
      question: 'Petunjuk apa dari Voice Note Reza yang mengungkap tujuan pelarian pelaku?',
      options: [
        { id: 'stasiun', label: 'Suara pengumuman kereta di Stasiun Gambir' },
        { id: 'muara', label: 'Bisikan yang menyebut Dermaga 2 Muara Baru, kapal jam 3' },
        { id: 'tol', label: 'Suara gerbang tol Bekasi' },
      ],
      correctOptionId: 'muara',
    },
    {
      id: 'c5-q3',
      question: 'Di mana Satgas harus segera mencegat pelaku sebelum pukul 03:00 WIB?',
      options: [
        { id: 'sunda-kelapa', label: 'Gudang 4 Sunda Kelapa' },
        { id: 'muara-baru', label: 'Dermaga 2 Pelabuhan Muara Baru' },
        { id: 'hotel', label: 'Lobby Hotel Senja' },
      ],
      correctOptionId: 'muara-baru',
    },
  ],
  epilogueSuccess:
    'Satgas Siber bergerak cepat menuju Dermaga 2 Pelabuhan Muara Baru tepat 15 menit sebelum kapal berangkat! Reza berhasil diselamatkan, Fajar ditangkap di hotel dengan bukti transfer Rp 50 juta, dan sketsa wajah #01 akhirnya resmi dirilis ke seluruh unit.',
  epiloguePartial:
    'Laporanmu membantu melacak jejak Fajar, namun keterlambatan mengidentifikasi Dermaga 2 membuat kapal sempat bergerak menjauh sebelum tim pantai berhasil mencegatnya.',
};

