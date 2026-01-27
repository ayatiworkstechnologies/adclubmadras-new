import MainLayout from "@/components/layout/MainLayout";
import AboutPageContent from "@/components/pages/About/AboutPage";
import { getExecutiveCommittee, getPastPresidents } from "@/lib/api";

export const metadata = {
    title: "About Us, Advertising Club Madras – Legacy in Advertising & Creative Leadership",
    description: "Discover the legacy of Advertising Club Madras, one of India’s oldest advertising forums, fostering creative leadership, knowledge exchange, and industry excellence for over six decades.",
    keywords: ["About Ad Club Madras", "Advertising History Chennai", "Past Presidents", "Executive Committee"],
    openGraph: {
        title: "About Us | Ad Club Madras",
        description: "Discover the legacy, leadership, and facilities of Advertising Club Madras.",
        images: ["/Adclub_new.png"],
    },
};

export default async function AboutPage() {
    const [committeeData, presidentsData] = await Promise.all([
        getExecutiveCommittee().catch(err => { console.error("About SSG Error (Committee):", err); return null; }),
        getPastPresidents().catch(err => { console.error("About SSG Error (Presidents):", err); return []; })
    ]);

    return (
        <MainLayout>
            <AboutPageContent
                initialCommittee={committeeData}
                initialPresidents={presidentsData}
            />
        </MainLayout>
    );
}
