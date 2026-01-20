"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["ABOUT", "PAST PRESIDENTS", "EXECUTIVE COMITEE", "OUR FACILITIES"];

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState("ABOUT");

  return (
    <div className="flex justify-center space-x-4 py-10 bg-black">
      {tabs.map((tab) => (
        <div key={tab} className="relative">
          <button
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded border text-sm font-semibold transition-all
              ${
                activeTab === tab
                  ? "bg-primary text-black border-primary"
                  : "bg-black text-primary border-white hover:bg-primary hover:text-black"
              }
            `}
          >
            {/* Animated Circle (Framer Motion) */}
            {activeTab === tab && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded z-0"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {/* Scribble / Outline effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-black rounded-full pointer-events-none"
                  animate={{ scale: [1.05, 1, 1.05], rotate: [0, 3, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
            <span className="relative z-10">{tab}</span>
          </button>

          {/* Yellow Triangle Below */}
          {activeTab === tab && (
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
          )}
        </div>
      ))}
    </div>
  );
}

