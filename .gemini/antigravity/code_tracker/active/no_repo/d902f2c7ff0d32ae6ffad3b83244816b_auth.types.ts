Èexport interface AuthUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type AuthMode = 'login' | 'register';

export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
}
i *cascade08iÅ*cascade08Å¸ *cascade08¸È*cascade082Qfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/types/auth.types.ts