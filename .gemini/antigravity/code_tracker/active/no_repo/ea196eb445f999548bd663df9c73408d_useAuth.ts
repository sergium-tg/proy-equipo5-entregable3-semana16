½'use client';

import { useState, useCallback } from 'react';
import { AuthUser, LoginCredentials, RegisterData } from '@/types/auth.types';

interface UseAuthReturn {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        // ğŸš€ Dev log â€” runs once on first render
    }

    const login = useCallback(async (credentials: LoginCredentials) => {
        setLoading(true);
        setError(null);
        try {
            // TODO: replace with real API call / Supabase
            await new Promise<void>((resolve) => setTimeout(resolve, 1000));
            setUser({ id: '1', name: 'Developer', email: credentials.email });
            console.log('%câœ… Login successful', 'color: #34d399; font-weight: bold;');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Login failed';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData) => {
        setLoading(true);
        setError(null);
        try {
            // TODO: replace with real API call / Supabase
            await new Promise<void>((resolve) => setTimeout(resolve, 1200));
            setUser({ id: '2', name: data.name, email: data.email });
            console.log('%cğŸš€ Account created!', 'color: #6366f1; font-weight: bold;');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Registration failed';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    return { user, isLoading, error, login, register, logout };
}
  *cascade08 -*cascade08-ƒ *cascade08ƒƒ*cascade08ƒá *cascade08áñ*cascade08ñÿ *cascade08ÿ‹*cascade08‹‹ *cascade08‹”*cascade08”– *cascade08–˜*cascade08˜™ *cascade08™š*cascade08š› *cascade08› *cascade08 ¢ *cascade08¢§*cascade08§¨ *cascade08¨¬*cascade08¬® *cascade08®¯*cascade08¯° *cascade08°Ã*cascade08ÃÄ *cascade08ÄÒ*cascade08ÒÓ *cascade08ÓŞ*cascade08Şß *cascade08ßá*cascade08áâ *cascade08âê*cascade08êë *cascade08ëª*cascade08ª« *cascade08«²*cascade08²³ *cascade08³¿*cascade08¿À *cascade08ÀÁ*cascade08ÁÂ *cascade08ÂÃ*cascade08ÃÄ *cascade08ÄÌ*cascade08Ìæ *cascade08æí*cascade08íñ *cascade08ñü*cascade08üÿ *cascade08ÿ€	*cascade08€		 *cascade08	„	*cascade08„	…	 *cascade08…	Š	*cascade08Š	‹	 *cascade08‹	’	*cascade08’	”	 *cascade08”	—	*cascade08—	˜	 *cascade08˜	Ÿ	*cascade08Ÿ	 	 *cascade08 	£	*cascade08£	Ê	 *cascade08Ê	Í	*cascade08Í	Ï	 *cascade08Ï	×	*cascade08×	Ù	 *cascade08Ù	â	*cascade08â	ã	 *cascade08ã	å	*cascade08å	ë	 *cascade08ë	õ	*cascade08õ	ö	 *cascade08ö	ú	*cascade08ú	û	 *cascade08û	ÿ	*cascade08ÿ	
 *cascade08
„
*cascade08„
…
 *cascade08…
–
*cascade08–
™
 *cascade08™
¡
*cascade08¡
¢
 *cascade08¢
£
*cascade08£
¦
 *cascade08¦
½
*cascade08½
ÿ
 *cascade08ÿ
„*cascade08„œ *cascade08œ¨*cascade08¨ *cascade08¦*cascade08¦¨ *cascade08¨ª*cascade08ª« *cascade08«¬*cascade08¬­ *cascade08­²*cascade08²´ *cascade08´¹*cascade08¹º *cascade08º¾*cascade08¾À *cascade08ÀÁ*cascade08ÁÂ *cascade08ÂÕ*cascade08ÕÖ *cascade08Öä*cascade08äå *cascade08åğ*cascade08ğñ *cascade08ñó*cascade08óô *cascade08ôü*cascade08üı *cascade08ı°*cascade08°± *cascade08±¶*cascade08¶· *cascade08·Ì*cascade08ÌÍ *cascade08ÍÕ*cascade08Õï *cascade08ïÿ*cascade08ÿ *cascade08‚*cascade08‚„ *cascade08„†*cascade08†‰ *cascade08‰*cascade08 *cascade08­*cascade08­Ô *cascade08Ô×*cascade08×Ø *cascade08Øà*cascade08àã *cascade08ãì*cascade08ìí *cascade08íï*cascade08ïõ *cascade08õö*cascade08ö÷ *cascade08÷ù*cascade08ùú *cascade08úü*cascade08üı *cascade08ıÿ*cascade08ÿ€ *cascade08€Œ*cascade08Œ *cascade08’*cascade08’“ *cascade08“–*cascade08–— *cascade08—¡*cascade08¡¢ *cascade08¢©*cascade08©« *cascade08«´*cascade08´· *cascade08·Î*cascade08Î *cascade08•*cascade08•« *cascade08«·*cascade08·Ö *cascade08Öî*cascade08îó *cascade08óø*cascade08ø½ *cascade082Nfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/hooks/useAuth.ts