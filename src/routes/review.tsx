import { useEffect, useRef, useState, type RefObject } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getPlatform } from "@/config/platforms";
import { generateReview, type ReviewAnswers } from "@/lib/review-api";
import { PlatformSelector } from "@/components/review/PlatformSelector";
import {
  ReviewMethodSelector,
  type ReviewMethod,
} from "@/components/review/ReviewMethodSelector";
import { ReviewQuestionnaire, emptyAnswers } from "@/components/review/ReviewQuestionnaire";
import { ReviewError, ReviewLoading } from "@/components/review/ReviewGenerator";
import { GeneratedReview } from "@/components/review/GeneratedReview";
import { SelfWriteCard } from "@/components/review/SelfWriteCard";
import { SuccessMessage } from "@/components/review/SuccessMessage";

const title = "Share Your Experience — Client Review";
const description =
  "Tell us about your experience working with our team and leave a review on the platform of your choice in just a few steps.";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/review" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/review" }],
  }),
  component: ReviewPage,
});

type Status = "idle" | "loading" | "error" | "done";

// Vertical-only scroll: scrollIntoView can also nudge horizontal scroll when
// the layout shifts (e.g. a closing dropdown briefly widens the document),
// which reads as unwanted side-to-side motion.
function scrollToSection(ref: RefObject<HTMLDivElement | null>) {
  const target = ref.current;
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, left: 0, behavior: "smooth" });
}

function ReviewPage() {
  const [platformId, setPlatformId] = useState<string | null>(null);
  const [platformConfirmed, setPlatformConfirmed] = useState(false);
  const [method, setMethod] = useState<ReviewMethod | null>(null);
  const [answers, setAnswers] = useState<ReviewAnswers>(emptyAnswers);
  const [status, setStatus] = useState<Status>("idle");
  const [review, setReview] = useState("");
  const [opened, setOpened] = useState(false);
  const methodSectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const platform = getPlatform(platformId);

  useEffect(() => {
    if (platformConfirmed) scrollToSection(methodSectionRef);
  }, [platformConfirmed]);

  useEffect(() => {
    if (method) scrollToSection(contentRef);
  }, [method]);

  useEffect(() => {
    if (status === "done" || status === "error") scrollToSection(contentRef);
  }, [status]);

  useEffect(() => {
    if (opened) scrollToSection(successRef);
  }, [opened]);

  const handleGenerate = async () => {
    if (!platform || status === "loading") return;
    setStatus("loading");
    try {
      const text = await generateReview({ platform: platform.id, answers });
      setReview(text);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const resetMethod = () => {
    setMethod(null);
    setStatus("idle");
    setReview("");
    setOpened(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-6 sm:py-14">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Viralchilly Client Advocacy Program
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Share Your Experience
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
            We&apos;d love to hear about your experience working with us. Choose where you&apos;d
            like to leave your feedback and we&apos;ll make the process simple.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Your feedback helps us improve and helps other businesses make informed decisions.
          </p>
        </header>

        <div className="mt-10 space-y-6">
          <PlatformSelector
            value={platformId}
            onChange={(id) => {
              setPlatformId(id);
              setPlatformConfirmed(false);
              resetMethod();
            }}
            onContinue={() => setPlatformConfirmed(true)}
          />

          {platformConfirmed && platform && (
            <div ref={methodSectionRef}>
              <ReviewMethodSelector
                value={method}
                onChange={(next) => {
                  setMethod(next);
                  setStatus("idle");
                  setReview("");
                  setOpened(false);
                }}
              />
            </div>
          )}

          {platformConfirmed && platform && method && (
            <div ref={contentRef}>
              {method === "self" && (
                <SelfWriteCard platform={platform} onOpened={() => setOpened(true)} />
              )}

              {method === "assisted" && (
                <>
                  {status === "idle" && (
                    <ReviewQuestionnaire
                      answers={answers}
                      onAnswersChange={setAnswers}
                      onSubmit={handleGenerate}
                      onBackToStart={resetMethod}
                    />
                  )}
                  {status === "loading" && <ReviewLoading />}
                  {status === "error" && <ReviewError onRetry={handleGenerate} />}
                  {status === "done" && (
                    <GeneratedReview
                      platform={platform}
                      review={review}
                      onReviewChange={setReview}
                      onOpened={() => setOpened(true)}
                    />
                  )}
                </>
              )}
            </div>
          )}

          {opened && (
            <div ref={successRef}>
              <SuccessMessage />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
