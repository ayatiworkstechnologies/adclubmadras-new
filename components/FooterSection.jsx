"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const FooterSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const router = useRouter();

    return (
        <div
            className="bg-primary text-black font-bold px-4 py-10 sm:px-6 md:px-10 lg:px-16 flex flex-col"
            style={{
                backgroundImage: `url(/assets/fotter-fream.svg)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Main Content */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
                {/* Left Side - Logo & Title */}
                <div className="md:w-1/2 flex flex-col justify-center items-start text-center md:text-left">
                    <Image src="/logo.svg" alt="Logo" width={112} height={112} className="w-28 mb-4" />
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none font-asgard animate-slideInLeft">
                        ADVERTISING
                    </h1>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none font-asgard animate-slideInLeft">
                        CLUB MADRAS
                    </h1>
                </div>

                {/* Right Side - Navigation */}
                <div className="md:w-1/2 flex flex-col gap-6">
                    <div className="grid grid-cols-4 gap-y-2 text-xs md:text-sm font-normal text-center md:text-right animate-slideInUp">
                        {/* Row 1 */}
                        <Link href="/about-us" className="hover:text-white col-span-1">
                            ABOUT US
                        </Link>
                        <Link href="/events" className="hover:text-white col-span-1">
                            EVENTS
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-white font-bold col-span-1"
                        >
                            CONTACT
                        </Link>
                        <button
                            onClick={() => router.push("/login")}
                            className="text-black hover:text-white uppercase font-bold transition duration-200 col-span-1"
                        >
                            MEMBER LOGIN
                        </button>

                        {/* Row 2 */}
                        <a
                            href="https://pgda.adclubmadras.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white col-span-1"
                        >
                            COURSES
                        </a>
                        <Link href="/gallery" className="hover:text-white col-span-1">
                            GALLERY
                        </Link>

                        {/* Empty columns for row 2 alignment */}
                        <div className="col-span-2" />

                        {/* Row 3 */}
                        <Link href="/membership" className="hover:text-white col-span-1">
                            MEMBERSHIP
                        </Link>
                        <Link href="/career" className="hover:text-white col-span-1">
                            CAREER
                        </Link>

                        {/* Empty columns for row 3 alignment */}
                        <div className="col-span-2" />
                    </div>

                    {/* Contact Info */}
                    <div className="text-sm font-normal leading-snug mt-6 text-center md:text-right">
                        <p>
                            <a
                                href="https://maps.app.goo.gl/RUgXTRGDZZdPHcqq9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                57, Bazullah Road,
                                <br />
                                T. Nagar, Chennai – 600 017
                            </a>
                        </p>

                        <p>
                            <a href="tel:04442694798" className="hover:underline">
                                044 - 42694778
                            </a>
                            ,{" "}
                            <a href="tel:8248717152" className="hover:underline">
                                8248717152
                            </a>
                        </p>
                        <p>
                            <a
                                href="mailto:advertisingclubmadras@gmail.com"
                                className="underline"
                            >
                                advertisingclubmadras@gmail.com
                            </a>
                        </p>
                        <div className="flex justify-center md:justify-end space-x-4 mt-3">
                            <a href="https://in.linkedin.com/company/advertising-club-madras" className="hover:text-white" aria-label="LinkedIn">
                                <FaLinkedinIn size={18} />
                            </a>
                            <a href="https://www.instagram.com/advertising_club_madras/" className="hover:text-white" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 pt-6 border-t border-black/30 text-xs font-medium flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left flex-wrap">
                <p className="hover:text-white">
                    ADVERTISING CLUB MADRAS © {new Date().getFullYear()}
                </p>

                <div className="flex items-center gap-4">
                    <Link href="/privacy-policy" className="hover:text-white">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-conditions" className="hover:text-white">
                        Terms & Conditions
                    </Link>
                    <Link href="/refund-and-cancellation" className="hover:text-white">
                        Refund & Cancellation
                    </Link>
                </div>

                <div
                    className="flex items-center gap-2 hover:text-white cursor-pointer"
                    onClick={() => window.open("https://ayatiworks.com/", "_blank")}
                >
                    DESIGN & DEVELOPMENT <span className="font-bold">BY AYATIWORKS</span>
                    <Image
                        src="/web_logo.png"
                        alt="AyatiWorks Logo"
                        width={80}
                        height={80}
                        className="w-20 h-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
