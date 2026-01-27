import React, { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GalleryDetailPageContent from "@/components/pages/Gallary/GallaryDetailsPage";
import { getGallery, getGalleryPhotos } from "@/lib/api";

export const metadata = {
    title: "Gallery Details | Ad Club Madras",
    description: "View event photos and details from Ad Club Madras gallery.",
};

// Helper to match client-side slug generation
const generateSlug = (title, fallbackId) => {
    if (!title) return `event-${fallbackId}`;
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-")         // replace spaces with dashes
        .replace(/-+/g, "-")          // collapse multiple dashes
        .replace(/^-|-$/g, "");       // trim dashes
};

export async function generateStaticParams() {
    try {
        const galleryData = await getGallery();
        return galleryData.map((item) => ({
            slug: item.gallerySlug || generateSlug(item.galleryTitle, item.id),
        }));
    } catch (error) {
        console.error("Error generating static params for gallery:", error);
        return [];
    }
}

export default async function GalleryDetailPage({ params }) {
    const { slug } = await params;

    // Fetch data on the server
    const [galleryData, photoData] = await Promise.all([
        getGallery(),
        getGalleryPhotos(),
    ]);

    let galleryItem;
    // Try exact match on gallerySlug
    galleryItem = galleryData.find((item) => item.gallerySlug === slug);

    // Fallback: match simplified title if slug missing or mismatch
    if (!galleryItem) {
        const normalizedSlug = decodeURIComponent(slug).toLowerCase();
        galleryItem = galleryData.find(item => {
            const generated = generateSlug(item.galleryTitle, item.id);
            return generated === normalizedSlug;
        });
    }

    // Prep images if item found
    let galleryImages = [];
    if (galleryItem) {
        galleryImages = photoData
            .filter((photo) => photo.productid === galleryItem.id)
            .map((img, i) => ({
                src: img.path || img.thumbnail || "/fallback.jpg",
                caption: img.caption || `${galleryItem.galleryTitle} ${i + 1}`,
            }));
    }

    return (
        <MainLayout>
            {/* Pass pre-fetched data to Client Component */}
            <GalleryDetailPageContent
                galleryItem={galleryItem}
                galleryImages={galleryImages}
            />
        </MainLayout>
    );
}
