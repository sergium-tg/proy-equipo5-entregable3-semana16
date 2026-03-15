Ë'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-surface-3)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div style={{ opacity: 0, animation: 'fadeInUp 0.6s var(--ease-bounce) forwards' }}>
                <header style={{ marginBottom: 'var(--space-8)' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                        Welcome back, <span style={{ color: 'var(--color-primary)' }}>{user.username}</span>!
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                        Here is an overview of your activity and developer stats.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                    {/* Activity Card */}
                    <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>Experience</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>2.4k XP</div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+150 today</p>
                    </div>

                    {/* Stats Card */}
                    <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>Rating</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{user.rating || 5.0}</div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Top 5% Developers</p>
                    </div>

                    {/* Projects Card */}
                    <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>Active Projects</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)' }}>12</div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>4 pending review</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
Ë*cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482Tfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/dashboard/page.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1