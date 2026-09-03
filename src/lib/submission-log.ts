import { appendSubmissionRow } from "./google-sheets";
import { istTimestamp } from "./ist-time";

export type SubmissionMethod = "assisted" | "self" | "video";

export interface SubmissionLogEntry {
  name: string;
  email: string;
  platform: string;
  reward: string;
  method: SubmissionMethod;
  service?: string;
  goal?: string;
  experience?: string;
  likedMost?: string;
  results?: string;
  review?: string;
}

/** Reward ids -> the same display names shown in AdvocacyRewards.tsx. */
const REWARD_LABELS: Record<string, string> = {
  gift: "Gift Card",
  credit: "Service Credits",
  charity: "Charity Card",
  backlink: "Guest Post Backlink",
};

const METHOD_LABELS: Record<SubmissionMethod, string> = {
  assisted: "Assisted",
  self: "Self",
  video: "Video",
};

/** Shared row shape for every /review submission path (assisted, self-write, video). */
export async function logReviewSubmission(entry: SubmissionLogEntry): Promise<void> {
  await appendSubmissionRow([
    istTimestamp(),
    entry.name,
    entry.email,
    entry.platform,
    REWARD_LABELS[entry.reward] ?? entry.reward,
    METHOD_LABELS[entry.method],
    entry.service ?? "",
    entry.goal ?? "",
    entry.experience ?? "",
    entry.likedMost ?? "",
    entry.results ?? "",
    entry.review ?? "",
  ]);
}
