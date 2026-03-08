Âimport { useEffect, useRef, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(handler: () => void): RefObject<T> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [handler]);

    return ref;
}
Â*cascade082Vfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/hooks/useClickOutside.ts