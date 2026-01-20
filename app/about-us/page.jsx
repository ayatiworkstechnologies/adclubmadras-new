import MainLayout from "@/components/layout/MainLayout";
import AboutPageContent from "@/components/pages/About/AboutPage";

export const metadata = {
    title: "About Us | Ad Club Madras",
    description: "Learn about Ad Club Madras - one of India's oldest and most respected advertising communities with over 75 years of legacy.",
    keywords: ["About Ad Club Madras", "Advertising History Chennai", "Past Presidents", "Executive Committee"],
    openGraph: {
        title: "About Us | Ad Club Madras",
        description: "Discover the legacy, leadership, and facilities of Advertising Club Madras.",
        images: ["/Adclub_new.png"],
    },
};

export default function AboutPage() {
    return (
        <MainLayout>
            <AboutPageContent />
        </MainLayout>
    );
}
