ÿimport ContactLinks from "@/components/contacto/ContactLinks";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
    title: "Contacto",
    description: "Comun√≠cate con Isabella Trejos a trav√©s de WhatsApp, tel√©fono, Instagram o LinkedIn para oportunidades laborales, pr√°cticas profesionales, proyectos colaborativos o propuestas en comunicaci√≥n y periodismo.",
}

export default function ContactPage() {
    return (
        <div className="py-20 md:py-32">
            <AnimatedSection className="mb-20 text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 font-poppins tracking-tighter">
                    ¬øHablamos de <span className="text-indigo-600">Comunicaci√≥n</span>?
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    Estoy disponible para nuevos retos profesionales, colaboraciones period√≠sticas
                    o simplemente para un caf√© virtual sobre narrativa digital.
                </p>
            </AnimatedSection>

            <ContactLinks />

            <AnimatedSection className="mt-24 text-center px-6">
                <div className="nm-flat p-12 md:p-16 rounded-[4rem] max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 font-poppins tracking-tight">
                        Ubicaci√≥n y Enfoque
                    </h2>
                    <p className="text-xl text-gray-600 font-medium italic">
                        Cali, Valle del Cauca ‚Ä¢ Universidad Aut√≥noma de Occidente
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <span className="px-5 py-2 nm-inset rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest">
                            Presencial
                        </span>
                        <span className="px-5 py-2 nm-inset rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Remoto
                        </span>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}
Ü *cascade08Ü°*cascade08°Í *cascade08Íü*cascade08üÿ *cascade082hfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/app/contacto/page.tsx