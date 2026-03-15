ã	"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Proyectos Realizados", value: "12+" },
    { label: "A√±os de Experiencia", value: "2" },
    { label: "Art√≠culos Publicados", value: "8" },
    { label: "Manejo de Adobe Suite", value: "90%" },
];

export default function StatsSection() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-y border-gray-100">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                >
                    <div className="text-3xl font-bold text-uao-blue mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-uao-text-secondary uppercase tracking-wider">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
ã	*cascade082xfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/dashboard/StatsSection.tsx