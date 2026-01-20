import MainLayout from "@/components/layout/MainLayout";
import EventsPageContent from "@/components/pages/Event/EventsPage";

export const metadata = {
    title: "Events | Ad Club Madras",
    description: "Explore upcoming and past events at Ad Club Madras - seminars, workshops, sports tournaments, and networking opportunities.",
    keywords: ["Ad Club Events", "Advertising Events Chennai", "Marketing Workshops", "GYAN Series"],
    openGraph: {
        title: "Events | Ad Club Madras",
        description: "Stay ahead of the curve by participating in our events.",
        images: ["/Adclub_new.png"],
    },
};

export default function EventsPage() {
    return (
        <MainLayout>
            <EventsPageContent />
        </MainLayout>
    );
}
