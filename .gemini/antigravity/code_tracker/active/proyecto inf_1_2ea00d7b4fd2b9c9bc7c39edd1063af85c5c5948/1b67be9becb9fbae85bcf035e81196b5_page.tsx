�*'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TermsPage() {
    const router = useRouter();
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        if (!accepted) return;
        // Señalizar al formulario de registro que ya se aceptó
        sessionStorage.setItem('terms_accepted', 'true');
        router.push('/register');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            color: 'white',
            padding: '60px 20px',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            <nav style={{ maxWidth: '800px', margin: '0 auto 40px', display: 'flex', justifyContent: 'flex-start' }}>
                <Link href="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Volver a mi registro
                </Link>
            </nav>

            <article style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.03)',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'var(--shadow-xl)'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', background: 'linear-gradient(to right, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Términos y Condiciones
                </h1>

                <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                    <p>Bienvenido a DevPortal. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos diseñados para mantener una comunidad de desarrolladores de alto nivel.</p>

                    <h3 style={{ color: 'white', marginTop: '30px' }}>1. Uso del Servicio</h3>
                    <p>Nuestra plataforma está destinada exclusivamente a fines de colaboración y demostración de habilidades técnicas. Queda prohibido el uso de lenguaje ofensivo o la carga de contenido malicioso.</p>

                    <h3 style={{ color: 'white', marginTop: '30px' }}>2. Privacidad de Datos</h3>
                    <p>Valoramos tu privacidad. Tus datos personales, como el correo electrónico y el nombre de usuario, se mantienen de forma segura y solo se utilizan para las funcionalidades internas del portal.</p>

                    <h3 style={{ color: 'white', marginTop: '30px' }}>3. Propiedad Intelectual</h3>
                    <p>Mantienes la propiedad de cualquier contenido o código que compartas. Al publicarlo, nos otorgas una licencia limitada para mostrarlo dentro de la plataforma.</p>

                    <div style={{
                        marginTop: '60px',
                        padding: '30px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        textAlign: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                            <input
                                type="checkbox"
                                id="accept"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                            />
                            <label htmlFor="accept" style={{ cursor: 'pointer', fontWeight: 600 }}>He leído y acepto los términos y condiciones</label>
                        </div>

                        <button
                            onClick={handleAccept}
                            disabled={!accepted}
                            style={{
                                padding: '14px 40px',
                                background: accepted ? 'var(--color-primary)' : '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 700,
                                cursor: accepted ? 'pointer' : 'not-allowed',
                                transition: '0.3s',
                                boxShadow: accepted ? 'var(--glow-primary)' : 'none'
                            }}
                        >
                            Aceptar y Continuar
                        </button>
                    </div>
                </div>
            </article>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
�**cascade08"(2ea00d7b4fd2b9c9bc7c39edd1063af85c5c59482Pfile:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/terms/page.tsx:9file:///Users/santiagovalencia/Documents/proyecto%20inf_1