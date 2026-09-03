import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { logReviewSubmission } from "@/lib/submission-log";

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  platform: z.string().min(1),
  reward: z.string().default(""),
  method: z.enum(["self", "video"]),
});

/**
 * Logs the self-write and video-testimonial paths, which never call
 * /api/generate-review (no AI generation happens there). Best-effort, same
 * as the assisted flow's logging — a Sheets hiccup shouldn't stop someone
 * from opening the review platform link or the video instructions dialog.
 */
export const Route = createFileRoute("/api/log-submission")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        try {
          await logReviewSubmission({
            name: parsed.name,
            email: parsed.email,
            platform: parsed.platform,
            reward: parsed.reward,
            method: parsed.method,
          });
        } catch (err) {
          console.error("Google Sheets logging failed:", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
