import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_CASES, CASE_ROADMAP } from './data/cases';
import type { CaseData } from './types/case';
import { UI_STRINGS, type Language } from './i18n/strings';
import { sound } from './utils/sound';
import { PhoneFrame } from './components/PhoneFrame';
import { DeductionModal } from './components/DeductionModal';
import {
  ArrowLeft,
  BookmarkCheck,
  ClipboardList,
  Globe,
  Lock,
  Play,
  Search,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface SavedProgress {
  discoveredClues: Record<string, string[]>;
  unlockedNotes: Record<string, string[]>;
  solvedRanks: Record<string, 'S' | 'A' | 'B'>;
}

const STORAGE_KEY = 'last-seen-save-v1';
const LANG_KEY = 'last-seen-lang';

const loadProgress = (): SavedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SavedProgress;
  } catch {
    // ignore storage errors
  }
  return { discoveredClues: {}, unlockedNotes: {}, solvedRanks: {} };
};

const loadLang = (): Language => {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === 'en' || raw === 'id') return raw;
  } catch {
    // ignore
  }
  return 'id';
};

export function App() {
  const [progress, setProgress] = useState<SavedProgress>(loadProgress);
  const [lang, setLang] = useState<Language>(loadLang);
  const [muted, setMuted] = useState<boolean>(() => sound.isMuted());
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [showDeduction, setShowDeduction] = useState(false);
  const [mobileCluesOpen, setMobileCluesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 2600);
  };

  const toggleLanguage = () => {
    sound.playTap();
    setLang((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleMute = () => {
    setMuted(sound.toggleMute());
  };

  const activeCase: CaseData | null = useMemo(
    () => ALL_CASES.find((c) => c.id === activeCaseId) ?? null,
    [activeCaseId]
  );

  const clueLabelsMap = useMemo(() => {
    if (!activeCase) return new Map<string, string>();
    const map = new Map<string, string>();
    activeCase.chats.forEach((t) =>
      t.messages.forEach((m) => {
        if (m.clueId && m.clueLabel) map.set(m.clueId, m.clueLabel);
      })
    );
    activeCase.photos.forEach((p) => {
      if (p.clueId && p.clueLabel) map.set(p.clueId, p.clueLabel);
    });
    activeCase.notes.forEach((n) => {
      if (n.clueId && n.clueLabel) map.set(n.clueId, n.clueLabel);
    });
    return map;
  }, [activeCase]);

  const activeClues = activeCase ? progress.discoveredClues[activeCase.id] ?? [] : [];
  const activeUnlockedNotes = activeCase ? progress.unlockedNotes[activeCase.id] ?? [] : [];

  const handleDiscoverClue = (clueId: string) => {
    if (!activeCase) return;
    const existing = progress.discoveredClues[activeCase.id] ?? [];
    if (existing.includes(clueId)) return;

    sound.playClueFound();
    showToast(t.toastClue);
    setProgress((prev) => ({
      ...prev,
      discoveredClues: {
        ...prev.discoveredClues,
        [activeCase.id]: [...(prev.discoveredClues[activeCase.id] ?? []), clueId],
      },
    }));
  };

  const handleUnlockNote = (noteId: string) => {
    if (!activeCase) return;
    const existing = progress.unlockedNotes[activeCase.id] ?? [];
    if (existing.includes(noteId)) return;

    showToast(t.toastUnlock);
    setProgress((prev) => ({
      ...prev,
      unlockedNotes: {
        ...prev.unlockedNotes,
        [activeCase.id]: [...(prev.unlockedNotes[activeCase.id] ?? []), noteId],
      },
    }));
  };

  const handleCaseSolved = (rank: 'S' | 'A' | 'B') => {
    if (!activeCase) return;
    setProgress((prev) => ({
      ...prev,
      solvedRanks: {
        ...prev.solvedRanks,
        [activeCase.id]: rank,
      },
    }));
  };

  const handleResetCase = () => {
    if (!activeCase) return;
    setProgress((prev) => ({
      ...prev,
      discoveredClues: { ...prev.discoveredClues, [activeCase.id]: [] },
      unlockedNotes: { ...prev.unlockedNotes, [activeCase.id]: [] },
    }));
  };

  if (!activeCase) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:py-12">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-zinc-800/80 pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                {t.statusTag}
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Last Seen
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                {t.heroDesc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title="Ganti Bahasa"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                {lang.toUpperCase()}
              </button>
              <button
                onClick={toggleMute}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title={muted ? 'Nyalakan Suara' : 'Matikan Suara'}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 text-zinc-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-emerald-400" />
                )}
              </button>
            </div>
          </div>

          {/* Case Roadmap */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                {t.caseListTitle}
              </h2>
              <span className="text-xs text-zinc-500">{t.autoSaved}</span>
            </div>

            <div className="mt-4 grid gap-4">
              {CASE_ROADMAP.map((item) => {
                const rank = progress.solvedRanks[item.id];
                const cluesCount = progress.discoveredClues[item.id]?.length ?? 0;

                return (
                  <div
                    key={item.id}
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition ${
                      item.isUnlocked
                        ? 'border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40 hover:bg-zinc-900'
                        : 'border-zinc-900 bg-zinc-950/60 opacity-65'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            CASE #{item.number}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                              item.difficulty === 'Mudah'
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : item.difficulty === 'Menengah'
                                  ? 'bg-amber-500/15 text-amber-300'
                                  : 'bg-rose-500/15 text-rose-300'
                            }`}
                          >
                            {item.difficulty}
                          </span>
                          {rank && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                              <Trophy className="h-3 w-3" /> {t.solvedBadge} (Rank {rank})
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-zinc-400">{item.subtitle}</p>
                        <p className="inline-flex items-center gap-1.5 pt-1 text-[11px] text-zinc-500">
                          <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                          {item.newMechanicHint}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        {item.isUnlocked ? (
                          <button
                            onClick={() => {
                              sound.playTap();
                              setActiveCaseId(item.id);
                            }}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-lg shadow-emerald-950/50 transition hover:bg-emerald-400 active:scale-95"
                          >
                            <Play className="h-4 w-4 fill-current" />
                            {cluesCount > 0 ? t.continueCase : t.startCase}
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs font-semibold text-zinc-500">
                            <Lock className="h-3.5 w-3.5" /> {t.locked}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Bar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTap();
                setActiveCaseId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t.backToDesk}
            </button>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white">
                Case #{activeCase.number}: {activeCase.title}
              </p>
              <p className="text-[11px] text-zinc-400">
                {t.ownerLabel}: {activeCase.ownerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-300 transition hover:bg-zinc-800"
              title={muted ? 'Nyalakan Suara' : 'Matikan Suara'}
            >
              {muted ? (
                <VolumeX className="h-4 w-4 text-zinc-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setMobileCluesOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-emerald-300 lg:hidden"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              {t.evidenceBtn} ({activeClues.length}/{activeCase.totalClues})
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setShowDeduction(true);
              }}
              className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              {t.solveCaseBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Clue Drawer */}
      {mobileCluesOpen && (
        <div className="border-b border-zinc-800 bg-zinc-900/90 p-4 lg:hidden">
          <p className="text-xs font-bold text-white">{t.briefingTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-300">{activeCase.briefing}</p>
          <p className="mt-3 text-xs font-bold text-emerald-400">
            {t.evidenceBoardTitle} ({activeClues.length}/{activeCase.totalClues})
          </p>
          {activeClues.length === 0 ? (
            <p className="mt-1 text-xs text-zinc-500">{t.evidenceEmpty}</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {activeClues.map((id) => (
                <li key={id} className="flex items-start gap-2 text-xs text-zinc-200">
                  <BookmarkCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{clueLabelsMap.get(id)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Main Workspace */}
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:py-8">
        {/* Left: Briefing */}
        <section className="hidden space-y-4 lg:block">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Search className="h-4 w-4" /> {t.briefingTitle}
            </div>
            <h2 className="mt-2 text-lg font-bold text-white">{activeCase.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300">{activeCase.briefing}</p>
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-[11px] text-zinc-400">
              <strong className="text-zinc-200">{t.tipsLabel}</strong> {t.tipsText}
            </div>
          </div>
        </section>

        {/* Center: Cloned Phone */}
        <section className="flex justify-center">
          <PhoneFrame
            caseData={activeCase}
            lang={lang}
            discoveredClues={activeClues}
            unlockedNoteIds={activeUnlockedNotes}
            toastMessage={toastMessage}
            onDiscoverClue={handleDiscoverClue}
            onUnlockNote={handleUnlockNote}
            onOpenDeduction={() => setShowDeduction(true)}
          />
        </section>

        {/* Right: Evidence Board */}
        <section className="hidden space-y-4 lg:block">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <ClipboardList className="h-4 w-4" /> {t.evidenceBoardTitle}
              </div>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                {activeClues.length}/{activeCase.totalClues}
              </span>
            </div>

            {activeClues.length === 0 ? (
              <p className="mt-4 text-xs leading-relaxed text-zinc-500">{t.evidenceEmpty}</p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {activeClues.map((id) => (
                  <li
                    key={id}
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed text-zinc-200"
                  >
                    <BookmarkCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{clueLabelsMap.get(id)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {showDeduction && (
        <DeductionModal
          caseData={activeCase}
          discoveredCluesCount={activeClues.length}
          onClose={() => setShowDeduction(false)}
          onCaseSolved={handleCaseSolved}
          onResetCase={handleResetCase}
        />
      )}
    </div>
  );
}

export default App;
