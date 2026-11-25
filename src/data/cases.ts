import { CASE_1 } from './case1';
import { CASE_1_EN } from './case1.en';
import { CASE_2 } from './case2';
import { CASE_2_EN } from './case2.en';
import { CASE_3 } from './case3';
import { CASE_3_EN } from './case3.en';
import { CASE_4 } from './case4';
import { CASE_4_EN } from './case4.en';
import type { CaseData } from '../types/case';
import type { Language } from '../i18n/strings';

export interface CasePreview {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  isUnlocked: boolean;
  newMechanicHint: string;
}

export const getCases = (lang: Language): CaseData[] =>
  lang === 'en'
    ? [CASE_1_EN, CASE_2_EN, CASE_3_EN, CASE_4_EN]
    : [CASE_1, CASE_2, CASE_3, CASE_4];

export const getCaseRoadmap = (lang: Language): CasePreview[] => {
  const cases = getCases(lang);
  const c1 = cases[0];
  const c2 = cases[1];
  const c3 = cases[2];
  const c4 = cases[3];

  return [
    {
      id: c1.id,
      number: 1,
      title: c1.title,
      subtitle: c1.subtitle,
      difficulty: c1.difficulty,
      isUnlocked: true,
      newMechanicHint:
        lang === 'en'
          ? 'Chats, Photo Gallery & PIN-Locked Notes'
          : 'Chat, Galeri Foto & PIN Catatan Rahasia',
    },
    {
      id: c2.id,
      number: 2,
      title: c2.title,
      subtitle: c2.subtitle,
      difficulty: c2.difficulty,
      isUnlocked: true,
      newMechanicHint:
        lang === 'en'
          ? 'Location History (Maps) & Deleted Chat Recovery'
          : 'Riwayat Lokasi (Maps) & Pemulihan Chat Terhapus',
    },
    {
      id: c3.id,
      number: 3,
      title: c3.title,
      subtitle: c3.subtitle,
      difficulty: c3.difficulty,
      isUnlocked: true,
      newMechanicHint:
        lang === 'en'
          ? 'Typing Style Analysis & Live Incoming Chat'
          : 'Analisis Gaya Ketik & Jebakan Chat Live',
    },
    {
      id: c4.id,
      number: 4,
      title: c4.title,
      subtitle: c4.subtitle,
      difficulty: c4.difficulty,
      isUnlocked: true,
      newMechanicHint:
        lang === 'en'
          ? 'New Mechanics: Browser History & Multiple Endings'
          : 'Mekanik Baru: Browser History & Multiple Endings',
    },
  ];
};
