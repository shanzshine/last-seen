import type { CaseData } from '../types/case';

export const CASE_8: CaseData = {
  id: 'case-08-siaran-tengah-malam',
  number: 8,
  title: 'Siaran Tengah Malam',
  subtitle: 'Livestream Uji Nyali yang Terputus Pukul 02.33 WIB',
  difficulty: 'Sulit',
  ownerName: 'Dika Mahendra',
  lastSeenTime: '02:33 WIB',
  recap: {
    title: 'Lanjutan dari Case #07 • Sebelumnya...',
    points: [
      'Setelah kasus Akun Kedua membongkar pencucian uang agensi digital, jaringan sindikat #01 (The Broker) semakin terdesak dan terpaksa berpindah-pindah tempat persembunyian.',
      'Dika Mahendra (25), seorang konten kreator uji nyali, menggelar livestream tengah malam di Bekas RS Tua Pelabuhan tanpa tahu bahwa basemen gedung itu sedang dipakai pihak lain.',
      'Pukul 02:33 WIB, siaran langsung terputus di hadapan 14 ribu penonton. Polisi hanya menemukan HP Dika di lobi lantai 1 dengan layar retak—tanpa jejak Dika.',
    ],
  },
  briefing:
    'Dika Mahendra (25) menghilang saat melakukan livestream uji nyali di Bekas RS Tua Pelabuhan pukul 02:33 WIB. Penonton menduga ia diserang penunggu gedung tua itu, sementara penjaga gedung bersikeras gerbang digembok mati sejak jam 10 malam. Periksa postingan Sosmed, Voice Note panik Dika, pulihkan chat terhapus, dan temukan di lantai mana ia bersembunyi!',
  wallpaperGradient: 'from-zinc-950 via-red-950 to-black',
  hints: [
    'Gunakan jam persis siaran Dika terputus (format 4 digit HHMM) sebagai PIN untuk membuka Catatan Darurat.',
    'Di chat Pak Haris (Penjaga Gedung) ada pesan terhapus. Gunakan kata kunci 1 kata nama lantai bawah tanah gedung untuk memulihkannya.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-8',
    delayMs: 10000,
    senderName: 'Nomor Tidak Dikenal',
    text: 'Siaranmu sudah kami matikan. Kalau masih di dalam gedung, jangan coba-coba keluar lewat lobi.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-kiki',
      name: 'Kiki (Kru Kamera)',
      avatarInitials: 'KK',
      avatarColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c8-k1',
          senderName: 'Kiki',
          senderType: 'contact',
          text: 'Dik, aku udah standby di mobil depan gerbang ya. Sinyal di dalem RS tua jelek banget, hati-hati.',
          time: '01:45',
        },
        {
          id: 'c8-k2',
          senderName: 'Dika Mahendra',
          senderType: 'owner',
          text: 'Aman Ki, lobi kosong. Aku coba turun ke arah tangga basemen bentar buat konten.',
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
              '"Ki... di basemen bukan hantu... ada dua orang bawa koper besi turun ke ruang genset... mereka nyebut nama Broker! Aku lari ke tangga darurat—"',
            backgroundCue:
              'Suara latar: langkah sepatu bot berat berlari di koridor beton, bunyi pintu besi terbanting, lalu teriakan jauh: "Matikan sinyalnya!"',
          },
          clueId: 'clue8-voicenote',
          clueLabel: 'Voice Note 02:31 mengungkap ada dua orang bersenjata koper menyebut "Broker" di basemen',
        },
      ],
    },
    {
      id: 'chat-haris',
      name: 'Pak Haris (Penjaga Gedung)',
      avatarInitials: 'PH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 03:00',
      recoveryKeyword: 'BASEMEN',
      recoveryHint: 'Ruangan / lantai bawah tanah gedung (1 kata)',
      messages: [
        {
          id: 'c8-h1',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'Mas Dika, kalau masuk cuma buat konten di lobi aja ya, jangan turun ke bawah. Banyak kabel telanjang.',
          time: '01:10',
        },
        {
          id: 'c8-h2',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'Saya sudah bilang ke polisi, gerbang belakang digembok mati dari jam 10 malam. Mustahil ada kendaraan atau orang lain masuk ke dalam gedung.',
          time: '03:15',
          clueId: 'clue8-haris-alibi',
          clueLabel: 'Pak Haris bersikeras gerbang digembok sejak 22:00 & tidak ada orang lain di gedung',
        },
      ],
      deletedMessages: [
        {
          id: 'c8-hd1',
          senderName: 'Pak Haris',
          senderType: 'contact',
          text: 'Uang tutup mulutnya udah masuk. Gembok basemen udah saya buka buat mobil boks kalian masuk jam 2 nanti, CCTV gerbang juga udah saya matikan.',
          time: '00:55',
          clueId: 'clue8-deleted-haris',
          clueLabel: 'Chat terhapus Pak Haris: dibayar untuk membuka basemen bagi mobil boks sindikat jam 02:00',
        },
      ],
    },
    {
      id: 'chat-unknown-8',
      name: 'Nomor Tidak Dikenal',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'tidak diketahui',
      messages: [
        {
          id: 'c8-u1',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Jangan rekam sektor B.',
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
      location: 'Bekas RS Pelabuhan (Sektor B)',
      caption:
        'LIVE SEKARANG! Uji nyali sendirian di Bekas RS Tua Pelabuhan. Katanya jam 2 pagi sering ada suara langkah kaki dari ruang genset...',
      likes: 1240,
      comments: [
        {
          id: 'cm8-1',
          author: '@kiki.crew',
          text: 'Hati-hati bro, aku pantau dari mobil depan!',
          time: '01:32',
        },
        {
          id: 'cm8-2',
          author: '@anon_019',
          text: 'Woy jangan turun ke basemen B, bukan hantu yang ada di situ malem ini.',
          time: '02:05',
        },
      ],
      clueId: 'clue8-social-stream',
      clueLabel: 'Komentar @anon_019 (02:05) memperingatkan agar Dika tidak turun ke basemen B',
    },
  ],
  photos: [
    {
      id: 'p8-gate',
      title: 'IMG_0214.JPG',
      timestamp: '01:25 WIB',
      location: 'Gerbang Samping RS Tua',
      visualType: 'side-gate',
      caption: 'Foto gerbang samping gedung tua sebelum Dika masuk untuk siaran.',
    },
    {
      id: 'p8-cctv',
      title: 'IMG_0228.JPG',
      timestamp: '02:02 WIB',
      location: 'Koridor Sektor B',
      visualType: 'office-cctv',
      caption: 'Tangkapan layar kamera pengawas tua yang sempat menyala sebentar di koridor.',
    },
  ],
  notes: [
    {
      id: 'n8-gear',
      title: 'Checklist Siaran Uji Nyali',
      updatedAt: '01:05 WIB',
      isLocked: false,
      content:
        'Powerbank 20.000mAh, gimbal, mic wireless. Jangan lupa matikan flash kalau baterai udah kritis biar nggak gampang kelihatan.',
    },
    {
      id: 'n8-hide',
      title: 'DARURAT — TEMPAT SEMBUNYI',
      updatedAt: '02:32 WIB',
      isLocked: true,
      pinCode: '0233',
      pinHint: 'Jam tepat saat siaran livestream terputus (format 4 digit HHMM)',
      content:
        'HP-ku retak dan sinyal diblokir dari lobi. Aku sengaja menjatuhkan HP ini di dekat pintu lobi biar mereka kira aku udah kabur keluar. Aku masih di dalam gedung, mengunci diri di Lantai 3 Ruang Arsip! Mobil boks hitam mereka parkir di Basemen B.',
      clueId: 'clue8-note-hide',
      clueLabel: 'Catatan darurat: Dika masih hidup & mengunci diri di Lantai 3 Ruang Arsip',
    },
  ],
  locations: [
    {
      id: 'loc8-1',
      time: '01:45 WIB',
      place: 'Lobi Utama RS Tua Pelabuhan',
      address: 'Sektor B • Lantai 1',
      note: 'Titik awal siaran langsung Dika dimulai.',
    },
    {
      id: 'loc8-2',
      time: '02:30 WIB',
      place: 'Ruang Genset Basemen B',
      address: 'Lantai B1 • Akses Mobil Boks',
      note: 'Sinyal GPS Dika sempat tercatat di Basemen B sebelum bergerak cepat naik ke tangga darurat.',
      clueId: 'clue8-gps-basemen',
      clueLabel: 'GPS 02:30 membuktikan Dika turun ke Ruang Genset Basemen B sebelum lari ke atas',
    },
  ],
  browserHistory: [
    {
      id: 'bh8-1',
      time: '00:40 WIB',
      title: 'Sejarah Bekas RS Pelabuhan Sektor B (Tutup 2012)',
      url: 'arsip-kota.id/rs-pelabuhan',
      snippet: 'Gedung 3 lantai dengan akses basemen langsung tembus ke jalan belakang dermaga.',
    },
  ],
  deductions: [
    {
      id: 'q8-culprit',
      question: 'Siapa yang sebenarnya berada di Basemen B malam itu dan siapa orang dalamnya?',
      options: [
        { id: 'a', label: 'Anggota sindikat #01 (The Broker), dibantu Pak Haris sang penjaga gedung' },
        { id: 'b', label: 'Kiki (kru kamera) yang sengaja menjebak Dika demi views' },
        { id: 'c', label: 'Sosok penunggu gaib RS Tua Pelabuhan' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q8-motive',
      question: 'Kenapa siaran langsung Dika dihentikan secara paksa pukul 02:33 WIB?',
      options: [
        { id: 'a', label: 'Karena baterai kamera Dika habis secara alami' },
        { id: 'b', label: 'Dika memergoki markas transit & koper sindikat #01 di Basemen B' },
        { id: 'c', label: 'Gedung sedang dalam proses pembongkaran malam' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q8-location',
      question: 'Di mana tim penyelamat harus menjemput Dika saat ini?',
      options: [
        { id: 'a', label: 'Di dalam mobil Kiki di depan gerbang' },
        { id: 'b', label: 'Di Ruang Genset Basemen B' },
        { id: 'c', label: 'Mengunci diri di Lantai 3 Ruang Arsip' },
      ],
      correctOptionId: 'c',
    },
  ],
  epilogueSuccess:
    'TEPAT WAKTU! Tim taktis Satgas langsung mengepung akses belakang Basemen B dan menyelamatkan Dika Mahendra dari Lantai 3 Ruang Arsip dalam keadaan selamat. Dari mobil boks yang disita di basemen, Satgas akhirnya menemukan petunjuk lokasi medis rahasia milik sindikat #01!',
  epiloguePartial:
    'Kasus ditutup sebagian. Dika berhasil ditemukan, namun anggota sindikat di basemen sempat kabur sebelum mobil boksnya berhasil dicegat.',
};

