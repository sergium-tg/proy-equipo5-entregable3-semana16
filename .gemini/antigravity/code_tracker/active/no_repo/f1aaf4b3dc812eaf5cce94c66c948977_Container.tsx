ìimport styles from './Container.module.css';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={`${styles.container} ${className ?? ''}`}>
            {children}
        </div>
    );
}
ì*cascade082gfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/Container/Container.tsx