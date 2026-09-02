import { useState } from "react";
import { Check, CreditCard, Gift, HeartHandshake, Link2, type LucideIcon } from "lucide-react";
import type { Platform } from "@/config/platforms";

type RewardCategoryId = "gift" | "credit" | "charity" | "backlink";

interface RewardCategory {
  id: RewardCategoryId;
  Icon: LucideIcon;
  name: string;
  description: string;
  popular?: boolean;
}

const REWARD_CATEGORIES: RewardCategory[] = [
  {
    id: "gift",
    Icon: Gift,
    name: "Gift Card",
    description: "Your Reward, Your Choice",
    popular: true,
  },
  { id: "credit", Icon: CreditCard, name: "Service Credits", description: "Credit toward future work with us." },
  {
    id: "charity",
    Icon: HeartHandshake,
    name: "Charity Card",
    description: "Give a Child the Gift of Education",
  },
  { id: "backlink", Icon: Link2, name: "Guest Post Backlink", description: "A backlink placement on a relevant blog." },
];

const REWARD_VALUES: Record<string, Record<RewardCategoryId, string>> = {
  "video-testimonial": { gift: "80 USD", credit: "200 USD", charity: "80 USD", backlink: "50+ DR — worth 250 USD" },
  clutch: { gift: "80 USD", credit: "150 USD", charity: "80 USD", backlink: "40+ DR — worth 250 USD" },
  linkedin: { gift: "50 USD", credit: "100 USD", charity: "80 USD", backlink: "30+ DR — worth 200 USD" },
  trustpilot: { gift: "30 USD", credit: "50 USD", charity: "80 USD", backlink: "25+ DR — worth 150 USD" },
};

export function AdvocacyRewards({ platform }: { platform: Platform | undefined }) {
  const [reward, setReward] = useState<RewardCategoryId | null>(null);

  const values = platform ? REWARD_VALUES[platform.id] : undefined;
  const rewardName = REWARD_CATEGORIES.find((r) => r.id === reward)?.name;

  if (!values) {
    return (
      <>
        <p className="rlabel">Choose your thank-you</p>
        <p className="lede">Pick a platform above to see your thank-you options for it.</p>
      </>
    );
  }

  return (
    <>
      <p className="rlabel">Choose your thank-you</p>
      <div className="rewards" role="group" aria-label="Thank-you reward">
        {REWARD_CATEGORIES.map(({ id, Icon, name, description, popular }) => (
          <button
            key={id}
            type="button"
            className={`reward${reward !== null && reward !== id ? " dimmed" : ""}`}
            aria-pressed={reward === id}
            onClick={() => setReward((current) => (current === id ? null : id))}
          >
            <span className="check">
              <Check size={10} />
            </span>
            <span className="ic">
              <Icon size={26} />
            </span>
            <div className="rn">{name}</div>
            <div className="rv">
              {id === "gift" && (
                <>
                  <strong>{values[id]}</strong> Amazon Gift Card
                </>
              )}
              {id === "credit" && (
                <>
                  <strong>{values[id]}</strong> of Complimentary Services
                </>
              )}
              {id === "charity" && (
                <>
                  <strong>{values[id]}</strong> to{" "}
                  <a
                    href="https://kindrays.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Kind Rays Foundation
                  </a>
                </>
              )}
              {id === "backlink" &&
                (() => {
                  const match = values[id].match(/^(.*?)(\d+\+?\s*USD)$/);
                  if (!match) return values[id];
                  const [, prefix, price] = match;
                  return (
                    <>
                      {prefix}
                      <strong>{price}</strong>
                    </>
                  );
                })()}
            </div>
            <div className="rd">{description}</div>
            {popular && <span className="popular">Most popular</span>}
          </button>
        ))}
      </div>

      {rewardName && (
        <p className="confirm show">
          Great — once you share your feedback with us, we&apos;ll send your{" "}
          {rewardName.toLowerCase()} as a thank-you.
        </p>
      )}
    </>
  );
}
