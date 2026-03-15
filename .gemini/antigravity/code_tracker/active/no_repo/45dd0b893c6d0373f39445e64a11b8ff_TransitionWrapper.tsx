ô"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} // Faster transitions to fix "buggy" feel
                className="pt-32 min-h-screen" // Increased top padding for floating navbar
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
ô*cascade082vfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/ui/TransitionWrapper.tsx