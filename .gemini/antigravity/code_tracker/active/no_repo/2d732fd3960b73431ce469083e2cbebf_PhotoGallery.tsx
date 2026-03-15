�"use client";

import { motion } from "framer-motion";

const photos = [
    { id: 1, title: "Cobertura de Eventos", color: "bg-indigo-200" },
    { id: 2, title: "Producción Radial", color: "bg-slate-300" },
    { id: 3, title: "Redacción Digital", color: "bg-gray-300" },
    { id: 4, title: "Comunicación Estratégica", color: "bg-indigo-100" },
];

export default function PhotoGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
            {photos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -5 }}
                    className="nm-convex p-4 rounded-[2rem] group"
                >
                    <div className={`aspect-[4/5] rounded-3xl overflow-hidden mb-4 ${photo.color} relative`}>
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                            Placeholder Foto {photo.id}
                        </div>
                        <motion.div
                            className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                    <h3 className="text-center font-bold text-gray-700 pb-2">{photo.title}</h3>
                </motion.div>
            ))}
        </div>
    );
}
�*cascade082xfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/dashboard/PhotoGallery.tsx