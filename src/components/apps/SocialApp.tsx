import React, { useState } from 'react';
import type { SocialPost } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  BookmarkCheck,
  BookmarkPlus,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react';

interface SocialAppProps {
  lang: Language;
  posts: SocialPost[];
  discoveredClues: string[];
  onDiscoverClue: (clueId: string) => void;
}

export const SocialApp: React.FC<SocialAppProps> = ({
  lang,
  posts,
  discoveredClues,
  onDiscoverClue,
}) => {
  const hasAltPosts = posts.some((p) => p.isPrivateAlt);
  const [tab, setTab] = useState<'all' | 'alt'>('all');

  const visiblePosts =
    tab === 'alt' ? posts.filter((p) => p.isPrivateAlt) : posts.filter((p) => !p.isPrivateAlt);

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-black px-4 pb-2.5 pt-3.5">
        <h2 className="text-lg font-bold tracking-tight text-white">
          {lang === 'en' ? 'InstaGramm' : 'Sosmed'}
        </h2>
        <p className="text-[11px] text-zinc-400">
          {lang === 'en'
            ? 'Synced accounts & private activity'
            : 'Akun tersinkron & aktivitas pribadi'}
        </p>

        {hasAltPosts && (
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-xl bg-zinc-900 p-1">
            <button
              onClick={() => {
                sound.playTap();
                setTab('all');
              }}
              className={`rounded-lg py-1.5 text-[11px] font-semibold transition ${
                tab === 'all' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lang === 'en' ? 'Public Profile' : 'Akun Utama'}
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setTab('alt');
              }}
              className={`inline-flex items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold transition ${
                tab === 'alt'
                  ? 'bg-rose-500/20 text-rose-200 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Lock className="h-3 w-3" />
              {lang === 'en' ? '2nd Account' : 'Akun Kedua'}
            </button>
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="phone-scroll flex-1 space-y-3 overflow-y-auto p-3">
        {visiblePosts.map((post) => {
          const isClueFound = post.clueId ? discoveredClues.includes(post.clueId) : false;

          return (
            <div
              key={post.id}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/70"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      post.isPrivateAlt
                        ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40'
                        : 'bg-zinc-800 text-zinc-200'
                    }`}
                  >
                    {post.accountHandle.replace('@', '').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[11px] font-bold text-white">
                        {post.accountHandle}
                      </span>
                      {post.isCloseFriends && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">
                          <Star className="h-2 w-2 fill-current" />
                          CF
                        </span>
                      )}
                    </div>
                    {post.location && (
                      <p className="flex items-center gap-0.5 truncate text-[9px] text-zinc-400">
                        <MapPin className="h-2.5 w-2.5 shrink-0" />
                        {post.location}
                      </p>
                    )}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[9px] text-zinc-500">{post.time}</span>
              </div>

              {/* Caption / Post Body */}
              <div className="border-y border-white/[0.05] bg-black/40 px-3 py-2.5">
                <p className="text-[11.5px] leading-relaxed text-zinc-200">{post.caption}</p>
              </div>

              {/* Actions & Comments */}
              <div className="space-y-2 px-3 py-2.5">
                <div className="flex items-center gap-4 text-[10px] text-zinc-400">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-rose-400" /> {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5 text-zinc-400" /> {post.comments.length}
                  </span>
                </div>

                {post.comments.length > 0 && (
                  <div className="space-y-1 rounded-lg bg-black/35 p-2">
                    {post.comments.map((c) => (
                      <p key={c.id} className="text-[10.5px] leading-snug text-zinc-300">
                        <span className="font-bold text-white">{c.author}</span>{' '}
                        {c.text}{' '}
                        <span className="font-mono text-[8.5px] text-zinc-500">({c.time})</span>
                      </p>
                    ))}
                  </div>
                )}

                {post.clueId && (
                  <button
                    onClick={() => onDiscoverClue(post.clueId!)}
                    className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10.5px] font-semibold transition ${
                      isClueFound
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-200 hover:bg-amber-500/30'
                    }`}
                  >
                    {isClueFound ? (
                      <>
                        <BookmarkCheck className="h-3 w-3" />
                        {lang === 'en' ? 'Clue Pinned' : 'Bukti Tercatat'}
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-3 w-3" />
                        {lang === 'en' ? 'Pin Post as Clue' : 'Catat Postingan sebagai Bukti'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

