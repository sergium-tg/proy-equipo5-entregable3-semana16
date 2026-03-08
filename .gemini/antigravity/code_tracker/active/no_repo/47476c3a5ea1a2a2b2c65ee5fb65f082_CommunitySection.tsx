– 'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CommunitySection.module.css';

interface WidgetProps {
    title: string;
    description: string;
    icon: string;
    colorClass: string;
}

function Widget({ title, description, icon, colorClass }: WidgetProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <div
            ref={cardRef}
            className={styles.card}
            onMouseMove={handleMouseMove}
        >
            <div className={`${styles.iconWrapper} ${styles[colorClass]}`}>
                {icon}
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{description}</p>
        </div>
    );
}

export default function CommunitySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !containerRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate visibility based on how much of the section is in view
            const scrollThreshold = windowHeight * 0.8;
            const isInside = rect.top < scrollThreshold;

            if (isInside && !isVisible) {
                setIsVisible(true);
            }

            // Progressive fade and transform
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.5)));
            containerRef.current.style.opacity = `${progress}`;
            containerRef.current.style.transform = `translateY(${(1 - progress) * 40}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    const widgets = [
        {
            title: "Solved Doubts",
            description: "A collaborative space where developers solve real-world problems. Get help or help others and build your reputation.",
            icon: "üí¨",
            colorClass: "icon_blue",
        },
        {
            title: "Shared Implementations",
            description: "Browse high-quality code snippets and full-scale implementations left by elite developers for the community to use.",
            icon: "üìÇ",
            colorClass: "icon_purple",
        },
        {
            title: "Developer Ratings",
            description: "Build your profile, get rated by your peers, and climb the leaderboard. Your contributions matter here.",
            icon: "‚≠êÔ∏è",
            colorClass: "icon_cyan",
        }
    ];

    return (
        <section ref={sectionRef} className={styles.section} id="community">
            <div ref={containerRef} className={styles.scrollContainer} style={{ opacity: 0, transform: 'translateY(40px)' }}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Developer Community</h2>
                    <p className={styles.subtitle}>
                        More than just a tool‚Äîit's a global hub where developers share,
                        learn, and grow together. Build your legacy in the modern web.
                    </p>
                </header>

                <div className={styles.grid}>
                    {widgets.map((widget, index) => (
                        <Widget key={index} {...widget} />
                    ))}
                </div>
            </div>
        </section>
    );
}
“ *cascade08““*cascade08“–  *cascade082gfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/community/CommunitySection.tsx