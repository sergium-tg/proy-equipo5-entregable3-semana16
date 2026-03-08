Œ	"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../../../frontend/components/LoadingScreen";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await fetch("/api/users/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                // Redirigir a login despu√©s de un breve delay para que se vea el logout
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
        };

        performLogout();
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <LoadingScreen />
            <div className="z-10 text-center">
                <h2 className="text-white/60 text-lg animate-pulse">Cerrando sesi√≥n...</h2>
            </div>
        </div>
    );
}
Œ	*cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2lfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/app/logout/page.tsx:Tfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico