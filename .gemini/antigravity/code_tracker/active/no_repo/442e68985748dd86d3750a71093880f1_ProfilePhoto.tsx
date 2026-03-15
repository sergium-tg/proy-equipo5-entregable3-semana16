è"use client";

import { motion } from "framer-motion";

export default function ProfilePhoto() {
    return (
        <div className="relative group">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative"
            >
                <span className="text-gray-400 font-medium">Foto de Perfil</span>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-uao-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -inset-2 border-2 border-uao-blue/20 rounded-full group-hover:border-uao-blue/50 transition-colors duration-300 -z-10" />
        </div>
    );
}
è *cascade082xfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/dashboard/ProfilePhoto.tsx