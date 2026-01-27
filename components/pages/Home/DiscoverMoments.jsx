"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DiscoverMoments({ initialPhotos = [] }) {
    const router = useRouter();
    const marqueeControls = useAnimation();
    const marqueeRef = useRef();

    const images = useMemo(() => {
        return (initialPhotos || [])
            .filter((item) => item.type === "gallery" && item.path)
            .slice(-15)
            .map((item) => item.path);
    }, [initialPhotos]);

    useEffect(() => {
        marqueeControls.start({
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
            },
        });
    }, [marqueeControls]);

    const handleMouseEnter = () => marqueeControls.stop();
    const handleMouseLeave = () =>
        marqueeControls.start({
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
            },
        });

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-4 overflow-hidden transition-colors duration-500">
            <motion.h2
                className="text-center font-asgard font-extrabold text-3xl uppercase mb-12 tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                Discover Our <br /> Moments
            </motion.h2>

            {/* Marquee Scroll */}
            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={marqueeRef}
            >
                <motion.div className="flex gap-6 w-max" animate={marqueeControls}>
                    {[...images, ...images].map((src, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-80 h-96 rounded-lg overflow-hidden transition-transform duration-500 hover:rotate-3 hover:scale-105"
                        >
                            <img
                                src={src}
                                alt={`Moment ${idx + 1}`}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push(`/gallery`)}
                    className="mt-8 inline-flex font-asgard items-center"
                >
                    <span className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-primary dark:hover:bg-primary transition-all duration-300">
                        VIEW ALL PICS
                    </span>
                    <span className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary transition-all duration-300 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5" />
                    </span>
                </motion.button>
            </div>
        </section>
    );
}
