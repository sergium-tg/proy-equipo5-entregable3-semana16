©'use client';

import { useState, useEffect } from 'react';
import styles from './HeroTitle.module.css';

const THEMES = ['primary', 'violet', 'cyan'] as const;
type Theme = (typeof THEMES)[number];

const PHRASES = [
    "No passwords stored in plain text. Ever.",
    "End-to-end encryption for every interaction.",
    "Built with security-first architecture.",
    "Seamless integration, maximum protection.",
    "Modern auth for modern developers."
];

/**
 * HeroTitle ‚Äî staggered fade-in with triple-click theme easter egg.
 */
export default function HeroTitle() {
    const [theme, setTheme] = useState<Theme>('primary');
    const [clicks, setClicks] = useState(0);
    const [lastClick, setLastClick] = useState(0);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
                setIsTransitioning(false);
            }, 500); // Wait for fade out
        }, 4000); // Change phrase every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const handleTitleClick = () => {
        const now = Date.now();
        const count = now - lastClick < 500 ? clicks + 1 : 1;
        setClicks(count);
        setLastClick(now);

        if (count >= 3) {
            setTheme((t) => {
                const idx = THEMES.indexOf(t);
                return THEMES[(idx + 1) % THEMES.length];
            });
            setClicks(0);
            // üöÄ Developer easter egg
            if (process.env.NODE_ENV === 'development') {
                console.log('%cüöÄ Theme changed! You found the easter egg.', 'color: #6366f1; font-size: 14px; font-weight: bold;');
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Badge */}
            <div className={`${styles.badge} ${styles[`badge_${theme}`]}`} style={{ animationDelay: '0s' }}>
                <span className={styles.badgeDot} />
                Developer&apos;s Portal
            </div>

            {/* Main heading ‚Äî triple click to change theme */}
            <h1
                className={`${styles.heading} ${styles[`accent_${theme}`]}`}
                onClick={handleTitleClick}
                title="Try triple-clicking üëÄ"
                style={{ animationDelay: '0.15s' }}
            >
                Code.{' '}
                <span className={`${styles.gradient} ${styles[`gradient_${theme}`]}`}>Create.</span>{' '}
                Innovate.
            </h1>

            {/* Sub-heading */}
            <p className={styles.sub} style={{ animationDelay: '0.3s' }}>
                Authentication reimagined for the modern web.
                <br />
                <span className={`${styles.mono} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                    // {PHRASES[phraseIndex]}
                </span>
            </p>
        </div>
    );
}
  *cascade08 +*cascade08+» *cascade08»À*cascade08Àö *cascade08öƒ *cascade08ƒ”*cascade08”’ *cascade08’ﬁ*cascade08ﬁﬂ *cascade08ﬂ*cascade08Ò *cascade08ÒÄ*cascade08ÄÅ *cascade08ÅÉ*cascade08ÉÑ *cascade08Ñ¢*cascade08¢£ *cascade08£¶*cascade08¶´ *cascade08´∞*cascade08∞± *cascade08±º*cascade08ºΩ *cascade08Ω *cascade08 À *cascade08ÀÃ*cascade08ÃÕ *cascade08Õ◊ *cascade08◊‰	*cascade08‰	ı	 *cascade08ı	ˆ	 *cascade08ˆ	˘	*cascade08˘	˙	 *cascade08˙	â
*cascade08â
ä
 *cascade08ä
å
*cascade08å
ï
 *cascade08ï
ö
*cascade08ö
õ
 *cascade08õ
û
*cascade08û
ü
 *cascade08ü
†
*cascade08†
°
 *cascade08°
“
*cascade08“
‘
 *cascade08‘
À*cascade08ÀÃ *cascade08Ã≠*cascade08≠Æ *cascade08Æ°*cascade08°¢ *cascade08¢≠*cascade08≠∞ *cascade08∞«*cascade08«… *cascade08…µ*cascade08µ∂ *cascade08∂–*cascade08–— *cascade08—ã*cascade08ãå *cascade08å√*cascade08√ƒ *cascade08ƒÜ*cascade08Üá *cascade08á±*cascade08±ø *cascade08ø√*cascade08√ƒ *cascade08ƒ≈*cascade08≈∆ *cascade08∆€*cascade08€‹ *cascade08‹‚*cascade08‚„ *cascade08„≈*cascade08≈∆ *cascade08∆…*cascade08…  *cascade08 ”*cascade08”’ *cascade08’û*cascade08ûü *cascade08ü™*cascade08™¨ *cascade08¨∞*cascade08∞± *cascade08±ä*cascade08äç *cascade08ç∞*cascade08∞± *cascade08±∫*cascade08∫ª *cascade08ªø*cascade08ø¿ *cascade08¿Í*cascade08ÍÎ *cascade08ÎÛ*cascade08Ûı *cascade08ı˛*cascade08˛ˇ *cascade08ˇì*cascade08ìï *cascade08ï∞*cascade08∞± *cascade08±Ω*cascade08Ωæ *cascade08æ‹*cascade08‹› *cascade08›√*cascade08√ƒ *cascade08ƒî*cascade08îó *cascade08óË*cascade08ËÈ *cascade08ÈÛ *cascade08Ûˆ*cascade08ˆÉ *cascade08Éè*cascade08èê *cascade08êî*cascade08îï *cascade08ïó*cascade08óò *cascade08òú*cascade08úù *cascade08ù†*cascade08†° *cascade08°ß*cascade08ß™ *cascade08™¨*cascade08¨≠ *cascade08≠±*cascade08±≤ *cascade08≤æ*cascade08æø *cascade08øÕ*cascade08ÕŒ *cascade08Œ⁄*cascade08⁄€ *cascade08€›*cascade08›ﬁ *cascade08ﬁ·*cascade08·‚ *cascade08‚„*cascade08„Â *cascade08Â˜*cascade08˜å *cascade08å© *cascade082ffile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/HeroTitle.tsx