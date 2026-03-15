¿'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/components/LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Log in to continue your developer journey</p>
                </header>

                <LoginForm />

                <footer className={styles.footer}>
                    Don't have an account? <button onClick={() => router.push('/register')} className={styles.link}>Sign Up</button>
                    <div className={styles.backHome}>
                        <button onClick={() => router.push('/')} className={styles.link}>‚Üê Back to Home</button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
¿*cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482[file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/%28auth%29/login/page.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1