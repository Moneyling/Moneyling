/**
 * Moneyling.org – For Educators. Structure: LMS intro → Demo → middle/high school courses → Free courses → CTA.
 * Course links point to lms.moneyling.org (pulled from LMS course catalog).
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ChevronDown, Check, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";


const LMS_BASE = "https://lms.moneyling.org/course";
const ASSETS = import.meta.env.BASE_URL;

// Demo items – links to corresponding LMS courses
const DEMO_MS = {
  code: "NS",
  topic: "earning income",
  url: `${LMS_BASE}/story-based-middle-school-national-standard-course-4/`,
};
const DEMO_HS = {
  code: "NS-12",
  topic: "spending",
  url: `${LMS_BASE}/moneyling-ns-12-spending-course/`,
};

const MS_FRAMEWORKS: { name: string; url: string }[] = [
  { name: "Decision", url: `${LMS_BASE}/decision-mastery-frameworks-for-making-smart-choices/` },
  { name: "SMART", url: `${LMS_BASE}/frameworks-smart-goals/` },
];

const MS_COURSES: { code: string; name: string; url: string; image?: string }[] = [
  { code: "NS-8", name: "Earning Income", url: `${LMS_BASE}/story-based-middle-school-national-standard-course-4/`, image: "NS-8 Earning Income.png" },
  { code: "NS-8", name: "Savings", url: `${LMS_BASE}/story-based-middle-school-national-standard-course-3/`, image: "NS-8 Savings.png" },
  { code: "NS-8", name: "Spending", url: `${LMS_BASE}/story-based-middle-school-national-standard-course-5/`, image: "NS-8 Spending.png" },
  { code: "NS-8", name: "Managing Credit", url: `${LMS_BASE}/story-based-middle-school-national-standard-course/`, image: "NS-8 Managing Credit.png" },
  { code: "NS-8", name: "Investing", url: `${LMS_BASE}/story-based-middle-school-national-standard-course-2/`, image: "NS-8 Investing.png" },
  { code: "NS-8", name: "Managing Risk", url: `${LMS_BASE}/story-based-middle-school-national-standard-course-6/`, image: "NS-8 Managing Risk.png" },
];

const HS_FRAMEWORKS: { name: string; url: string }[] = [
  { name: "Decision", url: `${LMS_BASE}/decision-mastery-frameworks-for-making-smart-choices/` },
  { name: "SMART", url: `${LMS_BASE}/frameworks-smart-goals/` },
  { name: "Root", url: `${LMS_BASE}/frameworks-root-cause-analysis/` },
];

const HS_FULL_PROGRAM_URL = `${LMS_BASE}/moneyling-financial-curriculum-highschool/`;

// Higher Education (Young Adults) – same frameworks as High School; Intermediate courses from LMS
const HE_FRAMEWORKS: { name: string; url: string }[] = [
  { name: "Decision", url: `${LMS_BASE}/decision-mastery-frameworks-for-making-smart-choices/` },
  { name: "SMART", url: `${LMS_BASE}/frameworks-smart-goals/` },
  { name: "Root", url: `${LMS_BASE}/frameworks-root-cause-analysis/` },
];
const HE_COURSES: { code: string; name: string; url: string; image?: string }[] = [
  { code: "YA", name: "Earning Income", url: "https://lms.moneyling.org/course/intermediate-earning-income-course/" },
  { code: "YA", name: "Savings", url: "https://lms.moneyling.org/course/intermediate-savings-course/" },
  { code: "YA", name: "Spending", url: "https://lms.moneyling.org/course/intermediate-spending-course/" },
  { code: "YA", name: "Managing Credit", url: "https://lms.moneyling.org/course/intermediate-credit-course/" },
  { code: "YA", name: "Investing", url: "https://lms.moneyling.org/course/intermediate-investing-course/" },
  { code: "YA", name: "Managing Risk", url: "https://lms.moneyling.org/course/intermediate-managing-risk-course/" },
];
const HE_FULL_PROGRAM_URL = "https://dreamlife.moneyling.org";
const LMS_COURSES_URL = "https://lms.moneyling.org/courses/";

const HS_COURSES: { code: string; name: string; url: string; image?: string }[] = [
  { code: "NS-12", name: "Earning Income", url: `${LMS_BASE}/moneyling-earning-income-course/`, image: "NS-12 Earning Income.png" },
  { code: "NS-12", name: "Savings", url: `${LMS_BASE}/moneyling-ns-12-savings-course/`, image: "NS-12 Savings.png" },
  { code: "NS-12", name: "Spending", url: `${LMS_BASE}/moneyling-ns-12-spending-course/`, image: "NS-12 Spending.png" },
  { code: "NS-12", name: "Managing Credit", url: `${LMS_BASE}/moneyling-ns-12-credit-course/`, image: "NS-12 Managing Credit.png" },
  { code: "NS-12", name: "Investing", url: `${LMS_BASE}/moneyling-ns-12-investing-course/`, image: "NS-12 Investing Course.png" },
  { code: "NS-12", name: "Managing Risk", url: `${LMS_BASE}/moneyling-ns-12-managing-risk-course/`, image: "NS-12 Managing Risk.png" },
];

function CourseChip({
  code,
  topic,
  url,
}: {
  code: string;
  topic: string;
  url?: string;
}) {
  const className =
    "inline-flex flex-wrap items-center gap-2 rounded-lg border-2 border-primary/40 bg-primary/5 px-3 py-2 font-raleway-bold text-primary hover:border-primary hover:bg-primary/10 transition-colors";
  const content = (
    <>
      <span className="text-xs uppercase tracking-wider">{code}</span>
      <span>{topic}</span>
      {url && <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden />}
    </>
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return <span className={className}>{content}</span>;
}

const addToCartBtnClass =
  "shrink-0 inline-flex items-center gap-1.5 rounded-lg border-2 border-primary/40 bg-white px-2.5 py-1.5 text-xs font-raleway-bold text-primary hover:bg-primary/10 hover:border-primary transition-colors";

export function ForEducatorsPage() {
  const { addItem } = useCart();
  const [msALaCarteOpen, setMsALaCarteOpen] = useState(false);
  const [msFullProgramOpen, setMsFullProgramOpen] = useState(false);
  const [hsALaCarteOpen, setHsALaCarteOpen] = useState(false);
  const [hsFullProgramOpen, setHsFullProgramOpen] = useState(false);
  const [heALaCarteOpen, setHeALaCarteOpen] = useState(false);
  const [heFullProgramOpen, setHeFullProgramOpen] = useState(false);

  const openMsALaCarte = () => {
    setMsFullProgramOpen(false);
    setMsALaCarteOpen((prev) => !prev);
  };
  const openMsFullProgram = () => {
    setMsALaCarteOpen(false);
    setMsFullProgramOpen((prev) => !prev);
  };
  const openHsALaCarte = () => {
    setHsFullProgramOpen(false);
    setHsALaCarteOpen((prev) => !prev);
  };
  const openHsFullProgram = () => {
    setHsALaCarteOpen(false);
    setHsFullProgramOpen((prev) => !prev);
  };
  const openHeALaCarte = () => {
    setHeFullProgramOpen(false);
    setHeALaCarteOpen((prev) => !prev);
  };
  const openHeFullProgram = () => {
    setHeALaCarteOpen(false);
    setHeFullProgramOpen((prev) => !prev);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-14 bg-gradient-to-b from-cream/30 to-white">
      {/* LMS intro – green container with gold accent */}
      <section className="rounded-2xl bg-primary text-white px-5 py-4 sm:px-6 sm:py-5 mb-10 text-center shadow-lg border-l-4 border-gold">
        <h2 className="text-lg sm:text-xl font-raleway-bold text-white">
          Moneyling Learning Management System (LMS)
        </h2>
        <div className="my-3 h-px bg-gold/50 max-w-xs mx-auto" aria-hidden />
        <p className="text-sm sm:text-base font-raleway-medium text-white max-w-2xl mx-auto leading-relaxed">
          Welcome to the Moneyling Learning Management System—your gateway to financial empowerment. This platform is designed to provide teachers, students, and community members with seamless access to a range of financial education courses, programs, and resources.
        </p>
      </section>

      {/* Why Moneyling – problem we solve & benefits */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3 text-center">
          New state mandates. We’re here to make it easy.
        </h2>
        <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-6" aria-hidden />
        <p className="text-body-color font-raleway-medium text-center max-w-2xl mx-auto mb-8">
          More states require a personal financial education credit to graduate. Moneyling gives schools and educators ready-made, standards-aligned curriculum—so you can meet mandates without the scramble. All our courses and programs include complete National Standard lessons for the six core financial topics: earning income, saving, spending, credit, investing, and managing risk.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 mb-6 max-w-3xl mx-auto list-none">
          {[
            "Integrated calculators",
            "Decision tools",
            "Auto-grading quizzes",
            "Asynchronous or teacher-directed",
            "COPPA compliant & National Standards aligned",
            "Story-based curriculum with dashboard tracking",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body-color font-raleway-medium text-sm sm:text-base"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <h3 className="text-base sm:text-lg font-raleway-bold text-primary text-center mb-4">
          We are COPPA Compliant and Meet the National Standards for Personal Financial Education
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <img
            src={`${ASSETS}${encodeURIComponent("Coppa Compliant Moneyling Pig.png")}`}
            alt="COPPA compliant"
            className="h-24 sm:h-28 w-auto object-contain"
          />
          <img
            src={`${ASSETS}${encodeURIComponent("Jumpstart Piggy.png")}`}
            alt="Jumpstart Piggy"
            className="h-24 sm:h-28 w-auto object-contain"
          />
        </div>
      </section>

      {/* Demo Middle School & Demo High School */}
      <section className="mb-12 rounded-2xl bg-primary/5 border border-primary/10 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-2">Demo</h2>
        <div className="w-12 h-0.5 bg-primary-light rounded-full mb-4" aria-hidden />
        <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-4">
          Try a sample lesson from our LMS. See how it works for your grade level.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-gold/50 bg-white p-5 shadow-sm">
            <p className="text-sm font-raleway-medium text-body-color mb-3">Demo Middle School Course</p>
            <CourseChip code={DEMO_MS.code} topic={DEMO_MS.topic} url={DEMO_MS.url} />
            <p className="mt-4 text-xs font-raleway-medium text-primary">
              Click above to try the demo →
            </p>
          </div>
          <div className="rounded-xl border-2 border-navy/30 bg-white p-5 shadow-sm">
            <p className="text-sm font-raleway-medium text-body-color mb-3">Demo High School Course</p>
            <CourseChip code={DEMO_HS.code} topic={DEMO_HS.topic} url={DEMO_HS.url} />
            <p className="mt-4 text-xs font-raleway-medium text-primary">
              Click above to try the demo →
            </p>
          </div>
        </div>
      </section>

      {/* Middle School Offerings – accordion: only the clicked container expands; the other stays its own height */}
      <section className="mb-12 rounded-2xl bg-mint/15 border border-mint/40 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">Middle School Offerings</h2>
        <div className="w-16 h-0.5 bg-primary-light rounded-full mb-4" aria-hidden />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            msALaCarteOpen ? "border-primary border-l-4 border-l-gold" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openMsALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                msALaCarteOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={msALaCarteOpen}
              aria-controls="ms-a-la-carte-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">À la carte</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Purchase individual courses. Pick only the topics you need.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  msALaCarteOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {msALaCarteOpen && (
              <div id="ms-a-la-carte-content" className="border-t border-primary/20 bg-white px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {MS_FRAMEWORKS.map((f) => (
                      <a
                        key={f.name}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-raleway-medium text-primary hover:bg-primary/20 transition-colors inline-flex items-center gap-1"
                      >
                        {f.name}
                        <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
                <ul className="rounded-lg border border-brand-green/40 divide-y divide-brand-green/20 overflow-hidden">
                  {MS_COURSES.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 flex items-center gap-3 font-raleway-medium text-body-color hover:bg-primary/5 transition-colors min-w-0"
                      >
                        <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                          {c.image ? (
                            <img src={`${ASSETS}${encodeURIComponent(c.image)}`} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-raleway-bold text-primary">NS-8</span>
                          )}
                        </span>
                        {c.code && (
                          <span className="shrink-0 text-xs font-raleway-bold text-primary uppercase">{c.code}</span>
                        )}
                        <span className="flex-1 truncate">{c.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                      </a>
                      <button
                        type="button"
                        onClick={() => addItem({ type: "course", code: c.code, name: c.name, url: c.url })}
                        className={addToCartBtnClass}
                        aria-label={`Add ${c.name} to cart`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                        Add to cart
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Full NS-8 program dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            msFullProgramOpen ? "border-primary border-l-4 border-l-navy" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openMsFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                msFullProgramOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={msFullProgramOpen}
              aria-controls="ms-full-program-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">Full NS-8 program</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Complete middle school curriculum—all courses and frameworks in one program.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  msFullProgramOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {msFullProgramOpen && (
              <div id="ms-full-program-content" className="border-t border-primary/20 bg-white p-4 sm:p-5" role="region" aria-label="Full NS-8 program details">
                <h3 className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-3">What the program includes</h3>
                <ul className="space-y-2 text-sm text-body-color font-raleway-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Digital copy of one middle-school-level book
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Full National Standards for Personal Financial Education by 8th-grade curriculum
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Auto-grading assessments
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => addItem({ type: "program", code: "NS-8", name: "Full NS-8 program", id: "full-ns-8" })}
                  className={`mt-3 ${addToCartBtnClass}`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                  Add to cart
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* High School Offerings – accordion dropdowns, side by side on sm+ */}
      <section className="mb-12 rounded-2xl bg-cream/50 border border-gold/30 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">High School Offerings</h2>
        <div className="w-16 h-0.5 bg-gold rounded-full mb-4 mx-auto" aria-hidden />
        <div className="flex justify-center mb-4">
          <div className="rounded-xl border-2 border-primary/20 bg-white p-2 shadow-md">
            <img
              src={`${ASSETS}${encodeURIComponent("meet the characters.png")}`}
              alt="Meet the characters"
              className="max-w-[280px] sm:max-w-[320px] h-auto object-contain block"
            />
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center max-w-2xl mx-auto mb-6">
          These are our high school characters. They give context to financial concepts as they laugh, smile, joke, and cry through real-life situations that your students can relate to.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            hsALaCarteOpen ? "border-primary border-l-4 border-l-teal" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openHsALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                hsALaCarteOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={hsALaCarteOpen}
              aria-controls="hs-a-la-carte-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">À la carte</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Purchase individual courses. Choose the topics that fit your scope and sequence.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  hsALaCarteOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {hsALaCarteOpen && (
              <div id="hs-a-la-carte-content" className="border-t border-primary/20 bg-white px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {HS_FRAMEWORKS.map((f) => (
                      <a
                        key={f.name}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-raleway-medium text-primary hover:bg-primary/20 transition-colors inline-flex items-center gap-1"
                      >
                        {f.name}
                        <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
                <ul className="rounded-lg border border-brand-green/40 divide-y divide-brand-green/20 overflow-hidden">
                  {HS_COURSES.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 flex items-center gap-3 font-raleway-medium text-body-color hover:bg-primary/5 transition-colors min-w-0"
                      >
                        <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                          {c.image ? (
                            <img src={`${ASSETS}${encodeURIComponent(c.image)}`} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-raleway-bold text-primary">NS-12</span>
                          )}
                        </span>
                        {c.code && (
                          <span className="shrink-0 text-xs font-raleway-bold text-primary uppercase">{c.code}</span>
                        )}
                        <span className="flex-1 truncate">{c.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                      </a>
                      <button
                        type="button"
                        onClick={() => addItem({ type: "course", code: c.code, name: c.name, url: c.url })}
                        className={addToCartBtnClass}
                        aria-label={`Add ${c.name} to cart`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                        Add to cart
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Full NS-12 program dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            hsFullProgramOpen ? "border-primary border-l-4 border-l-coral" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openHsFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                hsFullProgramOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={hsFullProgramOpen}
              aria-controls="hs-full-program-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">Full NS-12 program</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Full National Standards for Personal Financial Education by 12th-grade curriculum.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  hsFullProgramOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {hsFullProgramOpen && (
              <div id="hs-full-program-content" className="border-t border-primary/20 bg-white p-4 sm:p-5" role="region" aria-label="Full NS-12 program details">
                <h3 className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-3">What the program includes</h3>
                <ul className="space-y-2 text-sm text-body-color font-raleway-medium mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Story-based curriculum
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Meets National Standards for Personal Finance Education
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    Full National Standards for Personal Financial Education by 12th-grade curriculum
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={HS_FULL_PROGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-raleway-bold text-primary hover:underline"
                  >
                    View Full NS-12 program on LMS
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  </a>
                  <button
                    type="button"
                    onClick={() => addItem({ type: "program", code: "NS-12", name: "Full NS-12 program", id: "full-ns-12" })}
                    className={addToCartBtnClass}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                    Add to cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Higher Education (Young Adults) – same accordion structure; hero image like High School */}
      <section className="mb-12 rounded-2xl bg-primary/5 border border-primary/15 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">Higher Education (Young Adults)</h2>
        <div className="w-16 h-0.5 bg-teal rounded-full mb-4 mx-auto" aria-hidden />
        <div className="flex justify-center mb-4">
          <div className="rounded-xl border-2 border-primary/20 bg-white p-2 shadow-md">
            <img
              src={`${ASSETS}${encodeURIComponent("general users.png")}`}
              alt="Young adults – Dreamlife-Sim"
              className="max-w-[280px] sm:max-w-[320px] h-auto object-contain block"
            />
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center max-w-2xl mx-auto mb-6">
          Financial navigation for young adults: real-world context, micro-tasks, and lessons that meet students where they are.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            heALaCarteOpen ? "border-primary border-l-4 border-l-gold" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openHeALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                heALaCarteOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={heALaCarteOpen}
              aria-controls="he-a-la-carte-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">À la carte</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Purchase individual courses. Pick only the topics you need.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  heALaCarteOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {heALaCarteOpen && (
              <div id="he-a-la-carte-content" className="border-t border-primary/20 bg-white px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {HE_FRAMEWORKS.length > 0 ? (
                      HE_FRAMEWORKS.map((f) => (
                        <a
                          key={f.name}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-raleway-medium text-primary hover:bg-primary/20 transition-colors inline-flex items-center gap-1"
                        >
                          {f.name}
                          <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-body-color font-raleway-medium italic">Content coming soon.</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Courses</p>
                  {HE_COURSES.length > 0 ? (
                    <>
                      <ul className="rounded-lg border border-brand-green/40 divide-y divide-brand-green/20 overflow-hidden">
                        {HE_COURSES.map((c, i) => (
                          <li key={i}>
                            <div className="px-4 py-3 flex items-center gap-3 font-raleway-medium">
                              <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                                {c.image ? (
                                  <img src={`${ASSETS}${encodeURIComponent(c.image)}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-raleway-bold text-primary">YA</span>
                                )}
                              </span>
                              {c.code && (
                                <span className="shrink-0 text-xs font-raleway-bold text-primary uppercase">{c.code}</span>
                              )}
                              <span className="flex-1 text-body-color">{c.name}</span>
                            </div>
                            <div className="px-4 pb-3 pt-0 pl-16 text-sm text-body-color font-raleway-medium flex flex-wrap items-center gap-2">
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary font-raleway-bold hover:underline"
                              >
                                Open course
                                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
                              </a>
                              <button
                                type="button"
                                onClick={() => addItem({ type: "course", code: c.code, name: c.name, url: c.url })}
                                className={addToCartBtnClass}
                              >
                                <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                                Add to cart
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={LMS_COURSES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-raleway-bold text-primary hover:underline"
                      >
                        View all courses at lms.moneyling.org
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      </a>
                    </>
                  ) : (
                    <p className="text-sm text-body-color font-raleway-medium italic">Content coming soon.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Full program dropdown */}
          <div className={`rounded-xl border-2 overflow-hidden bg-white transition-colors ${
            heFullProgramOpen ? "border-primary border-l-4 border-l-navy" : "border-primary/30"
          }`}>
            <button
              type="button"
              onClick={openHeFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                heFullProgramOpen ? "bg-primary/15" : "hover:bg-primary/5"
              }`}
              aria-expanded={heFullProgramOpen}
              aria-controls="he-full-program-content"
            >
              <div>
                <h3 className="text-sm font-raleway-bold text-primary uppercase tracking-wider">Full program</h3>
                <p className="text-sm text-body-color font-raleway-medium mt-0.5">
                  Complete curriculum for young adults—all courses and frameworks in one program.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-200 ${
                  heFullProgramOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {heFullProgramOpen && (
              <div id="he-full-program-content" className="border-t border-primary/20 bg-white p-4 sm:p-5" role="region" aria-label="Higher Education full program details">
                <h3 className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-3">What the program includes</h3>
                <ul className="space-y-0 overflow-hidden rounded-lg border border-brand-green/40 divide-y divide-brand-green/20">
                  <li>
                    <div className="px-4 py-3 flex items-center gap-3 font-raleway-medium">
                      <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                        <img
                          src={`${ASSETS}${encodeURIComponent("Dreamlife-Sim Dashboard.png")}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="shrink-0 text-xs font-raleway-bold text-primary uppercase">YA</span>
                      <span className="flex-1 text-body-color">Dreamlife-Sim Subscription</span>
                    </div>
                    <div className="px-4 pb-3 pt-0 pl-[calc(1rem+2.25rem+0.75rem)] sm:pl-16 text-sm text-body-color font-raleway-medium">
                      <p className="mb-2">A financial navigation experience for users, providing micro-tasks and lessons to reach their destination.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={HE_FULL_PROGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-raleway-bold text-primary hover:underline"
                        >
                          Try Dreamlife-Sim Now.
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
                        </a>
                        <button
                          type="button"
                          onClick={() => addItem({ type: "program", code: "YA", name: "Higher Education full program (Dreamlife-Sim)", id: "full-he" })}
                          className={addToCartBtnClass}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" aria-hidden />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Primary CTA – step-by-step setup */}
      <section className="rounded-2xl bg-gradient-to-br from-primary/15 to-mint/20 border-2 border-primary/20 p-8 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3 text-center">
          Ready to bring Moneyling to your students?
        </h2>
        <div className="w-12 h-0.5 bg-gold rounded-full mx-auto mb-6" aria-hidden />
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center mb-6 max-w-xl mx-auto">
          Follow these steps to get set up:
        </p>
        <ol className="max-w-2xl mx-auto space-y-4 text-left list-none counter-reset">
          <li className="flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white font-raleway-bold text-sm flex items-center justify-center">1</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">Select your courses, program, or products.</span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white font-raleway-bold text-sm flex items-center justify-center">2</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">Check out or save/print your cart for your PO. Download our W-9.</span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white font-raleway-bold text-sm flex items-center justify-center">3</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">
              <a
                href="https://lms.moneyling.org/register/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-raleway-bold hover:underline"
              >
                Create your instructor account
              </a>
              .
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white font-raleway-bold text-sm flex items-center justify-center">4</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">You’ll receive an email within 48 hours when you’re all set up!</span>
          </li>
        </ol>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/payment"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors px-6 py-3 border-2 border-gold/50 shadow-md"
          >
            My Cart
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            to="/contact?audience=educator"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-primary text-primary hover:bg-primary/10 transition-colors px-6 py-3"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* Cross-sell */}
      <p className="text-center mt-8 text-sm text-gray-500 font-raleway-medium">
        Represent a bank or credit union?{" "}
        <Link
          to="/for-financial-institutions"
          className="text-primary font-raleway-bold underline hover:no-underline"
        >
          See our Financial Institution path
        </Link>
      </p>
    </div>
  );
}
