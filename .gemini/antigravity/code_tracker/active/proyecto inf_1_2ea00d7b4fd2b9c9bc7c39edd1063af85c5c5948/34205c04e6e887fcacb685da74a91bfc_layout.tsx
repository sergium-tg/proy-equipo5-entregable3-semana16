™import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
    title: "Developer's Portal â€” Auth Reimagined",
    description:
        'A modern, animated authentication interface built with Next.js and TypeScript. Clean architecture, fluid animations, and senior-quality code.',
    keywords: ['authentication', 'next.js', 'typescript', 'developer'],
    authors: [{ name: 'Developer' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="page-fade-in">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
ó *cascade08óŒ*cascade08Œ™ *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482Lfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/layout.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1