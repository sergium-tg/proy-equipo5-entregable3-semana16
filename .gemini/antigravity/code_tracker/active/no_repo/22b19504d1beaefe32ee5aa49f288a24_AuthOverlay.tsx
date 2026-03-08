­'use client';

import { useEffect, useCallback } from 'react';
import styles from './AuthOverlay.module.css';
import AuthSlidingPanel from './AuthSlidingPanel';
import { useClickOutside } from '@/hooks/useClickOutside';
import { AuthMode } from '@/types/auth.types';

interface AuthOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: AuthMode;
}

/**
 * AuthOverlay â€” full-screen backdrop with blur.
 * Handles: ESC key, click-outside, and renders the sliding panel.
 */
export default function AuthOverlay({ isOpen, onClose, initialMode }: AuthOverlayProps) {
    // Close on ESC
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    // Click-outside closes only the panel (not the backdrop)
    const panelRef = useClickOutside<HTMLDivElement>(onClose);

    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Authentication">
            <div ref={panelRef} className={styles.panelWrapper}>
                <AuthSlidingPanel initialMode={initialMode} onClose={onClose} />
            </div>
        </div>
    );
}
 *cascade08 *cascade08 ! *cascade08!%*cascade08%& *cascade08&.*cascade08.< *cascade08<k*cascade08kÜ *cascade08ÜÞ*cascade08Þã *cascade08ãë*cascade08ëí *cascade08íð*cascade08ðñ *cascade08ñþ*cascade08þ *cascade08ƒ*cascade08ƒ„ *cascade08„Œ*cascade08ŒŽ *cascade08Ž•*cascade08•¡ *cascade08¡¦*cascade08¦³ *cascade08³´*cascade08´µ *cascade08µ¹*cascade08¹º *cascade08º»*cascade08»¼ *cascade08¼À*cascade08ÀÂ *cascade08ÂÇ*cascade08ÇÉ *cascade08ÉË*cascade08ËÍ *cascade08ÍÕ*cascade08ÕÛ *cascade08ÛÜ*cascade08ÜÝ *cascade08ÝÞ*cascade08Þß *cascade08ßã*cascade08ãæ *cascade08æç*cascade08çè *cascade08èê*cascade08êë *cascade08ëì*cascade08ìð *cascade08ðù*cascade08ùú *cascade08úû*cascade08ûü *cascade08üý*cascade08ýÿ *cascade08ÿ‚*cascade08‚ƒ *cascade08ƒ„*cascade08„… *cascade08…‡*cascade08‡ˆ *cascade08ˆ‹*cascade08‹Œ *cascade08Œ“*cascade08“˜ *cascade08˜š*cascade08š› *cascade08›ž*cascade08žŸ *cascade08Ÿ£*cascade08£¤ *cascade08¤¥*cascade08¥¦ *cascade08¦©*cascade08©ª *cascade08ª´*cascade08´µ *cascade08µ·*cascade08·¸ *cascade08¸»*cascade08»¼ *cascade08¼½*cascade08½¾ *cascade08¾Â*cascade08ÂÆ *cascade08ÆÈ*cascade08ÈÎ *cascade08Îä*cascade08äå *cascade08åì*cascade08ìí *cascade08íó*cascade08óô *cascade08ôû*cascade08ûü *cascade08ü„*cascade08„… *cascade08…*cascade08Ž *cascade08Ž–*cascade08–— *cascade08—˜*cascade08˜™ *cascade08™š*cascade08šŸ *cascade08Ÿ¤*cascade08¤¥ *cascade08¥¦*cascade08¦¨ *cascade08¨©*cascade08©ª *cascade08ªµ*cascade08µ¶ *cascade08¶¸*cascade08¸¹ *cascade08¹º*cascade08º» *cascade08»À*cascade08ÀÁ *cascade08ÁÊ*cascade08ÊË *cascade08ËÌ*cascade08ÌÑ *cascade08ÑÓ*cascade08ÓÔ *cascade08ÔÙ*cascade08ÙÚ *cascade08ÚÜ*cascade08ÜÝ *cascade08Ýà*cascade08àå *cascade08åê*cascade08êë *cascade08ëø*cascade08øù *cascade08ùú*cascade08úû *cascade08ûü*cascade08üþ *cascade08þ†*cascade08† *cascade08“*cascade08“” *cascade08”›*cascade08›œ *cascade08œ*cascade08ž *cascade08ž¢*cascade08¢£ *cascade08£¥*cascade08¥¦ *cascade08¦¨*cascade08¨´ *cascade08´¶*cascade08¶· *cascade08·½*cascade08½¾ *cascade08¾Á*cascade08ÁÂ *cascade08ÂË*cascade08ËÌ *cascade08ÌÑ*cascade08ÑÓ *cascade08ÓÖ*cascade08Öß *cascade08ßâ*cascade08âê *cascade08êë*cascade08ëí *cascade08íñ*cascade08ñò *cascade08òó*cascade08óù *cascade08ùý*cascade08ý *cascade08*cascade08Ž *cascade08Ž*cascade08‘ *cascade08‘“*cascade08“› *cascade08›*cascade08ž *cascade08žŸ*cascade08Ÿ¡ *cascade08¡£*cascade08£¤ *cascade08¤¦*cascade08¦§ *cascade08§¨*cascade08¨µ *cascade08µ·*cascade08·¹ *cascade08¹»*cascade08»¼ *cascade08¼À*cascade08ÀÁ *cascade08ÁÍ*cascade08ÍÏ *cascade08ÏØ*cascade08ØÙ *cascade08Ùç*cascade08çè *cascade08èé*cascade08éö *cascade08ö’*cascade08’“ *cascade08“”*cascade08”• *cascade08•Ÿ*cascade08Ÿ§ *cascade08§¨*cascade08¨± *cascade08±·*cascade08·¸ *cascade08¸º*cascade08º» *cascade08»½*cascade08½¾ *cascade08¾À*cascade08ÀÍ *cascade08Íá*cascade08áã *cascade08ãé*cascade08éê *cascade08êë*cascade08ëì *cascade08ìñ*cascade08ñó *cascade08óƒ*cascade08ƒ *cascade08–*cascade08–˜ *cascade08˜ž*cascade08žŸ *cascade08Ÿ¢*cascade08¢£ *cascade08£¦*cascade08¦¨ *cascade08¨¯*cascade08¯° *cascade08°²*cascade08²» *cascade08»¾*cascade08¾Â *cascade08ÂÄ*cascade08ÄÅ *cascade08ÅÍ*cascade08ÍÎ *cascade08Îà*cascade08àä *cascade08äæ*cascade08æç *cascade08çî*cascade08îð *cascade08ðñ*cascade08ñò *cascade08òü*cascade08üþ *cascade08þ	*cascade08	‚	 *cascade08‚	ƒ	*cascade08ƒ	„	 *cascade08„	‡	*cascade08‡	ˆ	 *cascade08ˆ	Ž	*cascade08Ž	‘	 *cascade08‘	’	*cascade08’	“	 *cascade08“	™	*cascade08™	š	 *cascade08š		*cascade08	¢	 *cascade08¢	§	*cascade08§	¨	 *cascade08¨	°	*cascade08°	±	 *cascade08±	²	*cascade08²	³	 *cascade08³	Þ	*cascade08Þ	â	 *cascade08â	ä	*cascade08ä	å	 *cascade08å	î	*cascade08î	ï	 *cascade08ï	õ	*cascade08õ	ö	 *cascade08ö	ý	*cascade08ý	
 *cascade08
‡
*cascade08‡
ˆ
 *cascade08ˆ
‰
*cascade08‰
’
 *cascade08’
–
*cascade08–
—
 *cascade08—
²
*cascade08²
³
 *cascade08³
À
*cascade08À
Á
 *cascade08Á
Ò
*cascade08Ò
Ó
 *cascade08Ó
î
*cascade08î
† *cascade08†Œ*cascade08Œ *cascade08¯*cascade08¯Ó *cascade08ÓÔ*cascade08ÔÕ *cascade08ÕÚ*cascade08Úà *cascade08àã*cascade08ãä *cascade08äç*cascade08çö *cascade08ö÷*cascade08÷ø *cascade08øù*cascade08ùú *cascade08úû*cascade08û­ *cascade082]file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/AuthOverlay.tsx