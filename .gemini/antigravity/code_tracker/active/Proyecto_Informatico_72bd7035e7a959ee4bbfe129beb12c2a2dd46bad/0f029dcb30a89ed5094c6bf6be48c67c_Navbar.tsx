å"use client";
import React from "react";
import { FloatingNav } from "../ui/FloatingNavbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export function Navbar() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Snippets",
            link: "/snippets",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Q&A",
            link: "/questions",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];
    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
¸ *cascade08¸»*cascade08»å *cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2ufile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/components/layout/Navbar.tsx:Tfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico