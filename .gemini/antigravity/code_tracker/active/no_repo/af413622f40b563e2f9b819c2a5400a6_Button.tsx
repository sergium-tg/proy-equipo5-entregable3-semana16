‚import styles from './Button.module.css';
import { ButtonProps } from './types';

export default function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    type = 'button',
    onClick,
    disabled,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
        >
            {children}
        </button>
    );
}
‚*cascade082afile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/Button/Button.tsx