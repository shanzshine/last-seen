import React, { useState } from 'react';
import type { LocationLog } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import { Bookmark, BookmarkCheck, MapPin, Navigation, Search } from 'lucide-react';

interface MapsAppProps {
  lang: Language;
  locations: LocationLog[];
  discoveredClues: string[];
  onDiscoverClue: (clueId?: string) => void;
}

export const MapsApp: React.FC<MapsAppProps> = ({
  lang,
  locations,
  discoveredClues,
  onDiscoverClue,
}) => {
  const t = UI_STRINGS[lang].maps;
  const [selectedLocId, setSelectedLocId] = useState<string>(locations[locations.length - 1]?.id ?? '');
  const [starredIds, setStarredIds] = useState<string[]>([]);

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Real Maps Search Header */}
      <div className="bg-zinc-950 px-3.5 pb-2.5 pt-3">
        <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 ring-1 ring-white/10">
          <Search className="h-3.5 w-3.5 text-zinc-400" />
          <span className="truncate text-[11px] text-zinc-400">
            {lang === 'en' ? 'Search GPS history...' : 'Telusuri peta & riwayat...'}
          </span>
          <Navigation className="ml-auto h-3.5 w-3.5 text-sky-400" />
        </div>
      </div>

      {/* Interactive Visual Dark Map Canvas */}
      <div className="relative h-36 shrink-0 overflow-hidden border-y border-white/[0.08] bg-[#0b121c]">
        {/* Map grid & roads */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 140" fill="none">
          <path d="M0 45 Q 110 25, 220 75 T 320 55" stroke="#1e293b" strokeWidth="6" />
          <path d="M60 0 Q 95 70, 80 140" stroke="#1e293b" strokeWidth="4" />
          <path d="M210 0 Q 190 70, 240 140" stroke="#1e293b" strokeWidth="4" />
          {/* Route line between pins */}
          {locations.length >= 2 && (
            <path
              d="M78 96 Q 160 40, 238 66"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* Map Pins */}
        {locations.map((loc, idx) => {
          const isSelected = loc.id === selectedLocId;
          const pos =
            idx === 0
              ? 'left-[20%] top-[60%]'
              : idx === 1
                ? 'left-[70%] top-[40%]'
                : 'left-[48%] top-[28%]';
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedLocId(loc.id);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition ${pos}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full shadow-lg ring-2 ${
                  isSelected
                    ? 'scale-110 bg-rose-500 text-white ring-white'
                    : 'bg-zinc-800 text-zinc-200 ring-white/30'
                }`}
              >
                <MapPin className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}

        <span className="absolute bottom-1.5 right-2.5 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[8.5px] text-zinc-400">
          GPS • {locations.length} {lang === 'en' ? 'pins' : 'titik'}
        </span>
      </div>

      {/* Bottom Timeline Sheet */}
      <div className="phone-scroll flex-1 overflow-y-auto px-3.5 py-3">
        <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {t.title}
        </p>

        <div className="relative space-y-3 border-l border-zinc-800 pl-3.5">
          {locations.map((loc) => {
            const isFound = loc.clueId ? discoveredClues.includes(loc.clueId) : false;
            const isStarred = isFound || starredIds.includes(loc.id);
            const isSelected = loc.id === selectedLocId;

            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocId(loc.id)}
                className={`relative cursor-pointer rounded-xl border p-3 transition ${
                  isSelected
                    ? 'border-rose-500/40 bg-zinc-900/90'
                    : 'border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-900/75'
                }`}
              >
                <span
                  className={`absolute -left-[19px] top-3.5 h-2.5 w-2.5 rounded-full ring-4 ring-zinc-950 ${
                    isSelected ? 'bg-rose-500' : 'bg-zinc-600'
                  }`}
                />

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10.5px] font-bold text-rose-300">{loc.time}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (loc.clueId) {
                        onDiscoverClue(loc.clueId);
                      } else {
                        const isCurrentlyStarred = starredIds.includes(loc.id);
                        if (!isCurrentlyStarred) {
                          onDiscoverClue(undefined);
                        } else {
                          sound.playTap();
                        }
                        setStarredIds((prev) =>
                          isCurrentlyStarred
                            ? prev.filter((id) => id !== loc.id)
                            : [...prev, loc.id]
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
                    aria-label="Bookmark location"
                    title={isFound ? t.recorded : t.recordLocation}
                  >
                    {isFound ? (
                      <BookmarkCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Bookmark className={`h-3.5 w-3.5 ${isStarred ? 'fill-current' : ''}`} />
                    )}
                  </button>
                </div>

                <p className="mt-0.5 text-xs font-bold text-white">{loc.place}</p>
                <p className="text-[10px] text-zinc-400">{loc.address}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-300">{loc.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
