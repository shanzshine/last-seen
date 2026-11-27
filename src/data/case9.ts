import type { CaseData } from '../types/case';

export const CASE_9: CaseData = {
  id: 'case-09-kamar-operasi-09',
  number: 9,
  title: 'Kamar Operasi 09',
  subtitle: 'Hilangnya Perawat Jaga Malam & Sertifikat Kematian Palsu',
  difficulty: 'Sulit',
  ownerName: 'Maya Lestari',
  lastSeenTime: '02:47 WIB',
  recap: {
    title: 'Sebelumnya di Last Seen...',
    points: [
      'Setelah menyelamatkan Dika Mahendra di RS Tua Pelabuhan, Satgas menemukan bukti pengiriman peralatan bedah dari mobil boks sindikat menuju RS Medika Utama.',
      'Pukul 02:47 WIB, Maya Lestari (27), seorang perawat jaga malam, menghilang secara misterius di penghujung shift-nya.',
      'Ponsel Maya ditemukan tersimpan rapi di loker staf lantai 3—namun rekaman CCTV lorong Kamar Operasi 09 mendadak padam selama 40 menit malam itu.',
    ],
  },
  briefing:
    'Suster Maya Lestari (27) menghilang saat bertugas malam di RS Medika Utama pukul 02:47 WIB. Kepala Bedah bersikeras Kamar Operasi 09 kosong dan terkunci sejak jam 11 malam. Periksa Voice Note, riwayat Browser, pulihkan pesan terhapus, dan ungkap kejanggalan di balik pasien Kamar 09!',
  wallpaperGradient: 'from-slate-950 via-teal-950 to-zinc-950',
  hints: [
    'Gunakan jam terakhir Maya terlihat (format 4 digit HHMM) sebagai PIN untuk membuka Catatan darurat yang terkunci.',
    'Di chat Dr. Hendra ada pesan terhapus. Gunakan kata kunci 1 kata terkait dokumen riwayat pasien untuk memulihkannya.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-unknown-9',
    delayMs: 10000,
    senderName: 'Nomor Tidak Dikenal',
    text: 'Berkas pasien Kamar 09 sudah kami musnahkan. Kembalikan HP perawat itu ke loker sebelum shift pagi.',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-rian',
      name: 'Dr. Rian (Dokter Jaga)',
      avatarInitials: 'DR',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c9-r1',
          senderName: 'Dr. Rian',
          senderType: 'contact',
          text: 'May, jadwal malam ini harusnya nggak ada operasi darurat ya? Kok lampu Kamar Operasi 09 nyala dari luar?',
          time: '01:50',
        },
        {
          id: 'c9-r2',
          senderName: 'Maya Lestari',
          senderType: 'owner',
          text: 'Iya Dok, di papan jadwal kosong. Aku coba cek bentar ke lorong bedah ya.',
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
              '"Dok Rian... pasien yang katanya meninggal di Kamar Operasi 09 barusan jalan sendiri keluar ke parkiran ambulans! Aku sempet foto rekam medis palsunya—"',
            backgroundCue:
              'Suara latar: bunyi monitor EKG dimatikan, pintu darurat terbuka, dan suara langkah kaki bergegas di lorong steril.',
          },
          clueId: 'clue9-voicenote',
          clueLabel: 'Voice Note 02:41: pasien yang dinyatakan meninggal di Kamar 09 berjalan keluar hidup-hidup',
        },
      ],
    },
    {
      id: 'chat-hendra',
      name: 'Dr. Hendra (Kepala Bedah)',
      avatarInitials: 'DH',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 03:20',
      recoveryKeyword: 'MEDIS',
      recoveryHint: 'Kata kedua dari istilah "rekam _____" (1 kata)',
      messages: [
        {
          id: 'c9-h1',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'Maya, malam ini kamu fokus jaga di bangsal lantai 3 saja. Jangan masuk area bedah lantai 2.',
          time: '00:30',
        },
        {
          id: 'c9-h2',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'Saya sudah lapor direktur RS. Kamar Operasi 09 kosong dan terkunci rapat sejak jam 23:00, tidak ada tindakan atau pasien siapa pun malam ini.',
          time: '03:15',
          clueId: 'clue9-hendra-alibi',
          clueLabel: 'Dr. Hendra bersikeras Kamar Operasi 09 kosong & terkunci sejak 23:00',
        },
      ],
      deletedMessages: [
        {
          id: 'c9-hd1',
          senderName: 'Dr. Hendra',
          senderType: 'contact',
          text: 'Perawat Maya memergoki serah terima sertifikat kematian palsu! Segera kejar sebelum dia kirim data rekam medis itu ke luar, kunci dia di ruang arsip lantai B1!',
          time: '02:44',
          clueId: 'clue9-deleted-hendra',
          clueLabel: 'Chat terhapus Dr. Hendra: memerintahkan pengejaran Maya & menguncinya di ruang arsip B1',
        },
      ],
    },
    {
      id: 'chat-unknown-9',
      name: 'Nomor Tidak Dikenal',
      avatarInitials: '??',
      avatarColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
      statusText: 'tidak diketahui',
      messages: [
        {
          id: 'c9-u1',
          senderName: 'Nomor Tidak Dikenal',
          senderType: 'contact',
          text: 'Sertifikat kematian atas nama Budi Santoso sudah sah. Semua arsip asli dibakar.',
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
      location: 'RS Medika Utama • Lt. 3',
      caption: 'Shift malam ke-4 minggu ini. Kopi dulu sebelum keliling bangsal ☕',
      likes: 184,
      comments: [
        {
          id: 'cm9-1',
          author: '@suster.tika',
          text: 'May, tadi aku liat mobil ambulans hitam tanpa plat masuk ke basement B2 jam 1 lewat, ada pasien VVIP ya?',
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
      location: 'Koridor Ruang Bedah Lt. 2',
      visualType: 'office-cctv',
      caption: 'Foto monitor keamanan koridor lantai 2 sesaat sebelum kamera dimatikan secara manual.',
    },
  ],
  notes: [
    {
      id: 'n9-shift',
      title: 'Catatan Shift Malam',
      updatedAt: '00:15 WIB',
      isLocked: false,
      content: 'Cek stok infus bangsal 3A–3D, serah terima laporan jaga ke Suster Tika pukul 07:00 WIB.',
    },
    {
      id: 'n9-safe',
      title: 'DARURAT — BUKTI & LOKASI',
      updatedAt: '02:46 WIB',
      isLocked: true,
      pinCode: '0247',
      pinHint: 'Jam tepat saat Maya terakhir terlihat (format 4 digit HHMM)',
      content:
        'Aku dikunci dari luar di Ruang Arsip Farmasi Lantai B1! Sebelum lari, aku sempat menyelipkan HP ke loker staf lantai 3 supaya tidak dirampas. Pasien palsu itu kurir utama #01—ambulans hitam mereka langsung menuju Villa Kabut Puncak membawa koper enkripsi milik #01!',
      clueId: 'clue9-note-safe',
      clueLabel: 'Catatan darurat: Maya dikunci di Ruang Arsip B1 & ambulans menuju Villa Kabut',
    },
  ],
  locations: [
    {
      id: 'loc9-1',
      time: '02:05 WIB',
      place: 'Kamar Operasi 09',
      address: 'Lantai 2 • Zona Steril',
      note: 'Maya memeriksa ruang operasi yang lampunya menyala di luar jadwal.',
    },
    {
      id: 'loc9-2',
      time: '02:45 WIB',
      place: 'Garasi Ambulans B2 ➔ Loker Staf Lt. 3',
      address: 'RS Medika Utama',
      note: 'Maya memotret ambulans tanpa plat di B2 lalu menitipkan HP di loker sebelum turun ke ruang arsip.',
      clueId: 'clue9-gps-ambulans',
      clueLabel: 'GPS 02:45 melacak pergerakan Maya di Garasi Ambulans B2 sebelum menyembunyikan HP',
    },
  ],
  browserHistory: [
    {
      id: 'bh9-1',
      time: '02:30 WIB',
      title: 'Sistem Rekam Medis Internal — Pasien "Budi Santoso" (Kamar 09)',
      url: 'simrs.medikautama.local/patient/kamar-09',
      snippet: 'Status: Dinyatakan Meninggal (DOA) pukul 02:15 oleh Dr. Hendra. Catatan: NIK terdaftar dalam daftar buronan DPO Satgas #01.',
      clueId: 'clue9-browser-donor',
      clueLabel: 'Browser 02:30 membuktikan pasien Kamar 09 berstatus DPO sindikat #01 yang dipalsukan kematiannya',
    },
  ],
  deductions: [
    {
      id: 'q9-culprit',
      question: 'Siapa dalang di dalam rumah sakit yang memalsukan kematian pasien Kamar 09 dan menyekap Maya?',
      options: [
        { id: 'a', label: 'Dr. Hendra (Kepala Bedah) yang bekerja sama dengan sindikat #01' },
        { id: 'b', label: 'Dr. Rian (Dokter Jaga) karena kesalahan malapraktik' },
        { id: 'c', label: 'Suster Tika yang iri dengan jadwal shift Maya' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q9-motive',
      question: 'Untuk apa sindikat #01 menyewa Kamar Operasi 09 malam itu?',
      options: [
        { id: 'a', label: 'Operasi pencangkokan organ ilegal untuk dijual' },
        { id: 'b', label: 'Membuat sertifikat kematian palsu agar buronan utama sindikat #01 lolos dari kejaran' },
        { id: 'c', label: 'Pencurian obat bius rumah sakit biasa' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q9-location',
      question: 'Di mana Suster Maya berada saat ini agar tim penyelamat bisa membebaskannya?',
      options: [
        { id: 'a', label: 'Dibawa kabur di dalam ambulans hitam menuju Villa Kabut' },
        { id: 'b', label: 'Dikunci di dalam Ruang Arsip Farmasi Lantai B1' },
        { id: 'c', label: 'Bersembunyi di ruang loker staf Lantai 3' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'BERHASIL! Tim Satgas langsung mendobrak Ruang Arsip Farmasi Lantai B1 dan menyelamatkan Suster Maya Lestari tanpa luka sedikit pun! Dr. Hendra ditangkap di ruang kerjanya, sementara koordinat Villa Kabut yang dicatat Maya menjadi target penggerebekan terakhir: memburu sang dalang utama, #01 (The Broker)!',
  epiloguePartial:
    'Kasus ditutup sebagian. Suster Maya berhasil ditemukan, namun Dr. Hendra sempat menghapus sebagian daftar pengiriman ambulans menuju markas #01.',
};

