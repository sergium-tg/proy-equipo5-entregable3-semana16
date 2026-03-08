�-'use client'

import React from 'react'
import { Award, Clock, Search, BookOpen, Headset, ArrowRight, ChevronDown } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        icon: <Award className="size-6" />,
        question: "¿SIPRAC emite certificaciones ISO?",
        answer: "No, somos consultores expertos. Preparamos y auditamos su sistema para que cumpla con todos los requisitos necesarios para obtener la certificación ante un ente oficial.",
        category: "Certificaciones"
    },
    {
        icon: <Clock className="size-6" />,
        question: "¿Cuánto tiempo toma implementar un sistema de gestión?",
        answer: "El tiempo varía según el tamaño y la complejidad de la organización, estimando un periodo de entre 6 meses y 1 año.",
        category: "Procesos"
    },
    {
        icon: <Search className="size-6" />,
        question: "¿Qué incluyen sus servicios de auditoría?",
        answer: "Evaluamos a fondo sus procesos, identificamos brechas de cumplimiento y entregamos un plan de acción detallado para la mejora funcional del sistema.",
        category: "Auditoría"
    },
    {
        icon: <BookOpen className="size-6" />,
        question: "¿Es necesario tener conocimiento previo en normas?",
        answer: "No. Nosotros diseñamos el sistema desde cero, adaptándolo 100% a la realidad y operación actual de su negocio; al igual que orientando al cumplimiento solicitado por ministerio de trabajo.",
        category: "Requisitos"
    },
    {
        icon: <Headset className="size-6" />,
        question: "¿Brindan soporte después de la implementación?",
        answer: "Sí, ofrecemos servicios de mantenimiento y auditorías internas periódicas para asegurar que el sistema evolucione y se mantenga eficiente.",
        category: "Soporte"
    }
]

const DetailedFAQ = () => {
    return (
        <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <Accordion type="single" collapsible className="w-full space-y-8">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-[#FAF9F6] border-none rounded-[2.5rem] px-10 shadow-[inset_12px_12px_24px_#d1cfcc,inset_-12px_-12px_24px_#ffffff] transition-colors duration-300 overflow-hidden group"
                        >
                            <AccordionTrigger className="hover:no-underline py-10 group/trigger">
                                <div className="flex items-center gap-8 text-left w-full">
                                    <div className="shrink-0 w-14 h-14 bg-[#FAF9F6] rounded-2xl flex items-center justify-center text-orange-500 shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] border border-white/10 group-hover/trigger:text-orange-600 transition-colors duration-300">
                                        {faq.icon}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/60 group-hover/trigger:text-orange-600 transition-colors duration-300">
                                            {faq.category}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-black text-black tracking-tight leading-tight uppercase">
                                            {faq.question}
                                        </h3>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-10">
                                <div className="pl-22 pr-4">
                                    <div className="w-16 h-1 bg-orange-200 mb-8 rounded-full"></div>
                                    <p className="text-gray-500 font-bold leading-relaxed text-base mb-10 opacity-80 uppercase tracking-wide">
                                        {faq.answer}
                                    </p>

                                    <a
                                        href={`https://wa.me/573116300848?text=${encodeURIComponent(`Hola SIPRAC, tengo una duda sobre: ${faq.question}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-6 py-4 bg-[#FAF9F6] text-orange-500 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[inset_4px_4px_8px_#d1cfcc,inset_-4px_-4px_8px_#ffffff] hover:text-orange-600 transition-all duration-300"
                                    >
                                        Consúltanos por WhatsApp <ArrowRight className="size-4" />
                                    </a>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Background decorative touches */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
        </section>
    )
}

export default DetailedFAQ
�-"(b80abb75684d6dc31d813f8591342fb8ad2a41b22tfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/faq/DetailedFAQ.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac