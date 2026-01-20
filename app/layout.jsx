import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Script from "next/script";

export const metadata = {
    metadataBase: new URL("https://www.adclubmadras.com"),
    title: {
        default: "Ad Club Madras | Advertising Club Chennai",
        template: "%s | Ad Club Madras",
    },
    description: "Ad Club Madras is a premier advertising and marketing community in Chennai, India. Join us for events, workshops, networking, and PGDA courses.",
    keywords: ["Ad Club Madras", "Advertising Club Chennai", "Marketing Events Chennai", "PGDA", "Ad Club Events", "Chennai Advertising"],
    authors: [{ name: "Ad Club Madras" }],
    creator: "Ad Club Madras",
    publisher: "Ad Club Madras",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://www.adclubmadras.com",
        siteName: "Ad Club Madras",
        title: "Ad Club Madras | Advertising Club Chennai",
        description: "Ad Club Madras is a premier advertising and marketing community in Chennai, India.",
        images: [
            {
                url: "/Adclub_new.png",
                width: 800,
                height: 600,
                alt: "Ad Club Madras Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ad Club Madras | Advertising Club Chennai",
        description: "Ad Club Madras is a premier advertising and marketing community in Chennai, India.",
        images: ["/Adclub_new.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    // icons: {
    //     icon: "/favicon.png",
    //     shortcut: "/favicon.png",
    //     apple: "/favicon.png",
    // },
};

export default function RootLayout({ children }) {
    const GTM_ID = "GTM-58BQTJ92";

    return (
        <html lang="en">
            <body className="antialiased">
                {/* Google Tag Manager - Script */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
                </Script>

                {/* Google Tag Manager - NoScript (Body) */}
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>

                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
