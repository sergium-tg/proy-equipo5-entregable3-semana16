�+'use client'

import React from 'react'
import { Car, ShieldCheck, Activity, CheckCircle, ArrowUpRight } from 'lucide-react'

const audits = [
    {
        icon: <Car className="size-6 md:size-8" />,
        title: 'Auditoria de Seguridad Vial',
        description: 'Verificamos la implementación y eficiencia del plan estratégico de seguridad vial (PESV), identificando puntos críticos y áreas de mejora para garantizar desplazamientos seguros y cumplimiento normativo.',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        icon: <ShieldCheck className="size-6 md:size-8" />,
        title: 'Auditoria de Registro Único de Contratistas – RUC',
        description: 'Realizamos evaluaciones internas rigurosas bajo los criterios del Consejo Colombiano de Seguridad para asegurar que su empresa mantenga los más altos puntajes de calificación.',
        color: 'from-red-500 to-rose-600'
    },
    {
        icon: <Activity className="size-6 md:size-8" />,
        title: 'Auditoria Seguridad y Salud en el Trabajo',
        description: 'Evaluamos de manera objetiva su SG-SST para validar el cumplimiento de los estándares mínimos y la efectividad de las medidas de control de riesgos implementadas.',
        color: 'from-orange-500 to-orange-600'
    },
    {
        icon: <CheckCircle className="size-6 md:size-8" />,
        title: 'Auditoria de Calidad',
        description: 'Evaluamos sus procesos internos frente a los estándares de calidad definidos, asegurando que cada etapa de su operación esté orientada a la satisfacción del cliente y la mejora continua.',
        color: 'from-blue-500 to-indigo-600'
    }
]

const ValuedAudits = () => {
    return (
        <section className="py-12 md:py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] mb-3 block">Evaluación Especializada</span>
                    <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 text-black tracking-tight uppercase px-2">Auditorías de Valor</h2>
                    <div className="w-16 md:w-20 h-1 md:h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                    <p className="mt-4 md:mt-8 text-gray-500 max-w-2xl mx-auto font-medium text-sm md:text-base px-4 md:px-0">
                        Identificamos oportunidades de mejora a través de evaluaciones rigurosas y objetivas que garantizan la excelencia operativa.
                    </p>
                </div>

                {/* Versión Desktop - Grid centrado */}
                <div className="hidden md:block">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-8 max-w-7xl">
                            {audits.map((audit, index) => (
                                <AuditCard key={index} audit={audit} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Versión Mobile - Carousel */}
                <div className="md:hidden">
                    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
                        {audits.map((audit, index) => (
                            <div key={index} className="min-w-[280px] max-w-[320px] flex-shrink-0">
                                <AuditCard audit={audit} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background decorative touches */}
            <div className="absolute top-1/4 -left-16 md:-left-24 w-48 h-48 md:w-96 md:h-96 bg-orange-50/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
            <div className="absolute bottom-1/4 -right-16 md:-right-24 w-48 h-48 md:w-96 md:h-96 bg-blue-50/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
        </section>
    )
}

// Componente de Card reutilizable (igual que arriba)
const AuditCard = ({ audit }: { audit: any }) => {
    return (
        <div className="bg-[#FAF9F6] rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 flex flex-col group cursor-default shadow-[inset_8px_8px_16px_#d1cfcc,inset_-8px_-8px_16px_#ffffff] transition-all duration-300 hover:shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] border border-white/50 h-full">
            <div className="flex items-start justify-between mb-4 md:mb-8">
                <div className={`p-2.5 md:p-4 bg-[#FAF9F6] rounded-xl md:rounded-2xl text-orange-500 shadow-[inset_3px_3px_6px_#d1cfcc,inset_-3px_-3px_6px_#ffffff] border border-white/50 group-hover:text-orange-600 transition-colors duration-500`}>
                    {audit.icon}
                </div>
                <div className="text-orange-300 group-hover:text-orange-500 transition-colors">
                    <ArrowUpRight className="size-4 md:size-6" />
                </div>
            </div>

            <h3 className="text-lg md:text-2xl font-black text-black mb-3 md:mb-4 tracking-tight uppercase leading-snug md:leading-tight">
                {audit.title}
            </h3>

            <p className="text-gray-500 font-medium md:font-bold leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity text-xs md:text-base">
                {audit.description}
            </p>
        </div>
    )
}

export default ValuedAudits�+"(b80abb75684d6dc31d813f8591342fb8ad2a41b22zfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/services/ValuedAudits.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac