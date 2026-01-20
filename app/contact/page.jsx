import MainLayout from "@/components/layout/MainLayout";
import ContactPageContent from "@/components/pages/Contact/ContactPage";

export const metadata = {
    title: "Contact Us | Ad Club Madras",
    description: "Get in touch with Ad Club Madras. Visit us at 57 Bazullah Road, T. Nagar, Chennai or contact us via phone or email.",
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
