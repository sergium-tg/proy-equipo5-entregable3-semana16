�/import { PhoneForwarded, Send, CalendarDays } from 'lucide-react';
import MobileCarousel from '../ui/MobileCarousel';

export default function ContactInfo() {
    const infoCards = [
        {
            title: "Teléfonos",
            icon: "fas fa-phone",
            items: [
                "311 628 3087",
                "311 630 0848",
                "315 865 3629",
            ],
            footer: "Llamadas y WhatsApp disponibles"
        },
        {
            title: "Correos Electrónicos",
            icon: "fas fa-envelope",
            items: [
                "siprac.director@gmail.com",
                "sipracsiprac@gmail.com",
                "siprac.dou001@gmail.com"
            ],
            footer: "Respondemos en menos de 24 horas"
        },
        {
            title: "WhatsApp",
            icon: "fab fa-whatsapp",
            content: "Comuníquese directamente por WhatsApp para una respuesta rápida",
            button: {
                text: "Escribir por WhatsApp",
                color: "bg-[#25D366]"
            }
        },
        {
            title: "Horario de Atención",
            icon: "fas fa-clock",
            details: [
                { label: "Lunes - Viernes", value: "8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM" },

            ]

        }
    ];

    return (
        <section className="py-12 md:py-24 bg-[#FAF9F6]">
            <div className="container mx-auto px-4">
                <MobileCarousel className="grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto md:mx-auto justify-center md:pb-0 scrollbar-hide">
                    {infoCards.map((card, idx) => (
                        <div key={idx} className="bg-[#FAF9F6] rounded-[2.5rem] p-12 shadow-[inset_12px_12px_24px_#d1cfcc,inset_-12px_-12px_24px_#ffffff] transition-all duration-500 flex flex-col items-center text-center group h-full">
                            <div className="w-16 h-16 bg-[#FAF9F6] rounded-2xl flex items-center justify-center mb-8 shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] border border-white/10 group-hover:text-orange-500 transition-colors duration-500 text-gray-400">
                                <i className={`${card.icon} text-2xl`}></i>
                            </div>
                            <h3 className="text-3xl font-black text-black mb-8 tracking-tight uppercase group-hover:text-orange-600 transition-colors duration-500">{card.title}</h3>

                            {card.items && (
                                <div className="space-y-4 w-full mb-8">
                                    {card.items.map((item, i) => (
                                        <div key={i} className="py-4 px-6 rounded-2xl text-[13px] text-gray-700 font-bold uppercase tracking-widest border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            {card.title === "Teléfonos" && <PhoneForwarded className="size-4 text-orange-500 shrink-0" />}
                                            {card.title === "Correos Electrónicos" && <Send className="size-4 text-orange-500 shrink-0" />}
                                            <span className="whitespace-nowrap">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {card.content && (
                                <p className="text-sm font-extrabold text-gray-500 leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity mb-8">
                                    {card.content}
                                </p>
                            )}

                            {card.button && (
                                <a
                                    href="https://wa.me/573116300848"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${card.button.color} text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-transform mb-8 shadow-lg`}
                                >
                                    <i className="fab fa-whatsapp text-lg"></i>
                                    {card.button.text}
                                </a>
                            )}

                            {card.details && (
                                <div className="space-y-5 w-full mb-8 text-center">
                                    {card.details.map((detail, i) => (
                                        <div key={i} className="flex flex-col items-center justify-center bg-[#FAF9F6] p-5 rounded-xl border border-white/5 gap-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="size-4 text-orange-500 shrink-0" />
                                                <span className="text-xs font-black text-black uppercase tracking-wider">{detail.label}:</span>
                                            </div>
                                            <span className="text-sm text-gray-600 font-bold uppercase">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {card.footer && (
                                <p className="text-xs text-gray-400 font-bold italic uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity mt-auto">
                                    {card.footer}
                                </p>
                            )}
                        </div>
                    ))}
                </MobileCarousel>
            </div>
        </section>
    );
}
�/"(b80abb75684d6dc31d813f8591342fb8ad2a41b22xfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/ContactInfo.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac