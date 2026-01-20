import MainLayout from "@/components/layout/MainLayout";
import ContactPageContent from "@/components/pages/Contact/ContactPage";

export const metadata = {
    title: "Contact Us, Advertising Club Madras – Office & Support",
    description: "Get in touch with Advertising Club Madras for membership support, event details, partnerships, and general enquiries. We’re here to help you connect with the industry.",
    keywords: ["Contact Ad Club Madras", "Ad Club Chennai Address", "Advertising Club Contact"],
    openGraph: {
        title: "Contact Us | Ad Club Madras",
        description: "Reach out to the Advertising Club Madras team.",
        images: ["/Adclub_new.png"],
    },
};

export default function ContactPage() {
    return (
        <MainLayout>
            <ContactPageContent />
        </MainLayout>
    );
}
