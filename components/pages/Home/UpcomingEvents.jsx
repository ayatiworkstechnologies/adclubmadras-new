"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getUpcommingEvents, getEventsCategory } from "@/lib/api";

export default function UpcomingEvents() {
    const router = useRouter();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, categoryRes] = await Promise.all([
                    getUpcommingEvents(),
                    getEventsCategory(),
                ]);

                const categoryMap = {};
                (categoryRes || []).forEach((cat) => {
                    categoryMap[cat.id] = cat.categoryName;
                });

                const transformed = (eventRes || []).map((event) => {
                    const dateObj = new Date(event.eventDate);
                    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    const monthNames = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ];

                    return {
                        ...event,
                        title: event.eventTitle,
                        catname: categoryMap[event.eventCategoryID] || "General",
                        day: dayNames[dateObj.getDay()],
                        date: dateObj.getDate(),
                        month: monthNames[dateObj.getMonth()],
                        year: dateObj.getFullYear(),
                    };
                });

                setEvents(transformed);
            } catch (error) {
                console.error("Error fetching events or categories:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="relative bg-black min-h-screen text-white px-4 sm:px-6 md:px-12 py-16 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* 🔘 Title */}
                <motion.h2
                    className="text-center font-asgard font-extrabold text-xl sm:text-3xl uppercase mb-10 tracking-wider"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    Upcoming Events
                </motion.h2>

                {/* 🔘 Event Cards */}
                {events.map((event, i) => (
                    <motion.div
                        key={event.id}
                        className="group border-b border-dashed border-gray-700 pb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="grid grid-cols-9 sm:grid-cols-11 gap-4 p-4 rounded-md transition-shadow duration-300 group-hover:shadow-xl"
                        >
                            {/* 📅 Date Block */}
                            <div className="col-span-2 sm:col-span-1 h-20 flex flex-col items-center justify-center rounded font-bold text-xs bg-white text-black group-hover:bg-primary transition-colors duration-300">
                                <span className="uppercase">{event.day}</span>
                                <span className="border-t border-black w-10 py-1" />
                                <span className="text-xl font-black leading-none">
                                    {event.date}
                                </span>
                                <span className="text-[10px] font-bold uppercase">
                                    {event.month} {event.year}
                                </span>
                            </div>

                            {/* 📝 Title */}
                            <p className="col-span-4 sm:col-span-6 text-sm sm:text-base lg:text-lg font-semibold font-glancyr break-words flex items-center">
                                {event.title}
                            </p>

                            {/* 🏷️ Category */}
                            <span className="col-span-1 sm:col-span-2 text-[10px] sm:text-sm uppercase font-glancyr border border-white px-3 py-1 rounded-full w-fit h-fit flex items-center">
                                {event.catname}
                            </span>

                            {/* 🔘 View Details */}
                            <div className="col-span-3 sm:col-span-2 flex justify-center sm:justify-end items-center">
                                <motion.button
                                    onClick={() =>
                                        router.push(`/events/details?slug=${event.eventSlug || event.id}`)
                                    }
                                    className="relative w-10 h-10 rounded-full bg-primary overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:w-28"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                                        <ArrowRight className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                                            View Details
                                        </span>
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}

                {/* 🔘 View All Events */}
                <div className="text-center mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push(`/events`)}
                        className="mt-8 inline-flex font-asgard items-center group w-fit"
                    >
                        <span
                            className="px-6 py-3 group-hover:bg-primary text-sm sm:text-base md:text-lg lg:text-xl bg-black dark:bg-white text-white dark:text-black 
                        rounded-full font-bold group w-fit hover:bg-primary dark:hover:bg-primary transition-all duration-300"
                        >
                            VIEW ALL EVENTS
                        </span>
                        <span
                            className="px-4 py-3 group-hover:bg-primary bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary 
                transition-all duration-300 flex items-center justify-center"
                        >
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
