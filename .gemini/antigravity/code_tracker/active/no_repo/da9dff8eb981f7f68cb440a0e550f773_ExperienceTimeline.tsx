�"use client";

import ExperienceCard from "./ExperienceCard";

const experiences = [
    {
        company: "Noticiero 90 Minutos",
        role: "Pasante de Redacción",
        date: "Ene 2024 - Presente",
        description: "Cubrimiento de noticias locales, redacción de notas para el portal web y apoyo en la producción de segmentos periodísticos.",
        tags: ["Redacción", "Periodismo Local", "CMS"],
    },
    {
        company: "Observatorio de Medios UAO",
        role: "Investigador Estudiantil",
        date: "2023",
        description: "Análisis de tendencias en medios digitales y participación en la creación de informes semestrales sobre consumo de noticias.",
        tags: ["Investigación", "Análisis de Datos", "Medios"],
    },
    {
        company: "Radio UAO",
        role: "Locutor y Productor",
        date: "2022 - 2023",
        description: "Producción de programas radiales universitarios y locución en vivo para el programa de variedades matutino.",
        tags: ["Radio", "Producción", "Locución"],
    },
];

export default function ExperienceTimeline() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={exp.company + exp.date} experience={exp} index={index} />
                ))}
            </div>
        </div>
    );
}
�*cascade082�file:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/experiencia/ExperienceTimeline.tsx