import MainLayout from "@/components/layout/MainLayout";
import MembershipPageContent from "@/components/pages/Membership/MembershipPage";

export const metadata = {
    title: "Membership, Advertising Club Madras – Join Industry Network",
    description: "Join Advertising Club Madras and become part of a powerful advertising network. Access Gyan Series talks, industry awards, events, and exclusive member privileges.",
    keywords: ["Ad Club Membership", "Join Ad Club Madras", "Advertising Club Membership"],
    openGraph: {
        title: "Membership | Ad Club Madras",
        description: "Join a vibrant community of advertising professionals.",
        images: ["/Adclub_new.png"],
    },
};

export default function MembershipPage() {
    return (
        <MainLayout>
            <MembershipPageContent />
        </MainLayout>
    );
}
