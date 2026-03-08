�export default function Location() {
    const coveragePoints = [
        "Servicio en todo el territorio nacional",
        "Consultorías presenciales y virtuales",
        "Atención a empresas de todos los sectores",
        "Desplazamiento a cualquier ciudad"
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black mb-2">Ubicación</h2>
                    <p className="text-gray-500 text-sm font-medium">Servicio en toda Colombia</p>
                    <div className="w-16 h-1 bg-orange-500 mx-auto mt-6"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center">
                    <div className="flex-1 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-orange-500 mb-8">Área de Cobertura</h3>
                            <ul className="space-y-4">
                                {coveragePoints.map((point, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-700 font-medium">
                                        <i className="fas fa-check text-orange-500 text-sm"></i>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-orange-50 p-8 rounded-xl border-l-4 border-orange-500 max-w-md">
                            <p className="text-black font-bold mb-2">Oficina Principal: <span className="text-gray-600 font-medium">Colombia</span></p>
                            <p className="text-black font-bold">Ciudades de mayor operación: <span className="text-gray-600 font-medium">Bogotá, Medellín, Cali, Barranquilla, Cartagena</span></p>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2038169.8496417725!2d-75.3941865!3d4.570868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a14171a2ec9b%3A0x28038ef06e232924!2sColombia!5e0!3m2!1sen!2sco!4v1706630000000!5m2!1sen!2sco"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación SIPRAC"
                            className="transition-opacity duration-500 hover:opacity-90"
                        ></iframe>

                        {/* Overlay info box that disappears on hover */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-md pointer-events-none group-hover:opacity-0 transition-opacity duration-300 border border-orange-100">
                            <h4 className="text-xs font-black text-orange-500 uppercase tracking-tighter">Sede Principal</h4>
                            <p className="text-[10px] text-gray-500 font-bold">Cobertura Nacional - Colombia</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
�"(b80abb75684d6dc31d813f8591342fb8ad2a41b22ufile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/Location.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac