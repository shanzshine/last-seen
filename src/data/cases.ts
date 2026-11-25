import { CASE_1 } from './case1';
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

export const ALL_CASES: CaseData[] = [CASE_1];

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
    id: 'case-02-meja-0214',
    number: 2,
    title: 'Meja Kerja 02.14',
    subtitle: 'Skandal & Kematian di Startup Tengah Malam',
    difficulty: 'Menengah',
    isUnlocked: false,
    newMechanicHint: 'Segera Hadir: Riwayat Lokasi (Maps) & Pemulihan Chat Terhapus',
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
