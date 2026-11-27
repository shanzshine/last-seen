import React, { useState } from 'react';
import type { SocialPost } from '../../types/case';
import type { Language } from '../../i18n/strings';
import { sound } from '../../utils/sound';
import {
  Bookmark,
  BookmarkCheck,
  Grid3X3,
  Heart,
  Home,
  Lock,
  MapPin,
  MessageCircle,
  Radio,
  Search,
  Send,
  Star,
  User,
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
  const [accountTab, setAccountTab] = useState<'all' | 'alt'>('all');
  const [navTab, setNavTab] = useState<'feed' | 'profile'>('feed');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [starredPostIds, setStarredPostIds] = useState<string[]>([]);

  const visiblePosts =
    accountTab === 'alt'
      ? posts.filter((p) => p.isPrivateAlt)
      : posts.filter((p) => !p.isPrivateAlt);

  const activeHandle = visiblePosts[0]?.accountHandle ?? '@user';

  // Collect unique commenters for realistic Stories bar
  const storyHandles = Array.from(
    new Set([
      activeHandle,
      ...visiblePosts.flatMap((p) => p.comments.map((c) => c.author)),
    ])
  ).slice(0, 5);

  return (
    <div className="flex h-full flex-col bg-black text-zinc-100">
      {/* Top App Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-black px-4 pb-2.5 pt-3">
        <div className="flex items-center gap-2">
          <span className="text-[17px] font-black tracking-tight text-white">Pulse</span>
          {accountTab === 'alt' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
              <Lock className="h-2.5 w-2.5" /> CF
            </span>
          )}
        </div>

        {hasAltPosts && (
          <div className="flex items-center gap-1 rounded-full bg-zinc-900 p-0.5 ring-1 ring-white/10">
            <button
              onClick={() => {
                sound.playTap();
                setAccountTab('all');
              }}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                accountTab === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lang === 'en' ? 'Main' : 'Utama'}
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setAccountTab('alt');
              }}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                accountTab === 'alt'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Lock className="h-2.5 w-2.5" />
              {lang === 'en' ? '2nd' : 'Kedua'}
            </button>
          </div>
        )}
      </div>

      {/* Main Scrollable Content */}
      <div className="phone-scroll flex-1 overflow-y-auto">
        {navTab === 'feed' ? (
          <>
            {/* Stories Row */}
            <div className="flex gap-3 overflow-x-auto border-b border-white/[0.07] px-3.5 py-2.5">
              {storyHandles.map((handle, idx) => {
                const isSelf = idx === 0;
                const isCF = accountTab === 'alt' && isSelf;
                return (
                  <div key={handle} className="flex w-12 shrink-0 flex-col items-center gap-1">
                    <div
                      className={`rounded-full p-[2px] ${
                        isCF
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-300'
                          : isSelf
                            ? 'bg-zinc-700'
                            : 'bg-gradient-to-tr from-rose-500 via-amber-500 to-fuchsia-500'
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-zinc-900 text-[10px] font-bold text-white">
                        {handle.replace('@', '').slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <span className="w-full truncate text-center text-[9px] text-zinc-400">
                      {isSelf ? (lang === 'en' ? 'You' : 'Kamu') : handle.replace('@', '')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Posts Feed */}
            <div className="divide-y divide-white/[0.08]">
              {visiblePosts.map((post) => {
                const isClueFound = post.clueId ? discoveredClues.includes(post.clueId) : false;
                const isStarred = isClueFound || starredPostIds.includes(post.id);
                const isLiked = likedIds.includes(post.id);
                const isLive = post.caption.toUpperCase().includes('LIVE');

                return (
                  <article key={post.id} className="pb-3.5 pt-3">
                    {/* Post Author Bar */}
                    <div className="flex items-center justify-between px-3.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            post.isCloseFriends
                              ? 'bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500'
                              : 'bg-zinc-800 text-zinc-100 ring-1 ring-white/15'
                          }`}
                        >
                          {post.accountHandle.replace('@', '').slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-[11.5px] font-bold text-white">
                              {post.accountHandle}
                            </span>
                            {post.isCloseFriends && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">
                                <Star className="h-2 w-2 fill-current" />
                                Close Friends
                              </span>
                            )}
                          </div>
                          {post.location && (
                            <p className="flex items-center gap-0.5 truncate text-[9.5px] text-zinc-400">
                              <MapPin className="h-2.5 w-2.5 shrink-0" />
                              {post.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-[9.5px] text-zinc-500">
                        {post.time}
                      </span>
                    </div>

                    {/* Visual Media Card */}
                    <div
                      className={`mx-3.5 mt-2.5 overflow-hidden rounded-xl border p-4 ${
                        post.isCloseFriends
                          ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/70 via-zinc-950 to-black'
                          : isLive
                            ? 'border-rose-500/30 bg-gradient-to-br from-rose-950/60 via-zinc-950 to-black'
                            : 'border-white/[0.08] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        {isLive ? (
                          <span className="inline-flex items-center gap-1 rounded bg-rose-600 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-white">
                            <Radio className="h-2.5 w-2.5 animate-pulse" /> LIVE
                          </span>
                        ) : post.isCloseFriends ? (
                          <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wider text-emerald-400">
                            ● Private Note
                          </span>
                        ) : (
                          <span className="font-mono text-[8.5px] uppercase tracking-wider text-zinc-500">
                            ● Status Update
                          </span>
                        )}
                        <span className="font-mono text-[8.5px] text-zinc-500">{post.time}</span>
                      </div>
                      <p className="text-[12px] leading-relaxed text-zinc-100">{post.caption}</p>
                    </div>

                    {/* Action Icons Row */}
                    <div className="mt-2.5 flex items-center justify-between px-3.5 text-zinc-300">
                      <div className="flex items-center gap-4">
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
                          className={`inline-flex items-center gap-1 text-[11px] transition ${
                            isLiked ? 'text-rose-500' : 'hover:text-rose-400'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                          <span className="font-semibold">
                            {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
                          </span>
                        </button>

                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments.length}</span>
                        </span>

                        <span className="inline-flex items-center text-zinc-400">
                          <Send className="h-3.5 w-3.5" />
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
                              ? 'text-white'
                              : 'text-zinc-400 hover:text-white'
                        }`}
                        aria-label="Bookmark post"
                        title={lang === 'en' ? 'Bookmark' : 'Tandai'}
                      >
                        {isClueFound ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
                        )}
                      </button>
                    </div>

                    {/* Comments Preview */}
                    {post.comments.length > 0 && (
                      <div className="mt-2 space-y-1.5 px-3.5">
                        {post.comments.map((c) => (
                          <div key={c.id} className="flex items-baseline justify-between gap-2 text-[11px]">
                            <p className="leading-snug text-zinc-300">
                              <span className="font-bold text-white">{c.author}</span> {c.text}
                            </p>
                            <span className="shrink-0 font-mono text-[8.5px] text-zinc-500">
                              {c.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* Real Profile View */
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  accountTab === 'alt'
                    ? 'bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500'
                    : 'bg-zinc-800 text-white ring-2 ring-rose-500/70'
                }`}
              >
                {activeHandle.replace('@', '').slice(0, 2).toUpperCase()}
              </div>
              <div className="grid flex-1 grid-cols-3 text-center">
                <div>
                  <p className="text-sm font-bold text-white">{visiblePosts.length}</p>
                  <p className="text-[10px] text-zinc-400">Posts</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {accountTab === 'alt' ? '3' : '142K'}
                  </p>
                  <p className="text-[10px] text-zinc-400">Followers</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {accountTab === 'alt' ? '3' : '418'}
                  </p>
                  <p className="text-[10px] text-zinc-400">Following</p>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs font-bold text-white">{activeHandle}</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">
                {accountTab === 'alt'
                  ? lang === 'en'
                    ? 'Private alt account • Close friends only'
                    : 'Akun kedua privat • Khusus orang terdekat'
                  : lang === 'en'
                    ? 'Public creator profile'
                    : 'Akun publik'}
              </p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="mb-2 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                <Grid3X3 className="h-3.5 w-3.5" />
                {lang === 'en' ? 'Posts' : 'Postingan'}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {visiblePosts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setNavTab('feed');
                    }}
                    className="flex aspect-square items-center justify-center rounded bg-zinc-900 p-2 text-left text-[9px] leading-tight text-zinc-300 hover:bg-zinc-800"
                  >
                    <span className="line-clamp-4">{post.caption}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Social App Tab Bar */}
      <div className="flex shrink-0 items-center justify-around border-t border-white/[0.08] bg-black px-4 py-2">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setNavTab('feed');
          }}
          className={`p-1 transition ${navTab === 'feed' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          aria-label="Feed"
        >
          <Home className="h-4 w-4" />
        </button>
        <span className="p-1 text-zinc-600">
          <Search className="h-4 w-4" />
        </span>
        <span className="p-1 text-zinc-600">
          <Heart className="h-4 w-4" />
        </span>
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setNavTab('profile');
          }}
          className={`p-1 transition ${navTab === 'profile' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          aria-label="Profile"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
