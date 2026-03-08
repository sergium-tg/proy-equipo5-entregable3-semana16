�O'use client'

import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Shield, Leaf, Award, Search, FileText, Settings, ArrowRight, Car } from 'lucide-react'
import MobileCarousel from '../ui/MobileCarousel'

const serviceDetails = [
    {
        id: 'sst',
        title: 'Seguridad y Salud en el Trabajo (SST)',
        icon: <Shield className="size-8 text-orange-500" />,
        description: 'Implementamos sistemas de gestión que protegen a su activo más valioso: sus trabajadores. Nos enfocamos en la prevención de riesgos y el cumplimiento normativo.',
        features: [
            'Diseño e implementación del SG-SST (Res. 0312)',
            'Asesoría técnica en prevención de riesgos laborales',
            'Investigación de accidentes e incidentes',
            'Planes de emergencias y formación de brigadas',
            'Mediciones higiénicas y ergonomía'
        ],
        image: '/images/services/sst.png',
        color: 'orange'
    },
    {
        id: 'ambiental',
        title: 'Gestión Ambiental',
        icon: <Leaf className="size-8 text-green-500" />,
        description: 'Acompañamos a las empresas en su transición hacia la sostenibilidad, garantizando el cumplimiento de la legislación ambiental vigente y minimizando su impacto.',
        features: [
            'Planes de Manejo Ambiental (PMA)',
            'Gestión integral de residuos (GIRS)',
            'Trámites ante autoridades ambientales',
            'Programas de uso eficiente de recursos',
            'Asesoría en producción más limpia'
        ],
        image: '/images/services/environmental.png',
        color: 'green'
    },
    {
        id: 'calidad',
        title: 'Gestión de Calidad (ISO 9001)',
        icon: <Award className="size-8 text-blue-500" />,
        description: 'Buscamos la excelencia operacional a través de procesos estandarizados que aumentan la satisfacción del cliente y la eficiencia organizacional.',
        features: [
            'Implementación de la norma ISO 9001:2015',
            'Gestión por procesos y mejora continua',
            'Elaboración de manuales y procedimientos',
            'Indicadores de gestión y KPI\'s',
            'Estandarización de servicios'
        ],
        image: '/images/services/quality.png',
        color: 'blue'
    },
    {
        id: 'auditorias',
        title: 'Auditorías Integrales',
        icon: <Search className="size-8 text-purple-500" />,
        description: 'Evaluamos objetivamente sus sistemas de gestión para identificar oportunidades de mejora y garantizar que se cumplan los objetivos establecidos.',
        features: [
            'Auditorías internas de certificación',
            'Pre-auditorías de cumplimiento normativo',
            'Auditorías a proveedores',
            'Seguimiento a planes de acción',
            'Informes técnicos de diagnóstico'
        ],
        image: '/images/services/audits.png',
        color: 'purple'
    },
    {
        id: 'ruc',
        title: 'Registro Único RUC',
        icon: <FileText className="size-8 text-red-500" />,
        description: 'Asesoría especializada para empresas contratistas del sector hidrocarburos y otros sectores que requieran calificación RUC.',
        features: [
            'Inscripción y actualización RUC',
            'Acompañamiento en evaluaciones del Consejo Colombiano de Seguridad',
            'Análisis de brechas frente a los requisitos RUC',
            'Gestión documental especializada',
            'Mantenimiento continuo del sistema'
        ],
        image: '/images/services/ruc-updated.png',
        color: 'red'
    },
    {
        id: 'sgi',
        title: 'Sistemas Integrados (HSEQ)',
        icon: <Settings className="size-8 text-amber-500" />,
        description: 'Integramos sus sistemas en una sola estructura coherente que facilite la toma de decisiones y reduzca la duplicidad de esfuerzos.',
        features: [
            'Integración SST, Ambiente y Calidad',
            'Simplificación de la estructura documental',
            'Cultura organizacional integrada',
            'Optimización de recursos administrativos',
            'Visión holística del riesgo'
        ],
        image: '/images/services/hseq-updated.png',
        color: 'amber'
    },
    {
        id: 'pesv',
        title: 'Plan Estratégico de Seguridad Vial (PESV)',
        icon: <Car className="size-8 text-indigo-500" />,
        description: 'Desarrollamos e implementamos su Plan Estratégico de Seguridad Vial bajo estándares normativos, enfocándonos en la prevención de riesgos viales y la protección de la vida.',
        features: [
            'Diseño según el nivel de cumplimiento y tamaño de organización',
            'Gestión de los 5 pilares de seguridad vial',
            'Articulación con el SG-SST',
            'Auditorías de seguimiento y verificación de indicadores',
            'Atención a víctimas e infraestructura segura'
        ],
        image: '/images/services/pesv.png',
        color: 'indigo'
    }
]

const DetailedServices = () => {
    return (
        <section className="py-12 md:py-24 bg-[#FAF9F6]">
            <div className="container mx-auto px-4">
                <MobileCarousel className="grid-cols-1 gap-12 md:gap-20 md:pb-0 scrollbar-hide">
                    {serviceDetails.map((service, index) => (
                        <div
                            key={service.id}
                            className={`
                                relative flex flex-col h-full
                                bg-[#FAF9F6] rounded-[2.5rem] p-8 shadow-[10px_10px_20px_#d1cfcc,-10px_-10px_20px_#ffffff] border border-white/50
                                md:bg-transparent md:p-0 md:shadow-none md:border-none md:flex-row md:items-center md:gap-20
                                ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                            `}
                        >
                            {/* Neumorphic Decorative Number for Mobile (replacing the image badge) */}
                            <div className="md:hidden absolute top-6 right-8 text-6xl font-black text-gray-200/50 select-none pointer-events-none">
                                0{index + 1}
                            </div>

                            {/* Content Box */}
                            <div className="flex-1 w-full relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-[#FAF9F6] rounded-2xl shadow-[inset_5px_5px_10px_#d1cfcc,inset_-5px_-5px_10px_#ffffff] text-orange-500">
                                        {service.icon}
                                    </div>
                                    <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-black text-black mb-4 md:mb-6 tracking-tight leading-tight">
                                    {service.title}
                                </h2>

                                <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed font-medium">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 group">
                                            <CheckCircle2 className="size-5 text-orange-500 mt-0.5 shrink-0" />
                                            <span className="text-sm font-bold text-gray-700 leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 md:mt-10">
                                    <button className="flex items-center gap-2 text-sm font-black text-orange-500 uppercase tracking-widest hover:gap-4 transition-all group">
                                        Solicitar información técnica
                                        <ArrowRight className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Image Box - HIDDEN on Mobile */}
                            <div className="hidden md:block flex-1 w-full">
                                <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                    {/* Floating badge */}
                                    <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-lg">
                                        <div className="text-orange-500 font-black text-xl leading-none">0{index + 1}</div>
                                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Sección</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </MobileCarousel>
            </div>
        </section>
    )
}

export default DetailedServices
�O"(b80abb75684d6dc31d813f8591342fb8ad2a41b22~file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/services/DetailedServices.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac