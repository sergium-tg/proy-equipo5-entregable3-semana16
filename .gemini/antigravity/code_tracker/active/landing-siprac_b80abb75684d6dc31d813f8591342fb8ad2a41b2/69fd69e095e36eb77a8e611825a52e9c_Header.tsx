�A"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const controlNavbar = () => {
            // Only hide header on scroll if mobile menu is closed
            if (!isMobileMenuOpen) {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY, isMobileMenuOpen]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Quiénes Somos", href: "/about" },
        { name: "Servicios", href: "/services" },
        { name: "Preguntas", href: "/faq" },
        { name: "Contacto", href: "/contact" },
    ];

    return (
        <>
            <header className={`border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                    {/* Left Section: Mobile Toggle & Logo */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-black hover:text-orange-500 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 md:w-12 md:h-12">
                                <img
                                    src="/images/logo-siprac.jpg"
                                    alt="SIPRAC Logo"
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <span className="font-extrabold text-xl md:text-2xl text-black">SIPRA</span>
                                    <span className="font-extrabold text-xl md:text-2xl text-orange-500">C</span>
                                </div>
                                <span className="hidden md:block text-[10px] text-gray-400 font-bold leading-none uppercase tracking-tighter">
                                    Prevención de Riesgos & Gestión Integral
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-bold transition-all duration-300 hover:text-orange-500 ${isActive ? 'nav-link-active' : 'text-black'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Section: CTA Button (Visible on Mobile too) */}
                    <div className="flex items-center gap-4">
                        <Button asChild className="h-10 px-4 text-xs md:text-sm md:h-11 md:px-8">
                            <Link href="/contact">
                                <span className="md:hidden">Asesoría</span>
                                <span className="hidden md:inline">Solicitar Asesoría</span>
                            </Link>
                        </Button>
                    </div>

                </div>
            </header>

            {/* Mobile Sidebar & Focus Overlay */}
            <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

                {/* Backdrop Blur Focus Effect (The rest of the page gets blurred) */}
                <div
                    className={`absolute inset-0 bg-black/20 backdrop-blur-[8px] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                {/* Sidebar Menu */}
                <div className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-extrabold text-2xl text-black">MENU</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-gray-800 hover:text-orange-500 hover:translate-x-2 transition-all duration-300"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto pt-8 border-t border-gray-100">
                            <Button asChild className="w-full h-14 text-lg">
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    Solicitar Asesoría
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
�A"(b80abb75684d6dc31d813f8591342fb8ad2a41b22rfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/shared/Header.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac