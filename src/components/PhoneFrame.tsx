import React, { useState } from 'react';
import type { CaseData } from '../types/case';
import { UI_STRINGS, type Language } from '../i18n/strings';
import { sound } from '../utils/sound';
import { ChatApp } from './apps/ChatApp';
import { GalleryApp } from './apps/GalleryApp';
import { NotesApp } from './apps/NotesApp';
import { MapsApp } from './apps/MapsApp';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BatteryMedium,
  BookmarkCheck,
  FileCheck2,
  Home,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  StickyNote,
  Wifi,
} from 'lucide-react';

type ActiveApp = 'home' | 'chat' | 'gallery' | 'notes' | 'maps';

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

  return (
    <div className="relative mx-auto flex h-[640px] w-full max-w-[340px] flex-col overflow-hidden rounded-[42px] border-[6px] border-zinc-800/90 bg-zinc-950 shadow-[0_0_80px_-18px_rgba(16,185,129,0.28),0_25px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-emerald-400/15">
      {/* Subtle Cracked Glass, Scanlines & Vignette Overlay */}
      <svg
        className="pointer-events-none absolute right-0 top-0 z-30 h-36 w-36 opacity-25"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M118 8L92 28L76 22L58 46M92 28L102 52L86 70M115 36L96 42"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <div className="screen-scanlines pointer-events-none absolute inset-0 z-20 opacity-20" />
      <div className="pointer-events-none absolute inset-0 z-20 rounded-[36px] shadow-[inset_0_0_38px_rgba(0,0,0,0.65)]" />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-x-4 top-11 z-40 flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-zinc-900/95 px-3 py-2 text-[11px] font-semibold text-emerald-200 shadow-lg backdrop-blur-md"
          >
            <BookmarkCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="z-20 flex items-center justify-between bg-black/60 px-6 pb-2 pt-3 text-[11px] font-medium text-zinc-200 backdrop-blur-md">
        <span className="font-mono tracking-tight">{caseData.lastSeenTime.slice(0, 5)}</span>
        <div className="flex h-4 w-20 items-center justify-end rounded-full bg-black px-2 ring-1 ring-zinc-800">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Wifi className="h-3.5 w-3.5" />
          <BatteryMedium className="h-4 w-4 animate-pulse text-rose-400" />
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeApp === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              className={`flex h-full flex-col justify-between bg-gradient-to-b ${caseData.wallpaperGradient} p-5`}
            >
              <div className="relative mt-3 text-center">
                <div className="pointer-events-none absolute left-1/2 top-4 h-28 w-28 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-2xl" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/85">
                  {t.phoneCloned}
                </p>
                <p className="mt-1.5 font-mono text-4xl font-black tracking-tight text-white/95">
                  {caseData.lastSeenTime.slice(0, 5)}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-zinc-200">{caseData.ownerName}</h3>
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] text-rose-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  Last Seen: {caseData.lastSeenTime}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 px-1">
                <button
                  onClick={() => openApp('chat')}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 transition group-hover:scale-105 group-active:scale-95">
                    <MessageSquare className="h-7 w-7" />
                    {totalUnread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-zinc-950">
                        {totalUnread}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-200">{t.appMessages}</span>
                </button>

                <button
                  onClick={() => {
                    setGalleryTargetPhotoId(null);
                    openApp('gallery');
                  }}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-950/50 transition group-hover:scale-105 group-active:scale-95">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-200">{t.appGallery}</span>
                </button>

                <button
                  onClick={() => openApp('notes')}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-zinc-950 shadow-lg shadow-amber-950/50 transition group-hover:scale-105 group-active:scale-95">
                    <StickyNote className="h-7 w-7" />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-200">{t.appNotes}</span>
                </button>

                {caseData.locations && caseData.locations.length > 0 && (
                  <button
                    onClick={() => openApp('maps')}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-950/50 transition group-hover:scale-105 group-active:scale-95">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <span className="text-[11px] font-medium text-zinc-200">{t.appMaps}</span>
                  </button>
                )}
              </div>

              <div className="mb-2">
                <button
                  onClick={() => {
                    sound.playTap();
                    onOpenDeduction();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-200 backdrop-blur-md transition hover:bg-emerald-500/30 active:scale-[0.98]"
                >
                  <FileCheck2 className="h-4 w-4" />
                  {t.reportBtn}
                </button>
              </div>
            </motion.div>
          )}

          {activeApp === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
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
        </AnimatePresence>
      </div>

      {/* Bottom Home Navigation */}
      <div className="z-20 flex items-center justify-center border-t border-zinc-900 bg-black/80 py-2.5 backdrop-blur-md">
        <button
          onClick={() => openApp('home')}
          className="flex items-center gap-1.5 rounded-full px-5 py-1 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
        >
          <Home className="h-3.5 w-3.5" />
          <span>{t.homeScreen}</span>
        </button>
      </div>
    </div>
  );
};
