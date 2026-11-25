import React, { useState } from 'react';
import type { NoteItem } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import { motion } from 'framer-motion';
import { ArrowLeft, BookmarkCheck, BookmarkPlus, Delete, Lock, Unlock } from 'lucide-react';

interface NotesAppProps {
  lang: Language;
  notes: NoteItem[];
  unlockedNoteIds: string[];
  discoveredClues: string[];
  onUnlockNote: (noteId: string) => void;
  onDiscoverClue: (clueId: string) => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({
  lang,
  notes,
  unlockedNoteIds,
  discoveredClues,
  onUnlockNote,
  onDiscoverClue,
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const t = UI_STRINGS[lang].notes;
  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;

  const handleDigit = (digit: string) => {
    if (!selectedNote || pinInput.length >= 4) return;
    sound.playPinKey();
    const next = pinInput + digit;
    setPinInput(next);
    setPinError(false);

    if (next.length === 4) {
      if (next === selectedNote.pinCode) {
        sound.playPinUnlock();
        onUnlockNote(selectedNote.id);
        setPinInput('');
      } else {
        sound.playPinError();
        setPinError(true);
        setTimeout(() => {
          setPinInput('');
          setPinError(false);
        }, 650);
      }
    }
  };

  if (!selectedNote) {
    return (
      <div className="flex h-full flex-col bg-zinc-950">
        <div className="px-4 pb-2.5 pt-3.5">
          <h2 className="text-lg font-bold tracking-tight text-amber-400">{t.title}</h2>
          <p className="text-[11px] text-zinc-400">{t.subtitle}</p>
        </div>

        <div className="phone-scroll flex-1 divide-y divide-white/[0.06] overflow-y-auto px-3">
          {notes.map((note) => {
            const isUnlocked = !note.isLocked || unlockedNoteIds.includes(note.id);
            return (
              <button
                key={note.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedNoteId(note.id);
                  setPinInput('');
                  setPinError(false);
                }}
                className="flex w-full items-start justify-between gap-2 px-2 py-3 text-left transition hover:bg-white/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-zinc-100">{note.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-400">
                    {isUnlocked ? note.content : t.lockedPreview}
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-500">{note.updatedAt}</p>
                </div>
                <div className="shrink-0 pt-0.5">
                  {isUnlocked ? (
                    <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-amber-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const isUnlocked = !selectedNote.isLocked || unlockedNoteIds.includes(selectedNote.id);
  const isClueFound = selectedNote.clueId ? discoveredClues.includes(selectedNote.clueId) : false;

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          onClick={() => setSelectedNoteId(null)}
          className="inline-flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-amber-400 transition hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.title}</span>
        </button>
      </div>

      {!isUnlocked ? (
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
          <Lock className="h-6 w-6 text-amber-400" />
          <p className="mt-2.5 text-xs font-semibold text-white">{t.enterPin}</p>
          {selectedNote.pinHint && (
            <p className="mt-1 max-w-[230px] text-[10.5px] leading-relaxed text-zinc-400">
              {selectedNote.pinHint}
            </p>
          )}

          <motion.div
            animate={pinError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-4 flex gap-3.5"
          >
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`h-3 w-3 rounded-full border transition ${
                  pinError
                    ? 'border-rose-500 bg-rose-500'
                    : idx < pinInput.length
                      ? 'border-white bg-white'
                      : 'border-zinc-500 bg-transparent'
                }`}
              />
            ))}
          </motion.div>
          {pinError && <p className="mt-2 text-[11px] text-rose-400">{t.wrongPin}</p>}

          <div className="mt-5 grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleDigit(digit)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-base font-medium text-white transition hover:bg-white/20 active:scale-95"
              >
                {digit}
              </button>
            ))}
            <div />
            <button
              onClick={() => handleDigit('0')}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-base font-medium text-white transition hover:bg-white/20 active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => setPinInput((p) => p.slice(0, -1))}
              className="flex h-12 w-12 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 active:scale-95"
              aria-label="Delete"
            >
              <Delete className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="phone-scroll flex-1 overflow-y-auto px-4 pb-4 pt-1">
          <p className="text-center text-[10px] text-zinc-500">
            {t.updatedAt} {selectedNote.updatedAt}
          </p>
          <h3 className="mt-2 text-base font-bold text-white">{selectedNote.title}</h3>
          <div className="mt-3 whitespace-pre-line text-xs leading-relaxed text-zinc-200">
            {selectedNote.content}
          </div>

          {selectedNote.clueId && (
            <button
              onClick={() => onDiscoverClue(selectedNote.clueId!)}
              className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition ${
                isClueFound
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
              }`}
            >
              {isClueFound ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5" /> {t.alreadyRecorded}
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-3.5 w-3.5" /> {t.recordNote}
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
