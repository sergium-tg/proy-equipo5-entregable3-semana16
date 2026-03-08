�!import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#121212] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex flex-col mb-4">
                            <div className="flex items-center">
                                <span className="font-extrabold text-2xl text-white">SIPRA</span>
                                <span className="font-extrabold text-2xl text-orange-500">C</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium leading-none">
                                Prevención de Riesgos & Gestión Integral
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mt-4">
                            Expertos en SST, calidad y medio ambiente. Comprometidos con la excelencia operacional de su empresa.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Inicio</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">Quiénes Somos</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">Servicios</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Servicios</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>Gestión SST</li>
                            <li>Gestión Ambiental</li>
                            <li>Gestión de Calidad</li>
                            <li>Auditorías</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Contacto</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt text-orange-500 mt-1"></i>
                                <span>Medellín, Colombia</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-phone-alt text-orange-500 mt-1"></i>
                                <span>311 630 0848</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-envelope text-orange-500 mt-1"></i>
                                <span>sipracsiprac@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} SIPRAC. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-orange-500 transition-colors">Tratamiento de Datos</Link>
                        <Link href="/terms" className="hover:text-orange-500 transition-colors">Términos y Condiciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
�!"(b80abb75684d6dc31d813f8591342fb8ad2a41b22rfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/shared/Footer.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac