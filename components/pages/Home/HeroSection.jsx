"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const { darkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section
            className={`relative min-h-screen overflow-hidden md:px-8 py-5 sm:py-16 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-black text-white"
                }`}
        >
            <div
                className="relative z-10 sm:pt-32 pt-10 text-left overflow-hidden max-w-6xl mx-auto"
                style={{
                    backgroundImage: `url(/assets/hero-fream.svg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginTop: "40px",
                }}
            >
                <div className="relative flex flex-col md:flex-row justify-start items-start">
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-7xl px-4 font-asgard uppercase leading-tight tracking-tight"
                        initial={{ y: 80, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        A Legacy <br />
                        of <span className="text-primary">Innovation</span> <br />
                        in Advertising
                    </motion.h1>

                    <motion.p
                        className={`md:absolute text-xs font-glancyr px-4 md:text-sm mt-8 md:mt-0 md:ml-10 max-w-md justify-end leading-relaxed tracking-tight ${isMounted && typeof window !== 'undefined' && window.innerWidth >= 768 ? 'md:ml-[500px]' : ''
                            }`}
                        initial={{ x: 80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        For over six decades, The Advertising Club Madras has been at the
                        heart of India's advertising industry — fostering creativity,
                        collaboration, and professional growth.
                    </motion.p>
                </div>

                {/* Maddy Image and Overlay Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative w-full max-w-4xl mx-auto mt-12"
                >
                    <div className="relative w-full px-5">
                        {/* Maddy Image */}
                        <Image
                            src="/maddys-25.jpg"
                            alt="Maddy 2025"
                            width={1200}
                            height={600}
                            className="rounded-md shadow-lg w-full object-cover"
                        />

                        {/* Left Bottom Overlay: Text + Button */}
                        <div className="absolute bottom-6 left-6 sm:left-10 text-left z-20">
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase mb-3 font-glancyr text-black drop-shadow-lg">
                                MADDYS 2025
                            </h2>
                            <button
                                onClick={() =>
                                    window.open("https://maddys2025.adclubmadras.com/", "_blank")
                                }
                                className="bg-primary/80 text-black px-6 py-2 font-asgard sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase hover:bg-primary transition-all duration-300"
                            >
                                Explore More
                            </button>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute -top-10 -right-7 md:-top-12 md:-right-12 w-28 h-28 md:w-32 md:h-32">
                            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-black">
                                <div className="absolute w-full h-full animate-spin-slow">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <defs>
                                            <path
                                                id="circlePath"
                                                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                                            />
                                        </defs>
                                        <text
                                            fill="white"
                                            fontSize="7"
                                            fontWeight="bold"
                                            letterSpacing="2"
                                        >
                                            <textPath href="#circlePath">
                                                • SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                                <svg
                                    className="w-6 h-6 md:w-8 md:h-8 text-primary z-10"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m0 0l-6-6m6 6l6-6"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
