´import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutCTA() {
    return (
        <section className="py-20 bg-blue-600">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Â¿Listo para optimizar sus sistemas de gestiÃ³n?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    ContÃ¡ctenos hoy mismo para una consultorÃ­a gratuita y descubra cÃ³mo podemos ayudarle a alcanzar sus objetivos.
                </p>
                <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700"
                >
                    <Link href="/contact">
                        Agendar Consulta
                    </Link>
                </Button>
            </div>
        </section>
    );
}
% *cascade08%'*cascade08'- *cascade08-/*cascade08/³ *cascade08³¹*cascade08¹û *cascade08ûª*cascade08ªÎ *cascade08Îê*cascade08ê´ *cascade082sfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/about/AboutCTA.tsx