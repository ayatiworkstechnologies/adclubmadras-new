"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import committeeData from "@/data/ExecutiveCommittee"; // Ensure correct path

const ExecutiveCommittee = () => {
  const years = Object.keys(committeeData).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [startIndex, setStartIndex] = useState(0);

  const visibleYears = years.slice(startIndex, startIndex + 6);

  const scrollUp = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const scrollDown = () => {
    if (startIndex + 6 < years.length) setStartIndex(startIndex + 1);
  };

 const Box = ({ title, content, wide = false, cols = 3 }) => {
  const isArray = Array.isArray(content);
  const items = isArray ? content : [content];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-primary rounded-md p-4 text-black shadow-md ${
        wide ? "w-full" : ""
      }`}
    >
      <h4 className="uppercase font-bold text-left font-asgard text-sm">{title}</h4>

      <div
        className={`mt-2 font-medium text-left font-glancyr ${
          items.length > 1
            ? `grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols}`
            : "text-white"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`${
              items.length > 1
                ? "bg-opacity-10 text-white text-left px-2 py-1 rounded hover:bg-opacity-20 transition"
                : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
};


  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h2 className="text-2xl sm:text-3xl  font-asgard font-bold text-center mb-2">
        Executive Committee Members
      </h2>
      <h3 className="text-3xl sm:text-2xl  font-glancyr text-primary font-bold text-center mb-10">
        {selectedYear}
      </h3>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Timeline */}
        <div className="md:w-1/6 w-full flex flex-col items-center relative">
          <button
            onClick={scrollUp}
            disabled={startIndex === 0}
            className={`mb-4 z-10 flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              startIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "text-primary hover:text-white"
            }`}
          >
            <ChevronUp size={24} />
          </button>

          <div
            className="flex flex-col items-center space-y-6  "
            style={{ maxHeight: "320px", width: "100%" }}
          >
            {visibleYears.map((year) => (
              <div
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`relative z-10 transition-all duration-300 cursor-pointer flex justify-center items-center w-full px-2`}
              >
                <p
                  className={`font-semibold transition-all duration-300 text-center w-full py-1 rounded-md ${
                    year === selectedYear
                      ? "text-primary text-lg scale-110 bg-primary bg-opacity-10"
                      : "text-white text-sm"
                  }`}
                >
                  {year}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollDown}
            disabled={startIndex + 6 >= years.length}
            className={`mt-4 z-10 flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              startIndex + 6 >= years.length
                ? "opacity-30 cursor-not-allowed"
                : "text-primary hover:text-white"
            }`}
          >
            <ChevronDown size={24} />
          </button>
        </div>

        {/* Committee Info */}
        <div className="md:w-5/6 flex flex-col gap-5">
          {/* Top roles grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <Box
              title="President"
              content={committeeData[selectedYear].president}
            />
            <Box
              title="Vice President"
              content={committeeData[selectedYear].vicePresident}
            />
            <Box
              title="Secretary"
              content={committeeData[selectedYear].secretary}
            />
            <Box
              title="Treasurer"
              content={committeeData[selectedYear].treasurer}
            />
            <Box
              title="Jt.Secretary"
              content={committeeData[selectedYear].jtSecretary}
            />
          </div>

          {/* Executive Committee Members */}
          <Box
            title="Executive Committee Members"
            content={committeeData[selectedYear].members}
            wide
            cols={4}
          />

          {/* Ex Officio */}
          <div className="flex justify-start">
            <div className="w-full sm:w-1/2">
              <Box
                title="Ex Officio"
                content={committeeData[selectedYear].exOfficio}
              />
            </div>
          </div>

          {/* Co-Opted */}
          <Box
            title="Co-Opted"
            content={committeeData[selectedYear].coopted}
            wide
            cols={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommittee;

