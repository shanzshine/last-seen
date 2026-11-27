import React from 'react';
import type { Language } from '../i18n/strings';

interface CorruptedTextProps {
  text: string;
  lang: Language;
  className?: string;
}

const CORRUPT_REGEX = /\{\{corrupt:([^}]+)\}\}/g;

/**
 * Renders message text with intentional blur-pixelated corruption markers
 * (`{{corrupt:...}}`) and a subtle signal-loss cue so players know it is not a bug.
 */
export const CorruptedText: React.FC<CorruptedTextProps> = ({ text, lang, className = '' }) => {
  const hasCorrupt = /\{\{corrupt:[^}]+\}\}/.test(text);
  if (!hasCorrupt) {
    return <p className={className}>{text}</p>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(CORRUPT_REGEX.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const corruptedWord = match[1];
    parts.push(
      <span
        key={`${match.index}-${corruptedWord}`}
        aria-label={lang === 'en' ? 'corrupted signal fragment' : 'fragmen sinyal terkorupsi'}
        className="mx-0.5 inline-block select-none rounded-[3px] bg-white/15 px-1 tracking-wider text-white/75 blur-[2.4px] animate-pulse"
        style={{ imageRendering: 'pixelated' }}
      >
        {corruptedWord}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <div>
      <p className={className}>{parts}</p>
      <p className="mt-1 font-mono text-[9px] tracking-wide text-amber-300/75">
        {lang === 'en'
          ? '⚠ Weak signal • partial data corrupted'
          : '⚠ Sinyal lemah • sebagian data terkorupsi'}
      </p>
    </div>
  );
};
