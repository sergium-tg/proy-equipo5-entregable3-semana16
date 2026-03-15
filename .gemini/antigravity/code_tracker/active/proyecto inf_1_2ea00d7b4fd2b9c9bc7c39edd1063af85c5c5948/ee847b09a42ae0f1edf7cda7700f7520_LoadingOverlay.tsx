ù'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoadingOverlay.module.css';

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
}

export default function LoadingOverlay({ isVisible, message = 'Preparing your experience...' }: LoadingOverlayProps) {
    const [render, setRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) setRender(true);
    }, [isVisible]);

    const onAnimationEnd = () => {
        if (!isVisible) setRender(false);
    };

    if (!render) return null;

    return (
        <div
            className={`${styles.overlay} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
            onAnimationEnd={onAnimationEnd}
        >
            <div className={styles.content}>
                <div className={styles.orbWrapper}>
                    <div className={styles.orb} />
                    <div className={styles.orbInner} />
                </div>

                <div className={styles.loaderWrapper}>
                    <div className={styles.spinner}>
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <h2 className={styles.message}>{message}</h2>
                    <p className={styles.subtext}>Initializing secure environment</p>
                </div>
            </div>
        </div>
    );
}
ù*cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482qfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/LoadingOverlay/LoadingOverlay.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1