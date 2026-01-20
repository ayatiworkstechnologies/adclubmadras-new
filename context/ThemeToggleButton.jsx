"use client";

import { useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggleButton() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-20 right-4 sm:top-30 sm:right-5 md:top-40 md:right-5 p-2 bg-gray-800 dark:bg-yellow-300 rounded-full shadow-lg transition-colors z-50"
            title="Toggle Theme"
        >
            {darkMode ? (
                <SunIcon className="h-6 w-6 text-white dark:text-black" />
            ) : (
                <MoonIcon className="h-6 w-6 text-black" />
            )}
        </button>
    );
}
