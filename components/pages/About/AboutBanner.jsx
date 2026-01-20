"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

const heroImage = "/assets/hero-img.svg";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutBanner() {
  const { darkMode } = useTheme();

  return (
    <section className="py-10 sm:py-16">
      {/* Hero Image */}
      <motion.div
        className="flex justify-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={heroImage}
          alt="Workstation"
          width={1024}
          height={600}
          className="w-full max-w-5xl rounded-xl shadow-xl object-cover"
          priority
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={`${darkMode ? "dark:bg-black dark:text-white" : "bg-white text-black"
          } py-16 px-4 sm:px-6 md:px-10`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto space-y-6 font-glancyr text-justify text-sm sm:text-base leading-relaxed">
          {[
            `Advertising rides on the wheels of creative energy, brainstorming, insights and the recognition of creative brilliance. The Ad Club Madras has brought more than 1000 enthusiastic advertising & related-industry professionals on board for a non-stop whimsical journey of learning.`,
            `Members can look forward to quality seminars and conferences of current trends, trendsetters, and eminent Business Executives from throughout India and a grand finale award to recognize top performers in the Industry. We also provide a wonderful opportunity for the members to zealously participate in various sports competitions like Cricket, Bowling, Badminton, Table Tennis and more.`,
            `The Advertising Club Madras is one of the oldest clubs in India with over 65 years of legacy. The club has been promoted by stalwarts of yesteryears, who were committed professionals and had the larger picture of providing a platform for practising advertising professionals to meet and exchange ideas for the betterment of the industry.`,
            `In keeping with the current trends of the economy, Advertising industry has also evolved to meet the current challenges. The club organises regular Gyan Series of speaker meets, where some of the top notch professionals from across the country share their experience and learnings for the benefit of our Club members.`,
            `Since 1977, Advertising Club Madras is recognising the industry work through its Maddys & Advertising Award. Any association is only as strong as its members. We urge you to please renew the membership for this year at the earliest. In case you are a fresh member do send in your registration as you have a lot of value to be acquired. How do you benefit?`,
          ].map((para, index) => (
            <motion.p key={index} variants={fadeUpVariant}>
              {para}
            </motion.p>
          ))}

          {/* List Items */}
          <motion.ul
            className="list-disc list-inside pl-4"
            variants={fadeUpVariant}
          >
            <li>
              Participate in the Gyan series, learn from experts and get the
              best practices to be adopted in your work or business.
            </li>
            <li>
              Network with your industry colleagues, and share your learnings
              with everyone.
            </li>
            <li>
              Avail of special discounts for the PGDAM course. Have you deputed
              your office colleagues to join this course? Please visit our
              website for registration and course details.
            </li>
          </motion.ul>

          {/* Contact Paragraph */}
          <motion.p variants={fadeUpVariant}>
            For more information do contact our Secretariat at{" "}
            <a href="tel:8248717152" className="text-primary underline">
              8248717152
            </a>{" "}
            /{" "}
            <a href="tel:42694778" className="text-primary underline">
              42694778
            </a>
            {" "}; Email:{" "}
            <a
              href="mailto:admin@adclubmadras.com"
              className="text-primary underline"
            >
              admin@adclubmadras.com
            </a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
