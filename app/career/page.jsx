import MainLayout from "@/components/layout/MainLayout";
import CareerPageContent from "@/components/pages/Career/CareerPage";

export const metadata = {
    title: "Careers | Ad Club Madras",
    description: "Explore career opportunities at Ad Club Madras. Join our team and be part of the advertising industry.",
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
