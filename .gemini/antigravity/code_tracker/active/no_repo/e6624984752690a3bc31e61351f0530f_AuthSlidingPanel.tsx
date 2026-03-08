ฉ''use client';

import { useState, useEffect } from 'react';
import styles from './AuthSlidingPanel.module.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import { AuthMode } from '@/types/auth.types';

interface AuthSlidingPanelProps {
    initialMode: AuthMode;
    onClose: () => void;
}

/**
 * AuthSlidingPanel โ€” slides in from right with cubic-bezier(0.16, 1, 0.3, 1).
 * Handles mode switching between login and register with smooth transitions.
 */
export default function AuthSlidingPanel({ initialMode, onClose }: AuthSlidingPanelProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [transitioning, setTransitioning] = useState(false);
    const [exitDir, setExitDir] = useState<'up' | 'down'>('up');

    // Sync when parent changes initialMode
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const switchMode = (next: AuthMode) => {
        if (next === mode || transitioning) return;
        setExitDir(next === 'register' ? 'up' : 'down');
        setTransitioning(true);
        setTimeout(() => {
            setMode(next);
            setTransitioning(false);
        }, 280);
    };

    const title = mode === 'login' ? 'Welcome Back' : 'Join Us';
    const subtitle =
        mode === 'login'
            ? 'Sign in to your account to continue'
            : 'Create an account and start building';

    return (
        <aside className={styles.panel}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>โฌก</span>
                        <span className={styles.logoText}>DevPortal</span>
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Cerrar panel de autenticaciรณn"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                d="M18 6 6 18M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className={styles.titleBlock}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>

                {/* Mode tabs */}
                <div className={styles.tabs} role="tablist">
                    <button
                        role="tab"
                        aria-selected={mode === 'login'}
                        className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
                        onClick={() => switchMode('login')}
                    >
                        Sign In
                    </button>
                    <button
                        role="tab"
                        aria-selected={mode === 'register'}
                        className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
                        onClick={() => switchMode('register')}
                    >
                        Register
                    </button>
                    <span
                        className={styles.tabIndicator}
                        style={{ transform: `translateX(${mode === 'register' ? '100%' : '0%'})` }}
                    />
                </div>
            </div>

            {/* Scrollable form area */}
            <div className={styles.body}>
                <div
                    className={`${styles.formSlide} ${transitioning
                            ? exitDir === 'up'
                                ? styles.exitUp
                                : styles.exitDown
                            : styles.enterActive
                        }`}
                >
                    {mode === 'login' ? (
                        <LoginForm onSuccess={onClose} />
                    ) : (
                        <RegisterForm onSuccess={onClose} />
                    )}
                </div>

                <SocialAuth />

                <p className={styles.switchText}>
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    {' '}
                    <button
                        className={styles.switchLink}
                        onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                    >
                        {mode === 'login' ? 'Register' : 'Sign in'}
                    </button>
                </p>
            </div>
        </aside>
    );
}
 *cascade08C*cascade08C *cascade08ท*cascade08ทÞ *cascade08Þๆ*cascade08ๆ๋ *cascade08๋ü*cascade08üþ *cascade08þข*cascade08ขฃ *cascade08ฃด*cascade08ดท *cascade08ทป*cascade08ปฝ *cascade08ฝพ*cascade08พฟ *cascade08ฟร*cascade08รล *cascade08ลั*cascade08ัำ *cascade08ำู*cascade08ูฺ *cascade08ฺÜ*cascade08ÜÝ *cascade08Ýแ*cascade08แโ *cascade08โๆ*cascade08ๆ็ *cascade08็๋*cascade08๋์ *cascade08์๒*cascade08๒๕ *cascade08๕๛*cascade08๛ü *cascade08üý*cascade08ý€ *cascade08€*cascade08 *cascade08*cascade08 *cascade08‘*cascade08‘ *cascade08*cascade08  *cascade08 ฃ*cascade08ฃค *cascade08คฌ*cascade08ฌญ *cascade08ญท*cascade08ทธ *cascade08ธพ*cascade08พฟ *cascade08ฟฦ*cascade08ฦว *cascade08วฯ*cascade08ฯะ *cascade08ะ๏*cascade08๏๗ *cascade08๗๙*cascade08๙๛ *cascade08๛*cascade08’ *cascade08’ฎ*cascade08ฎฐ *cascade08ฐพ*cascade08พฟ *cascade08ฟร*cascade08รฤ *cascade08ฤฬ*cascade08ฬอ *cascade08อฯ*cascade08ฯั *cascade08ั*cascade08 *cascade08*cascade08 *cascade08ฝ*cascade08ฝพ *cascade08พฤ*cascade08ฤล *cascade08ลๅ*cascade08ๅๆ *cascade08ๆ่*cascade08่๊ *cascade08๊๛*cascade08๛ý *cascade08ý*cascade08 *cascade08ฉ*cascade08ฉซ *cascade08ซฒ*cascade08ฒณ *cascade08ณป*cascade08ปผ *cascade08ผฮ*cascade08ฮฯ *cascade08ฯา*cascade08าำ *cascade08ำึ*cascade08ึื *cascade08ืÛ*cascade08ÛÜ *cascade08Üโ*cascade08โใ *cascade08ใ็*cascade08็์ *cascade08์ÿ*cascade08ÿ€ *cascade08€*cascade08 *cascade08*cascade08ก *cascade08กจ*cascade08จฉ *cascade08ฉด*cascade08ดต *cascade08ตฝ*cascade08ฝพ *cascade08พฦ*cascade08ฦว *cascade08ว๗*cascade08๗๘ *cascade08๘€	*cascade08€		 *cascade08		*cascade08	…	 *cascade08…	“	*cascade08“	”	 *cascade08”	ฎ	*cascade08ฎ	ฒ	 *cascade08ฒ	ห	*cascade08ห	อ	 *cascade08อ	ี	*cascade08ี	ึ	 *cascade08ึ	Û	*cascade08Û	Ü	 *cascade08Ü	่	*cascade08่	๊	 *cascade08๊	ý	*cascade08ý	ÿ	 *cascade08ÿ	 
*cascade08 
ก
 *cascade08ก
ข
*cascade08ข
ฃ
 *cascade08ฃ
ค
*cascade08ค
ฆ
 *cascade08ฆ
ฌ
*cascade08ฌ
ฎ
 *cascade08ฎ
ฤ
*cascade08ฤ
ล
 *cascade08ล
ฦ
*cascade08ฦ
ว
 *cascade08ว
ษ
*cascade08ษ
ส
 *cascade08ส
ุ
*cascade08ุ
ู
 *cascade08ู
ใ
*cascade08ใ
ๅ
 *cascade08ๅ
๘
*cascade08๘
๙
 *cascade08๙
*cascade08 *cascade08*cascade08 *cascade08*cascade08 *cascade08ซ*cascade08ซฌ *cascade08ฌท*cascade08ทธ *cascade08ธภ*cascade08ภม *cascade08มล*cascade08ลฦ *cascade08ฦั*cascade08ั่ *cascade08่ฐ*cascade08ฐฦ *cascade08ฦฮ*cascade08ฮั *cascade08ัฺ*cascade08ฺÛ *cascade08Ûเ*cascade08เแ *cascade08แ์*cascade08์๎ *cascade08๎๘*cascade08๘๙ *cascade08๙็*cascade08็๚ *cascade08๚’*cascade08’ฎ *cascade08ฎฦ*cascade08ฦุ *cascade08ุ๐*cascade08๐ *cascade08*cascade08 *cascade08ฑ*cascade08ฑฒ *cascade08ฒั*cascade08ั็ *cascade08็*cascade08 *cascade08ม*cascade08มย *cascade08ย*cascade08‘ *cascade08‘*cascade08 *cascade08ก*cascade08กข *cascade08ขฅ*cascade08ฅธ *cascade08ธณ*cascade08ณฮ *cascade08ฮฎ*cascade08ฎไ *cascade08ไๅ*cascade08ๅๆ *cascade08ๆ่*cascade08่๖ *cascade08๖๘*cascade08๘ *cascade08*cascade08 *cascade08ฃ*cascade08ฃฒ *cascade08ฒถ*cascade08ถÜ *cascade08Ü฿*cascade08฿เ *cascade08เแ*cascade08แโ *cascade08โๆ*cascade08ๆ่ *cascade08่์*cascade08์– *cascade08–*cascade08ข *cascade08ข…*cascade08…า *cascade08าำ*cascade08ำิ *cascade08ิึ*cascade08ึ๘ *cascade08๘ü*cascade08ü *cascade08‘*cascade08‘ฃ *cascade08ฃง*cascade08งอ *cascade08อั*cascade08ัื *cascade08ืุ*cascade08ุฺ *cascade08ฺÞ*cascade08Þ๘ *cascade08๘ษ*cascade08ษ้ *cascade08้ฆ*cascade08ฆผ *cascade08ผ*cascade08… *cascade08…–*cascade08– *cascade08ฝ*cascade08ฝพ *cascade08พฟ*cascade08ฟภ *cascade08ภซ *cascade08ซ ฌ  *cascade08ฌ ี *cascade08ี ื  *cascade08ื ๖ *cascade08๖ ๗  *cascade08๗ !*cascade08!! *cascade08!!*cascade08!! *cascade08! !*cascade08 !ด! *cascade08ด!ฮ!*cascade08ฮ!ู! *cascade08ู!ํ!*cascade08ํ!๏! *cascade08๏!…"*cascade08…"" *cascade08"ข"*cascade08ข"ฐ" *cascade08ฐ"ฤ"*cascade08ฤ"ฦ" *cascade08ฦ"Ü"*cascade08Ü"Þ" *cascade08Þ"โ"*cascade08โ"๔" *cascade08๔"๕"*cascade08๕"# *cascade08##*cascade08#•# *cascade08•#€'*cascade08€'' *cascade08''*cascade08'ฉ' *cascade082bfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/AuthSlidingPanel.tsx