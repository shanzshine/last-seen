import type { CaseData } from '../types/case';
import type { Language } from '../i18n/strings';

export interface CasePreview {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  isUnlocked: boolean;
  atmosphere: string;
  contentWarning?: string;
  totalClues: number;
}

export const TOTAL_CASES = 10;

export const getCaseRoadmap = (lang: Language): CasePreview[] => [
  {
    id: 'case-01-kos-7',
    number: 1,
    title: lang === 'en' ? 'Boarding Room 07' : 'Kos Nomor 7',
    subtitle:
      lang === 'en'
        ? 'The Disappearance of Nadia Putri at Kos Melati'
        : 'Hilangnya Nadia Putri di Kos Melati',
    difficulty: 'Mudah',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Late-Night Dorm Mystery • Social Betrayal'
        : 'Suasana: Misteri Kos Malam • Pengkhianatan Teman',
    contentWarning:
      lang === 'en' ? 'TW: Missing person & debt pressure' : 'TW: Orang hilang & tekanan utang',
  },
  {
    id: 'case-02-meja-0214',
    number: 2,
    title: lang === 'en' ? 'Desk 02:14' : 'Meja Kerja 02.14',
    subtitle:
      lang === 'en'
        ? 'Midnight Scandal & Death at a Tech Startup'
        : 'Skandal & Kematian di Startup Tengah Malam',
    difficulty: 'Menengah',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Corporate Thriller • Silent Midnight Office'
        : 'Suasana: Thriller Korporat • Kantor Sunyi Tengah Malam',
    contentWarning:
      lang === 'en' ? 'TW: Sudden death & premeditated murder' : 'TW: Kematian & tindak pembunuhan',
  },
  {
    id: 'case-03-penumpang',
    number: 3,
    title: lang === 'en' ? 'The Last Passenger' : 'Penumpang Terakhir',
    subtitle:
      lang === 'en'
        ? 'Midnight Trap & Victim Impersonation'
        : 'Jebakan Malam & Peniruan Identitas Korban',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Midnight Highway Dread • Impersonation'
        : 'Suasana: Teror Perjalanan Malam • Peniruan Identitas',
    contentWarning:
      lang === 'en'
        ? 'TW: Kidnapping, confinement & threatening messages'
        : 'TW: Penculikan, penyekapan & pesan ancaman',
  },
  {
    id: 'case-04-grup-tanpa-nama',
    number: 4,
    title: lang === 'en' ? 'Nameless Group' : 'Grup Tanpa Nama',
    subtitle:
      lang === 'en'
        ? 'The Secret Syndicate Behind Previous Cases'
        : 'Sindikat Rahasia di Balik Kasus-Kasus Sebelumnya',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Dark Conspiracy • Psychological Pressure'
        : 'Suasana: Konspirasi Gelap • Tekanan Psikologis',
    contentWarning:
      lang === 'en'
        ? 'TW: Criminal syndicate, betrayal & coercion'
        : 'TW: Sindikat kriminal, pengkhianatan & intimidasi',
  },
  {
    id: 'case-05-kamar-404',
    number: 5,
    title: lang === 'en' ? 'Room 404' : 'Kamar 404',
    subtitle:
      lang === 'en'
        ? 'Key Witness Vanishes from a Midnight Hotel'
        : 'Hilangnya Saksi Kunci di Hotel Tengah Malam',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Claustrophobic Hotel • Midnight Harbor Chase'
        : 'Suasana: Hotel Klaustrofobik • Pengejaran Pelabuhan Malam',
    contentWarning:
      lang === 'en'
        ? 'TW: Stalking, bribery & witness abduction'
        : 'TW: Penguntitan, penyuapan & penculikan saksi',
  },
  {
    id: 'case-06-suara-gunung',
    number: 6,
    title: lang === 'en' ? 'Voices from the Mountain' : 'Suara dari Gunung',
    subtitle:
      lang === 'en'
        ? 'A Documentarian Vanishes on a Midnight Foggy Ridge'
        : 'Hilangnya Dokumentalis di Jalur Kabut Tengah Malam',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Foggy Mountain Horror • Survival Mystery'
        : 'Suasana: Horor Kabut Gunung • Misteri Survival',
    contentWarning:
      lang === 'en'
        ? 'TW: Eerie forest isolation, night chase & illegal logging'
        : 'TW: Teror hutan berkabut, pengejaran malam & isolasi',
  },
  {
    id: 'case-07-akun-kedua',
    number: 7,
    title: lang === 'en' ? 'Second Account' : 'Akun Kedua',
    subtitle:
      lang === 'en'
        ? 'An Influencer Collapses & Secrets Behind Close Friends'
        : 'Selebgram Tak Sadarkan Diri & Rahasia di Balik Close Friends',
    difficulty: 'Menengah',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Dark Social Media • Agency Conspiracy'
        : 'Suasana: Drama Gelap Pulse • Konspirasi Agensi',
    contentWarning:
      lang === 'en'
        ? 'TW: Drink spiking, betrayal & ICU hospitalization'
        : 'TW: Pembiusan, pengkhianatan & intimidasi',
  },
  {
    id: 'case-08-siaran-tengah-malam',
    number: 8,
    title: lang === 'en' ? 'Midnight Livestream' : 'Siaran Tengah Malam',
    subtitle:
      lang === 'en'
        ? 'A Ghost-Hunt Livestream Cut Off at 02:33 WIB'
        : 'Livestream Uji Nyali yang Terputus Pukul 02.33 WIB',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Urban Horror • Cut-Off Midnight Livestream'
        : 'Suasana: Horor Urban • Siaran Uji Nyali Terputus',
    contentWarning:
      lang === 'en'
        ? 'TW: Abandoned hospital isolation, pursuit & intimidation'
        : 'TW: Gedung tua terbengkalai, pengejaran & ancaman',
  },
  {
    id: 'case-09-kamar-operasi-09',
    number: 9,
    title: lang === 'en' ? 'Operating Room 09' : 'Kamar Operasi 09',
    subtitle:
      lang === 'en'
        ? 'A Night-Shift Nurse Vanishes & a Faked Death Certificate'
        : 'Hilangnya Perawat Jaga Malam & Sertifikat Kematian Palsu',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Medical Thriller • Midnight Hospital Conspiracy'
        : 'Suasana: Thriller Medis • Konspirasi RS Tengah Malam',
    contentWarning:
      lang === 'en'
        ? 'TW: Confinement, falsified death & medical conspiracy'
        : 'TW: Penyekapan, pemalsuan kematian & intimidasi',
  },
  {
    id: 'case-10-wajah-01',
    number: 10,
    title: lang === 'en' ? 'Face of #01' : 'Wajah #01',
    subtitle:
      lang === 'en'
        ? 'SEASON 1 FINALE • The Mastermind’s Own Phone Is Seized'
        : 'SEASON 1 FINALE • Ponsel Sang Dalang Utama Akhirnya Disita',
    difficulty: 'Sulit',
    isUnlocked: true,
    totalClues: 6,
    atmosphere:
      lang === 'en'
        ? 'Atmosphere: Season 1 Finale • High-Stakes Manhunt'
        : 'Suasana: Finale Season 1 • Perburuan Dalang Utama',
    contentWarning:
      lang === 'en'
        ? 'TW: Criminal mastermind pursuit & betrayal'
        : 'TW: Perburuan dalang sindikat & pengkhianatan',
  },
];

/**
 * Dynamically imports only the requested case & language bundle so the initial
 * mobile load stays fast and lightweight.
 */
export const loadCaseById = async (
  caseId: string,
  lang: Language
): Promise<CaseData | null> => {
  switch (caseId) {
    case 'case-01-kos-7':
      return lang === 'en'
        ? (await import('./case1.en')).CASE_1_EN
        : (await import('./case1')).CASE_1;
    case 'case-02-meja-0214':
      return lang === 'en'
        ? (await import('./case2.en')).CASE_2_EN
        : (await import('./case2')).CASE_2;
    case 'case-03-penumpang':
      return lang === 'en'
        ? (await import('./case3.en')).CASE_3_EN
        : (await import('./case3')).CASE_3;
    case 'case-04-grup-tanpa-nama':
      return lang === 'en'
        ? (await import('./case4.en')).CASE_4_EN
        : (await import('./case4')).CASE_4;
    case 'case-05-kamar-404':
      return lang === 'en'
        ? (await import('./case5.en')).CASE_5_EN
        : (await import('./case5')).CASE_5;
    case 'case-06-suara-gunung':
      return lang === 'en'
        ? (await import('./case6.en')).CASE_6_EN
        : (await import('./case6')).CASE_6;
    case 'case-07-akun-kedua':
      return lang === 'en'
        ? (await import('./case7.en')).CASE_7_EN
        : (await import('./case7')).CASE_7;
    case 'case-08-siaran-tengah-malam':
      return lang === 'en'
        ? (await import('./case8.en')).CASE_8_EN
        : (await import('./case8')).CASE_8;
    case 'case-09-kamar-operasi-09':
      return lang === 'en'
        ? (await import('./case9.en')).CASE_9_EN
        : (await import('./case9')).CASE_9;
    case 'case-10-wajah-01':
      return lang === 'en'
        ? (await import('./case10.en')).CASE_10_EN
        : (await import('./case10')).CASE_10;
    default:
      return null;
  }
};
