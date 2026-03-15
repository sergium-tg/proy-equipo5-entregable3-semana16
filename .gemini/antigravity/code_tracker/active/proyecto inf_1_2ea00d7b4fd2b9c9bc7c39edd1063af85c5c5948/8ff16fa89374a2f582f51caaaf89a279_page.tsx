Øc'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import styles from './Profile.module.css';

export default function StandaloneProfilePage() {
    const { user, isLoading, updateUser } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        } else if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role
            });
        }
    }, [user, isLoading, router]);

    const handleNavigate = (path: string) => {
        setIsExiting(true);
        setTimeout(() => {
            router.push(path);
        }, 300);
    };

    if (isLoading || !user) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1200));
        updateUser({
            username: formData.username,
            email: formData.email,
            role: formData.role
        });
        setIsSaving(false);
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role
            });
            setShowRoleDropdown(false);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className={isExiting ? 'page-fade-out' : 'page-fade-in'} style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '40px 20px' }}>
            <nav style={{ maxWidth: '900px', margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => handleNavigate('/dashboard')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to home
                </button>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>
                    <span style={{ color: 'var(--color-primary)' }}>‚Ä¢</span> DevPortal
                </div>
            </nav>

            <main className={`${styles.profileContainer} ${isEditing ? styles.isEditing : ''}`}>
                <div className={styles.card}>
                    <div className={styles.editButtonWrapper}>
                        <button className={styles.editToggleButton} onClick={toggleEdit}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                                {isEditing ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                )}
                            </svg>
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className={styles.headerSection}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatar}>
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={64} height={64} style={{ color: 'var(--color-primary)' }}>
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                )}
                            </div>
                            {isEditing && (
                                <div className={styles.pencilIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}>
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {!isEditing ? (
                            <>
                                <h1 className={styles.userName}>{user.username}</h1>
                                <p className={styles.userEmail}>{user.email}</p>
                                <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{user.role} Developer</p>
                            </>
                        ) : (
                            <div style={{ marginTop: '10px' }}>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Editing Profile Details</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{user.rating || '5.0'}</span>
                            <span className={styles.statLabel}>User Rating</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>12</span>
                            <span className={styles.statLabel}>Projects</span>
                        </div>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoRow}>
                            <label className={styles.label}>FULL NAME</label>
                            {isEditing ? (
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={styles.input}
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    <div className={styles.pencilSmall}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
                                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <span className={styles.value}>{user.username}</span>
                            )}
                        </div>

                        <div className={styles.infoRow}>
                            <label className={styles.label}>EMAIL ADDRESS</label>
                            {isEditing ? (
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={styles.input}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <div className={styles.pencilSmall}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <span className={styles.value}>{user.email}</span>
                            )}
                        </div>

                        <div className={styles.infoRow}>
                            <label className={styles.label}>PROFESSIONAL ROLE</label>
                            {isEditing ? (
                                <div className={styles.customSelect}>
                                    <div
                                        className={styles.selectDisplay}
                                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                    >
                                        {formData.role || 'Select Role'}
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16} style={{ transition: '0.3s', transform: showRoleDropdown ? 'rotate(180deg)' : 'none' }}>
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                    {showRoleDropdown && (
                                        <div className={styles.selectDropdown}>
                                            {['FRONTEND', 'BACKEND'].map(r => (
                                                <div
                                                    key={r}
                                                    className={styles.selectOption}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, role: r }));
                                                        setShowRoleDropdown(false);
                                                    }}
                                                >
                                                    {r} Developer
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <span className={styles.value}>{user.role} Developer</span>
                            )}
                        </div>

                        <div className={`${styles.infoRow} ${styles.readOnly}`}>
                            <label className={styles.label}>MEMBER SINCE</label>
                            <span className={styles.value} style={{ color: 'var(--color-text-subtle)' }}>March 2026</span>
                        </div>
                    </div>

                    {isEditing && (
                        <div className={styles.saveActions}>
                            <button className={styles.cancelButton} onClick={toggleEdit}>Discard</button>
                            <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
ﬁ *cascade08ﬁﬂ
ﬂ‡ ‡Â
ÂÊ ÊÁ
ÁÏ ÏÛ
ÛÙ Ùı
ıä äœœ‘ *cascade08‘ŸŸ⁄ *cascade08⁄‰‰Â *cascade08ÂÍÍÎ *cascade08Îˆˆ˜ *cascade08˜ààâ *cascade08âŒŒœ *cascade08œÿÿŸ *cascade08ŸËËÈ *cascade08È©©´ *cascade08´¿¿¡ *cascade08¡¬¬√ *cascade08√»»  *cascade08 ‡‡· *cascade08·ÁÁË *cascade08ËÏÏÌ *cascade08Ìííì *cascade08ì¥¥µ *cascade08µˆˆà *cascade08àââã *cascade08ãååò *cascade08òôôõ *cascade08õûûü *cascade08ü††¥ *cascade08¥∏∏÷ *cascade08÷◊◊Ÿ *cascade08Ÿ€€Î *cascade08ÎÓÓÒ *cascade08ÒÚÚÙ *cascade08Ù˜˜¯ *cascade08¯¸¸Ö	 *cascade08Ö	á	á	à	 *cascade08à	ç	ç	†	 *cascade08†	£	£	®	 *cascade08®	™	™	´	 *cascade08´	≠	≠	∞	 *cascade08∞	±	±	¥	 *cascade08¥	µ	µ	π	 *cascade08π	∫	∫	º	 *cascade08º	æ	æ	ø	 *cascade08ø	¿	¿	ƒ	 *cascade08ƒ	…	…	 	 *cascade08 	Œ	Œ	–	 *cascade08–	’	’	÷	 *cascade08÷	ú
ú
ù
 *cascade08ù
˛
˛
ˇ
 *cascade08ˇ
ÇÇÑ *cascade08ÑÖÖÜ *cascade08Üááà *cascade08à‡‡· *cascade08·¡¡¬ *cascade08¬ƒƒ≈ *cascade08≈««Ã *cascade08
Ãﬂ ﬂ˚ *cascade08˚Ö *cascade08Ö••± *cascade08±≥≥¥ *cascade08¥© *cascade08©ÆÆØ *cascade08
Ø   À *cascade08À““‘ *cascade08‘ÿÿŸ *cascade08Ÿ„„‰ *cascade08‰Ì*cascade08
ÌÑ Ñç *cascade08
ç˙ ˙ò *cascade08
ò° °¢ *cascade08¢∞∞¡ *cascade08
¡⁄ ⁄Í *cascade08
ÍÉ Éò *cascade08
ò± ±ª *cascade08
ªû û° *cascade08°≤≤ü *cascade08
ü£ £∂ *cascade08∂ªªÊ/ *cascade08Ê//*cascade08/ÈL *cascade08ÈLÙL*cascade08ÙL˘L *cascade08˘L˝L*cascade08˝LÄM *cascade08ÄMÇM*cascade08ÇMÑM *cascade08ÑMÜM*cascade08ÜMØM *cascade08ØM≤M*cascade08≤MÌM *cascade08ÌMÙM*cascade08ÙMıM *cascade08ıMˆM*cascade08ˆM˜M *cascade08˜M˙M*cascade08˙M§N *cascade08§N•N*cascade08•N¶N *cascade08¶N¥N*cascade08¥NµN *cascade08µNøN*cascade08øN¡N *cascade08¡NŒN*cascade08ŒN–N *cascade08–NÄO*cascade08ÄO∑O *cascade08∑O»O*cascade08»OÚO *cascade08ÚO¸O*cascade08¸O˝O *cascade08˝OëP*cascade08ëPíP *cascade08íP¶P*cascade08¶PßP *cascade08ßP∑P*cascade08∑P∏P *cascade08∏PÀP*cascade08ÀPÃP *cascade08ÃPÿP*cascade08ÿP€P *cascade08€PÛP*cascade08ÛPıP *cascade08ıPÇQ*cascade08ÇQÑQ *cascade08ÑQìQ*cascade08ìQîQ *cascade08îQúQ*cascade08úQùQ *cascade08ùQ¶Q*cascade08¶QßQ *cascade08ßQ©Q*cascade08©Q™Q *cascade08™Q¨Q*cascade08¨Q’Q *cascade08’QÿQ*cascade08ÿQŸQ *cascade08ŸQ€Q*cascade08€Q‹Q *cascade08‹QﬂQ*cascade08ﬂQ‡Q *cascade08‡QÍQ*cascade08ÍQÎQ *cascade08ÎQÔQ*cascade08ÔQQ *cascade08QÚQ*cascade08ÚQóR *cascade08óR†R*cascade08†R∆R *cascade08∆RœR*cascade08œR”R *cascade08”R¸R*cascade08¸R˛R *cascade08˛RˇR*cascade08ˇRÄS *cascade08ÄSÅS*cascade08ÅSÉS *cascade08ÉS≥S*cascade08≥S¥S *cascade08¥S∑S*cascade08∑S∏S *cascade08∏SΩS*cascade08ΩSøS *cascade08øS¡S*cascade08¡S¬S *cascade08¬SƒS*cascade08ƒS≈S *cascade08≈S»S*cascade08»SÀS *cascade08ÀSŒS*cascade08ŒS—S *cascade08—S“S*cascade08“S”S *cascade08”S‘S*cascade08‘S’S *cascade08’S÷S*cascade08÷SÄT *cascade08ÄTëT*cascade08ëTíT *cascade08íTìT*cascade08ìTöT *cascade08öT§T *cascade08§T•T *cascade08•T®T *cascade08®T®T*cascade08®TëU *cascade08ëUìU *cascade08ìU∞U*cascade08∞U±U *cascade08±U’U*cascade08’U÷U *cascade08÷U‡U*cascade08‡U„U *cascade08„UÊU*cascade08ÊUÎU *cascade08ÎUÆV*cascade08ÆVØV *cascade08ØV±V*cascade08±V≤V *cascade08≤VΩV*cascade08ΩVÂV *cascade08ÂVÓV*cascade08ÓVÔV *cascade08ÔVˆV*cascade08ˆV˜V *cascade08˜VÄW*cascade08ÄWÅW *cascade08ÅWáW*cascade08áWàW *cascade08àWåW*cascade08åWçW *cascade08çW–W*cascade08–W—W *cascade08—W“W*cascade08“W”W *cascade08”WÿW*cascade08ÿWŸW *cascade08ŸWÂW*cascade08ÂWÁW *cascade08ÁWãY*cascade08ãYïY *cascade08ïY∆Y*cascade08∆Y»Y *cascade08»Y…Y*cascade08…Y Y *cascade08 YÀY*cascade08ÀYÕY *cascade08ÕYÅZ*cascade08ÅZßZ *cascade08ßZ™Z*cascade08™Z´Z *cascade08´Z“Z*cascade08“ZÊ[ *cascade08Ê[[*cascade08[Øc *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482Rfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/profile/page.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1