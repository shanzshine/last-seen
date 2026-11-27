import React, { useEffect, useRef, useState } from 'react';
import type { PhotoEvidence } from '../../types/case';
import { UI_STRINGS, type Language } from '../../i18n/strings';
import { PhotoVisual } from '../PhotoVisual';
import { sound } from '../../utils/sound';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  Info,
  MapPin,
  X,
} from 'lucide-react';

interface GalleryAppProps {
  lang: Language;
  photos: PhotoEvidence[];
  initialPhotoId?: string | null;
  discoveredClues: string[];
  backSignal?: number;
  onBackAtRoot?: () => void;
  onDiscoverClue: (clueId?: string) => void;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({
  lang,
  photos,
  initialPhotoId = null,
  discoveredClues,
  backSignal = 0,
  onBackAtRoot,
  onDiscoverClue,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialPhotoId);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const prevBackRef = useRef(backSignal);

  useEffect(() => {
    setDetailsOpen(false);
  }, [selectedId]);

  useEffect(() => {
    if (backSignal === prevBackRef.current) return;
    prevBackRef.current = backSignal;
    if (zoomOpen) {
      setZoomOpen(false);
    } else if (detailsOpen) {
      setDetailsOpen(false);
    } else if (selectedId !== null) {
      setSelectedId(null);
    } else {
      onBackAtRoot?.();
    }
  }, [backSignal, zoomOpen, detailsOpen, selectedId, onBackAtRoot]);
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
  const isStarred = isClueFound || starredIds.includes(selectedPhoto.id);

  const handleToggleBookmark = () => {
    if (selectedPhoto.clueId) {
      onDiscoverClue(selectedPhoto.clueId);
    } else {
      const isCurrentlyStarred = starredIds.includes(selectedPhoto.id);
      if (!isCurrentlyStarred) {
        onDiscoverClue(undefined);
      } else {
        sound.playTap();
      }
      setStarredIds((prev) =>
        isCurrentlyStarred
          ? prev.filter((id) => id !== selectedPhoto.id)
          : [...prev, selectedPhoto.id]
      );
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-black">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 bg-zinc-950/90 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => {
              setZoomOpen(false);
              setDetailsOpen(false);
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

        <button
          type="button"
          onClick={handleToggleBookmark}
          className={`rounded-lg p-1.5 transition ${
            isClueFound
              ? 'bg-emerald-500/15 text-emerald-400'
              : isStarred
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
          }`}
          aria-label="Bookmark photo"
          title={lang === 'en' ? 'Bookmark' : 'Tandai'}
        >
          {isClueFound ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
          )}
        </button>
      </div>

      {/* Centered Photo Canvas — Clean, no text underneath */}
      <div className="flex flex-1 items-center justify-center overflow-hidden bg-black p-3">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setZoomOpen(true);
          }}
          className="block aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-950 transition active:scale-[0.99]"
        >
          <PhotoVisual visualType={selectedPhoto.visualType} />
        </button>
      </div>

      {/* Bottom Details Toggle Bar */}
      <div className="flex items-center justify-center bg-zinc-950/80 px-4 py-2">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setDetailsOpen((v) => !v);
          }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium transition ${
            detailsOpen
              ? 'bg-white/15 text-white'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <Info className="h-3.5 w-3.5" />
          {lang === 'en' ? 'Details' : 'Detail'}
        </button>
      </div>

      {/* Slide-up Details Drawer (only when Details is clicked) */}
      {detailsOpen && (
        <div className="absolute inset-x-0 bottom-10 z-20 mx-2.5 rounded-2xl border border-white/10 bg-zinc-900/95 p-3.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {lang === 'en' ? 'Photo Info' : 'Info Foto'}
            </span>
            <button
              type="button"
              onClick={() => setDetailsOpen(false)}
              className="rounded p-0.5 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-zinc-200">{selectedPhoto.caption}</p>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-zinc-500" /> {selectedPhoto.timestamp}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-zinc-500" /> {selectedPhoto.location}
            </span>
          </div>
        </div>
      )}

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
            className="relative h-[78vh] w-full max-w-xl overflow-hidden rounded-2xl bg-black"
          >
            <PhotoVisual visualType={selectedPhoto.visualType} />
          </div>
        </div>
      )}
    </div>
  );
};
