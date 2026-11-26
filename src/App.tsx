import { useEffect, useMemo, useRef, useState } from 'react';
import { getCaseRoadmap, getCases } from './data/cases';
import type { CaseData } from './types/case';
import { UI_STRINGS, type Language } from './i18n/strings';
import { sound } from './utils/sound';
import { PhoneFrame } from './components/PhoneFrame';
import { DeductionModal } from './components/DeductionModal';
import {
  AlertTriangle,
  ArrowLeft,
  BookmarkCheck,
  ClipboardList,
  FileCheck2,
  Globe,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Lock,
  Play,
  Search,
  Smartphone,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

interface SavedProgress {
  discoveredClues: Record<string, string[]>;
  unlockedNotes: Record<string, string[]>;
  recoveredThreads: Record<string, string[]>;
  hintsUsed: Record<string, number>;
  solvedRanks: Record<string, 'S' | 'A' | 'B'>;
}

const STORAGE_KEY = 'last-seen-save-v1';
const LANG_KEY = 'last-seen-lang';
const MAX_HINTS = 2;

const loadProgress = (): SavedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedProgress>;
      return {
        discoveredClues: parsed.discoveredClues ?? {},
        unlockedNotes: parsed.unlockedNotes ?? {},
        recoveredThreads: parsed.recoveredThreads ?? {},
        hintsUsed: parsed.hintsUsed ?? {},
        solvedRanks: parsed.solvedRanks ?? {},
      };
    }
  } catch {
    // ignore storage errors
  }
  return {
    discoveredClues: {},
    unlockedNotes: {},
    recoveredThreads: {},
    hintsUsed: {},
    solvedRanks: {},
  };
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
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [mobileCluesOpen, setMobileCluesOpen] = useState(false);
  const [dismissedRecaps, setDismissedRecaps] = useState<string[]>([]);
  const [liveTriggeredCases, setLiveTriggeredCases] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const t = UI_STRINGS[lang];
  const cases = useMemo(() => getCases(lang), [lang]);
  const roadmap = useMemo(() => getCaseRoadmap(lang), [lang]);

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

  const baseCase: CaseData | null = useMemo(
    () => cases.find((c) => c.id === activeCaseId) ?? null,
    [cases, activeCaseId]
  );

  const activeCase: CaseData | null = useMemo(() => {
    if (!baseCase) return null;
    if (!baseCase.liveAlert || !liveTriggeredCases.includes(baseCase.id)) return baseCase;

    const alert = baseCase.liveAlert;
    return {
      ...baseCase,
      chats: baseCase.chats.map((thread) =>
        thread.id === alert.threadId
          ? {
              ...thread,
              unreadCount: (thread.unreadCount ?? 0) + 1,
              messages: [
                ...thread.messages,
                {
                  id: `live-${baseCase.id}`,
                  senderName: alert.senderName,
                  senderType: 'contact',
                  text: alert.text,
                  time: alert.time,
                },
              ],
            }
          : thread
      ),
    };
  }, [baseCase, liveTriggeredCases]);

  const clueLabelsMap = useMemo(() => {
    if (!activeCase) return new Map<string, string>();
    const map = new Map<string, string>();
    activeCase.chats.forEach((thread) => {
      thread.messages.forEach((m) => {
        if (m.clueId && m.clueLabel) map.set(m.clueId, m.clueLabel);
      });
      thread.deletedMessages?.forEach((m) => {
        if (m.clueId && m.clueLabel) map.set(m.clueId, m.clueLabel);
      });
    });
    activeCase.photos.forEach((p) => {
      if (p.clueId && p.clueLabel) map.set(p.clueId, p.clueLabel);
    });
    activeCase.notes.forEach((n) => {
      if (n.clueId && n.clueLabel) map.set(n.clueId, n.clueLabel);
    });
    activeCase.locations?.forEach((l) => {
      if (l.clueId && l.clueLabel) map.set(l.clueId, l.clueLabel);
    });
    activeCase.browserHistory?.forEach((b) => {
      if (b.clueId && b.clueLabel) map.set(b.clueId, b.clueLabel);
    });
    return map;
  }, [activeCase]);

  const activeClues = activeCase ? progress.discoveredClues[activeCase.id] ?? [] : [];
  const activeUnlockedNotes = activeCase ? progress.unlockedNotes[activeCase.id] ?? [] : [];
  const activeRecoveredThreads = activeCase ? progress.recoveredThreads[activeCase.id] ?? [] : [];
  const activeHintsUsed = activeCase ? progress.hintsUsed[activeCase.id] ?? 0 : 0;

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

  const handleRecoverThread = (threadId: string) => {
    if (!activeCase) return;
    const existing = progress.recoveredThreads[activeCase.id] ?? [];
    if (existing.includes(threadId)) return;

    showToast(t.toastRecover);
    setProgress((prev) => ({
      ...prev,
      recoveredThreads: {
        ...prev.recoveredThreads,
        [activeCase.id]: [...(prev.recoveredThreads[activeCase.id] ?? []), threadId],
      },
    }));
  };

  const handleUseHint = () => {
    if (!activeCase || activeHintsUsed >= MAX_HINTS) return;
    sound.playTap();
    setProgress((prev) => ({
      ...prev,
      hintsUsed: {
        ...prev.hintsUsed,
        [activeCase.id]: (prev.hintsUsed[activeCase.id] ?? 0) + 1,
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
      recoveredThreads: { ...prev.recoveredThreads, [activeCase.id]: [] },
      hintsUsed: { ...prev.hintsUsed, [activeCase.id]: 0 },
    }));
  };

  useEffect(() => {
    if (activeCaseId && !muted) {
      sound.startAmbient();
    } else {
      sound.stopAmbient();
    }
    return () => {
      sound.stopAmbient();
    };
  }, [activeCaseId, muted]);

  useEffect(() => {
    if (!baseCase?.liveAlert || liveTriggeredCases.includes(baseCase.id)) return;
    const alert = baseCase.liveAlert;
    const timer = window.setTimeout(() => {
      sound.playPinError();
      setLiveTriggeredCases((prev) =>
        prev.includes(baseCase.id) ? prev : [...prev, baseCase.id]
      );
      showToast(
        lang === 'en'
          ? `New message from ${alert.senderName}!`
          : `Pesan baru dari ${alert.senderName}!`
      );
    }, alert.delayMs);

    return () => window.clearTimeout(timer);
  }, [baseCase, liveTriggeredCases, lang]);

  if (!activeCase) {
    const solvedCount = Object.keys(progress.solvedRanks).length;
    const totalCluesFound = Object.values(progress.discoveredClues).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    return (
      <div className="forensic-grid forensic-noise relative min-h-screen overflow-hidden text-zinc-100">
        {/* Ambient Lighting Orbs */}
        <div className="pointer-events-none fixed -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-rose-600/12 blur-[150px]" />
        <div className="pointer-events-none fixed -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-10">
          {/* Forensic Terminal Strip */}
          <div className="mb-8 flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/75 px-3.5 py-2 font-mono text-[10px] text-zinc-400 shadow-lg backdrop-blur-md sm:px-4 sm:py-2.5">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              <span className="hidden sm:inline">FORENSIC DESK // ENCRYPTED CLONE v2.4</span>
              <span className="sm:hidden">FORENSIC DESK // v2.4</span>
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  sound.playTap();
                  setShowHowToPlay(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20 hover:text-emerald-200"
                title={lang === 'en' ? 'How to Play' : 'Cara Bermain'}
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'en' ? 'How to Play' : 'Cara Main'}
                </span>
              </button>
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 rounded-lg bg-zinc-900/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title={t.switchLang}
              >
                <Globe className="h-3 w-3 text-emerald-400" />
                {lang.toUpperCase()}
              </button>
              <button
                onClick={toggleMute}
                className="inline-flex items-center rounded-lg bg-zinc-900/90 p-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title={muted ? t.muteOn : t.muteOff}
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </button>
            </div>
          </div>

          {/* Cinematic Hero + Live Device Teaser */}
          <div className="relative grid items-center gap-8 border-b border-zinc-800/70 pb-10 md:grid-cols-[1.35fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/35 bg-rose-950/40 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-300 shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-400" />
                REC ● {t.statusTag}
              </div>

              <h1 className="font-creepy title-flicker mt-5 bg-gradient-to-b from-white via-zinc-200 to-rose-400/90 bg-clip-text text-5xl font-normal tracking-wide text-transparent sm:text-7xl">
                Last Seen
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                {t.heroDesc}
              </p>

              {/* Detective Stats */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-4 py-2.5 backdrop-blur-sm">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                    {lang === 'en' ? 'Cases Solved' : 'Kasus Selesai'}
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-extrabold text-white">
                    {solvedCount}
                    <span className="text-xs font-normal text-zinc-600">/5</span>
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-4 py-2.5 backdrop-blur-sm">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                    {lang === 'en' ? 'Clues Pinned' : 'Bukti Tercatat'}
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-extrabold text-emerald-400">
                    {totalCluesFound}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHowToPlay(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-xs font-semibold text-zinc-300 transition hover:border-emerald-500/40 hover:bg-zinc-900 hover:text-white sm:hidden"
                >
                  <HelpCircle className="h-4 w-4 text-emerald-400" />
                  {lang === 'en' ? 'How to Play' : 'Cara Main'}
                </button>
              </div>
            </div>

            {/* Decorative Evidence Phone Preview */}
            <div className="hidden justify-end md:flex">
              <div className="relative w-[246px] rotate-2 rounded-[32px] border-[5px] border-zinc-800/90 bg-gradient-to-b from-zinc-900 via-[#080a0f] to-black p-4 shadow-[0_25px_70px_-15px_rgba(244,63,94,0.22)] ring-1 ring-white/10 transition duration-500 hover:rotate-0">
                {/* Subtle crack SVG */}
                <svg
                  className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-25"
                  viewBox="0 0 120 120"
                  fill="none"
                >
                  <path
                    d="M118 8L92 28L76 22L58 44M92 28L102 48"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>NO SERVICE</span>
                  <span className="font-bold text-rose-400">4% BAT</span>
                </div>
                <div className="mt-5 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-400/75">
                    {t.phoneCloned}
                  </p>
                  <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-white">
                    01:47
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-zinc-500">
                    {lang === 'en' ? 'EVIDENCE #01 // LOCKED' : 'BARANG BUKTI #01'}
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/35 p-2.5 text-[10px] text-rose-100 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-rose-300">Mas Dimas</p>
                      <span className="font-mono text-[8px] text-rose-400/80">01:46</span>
                    </div>
                    <p className="mt-0.5 truncate text-zinc-300">
                      {lang === 'en' ? 'Nadia: Mas help me...' : 'Nadia: Mas tolong jgn...'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/85 p-2.5 text-[10px] text-zinc-300">
                    <p className="font-bold text-amber-300">🔒 Note Locked</p>
                    <p className="mt-0.5 font-mono text-[9px] text-zinc-500">PIN: • • • •</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Roadmap */}
          <div className="mt-9">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                // {t.caseListTitle}
              </h2>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                <BookmarkCheck className="h-3 w-3 text-emerald-500/70" />
                {t.autoSaved}
              </span>
            </div>

            <div className="grid gap-3.5">
              {roadmap.map((item) => {
                const rank = progress.solvedRanks[item.id];
                const cluesCount = progress.discoveredClues[item.id]?.length ?? 0;
                const caseObj = cases.find((c) => c.id === item.id);
                const totalClues = caseObj?.totalClues ?? 6;
                const accentBorder =
                  item.difficulty === 'Mudah'
                    ? 'border-l-emerald-500/80'
                    : item.difficulty === 'Menengah'
                      ? 'border-l-amber-500/80'
                      : 'border-l-rose-500/80';
                const difficultyDot =
                  item.difficulty === 'Mudah'
                    ? 'bg-emerald-400'
                    : item.difficulty === 'Menengah'
                      ? 'bg-amber-400'
                      : 'bg-rose-400';

                return (
                  <div
                    key={item.id}
                    className={`group relative overflow-hidden rounded-xl border border-l-[3px] ${accentBorder} transition ${
                      item.isUnlocked
                        ? 'border-zinc-800/85 bg-zinc-950/65 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-[0_12px_35px_-12px_rgba(244,63,94,0.16)] active:scale-[0.995]'
                        : 'border-zinc-800/40 bg-zinc-950/40 opacity-50'
                    }`}
                  >
                    {/* Case number watermark */}
                    <span className="pointer-events-none absolute right-4 top-1 font-mono text-[72px] font-black leading-none text-white/[0.025]">
                      {String(item.number).padStart(2, '0')}
                    </span>

                    <div className="relative p-4 sm:p-5">
                      {/* Top row: case id + difficulty + rank */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-emerald-400/90 ring-1 ring-white/5">
                          FILE #{String(item.number).padStart(2, '0')}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${difficultyDot}`} />
                          {t.difficulty[item.difficulty]}
                        </span>
                        {rank && (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-400/15 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 ring-1 ring-amber-400/20">
                            <Trophy className="h-2.5 w-2.5" /> RANK {rank}
                          </span>
                        )}
                      </div>

                      {/* Title + subtitle */}
                      <h3 className="mt-2 text-base font-bold tracking-tight text-white sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                        {item.subtitle}
                      </p>

                      {/* Atmosphere + warning */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-zinc-500">
                          <Sparkles className="h-3 w-3 text-emerald-400/70" />
                          {item.atmosphere}
                        </span>
                        {item.contentWarning && (
                          <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-medium text-rose-300/90">
                            <AlertTriangle className="h-2.5 w-2.5 shrink-0" />
                            {item.contentWarning}
                          </span>
                        )}
                      </div>

                      {/* Progress bar + action */}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        {item.isUnlocked && cluesCount > 0 ? (
                          <div className="flex flex-1 items-center gap-2">
                            <div className="h-1 flex-1 max-w-[130px] overflow-hidden rounded-full bg-zinc-800">
                              <div
                                className="h-full rounded-full bg-emerald-500/80 transition-all"
                                style={{ width: `${Math.min(100, (cluesCount / totalClues) * 100)}%` }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-zinc-400">
                              {cluesCount}/{totalClues}
                            </span>
                          </div>
                        ) : (
                          <div />
                        )}

                        <div className="shrink-0">
                          {item.isUnlocked ? (
                            <button
                              onClick={() => {
                                sound.playTap();
                                setActiveCaseId(item.id);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-[11px] font-bold text-zinc-950 shadow-md shadow-emerald-950/50 transition hover:bg-emerald-400 active:scale-95 sm:px-5 sm:py-2.5 sm:text-xs"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              {cluesCount > 0 ? t.continueCase : t.startCase}
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3.5 py-2 font-mono text-[10px] font-semibold text-zinc-600">
                              <Lock className="h-3 w-3" /> {t.locked}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* How to Play Modal */}
        {showHowToPlay && (
          <div
            onClick={() => setShowHowToPlay(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-3.5">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    // {lang === 'en' ? 'FIELD MANUAL' : 'PANDUAN DETEKTIF'}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {lang === 'en' ? 'How to Play Last Seen' : 'Cara Bermain Last Seen'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHowToPlay(false);
                  }}
                  className="rounded-lg bg-zinc-900 p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed">
                <div className="flex gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {lang === 'en' ? '1. Inspect the Cloned Phone' : '1. Periksa HP Barang Bukti'}
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      {lang === 'en'
                        ? 'Open Messages, Gallery, Notes, Maps, or Browser to uncover the victim’s last movements.'
                        : 'Buka aplikasi Pesan, Galeri, Catatan, Maps, atau Browser untuk melacak jejak terakhir korban.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                    <BookmarkCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {lang === 'en' ? '2. Pin Suspicious Clues' : '2. Catat Bukti Mencurigakan'}
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      {lang === 'en'
                        ? 'Whenever you spot a lie, odd timestamp, or clue, tap "Pin Clue" to save it to your Evidence Board.'
                        : 'Saat menemukan kebohongan atau kejanggalan, klik "Catat Bukti" agar tersimpan di Papan Bukti.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-400">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {lang === 'en' ? '3. Crack PINs & Deleted Chats' : '3. Buka Kunci & Pulihkan Chat'}
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      {lang === 'en'
                        ? 'Look for 4-digit PIN clues in photos/chats to unlock secret Notes, and enter keywords to restore deleted messages.'
                        : 'Cari petunjuk PIN 4 digit dari foto/chat untuk membuka Catatan terkunci, dan masukkan kata kunci untuk memulihkan pesan terhapus.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {lang === 'en' ? '4. File the Police Report' : '4. Kirim Laporan & Raih Rank S'}
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      {lang === 'en'
                        ? 'Tap "Solve Case" (or the Report app on the phone) to deduce the culprit and motive. Find all clues without hints for Rank S!'
                        : 'Tekan "Selesaikan Kasus" (atau ikon Lapor di HP) untuk menjawab pelaku & motifnya. Kumpulkan semua bukti tanpa Hint untuk Rank S!'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playTap();
                  setShowHowToPlay(false);
                }}
                className="mt-5 w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400 active:scale-[0.99]"
              >
                {lang === 'en' ? 'Got It, Let’s Investigate' : 'Siap, Mulai Investigasi'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="forensic-grid relative min-h-screen overflow-hidden bg-[#05070a] text-zinc-100">
      <div className="pointer-events-none fixed left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[140px]" />
      {/* Top Bar */}
      <header className="relative z-20 border-b border-zinc-800/60 bg-zinc-950/85 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                sound.playTap();
                setActiveCaseId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900/90 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:px-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.backToDesk}</span>
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-900/90 px-2 py-1.5 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:px-2.5"
              title={t.switchLang}
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggleMute}
              className="rounded-lg bg-zinc-900/90 p-1.5 text-zinc-300 transition hover:bg-zinc-800"
              title={muted ? t.muteOn : t.muteOff}
            >
              {muted ? (
                <VolumeX className="h-4 w-4 text-zinc-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setMobileCluesOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-900/90 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-300 transition hover:bg-zinc-800 lg:hidden"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              {activeClues.length}/{activeCase.totalClues}
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setShowDeduction(true);
              }}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-zinc-950 transition hover:bg-emerald-400 sm:px-3.5 sm:text-xs"
            >
              {t.solveCaseBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Clue & Hint Drawer */}
      {mobileCluesOpen && (
        <div className="relative z-20 border-b border-zinc-800/80 bg-zinc-900/95 p-4 backdrop-blur-md lg:hidden">
          <p className="text-xs font-bold text-white">{t.briefingTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-300">{activeCase.briefing}</p>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-400">
              {t.evidenceBoardTitle} ({activeClues.length}/{activeCase.totalClues})
            </p>
            <button
              disabled={activeHintsUsed >= MAX_HINTS}
              onClick={handleUseHint}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300 disabled:opacity-40"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {t.deduction.hintLabel} ({MAX_HINTS - activeHintsUsed}/{MAX_HINTS})
            </button>
          </div>

          {activeHintsUsed > 0 && (
            <div className="mt-2 space-y-1.5">
              {activeCase.hints.slice(0, activeHintsUsed).map((hint, idx) => (
                <p
                  key={idx}
                  className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2 text-[11px] text-amber-200"
                >
                  💡 Hint {idx + 1}: {hint}
                </p>
              ))}
            </div>
          )}

          {activeClues.length === 0 ? (
            <p className="mt-2 text-xs text-zinc-500">{t.evidenceEmpty}</p>
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
      <main className="relative z-10 mx-auto grid max-w-6xl gap-6 px-2.5 py-3 sm:gap-8 sm:px-4 sm:py-6 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:py-8">
        {/* Left: Briefing & Hints */}
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

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Lightbulb className="h-4 w-4" /> {t.hintTitle}
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                {t.hintRemaining} {MAX_HINTS - activeHintsUsed}/{MAX_HINTS}
              </span>
            </div>

            {activeHintsUsed > 0 && (
              <div className="mt-3 space-y-2">
                {activeCase.hints.slice(0, activeHintsUsed).map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100"
                  >
                    <strong className="text-amber-300">Hint #{idx + 1}:</strong> {hint}
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={activeHintsUsed >= MAX_HINTS}
              onClick={handleUseHint}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-500/15 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {activeHintsUsed >= MAX_HINTS
                ? t.hintExhausted
                : `${t.hintOpenPrefix}${activeHintsUsed + 1} ${t.hintRankNote}`}
            </button>
          </div>
        </section>

        {/* Center: Cloned Phone */}
        <section className="flex justify-center">
          <PhoneFrame
            caseData={activeCase}
            lang={lang}
            discoveredClues={activeClues}
            unlockedNoteIds={activeUnlockedNotes}
            recoveredThreadIds={activeRecoveredThreads}
            toastMessage={toastMessage}
            onDiscoverClue={handleDiscoverClue}
            onUnlockNote={handleUnlockNote}
            onRecoverThread={handleRecoverThread}
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
          lang={lang}
          caseData={activeCase}
          discoveredCluesCount={activeClues.length}
          hintsUsed={activeHintsUsed}
          onClose={() => setShowDeduction(false)}
          onCaseSolved={handleCaseSolved}
          onResetCase={handleResetCase}
        />
      )}

      {/* "Previously on Last Seen..." Recap Modal */}
      {activeCase.recap && !dismissedRecaps.includes(activeCase.id) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 p-6 shadow-2xl ring-1 ring-white/15">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              {activeCase.recap.title}
            </p>
            <h2 className="mt-1.5 text-xl font-black text-white">
              Case #{activeCase.number}: {activeCase.title}
            </h2>

            <ul className="mt-4 space-y-2.5">
              {activeCase.recap.points.map((pt, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl bg-zinc-900/80 p-3 text-xs leading-relaxed text-zinc-200"
                >
                  <span className="mt-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    0{idx + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                sound.playTap();
                setDismissedRecaps((prev) => [...prev, activeCase.id]);
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400 active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-current" />
              {t.startCase}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
