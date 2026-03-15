�import GalleryGrid from "@/components/galeria/GalleryGrid";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata = {
    title: "Galería de Proyectos",
    description: "Explora la galería visual de Isabella Trejos. Una colección de proyectos, coberturas periodísticas y producciones mediáticas realizadas durante su carrera en la UAO.",
}

export default function GalleryPage() {
    return (
        <div className="py-20 md:py-32">
            <AnimatedSection className="mb-20 text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 font-poppins tracking-tighter">
                    Galería <span className="text-indigo-600">Visual</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    Un recorrido por mis mejores momentos, proyectos y coberturas en el mundo
                    de la comunicación y el periodismo.
                </p>
            </AnimatedSection>

            <div className="max-w-7xl mx-auto">
                <GalleryGrid />
            </div>

            <AnimatedSection className="mt-24 text-center px-6">
                <div className="nm-flat p-12 rounded-[4rem] max-w-4xl mx-auto">
                    <p className="text-lg text-gray-600 font-medium italic">
                        "Capturando la esencia de cada historia a través del lente y la narrativa digital."
                    </p>
                </div>
            </AnimatedSection>
        </div>
    );
}
�*cascade082gfile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/app/galeria/page.tsx