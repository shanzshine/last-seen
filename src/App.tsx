import { useEffect, useMemo, useRef, useState } from 'react';
import { getCaseRoadmap, getCases } from './data/cases';
import type { CaseData, PhoneNotification } from './types/case';
import { UI_STRINGS, type Language } from './i18n/strings';
import { sound } from './utils/sound';
import { PhoneFrame } from './components/PhoneFrame';
import { DeductionModal } from './components/DeductionModal';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BookmarkCheck,
  ClipboardList,
  Globe,
  HelpCircle,
  Lightbulb,
  Lock,
  Play,
  Search,
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
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(() => sound.isAudioUnlocked());
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [showDeduction, setShowDeduction] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [mobileCluesOpen, setMobileCluesOpen] = useState(false);
  const [dismissedRecaps, setDismissedRecaps] = useState<string[]>([]);
  const [recapStep, setRecapStep] = useState(0);
  const [liveTriggeredCases, setLiveTriggeredCases] = useState<string[]>([]);
  const [typingThreadId, setTypingThreadId] = useState<string | null>(null);
  const [notification, setNotification] = useState<PhoneNotification | null>(null);
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

  const pushNotification = (
    kind: PhoneNotification['kind'],
    title: string,
    body: string,
    time?: string,
    durationMs = 4200
  ) => {
    setNotification({ id: Date.now(), kind, title, body, time });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setNotification(null), durationMs);
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

  const isRecapOpen = Boolean(activeCase?.recap && !dismissedRecaps.includes(activeCase.id));
  const anyModalOpen = showHowToPlay || showDeduction || isRecapOpen;

  useEffect(() => {
    if (!anyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [anyModalOpen]);

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
    activeCase.socialPosts?.forEach((s) => {
      if (s.clueId && s.clueLabel) map.set(s.clueId, s.clueLabel);
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
    const clueText = clueLabelsMap.get(clueId) ?? t.toastClue;
    pushNotification(
      'clue',
      lang === 'en' ? 'Evidence Pinned' : 'Bukti Tercatat',
      clueText
    );
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

    const noteTitle = activeCase.notes.find((n) => n.id === noteId)?.title;
    pushNotification(
      'unlock',
      lang === 'en' ? 'Note Unlocked' : 'Catatan Terbuka',
      noteTitle ? `${noteTitle}` : t.toastUnlock
    );
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

    const threadName = activeCase.chats.find((c) => c.id === threadId)?.name;
    pushNotification(
      'recover',
      lang === 'en' ? 'Backup Restored' : 'Pesan Dipulihkan',
      threadName
        ? lang === 'en'
          ? `Deleted messages in ${threadName} restored.`
          : `Pesan terhapus di ${threadName} berhasil dipulihkan.`
        : t.toastRecover
    );
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
    return sound.onUnlockChange(setAudioUnlocked);
  }, []);

  useEffect(() => {
    if (!muted) {
      sound.startAmbient(activeCaseId ? 'case' : 'home');
    } else {
      sound.stopAmbient();
    }
  }, [activeCaseId, muted]);

  useEffect(() => {
    return () => {
      sound.stopAmbient();
    };
  }, []);

  useEffect(() => {
    setRecapStep(0);
  }, [activeCaseId]);

  useEffect(() => {
    if (!activeCase?.recap || dismissedRecaps.includes(activeCase.id)) return;
    const total = activeCase.recap.points.length;
    if (recapStep >= total - 1) return;
    const timer = window.setTimeout(() => {
      setRecapStep((prev) => Math.min(total - 1, prev + 1));
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [activeCase, dismissedRecaps, recapStep]);

  useEffect(() => {
    setTypingThreadId(null);
    if (!baseCase?.liveAlert || liveTriggeredCases.includes(baseCase.id)) return;
    const alert = baseCase.liveAlert;
    const typingDelay = Math.max(1200, alert.delayMs - 3000);

    const typingTimer = window.setTimeout(() => {
      setTypingThreadId(alert.threadId);
    }, typingDelay);

    const timer = window.setTimeout(() => {
      setTypingThreadId(null);
      sound.playKnockThud();
      setLiveTriggeredCases((prev) =>
        prev.includes(baseCase.id) ? prev : [...prev, baseCase.id]
      );
      pushNotification(
        'alert',
        `${alert.senderName}`,
        alert.text,
        alert.time,
        6500
      );
    }, alert.delayMs);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(timer);
    };
  }, [baseCase, liveTriggeredCases, lang]);

  if (!activeCase) {
    const solvedCount = Object.keys(progress.solvedRanks).length;
    const rankSCount = Object.values(progress.solvedRanks).filter((r) => r === 'S').length;
    const totalCluesFound = Object.values(progress.discoveredClues).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    return (
      <div className="forensic-grid forensic-noise relative min-h-screen overflow-hidden text-zinc-100">
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-10">
          {/* Top Archive Strip */}
          <div className="mb-8 flex items-center justify-between rounded-xl border border-zinc-800/70 bg-zinc-950/80 px-3.5 py-2 font-mono text-[10px] text-zinc-400 backdrop-blur-md sm:px-4 sm:py-2.5">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span>
                {lang === 'en'
                  ? 'FORENSICS • EVIDENCE PHONE'
                  : 'ARSIP FORENSIK • HP KORBAN'}
              </span>
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  sound.playTap();
                  setShowHowToPlay(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                title={lang === 'en' ? 'How to Play' : 'Cara Bermain'}
              >
                <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
                <span className="hidden sm:inline">
                  {lang === 'en' ? 'How to Play' : 'Cara Main'}
                </span>
              </button>
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title={t.switchLang}
              >
                <Globe className="h-3 w-3 text-zinc-400" />
                {lang.toUpperCase()}
              </button>
              <button
                onClick={toggleMute}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                title={muted ? t.muteOn : !audioUnlocked ? t.audioTapHint : t.muteOff}
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                ) : (
                  <>
                    <span className="relative inline-flex">
                      <Volume2 className="h-3.5 w-3.5 text-zinc-200" />
                      {!audioUnlocked && (
                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-ping rounded-full bg-red-500" />
                      )}
                    </span>
                    {!audioUnlocked && (
                      <span className="hidden text-[10px] font-semibold text-zinc-300 sm:inline">
                        {t.audioTapHint}
                      </span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero + Evidence Device Preview */}
          <div className="relative grid items-center gap-8 border-b border-zinc-800/60 pb-10 md:grid-cols-[1.35fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-red-900/50 bg-red-950/30 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-red-300/90">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {t.statusTag}
              </div>

              <h1 className="font-creepy title-flicker mt-5 bg-gradient-to-b from-red-500 via-red-700 to-red-950 bg-clip-text py-1 text-3xl leading-snug tracking-wide text-transparent sm:text-5xl">
                Last Seen
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                {t.heroDesc}
              </p>

              {/* Detective Stats */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/80 px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                    {lang === 'en' ? 'Cases Solved' : 'Kasus Selesai'}
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-extrabold text-zinc-100">
                    {solvedCount}
                    <span className="text-xs font-normal text-zinc-600">/{cases.length}</span>
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/80 px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                    {lang === 'en' ? 'Clues Pinned' : 'Bukti Tercatat'}
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-extrabold text-zinc-100">
                    {totalCluesFound}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/80 px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                    Rank S
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-extrabold text-amber-300">
                    {rankSCount}
                  </p>
                </div>
                {solvedCount === cases.length && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    <Trophy className="h-3.5 w-3.5" />
                    {lang === 'en' ? 'Season 1 Cleared' : 'Season 1 Tamat'}
                  </div>
                )}
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHowToPlay(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:hidden"
                >
                  <HelpCircle className="h-4 w-4 text-zinc-400" />
                  {lang === 'en' ? 'How to Play' : 'Cara Main'}
                </button>
              </div>
            </div>

            {/* Decorative Evidence Phone Preview */}
            <div className="hidden justify-end md:flex">
              <div className="relative w-[246px] rotate-2 rounded-[32px] border-[5px] border-zinc-800/90 bg-gradient-to-b from-zinc-900 via-[#07080a] to-black p-4 shadow-2xl ring-1 ring-white/5 transition duration-500 hover:rotate-0">
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
                  <span className="font-bold text-red-400">4% BAT</span>
                </div>
                <div className="mt-5 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    {t.phoneCloned}
                  </p>
                  <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-zinc-100">
                    01:47
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-zinc-600">
                    {lang === 'en' ? 'EVIDENCE #01' : 'BARANG BUKTI #01'}
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="rounded-xl border border-red-900/40 bg-red-950/25 p-2.5 text-[10px] text-zinc-200">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-red-300">Mas Dimas</p>
                      <span className="font-mono text-[8px] text-zinc-500">01:46</span>
                    </div>
                    <p className="mt-0.5 truncate text-zinc-400">
                      {lang === 'en' ? 'Nadia: Mas help me...' : 'Nadia: Mas tolong jgn...'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/80 p-2.5 text-[10px] text-zinc-300">
                    <p className="font-bold text-zinc-300">Catatan Terkunci</p>
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
                {t.caseListTitle}
              </h2>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                <BookmarkCheck className="h-3 w-3 text-zinc-500" />
                {t.autoSaved}
              </span>
            </div>

            <div className="grid gap-3.5">
              {roadmap.map((item, idx) => {
                const rank = progress.solvedRanks[item.id];
                const cluesCount = progress.discoveredClues[item.id]?.length ?? 0;
                const caseObj = cases.find((c) => c.id === item.id);
                const totalClues = caseObj?.totalClues ?? 6;
                const accentBorder =
                  item.difficulty === 'Mudah'
                    ? 'border-l-emerald-700'
                    : item.difficulty === 'Menengah'
                      ? 'border-l-amber-700'
                      : 'border-l-red-800';

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.045 }}
                    className={`group relative overflow-hidden rounded-xl border border-l-[3px] ${accentBorder} transition ${
                      item.isUnlocked
                        ? 'border-zinc-800/80 bg-zinc-950/75 hover:border-zinc-700 hover:bg-zinc-900/75 active:scale-[0.995]'
                        : 'border-zinc-800/40 bg-zinc-950/40 opacity-50'
                    }`}
                  >
                    {/* Case number watermark */}
                    <span className="pointer-events-none absolute right-4 top-1 font-mono text-[72px] font-black leading-none text-white/[0.02]">
                      {String(item.number).padStart(2, '0')}
                    </span>

                    <div className="relative p-4 sm:p-5">
                      {/* Top row: case id + rank */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-zinc-300 ring-1 ring-white/5">
                          BERKAS #{String(item.number).padStart(2, '0')}
                        </span>
                        {rank && (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
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
                        <span className="text-[11px] text-zinc-500">
                          {item.atmosphere}
                        </span>
                        {item.contentWarning && (
                          <span className="inline-flex items-center gap-1 rounded bg-red-950/40 px-1.5 py-0.5 text-[10px] font-medium text-red-300/90">
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
                                className="h-full rounded-full bg-emerald-600 transition-all"
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
                              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2 text-[11px] font-bold text-zinc-950 transition hover:bg-white active:scale-95 sm:px-5 sm:py-2.5 sm:text-xs"
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
                  </motion.div>
                );
              })}
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-zinc-800/60 pt-5 text-center sm:flex-row sm:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              LAST SEEN // DIGITAL FORENSIC ARCHIVE
            </p>
            <p className="font-mono text-[11px] text-zinc-500">
              {lang === 'en' ? 'Created by' : 'Dibuat oleh'}{' '}
              <a
                href="https://github.com/shanzshine"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold tracking-wide text-red-400 transition hover:text-red-300"
              >
                @shanzshine
              </a>
            </p>
          </footer>
        </div>

        {/* How to Play Modal — Compact Aged Forensic Paper Memo */}
        <AnimatePresence>
          {showHowToPlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setShowHowToPlay(false)}
              className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/85 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 24, rotate: -1.8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: -0.3 }}
                exit={{ opacity: 0, scale: 0.92, y: 14, rotate: 0.8 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto overscroll-contain rounded-lg border border-[#cbbba0] bg-[#efe6d2] p-5 text-stone-900 shadow-[0_28px_70px_rgba(0,0,0,0.9)] sm:p-6"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 12%, rgba(153, 27, 27, 0.09) 0%, transparent 45%), repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(120, 100, 75, 0.09) 28px)',
                }}
              >
                {/* Red Classified Rubber Stamp */}
                <div className="pointer-events-none absolute right-12 top-5 rotate-[-10deg] rounded border-2 border-red-800/60 px-2 py-0.5 font-mono text-[9.5px] font-black uppercase tracking-[0.22em] text-red-800/65">
                  {lang === 'en' ? 'CLASSIFIED' : 'RAHASIA'}
                </div>

                <div className="relative flex items-start justify-between gap-3 border-b-2 border-stone-800/20 pb-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-900/80">
                      {lang === 'en' ? 'FIELD MANUAL' : 'BERKAS PANDUAN'}
                    </p>
                    <h3 className="mt-0.5 text-lg font-black tracking-tight text-stone-900">
                      {lang === 'en' ? 'How to Play' : 'Cara Bermain'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setShowHowToPlay(false);
                    }}
                    className="rounded-md p-1.5 text-stone-600 transition hover:bg-stone-900/10 hover:text-stone-950"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-3 border-l-2 border-red-900/60 pl-2.5 text-[11.5px] leading-relaxed text-stone-800">
                  <strong className="text-stone-950">
                    {lang === 'en' ? 'Role: ' : 'Peranmu: '}
                  </strong>
                  {lang === 'en'
                    ? 'Inspect the victim’s recovered phone (at 4% battery) before the culprit wipes it.'
                    : 'Periksa salinan HP korban (baterai tinggal 4%) sebelum isinya dihapus pelaku.'}
                </p>

                {/* Clean numbered ink lines directly on paper — no chunky boxes */}
                <ol className="mt-3.5 divide-y divide-stone-800/12 text-xs">
                  <li className="flex items-start gap-3 py-2.5">
                    <span className="mt-0.5 font-mono text-[11px] font-black text-red-900">01</span>
                    <div>
                      <p className="font-bold text-stone-950">
                        {lang === 'en' ? 'Inspect Apps' : 'Periksa Isi HP'}
                      </p>
                      <p className="text-[11px] text-stone-700">
                        {lang === 'en'
                          ? 'Check Messages, Gallery, Notes, Maps, Browser & Pulse.'
                          : 'Buka Pesan, Galeri, Catatan, Maps, Browser & Pulse.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 py-2.5">
                    <span className="mt-0.5 font-mono text-[11px] font-black text-red-900">02</span>
                    <div>
                      <p className="font-bold text-stone-950">
                        {lang === 'en' ? 'Pin Suspicious Clues' : 'Catat Bukti'}
                      </p>
                      <p className="text-[11px] text-stone-700">
                        {lang === 'en'
                          ? 'Tap "Pin Clue" whenever you spot a lie or odd detail.'
                          : 'Klik "Catat Bukti" tiap nemu kebohongan atau kejanggalan.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 py-2.5">
                    <span className="mt-0.5 font-mono text-[11px] font-black text-red-900">03</span>
                    <div>
                      <p className="font-bold text-stone-950">
                        {lang === 'en' ? 'Crack PINs & Deleted Chats' : 'Buka Kunci & Pulihkan Chat'}
                      </p>
                      <p className="text-[11px] text-stone-700">
                        {lang === 'en'
                          ? 'Find 4-digit PINs for locked Notes & keywords for deleted messages.'
                          : 'Cari PIN 4 digit Catatan & kata kunci chat yang terhapus.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 py-2.5">
                    <span className="mt-0.5 font-mono text-[11px] font-black text-red-900">04</span>
                    <div>
                      <p className="font-bold text-stone-950">
                        {lang === 'en' ? 'Submit Police Report' : 'Kirim Laporan & Raih Rank S'}
                      </p>
                      <p className="text-[11px] text-stone-700">
                        {lang === 'en'
                          ? 'Tap "Solve Case" to accuse the culprit. Zero hints = Rank S.'
                          : 'Klik "Selesaikan Kasus", tebak pelaku tanpa Hint untuk Rank S.'}
                      </p>
                    </div>
                  </li>
                </ol>

                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHowToPlay(false);
                  }}
                  className="mt-4 w-full rounded-md bg-stone-900 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#efe6d2] transition hover:bg-stone-800 active:scale-[0.99]"
                >
                  {lang === 'en' ? 'Got it' : 'Mengerti'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="forensic-grid forensic-noise relative min-h-screen overflow-hidden text-zinc-100">
      {/* Top Bar */}
      <header className="relative z-20 border-b border-zinc-800/70 bg-zinc-950/90 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                sound.playTap();
                setActiveCaseId(null);
                setNotification(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:px-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.backToDesk}</span>
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                Case #{String(activeCase.number).padStart(2, '0')}: {activeCase.title}
              </p>
              <p className="hidden truncate text-[11px] text-zinc-400 sm:block">
                {t.ownerLabel}: {activeCase.ownerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-2 py-1.5 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:px-2.5"
              title={t.switchLang}
            >
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggleMute}
              className="rounded-lg bg-zinc-900 p-1.5 text-zinc-300 transition hover:bg-zinc-800"
              title={muted ? t.muteOn : !audioUnlocked ? t.audioTapHint : t.muteOff}
            >
              {muted ? (
                <VolumeX className="h-4 w-4 text-zinc-500" />
              ) : (
                <span className="relative inline-flex">
                  <Volume2 className="h-4 w-4 text-zinc-200" />
                  {!audioUnlocked && (
                    <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-ping rounded-full bg-red-500" />
                  )}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileCluesOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition lg:hidden ${
                mobileCluesOpen
                  ? 'bg-zinc-800 text-white'
                  : 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
              {activeClues.length}/{activeCase.totalClues}
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setShowDeduction(true);
              }}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-950 transition hover:bg-white sm:px-3.5 sm:text-xs"
            >
              {t.solveCaseBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Clue & Hint Drawer */}
      <AnimatePresence>
        {mobileCluesOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 overflow-hidden border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {t.briefingTitle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-300">{activeCase.briefing}</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold text-emerald-400">
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
                  {activeClues.map((id, idx) => (
                    <li
                      key={id}
                      className="flex items-start gap-2 rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-2 text-xs text-zinc-200"
                    >
                      <span className="mt-0.5 font-mono text-[10px] font-bold text-emerald-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{clueLabelsMap.get(id)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace */}
      <main className="relative z-10 mx-auto grid w-full min-w-0 max-w-6xl gap-6 px-3 py-2.5 sm:gap-8 sm:px-4 sm:py-6 lg:grid-cols-[1fr_336px_1fr] lg:items-start lg:py-8">
        {/* Left: Briefing & Hints */}
        <section className="hidden space-y-4 lg:block">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              <Search className="h-3.5 w-3.5 text-zinc-400" /> {t.briefingTitle}
            </div>
            <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
              {activeCase.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{activeCase.briefing}</p>
            <div className="mt-4 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3 text-[11px] leading-relaxed text-zinc-400">
              <strong className="text-zinc-200">{t.tipsLabel}</strong> {t.tipsText}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                <Lightbulb className="h-3.5 w-3.5" /> {t.hintTitle}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                {t.hintRemaining} {MAX_HINTS - activeHintsUsed}/{MAX_HINTS}
              </span>
            </div>

            {activeHintsUsed > 0 && (
              <div className="mt-3 space-y-2">
                {activeCase.hints.slice(0, activeHintsUsed).map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100"
                  >
                    <strong className="text-amber-300">Hint #{idx + 1}:</strong> {hint}
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={activeHintsUsed >= MAX_HINTS}
              onClick={handleUseHint}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500/15 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {activeHintsUsed >= MAX_HINTS
                ? t.hintExhausted
                : `${t.hintOpenPrefix}${activeHintsUsed + 1} ${t.hintRankNote}`}
            </button>
          </div>
        </section>

        {/* Center: Cloned Phone */}
        <section className="flex w-full min-w-0 justify-center">
          <PhoneFrame
            caseData={activeCase}
            lang={lang}
            discoveredClues={activeClues}
            unlockedNoteIds={activeUnlockedNotes}
            recoveredThreadIds={activeRecoveredThreads}
            typingThreadId={typingThreadId}
            notification={notification}
            onDismissNotification={() => setNotification(null)}
            onDiscoverClue={handleDiscoverClue}
            onUnlockNote={handleUnlockNote}
            onRecoverThread={handleRecoverThread}
          />
        </section>

        {/* Right: Evidence Board */}
        <section className="hidden space-y-4 lg:block">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                <ClipboardList className="h-3.5 w-3.5 text-emerald-400" /> {t.evidenceBoardTitle}
              </div>
              <span className="rounded bg-zinc-900 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-200 ring-1 ring-white/5">
                {activeClues.length}/{activeCase.totalClues}
              </span>
            </div>

            {/* Clean progress bar */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${Math.min(100, (activeClues.length / activeCase.totalClues) * 100)}%`,
                }}
              />
            </div>

            {activeClues.length === 0 ? (
              <p className="mt-4 text-xs leading-relaxed text-zinc-500">{t.evidenceEmpty}</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {activeClues.map((id, idx) => (
                  <li
                    key={id}
                    className="flex items-start gap-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3 text-xs leading-relaxed text-zinc-200"
                  >
                    <span className="mt-0.5 font-mono text-[10px] font-bold text-emerald-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
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

      {/* "Previously on Last Seen..." Cinematic Sequence Modal */}
      <AnimatePresence>
        {activeCase.recap && !dismissedRecaps.includes(activeCase.id) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
            >
              {/* Story Progress Bars */}
              <div className="mb-4 flex gap-1.5">
                {activeCase.recap.points.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800"
                  >
                    {idx < recapStep ? (
                      <div className="h-full w-full bg-red-600" />
                    ) : idx === recapStep ? (
                      <motion.div
                        key={`bar-${activeCase.id}-${recapStep}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: idx === activeCase.recap!.points.length - 1 ? 0.5 : 4.2,
                          ease: 'linear',
                        }}
                        className="h-full bg-red-500"
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                    {activeCase.recap.title}
                  </p>
                  <h2 className="mt-1 text-lg font-black text-white">
                    Case #{String(activeCase.number).padStart(2, '0')}: {activeCase.title}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    sound.playTap();
                    setDismissedRecaps((prev) => [...prev, activeCase.id]);
                  }}
                  className="rounded-md px-2 py-1 font-mono text-[10px] font-semibold text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
                >
                  {lang === 'en' ? 'Skip' : 'Lewati'}
                </button>
              </div>

              {/* Single Animated Scene Beat */}
              <div className="mt-5 min-h-[120px] rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCase.id}-beat-${recapStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    <span className="inline-block rounded bg-red-950/60 px-2 py-0.5 font-mono text-[9.5px] font-bold text-red-300">
                      {lang === 'en' ? `SCENE 0${recapStep + 1}` : `ADEGAN 0${recapStep + 1}`} / 0
                      {activeCase.recap.points.length}
                    </span>
                    <p className="text-[13px] leading-relaxed text-zinc-100">
                      {activeCase.recap.points[recapStep]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                {recapStep > 0 && (
                  <button
                    onClick={() => {
                      sound.playTap();
                      setRecapStep((s) => Math.max(0, s - 1));
                    }}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  >
                    {lang === 'en' ? 'Back' : 'Kembali'}
                  </button>
                )}

                {recapStep < activeCase.recap.points.length - 1 ? (
                  <button
                    onClick={() => {
                      sound.playTap();
                      setRecapStep((s) => s + 1);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3 text-xs font-bold text-zinc-950 transition hover:bg-white active:scale-[0.98]"
                  >
                    {lang === 'en' ? 'Next →' : 'Lanjut →'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playTap();
                      setDismissedRecaps((prev) => [...prev, activeCase.id]);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3 text-xs font-bold text-zinc-950 transition hover:bg-white active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {t.startCase}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
