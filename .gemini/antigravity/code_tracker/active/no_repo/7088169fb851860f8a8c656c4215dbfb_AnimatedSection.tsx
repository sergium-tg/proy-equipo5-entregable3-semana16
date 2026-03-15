Þ"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function AnimatedSection({
    children,
    delay = 0,
    className = ""
}: AnimatedSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
„ *cascade08„…*cascade08…– *cascade08–—*cascade08—™ *cascade08™œ*cascade08œÞ *cascade082tfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/ui/AnimatedSection.tsx