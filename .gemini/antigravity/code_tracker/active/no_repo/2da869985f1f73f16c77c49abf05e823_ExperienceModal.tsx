�!"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Experience {
    company: string;
    role: string;
    date: string;
    description: string;
    tags: string[];
    fullDescription?: string;
}

export default function ExperienceModal({
    experience,
    isOpen,
    onClose
}: {
    experience: Experience;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-nm-bg/30 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-2xl px-2"
                    >
                        <div className="nm-flat rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <IoCloseCircleOutline className="text-4xl" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                {/* Photo Placeholder */}
                                <div className="nm-inset aspect-square rounded-[2rem] flex items-center justify-center text-gray-400 font-medium overflow-hidden">
                                    Placeholder<br />Foto Proyecto
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">{experience.role}</h3>
                                    <p className="text-xl text-indigo-600 font-semibold mb-4">{experience.company}</p>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">{experience.date}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {experience.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 nm-soft rounded-full text-xs font-bold text-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-200/50">
                                <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-tighter">Descripción Detallada</h4>
                                <p className="text-gray-600 leading-relaxed italic">
                                    {experience.fullDescription || experience.description}
                                </p>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Durante este periodo, Isabella destacó por su capacidad analítica y creativa,
                                    liderando procesos de comunicación que requirieron alto nivel de compromiso
                                    y adaptabilidad técnica.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
�!*cascade082}file:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/experiencia/ExperienceModal.tsx