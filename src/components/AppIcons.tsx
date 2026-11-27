import React from 'react';

export const MessagesAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="url(#msgGrad)" />
    <path
      d="M32 15C21.5 15 13 22.2 13 31.1C13 35.9 15.5 40.2 19.5 43.1L17.6 49.4L24.5 46.1C26.8 46.8 29.4 47.2 32 47.2C42.5 47.2 51 40 51 31.1C51 22.2 42.5 15 32 15Z"
      fill="white"
    />
    <circle cx="24.5" cy="31" r="2.3" fill="#16a34a" />
    <circle cx="32" cy="31" r="2.3" fill="#16a34a" />
    <circle cx="39.5" cy="31" r="2.3" fill="#16a34a" />
    <defs>
      <linearGradient id="msgGrad" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ade80" />
        <stop offset="1" stopColor="#16a34a" />
      </linearGradient>
    </defs>
  </svg>
);

export const GalleryAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="#ffffff" />
    <rect x="28.5" y="10" width="7" height="17" rx="3.5" fill="#fb923c" />
    <rect x="28.5" y="37" width="7" height="17" rx="3.5" fill="#38bdf8" />
    <rect x="10" y="28.5" width="17" height="7" rx="3.5" fill="#a855f7" />
    <rect x="37" y="28.5" width="17" height="7" rx="3.5" fill="#4ade80" />
    <rect
      x="15.5"
      y="16.5"
      width="7"
      height="16"
      rx="3.5"
      transform="rotate(-45 15.5 16.5)"
      fill="#f43f5e"
    />
    <rect
      x="35"
      y="36"
      width="7"
      height="16"
      rx="3.5"
      transform="rotate(-45 35 36)"
      fill="#3b82f6"
    />
    <rect
      x="43"
      y="11.5"
      width="7"
      height="16"
      rx="3.5"
      transform="rotate(45 43 11.5)"
      fill="#facc15"
    />
    <rect
      x="23.5"
      y="31"
      width="7"
      height="16"
      rx="3.5"
      transform="rotate(45 23.5 31)"
      fill="#2dd4bf"
    />
  </svg>
);

export const NotesAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="#fafafa" />
    <path d="M0 16C0 7.163 7.163 0 16 0H48C56.837 0 64 7.163 64 16V20H0V16Z" fill="#f59e0b" />
    <line x1="10" y1="30" x2="54" y2="30" stroke="#e4e4e7" strokeWidth="2.2" />
    <line x1="10" y1="40" x2="54" y2="40" stroke="#e4e4e7" strokeWidth="2.2" />
    <line x1="10" y1="50" x2="40" y2="50" stroke="#e4e4e7" strokeWidth="2.2" />
  </svg>
);

export const MapsAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="#e2e8f0" />
    <path d="M0 40L64 14V64H0V40Z" fill="#bbf7d0" />
    <path d="M0 0H28L18 64H0V0Z" fill="#bfdbfe" />
    <path d="M12 64L42 0" stroke="#ffffff" strokeWidth="7" />
    <path d="M0 32L64 46" stroke="#facc15" strokeWidth="5" />
    <circle cx="38" cy="24" r="10" fill="#ef4444" />
    <circle cx="38" cy="24" r="4" fill="#ffffff" />
  </svg>
);

export const BrowserAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="#ffffff" />
    <circle cx="32" cy="32" r="22" fill="url(#brwGrad)" />
    <path d="M38 26L26 38L23 41L35 29L38 26Z" fill="white" />
    <path d="M38 26L35 29L29 29L38 26Z" fill="#ef4444" />
    <polygon points="38,26 29,29 35,35" fill="#ef4444" />
    <polygon points="26,38 35,35 29,29" fill="#ffffff" />
    <defs>
      <linearGradient id="brwGrad" x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

export const ReportAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="url(#repGrad)" />
    <rect x="18" y="14" width="28" height="36" rx="4" fill="white" fillOpacity="0.95" />
    <rect x="24" y="22" width="16" height="3" rx="1.5" fill="#0f172a" />
    <rect x="24" y="29" width="16" height="3" rx="1.5" fill="#64748b" />
    <rect x="24" y="36" width="10" height="3" rx="1.5" fill="#64748b" />
    <circle cx="44" cy="44" r="10" fill="#10b981" />
    <path
      d="M40 44L42.8 46.8L48 41.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="repGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#334155" />
        <stop offset="1" stopColor="#0f172a" />
      </linearGradient>
    </defs>
  </svg>
);

export const SocialAppIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
    <rect width="64" height="64" rx="16" fill="url(#socGrad)" />
    {/* Clean rounded speech-bubble silhouette */}
    <path
      d="M17 28C17 20.8203 23.7157 15 32 15C40.2843 15 47 20.8203 47 28C47 35.1797 40.2843 41 32 41C29.4 41 26.95 40.42 24.8 39.4L18.5 43.2C17.6 43.75 16.5 42.95 16.8 41.95L18.4 36.6C17.5 34.05 17 31.1 17 28Z"
      fill="white"
      fillOpacity="0.96"
    />
    {/* Crisp '@' mark inside bubble */}
    <circle cx="32" cy="28" r="4.5" stroke="#e11d48" strokeWidth="2.6" />
    <path
      d="M36.5 24V29.5C36.5 31.2 37.8 32.2 39.1 31.8C40.6 31.3 41.3 29.7 41.3 27.9C41.3 22.8 37.2 19.2 32 19.2C26.7 19.2 22.7 23.2 22.7 28.2C22.7 33.4 26.9 37 32.3 37C34.5 37 36.5 36.4 38 35.4"
      stroke="#e11d48"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="socGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fb7185" />
        <stop offset="0.55" stopColor="#e11d48" />
        <stop offset="1" stopColor="#9f1239" />
      </linearGradient>
    </defs>
  </svg>
);

