/**
 * Central API service for review generation.
 *
 * The endpoint is configurable: set VITE_REVIEW_API_URL to point at an
 * external backend, otherwise the app posts to the local /api/generate-review
 * route. No API keys ever live in this file or anywhere in the browser bundle.
 */

export interface ReviewAnswers {
  name: string;
  email: string;
  service: string;
  goal: string;
  experience: string;
  likedMost: string;
  results: string;
}

export interface GenerateReviewRequest {
  platform: string;
  reward: string;
  answers: ReviewAnswers;
}

export interface GenerateReviewResponse {
  review: string;
}

export const REVIEW_API_URL =
  (import.meta.env["VITE_REVIEW_API_URL"] as string | undefined) ?? "/api/generate-review";

export async function generateReview(
  payload: GenerateReviewRequest,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch(REVIEW_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Review generation failed with status ${response.status}`);
  }

  const data = (await response.json()) as Partial<GenerateReviewResponse>;
  if (!data || typeof data.review !== "string" || data.review.trim() === "") {
    throw new Error("Review generation returned an empty response");
  }

  return data.review.trim();
}
