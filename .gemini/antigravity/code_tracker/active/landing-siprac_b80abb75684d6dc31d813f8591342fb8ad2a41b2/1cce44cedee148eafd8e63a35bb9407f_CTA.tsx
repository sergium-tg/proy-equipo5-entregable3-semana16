�import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";

const CTA = () => {
    return (
        <section className="py-12 bg-[#FAF9F6]">
            <div className="container mx-auto px-4">
                <div className="bg-[#FAF9F6] rounded-[2.5rem] p-8 md:p-12 shadow-[inset_10px_10px_20px_#d1cfcc,inset_-10px_-10px_20px_#ffffff] flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto border border-white/20">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black text-black mb-2 tracking-tight uppercase">
                            ¿Listo para transformar su organización?
                        </h2>
                        <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest opacity-60">
                            Solicite una consultoría gratuita hoy mismo
                        </p>
                    </div>

                    <Button asChild size="lg" className="h-14 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:-translate-y-1 bg-orange-500 hover:bg-orange-600 border-none shrink-0">
                        <Link href="/contact" className="flex items-center gap-3">
                            <Calendar className="size-5" />
                            Solicitar Asesoría
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
�"(b80abb75684d6dc31d813f8591342fb8ad2a41b22qfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/CTA.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac