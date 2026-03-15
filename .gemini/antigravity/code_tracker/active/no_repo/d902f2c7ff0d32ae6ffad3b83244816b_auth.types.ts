©export interface AuthUser {
    id: string;
    username: string;
    email: string;
    role: string;
    rating: number;
    avatarUrl?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export type AuthMode = 'login' | 'register';

export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
}
0 *cascade0804*cascade084K *cascade08K] ]e *cascade08eyy“ *cascade08“«*cascade08«¢ *cascade08¢¦*cascade08¦ú *cascade08úŒ*cascade08Œ¼ *cascade08¼©*cascade082Qfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/types/auth.types.ts