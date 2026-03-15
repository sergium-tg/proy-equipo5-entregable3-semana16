ô"use client";

import { motion } from "framer-motion";

export default function GeneralInfo() {
    return (
        <div className="space-y-8">
            <div>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-foreground mb-4 font-poppins tracking-tight"
                >
                    Isabella<span className="text-indigo-600 block md:inline"> Trejos</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl md:text-2xl text-indigo-600 font-semibold tracking-wide"
                >
                    ComunicaciÃ³n Social y Periodismo â€¢ UAO
                </motion.p>
            </div>

            <div className="space-y-6">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
                >
                    Estudiante apasionada por narrar historias que impactan. Enfocada en periodismo digital,
                    comunicaciÃ³n estratÃ©gica y la creaciÃ³n de contenidos que conectan con la audiencia.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap gap-4 pt-4"
                >
                    {["Periodismo Digital", "ComunicaciÃ³n Corporativa", "RedacciÃ³n Creativa", "Estrategia Digital"].map((tag, i) => (
                        <span
                            key={tag}
                            className="px-6 py-2 nm-soft rounded-full text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors cursor-default"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
 *cascade08*cascade08´ *cascade08´»*cascade08»½ *cascade08½ø*cascade08ø‰ *cascade08‰Š*cascade08Š• *cascade08•–*cascade08–¨ *cascade08¨©*cascade08©ª *cascade08ª«*cascade08«¬ *cascade08¬­*cascade08­® *cascade08®²*cascade08²¶ *cascade08¶·*cascade08·Ä *cascade08ÄÓ*cascade08ÓÔ *cascade08Ôå*cascade08åû *cascade08ûˆ*cascade08ˆ‰ *cascade08‰*cascade08 *cascade08*cascade08‘ *cascade08‘¤*cascade08¤¥ *cascade08¥·*cascade08·¹ *cascade08¹Ã*cascade08ÃÖ *cascade08Öİ*cascade08İò *cascade08òù*cascade08ùú *cascade08úµ*cascade08µÉ *cascade08ÉÌ*cascade08ÌÑ *cascade08Ñß*cascade08ßá *cascade08áä*cascade08äò *cascade08ò€*cascade08€ *cascade08’*cascade08’ä *cascade08äë*cascade08ë¦ *cascade08¦§*cascade08§» *cascade08»Â*cascade08ÂÃ *cascade08Ãı	*cascade08ı	‘
 *cascade08‘
”
*cascade08”
™
 *cascade08™
œ
*cascade08œ
¡
 *cascade08¡
£
*cascade08£
¥
 *cascade08¥
©
*cascade08©
Ä
 *cascade08Ä
Õ
*cascade08Õ
… *cascade08…˜*cascade08˜™ *cascade08™¯*cascade08¯Â *cascade08ÂÃ*cascade08ÃÙ *cascade08ÙÛ*cascade08Ûİ *cascade08İŞ*cascade08Şà *cascade08àä*cascade08äê *cascade08êğ*cascade08ğñ *cascade08ñò*cascade08òó *cascade08óô*cascade08ôõ *cascade08õ÷*cascade08÷ *cascade08™*cascade08™œ *cascade08œ¦*cascade08¦¨ *cascade08¨¬*cascade08¬­ *cascade08­®*cascade08®¿ *cascade08¿Ô*cascade08ÔØ *cascade08ØÚ*cascade08ÚÛ *cascade08Ûä*cascade08äå *cascade08åü*cascade08üş *cascade08ş†*cascade08†‡ *cascade08‡Š*cascade08Š‹ *cascade08‹Œ*cascade08Œ *cascade08”*cascade08”¥ *cascade08¥µ*cascade08µ¶ *cascade08¶Á*cascade08ÁÒ *cascade08Òä*cascade08äå *cascade08åé*cascade08éê *cascade08ê”*cascade08”³ *cascade08³´*cascade08´¸ *cascade08¸¹*cascade08¹º *cascade08ºË*cascade08Ë® *cascade08®´*cascade08´µ *cascade08µ¸*cascade08¸¹ *cascade08¹¼*cascade08¼½ *cascade08½¾*cascade08¾Ë *cascade08ËÎ*cascade08ÎÃ *cascade08ÃÄ*cascade08ÄÈ *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊÌ*cascade08ÌÍ *cascade08ÍĞ*cascade08Ğì *cascade08ìï*cascade08ïö *cascade08öø*cascade08øù *cascade08ùú*cascade08úû *cascade08û…*cascade08…‹ *cascade08‹—*cascade08—˜ *cascade08˜¤*cascade08¤¥ *cascade08¥¦*cascade08¦§ *cascade08§ª*cascade08ª¬ *cascade08¬­*cascade08­® *cascade08®µ*cascade08µ½ *cascade08½Ä*cascade08Äô *cascade082wfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/dashboard/GeneralInfo.tsx