"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getEvents } from "@/lib/api";
import dayjs from "dayjs";

export default function AllEvents() {
  const [openIndex, setOpenIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        const formatted = data.map((event) => {
          const dateObj = dayjs(event.eventDate);
          return {
            ...event,
            day: dateObj.format("ddd"),
            date: dateObj.format("DD"),
            month: dateObj.format("MMM"),
            year: dateObj.format("YYYY"),
            fullDate: dateObj.format("DD MMMM YYYY"),
            time: event.eventTime
              ? dayjs().startOf("day").add(event.eventTime, "second").format("hh:mm A")
              : "NA",
            title: event.eventTitle,
            description: event.eventDescription?.replace(/<[^>]+>/g, ""),
            tag: event.entryType || "FREE",
            venue: event.eventVenue || "TBA",
            poster: event.eventPoster,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-white text-center py-10">Loading Events...</div>;

  return (
    <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {events.map((event, i) => (
          <div
            key={i}
            className="group border-b border-dashed border-gray-700 pb-6"
          >
            {/* Top Summary Section */}
            <div className="flex flex-col sm:grid sm:grid-cols-11 gap-4 p-4 rounded-md transition-shadow duration-300 group-hover:shadow-lg">
              {/* Date Box */}
              <div className="w-full sm:col-span-1 h-20 flex flex-col items-center justify-center rounded font-bold text-xs bg-white text-black group-hover:bg-primary transition-colors duration-300">
                <span className="uppercase">{event.day}</span>
                <span className="border-t border-black w-10 py-1" />
                <span className="text-xl font-black leading-none">
                  {event.date}
                </span>
                <span className="text-[10px] font-bold uppercase">
                  {event.month} {event.year}
                </span>
              </div>

              {/* Title */}
              <p className="sm:col-span-6 text-sm sm:text-base lg:text-lg p-3 font-semibold font-glancyr break-words">
                {event.title}
              </p>

              {/* Tag */}
              <span className="sm:col-span-2 text-[10px] sm:text-sm uppercase font-glancyr border border-white px-3 py-1 rounded-full w-fit h-fit">
                {event.tag}
              </span>

              {/* CTA */}
              <div className="sm:col-span-2 flex sm:justify-end">
                <button
                  onClick={() => toggleAccordion(i)}
                  className="relative w-10 h-10 rounded-full bg-primary overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:w-28"
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${openIndex === i ? "opacity-100" : "group-hover:opacity-0"
                      }`}
                  >
                    {openIndex === i ? (
                      <ChevronDown className="w-4 h-4 text-black" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${openIndex === i
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                      } transition-opacity duration-300`}
                  >
                    <span className="text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                      View Details
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Accordion Content */}
            {openIndex === i && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 px-2 sm:px-4 text-sm sm:text-base">
                {/* Info Grid */}
                <div className="sm:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Date", value: event.fullDate },
                      { label: "Time", value: event.time },
                      { label: "Venue", value: event.venue },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-primary rounded-xl p-4 shadow-md"
                      >
                        <div className="font-bold text-black text-xs mb-1">
                          {label}:
                        </div>
                        <div className="text-white text-sm break-words">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-gray-400 pt-2">Terms &amp; Conditions:</div>

                  <div>
                    <span className="text-lg sm:text-xl font-asgard font-semibold uppercase inline-block mb-5">
                      Description:
                    </span>
                    <p className="text-white font-glancyr whitespace-pre-line break-words">
                      {event.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 inline-flex items-center font-asgard"
                  >
                    <span className="px-5 py-3 bg-white text-black rounded-full font-bold hover:bg-primary hover:text-black transition-colors duration-300">
                      Register Now
                    </span>
                    <span className="px-4 py-3 bg-white text-black rounded-full hover:bg-primary hover:text-black transition-colors duration-300 flex items-center">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </div>

                {/* Poster Image */}
                <div className="sm:col-span-1 flex justify-center sm:justify-start">
                  <Image
                    src={event.poster}
                    alt="Event Poster"
                    width={240}
                    height={360}
                    className="w-60 h-auto rounded border border-primary object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

