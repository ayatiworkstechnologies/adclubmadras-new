"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/* ---------------- Media Coverage (external links) ----------------
   ✅ Uses ONLY external links you provided.
   🧹 Dates are ISO (YYYY-MM-DD) for proper sorting; if unknown, leave "".
------------------------------------------------------------------ */
const MEDIA_COVERAGE = [
  { title: "The Advertising Club Madras elects Surej Salim as President, appoints Kavitha Srinivasan as Secretary for 2025–2026", source: "MN4U Bureau", date: "October 27, 2025", url: "https://www.medianews4u.com/the-advertising-club-madras-elects-surej-salim-as-president-appoints-kavitha-srinivasan-as-secretary-for-2025-2026/" },
  { title: "Surej Salim elected President of The Advertising Club Madras", source: "e4m Staff", date: "October 27, 2025", url: "https://www.exchange4media.com/advertising-news/surej-salim-elected-president-of-the-advertising-club-madras-148768.html" },
  { title: "Surej Salim elected as President of The Advertising Club Madras for 2025–26", source: "A Faqs", date: "Oct 27, 2025", url: "https://www.afaqs.com/people-spotting/surej-salim-elected-as-president-of-the-advertising-club-madras-for-202526-10597054" },
  { title: "Moves and Wins: Week of 27 October", source: "Campaign India", date: "27th October, 2025", url: "https://www.campaignindia.in/gallery/moves-and-wins-week-of-27-october/505460" },
  { title: "Surej Salim elected President of The Advertising Club Madras for 2025–2026", source: "Ad Gully", date: "October 26, 2025", url: "https://www.adgully.com/post/8290/surej-salim-elected-president-of-the-advertising-club-madras-for-20252026" },
  { title: "Surej Salim elected President of The Advertising Club Madras for 2025–2026", source: "Media Brief", date: "October 27, 2025", url: "https://mediabrief.com/surej-salim-elected-president-of-ad-club-madras-for-2025-2026/" },
  { title: "Surej Salim elected president of The Advertising Club Madras for 2025–2026", source: "Manifest Media Staff", date: "Oct 27, 2025", url: "https://www.manifest-media.in/advertising/271025/surej-salim-elected-president-of-the-advertising-club-madras-for-2025.html" },
  { title: "Advertising Club Madras names Surej Salim as President", source: "Social Samosa", date: "27th October, 2025", url: "https://www.socialsamosa.com/industry-updates/advertising-club-madras-surej-salim-president-10597495" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "AD Tech Today", date: "October 27, 2025", url: "https://adtechtoday.com/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Advertising Reporter", date: "Oct 27, 2025", url: "https://www.advertisingreporter.com/media/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim takes charge as president of The Advertising Club Madras for 2025–2026", source: "BestMediaInfo", date: "Oct 27, 2025", url: "https://bestmediainfo.com/mediainfo/advertising/surej-salim-takes-charge-as-president-of-the-advertising-club-madras-for-20252026-10597269" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Media Info Line", date: "Oct 27, 2025", url: "https://www.mediainfoline.com/movement/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Passionate In Marketing", date: "Oct 27, 2025", url: "https://www.passionateinmarketing.com/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim elected president of The Advertising Club Madras for 2025–2026", source: "Brande Quity", date: "Oct 27, 2025", url: "https://brandequity.economictimes.indiatimes.com/news/industry/surej-salim-elected-president-of-the-advertising-club-madras-for-20252026/124849881" },
  { title: "Surej Salim takes the helm at Ad Club Madras", source: "Production Mehmood", date: "27 Oct, 2025", url: "https://www.indiantelevision.com/mam/media-and-advertising/people/surej-salim-takes-the-helm-at-ad-club-madras-251027?amp" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "The 9th Estate", date: "28th October, 2025", url: "https://the9thestate.com/news/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Startup Business Stories", date: "28th October, 2025", url: "https://startupbusinessstories.com/news/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Right Column Media", date: "28th October, 2025", url: "https://rightcolumnmedia.com/news/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Quick Biz News", date: "28th October, 2025", url: "https://quickbiznews.com/news/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Online News9", date: "28th October, 2025", url: "https://onlinenews9.in/news/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Takes Charge As President Of The Advertising Club Madras", source: "Marketing Mind", date: "27th October, 2025", url: "https://marketingmind.in/surej-salim-takes-charge-as-president-of-the-advertising-club-madras/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Customer Engagement", date: "27th October, 2025", url: "https://customerengagement.net/surej-salim-elected-president-advertising-club-madras-2025/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "India Education Diary", date: "27th October, 2025", url: "https://indiaeducationdiary.in/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Express News", date: "28th October, 2025", url: "https://expressnews.asia/2025/10/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Pulse of India", date: "28th October, 2025", url: "https://pulseofindia.asia/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Chennai Mail", date: "28th October, 2025", url: "https://chennaimail.com/2025/10/28/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "TN Mirror News", date: "28th October, 2025", url: "https://tnmirrornews.com/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Pore Murasu TV", date: "28th October, 2025", url: "https://poremurasutv.com/2025/10/28/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  { title: "Surej Salim Elected President of The Advertising Club Madras for 2025–2026", source: "Talk 4 City", date: "28th October, 2025", url: "https://talk4city.in/surej-salim-elected-president-of-the-advertising-club-madras-for-2025-2026/" },
  // { title: "", source: "", date: "", url: "" },
  // { title: "", source: "", date: "", url: "" },
];

const safeFormatDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  return isNaN(d) ? val : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

export default function PressRelease() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MEDIA_COVERAGE;
    return MEDIA_COVERAGE.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-16 px-6 md:px-16">
      <div className="text-center mb-10 md:mb-14">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-asgard font-bold text-primary mb-3"
        >
          Press Release
        </motion.h1>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <div className="relative w-full md:w-96 mx-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by headline or outlet…"
            className="input-primary"
          />
          <span className="absolute right-3 top-1/2 font-glancyr -translate-y-1/2 text-gray-400 text-sm">
            {filtered.length}/{MEDIA_COVERAGE.length}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-12">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {filtered.map((item, i) => (
              <motion.a
                key={`${item.source}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.45 }}
                className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/70 group transition block"
              >
                <div className="h-44 w-full grid place-items-center bg-gradient-to-br from-primary/30 to-white/10">
                  <div className="text-3xl font-bold font-glancyr text-center text-white/90 tracking-wider">
                    {item.source}
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs">
                    {item.date && (
                      <span className="px-2 py-0.5 rounded font-glancyr bg-primary/20 text-primary border border-primary/30">
                        Date: {safeFormatDate(item.date)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-glancyr mb-2 group-hover:underline">
                    {item.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center font-glancyr gap-2 text-primary">
                    Read on publisher
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="translate-x-0 group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        fill="currentColor"
                        d="M13 5l7 7-7 7M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
