‹
"use client";

import React from "react";
import { motion } from "framer-motion";

interface MobileCarouselProps {
    children: React.ReactNode;
    className?: string;
    staticOnMobile?: boolean; // When true, mobile shows a static grid instead of carousel
}

export default function MobileCarousel({
    children,
    className = "",
    staticOnMobile = false,
}: MobileCarouselProps) {
    if (staticOnMobile) {
        // Static grid for mobile, normal grid for desktop
        return (
            <div className={`grid ${className}`}>
                {children}
            </div>
        );
    }

    // Carousel for mobile, grid for desktop
    return (
        <motion.div
            className={`
        /* Mobile: Horizontal Scroll */
        flex overflow-x-auto snap-x snap-mandatory 
        pb-8 -mx-4 px-4 gap-4 scrollbar-hide
        
        /* Desktop: Standard Grid or Flex (controlled by parent/className) */
        md:grid md:overflow-visible md:pb-0 md:mx-0 md:px-0
        
        ${className}
      `}
        >
            {React.Children.map(children, (child) => (
                <div className="snap-center shrink-0 w-[75vw] md:w-auto md:shrink-1 h-full">
                    {child}
                </div>
            ))}
        </motion.div>
    );
}
‹
"(b80abb75684d6dc31d813f8591342fb8ad2a41b22vfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/ui/MobileCarousel.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac