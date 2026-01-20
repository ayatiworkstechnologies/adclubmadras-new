import React, { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EventDetailPageContent from "@/components/pages/Event/EventDetailPage";

export const metadata = {
    title: "Event Details | Ad Club Madras",
    description: "View details about this event including date, venue, and description.",
};

export default function EventDetailPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading Event...</div>}>
                <EventDetailPageContent />
            </Suspense>
        </MainLayout>
    );
}
