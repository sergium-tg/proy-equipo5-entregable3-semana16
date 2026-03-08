�('use client'

import React from 'react'
import { Award, ShieldCheck, Star } from 'lucide-react'

const TeamSnippet = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/30 -skew-x-12 translate-x-20 hidden lg:block"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual side */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-200/50 border-8 border-white group">
                            <div className="bg-gradient-to-br from-orange-400 to-orange-600 aspect-[4/5] flex flex-col items-center justify-center p-12 text-white overflow-hidden">
                                <Award className="size-32 mb-8 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                                <div className="text-center">
                                    <div className="text-4xl font-black mb-2 tracking-tighter italic">LIDERAZGO</div>
                                    <div className="text-sm font-bold uppercase tracking-[0.3em] opacity-80">& EXPERIENCIA</div>
                                </div>
                            </div>

                            {/* Floating Card 1 */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-50 hidden md:flex items-center gap-4 animate-bounce-subtle">
                                <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                    <ShieldCheck className="size-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">Especialista</div>
                                    <div className="text-black font-bold">Gestión SST</div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background shape */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    {/* Content side */}
                    <div className="lg:w-1/2">
                        <span className="inline-block py-1 px-4 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-6 border border-orange-200">
                            Nuestro Equipo Multidisciplinario
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black text-black mb-8 leading-tight tracking-tighter">
                            Profesionales <span className="text-orange-500">Comprometidos</span> <br />
                            con su Excelencia
                        </h2>

                        <div className="space-y-8">
                            <div className="relative p-8 bg-[#FAF9F6] rounded-3xl border-l-[6px] border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-gray-600 text-lg leading-relaxed font-medium italic">
                                    "Nuestro equipo está conformado por profesionales comprometidos y altamente capacitados. La Gerente lidera la firma con una sólida trayectoria en consultoría empresarial y enfoque estratégico."
                                </p>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 mt-1">
                                    <Star className="size-6 text-orange-500 fill-orange-500" />
                                </div>
                                <p className="text-gray-500 leading-relaxed font-medium">
                                    Contamos con profesionales especialistas dedicados a fortalecer su organización a través de sistemas de gestión integrados. Desde el diseño hasta el seguimiento detallado, nos aseguramos de que cada proceso cumpla con la normativa vigente, adaptándonos siempre a las necesidades específicas de su negocio.
                                </p>
                            </div>

                            <p className="text-gray-900 font-black text-lg pl-16 pt-4 relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-orange-500/30"></span>
                                Su combinación de liderazgo, conocimiento técnico y vocación de servicio garantiza resultados de calidad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamSnippet
�("(b80abb75684d6dc31d813f8591342fb8ad2a41b22yfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/TeamSnippet.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac