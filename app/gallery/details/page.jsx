import React, { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GalleryDetailPageContent from "@/components/pages/Gallary/GallaryDetailsPage";

export const metadata = {
    title: "Gallery Details | Ad Club Madras",
    description: "View event photos and details from Ad Club Madras gallery.",
};

export default function GalleryDetailPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading Gallery...</div>}>
                <GalleryDetailPageContent />
            </Suspense>
        </MainLayout>
    );
}
