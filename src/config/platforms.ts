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
  | "Review Platforms"
  | "Marketplaces"
  | "Social"
  | "Featured / Expertise-type directories";

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
    id: "clutch",
    name: "Clutch",
    displayName: "Clutch",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    displayName: "Trustpilot",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "g2",
    name: "G2",
    displayName: "G2",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "goodfirms",
    name: "GoodFirms",
    displayName: "GoodFirms",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "capterra",
    name: "Capterra",
    displayName: "Capterra",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "bbb",
    name: "BBB",
    displayName: "Better Business Bureau",
    category: "Review Platforms",
    icon: "shield-check",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "yelp",
    name: "Yelp",
    displayName: "Yelp",
    category: "Review Platforms",
    icon: "star",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "google",
    name: "Google",
    displayName: "Google Business Profile",
    category: "Review Platforms",
    icon: "globe",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "upwork",
    name: "Upwork",
    displayName: "Upwork",
    category: "Marketplaces",
    icon: "briefcase",
    reviewUrl: PLACEHOLDER,
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
    displayName: "Facebook Reviews",
    category: "Social",
    icon: "facebook",
    reviewUrl: PLACEHOLDER,
    active: true,
  },
  {
    id: "designrush",
    name: "DesignRush",
    displayName: "DesignRush",
    category: "Featured / Expertise-type directories",
    icon: "award",
    reviewUrl: PLACEHOLDER,
    active: true,
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
