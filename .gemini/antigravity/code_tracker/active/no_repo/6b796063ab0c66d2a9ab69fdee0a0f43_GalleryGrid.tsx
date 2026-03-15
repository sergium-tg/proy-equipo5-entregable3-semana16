˘"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

interface Photo {
    id: number;
    title: string;
    category: string;
    color: string;
}

const photos: Photo[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Proyecto de Comunicaci√≥n ${i + 1}`,
    category: ["Periodismo", "Producci√≥n", "Editorial", "Digital"][i % 4],
    color: ["bg-indigo-100", "bg-slate-200", "bg-indigo-200", "bg-slate-300"][i % 4],
}));

export default function GalleryGrid() {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    return (
        <div className="px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="group"
                    >
                        <button
                            onClick={() => setSelectedPhoto(photo)}
                            className="w-full text-left nm-convex p-4 rounded-[2.5rem] transition-all duration-300 hover:nm-soft"
                        >
                            <div className={`aspect-square rounded-[2rem] mb-5 overflow-hidden relative ${photo.color}`}>
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                                    Foto {photo.id}
                                </div>
                                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-300" />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <span className="bg-white/80 backdrop-blur-sm text-indigo-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                                        Ver m√°s
                                    </span>
                                </motion.div>
                            </div>

                            <div className="px-2">
                                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 block">
                                    {photo.category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-800 font-poppins line-clamp-1">
                                    {photo.title}
                                </h3>
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>

            <ImageLightbox
                isOpen={!!selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
                imageSrc="" // Placeholder
                title={selectedPhoto?.title || ""}
            />
        </div>
    );
}
˘*cascade082ufile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/galeria/GalleryGrid.tsx