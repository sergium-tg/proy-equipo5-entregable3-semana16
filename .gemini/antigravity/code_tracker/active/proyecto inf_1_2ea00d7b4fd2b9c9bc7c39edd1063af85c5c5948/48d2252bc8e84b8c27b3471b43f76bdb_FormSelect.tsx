Ó'use client';

import { useState } from 'react';
import styles from './FormSelect.module.css';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    error?: string;
    icon?: 'user' | 'none';
    shake?: boolean;
}

export default function FormSelect({
    id,
    label,
    value,
    onChange,
    options,
    error,
    icon = 'none',
    shake = false,
}: FormSelectProps) {
    const [focused, setFocused] = useState(false);

    const isLifted = focused || Boolean(value);

    return (
        <div className={`${styles.wrapper} ${shake ? styles.shake : ''}`}>
            <div
                className={`${styles.inputBox} ${focused ? styles.focused : ''} ${error ? styles.errored : ''}`}
            >
                {icon === 'user' && (
                    <span className={`${styles.icon} ${focused ? styles.iconFocused : ''}`} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </span>
                )}

                <div className={`${styles.field} ${icon !== 'none' ? styles.hasIcon : ''}`}>
                    <label
                        htmlFor={id}
                        className={`${styles.label} ${isLifted ? styles.labelLifted : ''} ${focused ? styles.labelFocused : ''}`}
                    >
                        {label}
                    </label>
                    <select
                        id={id}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={styles.select}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? `${id}-error` : undefined}
                    >
                        <option value="" disabled hidden></option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <span className={styles.arrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
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
Ó"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482gfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/FormSelect.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1