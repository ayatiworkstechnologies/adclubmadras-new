"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import Swal from "sweetalert2";
import { getUserDetails } from "@/lib/api";

export default function Navbar() {
    const { darkMode } = useTheme();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Scroll blur effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Check login status
    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated") === "true";
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (auth && storedUser) {
            setUser(storedUser);
        } else {
            setUser(null);
        }
    }, [pathname]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Logout",
        });

        if (result.isConfirmed) {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            closeMenu();

            Swal.fire("Logged Out", "You have been logged out successfully.", "success").then(() => {
                window.location.href = "/";
            });
        }
    };

    // 🔥 Active highlight styles for NavLink
    const navLinkClass = (href) => {
        const isActive = pathname === href;
        return [
            "font-semibold transition duration-200",
            "px-3 py-1.5 rounded-md",
            isActive
                ? "text-primary font-asgard"
                : "hover:text-primary hover:bg-white/5",
        ].join(" ");
    };

    return (
        <>
            {/* ===== Header ===== */}
            <header
                className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between p-2 px-6 md:px-12 transition-colors duration-500 ${scrolled ? "backdrop-blur bg-black/80 shadow-md" : "bg-black"
                    } ${darkMode ? "text-white" : "text-white"}`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/Adclub_new.png" alt="Logo" width={200} height={20} className="h-20 w-auto" />
                </Link>

                {/* ===== Desktop nav ===== */}
                <nav className="hidden md:flex gap-10 text-sm uppercase font-medium items-center">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/about-us" className={navLinkClass("/about-us")}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            {/* External link can't be "active" via router */}
                            <a
                                href="https://pgda.adclubmadras.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold px-3 py-1.5 rounded-md hover:text-primary hover:bg-white/5 transition duration-200"
                            >
                                Courses
                            </a>
                        </li>
                        <li>
                            <Link href="/membership" className={navLinkClass("/membership")}>
                                Membership
                            </Link>
                        </li>
                    </ul>

                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/events" className={navLinkClass("/events")}>
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className={navLinkClass("/gallery")}>
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/career" className={navLinkClass("/career")}>
                                Career
                            </Link>
                        </li>
                    </ul>

                    <div className="flex flex-col gap-2 ml-4">
                        <Link href="/contact" className={navLinkClass("/contact")}>
                            Contact
                        </Link>
                        <Link href="/press-release" className={navLinkClass("/press-release")}>
                            Press Release
                        </Link>
                    </div>

                    {user ? (
                        <div className="relative group ml-4">
                            <button className="font-bold text-primary font-primary focus:outline-none">
                                {user.firstName || "Member"}
                            </button>

                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="invisible group-hover:visible group-hover:opacity-100 absolute right-0 mt-3 w-44 bg-white text-black rounded-md shadow-lg opacity-0 transition-all duration-300 z-50"
                            >
                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="block w-full px-4 py-2 hover:bg-primary hover:text-white font-primary transition"
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white font-primary transition"
                                >
                                    Logout
                                </button>
                            </motion.div>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className={["ml-4 text-primary font-primary font-bold", "px-3 py-1.5 rounded-md hover:bg-white/5"].join(" ")}
                        >
                            Members Login
                        </Link>
                    )}
                </nav>

                {/* ===== Hamburger ===== */}
                <button className="md:hidden z-50" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* ===== Mobile Drawer ===== */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isMenuOpen ? 0 : "100%" }}
                transition={{ type: "tween", duration: 0.35 }}
                className={`fixed top-0 right-0 h-full w-64 sm:w-72 p-8 z-40 flex flex-col gap-6 text-sm uppercase font-medium shadow-2xl transition-colors ${darkMode ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >
                <button className="self-end mb-4" onClick={closeMenu} aria-label="Close menu">
                    <X className="w-6 h-6" />
                </button>

                <Link href="/about-us" onClick={closeMenu} className={navLinkClass("/about-us")}>
                    About Us
                </Link>
                <a
                    href="https://pgda.adclubmadras.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold px-3 py-1.5 rounded-md hover:text-primary hover:bg-white/5 transition duration-200"
                >
                    Courses
                </a>
                <Link href="/membership" onClick={closeMenu} className={navLinkClass("/membership")}>
                    Membership
                </Link>
                <Link href="/events" onClick={closeMenu} className={navLinkClass("/events")}>
                    Events
                </Link>
                <Link href="/gallery" onClick={closeMenu} className={navLinkClass("/gallery")}>
                    Gallery
                </Link>
                <Link href="/career" onClick={closeMenu} className={navLinkClass("/career")}>
                    Career
                </Link>
                <Link href="/contact" onClick={closeMenu} className={navLinkClass("/contact")}>
                    Contact
                </Link>
                <Link href="/press-release" onClick={closeMenu} className={navLinkClass("/press-release")}>
                    Press Release
                </Link>

                {user ? (
                    <>
                        <p className="font-bold font-primary text-primary"> {user.firstName || "Member"} </p>
                        <Link href="/profile" onClick={closeMenu} className={navLinkClass("/profile")}>
                            My Profile
                        </Link>
                        <button onClick={handleLogout} className="text-primary font-primary font-bold hover:underline">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className={["font-bold font-primary text-primary", "px-3 py-1.5 rounded-md hover:bg-white/5"].join(" ")}
                    >
                        Members Login
                    </Link>
                )}
            </motion.div>

            {/* ===== Backdrop ===== */}
            {isMenuOpen && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30" />
            )}
        </>
    );
}
