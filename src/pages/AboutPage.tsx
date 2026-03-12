/**
 * Moneyling.org – About page. Copy from moneyling.org/about; images from public folder.
 */

import React from "react";
import { Link } from "react-router-dom";

const ASSETS = import.meta.env.BASE_URL;

export function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-1 sm:px-2 lg:px-3 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-raleway-bold text-primary mb-2 text-center">
        About Moneyling
      </h1>
      <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-12" aria-hidden />

      {/* Meet the Founders */}
      <section className="mb-14">
        <h2 className="text-2xl font-raleway-bold text-primary mb-8 text-center">
          Meet the Founders
        </h2>
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
              <img
                src={`${ASSETS}savanha-profile-pic.jpeg`}
                alt="Savanha Brubaker"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-raleway-bold text-primary mb-3">Savanha Brubaker</h3>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-3">
                Savanha Brubaker is a portfolio manager with decades of experience as a serial entrepreneur. At Paragon Strategies, she oversees a diverse portfolio that includes real estate, property management, angel investments, and operating companies.
              </p>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-3">
                As co-founder of Moneyling, Savanha brings the financial and business expertise that underpins the program. She focuses on bridging finance, education, and innovation to make financial literacy accessible and actionable—particularly for underserved communities.
              </p>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
                Passionate about creating meaningful societal impact, she combines her background in finance and strategic investments with a philanthropic capitalist mindset to build programs that empower communities.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
              <img
                src={`${ASSETS}jenn-profile-pic.jpeg`}
                alt="Jennifer Degenhardt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-raleway-bold text-primary mb-3">Jennifer Degenhardt</h3>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-3">
                Jennifer Degenhardt is a Spanish teacher, author, and curriculum developer with more than 30 years of classroom experience. She is best known for her comprehensible novels that make language learning engaging and accessible for students.
              </p>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-3">
                As co-founder of Moneyling, Jennifer has expanded her expertise into financial literacy, creating multiple books and countless vignettes that form the foundation of the Moneyling curriculum. She oversees the relatability and student-centered approach across all program content, ensuring financial concepts are presented in easy-to-understand ways that connect with students’ real lives and spark meaningful conversations.
              </p>
              <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
                Passionate about storytelling as a tool for learning, Jennifer combines her decades of classroom experience with her writing to make financial education accessible, engaging, and impactful. Her additional novels and resources can be found at{" "}
                <a href="https://www.puenteslanguage.com" target="_blank" rel="noopener noreferrer" className="text-primary font-raleway-bold hover:underline">www.puenteslanguage.com</a> and{" "}
                <a href="https://lms.moneyling.org" target="_blank" rel="noopener noreferrer" className="text-primary font-raleway-bold hover:underline">lms.moneyling.org</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Winning Team */}
      <section className="mb-14 rounded-2xl bg-primary/5 border border-primary/10 py-6 sm:py-8 px-3 sm:px-5">
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
          <div className="shrink-0 w-full sm:w-64 rounded-xl overflow-hidden border-2 border-primary/20 shadow-md">
            <img
              src={`${ASSETS}savanha-and-jen.png`}
              alt="Savanha Brubaker and Jennifer Degenhardt"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-raleway-bold text-primary mb-2">Winning Team</h2>
            <p className="text-sm font-raleway-medium text-body-color italic">
              Moneyling’s duo is your perfect liaison between the worlds of education and finance
            </p>
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-4">
          What sets <strong className="font-raleway-bold text-primary">Moneyling</strong> apart is the <strong className="font-raleway-bold">unmatched combination of expertise</strong> brought by its co-founders. Financial institutions and educational systems often operate in vastly different ways—with unique priorities, structures, and cultures.
        </p>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-4">
          <strong className="font-raleway-bold">Moneyling succeeds because of the distinct yet complementary strengths of its founders.</strong> Savanha Brubaker’s financial knowledge, strategic mindset, and entrepreneurial experience meet Jennifer Degenhardt’s extensive background in education, curriculum development, and storytelling.
        </p>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-4">
          This rare blend of <strong className="font-raleway-bold">business acumen and educational expertise</strong> allows us to design a program that bridges both worlds seamlessly—ensuring the financial literacy we deliver is not only accurate and practical but also engaging and meaningful for students, teachers, and families.
        </p>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
          <strong className="font-raleway-bold">The program doesn’t just teach financial concepts; it translates them into relatable, actionable knowledge that resonates with learners of all ages.</strong> At Moneyling, we build partnerships between schools and financial institutions to <strong className="font-raleway-bold">empower communities</strong>, closing the wealth gap through <strong className="font-raleway-bold">education and access</strong>.
        </p>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mt-6">
          <strong className="font-raleway-bold text-primary">Ready to take the first step?</strong> Contact us today to learn more about our services and how we can help you achieve your goals. We look forward to hearing from you!{" "}
          <a href="mailto:Info@moneyling.org" className="text-primary font-raleway-bold hover:underline">Info@moneyling.org</a>
        </p>
      </section>

      {/* Our Mission and Purpose */}
      <section className="mb-14">
        <h2 className="text-2xl font-raleway-bold text-primary mb-6 text-center">
          Our Mission and Purpose
        </h2>

        <div className="rounded-2xl bg-mint/15 border border-mint/40 p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-raleway-bold text-primary mb-3">Our Mission</h3>
          <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
            At Moneyling, our mission is to help close the wealth gap by providing comprehensive and accessible financial education to schools and communities. Our solution delivers integrated, multidisciplinary financial literacy programs from 6th-grade through high school. We provide students with essential financial knowledge, support educators with expertly designed curricula, and foster community engagement through partnerships with financial institutions to empower all involved. We aim to create a financially literate generation capable of making informed decisions, building wealth, and achieving financial security, thereby contributing to a more equitable and prosperous society.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-light bg-white p-6 sm:p-8">
          <h3 className="text-lg font-raleway-bold text-primary mb-3">The Growing Problem</h3>
          <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-4">
            The world of money is changing. The workplace is different, and it has become more challenging to save for retirement. Additionally, medical bills and others have become increasingly more costly, and many people are not familiar with how to use helpful tools designed to help the consumer, such as Healthcare Savings Account (HSA).
          </p>
          <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed mb-4">
            <strong className="font-raleway-bold">The wealth gap is widening rapidly due to economic changes:</strong>
          </p>
          <ul className="space-y-2 text-body-color font-raleway-medium text-sm sm:text-base list-disc list-inside mb-4">
            <li><strong className="font-raleway-bold">Job Trends</strong>: Decline in employer pensions; rise in gig work and self-employment.</li>
            <li><strong className="font-raleway-bold">Retirement Planning</strong>: Less support from employers; more onus on individuals.</li>
            <li><strong className="font-raleway-bold">Medical Expenses</strong>: Medical expenses are a large contributor to the burden on individuals. Programs like the Health Care Savings Accounts (HSA) are invaluable to reducing those burdens.</li>
            <li><strong className="font-raleway-bold">Financial Illiteracy</strong>: More than in any other generation, consumers are unaware of essential financial tools and strategies, perhaps fueled by how younger generations consume information and the inaccuracies of that information delivered on social media platforms.</li>
            <li><strong className="font-raleway-bold">Urgency</strong>: Immediate action is needed as a delay further widens the gap and leaves more people financially underprepared.</li>
          </ul>
          <p className="text-body-color font-raleway-medium text-sm sm:text-base leading-relaxed">
            Educating the next generation in financial literacy can bridge this gap, helping individuals build wealth and secure their futures.
          </p>
        </div>
      </section>

      {/* Our Goals & Measurements */}
      <section className="mb-14">
        <h2 className="text-2xl font-raleway-bold text-primary mb-6 text-center">
          Our Goals & Measurements
        </h2>
        <div className="space-y-8">
          <div className="rounded-xl border-l-4 border-navy border border-gray-light/80 bg-white p-5 shadow-sm">
            <h3 className="text-base font-raleway-bold text-navy mb-2">Monitor the Impact on Wealth Distribution</h3>
            <p className="text-body-color font-raleway-medium text-sm mb-3">
              <strong className="font-raleway-bold">Objective</strong>: Use FRED data to monitor changes in the wealth distribution among different percentiles over time, assessing the impact of the Moneyling program on narrowing the wealth gap.
            </p>
            <p className="text-body-color font-raleway-medium text-sm"><strong className="font-raleway-bold">Measurement</strong>: Wealth data analysis; comparison over time; impact assessment correlating program implementation with changes in wealth distribution.</p>
          </div>

          <div className="rounded-xl border-l-4 border-primary border border-gray-light/80 bg-white p-5 shadow-sm">
            <h3 className="text-base font-raleway-bold text-primary mb-2">Increase Program Reach</h3>
            <p className="text-body-color font-raleway-medium text-sm mb-3">
              <strong className="font-raleway-bold">Objective</strong>: Deploy Moneyling’s Week of Financial Literacy program to 20% of all US public 8th–12 grade schools by end of 2026, with the commitment of continuous yearly deployment of the program.
            </p>
            <p className="text-body-color font-raleway-medium text-sm"><strong className="font-raleway-bold">Measurement</strong>: Track the number of schools and students enrolled; utilization of high school financial literacy standards.</p>
          </div>

          <div className="rounded-xl border-l-4 border-teal border border-gray-light/80 bg-white p-5 shadow-sm">
            <h3 className="text-base font-raleway-bold text-teal mb-2">Improve State Financial Literacy Grades</h3>
            <p className="text-body-color font-raleway-medium text-sm mb-3">
              <strong className="font-raleway-bold">Objective</strong>: Strive to improve the financial literacy grades of states we serve based on the Center for Financial Literacy 2023 National Report Card.
            </p>
            <p className="text-body-color font-raleway-medium text-sm"><strong className="font-raleway-bold">Measurement</strong>: Monitor the state financial literacy study at{" "}
              <a href="https://financialliteracy.champlain.edu/report-cards/2023-national-report-card-on-high-school-financial-literacy/" target="_blank" rel="noopener noreferrer" className="text-primary font-raleway-bold hover:underline">Champlain College</a> before and after implementing the program; collect feedback from participating schools.
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-gold border border-gray-light/80 bg-white p-5 shadow-sm">
            <h3 className="text-base font-raleway-bold text-primary mb-2">Gain Insights on Financial Literacy Practices</h3>
            <p className="text-body-color font-raleway-medium text-sm mb-3">
              <strong className="font-raleway-bold">Objective</strong>: Gather insights on the actions taken by teachers, students, parents, and administrators to implement financial literacy practices learned through the Moneyling program, ensuring progress toward our mission of closing the wealth gap.
            </p>
            <p className="text-body-color font-raleway-medium text-sm"><strong className="font-raleway-bold">Measurement</strong>: Voluntary surveys (new accounts opened or intended); feedback from teachers, students, and parents; assess overall integration into curriculum and culture.
            </p>
          </div>
        </div>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base text-center mt-8 max-w-2xl mx-auto">
          By holding our success to a high standard and verifying our progress through these insights, we can ensure that Moneyling is truly making a difference in financial literacy and helping to bridge the wealth gap.
        </p>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-primary/15 to-mint/20 border-2 border-primary/20 p-8 sm:p-10 text-center">
        <h2 className="text-xl font-raleway-bold text-primary mb-3">Contact Us</h2>
        <div className="w-12 h-0.5 bg-gold rounded-full mx-auto mb-4" aria-hidden />
        <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Ready to bring Moneyling to your school or community? Get in touch—we’ll respond quickly and walk you through next steps.
        </p>
        <Link
          to="/contact"
          className="btn-glass inline-flex items-center justify-center text-sm font-medium px-6 py-3"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
