import React, { useState } from 'react';
import type { PhotoEvidence } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { PhotoVisual } from '../PhotoVisual';
import { sound } from '../../utils/sound';
import { ArrowLeft, BookmarkCheck, BookmarkPlus, MapPin, Clock } from 'lucide-react';

interface GalleryAppProps {
  lang: Language;
  photos: PhotoEvidence[];
  initialPhotoId?: string | null;
  discoveredClues: string[];
  onDiscoverClue: (clueId: string) => void;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({
  lang,
  photos,
  initialPhotoId = null,
  discoveredClues,
  onDiscoverClue,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialPhotoId);
  const selectedPhoto = photos.find((p) => p.id === selectedId) ?? null;
  const t = UI_STRINGS[lang].gallery;

  if (!selectedPhoto) {
    return (
      <div className="flex h-full flex-col bg-zinc-950">
        <div className="border-b border-zinc-800/80 px-4 py-3">
          <h2 className="text-base font-bold text-white">{t.title}</h2>
          <p className="text-[11px] text-zinc-400">
            {photos.length} {t.filesFound}
          </p>
        </div>

        <div className="phone-scroll grid flex-1 grid-cols-2 gap-2.5 overflow-y-auto p-3 content-start">
          {photos.map((photo) => {
            const isFound = photo.clueId ? discoveredClues.includes(photo.clueId) : false;
            return (
              <button
                key={photo.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedId(photo.id);
                }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-left transition hover:border-zinc-600"
              >
                <PhotoVisual visualType={photo.visualType} compact />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2">
                  <p className="truncate font-mono text-[10px] font-medium text-zinc-200">
                    {photo.title}
                  </p>
                  {isFound && (
                    <span className="text-[9px] font-semibold text-emerald-400">
                      {t.clueRecorded}
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

  const isClueFound = selectedPhoto.clueId
    ? discoveredClues.includes(selectedPhoto.clueId)
    : false;

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-800/80 px-3 py-2.5">
        <button
          onClick={() => setSelectedId(null)}
          className="rounded-lg p-1 text-zinc-300 transition hover:bg-zinc-800"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="truncate font-mono text-xs font-semibold text-zinc-200">
          {selectedPhoto.title}
        </p>
      </div>

      <div className="phone-scroll flex-1 overflow-y-auto p-3">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800">
          <PhotoVisual visualType={selectedPhoto.visualType} />
        </div>

        <div className="mt-3 space-y-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3">
          <p className="text-xs leading-relaxed text-zinc-200">{selectedPhoto.caption}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-zinc-500" /> {selectedPhoto.timestamp}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-zinc-500" /> {selectedPhoto.location}
            </span>
          </div>

          {selectedPhoto.clueId && (
            <button
              onClick={() => onDiscoverClue(selectedPhoto.clueId!)}
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
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
                  <BookmarkPlus className="h-3.5 w-3.5" /> {t.recordPhoto}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
