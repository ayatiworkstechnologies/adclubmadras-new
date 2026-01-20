"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

const timelineData = [
  {
    year: "1956",
    content: "The Ad Club of Madras is established.",
  },
  {
    year: "1977",
    content:
      "The Maddys become the first major advertising award show in South India and recognizes excellence in creative advertising across the region for all agencies, clients and brand custodians.",
  },
  {
    year: "1986",
    content:
      "The Ad Club adds yet another major annual event — a Panel Discussion on the current advertising topic. This has since evolved to include speaker meets and Gyan series.",
  },
  {
    year: "1994",
    content:
      "The Ad Club launches The Great Debate. The format is a Parliamentary-style live debate on advertising industry topics featuring national-level leaders in Marketing, Media and Creative.",
  },
  {
    year: "1995",
    content:
      "The Ad Club launches PGDAM — a premier advertising diploma program in collaboration with top ad professionals in Chennai. It’s now one of the most sought-after industry certification courses.",
  },
  {
    year: "1998",
    content:
      "Maddys introduces industry categories and digital advertising awards for the first time in South India, recognizing innovation in new and emerging media formats.",
  },
  {
    year: "2006",
    content:
      "PGDAM celebrates its 10th anniversary, producing over 1000 advertising professionals across 10 years. The curriculum is revamped and upgraded with latest industry modules.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutTimeLine() {
  const { darkMode } = useTheme();

  return (
    <section className="relative bg-white dark:bg-black text-black dark:text-white top-10 py-20 px-4 sm:px-6 lg:px-20 overflow-hidden transition-colors duration-500">
      {/* Vertical Timeline Line */}
      <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-primary transform -translate-x-1/2 z-0 animate-pulse" />

      {/* Timeline Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-24">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className={`relative flex flex-col md:flex-row items-start gap-20 ${isEven
                  ? "md:flex-row md:text-right"
                  : "md:flex-row-reverse md:text-left"
                }`}
            >
              {/* Dot with Arrow */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 bg-black border border-white rounded-full shadow-lg" />
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="-mt-7"
                >
                  {isEven ? (
                    <ArrowLeft className="text-primary  w-6 h-6" />
                  ) : (
                    <ArrowRight className="text-primary w-6 h-6" />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="md:w-1/2 space-y-2">
                <h3 className="text-primary font-bold text-2xl">{item.year}</h3>
                <p className="text-sm md:text-base font-glancyr">{item.content}</p>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
