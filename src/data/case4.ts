import type { CaseData } from '../types/case';

export const CASE_4: CaseData = {
  id: 'case-04-grup-tanpa-nama',
  number: 4,
  title: 'Grup Tanpa Nama',
  subtitle: 'Sindikat Rahasia di Balik Kasus-Kasus Sebelumnya',
  difficulty: 'Sulit',
  ownerName: 'Anonim (#09)',
  lastSeenTime: '03:11 WIB',
  briefing:
    'Sebuah kloningan HP tanpa nama pemilik dikirimkan secara anonim ke mejamu. Semua kontaknya memakai kode angka, namun percakapannya menyebut Kos Melati, Proyek Helios, hingga insiden Tol Cikunir. Periksa Browser History, pulihkan chat terhapus, buka Catatan rahasia, dan pilih dengan hati-hati kepada siapa bukti ini dikirim.',
  wallpaperGradient: 'from-zinc-900 via-neutral-950 to-emerald-950',
  hints: [
    'Buka aplikasi Browser untuk menemukan kode loker 4 digit sebagai PIN Catatan rahasia, lalu cek kata kunci penghapusan log di Grup #00.',
    'Baca Catatan rahasia dan artikel berita di Browser sebelum menentukan kepada siapa laporan polisi harus dikirim.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-broker',
    delayMs: 9000,
    senderName: '#01 (The Broker)',
    text: 'Kami tahu kloningan #09 sudah berpindah tangan. Jangan salah memilih siapa yang kamu percaya.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-grup00',
      name: 'Grup #00 (Arsip)',
      avatarInitials: '00',
      avatarColor: 'bg-zinc-800 text-zinc-200 border-zinc-700',
      isGroup: true,
      statusText: '#01, #04, #09',
      unreadCount: 2,
      messages: [
        {
          id: 'c4-g1',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Proyek Helios sudah ditutup. Masalah di Kos Melati juga sudah dibereskan agar tidak merembet ke penadah kita.',
          time: '01:05',
          clueId: 'clue4-cross-case',
          clueLabel: 'Grup #00 menghubungkan Proyek Helios, Kos Melati, dan sindikat penadah',
        },
        {
          id: 'c4-g2',
          senderName: '#04',
          senderType: 'contact',
          text: 'Bagaimana dengan insiden supir B 2841 KJL di Kemang? Polisi mulai melacak kameranya.',
          time: '01:12',
        },
        {
          id: 'c4-g3',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Aman. Orang dalam kita, Komisaris H, sudah menahan berkasnya. Bersihkan semua chat pribadi pakai kode: BROKER01.',
          time: '01:18',
          clueId: 'clue4-insider-h',
          clueLabel: 'Orang dalam bernama Komisaris H melindungi sindikat dari penyelidikan',
        },
      ],
    },
    {
      id: 'chat-broker',
      name: '#01 (The Broker)',
      avatarInitials: '01',
      avatarColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      statusText: 'terenkripsi',
      unreadCount: 1,
      recoveryKeyword: 'BROKER01',
      recoveryHint: 'Masukkan kode pembersihan log yang disebut oleh #01 di Grup #00.',
      messages: [
        {
          id: 'c4-b1',
          senderName: 'Anonim (#09)',
          senderType: 'owner',
          text: 'Saya tidak mau ikut lagi kalau sudah sampai menghilangkan nyawa orang seperti Bima.',
          time: '02:02',
        },
        {
          id: 'c4-b2',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Terlambat untuk mundur, #09. Kamu sudah tahu terlalu banyak.',
          time: '02:08',
        },
      ],
      deletedMessages: [
        {
          id: 'c4-bd1',
          senderName: '#01 (The Broker)',
          senderType: 'contact',
          text: 'Pertemuan darurat besok pukul 23:00 di Pelabuhan Sunda Kelapa Gudang 4. Bawa kunci server.',
          time: '02:15',
          clueId: 'clue4-warehouse',
          clueLabel: 'Chat terhapus mengungkap markas pertemuan sindikat di Gudang 4 Sunda Kelapa',
        },
      ],
    },
  ],
  photos: [
    {
      id: 'photo4-vault',
      title: 'IMG_LOKER_7709.jpg',
      timestamp: 'Kemarin • 23:40',
      location: 'Stasiun Kota',
      visualType: 'room-key',
      caption: 'Foto lama barang bukti loker penyimpanan.',
    },
  ],
  notes: [
    {
      id: 'note4-codes',
      title: 'Daftar Kode Anggota',
      updatedAt: 'Kemarin, 22:00',
      isLocked: false,
      content:
        '• #01 = The Broker (Pengendali Operasi)\n• #04 = Koordinator Lapangan & Kurir\n• #09 = Saya (Penjaga Server)\n• Pelindung Internal = Komisaris Hendro',
    },
    {
      id: 'note4-warning',
      title: '🔒 Peringatan Darurat (Baca Sebelum Lapor)',
      updatedAt: 'Hari ini, 02:55',
      isLocked: true,
      pinCode: '7709',
      pinHint: '4 digit nomor loker dari portal vault di Browser History.',
      content:
        'Kalau HP ini sampai ke meja analis forensik, JANGAN kirim laporan ke Komisaris Hendro! Dia menerima setoran dari #01.\n\nKirim semua bukti langsung ke Satgas Siber Independen agar markas Gudang 4 bisa langsung digerebek tanpa kebocoran.',
      clueId: 'clue4-secret-note',
      clueLabel: 'Catatan #09 memperingatkan agar melapor ke Satgas Siber Independen, bukan Komisaris Hendro',
    },
  ],
  browserHistory: [
    {
      id: 'bh-1',
      time: '01:12 WIB',
      title: 'Peta Dermaga & Gudang Lama',
      url: 'maps.local/sunda-kelapa-4',
      snippet: 'Rute akses malam menuju Pelabuhan Sunda Kelapa Gudang 4.',
    },
    {
      id: 'bh-2',
      time: '01:45 WIB',
      title: 'Vault Internal — Login #09',
      url: 'vault-internal.onion/login',
      snippet: 'Portal Broker #01 • Kode Akses Loker Darurat: 7709.',
      clueId: 'clue4-browser-vault',
      clueLabel: 'Browser History mencatat kode akses loker darurat: 7709',
    },
    {
      id: 'bh-3',
      time: '02:30 WIB',
      title: 'Berita: Mutasi Mendadak Pejabat Pengawasan',
      url: 'berita.id/komisaris-hendro-pengawasan',
      snippet: 'Komisaris Hendro memegang kendali penuh atas laporan kasus siber dan keuangan.',
      clueId: 'clue4-browser-news',
      clueLabel: 'Berita mengungkap Komisaris Hendro mengendalikan laporan kasus siber',
    },
  ],
  deductions: [
    {
      id: 'c4-q1',
      question: 'Siapa pengendali utama sindikat di balik Kasus 1, 2, dan 3?',
      options: [
        { id: 'broker', label: '#01 (The Broker)' },
        { id: 'kurir', label: '#04 (Koordinator Lapangan)' },
        { id: 'server', label: '#09 (Penjaga Server)' },
      ],
      correctOptionId: 'broker',
    },
    {
      id: 'c4-q2',
      question: 'Di mana markas pertemuan darurat sindikat berikutnya?',
      options: [
        { id: 'cikunir', label: 'Rest Area KM 19 Tol Cikampek' },
        { id: 'sunda-kelapa', label: 'Pelabuhan Sunda Kelapa Gudang 4' },
        { id: 'kos', label: 'Kos Melati Kamar 07' },
      ],
      correctOptionId: 'sunda-kelapa',
    },
    {
      id: 'c4-q3',
      question: 'Kepada siapa seluruh berkas bukti ini harus dikirim?',
      options: [
        { id: 'satgas', label: 'Satgas Siber Independen' },
        { id: 'hendro', label: 'Komisaris Hendro (Divisi Pengawasan)' },
      ],
      correctOptionId: 'satgas',
    },
  ],
  customEpilogues: {
    hendro:
      '⚠️ ENDING BURUK (KEBOCORAN!): Begitu laporanmu masuk ke meja Komisaris Hendro, seluruh log bukti langsung dihapus secara paksa dari server! Satgas gagal menggerebek Gudang 4, dan layar HP di depanmu berkedip pesan baru dari #01: "Terima kasih sudah melapor ke orang kami."',
  },
  epilogueSuccess:
    '✅ TRUE ENDING: Satgas Siber Independen langsung menggerebek Gudang 4 Sunda Kelapa dan meringkus Komisaris Hendro beserta belasan anggota sindikat! Namun #01 (The Broker) berhasil lolos di detik terakhir, meninggalkan satu pesan singkat di sistemmu: "Permainan baru saja dimulai." (Bersambung ke kasus-kasus berikutnya!)',
  epiloguePartial:
    'Laporanmu diterima oleh Satgas, namun karena ada detail deduksi yang meleset, penggerebekan Gudang 4 terlambat dilakukan dan sebagian anggota sindikat berhasil kabur.',
};

