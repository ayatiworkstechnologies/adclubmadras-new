"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "@/context/ThemeContext";

export default function CommunityBanner() {
    const { darkMode } = useTheme();

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-out",
        });
    }, []);

    const backgroundImage = "/assets/Pencil-left.svg";

    return (
        <section
            className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center px-4 py-16 sm:py-10 md:py-14 lg:py-22 ${darkMode ? "bg-black" : "bg-white"
                }`}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundSize: "contain",
                }}
            />

            {/* Overlay only for dark mode */}
            {darkMode && (
                <div className="absolute inset-0 bg-black opacity-40 z-10" />
            )}

            {/* Text Content */}
            <div
                className="relative z-20 sm:-mt-[150px]"
                data-aos="fade-up"
            >
                <h1 className="uppercase font-black font-asgard tracking-tight leading-tight text-primary space-y-2">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">A</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Community</div>
                    <div className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Built On</div>
                    <div className="text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Collabor</div>
                    <div className=" text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">ation &</div>
                    <div className="text-black dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Growth</div>
                </h1>
            </div>
        </section>
    );
}
