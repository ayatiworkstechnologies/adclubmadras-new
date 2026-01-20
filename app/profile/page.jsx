import MainLayout from "@/components/layout/MainLayout";
import ProfilePageContent from "@/components/pages/Profile/ProfilePage";

export const metadata = {
    title: "My Profile | Ad Club Madras",
    description: "View and manage your Ad Club Madras member profile.",
};

export default function ProfilePage() {
    return (
        <MainLayout>
            <ProfilePageContent />
        </MainLayout>
    );
}
