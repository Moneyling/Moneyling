/**
 * Moneyling.org – For Educators. Structure: LMS intro → Demo → middle/high school courses → Free courses → CTA.
 * Course links point to lms.moneyling.org (pulled from LMS course catalog).
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";


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

// Higher Education (Young Adults) – placeholder; add frameworks, courses, and program URL when ready
const HE_FRAMEWORKS: { name: string; url: string }[] = [];
const HE_COURSES: { code: string; name: string; url: string; image?: string }[] = [];
const HE_FULL_PROGRAM_URL = "https://dreamlife.moneyling.org";

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

export function ForEducatorsPage() {
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
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border-l-4 border-navy border border-gray-light/80 bg-mint/20 p-4 sm:p-5 shadow-sm">
            <h3 className="text-sm font-raleway-bold text-navy uppercase tracking-wider mb-2">Teacher shortage? No problem.</h3>
            <p className="text-sm text-body-color font-raleway-medium">
              Use Moneyling for teacherless or low-supervision classrooms. Students can progress through lessons and quizzes on their own while you track completion from your dashboard.
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-teal border border-gray-light/80 bg-cream/80 p-4 sm:p-5 shadow-sm">
            <h3 className="text-sm font-raleway-bold text-teal uppercase tracking-wider mb-2">Self-grading quizzes</h3>
            <p className="text-sm text-body-color font-raleway-medium">
              Built-in quizzes that grade automatically. Less paperwork, more time for teaching and intervention where it matters.
            </p>
          </div>
        </div>
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
                    <li key={i}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 flex items-center gap-3 font-raleway-medium text-body-color hover:bg-primary/5 transition-colors"
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
                        <span className="flex-1">{c.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                      </a>
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* High School Offerings – accordion dropdowns, side by side on sm+ */}
      <section className="mb-12 rounded-2xl bg-cream/50 border border-gold/30 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">High School Offerings</h2>
        <div className="w-16 h-0.5 bg-gold rounded-full mb-4" aria-hidden />
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
                    <li key={i}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 flex items-center gap-3 font-raleway-medium text-body-color hover:bg-primary/5 transition-colors"
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
                        <span className="flex-1">{c.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                      </a>
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
                  Imagine it. Plan it. Live it.—complete high school curriculum with all courses and frameworks.
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
                    Imagine it. Plan it. Live it.—all six core topics and frameworks in one program
                  </li>
                </ul>
                <a
                  href={HS_FULL_PROGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-raleway-bold text-primary hover:underline"
                >
                  View Full NS-12 program on LMS
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Higher Education (Young Adults) – same accordion structure; content TBD */}
      <section className="mb-12 rounded-2xl bg-primary/5 border border-primary/15 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">Higher Education (Young Adults)</h2>
        <div className="w-16 h-0.5 bg-teal rounded-full mb-4" aria-hidden />
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
                    <ul className="rounded-lg border border-brand-green/40 divide-y divide-brand-green/20 overflow-hidden">
                      {HE_COURSES.map((c, i) => (
                        <li key={i}>
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 flex items-center gap-3 font-raleway-medium text-body-color hover:bg-primary/5 transition-colors"
                          >
                            <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                              {c.image ? (
                                <img src={`${ASSETS}${encodeURIComponent(c.image)}`} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-raleway-bold text-primary">HE</span>
                              )}
                            </span>
                            {c.code && (
                              <span className="shrink-0 text-xs font-raleway-bold text-primary uppercase">{c.code}</span>
                            )}
                            <span className="flex-1">{c.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                          </a>
                        </li>
                      ))}
                    </ul>
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
                <ul className="space-y-2 text-sm text-body-color font-raleway-medium mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    <strong className="font-raleway-bold text-primary">Dreamlife-Sim Subscription</strong> — A financial navigation experience for users, providing micro-tasks and lessons to reach their destination.
                  </li>
                </ul>
                <a
                  href={HE_FULL_PROGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-raleway-bold text-primary hover:underline"
                >
                  <span className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center">
                    <img
                      src={`${ASSETS}${encodeURIComponent("general users.png")}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </span>
                  Try Dreamlife-Sim Now.
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-primary/15 to-mint/20 border-2 border-primary/20 p-8 sm:p-10 text-center">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3">
          Ready to bring Moneyling to your students?
        </h2>
        <div className="w-12 h-0.5 bg-gold rounded-full mx-auto mb-4" aria-hidden />
        <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Get access to the platform and curriculum. We’ll respond quickly and walk you through setup.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact?audience=educator"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors px-6 py-3 border-2 border-gold/50 shadow-md"
          >
            Request access
            <ArrowRight className="w-4 h-4 ml-2" />
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
