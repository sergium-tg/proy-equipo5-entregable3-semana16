¨'use client';

import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
    password: string;
}

function getStrength(pw: string): { score: number; label: string; color: string } {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { score, label: 'Too weak', color: '#f87171' };
    if (score === 2) return { score, label: 'Weak', color: '#fbbf24' };
    if (score === 3) return { score, label: 'Fair', color: '#facc15' };
    if (score === 4) return { score, label: 'Strong', color: '#34d399' };
    return { score, label: 'Very strong', color: '#10b981' };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    if (!password) return null;
    const { score, label, color } = getStrength(password);

    return (
        <div className={styles.wrapper} aria-live="polite">
            <div className={styles.bars}>
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        className={styles.bar}
                        style={{
                            background: i < score ? color : undefined,
                            opacity: i < score ? 1 : 0.2,
                            transition: `background 0.3s ease ${i * 0.05}s, opacity 0.3s ease ${i * 0.05}s`,
                        }}
                    />
                ))}
            </div>
            <span className={styles.label} style={{ color }}>
                {label}
            </span>
        </div>
    );
}
¨*cascade082mfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/PasswordStrength.tsx