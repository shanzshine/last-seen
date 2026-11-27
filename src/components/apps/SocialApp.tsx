import React, { useState } from 'react';
import type { SocialPost } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  Bookmark,
  BookmarkCheck,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  Repeat2,
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
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [starredPostIds, setStarredPostIds] = useState<string[]>([]);

  const visiblePosts =
    tab === 'alt' ? posts.filter((p) => p.isPrivateAlt) : posts.filter((p) => !p.isPrivateAlt);

  const activeHandle = visiblePosts[0]?.accountHandle ?? '@user';

  return (
    <div className="flex h-full flex-col bg-black text-zinc-100">
      {/* Top App Bar */}
      <div className="border-b border-white/[0.08] bg-zinc-950/90 px-4 pb-2.5 pt-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-white">Pulse</span>
            <span className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
              {activeHandle}
            </span>
          </div>

          {hasAltPosts && (
            <div className="flex items-center gap-1 rounded-full bg-zinc-900 p-0.5 ring-1 ring-white/10">
              <button
                onClick={() => {
                  sound.playTap();
                  setTab('all');
                }}
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                  tab === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {lang === 'en' ? 'Main' : 'Utama'}
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setTab('alt');
                }}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                  tab === 'alt'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Lock className="h-2.5 w-2.5" />
                {lang === 'en' ? 'Alt' : 'Kedua'}
              </button>
            </div>
          )}
        </div>

        {/* Profile Mini-Header */}
        <div className="mt-2.5 flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${
                tab === 'alt'
                  ? 'bg-emerald-500/15 text-emerald-300 ring-2 ring-emerald-500/50'
                  : 'bg-zinc-800 text-zinc-100 ring-1 ring-white/15'
              }`}
            >
              {activeHandle.replace('@', '').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-[11.5px] font-bold text-white">{activeHandle}</p>
              <p className="text-[9.5px] text-zinc-400">
                {tab === 'alt'
                  ? lang === 'en'
                    ? 'Private • Close Friends Only'
                    : 'Privat • Khusus Close Friends'
                  : lang === 'en'
                    ? 'Public Profile • Feed'
                    : 'Profil Publik • Beranda'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[9.5px] text-zinc-500">
            {visiblePosts.length} {lang === 'en' ? 'posts' : 'post'}
          </span>
        </div>
      </div>

      {/* Edge-to-Edge Social Feed */}
      <div className="phone-scroll flex-1 divide-y divide-white/[0.08] overflow-y-auto">
        {visiblePosts.map((post) => {
          const isClueFound = post.clueId ? discoveredClues.includes(post.clueId) : false;
          const isStarred = isClueFound || starredPostIds.includes(post.id);
          const isLiked = likedIds.includes(post.id);

          return (
            <div key={post.id} className="px-3.5 py-3.5">
              <div className="flex gap-2.5">
                {/* Left Avatar + Thread Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      post.isCloseFriends
                        ? 'bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/60'
                        : 'bg-zinc-800 text-zinc-200 ring-1 ring-white/10'
                    }`}
                  >
                    {post.accountHandle.replace('@', '').slice(0, 2).toUpperCase()}
                  </div>
                  {post.comments.length > 0 && (
                    <div className="mt-1.5 w-[1.5px] flex-1 rounded-full bg-zinc-800" />
                  )}
                </div>

                {/* Right Post Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate text-[12px] font-bold text-white">
                        {post.accountHandle}
                      </span>
                      {post.isCloseFriends && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">
                          <Star className="h-2 w-2 fill-current" />
                          CF
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-[9.5px] text-zinc-500">
                      {post.time}
                    </span>
                  </div>

                  {post.location && (
                    <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-zinc-500">
                      <MapPin className="h-2.5 w-2.5 shrink-0" />
                      {post.location}
                    </p>
                  )}

                  {/* Post Text */}
                  <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-100">
                    {post.caption}
                  </p>

                  {/* Social Action Bar */}
                  <div className="mt-2.5 flex items-center justify-between text-zinc-400">
                    <div className="flex items-center gap-4 text-[10.5px]">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playTap();
                          setLikedIds((prev) =>
                            prev.includes(post.id)
                              ? prev.filter((id) => id !== post.id)
                              : [...prev, post.id]
                          );
                        }}
                        className={`inline-flex items-center gap-1 transition ${
                          isLiked ? 'text-rose-400' : 'hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{post.comments.length}</span>
                      </span>

                      <span className="inline-flex items-center">
                        <Repeat2 className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (post.clueId) {
                          onDiscoverClue(post.clueId);
                        } else {
                          sound.playTap();
                          setStarredPostIds((prev) =>
                            prev.includes(post.id)
                              ? prev.filter((id) => id !== post.id)
                              : [...prev, post.id]
                          );
                        }
                      }}
                      className={`rounded p-1 transition ${
                        isClueFound
                          ? 'text-emerald-400'
                          : isStarred
                            ? 'text-zinc-100'
                            : 'text-zinc-500 hover:text-zinc-200'
                      }`}
                      aria-label="Bookmark post"
                      title={lang === 'en' ? 'Bookmark' : 'Tandai'}
                    >
                      {isClueFound ? (
                        <BookmarkCheck className="h-3.5 w-3.5" />
                      ) : (
                        <Bookmark className={`h-3.5 w-3.5 ${isStarred ? 'fill-current' : ''}`} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Threaded Replies / Comments */}
              {post.comments.length > 0 && (
                <div className="mt-2.5 space-y-2.5 pl-1">
                  {post.comments.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[8.5px] font-bold text-zinc-300 ring-1 ring-white/10">
                        {c.author.replace('@', '').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1 rounded-xl bg-zinc-900/55 px-2.5 py-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[10.5px] font-bold text-zinc-200">
                            {c.author}
                          </span>
                          <span className="shrink-0 font-mono text-[8.5px] text-zinc-500">
                            {c.time}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] leading-snug text-zinc-300">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
