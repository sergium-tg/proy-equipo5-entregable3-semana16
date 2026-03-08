Íimport styles from './SocialAuth.module.css';

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

export default function SocialAuth() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or continue with</span>
                <span className={styles.dividerLine} />
            </div>

            <div className={styles.buttons}>
                <button className={`${styles.btn} ${styles.google}`} type="button" aria-label="Sign in with Google">
                    <GoogleIcon />
                    Google
                </button>
                <button className={`${styles.btn} ${styles.github}`} type="button" aria-label="Sign in with GitHub">
                    <GitHubIcon />
                    GitHub
                </button>
            </div>
        </div>
    );
}
*cascade08 *cascade08*cascade08	 *cascade08	*cascade08 *cascade08*cascade08 *cascade08*cascade08 *cascade08*cascade08  *cascade08 -*cascade08-. *cascade08.4*cascade0845 *cascade085?*cascade08?@ *cascade08@A*cascade08AB *cascade08BD*cascade08DE *cascade08EG*cascade08GN *cascade08NR*cascade08RS *cascade08S]*cascade08]^ *cascade08^_*cascade08_` *cascade08`b*cascade08bc *cascade08cf*cascade08fg *cascade08gj*cascade08jk *cascade08kl*cascade08lm *cascade08mq*cascade08qr *cascade08rs*cascade08sv *cascade08v}*cascade08}~ *cascade08~á*cascade08áâ *cascade08âã*cascade08ãå *cascade08åé*cascade08éè *cascade08èê*cascade08êú *cascade08úü*cascade08ü† *cascade08†£*cascade08£• *cascade08•Æ*cascade08ÆØ *cascade08Ø∏*cascade08∏∫ *cascade08∫æ*cascade08æø *cascade08øÕ*cascade08ÕŒ *cascade08Œ–*cascade08–— *cascade08—‚*cascade08‚‰ *cascade08‰Ï*cascade08ÏÌ *cascade08ÌÒ*cascade08ÒÚ *cascade08Ú˚*cascade08˚¸ *cascade08¸ç*cascade08çé *cascade08éë*cascade08ëí *cascade08íò*cascade08òô *cascade08ôú*cascade08úù *cascade08ù™*cascade08™´ *cascade08´¨*cascade08¨∂ *cascade08∂ª*cascade08ªº *cascade08º *cascade08 À *cascade08À—*cascade08—“ *cascade08“Ÿ*cascade08Ÿ⁄ *cascade08⁄€*cascade08€‹ *cascade08‹‰*cascade08‰Â *cascade08Â˘*cascade08˘˙ *cascade08˙Ü*cascade08Üá *cascade08áê*cascade08êë *cascade08ëö*cascade08öõ *cascade08õø*cascade08ø¿ *cascade08¿≈*cascade08≈∆ *cascade08∆…*cascade08…  *cascade08 Ã*cascade08ÃÕ *cascade08Õœ*cascade08œ– *cascade08–‘*cascade08‘· *cascade08·„*cascade08„‰ *cascade08‰Â*cascade08ÂÊ *cascade08ÊÁ*cascade08ÁÍ *cascade08ÍÙ*cascade08Ùı *cascade08ı˝*cascade08˝˛ *cascade08˛Å*cascade08ÅÇ *cascade08ÇÖ*cascade08ÖÜ *cascade08Üò*cascade08òô *cascade08ôû*cascade08ûü *cascade08üπ*cascade08π∫ *cascade08∫æ*cascade08æø *cascade08ø√*cascade08√ƒ *cascade08ƒ≈*cascade08≈∆ *cascade08∆À*cascade08ÀÃ *cascade08ÃÕ*cascade08ÕŒ *cascade08Œ‘*cascade08‘’ *cascade08’Ÿ*cascade08Ÿ⁄ *cascade08⁄ﬁ*cascade08ﬁﬂ *cascade08ﬂˆ*cascade08ˆ˜ *cascade08˜˙*cascade08˙É *cascade08ÉÖ*cascade08ÖÜ *cascade08Üá*cascade08áà *cascade08àñ*cascade08ñó *cascade08óù*cascade08ùû *cascade08ûß*cascade08ß® *cascade08®©*cascade08©™ *cascade08™±*cascade08±≤ *cascade08≤∂*cascade08∂∑ *cascade08∑À*cascade08ÀÃ *cascade08Ã–*cascade08–— *cascade08—÷*cascade08÷◊ *cascade08◊ÿ*cascade08ÿŸ *cascade08Ÿ€*cascade08€‹ *cascade08‹›*cascade08›ﬁ *cascade08ﬁ·*cascade08·‚ *cascade08‚„*cascade08„‰ *cascade08‰Ë*cascade08ËÈ *cascade08ÈÌ*cascade08ÌÓ *cascade08ÓÚ*cascade08ÚÛ *cascade08Û˜*cascade08˜¯ *cascade08¯¸*cascade08¸˝ *cascade08˝â*cascade08âä *cascade08äí*cascade08íì *cascade08ìû*cascade08ûü *cascade08ü¢*cascade08¢¶ *cascade08¶∂*cascade08∂∑ *cascade08∑¡*cascade08¡¬ *cascade08¬√*cascade08√ƒ *cascade08ƒ∆*cascade08∆« *cascade08«…*cascade08…  *cascade08 Ã*cascade08Ã– *cascade08–‘*cascade08‘’ *cascade08’ﬂ*cascade08ﬂ‡ *cascade08‡·*cascade08·‚ *cascade08‚‰*cascade08‰Â *cascade08ÂË*cascade08ËÈ *cascade08ÈÛ*cascade08ÛÙ *cascade08Ùˇ*cascade08ˇÅ *cascade08ÅÇ*cascade08ÇÉ *cascade08Éä*cascade08äã *cascade08ãì*cascade08ìî *cascade08îß*cascade08ß∞ *cascade08∞µ*cascade08µ∂ *cascade08∂º*cascade08ºΩ *cascade08Ωƒ*cascade08ƒ≈ *cascade08≈∆*cascade08∆« *cascade08«»*cascade08»… *cascade08…Œ*cascade08Œœ *cascade08œ–*cascade08–— *cascade08—Ÿ*cascade08Ÿ⁄ *cascade08⁄ﬂ*cascade08ﬂ‡ *cascade08‡Â*cascade08ÂÊ *cascade08ÊÍ*cascade08ÍÎ *cascade08Î*cascade08Ò *cascade08Ò˘*cascade08˘˙ *cascade08˙¸*cascade08¸˛ *cascade08˛é*cascade08éè *cascade08èà	*cascade08à	â	 *cascade08â	ë	*cascade08ë	í	 *cascade08í	ó	*cascade08ó	ò	 *cascade08ò	ù	*cascade08ù	û	 *cascade08û	£	*cascade08£	§	 *cascade08§	≠	*cascade08≠	Æ	 *cascade08Æ	≤	*cascade08≤	≥	 *cascade08≥	∏	*cascade08∏	π	 *cascade08π	æ	*cascade08æ	ø	 *cascade08ø	Ö
*cascade08Ö
Ü
 *cascade08Ü
ñ
*cascade08ñ
ó
 *cascade08ó
¿
*cascade08¿
¡
 *cascade08¡
¬
*cascade08¬
√
 *cascade08√
ƒ
*cascade08ƒ
≈
 *cascade08≈
Ã
*cascade08Ã
Õ
 *cascade08Õ
—
*cascade08—
“
 *cascade08“
‘
*cascade08‘
’
 *cascade08’
Ÿ
*cascade08Ÿ
€
 *cascade08€
›
*cascade08›
ﬁ
 *cascade08ﬁ
„
*cascade08„
‰
 *cascade08‰
Â
*cascade08Â
Ê
 *cascade08Ê
Á
*cascade08Á
Ë
 *cascade08Ë
È
*cascade08È
Í
 *cascade08Í
Ï
*cascade08Ï
Ì
 *cascade08Ì
˜
*cascade08˜
¯
 *cascade08¯
¸
*cascade08¸
˝
 *cascade08˝
˛
*cascade08˛
ˇ
 *cascade08ˇ
Ä*cascade08ÄÅ *cascade08ÅÇ*cascade08ÇÉ *cascade08Éò*cascade08òô *cascade08ô§*cascade08§• *cascade08•¥*cascade08¥µ *cascade08µæ*cascade08æø *cascade08ø∆*cascade08∆« *cascade08«—*cascade08—“ *cascade08“◊*cascade08◊ÿ *cascade08ÿ›*cascade08›ﬁ *cascade08ﬁ„*cascade08„‰ *cascade08‰È*cascade08ÈÍ *cascade08ÍÎ*cascade08ÎÏ *cascade08Ï˜*cascade08˜¯ *cascade08¯É*cascade08ÉÑ *cascade08Ñú*cascade08úû *cascade08û¢*cascade08¢£ *cascade08£§*cascade08§• *cascade08•™*cascade08™´ *cascade08´µ*cascade08µ∂ *cascade08∂∫*cascade08∫ª *cascade08ª¿*cascade08¿¡ *cascade08¡¬*cascade08¬√ *cascade08√€*cascade08€‹ *cascade08‹·*cascade08·‚ *cascade08‚„*cascade08„‰ *cascade08‰Â*cascade08ÂÊ *cascade08ÊÁ*cascade08ÁË *cascade08ËÍ*cascade08ÍÎ *cascade08ÎÙ*cascade08Ùı *cascade08ı˙*cascade08˙˚ *cascade08˚Å*cascade08ÅÇ *cascade08ÇÉ*cascade08ÉÑ *cascade08ÑÜ*cascade08Üá *cascade08áä*cascade08äã *cascade08ãé*cascade08éí *cascade08íñ*cascade08ñó *cascade08ó°*cascade08°¢ *cascade08¢®*cascade08®© *cascade08©´*cascade08´¨ *cascade08¨Æ*cascade08ÆØ *cascade08Ø≤*cascade08≤µ *cascade08µ¡*cascade08¡¬ *cascade08¬ƒ*cascade08ƒ» *cascade08»Œ*cascade08Œœ *cascade08œ—*cascade08—Ÿ *cascade08Ÿ›*cascade08›ﬂ *cascade08ﬂ·*cascade08·‚ *cascade08‚Ò*cascade08ÒÚ *cascade08ÚÛ*cascade08ÛÙ *cascade08Ùı*cascade08ı˜ *cascade08˜˘*cascade08˘Ü *cascade08Üä*cascade08äã *cascade08ãó*cascade08óò *cascade08òö*cascade08öõ *cascade08õû*cascade08ûü *cascade08ü¶*cascade08¶∑ *cascade08∑€*cascade08€‹ *cascade08‹ﬂ*cascade08ﬂÔ *cascade08ÔÙ*cascade08Ùı *cascade08ıñ*cascade08ñó *cascade08óü*cascade08ü† *cascade08†™*cascade08™º *cascade08º¡*cascade08¡¬ *cascade08¬–*cascade08–“ *cascade08“‡*cascade08‡· *cascade08·‰*cascade08‰Ú *cascade08Úı*cascade08ıˆ *cascade08ˆ˜*cascade08˜Ñ *cascade08Ñà*cascade08àâ *cascade08âõ*cascade08õ° *cascade08°§*cascade08§µ *cascade08µº*cascade08ºΩ *cascade08Ω÷*cascade08÷◊ *cascade08◊Ÿ*cascade08Ÿﬁ *cascade08ﬁ‰*cascade08‰Ê *cascade08ÊÈ*cascade08ÈÍ *cascade08ÍÏ*cascade08ÏÌ *cascade08Ìı*cascade08ıˆ *cascade08ˆ˜*cascade08˜¯ *cascade08¯˘*cascade08˘˙ *cascade08˙Ä*cascade08ÄÅ *cascade08Åà*cascade08àâ *cascade08âã*cascade08ãå *cascade08åê*cascade08êë *cascade08ëö*cascade08öÆ *cascade08Æ∞*cascade08∞± *cascade08±¥*cascade08¥µ *cascade08µπ*cascade08π∫ *cascade08∫º*cascade08º— *cascade08—“*cascade08“‘ *cascade08‘’*cascade08’Ë *cascade08ËÍ*cascade08ÍÏ *cascade08ÏÓ*cascade08Ó *cascade08Ò*cascade08ÒÇ *cascade08ÇÑ*cascade08ÑÖ *cascade08Öá*cascade08áâ *cascade08âô*cascade08ôö *cascade08öú*cascade08úù *cascade08ù£*cascade08£§ *cascade08§∂*cascade08∂∑ *cascade08∑¡*cascade08¡√ *cascade08√Õ*cascade08ÕŒ *cascade08Œ“*cascade08“‘ *cascade08‘‹*cascade08‹› *cascade08›‡*cascade08‡· *cascade08·Ê*cascade08Ê˚ *cascade08˚Ü*cascade08Üá *cascade08áà*cascade08àÍ *cascade082gfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/SocialAuth.tsx