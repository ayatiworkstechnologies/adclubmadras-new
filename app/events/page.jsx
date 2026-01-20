import MainLayout from "@/components/layout/MainLayout";
import EventsPageContent from "@/components/pages/Event/EventsPage";

export const metadata = {
    title: "Events, Advertising Club Madras – Workshops, Talks & Industry Meetups",
    description: "Explore Advertising Club Madras events, industry talks, workshops, Gyan Series sessions, award nights, and networking meetups led by top advertising professionals.",
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
