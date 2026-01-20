"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import AboutBanner from "@/components/pages/About/AboutBanner";
import AboutCircle from "@/components/pages/About/AboutCircle";
import AboutTimeLine from "@/components/pages/About/AboutTimeLine";
import TimelineComponent from "@/components/pages/About/ExecutiveTimeline";
import PastPresidentsGrid from "@/components/pages/About/PastPresidentsGrid";
import FacilitiesSection from "@/components/pages/About/FacilitiesSection";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const tabs = [
    { id: "about", label: "About" },
    { id: "past", label: "Past Presidents" },
    { id: "executive", label: "Executive Committee" },
    { id: "facilities", label: "Our Facilities" },
];

const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function AboutPageContent() {
    const [activeTab, setActiveTab] = useState("about");
    const { darkMode } = useTheme();
    const sectionBg = darkMode ? "bg-black text-white" : "bg-white text-black";

    return (
        <section
            className={`relative min-h-screen px-4 sm:px-6 md:px-20 py-24 transition-colors duration-500 overflow-hidden ${sectionBg}`}
        >
            <div className="container mx-auto">
                {/* 🔘 Tabs */}
                <div
                    className="flex flex-wrap justify-center gap-8 mb-10 text-base font-asgard font-medium"
                    role="tablist"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative w-40 h-16 flex items-center justify-center text-center rounded-lg overflow-hidden transition-all duration-300"
                        >
                            {/* 🌀 Lottie animation only for active tab */}
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 z-0 scale-110 pointer-events-none">
                                    <DotLottieReact
                                        src="/circleanime.lottie"
                                        loop
                                        autoplay
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            )}

                            <span
                                className={`relative z-10 px-4 py-2 transition-all duration-300 ${activeTab === tab.id
                                        ? "text-primary font-bold scale-105"
                                        : "text-white hover:text-primary"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 🔘 Tab Content */}
                <div className="max-w-6xl mx-auto text-center px-2 sm:px-4 md:px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "about" && (
                            <motion.div
                                key="about"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeVariants}
                            >
                                <h2 className="text-xl sm:text-2xl uppercase font-bold font-asgard mb-4">
                                    About
                                </h2>
                                <AboutBanner />
                                <AboutCircle />
                                <AboutTimeLine />
                            </motion.div>
                        )}

                        {activeTab === "past" && (
                            <motion.div
                                key="past"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeVariants}
                            >
                                <h2 className="text-xl sm:text-2xl uppercase font-bold font-asgard mb-4">
                                    Past Presidents
                                </h2>
                                <PastPresidentsGrid />
                            </motion.div>
                        )}

                        {activeTab === "executive" && (
                            <motion.div
                                key="executive"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeVariants}
                            >
                                <h2 className="text-xl sm:text-2xl uppercase font-bold font-asgard mb-4">
                                    Executive Committee
                                </h2>
                                <TimelineComponent />
                            </motion.div>
                        )}

                        {activeTab === "facilities" && (
                            <motion.div
                                key="facilities"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeVariants}
                            >
                                <h2 className="text-xl sm:text-2xl uppercase font-bold font-asgard mb-4">
                                    Our Facilities
                                </h2>
                                <FacilitiesSection />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
