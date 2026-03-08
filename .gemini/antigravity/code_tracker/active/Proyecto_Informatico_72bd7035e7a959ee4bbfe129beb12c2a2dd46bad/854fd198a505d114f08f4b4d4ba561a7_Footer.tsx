è
import React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t border-white/5 bg-[#060714]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
                <div className="space-y-2">
                    <span className="text-white font-black text-2xl tracking-tighter">
                        Dev<span className="text-blue-500">Auth</span>
                    </span>
                    <p className="text-slate-400 text-sm max-w-xs font-medium">
                        Advanced identity protocol for modern infrastructure.
                    </p>
                </div>

                <div className="flex space-x-8 text-sm font-bold text-slate-400">
                    <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </div>

                <div className="text-xs font-black text-slate-600 uppercase tracking-[0.4em]">
                    &copy; 2026 DevAuth Identity
                </div>
            </div>
        </footer>
    );
}
è
 *cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2xfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/components/shared/Footer.tsx:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico