import React, { useState } from 'react';
import type { BrowserHistoryItem } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import { Bookmark, BookmarkCheck, Globe, Search } from 'lucide-react';

interface BrowserAppProps {
  lang: Language;
  history: BrowserHistoryItem[];
  discoveredClues: string[];
  onDiscoverClue: (clueId?: string) => void;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({
  lang,
  history,
  discoveredClues,
  onDiscoverClue,
}) => {
  const [starredIds, setStarredIds] = useState<string[]>([]);

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="bg-zinc-900/90 px-4 pb-3 pt-3.5">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-800/90 px-3 py-2 text-xs text-zinc-400">
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span>{lang === 'en' ? 'Search History' : 'Riwayat Pencarian'}</span>
        </div>
      </div>

      <div className="phone-scroll flex-1 divide-y divide-white/[0.06] overflow-y-auto px-3 py-2">
        {history.map((item) => {
          const isFound = item.clueId ? discoveredClues.includes(item.clueId) : false;
          const isStarred = isFound || starredIds.includes(item.id);

          return (
            <div key={item.id} className="space-y-1.5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 truncate text-xs font-semibold text-sky-300">
                  <Globe className="h-3 w-3 shrink-0 text-sky-400" />
                  <span className="truncate">{item.title}</span>
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="font-mono text-[10px] text-zinc-500">{item.time}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.clueId) {
                        onDiscoverClue(item.clueId);
                      } else {
                        const isCurrentlyStarred = starredIds.includes(item.id);
                        if (!isCurrentlyStarred) {
                          onDiscoverClue(undefined);
                        } else {
                          sound.playTap();
                        }
                        setStarredIds((prev) =>
                          isCurrentlyStarred
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id]
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
                    aria-label="Bookmark history"
                    title={lang === 'en' ? 'Bookmark' : 'Tandai'}
                  >
                    {isFound ? (
                      <BookmarkCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Bookmark className={`h-3.5 w-3.5 ${isStarred ? 'fill-current' : ''}`} />
                    )}
                  </button>
                </div>
              </div>

              <p className="truncate font-mono text-[10px] text-emerald-400/75">{item.url}</p>
              <p className="text-[11px] leading-relaxed text-zinc-300">{item.snippet}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

