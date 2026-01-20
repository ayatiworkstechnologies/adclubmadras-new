"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const CircleGray = "/assets/Circle-gray.svg";
const CircleYellow = "/assets/Circle-yellow.svg";

export default function AboutCircle() {
  const { darkMode } = useTheme();
  const backgroundImage = darkMode ? CircleGray : CircleYellow;

  return (
    <section className="relative bg-white dark:bg-black text-black dark:text-white py-20 px-4 sm:px-6 md:px-10 lg:px-20 flex justify-center items-center overflow-hidden transition-colors duration-500">
      {/* Animated Background SVG */}
      <motion.img
        src={backgroundImage}
        alt="Decorative Circle"
        className="absolute w-[60%] max-w-6xl dark:invert pointer-events-none"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Foreground Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-10">
        {/* Heading */}
        <motion.h4
          className="text-primary font-asgard font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          A Remarkable Journey
        </motion.h4>

        {/* Description */}
        <motion.h2
          className="mt-6 p-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-glancyr font-medium leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          drag="x"
          dragConstraints={{ left: -40, right: 40 }}
          dragElastic={0.2}
        >
          20 creative minds came together on 18th February, <br /> 1956 over cups of
          tea; and they brewed the Ad Club <br /> Madras. The club has grown stronger
          over the <br /> decades, enriched by the members who continue to <br /> elevate
          excellence in advertising. Today, the club <br />enjoys recognition by
          notable individuals and <br /> organizations across the country.
        </motion.h2>
      </div>
    </section>
  );
}
