"use client";

import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrolled / height) * 100;
            setScroll(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="bg-primary h-full transition-all duration-200"
                style={{ width: `${scroll}%` }}
            />
        </div>
    );
};

export default ScrollProgress;
