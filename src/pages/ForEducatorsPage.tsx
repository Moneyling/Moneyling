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
  code: "NS-8",
  topic: "Earning Income",
  url: `${LMS_BASE}/story-based-middle-school-national-standard-course-4/`,
};
const DEMO_HS = {
  code: "NS-12",
  topic: "Spending",
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
  glass,
}: {
  code: string;
  topic: string;
  url?: string;
  glass?: boolean;
}) {
  const baseClass = glass
    ? "btn-glass inline-flex flex-wrap items-center justify-center gap-2 px-3 py-2 font-raleway-bold"
    : "inline-flex flex-wrap items-center gap-2 rounded-lg border-2 border-primary/40 bg-primary/5 px-3 py-2 font-raleway-bold text-primary hover:border-primary hover:bg-primary/10 transition-colors";
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
        className={baseClass}
      >
        {content}
      </a>
    );
  }
  return <span className={baseClass}>{content}</span>;
}

const addToCartBtnClass =
  "btn-glass-outline shrink-0 inline-flex items-center justify-center p-2 rounded-lg";

// Teacher FAQs from https://moneyling.org/faqs (School & Community, LMS, and questions teachers often ask)
const EDU_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What exactly is Moneyling?",
    answer: "Moneyling is a story-based financial literacy program designed for real classrooms and real students. Lessons are built around relatable characters and everyday decisions—spending, saving, earning, investing, helping family, and planning for the future—so students understand why financial choices matter, not just how they work.",
  },
  {
    question: "Who is Moneyling for?",
    answer: "Moneyling is designed for K-12 financial education: middle school, high school, and community-based programs. We work especially well with diverse student populations, first-generation students, and students who may not see themselves reflected in traditional financial literacy materials. Our personal finance education is built for equitable access.",
  },
  {
    question: "What materials are included?",
    answer: "Depending on the course or unit, Moneyling includes: story-based lessons and modules, teacher guides and pacing suggestions, student activities and reflections, interactive tools (digital and classroom-based), and optional community or family connection events. Everything is designed to be plug-and-play, not extra work.",
  },
  {
    question: "Does Moneyling align with standards?",
    answer: "Yes. Moneyling aligns with the Jump$tart National Standards for Personal Financial Education and state financial literacy standards. Our financial literacy curriculum can be used as a standalone personal finance course or fit naturally into existing K-12 courses (financial literacy, math, social studies, ELA, advisory, world language, and more).",
  },
  {
    question: "Is your financial literacy curriculum Jump$tart-aligned?",
    answer: "Yes. Our standards-aligned financial education curriculum is designed to meet the Jump$tart National Standards for Personal Financial Education (earning income, spending, saving, investing, managing credit, managing risk). We support middle school (NS-8) and high school (NS-12) personal finance education with story-based lessons and an LMS that tracks progress.",
  },
  {
    question: "How much does it cost?",
    answer: "Moneyling often offers free pilot access or sponsored programs for teachers and schools to explore the curriculum with students. The philosophy is simple: try it first. If Moneyling proves valuable in your classroom, schools can choose to continue with a paid partnership in the future.",
  },
  {
    question: "Is this a one-week program or a full course?",
    answer: "Both. Moneyling is modular by design. You can use a single lesson or short unit, run a multi-week module, implement a full course, or adopt the entire program. Teachers choose what fits their schedule and students.",
  },
  {
    question: "What makes Moneyling different from other financial literacy programs?",
    answer: "Moneyling is story-first, human-centered, and classroom-tested. Instead of worksheets and lectures, students learn personal finance through characters, conversations, and decisions that feel familiar and emotionally real. Our financial literacy program is designed for equitable access and works well with diverse and first-generation students.",
  },
  {
    question: "Do teachers need a finance background?",
    answer: "No. Moneyling is built for teachers, not financial professionals. Concepts are scaffolded, explained clearly, and supported with teacher-friendly resources.",
  },
  {
    question: "Does Moneyling involve families or the community?",
    answer: "It can. Many lessons naturally extend into family conversations, and some programs include community events or partnerships that help students connect classroom learning to real-world resources.",
  },
  {
    question: "What is the Moneyling LMS?",
    answer: "The Moneyling Learning Management System (LMS) is the digital home for Moneyling courses. It's where teachers and students access lessons, tools, activities, and progress tracking.",
  },
  {
    question: "What can teachers do in the LMS?",
    answer: "Teachers can assign lessons and activities, track student completion and progress, access interactive tools (e.g., goal-setting, analysis tools), use built-in checks for understanding, assign enrichment work, and create sub plans.",
  },
  {
    question: "What do students do in the LMS?",
    answer: "Students read stories, complete activities, interact with tools, reflect on decisions, and apply concepts to real-world scenarios—all at an age-appropriate pace.",
  },
  {
    question: "Does Moneyling require special technology?",
    answer: "No. Moneyling works on standard devices (Chromebooks, laptops, tablets) and does not require special software or advanced tech skills.",
  },
  {
    question: "Can I use the LMS for blended or in-person classes?",
    answer: "Yes. The LMS supports blended learning, in-person instruction, and at-home extensions. Teachers decide how much or how little to use it.",
  },
  {
    question: "How does the LMS help with accountability?",
    answer: "The LMS tracks completion and engagement so teachers can see what students have done without adding grading or administrative burden.",
  },
  {
    question: "Can I differentiate instruction using the LMS?",
    answer: "Yes. Progress data helps teachers identify who needs support, who is ready for extension, and where class-wide clarification may be needed.",
  },
  {
    question: "Is this more work for me?",
    answer: "Moneyling is designed to be plug-and-play. Teacher guides, pacing suggestions, and ready-to-use activities mean you can focus on teaching, not prep. The LMS also reduces grading and tracking burden.",
  },
  {
    question: "Is this scripted?",
    answer: "No. Lessons provide structure, but teachers maintain autonomy. You can adapt discussions, pacing, and activities to fit your classroom.",
  },
  {
    question: "Will this work with reluctant or anxious students?",
    answer: "Yes. Story-based learning lowers pressure and invites discussion without requiring students to share personal financial information.",
  },
  {
    question: "Is Moneyling culturally responsive?",
    answer: "Yes. Characters and stories intentionally reflect diverse backgrounds, family structures, and lived experiences—without stereotypes or tokenism.",
  },
  {
    question: "Do students have to share personal financial details?",
    answer: "No. All scenarios are fictional or hypothetical. Students apply concepts without revealing personal or family finances.",
  },
  {
    question: "Do I have to use every part of the program?",
    answer: "Not at all. Moneyling is modular. Use what fits your goals and students.",
  },
];

export function ForEducatorsPage() {
  const { addItem } = useCart();
  const [msALaCarteOpen, setMsALaCarteOpen] = useState(false);
  const [msFullProgramOpen, setMsFullProgramOpen] = useState(false);
  const [hsALaCarteOpen, setHsALaCarteOpen] = useState(false);
  const [hsFullProgramOpen, setHsFullProgramOpen] = useState(false);
  const [heALaCarteOpen, setHeALaCarteOpen] = useState(false);
  const [heFullProgramOpen, setHeFullProgramOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
    <div className="w-full max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 py-10 sm:py-14 bg-gradient-to-b from-cream/30 to-white">
      {/* Page title */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-raleway-bold text-primary leading-tight mb-4">
          Personal Financial Education Curriculum
        </h1>
        <p className="text-body-color font-raleway-medium text-base sm:text-lg max-w-5xl mx-auto">
          We provide six core financial education topics (Earning, Saving, Spending, Investing, Credit, and Managing Risk). Over 172 chapters per level and 340 plus lessons.
        </p>
      </section>

      {/* Why Moneyling – problem we solve & benefits */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3 text-center">
          New state mandates. We’re here to make it easy.
        </h2>
        <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-6" aria-hidden />
        <p className="text-body-color font-raleway-medium text-center max-w-5xl mx-auto mb-8">
          More states require a personal financial education credit to graduate. Moneyling gives schools and educators ready-made, standards-aligned curriculum—so you can meet mandates without the scramble. All our courses and programs include complete National Standard lessons for the six core financial topics: earning income, saving, spending, credit, investing, and managing risk.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 mb-6 max-w-5xl mx-auto list-none">
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
              <span className="icon-glass shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* LMS intro – green container with gold accent */}
      <section className="rounded-2xl bg-primary text-white px-5 py-4 sm:px-6 sm:py-5 mb-10 text-center shadow-lg border-l-4 border-gold">
        <h2 className="text-lg sm:text-xl font-raleway-bold text-white">
          Moneyling Learning Management System (LMS)
        </h2>
        <div className="my-3 h-px bg-gold/50 max-w-xs mx-auto" aria-hidden />
        <p className="text-sm sm:text-base font-raleway-medium text-white max-w-4xl mx-auto leading-relaxed">
          Welcome to the Moneyling Learning Management System—your gateway to financial empowerment. This platform is designed to provide teachers, students, and community members with seamless access to a range of financial education courses, programs, and resources.
        </p>
      </section>

      {/* Middle School Offerings – accordion: only the clicked container expands; the other stays its own height */}
      <section className="mb-12 rounded-2xl bg-mint/15 border border-mint/40 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">Middle School Offerings</h2>
        <div className="w-16 h-0.5 bg-primary-light rounded-full mb-4" aria-hidden />
        <div className="flex justify-center mb-4">
          <div className="card-glass rounded-xl p-2">
            <img
              src={`${ASSETS}middle-school-offerings.png`}
              alt="Middle school offerings"
              className="max-w-[280px] sm:max-w-[320px] h-auto object-contain block"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            msALaCarteOpen ? "ring-2 ring-gold" : ""
          }`}>
            <button
              type="button"
              onClick={openMsALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                msALaCarteOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="ms-a-la-carte-content" className="border-t border-primary/20 bg-gray-50/80 px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {MS_FRAMEWORKS.map((f) => (
                      <span key={f.name} className="inline-flex items-center gap-1.5">
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glass-outline rounded-md px-2.5 py-1 text-sm font-raleway-medium inline-flex items-center gap-1"
                        >
                          {f.name}
                          <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                        </a>
                        <button
                          type="button"
                          onClick={() => addItem({ type: "course", code: f.name, name: f.name, url: f.url })}
                          className={addToCartBtnClass}
                          aria-label={`Add ${f.name} framework to cart`}
                        >
                          <ShoppingCart className="w-4 h-4" aria-hidden />
                        </button>
                      </span>
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
                        <span className="icon-glass w-9 h-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
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
                        <ShoppingCart className="w-4 h-4" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Full NS-8 program dropdown */}
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            msFullProgramOpen ? "ring-2 ring-navy" : ""
          }`}>
            <button
              type="button"
              onClick={openMsFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                msFullProgramOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="ms-full-program-content" className="border-t border-primary/20 bg-gray-50/80 p-4 sm:p-5" role="region" aria-label="Full NS-8 program details">
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
                  <ShoppingCart className="w-4 h-4" aria-hidden />
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
          <div className="card-glass rounded-xl p-2">
            <img
              src={`${ASSETS}high-school-offerings.png`}
              alt="High school offerings"
              className="max-w-[280px] sm:max-w-[320px] h-auto object-contain block"
            />
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center max-w-4xl mx-auto mb-6">
          These are our high school characters. They give context to financial concepts as they laugh, smile, joke, and cry through real-life situations that your students can relate to.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            hsALaCarteOpen ? "ring-2 ring-teal" : ""
          }`}>
            <button
              type="button"
              onClick={openHsALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                hsALaCarteOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="hs-a-la-carte-content" className="border-t border-primary/20 bg-gray-50/80 px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {HS_FRAMEWORKS.map((f) => (
                      <span key={f.name} className="inline-flex items-center gap-1.5">
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glass-outline rounded-md px-2.5 py-1 text-sm font-raleway-medium inline-flex items-center gap-1"
                        >
                          {f.name}
                          <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                        </a>
                        <button
                          type="button"
                          onClick={() => addItem({ type: "course", code: f.name, name: f.name, url: f.url })}
                          className={addToCartBtnClass}
                          aria-label={`Add ${f.name} framework to cart`}
                        >
                          <ShoppingCart className="w-4 h-4" aria-hidden />
                        </button>
                      </span>
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
                        <span className="icon-glass w-9 h-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
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
                        <ShoppingCart className="w-4 h-4" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Full NS-12 program dropdown */}
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            hsFullProgramOpen ? "ring-2 ring-coral" : ""
          }`}>
            <button
              type="button"
              onClick={openHsFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                hsFullProgramOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="hs-full-program-content" className="border-t border-primary/20 bg-gray-50/80 p-4 sm:p-5" role="region" aria-label="Full NS-12 program details">
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
                    <ShoppingCart className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              </div>
            )}
          </div>
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
          <div className="rounded-xl border-2 border-gold/50 bg-white p-5 shadow-sm flex flex-col items-center text-center">
            <p className="text-sm font-raleway-medium text-body-color mb-3">Demo Middle School Course</p>
            <CourseChip code={DEMO_MS.code} topic={DEMO_MS.topic} url={DEMO_MS.url} glass />
            <p className="mt-4 text-xs font-raleway-medium text-primary">
              Click above to try the demo →
            </p>
          </div>
          <div className="rounded-xl border-2 border-navy/30 bg-white p-5 shadow-sm flex flex-col items-center text-center">
            <p className="text-sm font-raleway-medium text-body-color mb-3">Demo High School Course</p>
            <CourseChip code={DEMO_HS.code} topic={DEMO_HS.topic} url={DEMO_HS.url} glass />
            <p className="mt-4 text-xs font-raleway-medium text-primary">
              Click above to try the demo →
            </p>
          </div>
        </div>
      </section>

      {/* Higher Education (Young Adults) – same accordion structure; hero image like High School */}
      <section className="mb-12 rounded-2xl bg-primary/5 border border-primary/15 px-4 py-6 sm:px-6">
        <h2 className="text-xl font-raleway-bold text-primary mb-1">Higher Education (Young Adults)</h2>
        <div className="w-16 h-0.5 bg-teal rounded-full mb-4 mx-auto" aria-hidden />
        <div className="flex justify-center mb-4">
          <div className="card-glass rounded-xl p-2">
            <img
              src={`${ASSETS}general-users.png`}
              alt="Young adults – Dreamlife-Sim"
              className="max-w-[280px] sm:max-w-[320px] h-auto object-contain block"
            />
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center max-w-4xl mx-auto mb-6">
          Financial navigation for young adults: real-world context, micro-tasks, and lessons that meet students where they are.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {/* À la carte dropdown */}
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            heALaCarteOpen ? "ring-2 ring-gold" : ""
          }`}>
            <button
              type="button"
              onClick={openHeALaCarte}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                heALaCarteOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="he-a-la-carte-content" className="border-t border-primary/20 bg-gray-50/80 px-4 pb-4 sm:px-5 sm:pb-5 pt-2" role="region" aria-label="À la carte courses">
                <div className="mb-4">
                  <p className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {HE_FRAMEWORKS.length > 0 ? (
                      HE_FRAMEWORKS.map((f) => (
                        <span key={f.name} className="inline-flex items-center gap-1.5">
                          <a
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-glass-outline rounded-md px-2.5 py-1 text-sm font-raleway-medium inline-flex items-center gap-1"
                          >
                            {f.name}
                            <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                          </a>
                          <button
                            type="button"
                            onClick={() => addItem({ type: "course", code: f.name, name: f.name, url: f.url })}
                            className={addToCartBtnClass}
                            aria-label={`Add ${f.name} framework to cart`}
                          >
                            <ShoppingCart className="w-4 h-4" aria-hidden />
                          </button>
                        </span>
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
                              <span className="icon-glass w-9 h-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
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
                                <ShoppingCart className="w-4 h-4" aria-hidden />
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
          <div className={`rounded-xl border-2 border-primary/20 bg-white overflow-hidden transition-colors ${
            heFullProgramOpen ? "ring-2 ring-navy" : ""
          }`}>
            <button
              type="button"
              onClick={openHeFullProgram}
              className={`w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors ${
                heFullProgramOpen ? "bg-primary/5" : "hover:bg-gray-50"
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
              <div id="he-full-program-content" className="border-t border-primary/20 bg-gray-50/80 p-4 sm:p-5" role="region" aria-label="Higher Education full program details">
                <h3 className="text-xs font-raleway-bold text-primary uppercase tracking-wider mb-3">What the program includes</h3>
                <ul className="space-y-0 overflow-hidden rounded-lg border border-brand-green/40 divide-y divide-brand-green/20">
                  <li>
                    <div className="px-4 py-3 flex items-center gap-3 font-raleway-medium">
                      <span className="icon-glass w-9 h-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
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
                          <ShoppingCart className="w-4 h-4" aria-hidden />
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
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center mb-6 max-w-3xl mx-auto">
          Follow these steps to get set up:
        </p>
        <ol className="max-w-4xl mx-auto space-y-4 text-left list-none counter-reset">
          <li className="flex gap-3">
            <span className="icon-glass shrink-0 w-8 h-8 rounded-full font-raleway-bold text-sm flex items-center justify-center text-primary">1</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">Select your courses, program, or products.</span>
          </li>
          <li className="flex gap-3">
            <span className="icon-glass shrink-0 w-8 h-8 rounded-full font-raleway-bold text-sm flex items-center justify-center text-primary">2</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">Check out or save/print your cart for your PO. Download our W-9.</span>
          </li>
          <li className="flex gap-3">
            <span className="icon-glass shrink-0 w-8 h-8 rounded-full font-raleway-bold text-sm flex items-center justify-center text-primary">3</span>
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
            <span className="icon-glass shrink-0 w-8 h-8 rounded-full font-raleway-bold text-sm flex items-center justify-center text-primary">4</span>
            <span className="text-body-color font-raleway-medium text-sm sm:text-base pt-0.5">You’ll receive an email within 48 hours when you’re all set up!</span>
          </li>
        </ol>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/payment"
            className="btn-glass inline-flex items-center justify-center text-sm font-medium px-6 py-3"
          >
            My Cart
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            to="/contact?audience=educator"
            className="btn-glass-outline inline-flex items-center justify-center text-sm font-medium px-6 py-3"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* FAQs – from https://moneyling.org/faqs (Moneyling Educator FAQs) */}
      <section className="pt-10 pb-10 mb-14">
        <h2 className="text-2xl sm:text-3xl font-raleway-bold text-primary text-center mb-2">
          Educator FAQs
        </h2>
        <p className="text-body-color font-raleway-medium text-center mb-8 max-w-5xl mx-auto">
          Questions about the School & Community program, the Moneyling LMS, and what educators often want to know. Reach us at{" "}
          <a href="mailto:info@moneyling.org" className="text-primary font-raleway-bold hover:underline">
            info@moneyling.org
          </a>{" "}
          if you don’t find your answer here.
        </p>
        <div className="max-w-5xl mx-auto space-y-2">
          {EDU_FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="card-glass overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 sm:px-5 sm:py-5 hover:bg-white/20 transition-colors text-primary"
                  aria-expanded={isOpen}
                  aria-controls={`edu-faq-answer-${index}`}
                  id={`edu-faq-question-${index}`}
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
                  id={`edu-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`edu-faq-question-${index}`}
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

      {/* COPPA & National Standards – compliance and Jump$tart */}
      <section className="mt-12 text-center">
        <h3 className="text-base sm:text-lg font-raleway-bold text-primary mb-4">
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

      {/* Cross-sell */}
      <p className="text-center mt-8 text-sm text-gray-500 font-raleway-medium">
        Represent a bank or credit union?{" "}
        <Link
          to="/for-financial-institutions"
          className="text-primary font-raleway-bold underline hover:no-underline"
        >
          See our Financial Institution path
        </Link>
        {" · "}
        An individual?{" "}
        <Link
          to="/individuals"
          className="text-primary font-raleway-bold underline hover:no-underline"
        >
          See For Individuals
        </Link>
      </p>
    </div>
  );
}
