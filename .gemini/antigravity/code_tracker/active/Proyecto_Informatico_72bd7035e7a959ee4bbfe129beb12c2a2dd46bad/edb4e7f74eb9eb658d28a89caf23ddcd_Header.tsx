çimport React from "react";
import { Navbar } from "./Navbar";
import { getAuthenticatedUser } from "@/modules/users/users.service";

export async function Header() {
    const user = await getAuthenticatedUser();

    if (!user) return null;

    return (
        <header className="w-full relative z-[100]">
            <Navbar />
        </header>
    );
}
> *cascade08>„*cascade08„‹ *cascade08‹‘*cascade08‘¥ *cascade08¥ò*cascade08òç *cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2xfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/components/shared/Header.tsx:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico