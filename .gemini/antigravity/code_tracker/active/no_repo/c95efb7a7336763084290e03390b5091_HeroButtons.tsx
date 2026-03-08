import styles from './HeroButtons.module.css';

interface HeroButtonsProps {
    onLogin: () => void;
    onSignUp: () => void;
}

/**
 * HeroButtons โ€” floating animated CTA buttons with glow effect.
 */
export default function HeroButtons({ onLogin, onSignUp }: HeroButtonsProps) {
    return (
        <div className={styles.wrapper} style={{ animationDelay: '0.45s' }}>
            {/* Primary โ€” Sign In */}
            <button
                className={`${styles.btn} ${styles.primary}`}
                onClick={onLogin}
                aria-label="Abrir formulario de inicio de sesiรณn"
            >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        stroke="currentColor"
                        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M14 12H3"
                    />
                </svg>
                Sign In
            </button>

            {/* Secondary โ€” Create Account */}
            <button
                className={`${styles.btn} ${styles.outline}`}
                onClick={onSignUp}
                aria-label="Abrir formulario de registro"
            >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        stroke="currentColor"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Create Account
            </button>
        </div>
    );
}
 *cascade08*cascade08	 *cascade08	*cascade08 *cascade08*cascade08 *cascade08*cascade08 *cascade08*cascade08  *cascade08 '*cascade08'( *cascade08(1*cascade0813 *cascade0834*cascade0845 *cascade0858*cascade0889 *cascade089>*cascade08>D *cascade08D*cascade08 *cascade08*cascade08” *cascade08”ษ*cascade08ษส *cascade08สอ*cascade08อ๒ *cascade08๒*cascade08ท *cascade08ทา*cascade08าÛ *cascade08ÛÝ*cascade08ÝÞ *cascade08Þๆ*cascade08ๆ์ *cascade08์๑*cascade08๑๓ *cascade08๓€*cascade08€ *cascade08*cascade08 *cascade08*cascade08 *cascade08*cascade08 *cascade08ญ*cascade08ญฏ *cascade08ฏฐ*cascade08ฐฒ *cascade08ฒา*cascade08าำ *cascade08ำี*cascade08ีึ *cascade08ึฺ*cascade08ฺÛ *cascade08Ûเ*cascade08เแ *cascade08แý*cascade08ýþ *cascade08þ*cascade08 *cascade08*cascade08 *cascade08ซ*cascade08ซฌ *cascade08ฌฑ*cascade08ฑฒ *cascade08ฒด*cascade08ดต *cascade08ตธ*cascade08ธน *cascade08นป*cascade08ปฝ *cascade08ฝร*cascade08รล *cascade08ลศ*cascade08ศส *cascade08สห*cascade08หอ *cascade08อโ*cascade08โ๐ *cascade08๐๔*cascade08๔๕ *cascade08๕ü*cascade08üý *cascade08ý*cascade08 *cascade08—*cascade08— *cascade08*cascade08 *cascade08ฐ*cascade08ฐด *cascade08ดบ*cascade08บป *cascade08ปฝ*cascade08ฝพ *cascade08พม*cascade08มย *cascade08ยู*cascade08ูฺ *cascade08ฺ๘*cascade08๘๙ *cascade08๙ý*cascade08ýþ *cascade08þ*cascade08 *cascade08*cascade08… *cascade08…*cascade08 *cascade08ซ*cascade08ซฌ *cascade08ฌฐ*cascade08ฐฑ *cascade08ฑด*cascade08ดต *cascade08ตา*cascade08าิ *cascade08ิุ*cascade08ุู *cascade08ู๛*cascade08๛ü *cascade08üฌ*cascade08ฌญ *cascade08ญฎ*cascade08ฎฏ *cascade08ฏฟ*cascade08ฟม *cascade08มย*cascade08ยศ *cascade08ศ๚*cascade08๚	 *cascade08		*cascade08		 *cascade08		*cascade08		 *cascade08	ส
*cascade08ส
ห
 *cascade08ห
*cascade08 *cascade08*cascade08 *cascade08‘*cascade08‘’ *cascade08’ื*cascade08ืู *cascade08ูฺ*cascade08ฺÜ *cascade08Ü๙*cascade08๙๚ *cascade08๚ÿ*cascade08ÿ *cascade08*cascade08 *cascade08ฌ*cascade08ฌญ *cascade08ญฎ*cascade08ฎฏ *cascade08ฏฯ*cascade08ฯา *cascade08าู*cascade08ูฺ *cascade08ฺน*cascade08นบ *cascade08บะ*cascade08ะั *cascade08ั้*cascade08้๋ *cascade08๋์*cascade08์ *cascade082hfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/HeroButtons.tsx