õ"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ImageLightboxProps {
    imageSrc: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function ImageLightbox({ imageSrc, isOpen, onClose, title }: ImageLightboxProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-nm-bg/30 backdrop-blur-xl cursor-pointer"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="nm-flat rounded-[3rem] p-6 max-w-4xl w-full pointer-events-auto relative shadow-2xl">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 text-gray-400 hover:text-indigo-600 transition-colors z-[102]"
                            >
                                <IoCloseCircleOutline className="text-4xl" />
                            </button>

                            <div className="nm-inset aspect-video rounded-3xl overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                                    {imageSrc ? (
                                        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                                    ) : (
                                        "Vista Previa de Foto"
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-800 font-poppins">{title}</h3>
                                <p className="text-indigo-600 font-semibold mt-2">Isabella Trejos Portfolio</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
õ*cascade082wfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/galeria/ImageLightbox.tsx