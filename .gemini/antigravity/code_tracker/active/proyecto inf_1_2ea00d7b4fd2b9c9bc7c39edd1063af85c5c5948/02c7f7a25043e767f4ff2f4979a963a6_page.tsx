Í'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/hero/Hero';
import CommunitySection from '@/components/community/CommunitySection';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    // üöÄ Dev log once the portal is mounted
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(
                '%cüöÄ Auth system ready%c  ‚Äî Developer\'s Portal v1.0',
                'background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;',
                'color:#8888aa;',
            );
        }
    }, []);

    return (
        <main>
            <Hero
                onLoginClick={() => router.push('/login')}
                onSignUpClick={() => router.push('/register')}
            />

            <CommunitySection />
        </main>
    );
}
9 *cascade089f*cascade08fœ *cascade08œ˙*cascade08˙  *cascade08 À*cascade08ÀŒ *cascade08Œ‘*cascade08‘◊ *cascade08◊ÿ*cascade08ÿÜ *cascade08Üá*cascade08áà *cascade08àä*cascade08äã *cascade08ãé*cascade08éè *cascade08èê*cascade08êì *cascade08ìî*cascade08îÍ *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482Jfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/page.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1