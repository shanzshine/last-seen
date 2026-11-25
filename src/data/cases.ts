import { CASE_1 } from './case1';
import { CASE_2 } from './case2';
import type { CaseData } from '../types/case';

export interface CasePreview {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  isUnlocked: boolean;
  newMechanicHint: string;
}

export const ALL_CASES: CaseData[] = [CASE_1, CASE_2];

export const CASE_ROADMAP: CasePreview[] = [
  {
    id: CASE_1.id,
    number: 1,
    title: CASE_1.title,
    subtitle: CASE_1.subtitle,
    difficulty: CASE_1.difficulty,
    isUnlocked: true,
    newMechanicHint: 'Chat, Galeri Foto & PIN Catatan Rahasia',
  },
  {
    id: CASE_2.id,
    number: 2,
    title: CASE_2.title,
    subtitle: CASE_2.subtitle,
    difficulty: CASE_2.difficulty,
    isUnlocked: true,
    newMechanicHint: 'Mekanik Baru: Riwayat Lokasi (Maps) & Pemulihan Chat Terhapus',
  },
  {
    id: 'case-03-penumpang',
    number: 3,
    title: 'Penumpang Terakhir',
    subtitle: 'Jebakan Malam & Peniruan Identitas Korban',
    difficulty: 'Sulit',
    isUnlocked: false,
    newMechanicHint: 'Segera Hadir: Analisis Gaya Ketik & Jebakan Chat Live',
  },
];
