import React, { useEffect, useRef, useState } from 'react';
import type { CaseFileItem } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  FileArchive,
  FileText,
  HelpCircle,
  Lock,
  LockOpen,
} from 'lucide-react';

interface FilesAppProps {
  lang: Language;
  files: CaseFileItem[];
  discoveredClues: string[];
  backSignal?: number;
  onBackAtRoot?: () => void;
  onDiscoverClue: (clueId?: string) => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({
  lang,
  files,
  discoveredClues,
  backSignal = 0,
  onBackAtRoot,
  onDiscoverClue,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const prevBackRef = useRef(backSignal);

  useEffect(() => {
    if (backSignal === prevBackRef.current) return;
    prevBackRef.current = backSignal;
    if (selectedId !== null) {
      setSelectedId(null);
      setPasswordInput('');
      setPasswordError(false);
      setShowHint(false);
    } else {
      onBackAtRoot?.();
    }
  }, [backSignal, selectedId, onBackAtRoot]);

  const selectedFile = files.find((f) => f.id === selectedId) ?? null;

  const renderFileIcon = (type: CaseFileItem['fileType']) => {
    if (type === 'zip') return <FileArchive className="h-4 w-4 text-amber-400" />;
    if (type === 'pdf') return <FileText className="h-4 w-4 text-rose-400" />;
    return <FileText className="h-4 w-4 text-sky-400" />;
  };

  if (!selectedFile) {
    return (
      <div className="flex h-full flex-col bg-zinc-950">
        <div className="border-b border-white/[0.06] bg-zinc-900/80 px-4 pb-3 pt-3.5">
          <h2 className="text-lg font-bold tracking-tight text-white">
            {lang === 'en' ? 'Files' : 'Berkas'}
          </h2>
          <p className="text-[11px] text-zinc-400">
            {lang === 'en' ? 'Downloaded documents & archives' : 'Dokumen & arsip terunduh'}
          </p>
        </div>

        <div className="phone-scroll flex-1 divide-y divide-white/[0.06] overflow-y-auto px-3 py-1">
          {files.map((file) => {
            const isUnlocked = !file.isLocked || unlockedIds.includes(file.id);
            const isFound = file.clueId ? discoveredClues.includes(file.clueId) : false;

            return (
              <button
                key={file.id}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedId(file.id);
                  setPasswordInput('');
                  setPasswordError(false);
                  setShowHint(false);
                }}
                className="flex w-full items-center justify-between gap-3 py-3 text-left transition hover:bg-white/[0.03]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 ring-1 ring-white/10">
                    {renderFileIcon(file.fileType)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-zinc-100">{file.filename}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-zinc-500">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {!isUnlocked ? (
                    <Lock className="h-3.5 w-3.5 text-amber-400" />
                  ) : isFound ? (
                    <BookmarkCheck className="h-3.5 w-3.5 text-emerald-400" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const isUnlocked = !selectedFile.isLocked || unlockedIds.includes(selectedFile.id);
  const isFound = selectedFile.clueId ? discoveredClues.includes(selectedFile.clueId) : false;
  const isStarred = isFound || starredIds.includes(selectedFile.id);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile.password) return;
    if (passwordInput.trim().toUpperCase() === selectedFile.password.toUpperCase()) {
      sound.playPinUnlock();
      setUnlockedIds((prev) => [...prev, selectedFile.id]);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      sound.playPinError();
      setPasswordError(true);
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] bg-zinc-900/80 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-zinc-300 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="truncate max-w-[170px] font-mono text-[11px]">{selectedFile.filename}</span>
        </button>

        {isUnlocked && (
          <button
            type="button"
            onClick={() => {
              if (selectedFile.clueId) {
                onDiscoverClue(selectedFile.clueId);
              } else {
                const currently = starredIds.includes(selectedFile.id);
                if (!currently) {
                  onDiscoverClue(undefined);
                } else {
                  sound.playTap();
                }
                setStarredIds((prev) =>
                  currently
                    ? prev.filter((id) => id !== selectedFile.id)
                    : [...prev, selectedFile.id]
                );
              }
            }}
            className={`rounded-lg p-1.5 transition ${
              isFound
                ? 'bg-emerald-500/15 text-emerald-400'
                : isStarred
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
            }`}
            aria-label="Bookmark file"
          >
            {isFound ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
            )}
          </button>
        )}
      </div>

      <div className="phone-scroll flex-1 overflow-y-auto p-4">
        {!isUnlocked ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
              <Lock className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-bold text-white">
              {lang === 'en' ? 'Encrypted Document' : 'Dokumen Terenkripsi'}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">
              {lang === 'en'
                ? 'Enter the password to open this file.'
                : 'Masukkan kata sandi untuk membuka berkas ini.'}
            </p>

            {selectedFile.passwordHint && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setShowHint((v) => !v);
                  }}
                  className="inline-flex items-center gap-1 text-[10.5px] font-medium text-amber-300/90 hover:text-amber-200"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {lang === 'en' ? 'Password Hint' : 'Petunjuk Sandi'}
                </button>
                {showHint && (
                  <p className="mt-1.5 rounded-lg bg-black/40 p-2 text-[10.5px] text-amber-200/90">
                    {selectedFile.passwordHint}
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleUnlock} className="mt-4 space-y-2">
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder={lang === 'en' ? 'Password...' : 'Kata sandi...'}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-center font-mono text-xs text-white placeholder:text-zinc-500 focus:border-sky-400 focus:outline-none"
              />
              {passwordError && (
                <p className="text-[10.5px] text-rose-400">
                  {lang === 'en' ? 'Incorrect password.' : 'Kata sandi salah.'}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-500 py-2 text-xs font-bold text-zinc-950 transition hover:bg-sky-400"
              >
                <LockOpen className="h-3.5 w-3.5" />
                {lang === 'en' ? 'Unlock File' : 'Buka Berkas'}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                {selectedFile.fileType.toUpperCase()} • {selectedFile.size}
              </span>
              <span className="font-mono text-[10px] text-zinc-500">{selectedFile.date}</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-200">
              {selectedFile.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
