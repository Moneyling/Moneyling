/**
 * Moneyling.org – For Financial Institutions. Funnel page: benefits → how it works → carousel → CTA.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  BarChart3,
  Link2,
  Users,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Carousel } from "@/components/Carousel";

const ASSETS = import.meta.env.BASE_URL;

const FI_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Our volunteers are exhausted—we're limiting Reality Fairs to about two per month. How can we extend impact without adding more in-person demand?",
    answer: "Dreamlife-Sim extends the impact of the programs you already run without requiring more volunteer time or event count. Members get a self-guided digital experience before, during, and after workshops—so you can keep Reality Fairs at a sustainable level (e.g., two per month) while still reaching people who can't attend or want to continue learning afterward. No additional in-person logistics or volunteer hours are required.",
  },
  {
    question: "We don't have clear metrics or ROI data to justify our FinEd programs or promote new products. Can you help?",
    answer: "Yes. Engagement insights give you aggregated metrics—no PII—so you can report on participation, show program value, and demonstrate ROI to leadership. You get signals on what members are working toward (e.g., high-yield savings, debt consolidation, auto loan) so you can align products and promotions with real demand and prove impact. Partner packages include quarterly insights and optional insights meetings to support benchmarking and ROI reporting.",
  },
  {
    question: "We only have post-workshop surveys and no long-term impact data. How do we show lasting impact?",
    answer: "Dreamlife-Sim provides ongoing engagement data beyond a single workshop. You see return visits, task completion, milestone trends, and engagement patterns over time—so you can report on long-term impact and participant progress instead of relying only on one-time surveys. That helps you demonstrate sustained value to boards, funders, and community partners.",
  },
  {
    question: "Workshops run over and we're stretched thin on scheduling and logistics. How can we do more with less?",
    answer: "The platform delivers financial education and micro-actions digitally, so members get content and next steps without every touchpoint requiring a live workshop or long Q&A. You reduce reliance on repeated in-person logistics and overtime sessions while still supporting member progress. Dreamlife-Sim is designed to scale reach without adding dedicated logistics staff or new programs for you to manage.",
  },
  {
    question: "Our team is small and we can't manage multiple community outreach or education initiatives at once. Is this built for us?",
    answer: "Yes. Partner packages are built for small teams: you sponsor members' premium access, use community groups and full marketing materials, and get quarterly insights—without increasing headcount or workshop count. You can run financial education and community outreach through one digital experience; integration options let members engage with your resources without you coordinating every touchpoint. Many credit unions and banks use Dreamlife-Sim specifically because they have limited staff capacity for financial literacy programs.",
  },
  {
    question: "We can't consistently measure participant progress or long-term outcomes across our programs. Is there a better way?",
    answer: "Engagement insights give you aggregated trends on how members interact and return over time—task completion, milestones, engagement streaks, and product interest—so you can measure progress and long-term outcomes consistently. You get a clear picture of program effectiveness without handling individual participant data, making it easier to report and improve over time.",
  },
  {
    question: "We want to reach more participants without increasing staff workload. Is that possible?",
    answer: "Yes. Dreamlife-Sim is built for that: a digital, self-guided app with visualization, pathways, and weekly tasks; optional LMS and institutional course integration; and engagement insights so you can report on reach and impact. You extend impact without scaling staff or event count. It's designed to help institutions that rely on in-person or Zoom workshops and PDFs reach people who can't or won't attend—and keep them engaged after events.",
  },
  {
    question: "Funding is limited and we need to show clear value and affordability. How does partnership work?",
    answer: "Partner packages offer tiered pricing (Support Your Members, Community Expert, Unstoppable) with clear deliverables: engagement insights for ROI reporting, Regional Sponsor of the Week visibility, integration with existing programs, and optional LMS access. You get metrics to demonstrate value and justify investment. Early partner pricing is available; see dreamlifeapp.moneyling.org/product.html for full package details.",
  },
  {
    question: "We want stronger ties with schools and nonprofits but struggle with logistics and ongoing relationships. How does Dreamlife-Sim help?",
    answer: "Dreamlife-Sim keeps your brand and resources in front of members between events. Community groups, marketing materials, and optional website integration help maintain connection without you managing every touchpoint. Schools and nonprofits can direct participants to one ongoing experience you support—reducing one-off coordination while deepening community engagement. You stay a trusted part of the journey without dedicated logistics for each partner.",
  },
  {
    question: "Can our credit union or bank get CRA credit for financial literacy programs?",
    answer: "Financial education and member financial wellness programs that serve your community can support your CRA and community outreach goals. Dreamlife-Sim delivers financial literacy workshops and ongoing digital financial education so members build money management skills. Partner packages include engagement metrics and impact data that can help you report on community reinvestment and financial literacy program outcomes. We recommend confirming CRA-eligible activity with your compliance team.",
  },
  {
    question: "How does this support member financial wellness and financial literacy for our members?",
    answer: "Dreamlife-Sim is built for member financial wellness: visualization, pathways, and micro-actions that support personal finance and money management. Your members get financial literacy content and tasks aligned to their goals (savings, credit, investing, risk)—without you running more in-person financial literacy workshops. Engagement insights let you see how financial education is resonating and where to align products and resources.",
  },
];

const FI_CAROUSEL_SLIDES = [
  { src: "{48C4747C-4951-4F2E-B7B7-8CA69A26B472}.png", alt: "Dreamlife-Sim Tool Hub – Factor Weighted Analysis, Annual Income & Expense Forecast, Monthly Budget Planner, Net Worth Snapshot" },
  { src: "{D9996936-1B0B-4EA3-9FA3-3BCAB5DB735B}.png", alt: "Community Engagement Command Center – One stop hub for community outreach, member impact and KPI tracking" },
  { src: "{D4DB2EC0-791A-430F-8F91-94C07B55F743}.png", alt: "Your Community's Insights – Products and links members need based on their active goals for targeted marketing" },
  { src: "{C2BFEE65-6D40-49D9-93CC-497550AA3907}.png", alt: "Moneyling Instructor Dashboard – LMS program group and financial education courses" },
];

export function ForFinancialInstitutionsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 py-10 sm:py-14">
      {/* Hero */}
      <section className="text-center mb-12 sm:mb-16">
        <p className="text-primary font-raleway-bold text-sm uppercase tracking-wider mb-3">
          For Financial Institutions
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-raleway-bold text-primary leading-tight">
          Turn community outreach into measurable impact
        </h1>
        <p className="text-body-color font-raleway-medium text-lg mt-4 max-w-2xl mx-auto">
          One platform to deliver financial education, match members to products, and prove ROI—without building it yourself.
        </p>
        <div className="mt-10 flex justify-center">
          <img
            src={`${ASSETS}${encodeURIComponent("{D9996936-1B0B-4EA3-9FA3-3BCAB5DB735B}.png")}`}
            alt="Community Engagement Command Center — One stop hub for community outreach, member impact and KPI tracking"
            className="w-full max-w-4xl rounded-2xl border border-primary/15 shadow-lg object-contain"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-6 text-center">
          Why institutions partner with Moneyling
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            "CRA, financial literacy, and member-engagement goals in one place",
            "Product and milestone matching—surface the right products at the right time",
            "Partner dashboard: KPIs, funnel, member engagement, and engagement in real time",
            "We do the heavy lifting to keep your members engaged and you top-of-mind",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body-color font-raleway-medium"
            >
              <span className="icon-glass shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-8 text-center">
          How it works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: Link2,
              title: "Connect your products",
              text: "Add links to checking, savings, loans, and more. We match content and prompts to member goals.",
            },
            {
              step: "2",
              icon: Users,
              title: "Reach your community",
              text: "Workshops, events, and in-app education. Members see your brand and your products when it matters.",
            },
            {
              step: "3",
              icon: BarChart3,
              title: "Measure and scale",
              text: "Dashboard with redirects, goals captured, touchpoints, and new engaged members—so you can report and optimize.",
            },
          ].map(({ step, icon: Icon, title, text }) => (
            <div
              key={step}
              className="rounded-xl border border-gray-light/80 bg-white p-6 shadow-sm text-center"
            >
              <span className="text-xs font-raleway-bold text-primary uppercase tracking-wider">
                Step {step}
              </span>
              <div className="icon-glass mt-3 w-10 h-10 rounded-lg flex items-center justify-center mx-auto">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-raleway-bold text-primary mt-4 mb-2">
                {title}
              </h3>
              <p className="text-sm text-body-color font-raleway-medium">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Retirement projection during workshop */}
      <section className="mb-14 flex justify-center">
        <div className="w-full max-w-4xl rounded-2xl border border-primary/15 shadow-lg overflow-hidden">
          <img
            src={`${ASSETS}${encodeURIComponent("Retirement Projection during workshop.png")}`}
            alt="Retirement projection during workshop"
            className="w-full h-auto object-contain block"
          />
        </div>
      </section>

      {/* Carousel – rectangular cards, center slide emphasized */}
      <section className="mb-14">
        <Carousel
          autoplayDelay={4000}
          variant="center"
          showDots
          showArrows
        >
          {FI_CAROUSEL_SLIDES.map((slide) => (
            <div
              key={slide.src}
              className="rounded-xl border-2 border-primary/20 bg-white overflow-hidden flex flex-col shadow-lg p-2 sm:p-3 h-[400px] sm:h-[460px]"
            >
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <img
                  src={`${ASSETS}${encodeURIComponent(slide.src)}`}
                  alt={slide.alt}
                  className="max-w-full max-h-full object-contain block"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* FAQs – from dreamlifeapp.moneyling.org/product.html */}
      <section className="mb-14">
        <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-4">
          FAQs
        </h2>
        <p className="text-body-color font-raleway-medium text-center mb-8 max-w-5xl mx-auto">
          How Moneyling brings all your financial education resources into one platform. We bring scale to your member engagement, without adding staff or events.
        </p>
        <div className="w-full max-w-5xl mx-auto space-y-2">
          {FI_FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="card-glass overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 sm:px-5 sm:py-5 hover:bg-white/20 transition-colors text-primary"
                  aria-expanded={isOpen}
                  aria-controls={`fi-faq-answer-${index}`}
                  id={`fi-faq-question-${index}`}
                >
                  <span className="font-raleway-bold text-base sm:text-lg pr-2">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`fi-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`fi-faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[800px]" : "max-h-0"}`}
                >
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 bg-white/70 backdrop-blur-sm rounded-b-xl border-t border-primary/10">
                    <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Primary CTA */}
      <section className="rounded-2xl border border-primary/10 bg-primary/5 p-8 sm:p-10 text-center">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3">
          Ready to see the platform?
        </h2>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Request a demo. We’ll show you the member experience and the partner dashboard, and answer your compliance and integration questions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact?audience=financial-institution"
            className="btn-glass inline-flex items-center justify-center text-sm font-medium px-6 py-3"
          >
            Request a demo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Cross-sell */}
      <p className="text-center mt-8 text-sm text-gray-500 font-raleway-medium">
        An educator or school?{" "}
        <Link
          to="/for-educators"
          className="text-primary font-raleway-bold underline hover:no-underline"
        >
          See our Educator path
        </Link>
      </p>
    </div>
  );
}
