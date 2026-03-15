∫='use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.css';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import PasswordStrength from './PasswordStrength';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
    onSuccess?: () => void;
}

interface Errors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    terms?: string;
    general?: string;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const { register, isLoading } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [shakeFields, setShakeFields] = useState<string[]>([]);

    useEffect(() => {
        // Cargar datos persistidos si los hay
        const saved = sessionStorage.getItem('reg_data');
        if (saved) {
            const data = JSON.parse(saved);
            setUsername(data.username || '');
            setEmail(data.email || '');
            setRole(data.role || '');
        }

        // Verificar si acept√≥ en la p√°gina de t√©rminos
        if (sessionStorage.getItem('terms_accepted') === 'true') {
            setAgreed(true);
            sessionStorage.removeItem('terms_accepted');
        }
    }, []);

    const saveToSession = () => {
        sessionStorage.setItem('reg_data', JSON.stringify({ username, email, role }));
    };

    const handleGoToTerms = () => {
        saveToSession();
        router.push('/terms');
    };

    const validate = (): boolean => {
        const errs: Errors = {};
        if (!username.trim()) errs.username = 'Username is required';
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Must be at least 8 characters';
        if (!confirmPassword) errs.confirmPassword = 'Please confirm your password';
        else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
        if (!role) errs.role = 'Please select your developer role';
        if (!agreed) errs.terms = 'You must agree to the terms';
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
            await register({
                username,
                email,
                password,
                confirmPassword,
                role: role.toUpperCase()
            });
            onSuccess?.();
            router.push('/dashboard');
        } catch (err: any) {
            setErrors({ general: err.message || 'Registration failed. Please try again.' });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {errors.general && (
                <div className={styles.alert} role="alert">
                    {errors.general}
                </div>
            )}

            <FormInput
                id="reg-username"
                label="Username"
                type="text"
                icon="user"
                autoComplete="username"
                value={username}
                onChange={setUsername}
                error={errors.username}
                shake={shakeFields.includes('username')}
            />

            <FormInput
                id="reg-email"
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
                id="reg-password"
                label="Password"
                type="password"
                icon="lock"
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                shake={shakeFields.includes('password')}
            />

            <PasswordStrength password={password} />

            <FormInput
                id="reg-confirm"
                label="Confirm password"
                type="password"
                icon="lock"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={errors.confirmPassword}
                shake={shakeFields.includes('confirmPassword')}
            />

            <FormSelect
                id="reg-role"
                label="Developer Role"
                icon="user"
                value={role}
                onChange={setRole}
                options={[
                    { value: 'frontend', label: 'Frontend Developer' },
                    { value: 'backend', label: 'Backend Developer' }
                ]}
                error={errors.role}
                shake={shakeFields.includes('role')}
            />

            {/* Terms checkbox */}
            <label className={`${styles.termsLabel} ${errors.terms ? styles.termsError : ''}`}>
                <span className={styles.checkboxWrapper} onClick={() => setAgreed((v) => !v)}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        aria-label="I agree to the terms and conditions"
                    />
                    <span className={styles.checkboxCustom} aria-hidden="true">
                        {agreed && (
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="2 6 5 9 10 3" />
                            </svg>
                        )}
                    </span>
                </span>
                <span className={styles.termsText}>
                    I agree to the{' '}
                    <button type="button" className={styles.termsLink} onClick={handleGoToTerms}>Terms and Conditions</button>
                    {' '}and Privacy Policy
                </span>
            </label>
            {errors.terms && <p className={styles.termsErrorMsg}>{errors.terms}</p>}

            <button type="submit" className={styles.submitBtn} disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                    <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Creating account‚Ä¶
                    </>
                ) : (
                    <>
                        Create Account
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}
   +*cascade08+C Cp	pò òú*cascade08
ú∑ ∑ª*cascade08
ªƒ ƒ…*cascade08
…Õ Õ‰*cascade08
‰ª ªø*cascade08
ø— —’*cascade08
’› ›·*cascade08
·À ÀÏ*cascade08
ÏÇ Çé*cascade08
éè èó*cascade08
óú ú¨*cascade08
¨≥ ≥√*cascade08
√Õ Õ›*cascade08
›Ó Ó˛*cascade08
˛É É£
£¿ ¿Á*cascade08
Á˙ ˙Ö*cascade08
Ö® ®∑*cascade08
∑• •©*cascade08
©∆ ∆ *cascade08
 ¶ ¶™*cascade08
™« «À*cascade08
ÀÓ ÓÛ*cascade08
Ûñ ñö*cascade08
öÕ Õ—*cascade08
—à6 à6¢6*cascade08
¢6©6 ©6¨6*cascade08
¨6≠6 ≠6≥6*cascade08
≥6¥6 ¥6∑6*cascade08
∑6∫= "(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482ifile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/RegisterForm.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1