Ó"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ExperienceModal from "./ExperienceModal";

interface Experience {
    company: string;
    role: string;
    date: string;
    description: string;
    tags: string[];
}

export default function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
            >
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full text-left nm-convex hover:nm-soft p-8 rounded-[2.5rem] transition-all duration-300 transform group-hover:-translate-y-2"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 font-poppins">{experience.role}</h3>
                            <p className="text-indigo-600 font-bold tracking-wide mt-1">{experience.company}</p>
                        </div>
                        <span className="nm-inset px-5 py-2 rounded-full text-xs font-bold text-gray-500 self-start md:self-center">
                            {experience.date}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 italic">
                        {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {experience.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 nm-flat text-xs font-bold text-gray-600 rounded-lg group-hover:text-indigo-600 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-end">
                        <span className="text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Ver mÃ¡s detalles â†’
                        </span>
                    </div>
                </button>
            </motion.div>

            <ExperienceModal
                experience={experience}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
7 *cascade087Š*cascade08Šú *cascade08úÈ*cascade08ÈÓ *cascade082|file:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/experiencia/ExperienceCard.tsx