ð"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Experiencia", path: "/experiencia" },
  { name: "GalerÃ­a", path: "/galeria" },
  { name: "Contacto", path: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="nm-flat rounded-full px-6 md:px-10 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl md:text-2xl font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity">
            Isabella<span className="text-indigo-600">Trejos</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2 md:space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3 py-1.5 md:px-5 md:py-2 text-sm font-semibold rounded-full transition-all duration-300",
                  isActive
                    ? "nm-inset text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:nm-soft"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
— *cascade08—ÁÁð *cascade082ofile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/components/layout/Navbar.tsx