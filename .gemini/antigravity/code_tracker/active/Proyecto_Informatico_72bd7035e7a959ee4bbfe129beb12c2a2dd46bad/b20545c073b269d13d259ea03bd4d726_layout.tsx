ะ	import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { InitialLoader } from "@/components/ui/InitialLoader";
import { getAuthenticatedUser } from "@/modules/users/users.service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DevAuth | Advanced Identity",
    description: "Sistema de autenticaciรณn y gestiรณn de identidad para desarrolladores.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getAuthenticatedUser();

    return (
        <html lang="es" className="scroll-smooth">
            <body className={`${inter.className} bg-[#060714] text-slate-200 min-h-screen flex flex-col`}>
                <InitialLoader>
                    <Header />
                    <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden">
                        {children}
                    </main>
                    <Footer />
                </InitialLoader>
            </body>
        </html>
    );
}
P *cascade08PW *cascade08Wq qs*cascade08	s “*cascade08
“” ”–*cascade08
–ค คฆ *cascade08ฆซ*cascade08ซต *cascade08ตถ*cascade08ถย *cascade08ยศ*cascade08ศษ *cascade08ษฮ*cascade08ฮั *cascade08ัา *cascade08าÛ *cascade08Ûุ *cascade08ุถ *cascade08ถท*cascade08ทธ *cascade08ธป*cascade08ปผ *cascade08ผฝ*cascade08ฝพ *cascade08พฤ*cascade08ฤฦ *cascade08ฦศ*cascade08ศั *cascade08ัๆ *cascade08ๆ๊*cascade08๊๋ *cascade08๋๎*cascade08๎๏*cascade08๏๐*cascade08๐๑ *cascade08๑๔ *cascade08๔๕ *cascade08๕๖*cascade08๖๘ *cascade08๘๙*cascade08๙๚ *cascade08๚๛*cascade08๛ü *cascade08üþ*cascade08þ *cascade08*cascade08 *cascade08*cascade08 *cascade08 *cascade08 *cascade08’*cascade08’“ *cascade08“—*cascade08— *cascade08 *cascade08*cascade08 *cascade08  *cascade08 ก*cascade08กข *cascade08ขง*cascade08งจ *cascade08จช*cascade08ชญ *cascade08ญร *cascade08รษ*cascade08ษ– *cascade08–ฦ*cascade08ฦ๊ *cascade08๊*cascade08ฃ *cascade08ฃฆ*cascade08ฆถ *cascade08ถท *cascade08ทฝ *cascade08ฝพ*cascade08พฟ *cascade08ฟภ*cascade08ภม *cascade08มย*cascade08ยฤ *cascade08ฤล *cascade08ลว*cascade08วส *cascade08สห*cascade08หอ *cascade08อฮ*cascade08ฮฯ *cascade08ฯะ*cascade08ะา *cascade08าํ*cascade08ํ๏ *cascade08๏ *cascade08
ฆ ฆจ*cascade08
จฉ ฉซ*cascade08
ซล ลี *cascade08ีู*cascade08ูฺ *cascade08ฺ่*cascade08่้ *cascade08้๑*cascade08๑๒ *cascade08๒๓*cascade08๓๕ *cascade08๕*cascade08… *cascade08…*cascade08 *cascade08ธ *cascade08ธผ*cascade08ผื *cascade08ืÛ*cascade08Ûแ *cascade08แก	ก	ะ	 *cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2jfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/app/layout.tsx:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico