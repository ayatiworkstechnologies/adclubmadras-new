"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getEventsCategory, getEventsSlug } from "@/lib/api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export default function EventsPageContent() {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState("upcoming");

    const TABS_VISIBLE = 4;
    const [startIndex, setStartIndex] = useState(0);
    const router = useRouter();

    // --- Utils ---
    const formatTime = (seconds) => {
        if (seconds == null || isNaN(seconds)) return null;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const ampm = h >= 12 ? "PM" : "AM";
        const hh12 = ((h + 11) % 12) + 1;
        return `${hh12}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    const getDayMonthYear = (dateStr) => {
        if (!dateStr) return { day: "00", mon: "Mon", year: "0000", dow: "—" };
        const parts = dateStr.split("-");
        if (parts.length !== 3) return { day: "00", mon: "Mon", year: "0000", dow: "—" };
        const [y, m, d] = parts.map((p) => parseInt(p, 10));
        if (isNaN(y) || isNaN(m) || isNaN(d)) return { day: "00", mon: "Mon", year: "0000", dow: "—" };

        const date = new Date(y, m - 1, d);
        const mon = date.toLocaleString("default", { month: "short" });
        const dow = date.toLocaleString("default", { weekday: "short" });
        return {
            day: d.toString().padStart(2, "0"),
            mon,
            year: y.toString(),
            dow,
        };
    };

    // Precompute category map for quick lookup
    const categoryMap = useMemo(() => {
        const map = new Map();
        categories.forEach((c) => map.set(c.id, c.name));
        return map;
    }, [categories]);

    // --- Data loaders ---
    const loadEventsBySlug = async (categorySlug, id) => {
        try {
            const res = await getEventsSlug(categorySlug);
            const sortedEvents = res.sort(
                (a, b) => new Date(b.eventDate || "1970-01-01") - new Date(a.eventDate || "1970-01-01")
            );
            setEvents(sortedEvents);
            setActiveCategoryID(id);
        } catch (err) {
            console.error("Error loading events:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getEventsCategory();
                const formatted = categoriesData.map((cat) => ({
                    id: cat.id,
                    name: cat.categoryName,
                    categorySlug: cat.categorySlug,
                }));

                const defaultTabs = [
                    { id: "all", name: "All", categorySlug: "all" },
                    { id: "upcoming", name: "Upcoming", categorySlug: "upcoming" },
                ];

                const mergedTabs = [...defaultTabs, ...formatted];
                setCategories(mergedTabs);

                // initial load
                loadEventsBySlug("all", "all");
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };

        fetchData();
    }, []);

    const handlePrev = () => {
        setStartIndex((s) => Math.max(0, s - 1));
    };

    const handleNext = () => {
        setStartIndex((s) => (s + TABS_VISIBLE < categories.length ? s + 1 : s));
    };

    const visibleTabs = categories.slice(startIndex, startIndex + TABS_VISIBLE);

    return (
        <section className="relative bg-black min-h-screen text-white mt-20 px-4 sm:px-6 md:px-12 py-16 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* 🔘 Event Count */}
                <div className="flex justify-end text-xs sm:text-sm font-bold text-white tracking-wide">
                    Total Events: <span className="ml-2 text-primary">{events.length}</span>
                </div>

                {/* 🔘 Tabs */}
                <div className="flex justify-center items-center gap-8 mb-10 text-sm sm:text-base font-bold uppercase font-asgard">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className={`p-1 rounded ${startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"}`}
                        aria-label="Previous tabs"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                    </button>

                    <div className="flex gap-8 items-center">
                        {visibleTabs.map((cat, index) => (
                            <React.Fragment key={cat.id ?? `tab-${index}`}>
                                <div className="relative w-20 h-20 flex items-center justify-center">
                                    {activeCategoryID === cat.id && (
                                        <div className="absolute inset-0 scale-110">
                                            <DotLottieReact
                                                src="/circleanime.lottie"
                                                loop
                                                autoplay
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => loadEventsBySlug(cat.categorySlug, cat.id)}
                                        className={`relative z-10 px-4 py-2 text-xs sm:text-sm font-bold uppercase rounded-full transition duration-300 ${activeCategoryID === cat.id ? "text-primary" : "text-white hover:text-primary"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                </div>
                                {index !== visibleTabs.length - 1 && (
                                    <span className="text-primary select-none">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={startIndex + TABS_VISIBLE >= categories.length}
                        className={`p-1 rounded ${startIndex + TABS_VISIBLE >= categories.length ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"
                            }`}
                        aria-label="Next tabs"
                    >
                        <ChevronRight className="w-6 h-6 text-primary" />
                    </button>
                </div>

                {/* 🔘 Events List */}
                {events.map((event) => {
                    const { dow, mon, year, day } = getDayMonthYear(event.eventDate);
                    const startTime = formatTime(event.eventTime);
                    const endTime = formatTime(event.eventEndTime);

                    return (
                        <div key={event.id} className="border-b border-dashed border-gray-700 pb-6">
                            <div className="group flex flex-col sm:grid sm:grid-cols-11 gap-4 p-4 rounded-md hover:shadow-lg transition">
                                {/* Date */}
                                <div className="w-full sm:col-span-1 h-20 flex flex-col items-center justify-center rounded font-bold text-xs bg-white text-black group-hover:bg-primary transition-colors">
                                    <span className="uppercase">{dow || "—"}</span>
                                    <span className="border-t border-black w-10 py-1" />
                                    <span className="text-xl font-black leading-none">{day}</span>
                                    <span className="text-[10px] font-bold uppercase">
                                        {mon} {year}
                                    </span>
                                </div>

                                {/* Title & (optional) time */}
                                <div className="sm:col-span-6 p-3">
                                    <p className="text-sm sm:text-base lg:text-lg font-semibold font-glancyr break-words">
                                        {event.eventTitle}
                                    </p>
                                    {(startTime || endTime) && (
                                        <p className="mt-2 text-xs opacity-80">
                                            {startTime}
                                            {endTime ? ` – ${endTime}` : ""}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <span className="sm:col-span-2 text-[10px] sm:text-sm uppercase font-glancyr border border-white px-3 py-1 rounded-full w-fit h-fit self-center">
                                    {categoryMap.get(event.eventCategoryID) ?? "Unknown"}
                                </span>

                                {/* View Button */}
                                <div className="sm:col-span-2 flex sm:justify-end">
                                    <button
                                        onClick={() => router.push(`/events/details?slug=${event.eventSlug}`)}
                                        className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:w-28 transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 overflow-hidden"
                                        aria-label={`View details for ${event.eventTitle}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-black" />
                                        </div>
                                        <div className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                                                View Details
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
