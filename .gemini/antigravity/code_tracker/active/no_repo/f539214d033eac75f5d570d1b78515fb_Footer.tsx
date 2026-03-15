�import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="nm-flat rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                            Isabella<span className="text-indigo-600">Trejos</span>
                        </h3>
                        <p className="text-gray-500 mt-4 max-w-sm font-medium">
                            Estudiante de Comunicación Social y Periodismo.
                            Universidad Autónoma de Occidente.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex space-x-6">
                            <a href="#" className="nm-soft p-4 rounded-2xl text-gray-500 hover:text-indigo-600 transition-all hover:-translate-y-1">
                                <FaLinkedin className="text-2xl" title="LinkedIn" />
                            </a>
                            <a href="#" className="nm-soft p-4 rounded-2xl text-gray-500 hover:text-indigo-600 transition-all hover:-translate-y-1">
                                <FaInstagram className="text-2xl" title="Instagram" />
                            </a>
                            <a href="#" className="nm-soft p-4 rounded-2xl text-gray-500 hover:text-indigo-600 transition-all hover:-translate-y-1">
                                <FaWhatsapp className="text-2xl" title="WhatsApp" />
                            </a>
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4">
                            © {new Date().getFullYear()} • Hecho con pasion por la comunicacion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
�*cascade082ofile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/layout/Footer.tsx