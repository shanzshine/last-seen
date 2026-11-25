import React, { useState } from 'react';
import type { ChatThread, PhotoEvidence } from '../../types/case';
import { sound } from '../../utils/sound';
import { ArrowLeft, BookmarkCheck, BookmarkPlus, Image as ImageIcon, Users } from 'lucide-react';

interface ChatAppProps {
  threads: ChatThread[];
  photos: PhotoEvidence[];
  discoveredClues: string[];
  onDiscoverClue: (clueId: string) => void;
  onOpenPhoto: (photoId: string) => void;
}

export const ChatApp: React.FC<ChatAppProps> = ({
  threads,
  photos,
  discoveredClues,
  onDiscoverClue,
  onOpenPhoto,
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  if (!activeThread) {
    return (
      <div className="flex h-full flex-col bg-zinc-950">
        <div className="border-b border-zinc-800/80 px-4 py-3">
          <h2 className="text-base font-bold text-white">Pesan</h2>
          <p className="text-[11px] text-zinc-400">Ketuk percakapan untuk memeriksa bukti</p>
        </div>

        <div className="phone-scroll flex-1 divide-y divide-zinc-900 overflow-y-auto">
          {threads.map((thread) => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            const cluesInThread = thread.messages.filter((m) => m.clueId).length;
            const foundInThread = thread.messages.filter(
              (m) => m.clueId && discoveredClues.includes(m.clueId)
            ).length;

            return (
              <button
                key={thread.id}
                onClick={() => {
                  sound.playTap();
                  setActiveThreadId(thread.id);
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
                    {lastMsg?.senderType === 'owner' ? 'Nadia: ' : ''}
                    {lastMsg?.text}
                  </p>
                  {cluesInThread > 0 && (
                    <span className="mt-1 inline-block text-[10px] font-medium text-emerald-400/90">
                      Bukti dicatat: {foundInThread}/{cluesInThread}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

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
        {activeThread.messages.map((msg) => {
          const isOwner = msg.senderType === 'owner';
          const isClueFound = msg.clueId ? discoveredClues.includes(msg.clueId) : false;
          const attachedPhoto = msg.attachmentPhotoId
            ? photos.find((p) => p.id === msg.attachmentPhotoId)
            : null;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  isOwner
                    ? 'rounded-br-sm bg-emerald-600/90 text-white'
                    : 'rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-100'
                }`}
              >
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
                          <BookmarkCheck className="h-3 w-3" /> Tercatat
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="h-3 w-3" /> Catat Bukti
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
        })}
      </div>
    </div>
  );
};
