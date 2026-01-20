import MainLayout from "@/components/layout/MainLayout";
import CareerPageContent from "@/components/pages/Career/CareerPage";

export const metadata = {
    title: "Careers, Advertising Club Madras – Job Opportunities & Industry Roles",
    description: "Explore career opportunities with Advertising Club Madras. Discover roles, industry openings, and ways to grow within India’s advertising and marketing ecosystem.",
    keywords: ["Ad Club Careers", "Advertising Jobs Chennai", "Marketing Jobs"],
    openGraph: {
        title: "Careers | Ad Club Madras",
        description: "Explore career opportunities with us.",
        images: ["/Adclub_new.png"],
    },
};

export default function CareerPage() {
    return (
        <MainLayout>
            <CareerPageContent />
        </MainLayout>
    );
}
