"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Top Left Blob */}
            <motion.div
                className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 opacity-30 blur-2xl"
                animate={{ x: [0, 100, 0], y: [0, 100, 0], rotate: [0, 360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Bottom Right Blob */}
            <motion.div
                className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-600 opacity-30 blur-3xl"
                animate={{ x: [0, -100, 0], y: [0, -100, 0], rotate: [0, -360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
