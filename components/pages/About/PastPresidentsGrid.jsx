"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getPastPresidents } from "@/lib/api";

const profileCircle = "/assets/circle-profile.svg";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const PastPresidentsGrid = () => {
  const [pastPresidents, setPastPresidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const presidentsData = await getPastPresidents();

        // Sort by starting year in descending order
        const sortedData = presidentsData.sort((a, b) => {
          const startYearA = parseInt(a.yearRange.split("–")[0].trim());
          const startYearB = parseInt(b.yearRange.split("–")[0].trim());
          return startYearB - startYearA; // Descending
        });

        setPastPresidents(sortedData);
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dark:bg-black dark:text-white bg-white text-black min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pastPresidents.map((person, idx) => (
          <motion.div
            key={person.id}
            className="dark:bg-black dark:text-white bg-white text-black rounded-xl border-2 border-primary shadow-md overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={idx}
          >
            <div className="flex justify-center m-5 relative">
              <Image
                src={profileCircle}
                alt="circle"
                width={112}
                height={96}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-24 z-0"
              />
              <Image
                src={person.presidentsImage}
                alt={person.presidentName}
                width={100}
                height={100}
                className="w-25 h-25 object-cover rounded-full relative z-10 shadow-xl"
              />
            </div>
            <div className="text-center bg-primary px-4 py-3">
              <h3 className="text-lg font-semibold font-glancyr text-black">{person.presidentName}</h3>
              <p className="text-sm font-semibold font-glancyr text-black">{person.yearRange}</p>
            </div>
            <hr className="border-t-4 border-dashed border-black/30 bg-primary" />
            <div className="bg-primary font-glancyr text-black text-sm font-semibold text-center py-3 px-3">
              {person.companyName}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PastPresidentsGrid;

