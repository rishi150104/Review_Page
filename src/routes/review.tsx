import { useEffect, useRef, useState, type RefObject } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Heart, Gift as GiftIcon, Users, Zap } from "lucide-react";
import { getPlatform } from "@/config/platforms";
import { generateReview, type ReviewAnswers } from "@/lib/review-api";
import { PlatformTiles } from "@/components/review/PlatformTiles";
import { AdvocacyRewards, type RewardCategoryId } from "@/components/review/AdvocacyRewards";
import { ReviewMethodSelector, type ReviewMethod } from "@/components/review/ReviewMethodSelector";
import { ReviewQuestionnaire, emptyAnswers } from "@/components/review/ReviewQuestionnaire";
import { ReviewError, ReviewLoading } from "@/components/review/ReviewGenerator";
import { GeneratedReview } from "@/components/review/GeneratedReview";
import { SelfWriteCard } from "@/components/review/SelfWriteCard";
import { VideoTestimonialCard } from "@/components/review/VideoTestimonialCard";
import { SuccessMessage } from "@/components/review/SuccessMessage";
import "@/components/review/landing.css";

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [reward, setReward] = useState<RewardCategoryId | null>(null);
  const [method, setMethod] = useState<ReviewMethod | null>(null);
  const [answers, setAnswers] = useState<ReviewAnswers>(emptyAnswers);
  const [status, setStatus] = useState<Status>("idle");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const step2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const platform = getPlatform(platformId);
  const isVideoTestimonial = platform?.id === "video-testimonial";
  const canGenerate =
    reward !== null && answers.name.trim() !== "" && EMAIL_PATTERN.test(answers.email.trim());
  const canGenerateReason = !reward
    ? "Pick a thank-you in step 3 above to continue."
    : "Add your name and email above (step 1) to continue.";

  useEffect(() => {
    if (method) scrollToSection(contentRef);
  }, [method]);

  useEffect(() => {
    if (status === "done" || status === "error") scrollToSection(contentRef);
  }, [status]);

  useEffect(() => {
    if (opened) scrollToSection(successRef);
  }, [opened]);

  const resetMethod = () => {
    setMethod(null);
    setStatus("idle");
    setReview("");
    setErrorMessage("");
    setOpened(false);
  };

  const handleGenerate = async () => {
    if (!platform || status === "loading") return;
    setStatus("loading");
    try {
      const text = await generateReview({ platform: platform.id, answers });
      setReview(text);
      setStatus("done");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  };

  return (
    <main className="vc-lp">
      <div className="wrap">
        <p className="eyebrow">Viralchilly Client Advocacy Program</p>
        <h1>Share Your Experience</h1>
        <p className="lede">
          Your feedback helps us improve and helps other founders choose with confidence.
        </p>

        <div className="badges">
          <span className="badge">
            <Zap aria-hidden="true" /> Quick &amp; easy
          </span>
          <span className="badge">
            <Clock aria-hidden="true" /> Takes 2 minutes
          </span>
          <span className="badge">
            <Heart aria-hidden="true" /> We truly appreciate it
          </span>
        </div>

        {/* Step 1: name + email */}
        <section className="panel">
          <div className="step-head">
            <span className="step-num">1</span>
            <div>
              <h2>Your name &amp; email</h2>
              <p>So we know who to thank and where to send your thank-you.</p>
            </div>
          </div>
          <div className="field-row">
            <div>
              <label htmlFor="review-name" className="sr-only">
                Your name
              </label>
              <input
                id="review-name"
                type="text"
                className="field"
                placeholder="Jane Smith"
                value={answers.name}
                onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="review-email" className="sr-only">
                Your email
              </label>
              <input
                id="review-email"
                type="email"
                className="field"
                placeholder="jane@company.com"
                value={answers.email}
                onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Step 2: public review */}
        <section className="panel">
          <div className="step-head">
            <span className="step-num">2</span>
            <div>
              <h2>Where would you like to leave a review?</h2>
              <p>Pick a platform to continue.</p>
            </div>
          </div>

          <PlatformTiles
            value={platformId}
            onChange={(next) => {
              setPlatformId(next.id);
              setReward(null);
              resetMethod();
              scrollToSection(step2Ref);
            }}
          />
        </section>

        {/* Step 3: advocacy + reward */}
        <section className="panel" ref={step2Ref}>
          <div className="step-head">
            <span className="step-num">3</span>
            <div>
              <h2>
                Go further &amp; pick a thank-you
                <span className="tag">Our way of saying thanks</span>
              </h2>
              <p>Share your story with us directly, then choose a reward you&apos;d like.</p>
            </div>
          </div>

          <div className="note">
            <GiftIcon aria-hidden="true" />
            <span>
              A thank-you gift is for the time you give us — never tied to a rating or a public
              review. Pick the reward you&apos;d like, then share your feedback with us to receive
              it.
            </span>
          </div>

          <AdvocacyRewards
            key={platform?.id}
            platform={platform}
            value={reward}
            onChange={setReward}
          />
        </section>

        {/* Step 4: write mode */}
        {!isVideoTestimonial && (
          <section className="panel">
            <div className="step-head">
              <span className="step-num">4</span>
              <div>
                <h2>How would you like to write it?</h2>
                <p>
                  {!platform
                    ? "Pick a platform in step 2 first."
                    : !reward
                      ? "Pick a thank-you in step 3 first."
                      : "We'll make it as easy as possible."}
                </p>
              </div>
            </div>
            <ReviewMethodSelector
              value={method}
              disabled={!platform || !reward}
              onChange={(next) => {
                setMethod(next);
                setStatus("idle");
                setReview("");
                setErrorMessage("");
                setOpened(false);
              }}
            />
          </section>
        )}

        {platform && isVideoTestimonial && (
          <div ref={contentRef} className="mt-6">
            <VideoTestimonialCard disabled={!canGenerate} disabledReason={canGenerateReason} />
          </div>
        )}

        {platform && method && (
          <div ref={contentRef} className="mt-6">
            {method === "self" && (
              <SelfWriteCard
                platform={platform}
                onOpened={() => setOpened(true)}
                disabled={!canGenerate}
                disabledReason={canGenerateReason}
              />
            )}

            {method === "assisted" && (
              <>
                {status === "idle" && (
                  <ReviewQuestionnaire
                    answers={answers}
                    onAnswersChange={setAnswers}
                    onSubmit={handleGenerate}
                    onBackToStart={resetMethod}
                    canSubmit={canGenerate}
                    canSubmitReason={canGenerateReason}
                  />
                )}
                {status === "loading" && <ReviewLoading />}
                {status === "error" && (
                  <ReviewError onRetry={handleGenerate} message={errorMessage} />
                )}
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
          <div ref={successRef} className="mt-6">
            <SuccessMessage />
          </div>
        )}

        <div className="referral">
          <span className="ic">
            <Users aria-hidden="true" />
          </span>
          <div className="txt">
            <h3>Refer &amp; earn 10% commission</h3>
            <p>
              Know a founder who&apos;d benefit from our work? Introduce them and earn a flat 10% of
              their project value — a separate program, kept clear of review rewards.
            </p>
          </div>
          <Link to="/refer">Learn about referrals</Link>
        </div>

        <p className="disclosure">We only ever ask for honest feedback.</p>
      </div>
    </main>
  );
}
