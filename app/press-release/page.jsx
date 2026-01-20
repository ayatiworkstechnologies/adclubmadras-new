import MainLayout from "@/components/layout/MainLayout";
import PressReleasePageContent from "@/components/pages/PressRelease/PressReleasePage";

export const metadata = {
    title: "Press Release | Ad Club Madras",
    description: "Latest news and press releases from Ad Club Madras.",
    keywords: ["Ad Club Press Release", "Advertising News Chennai"],
    openGraph: {
        title: "Press Release | Ad Club Madras",
        description: "Stay updated with our latest news.",
        images: ["/Adclub_new.png"],
    },
};

export default function PressReleasePage() {
    return (
        <MainLayout>
            <PressReleasePageContent />
        </MainLayout>
    );
}
