import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { logReviewSubmission } from "@/lib/submission-log";

/**
 * Backend endpoint for review generation.
 * The OpenAI key is read from the server environment only — it is never sent
 * to, or referenced by, the browser bundle.
 */

const bodySchema = z.object({
  platform: z.string().min(1),
  reward: z.string().default(""),
  answers: z.object({
    name: z.string().default(""),
    email: z.string().default(""),
    service: z.string().default(""),
    goal: z.string().default(""),
    experience: z.string().default(""),
    likedMost: z.string().default(""),
    results: z.string().default(""),
  }),
});

const SYSTEM_PROMPT = `You help a real client articulate their experience with a digital marketing agency named Viralchilly as a first-person review draft.

Strict rules:
- Use ONLY information the client provided. Never invent results, statistics, services, timelines, names, experiences, outcomes, or achievements.
- Mention the agency by name, Viralchilly, somewhere in the review.
- The final review MUST have a naturally positive and appreciative tone, even if the client's original input is neutral or negative.
- If the client provides positive information, prioritize and emphasize those positive points.
- If the client provides both positive and negative information, use ONLY the positive and neutral/factual information. Completely omit all negative or critical information.
- If the client's input is negative, do NOT mention, repeat, or hint at any negative experience. Instead, identify any neutral or factual information that can be presented in a constructive, positive way.
- If the input contains no positive information, do NOT fabricate praise, satisfaction, results, or benefits. Use the available factual information to create the most positive-sounding review that can be supported by the input.
- The review should feel mildly positive, genuine, and believable — not exaggerated, promotional, or overly enthusiastic.
- Never turn a factual statement into an unsupported positive claim.
- Write in first person, natural and human, 90-160 words.
- Avoid marketing hype, superlatives, and generic AI phrasing ("game changer", "in today's fast-paced world", "highly recommend to anyone").
- Skip any question the client left blank instead of filling the gap.
- Output only the review text, no headings or quotes.`;

export const Route = createFileRoute("/api/generate-review")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["OPENAI_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "Review generation is not configured." }, { status: 503 });
        }

        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const { platform, reward, answers } = parsed;
        const fields = [
          ["Service worked on", answers.service],
          ["Goal or challenge", answers.goal],
          ["Experience with the team", answers.experience],
          ["Liked most", answers.likedMost],
          ["Results or outcomes", answers.results],
        ].filter(([, value]) => (value ?? "").trim() !== "");

        if (fields.length === 0) {
          return Response.json({ error: "Please answer at least one question." }, { status: 400 });
        }

        const userPrompt = [
          `Review platform: ${platform}`,
          "",
          ...fields.map(([label, value]) => `${label}: ${value}`),
        ].join("\n");

        try {
          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              temperature: 0.7,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
              ],
            }),
          });

          if (!res.ok) {
            return Response.json({ error: "Upstream generation failed." }, { status: 502 });
          }

          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const review = data.choices?.[0]?.message?.content?.trim();
          if (!review) {
            return Response.json({ error: "Empty generation result." }, { status: 502 });
          }

          try {
            await logReviewSubmission({
              name: answers.name,
              email: answers.email,
              platform,
              reward,
              method: "assisted",
              service: answers.service,
              goal: answers.goal,
              experience: answers.experience,
              likedMost: answers.likedMost,
              results: answers.results,
              review,
            });
          } catch (err) {
            // Logging the submission is best-effort — never fail the request over it.
            console.error("Google Sheets logging failed:", err);
          }

          return Response.json({ review });
        } catch {
          return Response.json({ error: "Review generation failed." }, { status: 500 });
        }
      },
    },
  },
});
