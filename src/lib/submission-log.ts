import { appendSubmissionRow } from "./google-sheets";

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

/** Shared row shape for every /review submission path (assisted, self-write, video). */
export async function logReviewSubmission(entry: SubmissionLogEntry): Promise<void> {
  await appendSubmissionRow([
    new Date().toISOString(),
    entry.name,
    entry.email,
    entry.platform,
    entry.reward,
    entry.method,
    entry.service ?? "",
    entry.goal ?? "",
    entry.experience ?? "",
    entry.likedMost ?? "",
    entry.results ?? "",
    entry.review ?? "",
  ]);
}
