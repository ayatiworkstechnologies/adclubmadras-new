"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PGDACourseCard() {
    const handleExternalLink = () => {
        window.open("https://pgda.adclubmadras.com/", "_blank");
    };

    return (
        <section className="bg-black text-white py-16 px-4 flex flex-col items-center justify-center text-center overflow-hidden relative">
            {/* Yellow Skewed Banner */}
            <div className="relative mb-8">
                <div className="bg-yellow-400 px-6 py-4 transform -skew-y-3 inline-block">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-asgard font-extrabold uppercase text-black">
                        COURSE OFFERED <br />(PGDA)
                    </h2>
                </div>
            </div>

            {/* Subtitle */}
            <p className="text-white text-sm sm:text-base md:text-lg font-glancyr max-w-xl mx-auto mb-8">
                Join the PGDA course today & learn what it takes to build brands!
            </p>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={handleExternalLink}
                className="flex items-center group w-fit"
            >
                <span className="px-6 py-3 text-base bg-white hover:bg-primary text-black rounded-full font-bold font-asgard group-hover:bg-primary group-hover:text-black transition duration-300">
                    VIEW DETAILS
                </span>
                <span className="px-4 py-3 bg-white hover:bg-primary text-black rounded-full group-hover:bg-primary group-hover:text-black transition duration-300 flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                </span>
            </motion.button>
        </section>
    );
}
