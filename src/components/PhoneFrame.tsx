import React, { useState } from 'react';
import type { CaseData } from '../types/case';
import { UI_STRINGS, type Language } from '../i18n/strings';
import { sound } from '../utils/sound';
import { ChatApp } from './apps/ChatApp';
import { GalleryApp } from './apps/GalleryApp';
import { NotesApp } from './apps/NotesApp';
import { MapsApp } from './apps/MapsApp';
import { BrowserApp } from './apps/BrowserApp';
import {
  BrowserAppIcon,
  GalleryAppIcon,
  MapsAppIcon,
  MessagesAppIcon,
  NotesAppIcon,
  ReportAppIcon,
} from './AppIcons';
import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkCheck, Wifi } from 'lucide-react';

type ActiveApp = 'home' | 'chat' | 'gallery' | 'notes' | 'maps' | 'browser';

interface PhoneFrameProps {
  caseData: CaseData;
  lang: Language;
  discoveredClues: string[];
  unlockedNoteIds: string[];
  recoveredThreadIds: string[];
  toastMessage: string | null;
  onDiscoverClue: (clueId: string) => void;
  onUnlockNote: (noteId: string) => void;
  onRecoverThread: (threadId: string) => void;
  onOpenDeduction: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  caseData,
  lang,
  discoveredClues,
  unlockedNoteIds,
  recoveredThreadIds,
  toastMessage,
  onDiscoverClue,
  onUnlockNote,
  onRecoverThread,
  onOpenDeduction,
}) => {
  const [activeApp, setActiveApp] = useState<ActiveApp>('home');
  const [galleryTargetPhotoId, setGalleryTargetPhotoId] = useState<string | null>(null);
  const t = UI_STRINGS[lang];

  const openApp = (app: ActiveApp) => {
    sound.playTap();
    setActiveApp(app);
  };

  const openPhotoFromChat = (photoId: string) => {
    sound.playTap();
    setGalleryTargetPhotoId(photoId);
    setActiveApp('gallery');
  };

  const totalUnread = caseData.chats.reduce((acc, c) => acc + (c.unreadCount ?? 0), 0);
  const timeStr = caseData.lastSeenTime.slice(0, 5);

  return (
    <div className="relative mx-auto flex h-[calc(100dvh-84px)] min-h-[540px] max-h-[680px] w-full max-w-[380px] flex-col overflow-hidden rounded-[36px] bg-black shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/20 sm:h-[650px] sm:max-w-[336px] sm:rounded-[48px] sm:border-[5px] sm:border-zinc-800">
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

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-x-3.5 top-10 z-40 flex items-center gap-2.5 rounded-2xl bg-zinc-900/95 px-3.5 py-2.5 text-[11px] font-medium text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-xl"
          >
            <BookmarkCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realistic Status Bar */}
      <div className="z-20 flex items-center justify-between bg-black/40 px-6 pb-1.5 pt-3 text-[11px] font-semibold text-white backdrop-blur-md">
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
            <span className="text-[9px] font-bold text-rose-400">4%</span>
            <div className="flex h-[10px] w-[18px] items-center rounded-[3px] border border-white/40 p-[1.5px]">
              <div className="h-full w-[3px] rounded-[1px] bg-rose-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative flex-1 overflow-hidden">
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
                {/* Minimalist Clock / Owner Widget */}
                <div className="rounded-3xl bg-black/25 px-4 py-3.5 backdrop-blur-xl">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-light tracking-tight text-white">{timeStr}</span>
                    <span className="text-[10px] font-medium text-white/60">
                      {caseData.ownerName}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-rose-300/90">
                    Last Seen {caseData.lastSeenTime}
                  </p>
                </div>

                {/* App Grid (4 columns) */}
                <div className="grid grid-cols-4 gap-y-4 px-1">
                  <button
                    onClick={() => openApp('notes')}
                    className="group flex flex-col items-center gap-1"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                      <NotesAppIcon />
                    </div>
                    <span className="text-[10px] font-medium text-white/90 drop-shadow">
                      {t.appNotes}
                    </span>
                  </button>

                  {caseData.locations && caseData.locations.length > 0 && (
                    <button
                      onClick={() => openApp('maps')}
                      className="group flex flex-col items-center gap-1"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                        <MapsAppIcon />
                      </div>
                      <span className="text-[10px] font-medium text-white/90 drop-shadow">
                        {t.appMaps}
                      </span>
                    </button>
                  )}

                  {caseData.browserHistory && caseData.browserHistory.length > 0 && (
                    <button
                      onClick={() => openApp('browser')}
                      className="group flex flex-col items-center gap-1"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                        <BrowserAppIcon />
                      </div>
                      <span className="text-[10px] font-medium text-white/90 drop-shadow">
                        {t.appBrowser}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      sound.playTap();
                      onOpenDeduction();
                    }}
                    className="group flex flex-col items-center gap-1"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                      <ReportAppIcon />
                    </div>
                    <span className="text-[10px] font-medium text-white/90 drop-shadow">
                      {lang === 'en' ? 'Report' : 'Lapor'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Frosted Dock */}
              <div className="relative z-10 flex items-center justify-around rounded-[26px] bg-white/15 px-3 py-2.5 backdrop-blur-2xl">
                <button
                  onClick={() => openApp('chat')}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="relative h-12 w-12 transition group-hover:scale-105 group-active:scale-95">
                    <div className="h-full w-full overflow-hidden rounded-[14px] shadow-md">
                      <MessagesAppIcon />
                    </div>
                    {totalUnread > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow">
                        {totalUnread}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => {
                    setGalleryTargetPhotoId(null);
                    openApp('gallery');
                  }}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                    <GalleryAppIcon />
                  </div>
                </button>

                <button
                  onClick={() => openApp('notes')}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                    <NotesAppIcon />
                  </div>
                </button>

                <button
                  onClick={() => {
                    sound.playTap();
                    onOpenDeduction();
                  }}
                  className="group flex flex-col items-center gap-1"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-[14px] shadow-md transition group-hover:scale-105 group-active:scale-95">
                    <ReportAppIcon />
                  </div>
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
        </AnimatePresence>
      </div>

      {/* Bottom Gesture Home Bar */}
      <div className="z-20 flex flex-col items-center justify-center bg-black/90 pb-2 pt-1.5">
        <button
          onClick={() => openApp('home')}
          className="group flex flex-col items-center gap-1 px-8 py-0.5"
          aria-label={t.homeScreen}
        >
          <div className="h-1 w-28 rounded-full bg-zinc-500/80 transition group-hover:bg-white" />
          {activeApp !== 'home' && (
            <span className="text-[9px] font-medium text-zinc-500 group-hover:text-zinc-300">
              {t.homeScreen}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
