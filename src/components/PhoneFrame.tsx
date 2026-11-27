import React, { useEffect, useRef, useState } from 'react';
import type { CaseData, PhoneNotification } from '../types/case';
import { UI_STRINGS, type Language } from '../i18n/strings';
import { sound } from '../utils/sound';
import { ChatApp } from './apps/ChatApp';
import { GalleryApp } from './apps/GalleryApp';
import { NotesApp } from './apps/NotesApp';
import { MapsApp } from './apps/MapsApp';
import { BrowserApp } from './apps/BrowserApp';
import { SocialApp } from './apps/SocialApp';
import {
  BrowserAppIcon,
  GalleryAppIcon,
  MapsAppIcon,
  MessagesAppIcon,
  NotesAppIcon,
  SocialAppIcon,
} from './AppIcons';
import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkCheck, ChevronLeft, Delete, HelpCircle, LockOpen, MessageSquareWarning, RotateCcw, Wifi, X } from 'lucide-react';

type ActiveApp = 'home' | 'chat' | 'gallery' | 'notes' | 'maps' | 'browser' | 'social';

interface PhoneFrameProps {
  caseData: CaseData;
  lang: Language;
  discoveredClues: string[];
  unlockedNoteIds: string[];
  recoveredThreadIds: string[];
  typingThreadId?: string | null;
  notification: PhoneNotification | null;
  onDismissNotification: () => void;
  onDiscoverClue: (clueId: string) => void;
  onUnlockNote: (noteId: string) => void;
  onRecoverThread: (threadId: string) => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  caseData,
  lang,
  discoveredClues,
  unlockedNoteIds,
  recoveredThreadIds,
  typingThreadId = null,
  notification,
  onDismissNotification,
  onDiscoverClue,
  onUnlockNote,
  onRecoverThread,
}) => {
  const [activeApp, setActiveApp] = useState<ActiveApp>('home');
  const appHistoryRef = useRef<ActiveApp[]>([]);
  const [backSignal, setBackSignal] = useState<number>(0);
  const [galleryTargetPhotoId, setGalleryTargetPhotoId] = useState<string | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number>(4);
  const [isLockedScreen, setIsLockedScreen] = useState<boolean>(true);
  const [showPasscodePad, setShowPasscodePad] = useState<boolean>(false);
  const [showLockHint, setShowLockHint] = useState<boolean>(false);
  const [lockPin, setLockPin] = useState<string>('');
  const [lockPinError, setLockPinError] = useState<boolean>(false);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const t = UI_STRINGS[lang];

  const expectedLockPin = caseData.lastSeenTime.replace(/\D/g, '').slice(0, 4);

  const triggerGlitch = () => {
    sound.playSubtleGlitch();
    setGlitchActive(true);
    window.setTimeout(() => setGlitchActive(false), 260);
  };

  useEffect(() => {
    setBatteryLevel(4);
    setActiveApp('home');
    appHistoryRef.current = [];
    setBackSignal(0);
    setIsLockedScreen(true);
    setShowPasscodePad(false);
    setShowLockHint(false);
    setLockPin('');
    setLockPinError(false);
    const timer = window.setInterval(() => {
      setBatteryLevel((prev) => (prev > 2 ? prev - 1 : prev));
    }, 90000);
    return () => window.clearInterval(timer);
  }, [caseData.id]);

  useEffect(() => {
    if (batteryLevel < 4) {
      triggerGlitch();
    }
  }, [batteryLevel]);

  useEffect(() => {
    if (notification?.kind === 'alert') {
      triggerGlitch();
    }
  }, [notification?.id]);

  useEffect(() => {
    if (recoveredThreadIds.length > 0) {
      triggerGlitch();
    }
  }, [recoveredThreadIds.length]);

  const openApp = (app: ActiveApp) => {
    sound.playTap();
    if (app === 'home') {
      appHistoryRef.current = [];
      setActiveApp('home');
      return;
    }
    if (activeApp !== app) {
      appHistoryRef.current = [...appHistoryRef.current, activeApp];
    }
    setActiveApp(app);
  };

  const popAppHistory = () => {
    const prev = appHistoryRef.current;
    if (prev.length === 0) {
      setActiveApp('home');
      return;
    }
    const nextApp = prev[prev.length - 1];
    appHistoryRef.current = prev.slice(0, -1);
    setActiveApp(nextApp);
  };

  const handlePhoneBack = () => {
    sound.playTap();
    if (activeApp === 'chat' || activeApp === 'gallery' || activeApp === 'notes') {
      setBackSignal((s) => s + 1);
    } else {
      popAppHistory();
    }
  };

  const openPhotoFromChat = (photoId: string) => {
    sound.playTap();
    appHistoryRef.current = [...appHistoryRef.current, 'chat'];
    setGalleryTargetPhotoId(photoId);
    setActiveApp('gallery');
  };

  const handleLockPinDigit = (digit: string) => {
    if (lockPin.length >= 4) return;
    sound.playPinKey();
    const next = lockPin + digit;
    setLockPin(next);
    setLockPinError(false);

    if (next.length === 4) {
      if (next === expectedLockPin) {
        sound.playPinUnlock();
        window.setTimeout(() => {
          setIsLockedScreen(false);
          setShowPasscodePad(false);
          setLockPin('');
        }, 160);
      } else {
        sound.playPinError();
        setLockPinError(true);
        window.setTimeout(() => {
          setLockPin('');
          setLockPinError(false);
        }, 600);
      }
    }
  };

  const totalUnread = caseData.chats.reduce((acc, c) => acc + (c.unreadCount ?? 0), 0);
  const timeStr = caseData.lastSeenTime.slice(0, 5);

  return (
    <div className="relative mx-auto flex h-[calc(100svh-84px)] min-h-[540px] max-h-[680px] w-full max-w-[380px] flex-col overflow-hidden rounded-[36px] bg-black shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/20 sm:h-[650px] sm:w-[336px] sm:max-w-[336px] sm:rounded-[48px] sm:border-[5px] sm:border-zinc-800">
      {/* Hardware Side Buttons (Desktop) */}
      <div className="pointer-events-none absolute -left-[8px] top-28 hidden h-9 w-[3px] rounded-l bg-zinc-700 sm:block" />
      <div className="pointer-events-none absolute -left-[8px] top-40 hidden h-9 w-[3px] rounded-l bg-zinc-700 sm:block" />
      <div className="pointer-events-none absolute -right-[8px] top-32 hidden h-14 w-[3px] rounded-r bg-zinc-700 sm:block" />

      {/* Subtle Corner Glass Crack */}
      <svg
        className="pointer-events-none absolute right-0 top-0 z-30 h-28 w-28 opacity-20"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M118 6L94 24L80 19L64 38M94 24L103 44"
          stroke="white"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>

      {/* Low Battery (2%) Dimming Vignette */}
      {batteryLevel <= 2 && (
        <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_65px_rgba(0,0,0,0.85)] transition-opacity duration-700" />
      )}

      {/* Brief Horror Screen Glitch / Flicker Overlay */}
      {glitchActive && (
        <div className="pointer-events-none absolute inset-0 z-50 bg-red-950/20 mix-blend-screen">
          <div className="h-full w-full animate-pulse bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_2px,transparent_2px,transparent_6px)]" />
        </div>
      )}

      {/* Victim Phone Lock Screen & Passcode Pad (on Case Entry) */}
      <AnimatePresence>
        {isLockedScreen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.28 }}
            className={`absolute inset-0 z-30 flex flex-col justify-between bg-gradient-to-b ${caseData.wallpaperGradient} px-5 pb-7 pt-12 text-white`}
          >
            <div className="pointer-events-none absolute inset-0 bg-black/55 backdrop-blur-md" />

            {!showPasscodePad ? (
              <>
                <div className="relative z-10 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">
                    {t.phoneCloned}
                  </p>
                  <p className="mt-2 text-5xl font-thin tracking-tight text-white">{timeStr}</p>
                  <p className="mt-1 text-[11px] font-medium text-rose-300/90">
                    ● Last Seen {caseData.lastSeenTime}
                  </p>

                  {/* Last Lockscreen Notification Teaser */}
                  {caseData.chats[0] && (
                    <div className="mt-7 rounded-2xl border border-white/10 bg-black/55 p-3 text-left backdrop-blur-xl">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-zinc-200">{caseData.chats[0].name}</span>
                        <span className="font-mono text-[9px] text-zinc-500">
                          {caseData.chats[0].messages[caseData.chats[0].messages.length - 1]?.time}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] text-zinc-300">
                        {caseData.chats[0].messages[caseData.chats[0].messages.length - 1]?.text}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setShowPasscodePad(true);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 py-3 text-xs font-semibold text-white backdrop-blur-xl ring-1 ring-white/20 transition hover:bg-white/25 active:scale-[0.98]"
                  >
                    <LockOpen className="h-3.5 w-3.5" />
                    {lang === 'en' ? 'Unlock Device' : 'Buka Perangkat'}
                  </button>
                  <span className="font-mono text-[9px] text-zinc-400">
                    {caseData.ownerName} • {batteryLevel}% BAT
                  </span>
                </div>
              </>
            ) : (
              <div className="relative z-10 flex h-full flex-col items-center justify-between pt-2">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center gap-1.5">
                    <p className="text-xs font-semibold text-white">
                      {lang === 'en' ? 'Enter Passcode' : 'Masukkan Kode Sandi'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playTap();
                        setShowLockHint((v) => !v);
                      }}
                      className={`rounded-full p-0.5 transition ${
                        showLockHint
                          ? 'bg-amber-400/20 text-amber-300'
                          : 'text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                      aria-label="Hint"
                      title={lang === 'en' ? 'Hint' : 'Petunjuk'}
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {showLockHint ? (
                    <p className="mt-1.5 text-[10px] text-amber-300/90">
                      {lang === 'en'
                        ? `Last Seen time (${timeStr})`
                        : `Jam Last Seen (${timeStr})`}
                    </p>
                  ) : (
                    <div className="mt-1.5 h-[15px]" />
                  )}

                  {/* 4 Passcode Dots */}
                  <motion.div
                    animate={lockPinError ? { x: [-6, 6, -5, 5, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 flex justify-center gap-4"
                  >
                    {[0, 1, 2, 3].map((idx) => (
                      <span
                        key={idx}
                        className={`h-3 w-3 rounded-full border transition-all ${
                          lockPinError
                            ? 'border-rose-400 bg-rose-500'
                            : idx < lockPin.length
                              ? 'border-white bg-white'
                              : 'border-white/50 bg-transparent'
                        }`}
                      />
                    ))}
                  </motion.div>

                  <p className="mt-2 h-4 text-[10px] font-medium text-rose-400">
                    {lockPinError
                      ? lang === 'en'
                        ? 'Wrong passcode'
                        : 'Sandi salah, coba lagi'
                      : ''}
                  </p>
                </div>

                {/* Circular iOS Passcode Keypad */}
                <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => handleLockPinDigit(digit)}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg font-light text-white backdrop-blur-md transition hover:bg-white/25 active:scale-90"
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setShowPasscodePad(false);
                      setLockPin('');
                    }}
                    className="flex h-14 w-14 items-center justify-center text-[10px] font-medium text-zinc-300 hover:text-white"
                  >
                    {lang === 'en' ? 'Cancel' : 'Batal'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLockPinDigit('0')}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg font-light text-white backdrop-blur-md transition hover:bg-white/25 active:scale-90"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setLockPin((p) => p.slice(0, -1));
                    }}
                    className="flex h-14 w-14 items-center justify-center text-zinc-300 hover:text-white active:scale-90"
                    aria-label="Backspace"
                  >
                    <Delete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rich Push Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            onClick={() => {
              if (notification.kind === 'alert') {
                sound.playTap();
                setActiveApp('chat');
              }
              onDismissNotification();
            }}
            className={`absolute inset-x-3 top-10 z-40 cursor-pointer overflow-hidden rounded-2xl p-3 shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${
              notification.kind === 'alert'
                ? 'border border-red-500/40 bg-zinc-900/95'
                : 'border border-white/15 bg-zinc-900/95'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
                  notification.kind === 'alert'
                    ? 'bg-red-500/20 text-red-400'
                    : notification.kind === 'unlock'
                      ? 'bg-amber-500/20 text-amber-300'
                      : notification.kind === 'recover'
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {notification.kind === 'alert' ? (
                  <MessageSquareWarning className="h-3.5 w-3.5" />
                ) : notification.kind === 'unlock' ? (
                  <LockOpen className="h-3.5 w-3.5" />
                ) : notification.kind === 'recover' ? (
                  <RotateCcw className="h-3.5 w-3.5" />
                ) : (
                  <BookmarkCheck className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-[10px] font-bold uppercase tracking-wider ${
                      notification.kind === 'alert'
                        ? 'text-red-300'
                        : notification.kind === 'unlock'
                          ? 'text-amber-300'
                          : notification.kind === 'recover'
                            ? 'text-sky-300'
                            : 'text-emerald-400'
                    }`}
                  >
                    {notification.title}
                  </span>
                  <span className="shrink-0 font-mono text-[9px] text-zinc-500">
                    {notification.time ?? (lang === 'en' ? 'now' : 'baru saja')}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-100">
                  {notification.body}
                </p>
                {notification.kind === 'alert' && (
                  <p className="mt-1 text-[9px] font-medium text-zinc-400">
                    {lang === 'en' ? 'Tap to open Messages →' : 'Ketuk untuk buka Pesan →'}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismissNotification();
                }}
                className="rounded-md p-0.5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realistic Status Bar */}
      <div className="z-20 flex shrink-0 items-center justify-between bg-black/40 px-6 pb-1.5 pt-3 text-[11px] font-semibold text-white backdrop-blur-md">
        <span className="tracking-tight">{timeStr}</span>

        {/* Dynamic Island */}
        <div className="flex h-[18px] w-[76px] items-center justify-end rounded-full bg-black px-2 ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full bg-zinc-900 ring-1 ring-zinc-700/60" />
        </div>

        {/* Signal + Wifi + 4% Battery */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-[1.5px]">
            <span className="h-1 w-[2px] rounded-full bg-white" />
            <span className="h-1.5 w-[2px] rounded-full bg-white" />
            <span className="h-2 w-[2px] rounded-full bg-white/35" />
            <span className="h-2.5 w-[2px] rounded-full bg-white/35" />
          </div>
          <Wifi className="h-3 w-3 text-white" />
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] font-bold text-rose-400">{batteryLevel}%</span>
            <div className="flex h-[10px] w-[18px] items-center rounded-[3px] border border-white/40 p-[1.5px]">
              <div
                className="h-full rounded-[1px] bg-rose-500 transition-all"
                style={{ width: `${Math.max(2, batteryLevel)}px` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeApp === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br ${caseData.wallpaperGradient} px-4 pb-3 pt-4`}
            >
              {/* Soft Wallpaper Depth */}
              <div className="pointer-events-none absolute -left-12 top-6 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 bottom-16 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />

              {/* Top Natural Home Grid & Widgets */}
              <div className="relative z-10 space-y-5">
                {/* Clock / Owner / Evidence Progress Widget */}
                <div className="rounded-2xl bg-black/35 px-4 py-3.5 backdrop-blur-xl ring-1 ring-white/10">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[32px] font-thin tracking-tight text-white">{timeStr}</span>
                    <span className="text-[9px] font-medium uppercase tracking-wider text-white/55">
                      {caseData.ownerName}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <p className="text-[10px] text-rose-300/85">
                      ● Last Seen {caseData.lastSeenTime}
                    </p>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-300">
                      {t.evidenceBtn}: {discoveredClues.length}/{caseData.totalClues}
                    </span>
                  </div>
                </div>

                {/* Case-Specific Apps (No duplicates with Dock!) */}
                {(Boolean(caseData.locations?.length) ||
                  Boolean(caseData.browserHistory?.length) ||
                  Boolean(caseData.socialPosts?.length)) && (
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 px-0.5">
                    {caseData.locations && caseData.locations.length > 0 && (
                      <button
                        onClick={() => openApp('maps')}
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div className="h-[52px] w-[52px] overflow-hidden rounded-[14px] shadow-lg transition group-hover:scale-105 group-active:scale-90">
                          <MapsAppIcon />
                        </div>
                        <span className="text-[9.5px] font-medium leading-none text-white/90 drop-shadow-sm">
                          {t.appMaps}
                        </span>
                      </button>
                    )}

                    {caseData.browserHistory && caseData.browserHistory.length > 0 && (
                      <button
                        onClick={() => openApp('browser')}
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div className="h-[52px] w-[52px] overflow-hidden rounded-[14px] shadow-lg transition group-hover:scale-105 group-active:scale-90">
                          <BrowserAppIcon />
                        </div>
                        <span className="text-[9.5px] font-medium leading-none text-white/90 drop-shadow-sm">
                          {t.appBrowser}
                        </span>
                      </button>
                    )}

                    {caseData.socialPosts && caseData.socialPosts.length > 0 && (
                      <button
                        onClick={() => openApp('social')}
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div className="h-[52px] w-[52px] overflow-hidden rounded-[14px] shadow-lg transition group-hover:scale-105 group-active:scale-90">
                          <SocialAppIcon />
                        </div>
                        <span className="text-[9.5px] font-medium leading-none text-white/90 drop-shadow-sm">
                          {t.appSocial}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Frosted Dock (3 Core Victim Phone Apps) */}
              <div className="relative z-10 grid grid-cols-3 gap-2 rounded-[24px] bg-white/12 px-4 py-2.5 backdrop-blur-2xl ring-1 ring-white/10">
                <button
                  onClick={() => openApp('chat')}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="relative h-[48px] w-[48px] transition group-hover:scale-105 group-active:scale-90">
                    <div className="h-full w-full overflow-hidden rounded-[13px] shadow-md">
                      <MessagesAppIcon />
                    </div>
                    {totalUnread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow-md">
                        {totalUnread}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-medium text-white/85">{t.appMessages}</span>
                </button>

                <button
                  onClick={() => {
                    setGalleryTargetPhotoId(null);
                    openApp('gallery');
                  }}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="h-[48px] w-[48px] overflow-hidden rounded-[13px] shadow-md transition group-hover:scale-105 group-active:scale-90">
                    <GalleryAppIcon />
                  </div>
                  <span className="text-[9px] font-medium text-white/85">{t.appGallery}</span>
                </button>

                <button
                  onClick={() => openApp('notes')}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="h-[48px] w-[48px] overflow-hidden rounded-[13px] shadow-md transition group-hover:scale-105 group-active:scale-90">
                    <NotesAppIcon />
                  </div>
                  <span className="text-[9px] font-medium text-white/85">{t.appNotes}</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeApp === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <ChatApp
                lang={lang}
                threads={caseData.chats}
                photos={caseData.photos}
                discoveredClues={discoveredClues}
                recoveredThreadIds={recoveredThreadIds}
                typingThreadId={typingThreadId}
                backSignal={backSignal}
                onBackAtRoot={popAppHistory}
                onDiscoverClue={onDiscoverClue}
                onRecoverThread={onRecoverThread}
                onOpenPhoto={openPhotoFromChat}
              />
            </motion.div>
          )}

          {activeApp === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <GalleryApp
                lang={lang}
                photos={caseData.photos}
                initialPhotoId={galleryTargetPhotoId}
                discoveredClues={discoveredClues}
                backSignal={backSignal}
                onBackAtRoot={popAppHistory}
                onDiscoverClue={onDiscoverClue}
              />
            </motion.div>
          )}

          {activeApp === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <NotesApp
                lang={lang}
                notes={caseData.notes}
                unlockedNoteIds={unlockedNoteIds}
                discoveredClues={discoveredClues}
                backSignal={backSignal}
                onBackAtRoot={popAppHistory}
                onUnlockNote={onUnlockNote}
                onDiscoverClue={onDiscoverClue}
              />
            </motion.div>
          )}

          {activeApp === 'maps' && caseData.locations && (
            <motion.div
              key="maps"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <MapsApp
                lang={lang}
                locations={caseData.locations}
                discoveredClues={discoveredClues}
                onDiscoverClue={onDiscoverClue}
              />
            </motion.div>
          )}

          {activeApp === 'browser' && caseData.browserHistory && (
            <motion.div
              key="browser"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <BrowserApp
                lang={lang}
                history={caseData.browserHistory}
                discoveredClues={discoveredClues}
                onDiscoverClue={onDiscoverClue}
              />
            </motion.div>
          )}

          {activeApp === 'social' && caseData.socialPosts && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <SocialApp
                lang={lang}
                posts={caseData.socialPosts}
                discoveredClues={discoveredClues}
                onDiscoverClue={onDiscoverClue}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar (Back + Home Gesture Bar) */}
      <div className="z-20 flex shrink-0 items-center justify-between bg-black/95 px-4 pb-2 pt-1.5">
        {activeApp !== 'home' ? (
          <button
            onClick={handlePhoneBack}
            className="inline-flex w-16 items-center gap-0.5 rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-zinc-800 hover:text-white active:scale-95"
            aria-label={lang === 'en' ? 'Back' : 'Kembali'}
          >
            <ChevronLeft className="h-3 w-3" />
            {lang === 'en' ? 'Back' : 'Kembali'}
          </button>
        ) : (
          <div className="w-16" />
        )}

        <button
          onClick={() => openApp('home')}
          className="group flex flex-col items-center gap-1 px-4 py-1"
          aria-label={t.homeScreen}
        >
          <div className="h-1 w-24 rounded-full bg-zinc-600 transition group-hover:bg-white" />
        </button>

        <div className="w-16" />
      </div>
    </div>
  );
};
