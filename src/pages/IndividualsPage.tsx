/**
 * Moneyling.org – For Individuals. Dreamlife-Sim for the adult individual ICP.
 * Flow inspired by Alinea: hero → problem/solution → pillars → "and a lot more" → CTA.
 * Full-bleed alternating sections, punchy copy, one primary CTA.
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, BookOpen, Target, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";

const DREAMLIFE_SIM_URL = "https://dreamlife.moneyling.org";
const ASSETS = import.meta.env.BASE_URL;
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.moneyling.dreamlife";
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(DREAMLIFE_SIM_URL)}`;

const DASHBOARD_CAROUSEL_SLIDES = [
  { src: "03E.png", alt: "Dreamlife-Sim app" },
  { src: "Microlearning with Weekly Tasks.png", alt: "Microlearning with weekly tasks" },
  { src: "Nav Bar.png", alt: "App navigation" },
  { src: "Dreamlife-Sim Dashboard.png", alt: "Dreamlife-Sim dashboard" },
  { src: "Task.png", alt: "Task and simulation" },
];

/** Renders a line as one span per word for animation/styling (data-word for targeting) */
function WordsLine({
  text,
  className,
  wordClassName = "inline-block",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(/\s+/);
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={`${text}-${i}`} className={wordClassName} data-word>
          {word}
        </span>
      ))}
    </p>
  );
}

const PROBLEM_LINES = [
  "Goals feel out of reach.",
  "The path isn't clear.",
  "One-size-fits-all advice doesn't fit your life.",
];
const SOLUTION_LINE = "Dreamlife-Sim solves this.";

const MORE_ITEMS = [
  "Your dashboard",
  "Goals & milestones",
  "Micro-tasks",
  "Real-world lessons",
  "Any device",
  "Your pace",
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is Dreamlife-Sim?",
    answer: "Dreamlife-Sim is financial navigation from Moneyling that helps individuals arrive at their destination through micro-tasks and lessons. You set your destination, then follow bite-sized tasks and lessons that fit your life.",
  },
  {
    question: "Who is Dreamlife-Sim for?",
    answer: "Dreamlife-Sim is built for adults who want to take control of their financial life. Whether you’re building an emergency fund, saving for a first home, or planning for retirement, Dreamlife-Sim meets you where you are and helps you move forward at your own pace.",
  },
  {
    question: "How much does Dreamlife-Sim cost?",
    answer: "Dreamlife-Sim offers Free, $9.99, and $19.99 subscription options. Ask your financial institution if they partner with us for free or reduced pricing.",
  },
  {
    question: "How do I get started?",
    answer: "Go to dreamlife.moneyling.org and sign up or log in. Set your destination (your goals), then follow the micro-tasks and lessons.",
  },
  {
    question: "Is Dreamlife-Sim available on mobile?",
    answer: "Yes. Use the links above to get started whenever it fits your life.",
  },
  {
    question: "How do I contact Moneyling?",
    answer: "You can reach us through the Contact page on this site, or at info@moneyling.org. We’re happy to answer questions about Dreamlife-Sim or other Moneyling programs.",
  },
];

export function IndividualsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [dashboardSlide, setDashboardSlide] = useState(0);
  const dashboardCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dashboardCarouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const mr = parseInt(getComputedStyle(first).marginRight, 10) || 0;
      const step = first.offsetWidth + mr;
      const index = Math.round(el.scrollLeft / step);
      setDashboardSlide(Math.min(Math.max(0, index), DASHBOARD_CAROUSEL_SLIDES.length - 1));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const el = dashboardCarouselRef.current;
    if (!el) return;
    const len = DASHBOARD_CAROUSEL_SLIDES.length;
    const interval = setInterval(() => {
      setDashboardSlide((prev) => {
        const next = (prev + 1) % len;
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + (parseInt(getComputedStyle(first).marginRight, 10) || 0) : el.offsetWidth;
        el.scrollTo({ left: next * step, behavior: "smooth" });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* —— Hero: buttons above "For Individuals", then headline + image —— */}
      <section className="relative w-full bg-gradient-to-br from-primary/10 via-cream/50 to-mint/20 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3 text-center pb-16 sm:pb-20">
          {/* Download buttons – responsive spacing, stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-5 px-2 sm:px-0">
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center justify-center gap-2 h-12 min-w-[140px] w-[160px] max-w-full px-4 py-3 sm:py-0"
              aria-label="Get Dreamlife-Sim on Google Play"
            >
              <Play className="w-5 h-5 shrink-0 text-[#00C853]" fill="currentColor" aria-hidden />
              <span className="text-sm font-raleway-bold">Google Play</span>
            </a>
            <div
              className="btn-glass inline-flex items-center justify-center gap-2 h-12 min-w-[140px] w-[160px] max-w-full px-4 py-3 sm:py-0 text-sm cursor-not-allowed"
              aria-label="App Store – coming soon"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Coming soon</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="card-glass w-[100px] h-[100px] flex items-center justify-center p-2">
                <img src={QR_CODE_URL} alt="" width={84} height={84} className="rounded-lg w-[84px] h-[84px] object-contain" />
              </div>
              <span className="text-xs font-raleway-medium text-primary/90">Scan or open</span>
            </div>
          </div>
          <p className="text-primary font-raleway-bold text-sm uppercase tracking-wider mb-4">
            For Individuals
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-raleway-bold text-primary leading-tight">
            Your financial life. Your goals. Your pace.
          </h1>
          <p className="text-body-color font-raleway-medium text-lg sm:text-xl mt-6 max-w-2xl mx-auto">
            Dreamlife-Sim is financial navigation that helps you arrive at your destination through micro-tasks and lessons.
          </p>
          {/* Image – large hero; container has extra bottom spacing below */}
          <div className="flex justify-center mt-8 sm:mt-10 -mb-16 sm:-mb-24 relative z-10">
            <div className="rounded-2xl border-2 border-primary/20 bg-white p-2 shadow-xl w-full max-w-[480px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[720px]">
              <img
                src={`${ASSETS}${encodeURIComponent("general users.png")}`}
                alt="Dreamlife-Sim – financial navigation for adults"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* —— Problem → Solution: big, impactful, one span per word for animation —— */}
      <section className="w-full bg-white pt-24 sm:pt-32 pb-20 sm:pb-24">
        <div className="max-w-3xl mx-auto px-1 sm:px-2 lg:px-3 text-center">
          {PROBLEM_LINES.map((line, i) => (
            <WordsLine
              key={line}
              text={line}
              className="text-body-color font-raleway-medium text-xl sm:text-2xl md:text-3xl leading-relaxed mt-4 first:mt-0 [&>span]:mr-[0.25em] [&>span:last-child]:mr-0"
              wordClassName="inline-block [&:not(:last-child)]:mr-[0.25em]"
            />
          ))}
          <WordsLine
            text={SOLUTION_LINE}
            className="text-primary font-raleway-bold text-2xl sm:text-3xl md:text-4xl mt-10 md:mt-12 [&>span]:mr-[0.25em] [&>span:last-child]:mr-0"
            wordClassName="inline-block [&:not(:last-child)]:mr-[0.25em]"
          />
        </div>
      </section>

      {/* —— Three pillars: glassy green icon boxes, centered —— */}
      <section className="w-full bg-cream/40 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-12">
            How it works for you
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl justify-items-center">
            {[
              {
                icon: MapPin,
                title: "Imagine your dream life",
                text: "You imagine and describe your dream life, from lifestyle and career to what retirement looks like. Dreamlife learns your priorities and maps the path to your destination.",
              },
              {
                icon: BookOpen,
                title: "Learn as you go",
                text: "Bite-sized lessons on earning, saving, spending, credit, investing, and risk, when and where it fits your life.",
              },
              {
                icon: Target,
                title: "Track your progress",
                text: "Your dashboard shows where you are and what’s next. Build habits and hit milestones on your own timeline.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-primary/15 bg-white p-6 sm:p-8 shadow-sm w-full max-w-sm flex flex-col items-center text-center"
              >
                <div className="icon-glass w-14 h-14 shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-raleway-bold text-primary mt-5 mb-3">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-body-color font-raleway-medium leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— And a lot more: grid of short tiles (Alinea style) —— */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3">
          <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-10">
            And a lot more…
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {MORE_ITEMS.map((label) => (
              <div
                key={label}
                className="card-glass rounded-xl px-4 py-4 sm:py-5 text-center flex items-center justify-center min-h-[4rem]"
              >
                <p className="text-sm sm:text-base font-raleway-bold text-primary">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— Dashboard visual: scrolling carousel of app screens —— */}
      <section className="w-full bg-primary/5 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3">
          <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary text-center mb-4">
            Your dashboard
          </h2>
          <p className="text-body-color font-raleway-medium text-center max-w-xl mx-auto mb-8">
            Goals, tasks, and progress in one place. Dreamlife-Sim is there when you are.
          </p>
          <div className="relative">
            <div
              data-dashboard-carousel
              ref={dashboardCarouselRef}
              className="flex gap-0 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {DASHBOARD_CAROUSEL_SLIDES.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`flex-none w-[320px] sm:w-[360px] min-w-[320px] sm:min-w-[360px] snap-center -mr-20 sm:-mr-[6rem] last:mr-0 relative transition-all duration-300 origin-center ${
                    index === dashboardSlide ? "z-20 opacity-100 scale-110" : "z-0 opacity-45 scale-90"
                  }`}
                >
                  <div className="card-glass rounded-2xl p-3 overflow-hidden flex flex-col h-[460px] sm:h-[520px]">
                    <div className="flex-1 min-h-0 flex items-center justify-center">
                      <img
                        src={`${ASSETS}${encodeURIComponent(slide.src)}`}
                        alt={slide.alt}
                        className="max-w-full max-h-full object-contain block"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              .overflow-x-auto::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="flex justify-center gap-2 mt-4">
              {DASHBOARD_CAROUSEL_SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const container = dashboardCarouselRef.current;
                    if (container) {
                      const first = container.firstElementChild as HTMLElement | null;
                      const step = first ? first.offsetWidth + (parseInt(getComputedStyle(first).marginRight, 10) || 0) : container.offsetWidth;
                      container.scrollTo({ left: index * step, behavior: "smooth" });
                      setDashboardSlide(index);
                    }
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    dashboardSlide === index ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  const container = dashboardCarouselRef.current;
                  if (container) {
                    const first = container.firstElementChild as HTMLElement | null;
                    const step = first ? first.offsetWidth + (parseInt(getComputedStyle(first).marginRight, 10) || 0) : container.offsetWidth;
                    const next = Math.max(0, dashboardSlide - 1);
                    container.scrollTo({ left: next * step, behavior: "smooth" });
                    setDashboardSlide(next);
                  }
                }}
                className="btn-glass-outline p-2 rounded-full"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-primary" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => {
                  const container = dashboardCarouselRef.current;
                  if (container) {
                    const first = container.firstElementChild as HTMLElement | null;
                    const step = first ? first.offsetWidth + (parseInt(getComputedStyle(first).marginRight, 10) || 0) : container.offsetWidth;
                    const next = Math.min(DASHBOARD_CAROUSEL_SLIDES.length - 1, dashboardSlide + 1);
                    container.scrollTo({ left: next * step, behavior: "smooth" });
                    setDashboardSlide(next);
                  }
                }}
                className="btn-glass-outline p-2 rounded-full"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-primary" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* —— FAQ: Q&A format, same section structure —— */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-10">
            FAQs
          </h2>
          <p className="text-body-color font-raleway-medium text-center mb-10">
            Common questions about Dreamlife-Sim and how it works for you.
          </p>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-primary/15 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 sm:px-5 sm:py-5 hover:bg-gray-50 transition-colors text-primary"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="font-raleway-bold text-primary text-base sm:text-lg pr-2">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 bg-gray-50 rounded-b-xl">
                      <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* —— Final CTA: full-bleed, one primary button —— */}
      <section className="w-full bg-gradient-to-br from-primary to-primary-light py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-1 sm:px-2 lg:px-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-raleway-bold text-white mb-4">
            Try Dreamlife-Sim now
          </h2>
          <p className="text-white/90 font-raleway-medium text-base sm:text-lg mb-8">
            Set your destination, complete micro-tasks and lessons, and arrive where you want to be.
          </p>
          <a
            href={DREAMLIFE_SIM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass inline-flex items-center justify-center text-base font-raleway-bold px-8 py-4"
          >
            Try Dreamlife-Sim now
            <ExternalLink className="w-4 h-4 ml-2" aria-hidden />
          </a>
          <p className="mt-6">
            <Link to="/contact" className="text-white/90 font-raleway-medium text-sm hover:text-white underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* —— Get the app: glassy modern tech look —— */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3">
          <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-4">
            Get Dreamlife-Sim
          </h2>
          <p className="text-body-color font-raleway-medium text-center mb-10">
            Choose your way to get started.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 px-2 sm:px-0">
            {/* Google Play – glassy, text + icon only (no black badge) */}
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center justify-center gap-2 h-12 min-w-[140px] w-[160px] max-w-full px-4 py-3 sm:py-0"
              aria-label="Get Dreamlife-Sim on Google Play"
            >
              <Play className="w-5 h-5 shrink-0 text-[#00C853]" fill="currentColor" aria-hidden />
              <span className="text-sm font-raleway-bold">Google Play</span>
            </a>

            {/* App Store – Coming soon, bright green glassy convex */}
            <div
              className="btn-glass inline-flex items-center justify-center gap-2 h-12 min-w-[140px] w-[160px] max-w-full px-4 py-3 sm:py-0 text-sm cursor-not-allowed"
              aria-label="App Store – coming soon"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Coming soon</span>
            </div>

            {/* Web app – QR in glassy arrow-style card */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="card-glass p-2.5 w-[120px] h-[120px] flex items-center justify-center">
                <img src={QR_CODE_URL} alt="" width={104} height={104} className="rounded-lg w-[104px] h-[104px] object-contain" />
              </div>
              <div className="text-center">
                <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-1">
                  Scan or open
                </p>
                <a
                  href={DREAMLIFE_SIM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-raleway-medium text-primary hover:underline"
                >
                  Open link
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell: one line */}
      <section className="w-full bg-white py-8 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500 font-raleway-medium">
          Represent a school or financial institution?{" "}
          <Link to="/for-educators" className="text-primary font-raleway-bold underline hover:no-underline">For Educators</Link>
          {" · "}
          <Link to="/for-financial-institutions" className="text-primary font-raleway-bold underline hover:no-underline">For Institutions</Link>
        </p>
      </section>
    </div>
  );
}
