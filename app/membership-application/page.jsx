import MainLayout from "@/components/layout/MainLayout";
import MembershipForm from "@/components/MembershipForm";

export const metadata = {
    title: "Membership Application | Ad Club Madras",
    description: "Apply for Ad Club Madras membership. Fill out the application form to join our community.",
};

export default function MembershipApplicationPage() {
    return (
        <MainLayout>
            <MembershipForm />
        </MainLayout>
    );
}
