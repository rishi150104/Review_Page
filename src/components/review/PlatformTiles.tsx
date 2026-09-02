import {
  Award,
  Briefcase,
  Check,
  Globe,
  ShieldCheck,
  Star,
  Video,
  type LucideIcon,
} from "lucide-react";
import { activePlatforms, type Platform } from "@/config/platforms";
import { PLATFORM_LOGOS } from "./platform-logos";

const ICONS: Record<string, LucideIcon> = {
  star: Star,
  "shield-check": ShieldCheck,
  globe: Globe,
  briefcase: Briefcase,
  award: Award,
  video: Video,
};

interface PlatformTilesProps {
  value: string | null;
  onChange: (platform: Platform) => void;
}

export function PlatformTiles({ value, onChange }: PlatformTilesProps) {
  return (
    <div className="platforms" role="group" aria-label="Review platform">
      {activePlatforms().map((platform) => {
        const Logo = PLATFORM_LOGOS[platform.id];
        const Icon = ICONS[platform.icon] ?? Star;
        return (
          <button
            key={platform.id}
            type="button"
            className="pf"
            aria-pressed={value === platform.id}
            onClick={() => onChange(platform)}
          >
            <span className="check">
              <Check size={11} />
            </span>
            <span className="logo">{Logo ? <Logo /> : <Icon size={26} />}</span>
            <span className="pn">{platform.displayName}</span>
          </button>
        );
      })}
    </div>
  );
}
