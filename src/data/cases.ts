import { CASE_1 } from './case1';
import { CASE_1_EN } from './case1.en';
import { CASE_2 } from './case2';
import { CASE_2_EN } from './case2.en';
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
  lang === 'en' ? [CASE_1_EN, CASE_2_EN] : [CASE_1, CASE_2];

export const getCaseRoadmap = (lang: Language): CasePreview[] => {
  const cases = getCases(lang);
  const c1 = cases[0];
  const c2 = cases[1];

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
          ? 'New Mechanics: Location History (Maps) & Deleted Chat Recovery'
          : 'Mekanik Baru: Riwayat Lokasi (Maps) & Pemulihan Chat Terhapus',
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
      isUnlocked: false,
      newMechanicHint:
        lang === 'en'
          ? 'Coming Soon: Typing Style Analysis & Live Chat Traps'
          : 'Segera Hadir: Analisis Gaya Ketik & Jebakan Chat Live',
    },
  ];
};
