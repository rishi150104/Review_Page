import { useEffect, useRef, useState } from "react";
import {
  Check,
  Coffee,
  CreditCard,
  Gift,
  HeartHandshake,
  Phone,
  Search,
  type LucideIcon,
} from "lucide-react";

type RewardCategory = "gift" | "credit" | "seo" | "other";

interface Reward {
  id: string;
  Icon: LucideIcon;
  name: string;
  description: string;
  value: string;
  category: RewardCategory;
}

const REWARDS: Reward[] = [
  {
    id: "amazon",
    Icon: Gift,
    name: "Amazon gift card",
    description: "Choose the amount you prefer.",
    value: "$10 – $50",
    category: "gift",
  },
  {
    id: "starbucks",
    Icon: Coffee,
    name: "Starbucks gift card",
    description: "A coffee on us.",
    value: "$10 – $50",
    category: "gift",
  },
  {
    id: "credit",
    Icon: CreditCard,
    name: "Service credit",
    description: "Use toward any future work.",
    value: "$25 – $50",
    category: "credit",
  },
  {
    id: "audit",
    Icon: Search,
    name: "Free marketing audit",
    description: "A detailed audit of your site.",
    value: "$50 value",
    category: "seo",
  },
  {
    id: "call",
    Icon: Phone,
    name: "Free strategy call",
    description: "A 30-minute session with our team.",
    value: "$50 value",
    category: "seo",
  },
  {
    id: "charity",
    Icon: HeartHandshake,
    name: "Charity donation",
    description: "We donate to a cause you choose.",
    value: "$50",
    category: "other",
  },
];

const TABS: { id: "all" | RewardCategory; label: string }[] = [
  { id: "all", label: "All rewards" },
  { id: "gift", label: "Gift cards" },
  { id: "credit", label: "Service credits" },
  { id: "seo", label: "SEO & marketing" },
  { id: "other", label: "Other perks" },
];

interface AdvocacyRewardsProps {
  onRewardSelected?: () => void;
}

export function AdvocacyRewards({ onRewardSelected }: AdvocacyRewardsProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [reward, setReward] = useState<string | null>(null);
  const wasSelected = useRef(false);

  useEffect(() => {
    const selected = reward !== null;
    if (selected && !wasSelected.current) onRewardSelected?.();
    wasSelected.current = selected;
  }, [reward, onRewardSelected]);

  const rewardName = REWARDS.find((r) => r.id === reward)?.name;
  const visibleRewards = REWARDS.filter((r) => tab === "all" || r.category === tab);

  return (
    <>
      <p className="rlabel">Choose your thank-you</p>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rewards" role="radiogroup" aria-label="Thank-you reward">
        {visibleRewards.map(({ id, Icon, name, description, value }) => (
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
              <Icon size={22} />
            </span>
            <div className="rn">{name}</div>
            <div className="rd">{description}</div>
            <span className="val">{value}</span>
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
