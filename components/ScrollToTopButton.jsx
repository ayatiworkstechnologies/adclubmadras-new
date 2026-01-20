"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopWithLoader() {
    const [showButton, setShowButton] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [loading, setLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    // Handle scroll with memoization for better performance
    const handleScroll = useCallback(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        setScrollPercent(parseFloat(scrolled.toFixed(2)));
        setShowButton(scrollTop > 100);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Loader UI
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Scroll-to-top button
    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-6 right-6 z-50 cursor-pointer focus:outline-none"
                    style={{ width: "50px", height: "50px" }}
                >
                    <svg
                        className="transform -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            stroke="#d1d5db"
                            strokeWidth="2"
                            fill="none"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            stroke="#facc15"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="100"
                            strokeDashoffset={100 - scrollPercent}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-primary">
                        <FaArrowUp className="text-lg" />
                    </div>
                </button>
            )}
        </>
    );
}
