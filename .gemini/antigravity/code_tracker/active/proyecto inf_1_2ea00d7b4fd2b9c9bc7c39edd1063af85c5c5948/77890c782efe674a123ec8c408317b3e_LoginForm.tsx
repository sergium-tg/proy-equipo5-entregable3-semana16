ˇ'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import FormInput from './FormInput';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
    onSuccess?: () => void;
}

interface Errors {
    email?: string;
    password?: string;
    general?: string;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [shakeFields, setShakeFields] = useState<string[]>([]);

    const validate = (): boolean => {
        const errs: Errors = {};
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            setShakeFields(Object.keys(errs));
            setTimeout(() => setShakeFields([]), 500);
        }
        return Object.keys(errs).length === 0;
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await login({ email, password });
            onSuccess?.();
            router.push('/dashboard');
        } catch (err: any) {
            setErrors({ general: err.message || 'Invalid credentials. Please try again.' });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {errors.general && (
                <div className={styles.alert} role="alert">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}>
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {errors.general}
                </div>
            )}

            <FormInput
                id="login-email"
                label="Email address"
                type="email"
                icon="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                shake={shakeFields.includes('email')}
            />

            <FormInput
                id="login-password"
                label="Password"
                type="password"
                icon="lock"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                shake={shakeFields.includes('password')}
            />

            <div className={styles.forgot}>
                <button type="button" className={styles.forgotLink} onClick={() => alert('Forgot password flow ‚Äî TODO')}>
                    Forgot password?
                </button>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                    <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Signing in‚Ä¶
                    </>
                ) : (
                    <>
                        Sign In
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}
8 *cascade088ee†
 *cascade08†
¡
*cascade08¡
Å *cascade08Å®*cascade08®ˇ *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482ffile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/LoginForm.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1