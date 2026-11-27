import type { CaseData } from '../types/case';

export const CASE_7: CaseData = {
  id: 'case-07-akun-kedua',
  number: 7,
  title: 'Akun Kedua',
  subtitle: 'Selebgram Tak Sadarkan Diri & Rahasia di Balik Close Friends',
  difficulty: 'Menengah',
  ownerName: 'Clarina Putri',
  lastSeenTime: '23:52 WIB',
  recap: {
    title: 'Lanjutan dari Case #06 • Sebelumnya...',
    points: [
      'Setelah Bagas Pratama diselamatkan di Puncak Kabut, Satgas menemukan aliran dana sindikat #01 juga mengalir lewat agensi digital & endorsement fiktif di ibu kota.',
      'Clarina Putri (24), seorang selebgram populer, ditemukan tak sadarkan diri di apartemennya akibat dosis obat tidur berlebih, sementara laptop kerjanya raib.',
      'Di HP Clarina terpasang dua akun media sosial—satu akun publik yang sempurna, dan satu akun kedua yang hanya diikuti segelintir orang.',
    ],
  },
  briefing:
    'Clarina Putri (24) ditemukan tak sadarkan diri di apartemennya pukul 23:52 WIB dan kini dirawat di ICU. Polisi awalnya menduga overdosis akibat stres, tetapi laptop kerjanya hilang. Buka aplikasi Sosmed—periksa Akun Utama dan Akun Kedua (Close Friends)—lalu cocokkan dengan chat dan catatan terkunci!',
  wallpaperGradient: 'from-zinc-950 via-rose-950 to-slate-950',
  hints: [
    'Buka aplikasi Sosmed lalu pindah ke tab "Akun Kedua" untuk membaca curhatan Close Friends Clarina dan melihat angka kode PIN 4 digit.',
    'Di chat Rendy (Manajer) ada pesan terhapus. Gunakan kata kunci 1 kata terkait kerja sama iklan Clarina untuk memulihkannya.',
  ],
  totalClues: 6,
  liveAlert: {
    threadId: 'chat-rendy',
    delayMs: 11000,
    senderName: 'Rendy (Manajer)',
    text: 'HP Clarina masih aktif?! Tolong jangan buka tab Akun Kedua di Sosmed itu urusan pribadi agensi!',
    time: 'LIVE',
  },
  chats: [
    {
      id: 'chat-rendy',
      name: 'Rendy (Manajer)',
      avatarInitials: 'RN',
      avatarColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      statusText: 'terakhir dilihat 00:15',
      recoveryKeyword: 'ENDORSE',
      recoveryHint: 'Istilah kerja sama promosi selebgram/brand (1 kata)',
      messages: [
        {
          id: 'c7-r1',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Clar, nanti malam istirahat aja ya. Aku nggak bisa mampir ke apartemen, jam 6 sore ini langsung pulang ke rumah.',
          time: '17:50',
        },
        {
          id: 'c7-r2',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Duh baru denger kabar dari satpam apartemen... aku nggak ke sana sama sekali malam ini kok, terakhir ketemu Clarina ya jam 6 sore di kantor.',
          time: '00:12',
          clueId: 'clue7-rendy-alibi',
          clueLabel: 'Rendy mengaku terakhir bertemu Clarina jam 18:00 & tidak ke apartemen malam itu',
        },
      ],
      deletedMessages: [
        {
          id: 'c7-rd1',
          senderName: 'Rendy',
          senderType: 'contact',
          text: 'Jangan berani-berani bongkar pembukuan endorse fiktif itu ke publik, Clar. Jam 11 malam ini aku ke unitmu ambil laptopnya.',
          time: '21:40',
          clueId: 'clue7-deleted-rendy',
          clueLabel: 'Chat terhapus Rendy: mengancam Clarina & akan datang ke unit jam 23:00 ambil laptop',
        },
      ],
    },
    {
      id: 'chat-vina',
      name: 'Vina (Sahabat)',
      avatarInitials: 'VN',
      avatarColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      statusText: 'online',
      unreadCount: 1,
      messages: [
        {
          id: 'c7-v1',
          senderName: 'Vina',
          senderType: 'contact',
          text: 'Clar, barusan aku baca postingan Close Friends kamu di akun kedua... kamu beneran mau laporin Rendy?',
          time: '22:18',
        },
        {
          id: 'c7-v2',
          senderName: 'Clarina Putri',
          senderType: 'owner',
          text: 'Iya Vin, semua bukti transfer udah kusimpan di Catatan pakai PIN tanggal lahirku (2411).',
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
              '"Vin... Rendy barusan keluar dari unitku bawa laptopku... teh yang dia bikinin rasanya aneh, kepalaku berat banget..."',
            backgroundCue:
              'Suara latar: bunyi pintu apartemen ditutup pelan dan suara napas berat Clarina sebelum ponsel terjatuh.',
          },
          clueId: 'clue7-voicenote',
          clueLabel: 'Voice Note 23:44: Clarina menyebut Rendy baru keluar bawa laptop & tehnya terasa aneh',
        },
      ],
    },
  ],
  socialPosts: [
    {
      id: 'soc7-1',
      accountHandle: '@clarina.putri',
      time: '19:30 WIB',
      location: 'Apartemen Senopati',
      caption:
        'Late night work session ditemani teh chamomile hangat. Jangan lupa istirahat ya kalian ✨',
      likes: 4820,
      comments: [
        {
          id: 'cm7-1',
          author: '@rendy.mgmt',
          text: 'Teh sama vitamin tidurnya udah aku taruh di meja dapur ya Clar, habisin biar nyenyak.',
          time: '22:55',
        },
        {
          id: 'cm7-2',
          author: '@vina.k',
          text: 'Sehat-sehat terus sayangku! ❤️',
          time: '20:05',
        },
      ],
      clueId: 'clue7-social-main',
      clueLabel: 'Komentar Rendy (22:55) membuktikan ia menaruh "vitamin tidur" di meja dapur Clarina',
    },
    {
      id: 'soc7-2',
      accountHandle: '@clara.unfiltered',
      isPrivateAlt: true,
      isCloseFriends: true,
      time: '22:10 WIB',
      location: 'Close Friends Only',
      caption:
        'Baru sadar kontrak endorse fiktif selama 6 bulan ini ternyata dipakai manajerku sendiri buat nyuci uang kotor. Jam 11 nanti dia mau datang maksa aku hapus semuanya. Kalau besok aku kenapa-kenapa, cek Catatan PIN 2411.',
      likes: 3,
      comments: [
        {
          id: 'cm7-3',
          author: '@vina.k',
          text: 'Clar jangan sendirian!! Aku langsung pesen taksi ke apartemenmu sekarang!',
          time: '22:15',
        },
      ],
      clueId: 'clue7-social-alt',
      clueLabel: 'Postingan Akun Kedua: Clarina mengungkap pencucian uang endorse fiktif oleh Rendy',
    },
  ],
  photos: [
    {
      id: 'p7-cafe',
      title: 'IMG_8810.JPG',
      timestamp: '16:20 WIB',
      location: 'Kopi Sudut',
      visualType: 'cafe-receipt',
      caption: 'Foto struk pertemuan sore Clarina sebelum pulang ke apartemen.',
    },
  ],
  notes: [
    {
      id: 'n7-vault',
      title: 'Arsip Rekening Endorse Fiktif',
      updatedAt: '22:30 WIB',
      isLocked: true,
      pinCode: '2411',
      pinHint: 'PIN 4 digit disebut Clarina di chat Vina & postingan Akun Kedua',
      content:
        'Total Rp 1,8 Miliar dana endorse fiktif masuk lewat agensi Rendy, lalu ditransfer ke rekening bayangan yang sama dengan kasus PT Surya Rimba & #01. Semua file kontrak asli ada di folder "BACKUP_AG" laptopku.',
      clueId: 'clue7-note-vault',
      clueLabel: 'Catatan terkunci mengungkap aliran Rp 1,8 Miliar endorse fiktif ke jaringan #01',
    },
  ],
  browserHistory: [
    {
      id: 'bh7-1',
      time: '21:50 WIB',
      title: 'Cara Melaporkan Pencucian Uang Agensi ke OJK & Polisi',
      url: 'lapor.go.id/panduan-pelaporan',
      snippet: 'Prosedur pelaporan transaksi mencurigakan dan perlindungan pelapor (whistleblower).',
    },
  ],
  deductions: [
    {
      id: 'q7-culprit',
      question: 'Siapa yang membius Clarina dan mengambil laptop kerjanya malam itu?',
      options: [
        { id: 'a', label: 'Rendy (Manajer Clarina)' },
        { id: 'b', label: 'Vina (Sahabat Clarina)' },
        { id: 'c', label: 'Clarina sengaja overdosis sendiri' },
      ],
      correctOptionId: 'a',
    },
    {
      id: 'q7-motive',
      question: 'Apa motif pelaku mencelakai Clarina?',
      options: [
        { id: 'a', label: 'Cemburu karena Clarina pindah agensi' },
        { id: 'b', label: 'Membungkam Clarina yang mau membongkar pencucian uang endorse fiktif sindikat #01' },
        { id: 'c', label: 'Pencurian barang mewah biasa di apartemen' },
      ],
      correctOptionId: 'b',
    },
    {
      id: 'q7-evidence',
      question: 'Bukti mana yang paling telak mematahkan alibi Rendy bahwa ia tidak ke apartemen?',
      options: [
        { id: 'a', label: 'Foto struk kopi jam 16:20 WIB' },
        { id: 'b', label: 'Komentar Rendy jam 22:55 di Sosmed & Voice Note Clarina jam 23:44' },
        { id: 'c', label: 'Riwayat browser tentang OJK' },
      ],
      correctOptionId: 'b',
    },
  ],
  epilogueSuccess:
    'AKURAT! Polisi dan tim Satgas langsung menangkap Rendy di bandara sebelum ia sempat memusnahkan laptop Clarina. Berkat arsip di Catatan dan Akun Kedua Clarina, tim medis berhasil memberi penawar tepat waktu dan Clarina mulai sadar di ICU!',
  epiloguePartial:
    'Kasus ditutup sebagian. Rendy berhasil diamankan untuk pemeriksaan, tetapi beberapa bukti utama belum sempat terhubung sempurna.',
};

