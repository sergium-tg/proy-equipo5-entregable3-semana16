�'use client'

import React from 'react'
import { Target, Eye } from 'lucide-react'

const MissionVisionSnippet = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Mission Card */}
                    <div className="liquid-glass rounded-[2.5rem] p-12 flex flex-col items-center text-center group cursor-default">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-orange-500 shadow-sm border border-white group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                            <Target className="size-10" />
                        </div>
                        <h2 className="text-3xl font-black text-black mb-6 tracking-tight uppercase">
                            Nuestra Misión
                        </h2>
                        <p className="text-gray-500 font-bold leading-relaxed text-lg">
                            Brindar soluciones integrales en consultoría y asesoría para la implementación,
                            auditoría y mejora de sistemas de gestión, garantizando el cumplimiento
                            normativo y el desarrollo sostenible de las organizaciones.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="liquid-glass rounded-[2.5rem] p-12 flex flex-col items-center text-center group cursor-default">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-orange-500 shadow-sm border border-white group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                            <Eye className="size-10" />
                        </div>
                        <h2 className="text-3xl font-black text-black mb-6 tracking-tight uppercase">
                            Nuestra Visión
                        </h2>
                        <p className="text-gray-500 font-bold leading-relaxed text-lg">
                            Ser la firma de consultoría líder en la región, reconocida por la excelencia
                            en la prestación de servicios, la innovación y el compromiso con la mejora
                            continua de nuestros clientes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Background decorative touch */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-50/20 rounded-full blur-[120px] -z-10"></div>
        </section>
    )
}

export default MissionVisionSnippet
�"(b80abb75684d6dc31d813f8591342fb8ad2a41b22�file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/MissionVisionSnippet.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac