Ô"use client";

import { FaWhatsapp, FaPhone, FaLinkedin, FaInstagram, FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const contactOptions = [
    {
        name: "WhatsApp",
        value: "+57 300 000 0000",
        icon: FaWhatsapp,
        color: "text-green-500",
        link: "https://wa.me/573000000000",
    },
    {
        name: "TelÃ©fono",
        value: "+57 300 000 0000",
        icon: FaPhone,
        color: "text-indigo-600",
        link: "tel:+573000000000",
    },
    {
        name: "LinkedIn",
        value: "linkedin.com/in/isabella-trejos",
        icon: FaLinkedin,
        color: "text-blue-700",
        link: "https://linkedin.com/in/usuario",
    },
    {
        name: "Instagram",
        value: "@isatrejos_com",
        icon: FaInstagram,
        color: "text-pink-600",
        link: "https://instagram.com/usuario",
    },
];

export default function ContactLinks() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4">
            {contactOptions.map((option, index) => (
                <motion.div
                    key={option.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                >
                    <div className="nm-flat p-8 rounded-[2.5rem] hover:nm-soft transition-all duration-300 flex items-center justify-between">
                        <a
                            href={option.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 flex-1"
                        >
                            <div className={`nm-inset p-4 rounded-2xl ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                                <option.icon className="text-3xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg font-poppins">{option.name}</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{option.value}</p>
                            </div>
                        </a>

                        <button
                            onClick={() => copyToClipboard(option.value, index)}
                            className="p-3 nm-soft rounded-full text-gray-400 hover:text-indigo-600 transition-all active:nm-inset"
                            title="Copiar al portapapeles"
                        >
                            <FaRegCopy className="text-lg" />
                            {copiedIndex === index && (
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 nm-soft bg-indigo-600 text-white text-[10px] py-1 px-3 rounded-full font-bold">
                                    Â¡Copiado!
                                </span>
                            )}
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
Ô*cascade082wfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/contacto/ContactLinks.tsx