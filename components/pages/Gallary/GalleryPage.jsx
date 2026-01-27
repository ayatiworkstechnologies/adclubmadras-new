"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  getGallery,
  getGalleryCategory,
  getGalleryPhotos,
} from "@/lib/api";

const TABS_VISIBLE = 4;

export default function GallaryPage() {
  const [categories, setCategories] = useState([{ id: 0, categoryName: "All" }]);
  const [eventData, setEventData] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [activeCategoryID, setActiveCategoryID] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gallery, categoryList, photos] = await Promise.all([
          getGallery(),
          getGalleryCategory(),
          getGalleryPhotos(),
        ]);

        const activeGallery = (gallery || []).filter((item) => item.status === "active");
        const activeCategories = (categoryList || []).filter((item) => item.status === "active");

        setEventData(activeGallery);
        setCategories([{ id: 0, categoryName: "All" }, ...activeCategories]);
        setGalleryPhotos(photos || []);
      } catch (error) {
        console.error("API fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = (
    activeCategoryID
      ? eventData.filter((item) => item.galleryCategoryID === activeCategoryID)
      : eventData
  ).sort((a, b) => new Date(b.galleryDate || 0) - new Date(a.galleryDate || 0));

  const visibleTabs = categories.slice(startIndex, startIndex + TABS_VISIBLE);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + TABS_VISIBLE < categories.length)
      setStartIndex(startIndex + 1);
  };

  const generateSlug = (title, fallbackId) => {
    if (!title) return `event-${fallbackId}`;
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-")         // replace spaces with dashes
      .replace(/-+/g, "-")          // collapse multiple dashes
      .replace(/^-|-$/g, "");       // trim dashes
  };

  return (
    <section className="relative bg-black min-h-screen text-white mt-20 px-4 sm:px-6 md:px-12 py-16 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-48 h-48 border-4 border-white rounded-full opacity-20 blur-xl"
      />

      {/* Tabs */}
      <div className="flex justify-center items-center gap-10 mb-10 text-sm sm:text-base font-bold uppercase font-asgard">
        <button onClick={handlePrev} disabled={startIndex === 0} className="nav-chevron-btn">
          <ChevronLeft className="chevron-icon" />
        </button>

        <div className="flex gap-10 items-center">
          {visibleTabs.map((cat, index) => (
            <React.Fragment key={cat.id ?? "all"}>
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
                  onClick={() => setActiveCategoryID(cat.id)}
                  className={`relative z-10 px-4 py-2 text-xs sm:text-sm font-bold uppercase rounded-full transition duration-300 ${activeCategoryID === cat.id
                    ? "text-primary"
                    : "text-white hover:text-primary"
                    }`}
                >
                  {cat.categoryName}
                </button>
              </div>

              {index !== visibleTabs.length - 1 && <span className="text-primary">|</span>}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + TABS_VISIBLE >= categories.length}
          className="nav-chevron-btn"
        >
          <ChevronRight className="chevron-icon" />
        </button>
      </div>

      {/* Heading + Count */}
      <div className="relative z-10 flex justify-between items-center mb-10 px-1 sm:px-2 md:px-4">
        <h2 className="text-2xl md:text-3xl font-asgard text-white">
          {activeCategoryID ? categories.find((c) => c.id === activeCategoryID)?.categoryName : "All"}
        </h2>
        <p className="text-sm sm:text-base text-primary font-semibold">
          Total: {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
        </p>
      </div>

      {/* Event Cards */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => {
            const photo = galleryPhotos.find((p) => p.productid === event.id);
            const eventImage = photo?.path;
            const slug = event.gallerySlug || generateSlug(event.galleryTitle, event.id);

            return (
              <div
                key={event.id}
                className="relative bg-primary rounded-xl border-2 border-primary overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 flex flex-col"
              >
                <div
                  onClick={() => router.push(`/gallery/${slug}`)}
                  className="relative w-full h-40 sm:h-48 cursor-pointer group"
                >
                  {eventImage ? (
                    <Image
                      src={eventImage}
                      alt={event.galleryTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-primary text-black text-[10px] sm:text-xs font-bold uppercase px-3 py-1 rounded shadow-md z-10">
                    {event.galleryDate}
                  </div>
                </div>

                <div className="p-4 bg-primary flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base font-glancyr font-extrabold uppercase leading-snug text-black mb-2">
                    {event.galleryTitle}
                  </h3>

                  {event.galleryHostedBy && (
                    <p className="text-[11px] sm:text-sm text-white font-glancyr font-thin mb-2">
                      Hosted by: {event.galleryHostedBy}
                    </p>
                  )}

                  {event.hostDesignation && (
                    <p className="text-[10px] sm:text-xs text-white font-glancyr font-thin uppercase mb-4">
                      {event.hostDesignation}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.push(`/gallery/${slug}`)}
                    className="mt-auto flex justify-center items-left text-asgard font-bold"
                  >
                    <span className="px-6 py-3 bg-black text-white hover:text-black rounded-full font-bold hover:bg-white transition-all duration-300">
                      View Details
                    </span>
                    <span className="px-4 py-3 bg-black text-white hover:text-black rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
