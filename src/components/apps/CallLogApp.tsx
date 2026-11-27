import React, { useEffect, useState } from 'react';
import type { CallLogEntry } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  Bookmark,
  BookmarkCheck,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Play,
  ShieldBan,
  Square,
  Voicemail,
} from 'lucide-react';

interface CallLogAppProps {
  lang: Language;
  callLogs: CallLogEntry[];
  discoveredClues: string[];
  onDiscoverClue: (clueId?: string) => void;
}

export const CallLogApp: React.FC<CallLogAppProps> = ({
  lang,
  callLogs,
  discoveredClues,
  onDiscoverClue,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [starredIds, setStarredIds] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      sound.stopVoiceNote();
    };
  }, []);

  const renderCallIcon = (type: CallLogEntry['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="h-3.5 w-3.5 text-emerald-400" />;
      case 'outgoing':
        return <PhoneOutgoing className="h-3.5 w-3.5 text-sky-400" />;
      case 'missed':
        return <PhoneMissed className="h-3.5 w-3.5 text-rose-400" />;
      case 'blocked':
        return <ShieldBan className="h-3.5 w-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="border-b border-white/[0.06] bg-zinc-900/80 px-4 pb-3 pt-3.5">
        <h2 className="text-lg font-bold tracking-tight text-white">
          {lang === 'en' ? 'Recents' : 'Panggilan Terakhir'}
        </h2>
        <p className="text-[11px] text-zinc-400">
          {lang === 'en' ? 'Call history & voicemails' : 'Riwayat telepon & pesan suara'}
        </p>
      </div>

      <div className="phone-scroll flex-1 divide-y divide-white/[0.06] overflow-y-auto px-3 py-1">
        {callLogs.map((entry) => {
          const isFound = entry.clueId ? discoveredClues.includes(entry.clueId) : false;
          const isStarred = isFound || starredIds.includes(entry.id);
          const isPlaying = playingId === entry.id;
          const isPlayed = playedIds.includes(entry.id);

          return (
            <div key={entry.id} className="space-y-2 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-white/10">
                    {renderCallIcon(entry.type)}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-semibold ${
                        entry.type === 'missed' || entry.type === 'blocked'
                          ? 'text-rose-300'
                          : 'text-zinc-100'
                      }`}
                    >
                      {entry.callerName}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500">{entry.phoneNumber}</p>
                    {entry.note && (
                      <p className="mt-1 text-[11px] leading-snug text-zinc-300">{entry.note}</p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-mono text-[10px] text-zinc-400">{entry.time}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9.5px] text-zinc-500">{entry.duration}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (entry.clueId) {
                          onDiscoverClue(entry.clueId);
                        } else {
                          const currently = starredIds.includes(entry.id);
                          if (!currently) {
                            onDiscoverClue(undefined);
                          } else {
                            sound.playTap();
                          }
                          setStarredIds((prev) =>
                            currently
                              ? prev.filter((id) => id !== entry.id)
                              : [...prev, entry.id]
                          );
                        }
                      }}
                      className={`rounded p-1 transition ${
                        isFound
                          ? 'text-emerald-400'
                          : isStarred
                            ? 'text-white'
                            : 'text-zinc-500 hover:text-zinc-200'
                      }`}
                      aria-label="Bookmark call"
                    >
                      {isFound ? (
                        <BookmarkCheck className="h-3.5 w-3.5" />
                      ) : (
                        <Bookmark className={`h-3.5 w-3.5 ${isStarred ? 'fill-current' : ''}`} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {entry.voicemailTranscript && (
                <div className="ml-10 rounded-xl border border-white/[0.08] bg-zinc-900/70 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-300">
                      <Voicemail className="h-3.5 w-3.5" />
                      Voicemail
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (isPlaying) {
                          sound.stopVoiceNote();
                          setPlayingId(null);
                        } else {
                          setPlayingId(entry.id);
                          setPlayedIds((prev) =>
                            prev.includes(entry.id) ? prev : [...prev, entry.id]
                          );
                          sound.playVoiceNote(entry.voicemailTranscript!, lang, () => {
                            setPlayingId((curr) => (curr === entry.id ? null : curr));
                          });
                        }
                      }}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                        isPlaying
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/15 text-white hover:bg-white/25'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="h-2.5 w-2.5 fill-current" />
                          {lang === 'en' ? 'Stop' : 'Stop'}
                        </>
                      ) : (
                        <>
                          <Play className="h-2.5 w-2.5 fill-current" />
                          {lang === 'en' ? 'Play' : 'Putar'}
                        </>
                      )}
                    </button>
                  </div>

                  {isPlayed && (
                    <p className="mt-2 rounded-lg bg-black/40 p-2 text-[10.5px] leading-relaxed text-zinc-200">
                      {entry.voicemailTranscript}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
