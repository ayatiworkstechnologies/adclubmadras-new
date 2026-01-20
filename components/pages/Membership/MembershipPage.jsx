"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";

export default function MembershipPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white pt-28 px-4 mt-10 md:px-12 pb-12 font-glancyr"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <motion.aside className="md:col-span-1 space-y-8" variants={fadeUp}>
          <h2 className="text-4xl font-bold text-primary uppercase font-asgard">
            Ad Club's Membership
          </h2>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={() =>
              router.push(isAuthenticated ? "/membership-application" : "/login")
            }
            className="flex items-center group w-fit"
          >
            <span className="px-4 py-3 text-base bg-primary text-black rounded-full font-bold font-asgard group-hover:bg-white group-hover:text-black transition duration-300">
              New / Renew Membership
            </span>
            <span className="px-4 py-3 bg-primary text-black rounded-full group-hover:bg-white group-hover:text-black transition duration-300 flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </span>
          </motion.button>

          {/* Downloads */}
          <div className="bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">
              Offline Application
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                <a
                  href="/assets/Membership-Form-2024-25.pdf"
                  download
                  className="hover:underline text-sm text-primary"
                >
                  Application for Membership
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                <a
                  href="/assets/Membership-Renewal-Form-2024-2025.pdf"
                  download
                  className="hover:underline text-sm text-primary"
                >
                  Application for Membership Renewal
                </a>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main className="md:col-span-2 space-y-10" variants={fadeUp}>
          <motion.p
            className="text-base sm:text-lg leading-relaxed"
            variants={fadeUp}
          >
            The <strong className="text-primary">Ad Club’s 1000+</strong>{" "}
            members represent all segments of the industry – clients, agencies,
            production companies and the media. Membership is open to
            individuals, businesses, and students.
          </motion.p>

          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold mb-3 text-primary font-asgard">
              Why you should be a Member of the Ad Club Madras?
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                Exchange ideas and network with advertising, media and
                related-industry professionals
              </li>
              <li>
                Hone creative and business skills at workshops & seminars by
                leading experts
              </li>
              <li>
                Gain exposure to top speakers from advertising, media,
                communications, PR, and more
              </li>
              <li>
                <strong className="text-primary">FREE</strong> or discounted
                entry to Ad Club events and seminars
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold mb-3 text-primary font-asgard">
              Annual Membership Fee (From April to March):
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-gray-300">
              <li>Rs. 5000/- + 18% GST = Rs. 5900/- for Corporates</li>
              <li>Rs. 2000/- + 18% GST = Rs. 2360/- for Individuals</li>
              <li>Rs. 1000/- + 18% GST = Rs. 1180/- for Students</li>
            </ul>
          </motion.div>
        </motion.main>
      </div>
    </motion.div>
  );
}
