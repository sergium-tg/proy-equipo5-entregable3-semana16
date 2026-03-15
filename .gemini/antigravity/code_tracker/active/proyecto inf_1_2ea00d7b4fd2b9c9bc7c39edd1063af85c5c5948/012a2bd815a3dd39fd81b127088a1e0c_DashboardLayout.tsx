Ñ'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
        { href: '/dashboard/projects', label: 'Projects', icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
        { href: '/profile', label: 'Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 0 1 0 8 4 4 0 0 1 0-8z' },
    ];

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Link href="/dashboard" className={styles.logo}>
                        <div className={styles.logoDot} />
                        DevPortal
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.activeNavLink : ''}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width={20}
                                height={20}
                            >
                                <path d={item.icon} />
                            </svg>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className={styles.content}>
                <header className={styles.header}>
                    <UserMenu />
                </header>

                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}
Ñ *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482ffile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/dashboard/DashboardLayout.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1