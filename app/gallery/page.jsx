import MainLayout from "@/components/layout/MainLayout";
import GalleryPageContent from "@/components/pages/Gallary/GalleryPage";

export const metadata = {
    title: "Gallery | Ad Club Madras",
    description: "Browse our photo gallery featuring events, workshops, and memorable moments from Ad Club Madras.",
    keywords: ["Ad Club Gallery", "Event Photos Chennai", "Advertising Events Photos"],
    openGraph: {
        title: "Gallery | Ad Club Madras",
        description: "Discover our moments - Photos from Ad Club Madras events.",
        images: ["/Adclub_new.png"],
    },
};

export default function GalleryPage() {
    return (
        <MainLayout>
            <GalleryPageContent />
        </MainLayout>
    );
}
