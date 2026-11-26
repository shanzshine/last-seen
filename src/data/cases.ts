import { CASE_1 } from './case1';
import { CASE_1_EN } from './case1.en';
import { CASE_2 } from './case2';
import { CASE_2_EN } from './case2.en';
import { CASE_3 } from './case3';
import { CASE_3_EN } from './case3.en';
import { CASE_4 } from './case4';
import { CASE_4_EN } from './case4.en';
import { CASE_5 } from './case5';
import { CASE_5_EN } from './case5.en';
import { CASE_6 } from './case6';
import { CASE_6_EN } from './case6.en';
import { CASE_7 } from './case7';
import { CASE_7_EN } from './case7.en';
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
}

export const getCases = (lang: Language): CaseData[] =>
  lang === 'en'
    ? [CASE_1_EN, CASE_2_EN, CASE_3_EN, CASE_4_EN, CASE_5_EN, CASE_6_EN, CASE_7_EN]
    : [CASE_1, CASE_2, CASE_3, CASE_4, CASE_5, CASE_6, CASE_7];

export const getCaseRoadmap = (lang: Language): CasePreview[] => {
  const cases = getCases(lang);
  const c1 = cases[0];
  const c2 = cases[1];
  const c3 = cases[2];
  const c4 = cases[3];
  const c5 = cases[4];
  const c6 = cases[5];
  const c7 = cases[6];

  return [
    {
      id: c1.id,
      number: 1,
      title: c1.title,
      subtitle: c1.subtitle,
      difficulty: c1.difficulty,
      isUnlocked: true,
      atmosphere:
        lang === 'en'
          ? 'Atmosphere: Late-Night Dorm Mystery • Social Betrayal'
          : 'Suasana: Misteri Kos Malam • Pengkhianatan Teman',
      contentWarning:
        lang === 'en'
          ? 'TW: Missing person & debt pressure'
          : 'TW: Orang hilang & tekanan utang',
    },
    {
      id: c2.id,
      number: 2,
      title: c2.title,
      subtitle: c2.subtitle,
      difficulty: c2.difficulty,
      isUnlocked: true,
      atmosphere:
        lang === 'en'
          ? 'Atmosphere: Corporate Thriller • Silent Midnight Office'
          : 'Suasana: Thriller Korporat • Kantor Sunyi Tengah Malam',
      contentWarning:
        lang === 'en'
          ? 'TW: Sudden death & premeditated murder'
          : 'TW: Kematian & tindak pembunuhan',
    },
    {
      id: c3.id,
      number: 3,
      title: c3.title,
      subtitle: c3.subtitle,
      difficulty: c3.difficulty,
      isUnlocked: true,
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
      id: c4.id,
      number: 4,
      title: c4.title,
      subtitle: c4.subtitle,
      difficulty: c4.difficulty,
      isUnlocked: true,
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
      id: c5.id,
      number: 5,
      title: c5.title,
      subtitle: c5.subtitle,
      difficulty: c5.difficulty,
      isUnlocked: true,
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
      id: c6.id,
      number: 6,
      title: c6.title,
      subtitle: c6.subtitle,
      difficulty: c6.difficulty,
      isUnlocked: true,
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
      id: c7.id,
      number: 7,
      title: c7.title,
      subtitle: c7.subtitle,
      difficulty: c7.difficulty,
      isUnlocked: true,
      atmosphere:
        lang === 'en'
          ? 'Atmosphere: Dark Social Media • Agency Conspiracy'
          : 'Suasana: Drama Gelap Sosmed • Konspirasi Agensi',
      contentWarning:
        lang === 'en'
          ? 'TW: Drink spiking, betrayal & ICU hospitalization'
          : 'TW: Pembiusan, pengkhianatan & intimidasi',
    },
  ];
};
