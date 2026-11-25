import React from 'react';
import type { PhotoEvidence } from '../types/case';
import {
  BadgeCheck,
  Coffee,
  FileSpreadsheet,
  KeyRound,
  LockOpen,
  ShieldAlert,
  Ticket,
  Train,
} from 'lucide-react';

interface PhotoVisualProps {
  visualType: PhotoEvidence['visualType'];
  compact?: boolean;
}

const REAL_PHOTO_MAP: Partial<Record<PhotoEvidence['visualType'], { file: string; alt: string }>> = {
  'room-key': { file: 'images/room-key.jpg', alt: 'Foto gantungan kunci Kamar 07' },
  'cafe-receipt': { file: 'images/cafe-receipt.jpg', alt: 'Foto struk Kopi Sudut' },
  'side-gate': { file: 'images/side-gate.jpg', alt: 'Foto gembok gudang belakang rusak' },
};

export const PhotoVisual: React.FC<PhotoVisualProps> = ({ visualType, compact = false }) => {
  const realPhoto = REAL_PHOTO_MAP[visualType];
  if (realPhoto) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${realPhoto.file}`}
        alt={realPhoto.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  if (visualType === 'room-key') {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-zinc-950 p-4 text-amber-100">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#fbbf24_1px,_transparent_1px)] [background-size:14px_14px]" />
        <div className={`relative flex flex-col items-center rounded-2xl border border-amber-400/30 bg-amber-950/60 shadow-lg backdrop-blur-sm ${compact ? 'p-2.5' : 'p-5'}`}>
          <KeyRound className={`${compact ? 'h-7 w-7' : 'h-12 w-12'} text-amber-300`} />
          <div className={`mt-2 rounded-md border border-amber-300/40 bg-amber-100 px-3 py-1 font-mono font-bold tracking-wider text-stone-900 ${compact ? 'text-[10px]' : 'text-sm'}`}>
            KAMAR 07
          </div>
          {!compact && (
            <div className="mt-2 text-center font-mono text-xs text-amber-200/90">
              <p>KOS MELATI</p>
              <p className="mt-0.5 font-bold text-amber-300">Masuk: 18/05</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'cafe-receipt') {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-800 to-zinc-950 p-3">
        <div className={`w-full max-w-[210px] rounded-sm bg-stone-100 font-mono text-stone-800 shadow-md ${compact ? 'p-2 text-[8px]' : 'p-4 text-[11px]'}`}>
          <div className="flex items-center justify-center gap-1 border-b border-dashed border-stone-400 pb-1.5 font-bold">
            <Coffee className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
            <span>KOPI SUDUT</span>
          </div>
          {!compact && (
            <div className="mt-2 space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span>1x Es Kopi Susu</span>
                <span>24.000</span>
              </div>
              <div className="flex justify-between">
                <span>1x Matcha Latte</span>
                <span>28.000</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-stone-400 pt-1 font-bold">
                <span>TOTAL</span>
                <span>Rp 52.000</span>
              </div>
              <p className="pt-1 text-center text-[9px] text-stone-500">21:15 WIB • LUNAS QRIS</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'side-gate') {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-slate-950 to-black p-4 text-zinc-200">
        <div className={`flex flex-col items-center rounded-xl border border-rose-500/30 bg-rose-950/20 ${compact ? 'p-2.5' : 'p-5'}`}>
          <LockOpen className={`${compact ? 'h-7 w-7' : 'h-12 w-12'} text-rose-400`} />
          {!compact && (
            <>
              <span className="mt-2 rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-300">
                GEMBOK RUSAK / TERCONGKEL
              </span>
              <p className="mt-1.5 text-center text-[11px] text-zinc-400">
                Area gudang belakang gelap, lampu lorong mati.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'audit-transfer') {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-zinc-950 p-3">
        <div className={`w-full max-w-[230px] rounded-lg border border-amber-400/30 bg-zinc-900 font-mono text-zinc-100 shadow-lg ${compact ? 'p-2 text-[8px]' : 'p-4 text-[11px]'}`}>
          <div className="flex items-center gap-1.5 border-b border-zinc-700 pb-1.5 font-bold text-amber-300">
            <FileSpreadsheet className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
            <span>INTERNAL AUDIT</span>
          </div>
          {!compact && (
            <div className="mt-2 space-y-1.5 text-[10px]">
              <p className="text-zinc-400">Tujuan Dana:</p>
              <p className="rounded bg-rose-500/20 px-2 py-1 font-bold text-rose-300">
                PROYEK HELIOS
              </p>
              <div className="flex justify-between pt-1">
                <span className="text-zinc-400">Nominal:</span>
                <span className="font-bold text-white">Rp 4.000.000.000</span>
              </div>
              <p className="text-[9px] text-amber-400/80">Status: Tanpa Otorisasi Direksi</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'access-card') {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-900 to-zinc-950 p-3">
        <div className={`w-full max-w-[220px] rounded-xl border border-cyan-400/30 bg-cyan-950/60 text-cyan-50 shadow-lg ${compact ? 'p-2 text-[9px]' : 'p-4 text-xs'}`}>
          <div className="flex items-center justify-between border-b border-cyan-400/20 pb-1.5">
            <span className="font-bold tracking-wide text-cyan-300">NUSATECH ID</span>
            <BadgeCheck className={compact ? 'h-3.5 w-3.5 text-cyan-300' : 'h-4 w-4 text-cyan-300'} />
          </div>
          {!compact && (
            <div className="mt-3 space-y-1 font-mono">
              <p className="text-xs font-bold text-white">BIMA PRATAMA</p>
              <p className="text-[10px] text-cyan-200/80">Finance Manager • Lt. 12</p>
              <div className="mt-2 inline-block rounded bg-black/40 px-2.5 py-1 text-xs font-bold tracking-widest text-amber-300">
                ID: 4821
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'office-cctv') {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4 text-zinc-200">
        <div className={`flex flex-col items-center rounded-xl border border-emerald-500/30 bg-emerald-950/20 ${compact ? 'p-2.5' : 'p-4 text-center'}`}>
          <ShieldAlert className={`${compact ? 'h-6 w-6' : 'h-10 w-10'} text-emerald-400`} />
          {!compact && (
            <div className="mt-2 space-y-1 font-mono text-[10px]">
              <p className="font-bold text-emerald-300">ACCESS LOG: LT. 12</p>
              <p className="text-zinc-300">Pintu Utama Dibuka: 02:02 WIB</p>
              <p className="text-amber-300">Kartu: VIP / FOUNDER ACCESS</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'toll-receipt') {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-950 to-zinc-950 p-3">
        <div className={`w-full max-w-[210px] rounded-sm bg-zinc-100 font-mono text-zinc-800 shadow-md ${compact ? 'p-2 text-[8px]' : 'p-4 text-[11px]'}`}>
          <div className="flex items-center justify-center gap-1 border-b border-dashed border-zinc-400 pb-1 font-bold">
            <Ticket className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
            <span>E-TOLL JASA MARGA</span>
          </div>
          {!compact && (
            <div className="mt-2 space-y-1 text-[10px]">
              <p className="font-bold">GT BEKASI BARAT</p>
              <p className="text-zinc-600">Waktu: 22:46 WIB</p>
              <p className="text-emerald-700 font-bold">TRANSAKSI BERHASIL</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-950 via-slate-900 to-zinc-950 p-3">
      <div className={`w-full max-w-[220px] rounded-xl border border-sky-400/30 bg-sky-950/60 text-sky-100 shadow-lg ${compact ? 'p-2 text-[9px]' : 'p-4 text-xs'}`}>
        <div className="flex items-center justify-between border-b border-sky-400/20 pb-1.5">
          <span className="flex items-center gap-1 font-bold text-sky-300">
            <Train className={compact ? 'h-3 w-3' : 'h-4 w-4'} /> E-TICKET KAI
          </span>
          <span className="font-mono text-[10px] text-emerald-300">BOARDED</span>
        </div>
        {!compact && (
          <div className="mt-2.5 space-y-1 font-mono text-[11px]">
            <p className="text-sky-200/80">Penumpang: RARA A.</p>
            <p className="font-bold text-white">GMR ➔ BD (19:00 WIB)</p>
            <p className="text-[10px] text-sky-300/80">Kode: KA-7721-BANDUNG</p>
          </div>
        )}
      </div>
    </div>
  );
};
