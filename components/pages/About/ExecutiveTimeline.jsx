"use client";

import React, { useEffect, useState } from "react";
import { getExecutiveCommittee } from "@/lib/api"; // Adjust path to match your project

const ExecutiveCommittee = () => {
  const [committeeList, setCommitteeList] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExecutiveCommittee();
        const sortedData = data.sort((a, b) =>
          b.yearTitle.localeCompare(a.yearTitle)
        );
        setCommitteeList(sortedData);
        setSelectedCommittee(sortedData[0]);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load committee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const scrollDown = () => {
    if (startIndex + 6 < committeeList.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const visibleYears = committeeList.slice(startIndex, startIndex + 6);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h2 className="text-3xl font-asgard font-bold text-center mb-2">Executive Committee Members</h2>
      <h3 className="text-xl font-glancyr text-primary text-center font-bold mb-10">
        {selectedCommittee?.yearTitle}
      </h3>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Year Navigation */}
        <div className="md:w-1/6 w-full flex flex-col items-center relative">
          <button
            onClick={scrollUp}
            disabled={startIndex === 0}
            className={`mb-4 w-10 h-10 flex items-center justify-center rounded-full ${startIndex === 0 ? "opacity-30 cursor-not-allowed" : "text-primary hover:text-white"
              }`}
          >
            ▲
          </button>

          <div className="flex flex-col items-center space-y-4" style={{ maxHeight: "320px", width: "100%" }}>
            {visibleYears.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCommittee(item)}
                className="w-full text-center cursor-pointer px-2"
              >
                <p
                  className={`py-1 rounded transition ${selectedCommittee?.id === item.id
                    ? "text-primary bg-primary bg-opacity-10 font-bold"
                    : "text-white text-sm"
                    }`}
                >
                  {item.yearTitle.replace("Executive Committee Members ", "")}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollDown}
            disabled={startIndex + 6 >= committeeList.length}
            className={`mt-4 w-10 h-10 flex items-center justify-center rounded-full ${startIndex + 6 >= committeeList.length
              ? "opacity-30 cursor-not-allowed"
              : "text-primary hover:text-white"
              }`}
          >
            ▼
          </button>
        </div>

        {/* Main Description */}
        <div className="md:w-5/6 bg-primary text-black p-6 rounded shadow-md overflow-x-auto">
          <div
            className="prose max-w-none prose-sm sm:prose-base prose-h4:font-bold prose-table:border border-black"
            dangerouslySetInnerHTML={{ __html: selectedCommittee?.membersDescription }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommittee;

