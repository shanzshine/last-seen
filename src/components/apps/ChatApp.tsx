import React, { useState } from 'react';
import type { ChatMessage, ChatThread, PhotoEvidence } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  Image as ImageIcon,
  RotateCcw,
  Trash2,
  Users,
} from 'lucide-react';

interface ChatAppProps {
  lang: Language;
  threads: ChatThread[];
  photos: PhotoEvidence[];
  discoveredClues: string[];
  recoveredThreadIds: string[];
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
  onDiscoverClue,
  onRecoverThread,
  onOpenPhoto,
}) => {
  const t = UI_STRINGS[lang].chat;
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordError, setKeywordError] = useState(false);

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
      <div className="flex h-full flex-col bg-zinc-950">
        <div className="border-b border-zinc-800/80 px-4 py-3">
          <h2 className="text-base font-bold text-white">{t.title}</h2>
          <p className="text-[11px] text-zinc-400">{t.subtitle}</p>
        </div>

        <div className="phone-scroll flex-1 divide-y divide-zinc-900 overflow-y-auto">
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
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-900/70 active:bg-zinc-900"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${thread.avatarColor}`}
                >
                  {thread.isGroup ? <Users className="h-5 w-5" /> : thread.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-zinc-100">
                      {thread.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-zinc-500">{lastMsg?.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-zinc-400">
                    {lastMsg?.senderType === 'owner' ? `${t.ownerPrefix} ` : ''}
                    {lastMsg?.text}
                  </p>
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
          className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
            isDeleted
              ? 'border border-rose-500/40 bg-rose-950/40 text-rose-100'
              : isOwner
                ? 'rounded-br-sm bg-emerald-600/90 text-white'
                : 'rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-100'
          }`}
        >
          {isDeleted && (
            <p className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-300">
              <RotateCcw className="h-2.5 w-2.5" /> {t.recoveredTag}
            </p>
          )}
          {activeThread.isGroup && !isOwner && (
            <p className="mb-0.5 text-[10px] font-bold text-amber-300">{msg.senderName}</p>
          )}

          {attachedPhoto && (
            <button
              onClick={() => onOpenPhoto(attachedPhoto.id)}
              className="mb-1.5 flex w-full items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-left text-[11px] text-sky-300 transition hover:bg-black/50"
            >
              <ImageIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate underline">{attachedPhoto.title}</span>
            </button>
          )}

          <p>{msg.text}</p>

          <div className="mt-1 flex items-center justify-end gap-2">
            {msg.clueId && (
              <button
                onClick={() => onDiscoverClue(msg.clueId!)}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${
                  isClueFound
                    ? 'bg-emerald-400/20 text-emerald-200'
                    : 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/30'
                }`}
              >
                {isClueFound ? (
                  <>
                    <BookmarkCheck className="h-3 w-3" /> {t.recorded}
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-3 w-3" /> {t.recordClue}
                  </>
                )}
              </button>
            )}
            <span className={`text-[10px] ${isOwner ? 'text-emerald-100/80' : 'text-zinc-500'}`}>
              {msg.time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center gap-2.5 border-b border-zinc-800/80 bg-zinc-900/60 px-3 py-2.5">
        <button
          onClick={() => setActiveThreadId(null)}
          className="rounded-lg p-1 text-zinc-300 transition hover:bg-zinc-800"
          aria-label="Kembali ke daftar pesan"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${activeThread.avatarColor}`}
        >
          {activeThread.isGroup ? <Users className="h-4 w-4" /> : activeThread.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-white">{activeThread.name}</p>
          <p className="truncate text-[10px] text-zinc-400">{activeThread.statusText}</p>
        </div>
      </div>

      <div className="phone-scroll flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        {activeThread.messages.map((msg) => renderMessageBubble(msg, false))}

        {activeThread.deletedMessages && !isRecovered && (
          <form
            onSubmit={handleRecoverSubmit}
            className="mt-3 rounded-xl border border-rose-500/30 bg-rose-950/25 p-3"
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
                className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 font-mono text-[11px] text-white placeholder:text-zinc-500 focus:border-rose-400 focus:outline-none"
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
