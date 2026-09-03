import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/refer/Reveal";
import { useReveal } from "@/components/refer/useReveal";
import "@/components/refer/referral.css";

const title = "Refer & Earn — ViralChilly";
const description =
  "Know a founder who'd benefit from working with us? Introduce them and earn 10% of their project value.";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/refer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/refer" }],
  }),
  component: ReferPage,
});

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Think of someone",
    description:
      "A founder, business owner or team in your network needs help with something we do exceptionally well. You believe there's a genuine opportunity for us to work together.",
  },
  {
    number: "02",
    title: "Make the introduction",
    description:
      "Send us their details through the referral form. Give us enough context to understand why you think there could be a fit, and we'll reach out thoughtfully.",
  },
  {
    number: "03",
    title: "We do the work",
    description:
      "From the first conversation through to the proposal and project, we'll handle the relationship from there. If they become a client, your referral earns you 10%.",
  },
];

const REWARD_DETAILS = [
  { title: "10% commission", description: "Based on the qualifying project value" },
  { title: "Simple attribution", description: "Your referral is recorded when submitted" },
  { title: "No selling required", description: "Our team handles the conversation" },
  { title: "Genuine introductions", description: "Quality matters more than quantity" },
];

const FIT_ITEMS = [
  {
    icon: "↗",
    title: "Founders building something ambitious",
    description:
      "They're turning an idea into a business, launching something new or preparing for their next stage of growth.",
  },
  {
    icon: "✦",
    title: "Businesses ready for a better version",
    description:
      "They know their current solution isn't getting them where they want to go and are ready to invest in doing it properly.",
  },
  {
    icon: "◎",
    title: "Teams that care about quality",
    description:
      "They aren't looking for the cheapest option. They're looking for a thoughtful partner who can understand the bigger picture.",
  },
  {
    icon: "♡",
    title: "Someone you'd confidently recommend",
    description:
      "This is perhaps the most important qualification. If you'd put your own reputation behind the introduction, we'd like to hear about it.",
  },
];

const SERVICES = [
  {
    id: "web-dev",
    icon: "⬡",
    label: "Website Development",
    description: "Custom, fast, conversion-focused websites built to support growth.",
  },
  {
    id: "seo",
    icon: "◈",
    label: "Search Engine Optimization",
    description: "Technical SEO, content, and link building that moves rankings that matter.",
  },
  {
    id: "ppc",
    icon: "➤",
    label: "Pay-Per-Click Ads",
    description: "Google & paid social campaigns built to convert, not just click.",
  },
];

const FORM_PERKS = [
  "Takes less than two minutes",
  "We handle the follow-up",
  "Your referral is recorded",
  "10% reward when they qualify",
];

const FAQ_ITEMS = [
  {
    question: "What qualifies as a referral?",
    answer:
      "A referral is a new introduction to a potential client who has a genuine need for our services and is not already engaged in an active sales conversation with us.",
  },
  {
    question: "What happens after I submit someone?",
    answer:
      "We'll review the introduction and, where appropriate, reach out to the person you referred. You don't need to sell them on our services or manage the conversation. That's our job.",
  },
  {
    question: "When is the 10% commission paid?",
    answer:
      "The referral commission becomes payable once the referred project meets the program's agreed payment and qualification requirements. Exact payment timing and conditions should be defined in the referral terms.",
  },
  {
    question: "Do I earn from future work as well?",
    answer:
      "This depends on the terms of the specific referral. We recommend clearly defining whether the reward applies to the initial engagement only or also to subsequent work.",
  },
  {
    question: "What if you already know the person I referred?",
    answer:
      "If someone is already in an active conversation with us before your introduction, they may not qualify as a new referral. We'll always aim to be transparent about attribution.",
  },
  {
    question: "Can I refer more than one person?",
    answer:
      "Absolutely. There is no need to limit yourself to a single introduction. We simply ask that referrals are genuine and relevant rather than mass submissions.",
  },
];

const STAGGER_STEP_MS = 90;

function ProcessCard({
  step,
  index,
  isLast,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`process-card ${revealClass}`}
      style={{ transitionDelay: `${index * STAGGER_STEP_MS}ms` }}
    >
      <div className="process-number">{step.number}</div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      {!isLast && <div className="process-line" />}
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`service-card ${revealClass}`}
      style={{ transitionDelay: `${index * STAGGER_STEP_MS}ms` }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3>{service.label}</h3>
      <p>{service.description}</p>
    </div>
  );
}

function FitItem({ item, index }: { item: (typeof FIT_ITEMS)[number]; index: number }) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`fit-item ${revealClass}`}
      style={{ transitionDelay: `${index * STAGGER_STEP_MS}ms` }}
    >
      <div className="fit-icon">{item.icon}</div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`faq-item ${revealClass}`}
      style={{ transitionDelay: `${index * STAGGER_STEP_MS}ms` }}
    >
      <div className="faq-question">
        <span>{item.question}</span>
        <span className="faq-plus">+</span>
      </div>
      <div className="faq-answer">{item.answer}</div>
    </div>
  );
}

function ReferPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="vc-refer">
      {/* Navigation */}
      <nav>
        <div className="container nav-inner">
          <a href="#" className="logo">
            ViralChilly
          </a>
          <div className="nav-links">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </a>
            <a href="#faq">FAQs</a>
            <a href="#refer" className="nav-cta">
              Make a referral
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow hero-in" style={{ animationDelay: "0ms" }}>
              <span className="eyebrow-dot"></span>
              Our referral program
            </div>

            <h1>
              <span className="hero-in" style={{ animationDelay: "90ms" }}>
                Good people know
              </span>
              <span className="hero-in" style={{ animationDelay: "180ms" }}>
                <em>good people.</em>
              </span>
            </h1>

            <p className="hero-description hero-in" style={{ animationDelay: "300ms" }}>
              You know a founder with a big idea, a growing business that needs the right partner,
              or a team ready to take their next step. Introduce them to us — and when they become a
              client, we'll thank you with 10% of their project value.
            </p>

            <div className="hero-actions hero-in" style={{ animationDelay: "400ms" }}>
              <a href="#refer" className="button button-primary">
                Introduce someone <span>→</span>
              </a>
              <a href="#how-it-works" className="button button-secondary">
                See how it works
              </a>
            </div>

            <p className="hero-note hero-in" style={{ animationDelay: "480ms" }}>
              No affiliate links. No complicated tracking. Just a great introduction.
            </p>
          </div>

          <div className="hero-stats hero-in" style={{ animationDelay: "560ms" }}>
            <div className="hero-stat">
              <strong>10%</strong>
              <span>Referral commission</span>
            </div>
            <div className="hero-stat">
              <strong>01</strong>
              <span>Simple introduction</span>
            </div>
            <div className="hero-stat">
              <strong>∞</strong>
              <span>People you can refer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Intro / brand story */}
      <section className="intro">
        <div className="container intro-grid">
          <Reveal>
            <div className="intro-label">Why we built this</div>
            <h2>The best work often starts with a simple introduction.</h2>
          </Reveal>

          <Reveal delay={120} className="intro-copy">
            <p>
              Some of our most meaningful projects have started with someone saying, "You should
              talk to them."
            </p>
            <p>
              That's what this program is designed to celebrate. Not cold leads. Not mass referrals.
              Not a race to send the most names.
            </p>
            <p>
              Just genuine introductions between people who could create something worthwhile
              together.
            </p>

            <div className="intro-highlight">
              "If you believe we'd be a good fit for someone in your network, make the introduction.
              We'll take it from there."
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how-it-works">
        <div className="container">
          <Reveal className="section-header center">
            <div className="section-kicker">Simple by design</div>
            <h2>Three steps. One good introduction.</h2>
            <p>
              We've intentionally kept the process lightweight. Your role is to connect the right
              people. Our role is to do the rest.
            </p>
          </Reveal>

          <div className="process">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard
                step={step}
                index={i}
                isLast={i === PROCESS_STEPS.length - 1}
                key={step.number}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reward */}
      <section className="reward-section">
        <div className="container">
          <div className="reward-card">
            <Reveal className="reward-copy">
              <div className="section-kicker">A thank-you that matters</div>
              <h2>Your introduction is worth something.</h2>
              <p>
                When your referral becomes a client, you receive 10% of the project value. It's our
                way of recognizing the trust behind the introduction and the value you helped
                create.
              </p>

              <div className="reward-details">
                {REWARD_DETAILS.map((detail) => (
                  <div className="reward-detail" key={detail.title}>
                    <strong>{detail.title}</strong>
                    <span>{detail.description}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="reward-visual">
              <div className="reward-amount">
                <div className="small">You earn</div>
                <strong>10%</strong>
                <p>of the qualifying project value</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who to refer */}
      <section className="section fit-section">
        <div className="container fit-layout">
          <Reveal className="fit-intro">
            <div className="section-kicker">The right fit</div>
            <h2>Who belongs in your introduction?</h2>
            <p>
              Don't overthink it. If someone has a real challenge, values great work and could
              genuinely benefit from our expertise, we'd love to meet them.
            </p>
          </Reveal>

          <div className="fit-items">
            {FIT_ITEMS.map((item, i) => (
              <FitItem item={item} index={i} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-header center">
            <div className="section-kicker">What we do</div>
            <h2>Services you can refer.</h2>
            <p>Any of these is worth an introduction — and you're never limited to just one.</p>
          </Reveal>

          <div className="services">
            {SERVICES.map((service, i) => (
              <ServiceCard service={service} index={i} key={service.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Referral form */}
      <section className="form-section" id="refer">
        <div className="container form-layout">
          <Reveal className="form-copy">
            <div className="section-kicker">Make an introduction</div>
            <h2>Someone came to mind?</h2>
            <p>
              Tell us a little about them and why you think there could be a fit. We'll take the
              conversation from there. No pitch deck required. No lengthy application.
            </p>

            <div className="form-perks">
              {FORM_PERKS.map((perk) => (
                <div className="form-perk" key={perk}>
                  <span>✓</span>
                  {perk}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="form-box">
            <div className="form-box-header">
              <h3>Tell us about your referral</h3>
              <p>A few details are all we need to get started.</p>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="yourName">Your name</label>
                  <input id="yourName" type="text" placeholder="Jane Smith" required />
                </div>
                <div className="field">
                  <label htmlFor="yourEmail">Your email</label>
                  <input id="yourEmail" type="email" placeholder="jane@example.com" required />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="referralName">Referral's name</label>
                  <input id="referralName" type="text" placeholder="Alex Morgan" required />
                </div>
                <div className="field">
                  <label htmlFor="referralEmail">Their email</label>
                  <input id="referralEmail" type="email" placeholder="alex@company.com" required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="company">Company / website</label>
                <input id="company" type="text" placeholder="company.com" required />
              </div>

              <div className="field">
                <label>What could we help them with?</label>
                <p className="field-hint">Select at least one.</p>
                <div className="service-options" role="group" aria-label="Services to refer">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      className="service-option"
                      aria-pressed={selectedServices.includes(service.id)}
                      onClick={() => toggleService(service.id)}
                    >
                      {service.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="service-option"
                    aria-pressed={selectedServices.includes("other")}
                    onClick={() => toggleService("other")}
                  >
                    Something else
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Why do you think we'd be a good fit?</label>
                <textarea
                  id="message"
                  placeholder="Give us a little context about the person, their business and what they're looking for..."
                />
              </div>

              <button
                type="submit"
                className="button button-primary submit"
                disabled={submitted || selectedServices.length === 0}
                style={submitted ? { background: "#1d4ed8" } : undefined}
              >
                {submitted ? "Introduction received ✓" : "Submit introduction →"}
              </button>

              <p className="privacy-note">
                Please make sure you have permission to share the person's contact information with
                us.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section className="trust-section">
        <div className="container">
          <Reveal className="trust-box">
            <div className="quote-mark">"</div>
            <blockquote>
              A referral should be a reflection of trust — not a transaction disguised as one.
            </blockquote>
            <p>
              Our referral program rewards genuine introductions. It is completely separate from
              reviews, testimonials, ratings and customer feedback. We will never ask you or anyone
              you refer to provide positive feedback in exchange for a reward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="section-header center">
            <div className="section-kicker">Good to know</div>
            <h2>Questions, answered.</h2>
            <p>A few things worth knowing before you make an introduction.</p>
          </Reveal>

          <div className="faq">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem item={item} index={i} key={item.question} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <Reveal>
            <h2>Know someone who should be having this conversation?</h2>
            <p>
              Make the introduction. We'll take it from there — and if it turns into something
              great, we'll make sure you share in the value you helped create.
            </p>
            <a href="#refer" className="button button-primary">
              Make a referral →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-inner">
          <span>© 2026 ViralChilly</span>
          <span>Referral Program &nbsp;·&nbsp; Terms &nbsp;·&nbsp; Privacy</span>
        </div>
      </footer>
    </div>
  );
}
