"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true); // default: dark mode

    // Optional: persist theme to localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setDarkMode(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {/* dark class applied conditionally for Tailwind */}
            <div className={darkMode ? "dark" : ""}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

// Hook to use theme in any component
export const useTheme = () => useContext(ThemeContext);
