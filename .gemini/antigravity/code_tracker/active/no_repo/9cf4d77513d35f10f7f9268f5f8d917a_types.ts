‚import { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}
‚*cascade082_file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/Button/types.ts