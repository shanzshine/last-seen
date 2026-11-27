import type { CaseData } from '../types/case';

export const CASE_6: CaseData = {
  id: 'case-06-suara-gunung',
  number: 6,
  title: 'Suara dari Gunung',
  subtitle: 'Hilangnya Dokumentalis di Jalur Kabut Tengah Malam',
  difficulty: 'Sulit',
  ownerName: 'Bagas Pratama',
  lastSeenTime: '03:18 WIB',
  recap: {
    title: 'Lanjutan dari Case #05 • Sebelumnya...',
    points: [
      'Setelah kasus Kamar 404 mengguncang pelabuhan, jaringan pencucian uang sindikat mulai mengalihkan aset ke sektor pembalakan liar di pegunungan.',
      'Bagas Pratama (23), seorang dokumentalis independen, mendaki malam ke Puncak Kabut bersama timnya untuk menyelidiki truk-truk misterius yang masuk hutan lindung.',
      'Pukul 03:18 WIB, HP Bagas ditemukan tim SAR di tepi jurang Pos 3 dalam kondisi menyala—tanpa jejak Bagas.',
    ],
  },
  briefing:
    'Bagas Pratama (23) terpisah dari rombongan pendakian malam di Pos 3 Puncak Kabut pukul 03:18 WIB. Pemandu lokal mengaku Bagas lari ke arah jurang karena ketakutan mendengar "suara penunggu gunung". Periksa Voice Note yang tersisa, pulihkan chat grup yang terhapus, dan temukan di mana Bagas sebenarnya bersembunyi!',
  wallpaperGradient: 'from-slate-950 via-emerald-950 to-zinc-950',
  hints: [
    'Cek foto plang Pos 3 di Galeri untuk melihat angka ketinggian (MDPL) 4 digit sebagai PIN Catatan terkunci.',
    'Di Grup Ekspedisi Kabut ada pesan terhapus. Gunakan kata kunci 1 kata nama jalur/ekspedisi mereka untuk memulihkannya.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-6',
    delayMs: 10000,
    senderName: 'Nomor Tidak Dikenal',
    text: 'Tim SAR sudah di Pos 3. Jangan putar rekaman suara itu kalau masih mau turun gunung dengan selamat.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-nisa',
      name: 'Nisa (Adik)',
      avatarInitials: 'NS',
      avatarColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c6-n1',
          senderName: 'Nisa',
          senderType: 'contact',
          text: 'Mas Bagas udah sampai Pos 3? Di rumah hujan deras, hati-hati ya.',
          time: '01:55',
        },
        {
          id: 'c6-n2',
          senderName: 'Bagas Pratama',
          senderType: 'owner',
          text: 'Udah Nis. Tapi aneh bgt... kabutnya tebel & di bawah ada suara mesin truk jam segini.',
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
              '"Nis... jangan percaya cerita hantu Pos 3... aku kepergok ngerekam mereka—HP ini bakal kutinggal biar nggak ketahuan GPS—"',
            backgroundCue:
              'Suara latar: deru mesin truk diesel di kejauhan, bunyi statis HT, dan suara Pak Yanto berbisik keras: "Kejar anak itu, ambil memory card-nya sebelum fajar!"',
          },
          clueId: 'clue6-voicenote',
          clueLabel: 'Voice Note 03:11 mengungkap Pak Yanto mengejar Bagas karena merekam truk ilegal',
        },
      ],
    },
    {
      id: 'chat-yanto',
      name: 'Pak Yanto (Pemandu)',
      avatarInitials: 'PY',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 04:10',
      messages: [
        {
          id: 'c6-y1',
          senderName: 'Pak Yanto',
          senderType: 'contact',
          text: 'Mas Bagas jangan jauh-jauh dari rombongan. Jam 2 malam ini sektor utara sering ada "suara aneh", jangan sekali-kali disorot senter.',
          time: '01:40',
        },
        {
          id: 'c6-y2',
          senderName: 'Pak Yanto',
          senderType: 'contact',
          text: 'Saya sudah lapor tim SAR. Tidak ada kendaraan atau orang lain di gunung malam ini, kabutnya terlalu tebal. Bagas pasti terpeleset ke jurang.',
          time: '04:05',
          clueId: 'clue6-yanto-alibi',
          clueLabel: 'Pak Yanto bersikeras tidak ada kendaraan di gunung & Bagas jatuh ke jurang',
        },
      ],
    },
    {
      id: 'chat-grup-kabut',
      name: 'Grup Ekspedisi Kabut',
      avatarInitials: 'EK',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      isGroup: true,
      statusText: '4 anggota',
      recoveryKeyword: 'KABUT',
      recoveryHint: 'Nama ekspedisi / puncak jalur mereka (1 kata)',
      messages: [
        {
          id: 'c6-g1',
          senderName: 'Riko',
          senderType: 'contact',
          text: 'Guys, kabutnya turun cepet banget. Sinta kakinya kram di dekat Pos 2.',
          time: '02:15',
        },
        {
          id: 'c6-g2',
          senderName: 'Sinta',
          senderType: 'contact',
          text: 'Aku nggak apa-apa, lanjut aja dikit lagi. Eh Bagas ke mana? Tadi dia jalan ke arah jalur lama.',
          time: '02:30',
        },
        {
          id: 'c6-g3',
          senderName: 'Bagas Pratama',
          senderType: 'owner',
          text: 'Guys... jangan ikutin jalur Yanto. Dia ngarahin kita menjauh biar truk di bawah nggak kelihatan.',
          time: '02:55',
        },
      ],
      deletedMessages: [
        {
          id: 'c6-gd1',
          senderName: 'Riko',
          senderType: 'contact',
          text: 'ASTAGA! Gue baru liat HT-nya Pak Yanto nyala frekuensi 142.85 sama persis kayak sopir truk kayu di bawah! Dia dibayar buat nutupin jalur malam ini!',
          time: '03:04',
          clueId: 'clue6-deleted-grup',
          clueLabel: 'Chat terhapus Riko: HT Pak Yanto terhubung langsung ke sopir truk kayu ilegal',
        },
      ],
    },
    {
      id: 'chat-unknown-6',
      name: 'Nomor Tidak Dikenal',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'tidak diketahui',
      messages: [
        {
          id: 'c6-u1',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Sektor 142.85 bersih. Pendaki yang bawa kamera sudah diarahkan ke jurang.',
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
      location: 'Pos 3 Puncak Kabut',
      visualType: 'trail-sign',
      caption: 'Plang kayu penunjuk ketinggian Pos 3: 2840 MDPL. Menunjukkan arah ke Jurang Utara dan Bunker Pos 2.',
    },
    {
      id: 'p6-fog',
      title: 'IMG_0319.JPG',
      timestamp: '02:44 WIB',
      location: 'Lereng Sektor Terlarang',
      visualType: 'fog-silhouettes',
      caption: 'Foto buram malam berkabut: terlihat jelas dua sorot lampu truk besar dan tiga siluet orang menebang kayu di jalur terlarang.',
      clueId: 'clue6-photo-fog',
      clueLabel: 'Foto 02:44 membuktikan ada truk & penebangan ilegal di balik kabut',
    },
    {
      id: 'p6-ht',
      title: 'IMG_0321.JPG',
      timestamp: '02:58 WIB',
      location: 'Semak Pos 3',
      visualType: 'radio-ht',
      caption: 'Foto handy talky yang terjatuh milik pemandu, menyala di frekuensi 142.85 MHz (Channel: LOG-MALAM).',
    },
  ],
  notes: [
    {
      id: 'n6-plan',
      title: 'Catatan Produksi Dokumenter',
      updatedAt: 'Kemarin, 21:00',
      isLocked: false,
      content:
        'Target liputan: membongkar rute truk kayu ilegal yang selalu beroperasi pukul 02.00–04.00 saat kabut gunung turun. Penduduk lokal menakut-nakuti pendaki dengan mitos "Suara Penunggu Gunung" agar tidak ada yang mendekat.',
    },
    {
      id: 'n6-shelter',
      title: 'DARURAT — LOKASIKU',
      updatedAt: '03:16 WIB',
      isLocked: true,
      pinCode: '2840',
      pinHint: 'Ketinggian Pos 3 (MDPL) pada plang foto di Galeri',
      content:
        'Kalau ada yang menemukan HP ini: aku sengaja menjatuhkan HP di dekat jurang Pos 3 supaya Pak Yanto mengira aku jatuh dan berhenti mengejar. Aku masih hidup dan bersembunyi di dalam Bunker Tua Pos 2 sambil memegang memory card bukti. Tolong kirim tim SAR ke Bunker Pos 2!',
      clueId: 'clue6-note-koordinat',
      clueLabel: 'Catatan darurat: Bagas masih hidup bersembunyi di Bunker Tua Pos 2',
    },
  ],
  locations: [
    {
      id: 'loc6-1',
      time: '01:55 WIB',
      place: 'Pos 3 Puncak Kabut',
      address: 'Ketinggian 2.840 MDPL',
      note: 'Rombongan berhenti istirahat sebelum kabut pekat turun.',
    },
    {
      id: 'loc6-2',
      time: '02:44 WIB',
      place: 'Lereng Sektor Terlarang',
      address: '400m dari jalur utama',
      note: 'Bagas keluar jalur untuk memotret sorot lampu truk di bawah.',
    },
    {
      id: 'loc6-3',
      time: '03:15 WIB',
      place: 'Bunker Tua Pos 2 ➔ Jurang Pos 3',
      address: 'Jalur Turun Sektor Selatan',
      note: 'Jejak GPS bergerak dari Bunker Tua Pos 2 lalu berhenti mendadak di tepi jurang Pos 3 saat HP dilempar.',
      clueId: 'clue6-gps-bunker',
      clueLabel: 'GPS 03:15 menunjukkan Bagas sempat ke Bunker Pos 2 sebelum HP-nya ditinggal di jurang',
    },
  ],
  browserHistory: [
    {
      id: 'bh6-1',
      time: 'Kemarin, 22:15',
      title: 'Misteri Hilangnya Pendaki Sektor Utara Puncak Kabut',
      url: 'berita-lokal.id/arsip/puncak-kabut',
      snippet: 'Warga menyebut setiap pukul 2 dini hari terdengar suara aneh dari hutan lindung yang dipercaya sebagai penunggu gunung.',
    },
    {
      id: 'bh6-2',
      time: '02:51 WIB',
      title: 'Cek Frekuensi Radio Amatir 142.85 MHz',
      url: 'radio-freq.id/lookup?f=142.85',
      snippet: 'Terdaftar sebagai kanal komunikasi logistik malam PT Surya Rimba (perusahaan penebangan yang izinnya dicabut).',
    },
  ],
  deductions: [
    {
      id: 'q6-culprit',
      question: 'Siapa yang sebenarnya menjebak dan mengejar Bagas di gunung malam itu?',
      options: [
        { id: 'a', label: 'Pak Yanto (pemandu lokal) yang bekerja sama dengan sindikat kayu ilegal' },
        { id: 'b', label: 'Riko dan Sinta karena dendam pribadi' },
        { id: 'c', label: 'Makhluk halus penunggu Pos 3 Puncak Kabut' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q6-motive',
      question: 'Apa arti sebenarnya dari "Suara dari Gunung" dan alasan Bagas dikejar?',
      options: [
        { id: 'a', label: 'Bagas tersesat sendiri karena hipotermia berat' },
        { id: 'b', label: 'Suara truk pembalakan liar yang disamarkan mitos hantu; Bagas merekam bukti mereka' },
        { id: 'c', label: 'Latihan militer rahasia di hutan lindung' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q6-location',
      question: 'Di mana posisi Bagas sebenarnya saat ini agar tim SAR bisa menyelamatkannya?',
      options: [
        { id: 'a', label: 'Sudah jatuh ke dasar Jurang Utara Pos 3' },
        { id: 'b', label: 'Bersembunyi hidup-hidup di Bunker Tua Pos 2' },
        { id: 'c', label: 'Sudah dibawa kabur dengan truk ke kota' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'TEPAT SEKALI! Berkat analisismu, tim SAR gabungan langsung bergerak ke Bunker Tua Pos 2 sebelum fajar dan menemukan Bagas Pratama dalam keadaan selamat bersama memory card berisi rekaman lengkap sindikat pembalakan liar. Pak Yanto dan jaringan PT Surya Rimba langsung diringkus di kaki gunung!',
  epiloguePartial:
    'Kasus ditutup sebagian. Tim SAR menemukan jalur truk ilegal, namun beberapa titik deduksi masih meleset sehingga proses penyelamatan Bagas sempat tertunda.',
};

