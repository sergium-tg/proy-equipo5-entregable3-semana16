Û'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

/**
 * Animated background ‚Äî CSS orb layers + canvas star field.
 * No external dependencies, pure CSS + lightweight canvas.
 */
export default function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const progress = Math.min(scrollY / viewportHeight, 1);

            containerRef.current.style.setProperty('--scroll-y', `${scrollY}px`);
            containerRef.current.style.setProperty('--scroll-progress', `${progress}`);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Generate stars
        const STAR_COUNT = 120;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            opacity: Math.random(),
            speed: Math.random() * 0.008 + 0.002,
            phase: Math.random() * Math.PI * 2,
        }));

        let frame = 0;
        let animId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            stars.forEach((s) => {
                const alpha = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(s.phase + frame * s.speed));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 255, ${alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.bg} aria-hidden="true" style={{ '--scroll-y': '0px', '--scroll-progress': '0' } as any}>
            {/* CSS animated orbs with parallax wrappers */}
            <div className={styles.parallaxWrapper} style={{ '--parallax-speed': '-0.15' } as any}>
                <div className={styles.orb1} />
            </div>
            <div className={styles.parallaxWrapper} style={{ '--parallax-speed': '0.25' } as any}>
                <div className={styles.orb2} />
            </div>
            <div className={styles.parallaxWrapper} style={{ '--parallax-speed': '0.1' } as any}>
                <div className={styles.orb3} />
            </div>
            {/* Star field canvas */}
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* Noise overlay for depth */}
            <div className={styles.noise} />
        </div>
    );
}
 *cascade08Ù*cascade08Ùß *cascade08ßÆ *cascade08ÆÂ*cascade08Âé *cascade08é∑ *cascade08∑≥*cascade08≥Ú *cascade08Ú *cascade08 ¯ *cascade08¯— *cascade08—◊ *cascade08◊€*cascade08€‹ *cascade08‹˛*cascade08˛ˇ *cascade08ˇÖ	*cascade08Ö	è	 *cascade08è	ø	*cascade08ø	Ã	 *cascade08Ã	Õ	*cascade08Õ	Œ	 *cascade08Œ	Ê	*cascade08Ê	Á	 *cascade08Á	Ë	*cascade08Ë	È	 *cascade08È	˚	*cascade08˚	¸	 *cascade08¸	Å
*cascade08Å
Ç
 *cascade08Ç
É
*cascade08É
Ñ
 *cascade08Ñ
ç
*cascade08ç
é
 *cascade08é
∆
*cascade08∆
«
 *cascade08«
œ
*cascade08œ
“
 *cascade08“
Ÿ
*cascade08Ÿ
⁄
 *cascade08⁄
›
*cascade08›
ﬁ
 *cascade08ﬁ
Ó
*cascade08Ó
˜
 *cascade08˜
â*cascade08âç *cascade08çî*cascade08îñ *cascade08ñ√*cascade08√ƒ *cascade08ƒÃ*cascade08ÃŒ *cascade08ŒÂ*cascade08ÂÊ *cascade08ÊÈ*cascade08È˜ *cascade08˜˘*cascade08˘˙ *cascade08˙á*cascade08áà *cascade08àâ*cascade08âä *cascade08äò*cascade08òô *cascade08ô∞*cascade08∞± *cascade08±º*cascade08ºΩ *cascade08Ω¿*cascade08¿¡ *cascade08¡√*cascade08√ƒ *cascade08ƒÄ*cascade08ÄÅ *cascade08Åé*cascade08éè *cascade08èÆ*cascade08ÆØ *cascade08Ø¥*cascade08¥µ *cascade08µ‘*cascade08‘÷ *cascade08÷‚*cascade08‚„ *cascade08„å*cascade08åç *cascade08çé*cascade08éè *cascade08èî*cascade08îï *cascade08ïö*cascade08ö£ *cascade08£∏*cascade08∏¿ *cascade08¿¬*cascade08¬ƒ *cascade08ƒÁ*cascade08ÁË *cascade08ËÌ*cascade08ÌÓ *cascade08ÓÒ*cascade08ÒÙ *cascade08Ùí*cascade08íü *cascade08ü©*cascade08©≠ *cascade08≠ﬁ*cascade08ﬁﬂ *cascade08ﬂ¶*cascade08¶ß *cascade08ß¿*cascade08¿¡ *cascade08¡ﬁ*cascade08ﬁﬂ *cascade08ﬂÚ*cascade08Úı *cascade08ıÉ*cascade08Éî *cascade08îß*cascade08ß© *cascade08©’*cascade08’÷ *cascade08÷ˇ*cascade08ˇÄ *cascade08ÄÉ*cascade08ÉÖ *cascade08Öî*cascade08îï *cascade08ïñ*cascade08ñó *cascade08óõ*cascade08õú *cascade08úü*cascade08ü† *cascade08†π*cascade08π∫ *cascade08∫…*cascade08…  *cascade08 Á*cascade08ÁË *cascade08ËÛ*cascade08Ûˆ *cascade08ˆ˛*cascade08˛ˇ *cascade08ˇÅ*cascade08ÅÇ *cascade08Çá*cascade08áâ *cascade08âü*cascade08ü† *cascade08†Æ*cascade08ÆØ *cascade08Ø≤*cascade08≤≥ *cascade08≥Ó*cascade08ÓÅ*cascade08ÅÉ *cascade08Éò*cascade08òô *cascade08ôõ*cascade08õú *cascade08ú•*cascade08•¶ *cascade08¶© *cascade08©∆ *cascade08∆«*cascade08«» *cascade08»À*cascade08Àœ *cascade08œ“*cascade08“‘ *cascade08‘◊*cascade08◊Ÿ *cascade08ŸÈ*cascade08ÈÍ *cascade08ÍÇ *cascade08ÇÖ *cascade08Öä*cascade08äã *cascade08ãé *cascade08é•*cascade08•« *cascade08«» *cascade08»Ã *cascade08Ã¥*cascade08¥ª *cascade08ªŒ*cascade08Œ€ *cascade08€‹ *cascade08‹ﬂ*cascade08ﬂ‡ *cascade08‡„*cascade08„‰ *cascade08‰Û *cascade08Û⁄*cascade08⁄€ *cascade08€‹ *cascade08‹· *cascade08·Ù*cascade08Ùá *cascade08áà *cascade08àô*cascade08ôˇ*cascade08ˇÄ *cascade08ÄÜ *cascade08Üô*cascade08ô≥ *cascade08≥¥ *cascade08¥’*cascade08’÷ *cascade08÷ﬂ*cascade08ﬂ‡ *cascade08‡·*cascade08·‚ *cascade08‚Â*cascade08ÂÊ *cascade08Ê˘*cascade08˘˙ *cascade08˙˚*cascade08˚¸ *cascade08¸õ*cascade08õú *cascade08úû*cascade08ûü *cascade08ü≠*cascade08≠∫ *cascade08∫÷*cascade08÷◊ *cascade08◊⁄*cascade08⁄„ *cascade08„‰*cascade08‰Â *cascade08ÂË*cascade08ËÛ *cascade082ofile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/AnimatedBackground.tsx