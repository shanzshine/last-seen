import React, { useState } from 'react';
import type { PhotoEvidence } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { PhotoVisual } from '../PhotoVisual';
import { sound } from '../../utils/sound';
import {
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  Clock,
  MapPin,
  Maximize2,
  X,
} from 'lucide-react';

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
  const [zoomOpen, setZoomOpen] = useState(false);
  const selectedPhoto = photos.find((p) => p.id === selectedId) ?? null;
  const t = UI_STRINGS[lang].gallery;

  if (!selectedPhoto) {
    return (
      <div className="flex h-full flex-col bg-black">
        <div className="px-4 pb-2.5 pt-3.5">
          <h2 className="text-lg font-bold tracking-tight text-white">{t.title}</h2>
          <p className="text-[11px] text-zinc-400">
            {photos.length} {t.filesFound}
          </p>
        </div>

        {/* Clean 3-column mobile Photos grid */}
        <div className="phone-scroll grid flex-1 grid-cols-3 gap-0.5 overflow-y-auto content-start">
          {photos.map((photo) => {
            const isFound = photo.clueId ? discoveredClues.includes(photo.clueId) : false;
            return (
              <button
                key={photo.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedId(photo.id);
                }}
                className="group relative aspect-square overflow-hidden bg-zinc-900"
              >
                <PhotoVisual visualType={photo.visualType} compact />
                {isFound && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 shadow">
                    <BookmarkCheck className="h-2.5 w-2.5" />
                  </span>
                )}
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
    <div className="flex h-full flex-col bg-black">
      <div className="flex items-center gap-2 bg-zinc-950/90 px-3 py-2.5">
        <button
          onClick={() => {
            setZoomOpen(false);
            setSelectedId(null);
          }}
          className="rounded-lg p-1 text-zinc-300 transition hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="truncate font-mono text-xs font-medium text-zinc-200">
          {selectedPhoto.title}
        </p>
      </div>

      <div className="phone-scroll flex-1 overflow-y-auto p-3">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setZoomOpen(true);
          }}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-950"
        >
          <PhotoVisual visualType={selectedPhoto.visualType} />
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-medium text-zinc-200 backdrop-blur-sm transition group-hover:bg-black/90">
            <Maximize2 className="h-3 w-3 text-emerald-400" />
            {t.tapToZoom}
          </span>
        </button>

        <div className="mt-3 space-y-2 rounded-xl bg-zinc-900/80 p-3">
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

      {/* Fullscreen Lightbox Popup */}
      {zoomOpen && (
        <div
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-zinc-900/90 p-2 text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[82vh] w-full max-w-xl flex-col items-center overflow-hidden rounded-2xl bg-zinc-950 p-2 ring-1 ring-white/15"
          >
            <div className="h-[62vh] w-full overflow-hidden rounded-xl bg-black">
              <PhotoVisual visualType={selectedPhoto.visualType} />
            </div>
            <div className="w-full px-2 py-2.5 text-center">
              <p className="font-mono text-xs font-semibold text-zinc-200">{selectedPhoto.title}</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
