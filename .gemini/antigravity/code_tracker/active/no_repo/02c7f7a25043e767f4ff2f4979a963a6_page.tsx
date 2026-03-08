¿
'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/hero/Hero';
import CommunitySection from '@/components/community/CommunitySection';
import AuthOverlay from '@/components/auth/AuthOverlay';
import { AuthMode } from '@/types/auth.types';

export default function Home() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('login');

    const openAuth = (mode: AuthMode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    // ðŸš€ Dev log once the portal is mounted
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(
                '%cðŸš€ Auth system ready%c  â€” Developer\'s Portal v1.0',
                'background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;',
                'color:#8888aa;',
            );
        }
    }, []);

    return (
        <main>
            <Hero
                onLoginClick={() => openAuth('login')}
                onSignUpClick={() => openAuth('register')}
            />

            <CommunitySection />

            <AuthOverlay
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialMode={authMode}
            />
        </main>
    );
}
<*cascade08<n *cascade08n¶¶è *cascade08è—*cascade08—» *cascade08»‘*cascade08‘’ *cascade08’“*cascade08“” *cascade08”¸*cascade08¸¹ *cascade08¹È*cascade08ÈÉ *cascade08Éñ*cascade08ñò *cascade08òù*cascade08ùú *cascade08úš*cascade08š› *cascade08›±*cascade08±· *cascade08·Á*cascade08ÁÈ *cascade08ÈÉ*cascade08ÉÏ *cascade08ÏÔ*cascade08ÔÙ *cascade08Ù×*cascade08×Û *cascade08Ûñ *cascade08ñò*cascade08òþ *cascade08þ	*cascade08	‡	 *cascade08‡	Š	*cascade08Š	–	 *cascade08–	¢
*cascade08¢
¦
 *cascade08¦
ª
*cascade08ª
¶
 *cascade08¶
¸
*cascade08¸
¿
 *cascade082Jfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/page.tsx