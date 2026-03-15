¡''use client';

import React, { useState } from 'react';
import styles from './FormInput.module.css';

type IconType = 'user' | 'email' | 'lock' | 'none';

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    icon?: IconType;
    autoComplete?: string;
    shake?: boolean;
}

const icons: Record<IconType, React.JSX.Element> = {
    user: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
    ),
    email: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
        </svg>
    ),
    lock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
    ),
    none: <></>,
};

export default function FormInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    icon = 'none',
    autoComplete,
    shake = false,
}: FormInputProps) {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isLifted = focused || Boolean(value);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`${styles.wrapper} ${shake ? styles.shake : ''}`}>
            <div
                className={`${styles.inputBox} ${focused ? styles.focused : ''} ${error ? styles.errored : ''}`}
            >
                {icon !== 'none' && (
                    <span className={`${styles.icon} ${focused ? styles.iconFocused : ''}`} aria-hidden="true">
                        {icons[icon]}
                    </span>
                )}

                <div className={`${styles.field} ${icon !== 'none' ? styles.hasIcon : ''}`}>
                    <label
                        htmlFor={id}
                        className={`${styles.label} ${isLifted ? styles.labelLifted : ''} ${focused ? styles.labelFocused : ''}`}
                    >
                        {label}
                    </label>
                    <input
                        id={id}
                        type={inputType}
                        value={value}
                        placeholder={focused && placeholder ? placeholder : ''}
                        autoComplete={autoComplete}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={styles.input}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? `${id}-error` : undefined}
                    />
                </div>

                {type === 'password' && (
                    <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Ocultar contraseÃ±a' : 'Mostrar contraseÃ±a'}
                    >
                        {showPassword ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className={styles.errorMsg} role="alert">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={12} height={12}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
 *cascade08	º ºÀ*cascade08
À¡' "(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482ffile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/FormInput.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1