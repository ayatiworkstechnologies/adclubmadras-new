"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function JoinUsSection() {
    const router = useRouter();
    const { darkMode } = useTheme();
    const backgroundImage = "/assets/Pencil-right.svg";

    return (
        <section className="bg-white dark:bg-black text-black dark:text-white sm:py-20 py-10">
            <div
                className="relative bg-white dark:bg-black text-black dark:text-white py-16 px-4 h-screen sm:px-6 md:px-10 lg:px-16 bg-no-repeat bg-right duration-500"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundSize: "80% 100%",
                }}
            >
                {/* Scroll Animation Wrapper */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="max-w-2xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-primary text-3xl md:text-4xl font-asgard font-extrabold uppercase mb-6 tracking-wide">
                        Join Us Today
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-xl font-glancyr uppercase leading-relaxed font-light mb-10 px-4 md:px-12 text-center sm:text-center">
                        Join a vibrant community of advertising{" "}
                        <br className="hidden sm:block" />
                        professionals, storytellers, and creative minds.{" "}
                        <br className="hidden sm:block" />
                        Whether you're looking to network, learn, or{" "}
                        <br className="hidden sm:block" />
                        showcase your talent, the Advertising Club Madras welcomes you.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push(`/contact`)}
                        className="mt-8 inline-flex font-asgard items-center"
                    >
                        <span className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-primary dark:hover:bg-primary transition-all duration-300">
                            JOIN US TODAY
                        </span>
                        <span className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary transition-all duration-300 flex items-center justify-center">
                            <ArrowRight className="h-5 w-5" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
