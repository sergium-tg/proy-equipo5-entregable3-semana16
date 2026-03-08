—0'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.css';
import FormInput from './FormInput';
import PasswordStrength from './PasswordStrength';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
    onSuccess?: () => void;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const { register, isLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [shakeFields, setShakeFields] = useState<string[]>([]);

    const validate = (): boolean => {
        const errs: Errors = {};
        if (!name.trim()) errs.name = 'Full name is required';
        if (!email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Must be at least 8 characters';
        if (!confirmPassword) errs.confirmPassword = 'Please confirm your password';
        else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
        if (!agreed) errs.terms = 'You must agree to the terms';
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            setShakeFields(Object.keys(errs));
            setTimeout(() => setShakeFields([]), 500);
        }
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await register({ name, email, password, confirmPassword });
            onSuccess?.();
        } catch {
            setErrors({ general: 'Registration failed. Please try again.' });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {errors.general && (
                <div className={styles.alert} role="alert">
                    {errors.general}
                </div>
            )}

            <FormInput
                id="reg-name"
                label="Full name"
                type="text"
                icon="user"
                autoComplete="name"
                value={name}
                onChange={setName}
                error={errors.name}
                shake={shakeFields.includes('name')}
            />

            <FormInput
                id="reg-email"
                label="Email address"
                type="email"
                icon="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                shake={shakeFields.includes('email')}
            />

            <FormInput
                id="reg-password"
                label="Password"
                type="password"
                icon="lock"
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                shake={shakeFields.includes('password')}
            />

            <PasswordStrength password={password} />

            <FormInput
                id="reg-confirm"
                label="Confirm password"
                type="password"
                icon="lock"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={errors.confirmPassword}
                shake={shakeFields.includes('confirmPassword')}
            />

            {/* Terms checkbox */}
            <label className={`${styles.termsLabel} ${errors.terms ? styles.termsError : ''}`}>
                <span className={styles.checkboxWrapper} onClick={() => setAgreed((v) => !v)}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        aria-label="I agree to the terms and conditions"
                    />
                    <span className={styles.checkboxCustom} aria-hidden="true">
                        {agreed && (
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="2 6 5 9 10 3" />
                            </svg>
                        )}
                    </span>
                </span>
                <span className={styles.termsText}>
                    I agree to the{' '}
                    <button type="button" className={styles.termsLink}>Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className={styles.termsLink}>Privacy Policy</button>
                </span>
            </label>
            {errors.terms && <p className={styles.termsErrorMsg}>{errors.terms}</p>}

            <button type="submit" className={styles.submitBtn} disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? (
                    <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Creating accountâ€¦
                    </>
                ) : (
                    <>
                        Create Account
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}
8 *cascade088h*cascade08h *cascade08–*cascade08–— *cascade08—›*cascade08›œ *cascade08œ*cascade08¤ *cascade08¤¥*cascade08¥¦ *cascade08¦«*cascade08«¬ *cascade08¬º*cascade08º½ *cascade08½Ä*cascade08ÄÅ *cascade08ÅÇ*cascade08ÇÈ *cascade08ÈØ*cascade08ØÚ *cascade08ÚÛ*cascade08ÛÜ *cascade08Üà*cascade08àá *cascade08áé*cascade08éê *cascade08êí*cascade08íî *cascade08îô*cascade08ôõ *cascade08õ‡*cascade08‡‰ *cascade08‰Š*cascade08Š‹ *cascade08‹š*cascade08š› *cascade08›*cascade08Ÿ *cascade08Ÿ¢*cascade08¢£ *cascade08£¯*cascade08¯± *cascade08±²*cascade08²´ *cascade08´µ*cascade08µ¶ *cascade08¶¼*cascade08¼½ *cascade08½Å*cascade08ÅÆ *cascade08ÆÏ*cascade08ÏĞ *cascade08ĞÔ*cascade08Ô× *cascade08×á*cascade08áâ *cascade08âì*cascade08ìí *cascade08íô*cascade08ôõ *cascade08õö*cascade08ö÷ *cascade08÷ú*cascade08úû *cascade08ûü*cascade08üş *cascade08şˆ*cascade08ˆ‰ *cascade08‰•*cascade08•— *cascade08—™*cascade08™š *cascade08š*cascade08Ÿ *cascade08Ÿª*cascade08ª« *cascade08«³*cascade08³´ *cascade08´¹*cascade08¹º *cascade08º¼*cascade08¼ã *cascade08ãƒ*cascade08ƒ‘ *cascade08‘À*cascade08ÀÁ *cascade08Á*cascade08Ÿ *cascade08Ÿ¥*cascade08¥¦ *cascade08¦´*cascade08´¶ *cascade08¶Ø*cascade08Øİ *cascade08İ£*cascade08£¥ *cascade08¥¨*cascade08¨© *cascade08©Ë*cascade08ËØ *cascade08Øô*cascade08ôõ *cascade08õö*cascade08ö÷ *cascade08÷ú*cascade08úû *cascade08ûÿ*cascade08ÿ€ *cascade08€„*cascade08„… *cascade08…š*cascade08š› *cascade08›·*cascade08·¹ *cascade08¹Æ*cascade08ÆÇ *cascade08ÇÊ*cascade08ÊË *cascade08Ëë*cascade08ëì *cascade08ìî*cascade08î÷ *cascade08÷ü*cascade08ü€ *cascade08€”*cascade08”– *cascade08–«*cascade08«¬ *cascade08¬ê*cascade08êô *cascade08ô’	*cascade08’	–	 *cascade08–	¥	*cascade08¥	§	 *cascade08§	¼	*cascade08¼	½	 *cascade08½	¾	*cascade08¾	Ç	 *cascade08Ç	Ì	*cascade08Ì	Ô	 *cascade08Ô	‰*cascade08‰‹ *cascade08‹§*cascade08§¨ *cascade08¨©*cascade08©² *cascade08²È*cascade08È× *cascade08×ï*cascade08ïñ *cascade08ñ‡*cascade08‡ˆ *cascade08ˆî*cascade08îï *cascade08ïõ*cascade08õú *cascade08úş*cascade08şÿ *cascade08ÿŸ*cascade08Ÿ  *cascade08 ´*cascade08´Ï *cascade08ÏÕ*cascade08Õ” *cascade08”–*cascade08–— *cascade08—À*cascade08ÀÁ *cascade08Áâ*cascade08âã *cascade08ãæ*cascade08æç *cascade08çõ*cascade08õö *cascade08ö÷*cascade08÷ø *cascade08øü*cascade08üı *cascade08ıŠ*cascade08Š‹ *cascade08‹©*cascade08©ª *cascade08ª­*cascade08­® *cascade08®Ö*cascade08Ö× *cascade08×ã*cascade08ãä *cascade08äî*cascade08îï *cascade08ï‡*cascade08‡« *cascade08«Ã*cascade08Ãó *cascade08óœ*cascade08œÜ *cascade08Üà*cascade08àá *cascade08áã*cascade08ã“ *cascade08“Ó*cascade08Óı *cascade08ış*cascade08şÿ *cascade08ÿ€*cascade08€ *cascade08ƒ*cascade08ƒ† *cascade08†”*cascade08”• *cascade08•š*cascade08š› *cascade08›¡*cascade08¡¥ *cascade08¥±*cascade08±² *cascade08²´*cascade08´µ *cascade08µÙ*cascade08Ùë *cascade08ëì*cascade08ì¹ *cascade08¹Â*cascade08ÂÄ *cascade08ÄÌ*cascade08ÌÍ *cascade08ÍÛ*cascade08ÛÜ *cascade08ÜŞ*cascade08Şß *cascade08ßõ*cascade08õø *cascade08ø€*cascade08€’ *cascade08’”*cascade08”• *cascade08•™*cascade08™š *cascade08š*cascade08ß *cascade08ßñ*cascade08ñò *cascade08òó*cascade08óô *cascade08ô…*cascade08…† *cascade08†‡*cascade08‡ˆ *cascade08ˆ‰*cascade08‰Š *cascade08Š *cascade08 ¡ *cascade08¡¢*cascade08¢¥ *cascade08¥°*cascade08°± *cascade08±·*cascade08·¸ *cascade08¸»*cascade08»À *cascade08ÀÁ*cascade08ÁÓ *cascade08ÓÔ*cascade08Ô¤ *cascade08¤©*cascade08©« *cascade08«Å*cascade08ÅÇ *cascade08Çè*cascade08èú *cascade08úü*cascade08üı *cascade08ı*cascade08‚ *cascade08‚…*cascade08…ˆ *cascade08ˆŒ*cascade08ŒÔ *cascade08ÔÕ*cascade08ÕÖ *cascade08ÖÚ*cascade08ÚÛ *cascade08Ûé*cascade08éê *cascade08êó*cascade08óõ *cascade08õû*cascade08ûı *cascade08ı‚*cascade08‚ƒ *cascade08ƒš*cascade08š› *cascade08›³*cascade08³» *cascade08»¼*cascade08¼Í *cascade08Í„*cascade08„Û *cascade08Ûİ*cascade08İŞ *cascade08Şâ*cascade08âã *cascade08ãæ*cascade08æç *cascade08çö*cascade08ö÷ *cascade08÷ù*cascade08ùú *cascade08úı*cascade08ış *cascade08ş„*cascade08„– *cascade08–´*cascade08´µ *cascade08µ¹*cascade08¹º *cascade08º½*cascade08½À *cascade08ÀÄ*cascade08Äå *cascade08åó*cascade08óô *cascade08ôŠ*cascade08Š‹ *cascade08‹’*cascade08’“ *cascade08“›*cascade08›œ *cascade08œÁ*cascade08Áã *cascade08ã*cascade08ƒ *cascade08ƒº*cascade08º» *cascade08»¹ *cascade08¹ »  *cascade08» Û *cascade08Û Ü  *cascade08Ü æ *cascade08æ é  *cascade08é ù *cascade08ù ÿ  *cascade08ÿ ã!*cascade08ã!ä! *cascade08ä!è!*cascade08è!é! *cascade08é!ì!*cascade08ì!í! *cascade08í!"*cascade08"" *cascade08"Á"*cascade08Á"Â" *cascade08Â"Ç"*cascade08Ç"Î" *cascade08Î"×"*cascade08×"Ø" *cascade08Ø"Ù"*cascade08Ù"Ú" *cascade08Ú"à"*cascade08à"á" *cascade08á"“#*cascade08“#•# *cascade08•#§#*cascade08§#«# *cascade08«#®#*cascade08®#¯# *cascade08¯#ç#*cascade08ç#ê# *cascade08ê#ı#*cascade08ı#ş# *cascade08ş#ˆ$*cascade08ˆ$‰$ *cascade08‰$$*cascade08$$ *cascade08$×$*cascade08×$Ø$ *cascade08Ø$Ş$*cascade08Ş$ß$ *cascade08ß$à$*cascade08à$á$ *cascade08á$§%*cascade08§%¨% *cascade08¨%Õ&*cascade08Õ&ä& *cascade08ä&í&*cascade08í&î& *cascade08î&ò&*cascade08ò&€' *cascade08€'„'*cascade08„'…' *cascade08…'ş'*cascade08ş'‹( *cascade08‹(Œ(*cascade08Œ(( *cascade08((*cascade08(’( *cascade08’(”(*cascade08”(•( *cascade08•(¦(*cascade08¦(§( *cascade08§(ª(*cascade08ª(«( *cascade08«(â(*cascade08â(ä( *cascade08ä(ƒ)*cascade08ƒ)„) *cascade08„)‹)*cascade08‹)) *cascade08)İ)*cascade08İ)Ş) *cascade08Ş)…**cascade08…*†* *cascade08†***cascade08** *cascade08*™**cascade08™*š* *cascade08š*«**cascade08«*¬* *cascade08¬*â**cascade08â*ã* *cascade08ã*í**cascade08í*ï* *cascade08ï*‚+*cascade08‚+ƒ+ *cascade08ƒ+‘+*cascade08‘+’+ *cascade08’+,*cascade08,, *cascade08,­,*cascade08­,¯, *cascade08¯,´,*cascade08´,µ, *cascade08µ,»,*cascade08»,½, *cascade08½,Ã,*cascade08Ã,Ó, *cascade08Ó,Õ,*cascade08Õ,Ù, *cascade08Ù,Ç-*cascade08Ç-È- *cascade08È-Ì-*cascade08Ì-Í- *cascade08Í-Ï-*cascade08Ï-Ğ- *cascade08Ğ-Ñ-*cascade08Ñ-Ò- *cascade08Ò-.*cascade08.¡. *cascade08¡.Ã.*cascade08Ã.Ä. *cascade08Ä.å.*cascade08å.ò. *cascade08ò.‚/*cascade08‚/ƒ/ *cascade08ƒ/›/*cascade08›/œ/ *cascade08œ/÷/*cascade08÷/—0 *cascade082ifile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/RegisterForm.tsx