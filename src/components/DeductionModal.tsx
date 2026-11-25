import React, { useState } from 'react';
import type { CaseData } from '../types/case';
import { sound } from '../utils/sound';
import { CheckCircle2, RotateCcw, ShieldAlert, Trophy, X } from 'lucide-react';

interface DeductionModalProps {
  caseData: CaseData;
  discoveredCluesCount: number;
  hintsUsed: number;
  onClose: () => void;
  onCaseSolved: (rank: 'S' | 'A' | 'B') => void;
  onResetCase: () => void;
}

export const DeductionModal: React.FC<DeductionModalProps> = ({
  caseData,
  discoveredCluesCount,
  hintsUsed,
  onClose,
  onCaseSolved,
  onResetCase,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = caseData.deductions.every((q) => Boolean(answers[q.id]));

  const correctCount = caseData.deductions.filter(
    (q) => answers[q.id] === q.correctOptionId
  ).length;
  const isAllCorrect = correctCount === caseData.deductions.length;

  const getRank = (): 'S' | 'A' | 'B' => {
    if (isAllCorrect && hintsUsed === 0 && discoveredCluesCount >= 4) return 'S';
    if (isAllCorrect) return 'A';
    return 'B';
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    sound.playCaseSolved(isAllCorrect);
    setSubmitted(true);
    onCaseSolved(getRank());
  };

  const rank = getRank();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="phone-scroll max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">
              Laporan Investigasi
            </p>
            <h2 className="mt-1 text-lg font-bold text-white">
              Case #{caseData.number}: {caseData.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!submitted ? (
          <div className="mt-5 space-y-5">
            {caseData.deductions.map((q, index) => (
              <div key={q.id} className="space-y-2">
                <p className="text-sm font-semibold text-zinc-100">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playTap();
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                        }}
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-left text-xs transition ${
                          selected
                            ? 'border-emerald-500 bg-emerald-500/15 font-semibold text-emerald-200'
                            : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 border-t border-zinc-800 pt-4">
              <span className="text-xs text-zinc-400">
                Bukti: <strong className="text-white">{discoveredCluesCount}/{caseData.totalClues}</strong> • Hint:{' '}
                <strong className="text-white">{hintsUsed}/2</strong>
              </span>
              <button
                disabled={!allAnswered}
                onClick={handleSubmit}
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Kirim Laporan Polisi
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div
              className={`flex items-center gap-4 rounded-2xl border p-4 ${
                isAllCorrect
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-amber-500/30 bg-amber-500/10'
              }`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-2xl font-black ${
                  isAllCorrect
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-amber-500 text-zinc-950'
                }`}
              >
                {rank}
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-base font-bold text-white">
                  {isAllCorrect ? (
                    <>
                      <Trophy className="h-4 w-4 text-emerald-400" /> Kasus Terpecahkan!
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-4 w-4 text-amber-400" /> Kasus Ditutup (Sebagian Tepat)
                    </>
                  )}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-300">
                  {rank === 'S'
                    ? 'Sempurna (Tanpa Hint • Bukti Lengkap)'
                    : rank === 'A'
                      ? `Tepat (${hintsUsed} Hint Dipakai • Bukti ${discoveredCluesCount}/${caseData.totalClues})`
                      : `Benar ${correctCount}/${caseData.deductions.length} (Ada Deduksi Kurang Tepat)`}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs leading-relaxed text-zinc-200">
              {isAllCorrect ? caseData.epilogueSuccess : caseData.epiloguePartial}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-400">Ringkasan Jawaban:</p>
              {caseData.deductions.map((q) => {
                const isRight = answers[q.id] === q.correctOptionId;
                return (
                  <div
                    key={q.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-2 text-xs"
                  >
                    <span className="text-zinc-300">{q.question}</span>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 font-semibold ${
                        isRight ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isRight ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Tepat
                        </>
                      ) : (
                        'Kurang Tepat'
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-end gap-2.5 border-t border-zinc-800 pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  onResetCase();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-900"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Main Ulang Kasus
              </button>
              <button
                onClick={onClose}
                className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-zinc-200"
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
