ğ'use client';

import { useState } from 'react';
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await login({ email, password });
            onSuccess?.();
        } catch {
            setErrors({ general: 'Invalid credentials. Please try again.' });
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
                <button type="button" className={styles.forgotLink} onClick={() => alert('Forgot password flow â€” TODO')}>
                    Forgot password?
                </button>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                    <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Signing inâ€¦
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
8 *cascade088e*cascade08eŠ *cascade08Š*cascade08’ *cascade08’•*cascade08• *cascade08Ÿ*cascade08Ÿ¡ *cascade08¡¢*cascade08¢¤ *cascade08¤¥*cascade08¥§ *cascade08§¨*cascade08¨ª *cascade08ª«*cascade08«® *cascade08®¯*cascade08¯° *cascade08°³*cascade08³´ *cascade08´¸*cascade08¸¾ *cascade08¾Ã*cascade08ÃÄ *cascade08ÄÔ*cascade08ÔÕ *cascade08Õã*cascade08ãä *cascade08äê*cascade08êì *cascade08ìï*cascade08ïğ *cascade08ğø*cascade08øú *cascade08úÿ*cascade08ÿ€ *cascade08€*cascade08‚ *cascade08‚‡*cascade08‡ˆ *cascade08ˆ‰*cascade08‰Š *cascade08Š”*cascade08”– *cascade08– *cascade08 ¡ *cascade08¡®*cascade08®¯ *cascade08¯µ*cascade08µ¶ *cascade08¶»*cascade08»¼ *cascade08¼¾*cascade08¾â *cascade08âÿ*cascade08ÿ *cascade08¹*cascade08¹º *cascade08ºß*cascade08ßà *cascade08àì*cascade08ìí *cascade08íñ*cascade08ñò *cascade08òú*cascade08úû *cascade08û*cascade08‚ *cascade08‚“*cascade08“” *cascade08”•*cascade08•– *cascade08–*cascade08£ *cascade08£¥*cascade08¥¦ *cascade08¦¯*cascade08¯° *cascade08°´*cascade08´µ *cascade08µÉ*cascade08ÉÊ *cascade08ÊË*cascade08ËÌ *cascade08ÌÔ*cascade08ÔÕ *cascade08Õà*cascade08àá *cascade08áæ*cascade08æç *cascade08çè*cascade08èö *cascade08öù*cascade08ùû *cascade08û”*cascade08”• *cascade08•—*cascade08—˜ *cascade08˜¥*cascade08¥¦ *cascade08¦¸*cascade08¸¹ *cascade08¹Õ*cascade08ÕÖ *cascade08ÖÜ*cascade08Üİ *cascade08İŞ*cascade08Şß *cascade08ßë*cascade08ëì *cascade08ì‰*cascade08‰“ *cascade08“±*cascade08±µ *cascade08µÄ*cascade08ÄÆ *cascade08ÆÛ*cascade08ÛÜ *cascade08Üœ*cascade08œ¥ *cascade08¥®*cascade08®¶ *cascade08¶Ò*cascade08ÒÔ *cascade08Ôú*cascade08úû *cascade08û 	*cascade08 	¡	 *cascade08¡	§	*cascade08§	¨	 *cascade08¨	ª	*cascade08ª	®	 *cascade08®	°	*cascade08°	±	 *cascade08±	Ñ	*cascade08Ñ	Ò	 *cascade08Ò	æ	*cascade08æ	
 *cascade08
‡
*cascade08‡
Æ
 *cascade08Æ
ø
*cascade08ø
ù
 *cascade08ù
ş
*cascade08ş
€ *cascade08€‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08Á*cascade08ÁÂ *cascade08ÂÛ*cascade08ÛÜ *cascade08Üß*cascade08ßà *cascade08àå*cascade08åæ *cascade08æè*cascade08èé *cascade08éü*cascade08üı *cascade08ı*cascade08‚ *cascade08‚†*cascade08†‡ *cascade08‡Ÿ*cascade08ŸÃ *cascade08ÃÛ*cascade08Û‹ *cascade08‹Ò*cascade08Ò• *cascade08•*cascade08  *cascade08 ®*cascade08®¯ *cascade08¯·*cascade08·¸ *cascade08¸¾*cascade08¾¿ *cascade08¿Ò*cascade08ÒÓ *cascade08ÓÔ*cascade08ÔÕ *cascade08ÕÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üî *cascade08îğ*cascade08ğñ *cascade08ñõ*cascade08õö *cascade08öù*cascade08ù» *cascade08»Ó*cascade08ÓÖ *cascade08ÖÙ*cascade08ÙÚ *cascade08ÚÜ*cascade08Üİ *cascade08İã*cascade08ãä *cascade08äæ*cascade08æè *cascade08èú*cascade08úû *cascade08ûş*cascade08ş *cascade08Œ*cascade08Œ *cascade08“*cascade08“” *cascade08”—*cascade08—œ *cascade08œ*cascade08¯ *cascade08¯°*cascade08°‚ *cascade08‚ƒ*cascade08ƒ… *cascade08…Š*cascade08Š¼ *cascade08¼Â*cascade08ÂÃ *cascade08ÃÙ*cascade08ÙÚ *cascade08Úã*cascade08ãå *cascade08åæ*cascade08æç *cascade08çè*cascade08èé *cascade08éê*cascade08êí *cascade08í‰*cascade08‰‹ *cascade08‹*cascade08³ *cascade08³Å*cascade08ÅÆ *cascade08ÆÕ*cascade08ÕÖ *cascade08Ö÷*cascade08÷ù *cascade08ùü*cascade08üı *cascade08ıƒ*cascade08ƒ„ *cascade08„†*cascade08†‡ *cascade08‡‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08’*cascade08’” *cascade08”•*cascade08•– *cascade08–›*cascade08›œ *cascade08œ*cascade08Ÿ *cascade08Ÿª*cascade08ª« *cascade08«®*cascade08®¯ *cascade08¯»*cascade08»½ *cascade08½Ó*cascade08ÓÔ *cascade08Ô÷*cascade08÷ø *cascade08ø—*cascade08—˜ *cascade08˜²*cascade08²³ *cascade08³½*cascade08½Æ *cascade08ÆË*cascade08ËÌ *cascade08ÌÏ*cascade08ÏĞ *cascade08ĞÕ*cascade08Õ× *cascade08×Ø*cascade08ØÙ *cascade08ÙÚ*cascade08Úæ *cascade08æ*cascade08 *cascade08–*cascade08–¥ *cascade08¥º*cascade08ºÎ *cascade08ÎĞ*cascade08ĞÑ *cascade08ÑÔ*cascade08ÔÕ *cascade08ÕÚ*cascade08ÚÛ *cascade08Ûó*cascade08óô *cascade08ôû*cascade08ûü *cascade08ü€*cascade08€‚ *cascade08‚ˆ*cascade08ˆ‰ *cascade08‰—*cascade08—˜ *cascade08˜ì*cascade08ìí *cascade08íù*cascade08ùú *cascade08úÿ*cascade08ÿ€ *cascade08€*cascade08 *cascade08“*cascade08“” *cascade08”Ø*cascade08Øê *cascade08ê¤*cascade08¤¦ *cascade08¦Å*cascade08ÅÆ *cascade08ÆÙ*cascade08ÙÚ *cascade08Úî*cascade08îï *cascade08ïù*cascade08ùû *cascade08ûÿ*cascade08ÿ€ *cascade08€Š*cascade08Š‹ *cascade08‹‘*cascade08‘“ *cascade08“·*cascade08·¸ *cascade08¸Á*cascade08ÁÍ *cascade08ÍÔ*cascade08ÔÕ *cascade08Õô*cascade08ôõ *cascade08õĞ*cascade08Ğğ *cascade082ffile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/LoginForm.tsx