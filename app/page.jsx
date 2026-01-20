import MainLayout from "@/components/layout/MainLayout";
import AnimatedBackground from "@/components/background";
import HeroSection from "@/components/pages/Home/HeroSection";
import LegacySection from "@/components/pages/Home/LegacySection";
import CommunityBanner from "@/components/pages/Home/CommunityBanner";
import WhyJoinUsBanner from "@/components/pages/Home/WhyJoinUsBanner";
import EventSection from "@/components/pages/Home/EventSection";
import UpcomingEvents from "@/components/pages/Home/UpcomingEvents";
import JoinUsBanner from "@/components/pages/Home/JoinUsBanner";
import JoinUsSection from "@/components/pages/Home/JoinUsSection";
import DiscoverMoments from "@/components/pages/Home/DiscoverMoments";
import PgdaCard from "@/components/pages/Home/PGDA";

export const metadata = {
    title: "Home | Ad Club Madras",
    description: "Ad Club Madras is a creative advertising community delivering branding, events, and digital solutions in Chennai, India.",
    keywords: ["Ad Club Madras", "Advertising Club Chennai", "Marketing Events", "PGDA Course"],
    openGraph: {
        title: "Ad Club Madras | Home",
        description: "A Legacy of Innovation in Advertising - Join the premier advertising community in Chennai.",
        images: ["/Adclub_new.png"],
    },
};

export default function HomePage() {
    return (
        <MainLayout>
            <AnimatedBackground />
            <HeroSection />
            <LegacySection />
            <CommunityBanner />
            <PgdaCard />
            <WhyJoinUsBanner />
            <EventSection />
            <UpcomingEvents />
            <JoinUsBanner />
            <JoinUsSection />
            <DiscoverMoments />
        </MainLayout>
    );
}
