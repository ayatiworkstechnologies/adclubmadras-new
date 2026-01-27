"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

export default function GallaryDetailPage({ galleryItem, galleryImages }) {
  const router = useRouter();
  const [previewIndex, setPreviewIndex] = useState(null);

  // If no item found (handled by parent returning null/empty, or check here)
  if (!galleryItem) {
    return (
      <section className="text-center text-red-500 py-20">
        <p className="text-xl font-bold">Gallery Event Not Found</p>
      </section>
    );
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (previewIndex !== null) {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closePreview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewIndex]);

  const openPreview = (index) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);
  const showNext = () =>
    setPreviewIndex((prev) => (prev + 1) % galleryImages.length);
  const showPrev = () =>
    setPreviewIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  const {
    galleryTitle,
    galleryDescription,
    galleryDate,
    galleryLocation,
    galleryHostedBy,
    hostDesignation,
    description,
  } = galleryItem || {};



  if (!galleryItem) {
    return (
      <section className="text-center text-red-500 py-20">
        <p className="text-xl font-bold">Gallery Event Not Found</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-white mt-20 px-4 py-16 sm:px-8 md:px-16 relative">
      {/* 🔙 Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 border border-primary bg-primary/10 text-sm text-gray-300 rounded-full transition-all duration-200 hover:bg-primary hover:text-white active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold font-glancyr mb-2">
        {galleryTitle}
      </h2>

      {galleryDescription && (
        <p className="text-center text-sm sm:text-base mb-6 text-white/80">
          {galleryDescription}
        </p>
      )}

      {(galleryDate || galleryLocation) && (
        <p className="text-center text-xs sm:text-sm mb-10 opacity-80">
          {galleryDate} {galleryLocation && `• ${galleryLocation}`}
        </p>
      )}

      {(galleryHostedBy || hostDesignation) && (
        <div className="text-center mb-10">
          {galleryHostedBy && (
            <p className="text-sm sm:text-base mb-1">
              Hosted by: <span className="font-bold">{galleryHostedBy}</span>
            </p>
          )}
          {hostDesignation && (
            <p className="text-xs sm:text-sm text-white">{hostDesignation}</p>
          )}
        </div>
      )}

      {description && (
        <div className="prose prose-invert max-w-none mb-10 mx-auto">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl border-2 border-primary cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openPreview(index)}
            >
              <Image
                src={img.src}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white opacity-70 text-sm">
          No photos available for this gallery.
        </p>
      )}

      {/* === Preview Modal === */}
      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={closePreview}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-all"
              whileHover={{ scale: 1.2 }}
              aria-label="Close Preview"
            >
              <X size={32} />
            </motion.button>

            <motion.button
              onClick={showPrev}
              className="absolute left-4 text-white hover:text-primary transition-all"
              whileHover={{ scale: 1.2 }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={48} />
            </motion.button>

            <motion.div
              key={previewIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[80vh] text-center"
            >
              <motion.img
                src={galleryImages[previewIndex].src}
                alt={`Preview ${previewIndex + 1}`}
                className="rounded-lg shadow-2xl max-h-[70vh] mx-auto"
              />
              <div className="mt-4 text-white text-sm sm:text-base">
                <span className="block opacity-70">
                  Image {previewIndex + 1} of {galleryImages.length}
                </span>
                {galleryImages[previewIndex].caption && (
                  <span className="block mt-1 font-semibold text-white">
                    {galleryImages[previewIndex].caption}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.button
              onClick={showNext}
              className="absolute right-4 text-white hover:text-primary transition-all"
              whileHover={{ scale: 1.2 }}
              aria-label="Next Image"
            >
              <ChevronRight size={48} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
