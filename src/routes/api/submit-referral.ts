import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { appendSubmissionRow } from "@/lib/google-sheets";
import { istTimestamp } from "@/lib/ist-time";

const bodySchema = z.object({
  yourName: z.string().min(1),
  yourEmail: z.string().email(),
  referralName: z.string().min(1),
  referralEmail: z.string().email(),
  company: z.string().min(1),
  services: z.array(z.string()).min(1),
  message: z.string().default(""),
});

export const Route = createFileRoute("/api/submit-referral")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
        }

        try {
          await appendSubmissionRow(
            [
              istTimestamp(),
              parsed.yourName,
              parsed.yourEmail,
              parsed.referralName,
              parsed.referralEmail,
              parsed.company,
              parsed.services.join(", "),
              parsed.message,
            ],
            process.env["GOOGLE_SHEETS_REFERRAL_RANGE"] || "Referrals!A1",
          );
        } catch (err) {
          console.error("Google Sheets referral logging failed:", err);
          return Response.json({ error: "Could not record the referral." }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
