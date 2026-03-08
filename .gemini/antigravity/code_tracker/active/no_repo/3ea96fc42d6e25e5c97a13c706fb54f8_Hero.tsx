ÿimport { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import AnimatedBackground from './components/AnimatedBackground';
import HeroTitle from './components/HeroTitle';
import HeroButtons from './components/HeroButtons';

interface HeroProps {
    onLoginClick: () => void;
    onSignUpClick: () => void;
}

/**
 * Hero â€” Full-viewport landing section with animated background.
 * Props trigger the auth overlay from the parent page.
 */
export default function Hero({ onLoginClick, onSignUpClick }: HeroProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const progress = Math.min(scrollY / (viewportHeight * 0.5), 1);

            contentRef.current.style.opacity = `${1 - progress}`;
            contentRef.current.style.transform = `translateY(${progress * -50}px) scale(${1 - progress * 0.05})`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.hero} aria-label="Hero section">
            {/* Animated background layer (z-index: 0) */}
            <AnimatedBackground />

            {/* Content layer (z-index: 1) */}
            <div ref={contentRef} className={styles.content}>
                <HeroTitle />
                <HeroButtons onLogin={onLoginClick} onSignUp={onSignUpClick} />
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollHint} aria-hidden="true">
                <span className={styles.scrollLine} />
                <span className={styles.scrollLabel}>scroll</span>
            </div>
        </section>
    );
}
+*cascade08+ú *cascade08úÔ*cascade08Ôñ *cascade08ñ›*cascade08›Ÿ *cascade08ŸÏ	*cascade08Ï	„
 *cascade08„
ž
*cascade08ž
Ÿ
 *cascade08Ÿ
Ú
*cascade08Ú
þ
 *cascade08þ
®*cascade08®¾ *cascade08¾Ï*cascade08Ï§ *cascade08§×*cascade08×Ø *cascade08ØÎ*cascade08Îÿ *cascade082Vfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/Hero.tsx