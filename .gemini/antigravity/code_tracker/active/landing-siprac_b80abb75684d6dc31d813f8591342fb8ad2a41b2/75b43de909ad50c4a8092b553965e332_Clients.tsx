æ1"use client";
import { useState, useEffect } from "react";

const clients = [
    { name: "ANDAMIOS ACROPOLIS", initials: "AA", id: 1 },
    { name: "STRATECSA", initials: "ST", id: 2 },
    { name: "ENECO S.A.S.", initials: "EN", id: 3 },
    { name: "BETEL", initials: "BT", id: 4 },
    { name: "OBRAS CIVILES", initials: "OC", id: 5 },
];

const Clients = () => {
    const [activeIdx, setActiveIdx] = useState(2);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % clients.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % clients.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + clients.length) % clients.length);

    return (
        <section id="clientes" className="py-24 bg-[#FAF9F6]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-black font-montserrat tracking-tight">Nuestros Clientes</h2>
                    <p className="text-gray-500 text-sm font-medium mb-6">Empresas que conf√≠an en nuestros servicios</p>
                    <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
                </div>

                <div
                    className="relative max-w-4xl mx-auto flex items-center justify-between gap-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all z-10 shrink-0"
                    >
                        <i className="fas fa-chevron-left text-xs"></i>
                    </button>

                    <div className="flex-grow flex justify-center items-center gap-4 md:gap-12 py-16 h-[350px] overflow-visible">
                        {clients.map((client, idx) => {
                            const diff = (idx - activeIdx + clients.length) % clients.length;
                            const isActive = diff === 0;
                            const isVisible = diff === 0 || diff === 1 || diff === clients.length - 1;
                            const isHovered = hoveredIdx === idx;

                            let position = isVisible ? "flex" : "hidden";
                            let opacity = isActive ? "opacity-100" : "opacity-30";
                            let scale = isActive ? "scale-110 shadow-lg" : "scale-90 grayscale";
                            let zIndex = isActive ? "z-20" : "z-10";
                            let bgColor = isActive ? "bg-[#efe8de]" : "bg-[#f5f0e8]";

                            return (
                                <div
                                    key={client.id}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    className={`w-36 h-36 md:w-52 md:h-52 rounded-full border-[1px] border-white items-center justify-center p-6 text-center transition-all duration-700 ease-in-out absolute md:relative ${position} ${opacity} ${scale} ${zIndex} ${bgColor} cursor-pointer group`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-3 rounded-full border-[10px] border-white/40 pointer-events-none"></div>
                                    )}

                                    <div className="relative z-30 w-full h-full flex items-center justify-center">
                                        {/* Name - Visible when NOT hovered */}
                                        <span className={`absolute inset-0 flex items-center justify-center text-center text-gray-400 font-extrabold text-[9px] md:text-[11px] tracking-widest leading-relaxed uppercase px-4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                                            {client.name}
                                        </span>

                                        {/* Logo/Initials - Visible only on hover */}
                                        <div className={`w-14 h-14 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                                            <span className="text-orange-500 font-black text-lg md:text-xl font-montserrat tracking-tighter">
                                                {client.initials}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all z-10 shrink-0"
                    >
                        <i className="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {clients.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIdx(idx)}
                            className={`h-1 rounded-full transition-all duration-500 ${idx === activeIdx ? 'w-8 bg-orange-500' : 'w-2 bg-gray-200'}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;
æ1"(b80abb75684d6dc31d813f8591342fb8ad2a41b22ufile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/Clients.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac