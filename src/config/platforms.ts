/**
 * Centralized platform configuration.
 *
 * HOW TO EDIT:
 * - Replace every `reviewUrl` marked PLACEHOLDER with the company's real
 *   profile / "write a review" URL on that platform.
 * - Set `active: false` to temporarily hide a platform from the selector.
 * - Add a new platform by appending an object with a unique `id`.
 *
 * Nothing else in the app hard-codes a platform URL.
 */

export type PlatformCategory =
  "Review Platforms" | "Marketplaces" | "Social" | "Featured / Expertise-type directories";

export interface Platform {
  id: string;
  name: string;
  displayName: string;
  category: PlatformCategory;
  /** Lucide icon name rendered by the UI, kept as a string so config stays data-only. */
  icon: string;
  /** REPLACE the PLACEHOLDER values below with real company profile URLs. */
  reviewUrl: string;
  active: boolean;
}

const PLACEHOLDER = "https://example.com/replace-with-company-profile-url";

export const platforms: Platform[] = [
  {
    id: "video-testimonial",
    name: "Video Testimonial",
    displayName: "Video Testimonial",
    category: "Review Platforms",
    icon: "video",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "clutch",
    name: "Clutch",
    displayName: "Clutch",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: "https://clutch.co/go-to-review/c45baf53-509e-49cb-8974-a4ece3c4a906/316438",
    active: true,
  },
  {
    id: "google",
    name: "Google",
    displayName: "Google Business",
    category: "Review Platforms",
    icon: "globe",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "upwork",
    name: "Upwork",
    displayName: "Upwork",
    category: "Marketplaces",
    icon: "briefcase",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    displayName: "Trustpilot",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: "https://www.trustpilot.com/evaluate/viralchilly.com",
    active: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    displayName: "LinkedIn",
    category: "Social",
    icon: "linkedin",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    displayName: "Facebook",
    category: "Social",
    icon: "facebook",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "g2",
    name: "G2",
    displayName: "G2",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "goodfirms",
    name: "GoodFirms",
    displayName: "GoodFirms",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "capterra",
    name: "Capterra",
    displayName: "Capterra",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "bbb",
    name: "BBB",
    displayName: "Better Business Bureau",
    category: "Review Platforms",
    icon: "shield-check",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "yelp",
    name: "Yelp",
    displayName: "Yelp",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
  {
    id: "designrush",
    name: "DesignRush",
    displayName: "DesignRush",
    category: "Featured / Expertise-type directories",
    icon: "award",
    reviewUrl: PLACEHOLDER,
    active: false,
  },
];

export const categoryOrder: PlatformCategory[] = [
  "Review Platforms",
  "Marketplaces",
  "Social",
  "Featured / Expertise-type directories",
];

export const activePlatforms = () => platforms.filter((p) => p.active);

export const getPlatform = (id: string | null): Platform | undefined =>
  id ? platforms.find((p) => p.id === id) : undefined;
