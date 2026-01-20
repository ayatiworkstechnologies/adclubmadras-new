"use client";

// src/components/FacilitiesSection.jsx
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import {
  Briefcase,
  Users,
  ClipboardList,
  Presentation,
  FileText,
  UsersRound,
  Mic,
  Sliders,
} from "lucide-react";
import { motion } from "framer-motion";

const events = [
  { icon: <Users className="w-6 h-6 text-white" />, label: "BRIEFING SESSIONS" },
  { icon: <Briefcase className="w-6 h-6 text-white" />, label: "BUSINESS PITCHES" },
  { icon: <ClipboardList className="w-6 h-6 text-white" />, label: "CLIENT MEETINGS" },
  { icon: <FileText className="w-6 h-6 text-white" />, label: "FORUMS" },
  { icon: <Presentation className="w-6 h-6 text-white" />, label: "PRESENTATIONS" },
  { icon: <UsersRound className="w-6 h-6 text-white" />, label: "SALES MEETS" },
  { icon: <Mic className="w-6 h-6 text-white " />, label: "SEMINARS" },
  { icon: <Sliders className="w-6 h-6 text-white" />, label: "WORKSHOPS AND MORE" },
];

const FacilitiesSection = () => {
  return (
    <div className="bg-black text-white min-h-screen p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl font-semibold uppercase text-center font-asgard leading-snug"
        >
          Workshops, Seminars, Client Meetings, Sales Meets, Presentations,
          Discussions, FORUMS, Briefing Sessions, Business Pitches
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base font-glancyr text-white"
        >
          Planning an event ? Having hosted numerous events, we are best equipped
          to meet your needs and conduct an exclusive space for you — an
          air-conditioned Classroom facility — to replicate that school
          experience. This ultra-modern facility has chairs, books and reference
          journals with board, screen and marker pens.
        </motion.p>

        {/* Event Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black text-white"
        >
          <h2 className="text-lg text-left sm:text-xl md:text-2xl font-asgard font-semibold mb-6">
            The Classroom is ideal for events like:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-black rounded-md p-5 flex flex-col items-start space-y-3 shadow-md"
              >
                {event.icon}
                <p className="font-bold uppercase text-sm font-asgard">
                  {event.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tariff Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-primary text-left font-semibold font-asgard text-sm mb-2">
            Tariff:
          </h2>
          <div className="overflow-x-auto border-4 border-primary rounded">
            <table className="w-full  text-left text-sm md:text-base border-collapse">
              <thead>
                <tr className="border-b border-white">
                  <th className="px-4 py-3 border-r border-white w-1/2 text-left">
                    Room Rent
                  </th>
                  <th className="px-4 py-3 border-r border-white w-1/4 text-left">
                    Member (Basic Rs.)
                  </th>
                  <th className="px-4 py-3 w-1/4 text-left">
                    Non Member (Basic Rs.)
                  </th>
                </tr>
                <tr className="border-b border-white">
                  <td colSpan={3} className="px-4 py-2 font-semibold border-r border-white">
                    Full Day (09.30 am to 05.30 pm)
                  </td>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monday-Friday", "3,250", "4,250"],
                  ["Saturday", "3,750", "4,750"],
                  ["Sunday & Public Holiday", "4,250", "5,250"],
                  ["Projector Charges", "750", "1,250"],
                ].map(([day, member, nonMember], idx) => (
                  <tr key={idx} className="">
                    <td className="px-4 py-2 border-r border-white">{day}</td>
                    <td className="px-4 py-2 border-r border-white">{member}</td>
                    <td className="px-4 py-2">{nonMember}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-primary text-black text-2xl font-bold p-4 w-full rounded-md overflow-hidden"
        >
          <div className="animate-marquee font-glancyr whitespace-nowrap">
            For Half a Day, 60% of the above rent will be charged | GST @ 18% will be extra.{' '} {" "} For Half a Day, 60% of the above rent will be charged | GST @ 18% will be extra.
          </div>
        </motion.div>

        {/* Terms and Contact */}
        <div className="space-y-6 text-sm text-left">
          <div>
            <h2 className="font-semibold text-lg mb-2">Terms and conditions:</h2>
            <ul className="list-disc list-inside  font-glancyr space-y-1">
              <li>Alcohol is prohibited inside the premises</li>
              <li>Payment should be made in advance while booking</li>
            </ul>
          </div>

          <div>
            For more details contact:
            <span className="ml-1  font-glancyr">
              <a href="mailto:admin@adclubmadras.com">admin@adclubmadras.com</a> /
              <a
                href="mailto:advertisingclubmadras@gmail.com"
                className="ml-1 border-b-2 font-glancyr border-primary"
              >
                advertisingclubmadras@gmail.com
              </a>
              {" or"}
            </span>
          </div>

          <div className="bg-primary max-w-xl text-bold  font-glancyr text-base text-black p-3 rounded-md flex items-center gap-2">
            <FiPhoneCall className="text-black w-8 h-8" />
            <span>Call Advertising Club Madras: 8248717152, 044-42694778</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;

// CSS (tailwind.config.css or global.css)
// Add this animation manually if using custom Tailwind theme:
/*
@keyframes marquee {
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee 15s linear infinite;
}
*/
