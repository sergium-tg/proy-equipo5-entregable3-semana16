ñ'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from './UserMenu.module.css';

export default function UserMenu() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    if (!user) return null;

    return (
        <div className={styles.userMenu}>
            <button className={styles.trigger}>
                <span className={styles.avatarWrapper}>
                    <div className={styles.avatar}>
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.username} className={styles.avatarImg} />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        )}
                    </div>
                </span>
            </button>

            <div className={styles.dropdown}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileAvatar}>
                        <div className={styles.avatar} style={{ width: '100%', height: '100%' }}>
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt={user.username} className={styles.avatarImg} />
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <h3 className={styles.username}>{user.username}</h3>
                    <span className={styles.role}>{user.role}</span>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{user.rating || 5.0}</span>
                        <span className={styles.statLabel}>Rating</span>
                    </div>
                </div>

                <div className={styles.menuActions}>
                    <Link href="/profile" className={styles.actionItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        View Profile
                    </Link>
                    <button onClick={handleLogout} className={`${styles.actionItem} ${styles.logoutBtn}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
× *cascade08×žž« *cascade08«¯*cascade08¯° *cascade08°²*cascade08²ñ *cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482_file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/dashboard/UserMenu.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1