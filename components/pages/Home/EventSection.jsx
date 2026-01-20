"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function EventSection() {
    const { darkMode } = useTheme();
    const backgroundImage = "/assets/Circle-yellow.svg";

    return (
        <section className="relative bg-white dark:bg-black text-black dark:text-white sm:py-32 py-20 px-4 sm:px-6 md:px-10 lg:px-16 flex justify-center items-center overflow-hidden transition-colors duration-500">
            {/* Animated SVG background */}
            <motion.img
                src={backgroundImage}
                alt="decorative circle"
                className="absolute w-[80%] max-w-4xl opacity-90"
                style={{ zIndex: 1 }}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
            />

            {/* Text content */}
            <div className="relative z-10 max-w-4xl text-center leading-tight px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-3xl sm:text-4xl font-asgard md:text-6xl lg:text-7xl font-extrabold uppercase"
                    drag="x"
                    dragConstraints={{ left: -40, right: 40 }}
                    dragElastic={0.3}
                >
                    Stay ahead of <br /> the curve by participating in our upcoming<br />
                    events
                </motion.h2>
            </div>
        </section>
    );
}
