"use client";

import React from "react";

export default function WhyJoinUsBanner() {
    const texts = Array(10)
        .fill([
            "✦ WHY JOIN US ✦",
            "✦ AD CLUB MADRAS ✦",
            "✦ MEMBER OF CLUB ✦",
        ])
        .flat();

    return (
        <div className="w-full bg-white dark:bg-black overflow-hidden">
            <div className="relative overflow-hidden">
                <div className="marquee-container">
                    <div className="marquee-content">
                        {texts.map((text, index) => (
                            <span
                                key={index}
                                className="bg-primary text-black rounded-full text-xl md:text-3xl font-asgard px-6 py-2 whitespace-nowrap"
                            >
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
