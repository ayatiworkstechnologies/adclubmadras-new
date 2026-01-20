"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ScrollToTopWithLoader from '@/components/ScrollToTopButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import ThemeToggleButton from '@/context/ThemeToggleButton';

const MainLayout = ({ children }) => {
    return (
        <>
            <ScrollProgressBar />
            <Navbar />
            <ScrollProgressBar />
            <main>{children}</main>
            <ScrollToTopWithLoader />
            <FooterSection />
            {/* <ThemeToggleButton /> */}
        </>
    );
};

export default MainLayout;
