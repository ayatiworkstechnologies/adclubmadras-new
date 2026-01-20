"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const sliderData = [
    {
        count: "500+",
        title: "creatives, advertisers, and strategists",
    },
    {
        count: "75+",
        title: "years of advertising legacy campaigns",
    },
    {
        count: "1000+",
        title: "campaigns supported and celebrated",
    },
];

export default function LegacySection() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % sliderData.length);
        }, 1500);

        return () => resetTimeout();
    }, [activeIndex]);

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white px-6 py-16 md:py-14 transition-colors duration-500">
            <div className="max-w-5xl mx-auto space-y-20">
                {/* Top Slider Section */}
                <motion.div
                    className="flex justify-center sm:justify-end px-4"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text- sm:text-left space-y-2 max-w-md">
                        <h4 className="uppercase font-asgard text-xs text-black dark:text-white tracking-widest">
                            Some facts about us
                        </h4>
                        <div className="w-30 h-0.5 bg-black dark:bg-white mb-4 ml-0 sm:ml-auto" />

                        <h2 className="text-4xl font-extrabold text-primary">
                            {sliderData[activeIndex].count}
                        </h2>
                        <p className="text-sm text-gray-700 font-Glancyr dark:text-gray-300">
                            {sliderData[activeIndex].title}
                        </p>

                        <div className="flex justify-center space-x-1 pt-2">
                            {sliderData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        resetTimeout();
                                        setActiveIndex(index);
                                    }}
                                    className={`h-1 transition-all duration-300 focus:outline-none ${index === activeIndex
                                            ? "w-10 bg-primary"
                                            : "w-10 bg-gray-400 dark:bg-gray-600 opacity-50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Legacy Message Section */}
                <motion.div
                    className="space-y-8 text-left px-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-asgard uppercase sm:text-5xl font-extrabold leading-tight">
                        WHERE HISTORY <br />
                        FUELS THE <span className="text-primary">FUTURE</span>
                    </h2>

                    <p className="mt-6 text-sm font-Glancyr leading-relaxed text-gray-700 dark:text-gray-300 max-w-xl">
                        The Advertising Club Madras is one of India's oldest and most
                        respected advertising communities. We honor the pioneers who paved
                        the way while empowering the next generation of creatives.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push(`/about-us`)}
                        className="mt-8 inline-flex font-asgard items-center group w-fit"
                    >
                        <span
                            className="px-6 py-3 group-hover:bg-primary
                    text-sm sm:text-base md:text-lg lg:text-xl 
                    bg-black dark:bg-white text-white dark:text-black 
                    rounded-full font-bold 
                    hover:bg-primary dark:hover:bg-primary 
                    transition-all duration-300"
                        >
                            EXPLORE OUR LEGACY
                        </span>
                        <span
                            className="px-4 py-3 group-hover:bg-primary
                      bg-black dark:bg-white text-white dark:text-black 
                      rounded-full hover:bg-primary dark:hover:bg-primary 
                      transition-all duration-300 flex items-center justify-center"
                        >
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
