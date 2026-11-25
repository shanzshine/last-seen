import React from 'react';
import type { LocationLog } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { BookmarkCheck, BookmarkPlus, MapPin, Navigation } from 'lucide-react';

interface MapsAppProps {
  lang: Language;
  locations: LocationLog[];
  discoveredClues: string[];
  onDiscoverClue: (clueId: string) => void;
}

export const MapsApp: React.FC<MapsAppProps> = ({
  lang,
  locations,
  discoveredClues,
  onDiscoverClue,
}) => {
  const t = UI_STRINGS[lang].maps;

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="border-b border-zinc-800/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-rose-400" />
          <h2 className="text-base font-bold text-white">{t.title}</h2>
        </div>
        <p className="text-[11px] text-zinc-400">{t.subtitle}</p>
      </div>

      <div className="phone-scroll flex-1 overflow-y-auto p-4">
        <div className="relative space-y-4 border-l-2 border-zinc-800 pl-4">
          {locations.map((loc) => {
            const isFound = loc.clueId ? discoveredClues.includes(loc.clueId) : false;

            return (
              <div key={loc.id} className="relative rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
                <span className="absolute -left-[23px] top-3.5 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 ring-4 ring-zinc-950" />

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-rose-300">{loc.time}</span>
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                </div>

                <p className="mt-1 text-xs font-bold text-white">{loc.place}</p>
                <p className="text-[10px] text-zinc-400">{loc.address}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-300">{loc.note}</p>

                {loc.clueId && (
                  <button
                    onClick={() => onDiscoverClue(loc.clueId!)}
                    className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold transition ${
                      isFound
                        ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                        : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                    }`}
                  >
                    {isFound ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5" /> {t.recorded}
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-3.5 w-3.5" /> {t.recordLocation}
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
