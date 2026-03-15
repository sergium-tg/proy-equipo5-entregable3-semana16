£"use client";

import ProfilePhoto from "./ProfilePhoto";
import GeneralInfo from "./GeneralInfo";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 order-2 md:order-1"
            >
                <GeneralInfo />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-shrink-0 order-1 md:order-2"
            >
                <ProfilePhoto />
            </motion.div>
        </section>
    );
}
£ *cascade082wfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/dashboard/HeroSection.tsx