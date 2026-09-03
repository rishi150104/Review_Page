export interface LogSubmissionPayload {
  name: string;
  email: string;
  platform: string;
  reward: string;
  method: "self" | "video";
}

/** Fire-and-forget: never blocks the UI action (opening a link/dialog) on logging. */
export function logSubmission(payload: LogSubmissionPayload): void {
  fetch("/api/log-submission", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("Submission logging failed:", err));
}
