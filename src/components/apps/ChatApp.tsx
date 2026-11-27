import React, { useEffect, useState } from 'react';
import type { ChatMessage, ChatThread, PhotoEvidence } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  CheckCheck,
  Image as ImageIcon,
  Mic,
  Play,
  RotateCcw,
  Square,
  Trash2,
  Users,
} from 'lucide-react';

interface ChatAppProps {
  lang: Language;
  threads: ChatThread[];
  photos: PhotoEvidence[];
  discoveredClues: string[];
  recoveredThreadIds: string[];
  typingThreadId?: string | null;
  onDiscoverClue: (clueId: string) => void;
  onRecoverThread: (threadId: string) => void;
  onOpenPhoto: (photoId: string) => void;
}

export const ChatApp: React.FC<ChatAppProps> = ({
  lang,
  threads,
  photos,
  discoveredClues,
  recoveredThreadIds,
  typingThreadId = null,
  onDiscoverClue,
  onRecoverThread,
  onOpenPhoto,
}) => {
  const t = UI_STRINGS[lang].chat;
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [playedVoiceIds, setPlayedVoiceIds] = useState<string[]>([]);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordError, setKeywordError] = useState(false);

  useEffect(() => {
    return () => {
      sound.stopVoiceNote();
    };
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !activeThread.recoveryKeyword) return;
    if (keywordInput.trim().toUpperCase() === activeThread.recoveryKeyword.toUpperCase()) {
      sound.playPinUnlock();
      onRecoverThread(activeThread.id);
      setKeywordInput('');
      setKeywordError(false);
    } else {
      sound.playPinError();
      setKeywordError(true);
    }
  };

  if (!activeThread) {
    return (
      <div className="flex h-full flex-col bg-[#0b141a]">
        <div className="bg-[#111b21] px-4 pb-3 pt-3.5">
          <h2 className="text-lg font-bold tracking-tight text-white">{t.title}</h2>
          <p className="text-[11px] text-zinc-400">{t.subtitle}</p>
        </div>

        <div className="phone-scroll flex-1 divide-y divide-white/[0.06] overflow-y-auto">
          {threads.map((thread) => {
            const isRecovered = recoveredThreadIds.includes(thread.id);
            const allMsgs =
              isRecovered && thread.deletedMessages
                ? [...thread.messages, ...thread.deletedMessages]
                : thread.messages;
            const lastMsg = allMsgs[allMsgs.length - 1];
            const cluesInThread = allMsgs.filter((m) => m.clueId).length;
            const foundInThread = allMsgs.filter(
              (m) => m.clueId && discoveredClues.includes(m.clueId)
            ).length;

            return (
              <button
                key={thread.id}
                onClick={() => {
                  sound.playTap();
                  setActiveThreadId(thread.id);
                  setKeywordInput('');
                  setKeywordError(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.04] active:bg-white/[0.07]"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold ${thread.avatarColor}`}
                >
                  {thread.isGroup ? <Users className="h-5 w-5" /> : thread.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-semibold text-zinc-100">
                      {thread.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-zinc-500">{lastMsg?.time}</span>
                  </div>
                  {typingThreadId === thread.id ? (
                    <p className="mt-0.5 truncate text-xs font-medium italic text-emerald-400">
                      {lang === 'en' ? 'typing...' : 'sedang mengetik...'}
                    </p>
                  ) : (
                    <p className="mt-0.5 truncate text-xs text-zinc-400">
                      {lastMsg?.senderType === 'owner' ? `${t.ownerPrefix} ` : ''}
                      {lastMsg?.text}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    {cluesInThread > 0 && (
                      <span className="text-[10px] font-medium text-emerald-400/90">
                        {t.evidencePrefix} {foundInThread}/{cluesInThread}
                      </span>
                    )}
                    {thread.deletedMessages && !isRecovered && (
                      <span className="inline-flex items-center gap-1 rounded bg-rose-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-rose-300">
                        <Trash2 className="h-2.5 w-2.5" /> {thread.deletedMessages.length} {t.deletedBadge}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const isRecovered = recoveredThreadIds.includes(activeThread.id);
  const renderMessageBubble = (msg: ChatMessage, isDeleted = false) => {
    const isOwner = msg.senderType === 'owner';
    const isClueFound = msg.clueId ? discoveredClues.includes(msg.clueId) : false;
    const attachedPhoto = msg.attachmentPhotoId
      ? photos.find((p) => p.id === msg.attachmentPhotoId)
      : null;

    return (
      <div key={msg.id} className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}>
        <div
          className={`max-w-[84%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${
            isDeleted
              ? 'bg-rose-950/60 text-rose-100 ring-1 ring-rose-500/40'
              : isOwner
                ? 'rounded-tr-sm bg-[#005c4b] text-zinc-50'
                : 'rounded-tl-sm bg-[#202c33] text-zinc-100'
          }`}
        >
          {isDeleted && (
            <p className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-300">
              <RotateCcw className="h-2.5 w-2.5" /> {t.recoveredTag}
            </p>
          )}
          {activeThread.isGroup && !isOwner && (
            <p className="mb-0.5 text-[10px] font-semibold text-amber-300">{msg.senderName}</p>
          )}

          {attachedPhoto && (
            <button
              onClick={() => onOpenPhoto(attachedPhoto.id)}
              className="mb-1.5 flex w-full items-center gap-2 rounded-lg bg-black/25 px-2.5 py-1.5 text-left text-[11px] text-sky-300 transition hover:bg-black/40"
            >
              <ImageIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate underline">{attachedPhoto.title}</span>
            </button>
          )}

          {msg.voiceNote ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (playingVoiceId === msg.id) {
                      sound.stopVoiceNote();
                      setPlayingVoiceId(null);
                    } else {
                      setPlayingVoiceId(msg.id);
                      setPlayedVoiceIds((prev) =>
                        prev.includes(msg.id) ? prev : [...prev, msg.id]
                      );
                      sound.playVoiceNote(msg.voiceNote!.transcript, lang, () => {
                        setPlayingVoiceId((curr) => (curr === msg.id ? null : curr));
                      });
                    }
                  }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition active:scale-95 ${
                    playingVoiceId === msg.id
                      ? 'bg-rose-500/80 hover:bg-rose-500'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={playingVoiceId === msg.id ? 'Stop Voice Note' : 'Play Voice Note'}
                >
                  {playingVoiceId === msg.id ? (
                    <Square className="h-3 w-3 fill-current" />
                  ) : (
                    <Play className="h-3.5 w-3.5 fill-current" />
                  )}
                </button>
                <div className="flex flex-1 items-center gap-[2px]">
                  {[3, 6, 4, 8, 5, 9, 4, 7, 10, 6, 4, 8, 5, 3, 6, 4].map((h, i) => (
                    <span
                      key={i}
                      className={`w-[2.5px] rounded-full transition-all ${
                        playingVoiceId === msg.id
                          ? 'animate-pulse bg-emerald-300'
                          : playedVoiceIds.includes(msg.id)
                            ? 'bg-emerald-400/80'
                            : 'bg-white/45'
                      }`}
                      style={{ height: `${h * 2}px` }}
                    />
                  ))}
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] text-white/75">
                  <Mic className="h-3 w-3" />
                  {msg.voiceNote.duration}
                </span>
              </div>

              {playedVoiceIds.includes(msg.id) && (
                <div className="space-y-1 rounded-lg bg-black/25 p-2 text-[10.5px] leading-relaxed">
                  <p className="text-zinc-100">{msg.voiceNote.transcript}</p>
                  <p className="font-medium text-amber-300">{msg.voiceNote.backgroundCue}</p>
                </div>
              )}
            </div>
          ) : (
            <p>{msg.text}</p>
          )}

          <div className="mt-1 flex items-center justify-end gap-1.5">
            {msg.clueId && (
              <button
                onClick={() => onDiscoverClue(msg.clueId!)}
                className={`mr-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold transition ${
                  isClueFound
                    ? 'bg-emerald-400/20 text-emerald-200'
                    : 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/35'
                }`}
              >
                {isClueFound ? (
                  <>
                    <BookmarkCheck className="h-2.5 w-2.5" /> {t.recorded}
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-2.5 w-2.5" /> {t.recordClue}
                  </>
                )}
              </button>
            )}
            <span className="text-[9.5px] text-white/55">{msg.time}</span>
            {isOwner && <CheckCheck className="h-3 w-3 text-sky-400" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#0b141a]">
      <div className="flex items-center gap-2.5 bg-[#111b21] px-3 py-2.5 shadow-sm">
        <button
          onClick={() => setActiveThreadId(null)}
          className="rounded-lg p-1 text-zinc-300 transition hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${activeThread.avatarColor}`}
        >
          {activeThread.isGroup ? <Users className="h-4 w-4" /> : activeThread.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white">{activeThread.name}</p>
          <p
            className={`truncate text-[10px] ${
              typingThreadId === activeThread.id
                ? 'font-medium italic text-emerald-400'
                : 'text-zinc-400'
            }`}
          >
            {typingThreadId === activeThread.id
              ? lang === 'en'
                ? 'typing...'
                : 'sedang mengetik...'
              : activeThread.statusText}
          </p>
        </div>
      </div>

      <div className="phone-scroll flex-1 space-y-2 overflow-y-auto bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:18px_18px] px-3 py-3">
        {activeThread.messages.map((msg) => renderMessageBubble(msg, false))}

        {typingThreadId === activeThread.id && (
          <div className="flex items-start">
            <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#202c33] px-3.5 py-2.5 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {activeThread.deletedMessages && !isRecovered && (
          <form
            onSubmit={handleRecoverSubmit}
            className="mt-3 rounded-xl bg-rose-950/40 p-3 ring-1 ring-rose-500/30"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300">
              <Trash2 className="h-3.5 w-3.5" />
              {activeThread.deletedMessages.length} {t.deletedDetected}
            </div>
            {activeThread.recoveryHint && (
              <p className="mt-1 text-[10px] leading-relaxed text-zinc-300">
                {activeThread.recoveryHint}
              </p>
            )}
            <div className="mt-2.5 flex gap-1.5">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => {
                  setKeywordInput(e.target.value);
                  setKeywordError(false);
                }}
                placeholder={t.keywordPlaceholder}
                className="min-w-0 flex-1 rounded-lg bg-black/50 px-2.5 py-1.5 font-mono text-[11px] text-white placeholder:text-zinc-500 ring-1 ring-white/10 focus:outline-none focus:ring-rose-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-rose-500 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-rose-400"
              >
                {t.recoverBtn}
              </button>
            </div>
            {keywordError && (
              <p className="mt-1.5 text-[10px] text-rose-400">{t.keywordMismatch}</p>
            )}
          </form>
        )}

        {activeThread.deletedMessages &&
          isRecovered &&
          activeThread.deletedMessages.map((msg) => renderMessageBubble(msg, true))}
      </div>
    </div>
  );
};
