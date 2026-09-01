import type { ReactElement } from "react";

// Brand marks ported from the ViralChilly Client Advocacy Program mockup, used
// as-is for the platforms it covers. Platforms without a mockup asset fall back
// to a plain lucide icon in PlatformTiles.
export const PLATFORM_LOGOS: Record<string, () => ReactElement> = {
  clutch: () => (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <circle cx="20" cy="20" r="18" fill="#e62415" />
      <circle cx="20" cy="20" r="7.5" fill="#fff" />
      <rect x="27" y="17" width="7" height="6" rx="1" fill="#17313b" />
    </svg>
  ),
  google: () => (
    <svg viewBox="0 0 24 24" width="30" height="30">
      <path
        d="M21.6 12.2c0-.7-.06-1.2-.2-1.8H12v3.4h5.5c-.1.9-.7 2.3-2 3.2l2.9 2.24c1.85-1.7 2.92-4.2 2.92-7.04z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.6 0 4.8-.86 6.4-2.34l-3.05-2.36c-.82.57-1.9.97-3.35.97-2.56 0-4.73-1.7-5.5-4.04l-3.16 2.44C4.94 19.6 8.2 22 12 22z"
        fill="#34A853"
      />
      <path
        d="M6.5 14.23c-.2-.6-.32-1.24-.32-1.9s.12-1.3.31-1.9l-3.15-2.44C2.7 9.32 2.35 10.62 2.35 12s.35 2.68.99 3.94l3.16-2.44z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.06c1.82 0 3.04.78 3.74 1.44l2.73-2.66C16.8 3.3 14.6 2.35 12 2.35 8.2 2.35 4.94 4.75 3.5 8.06l3.16 2.44C7.27 8.16 9.44 6.06 12 6.06z"
        fill="#EA4335"
      />
    </svg>
  ),
  upwork: () => (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <circle cx="20" cy="20" r="18" fill="#14a800" />
      <path
        d="M25.5 15.5c-2.3 0-3.9 1.7-4.6 3.3-.7-1.1-1.3-2.6-1.6-3.6h-2.6v4.7c0 1.5-1 2.6-2.4 2.6s-2.4-1.1-2.4-2.6v-4.7H9.3v4.7c0 2.9 2 5.1 4.9 5.1 2.7 0 4.7-2.2 4.7-4.9 0 0 .3.6.7 1.3-.9 3.9.4 5.6.4 5.6h2.5s-.9-1.6-.5-3.9c.5.5 1.3.9 2.3.9 2.4 0 4.3-2 4.3-4.4s-1.9-4-4.3-4z"
        fill="#fff"
      />
    </svg>
  ),
  trustpilot: () => (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <path
        d="M20 4l4.6 9.9 10.4 1-8 7.3 2.4 10.3L20 27l-9.4 6.5L13 22.2 5 15l10.4-1z"
        fill="#00b67a"
      />
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="7" fill="#0a66c2" />
      <path
        d="M13 16H9v13h4V16zM11 10.2a2.3 2.3 0 100 4.6 2.3 2.3 0 000-4.6zM31 29h-4v-6.9c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V29h-4V16h4v1.8c.5-.8 1.5-2 3.5-2 2.6 0 4.9 1.7 4.9 5.4V29z"
        fill="#fff"
      />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect width="40" height="40" rx="7" fill="#1877f2" />
      <path
        d="M25 21l.7-4.4H21.5v-2.9c0-1.2.6-2.4 2.5-2.4H26V7.5s-1.6-.3-3.2-.3c-3.3 0-5.4 2-5.4 5.6v3.2H13.5V21H17.4v10.6a15 15 0 004.1 0V21H25z"
        fill="#fff"
      />
    </svg>
  ),
};
