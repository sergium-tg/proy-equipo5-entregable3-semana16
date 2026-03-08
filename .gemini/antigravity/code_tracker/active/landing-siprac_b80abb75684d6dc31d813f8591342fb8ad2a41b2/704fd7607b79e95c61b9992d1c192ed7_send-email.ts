�T'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDiagnosticEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const employees = formData.get('employees') as string;
    const risk = formData.get('risk') as string;
    const sector = formData.get('sector') as string;
    const progress = formData.get('progress') as string;
    const accidents = formData.get('accidents') as string;
    const currentSystems = formData.get('current-systems') as string;

    try {
        const { data, error } = await resend.emails.send({
            from: 'SIPRAC Diagnóstico <onboarding@resend.dev>',
            to: ['siprac.director@gmail.com'],
            replyTo: email,
            subject: `Nuevo Diagnóstico Preliminar: ${company}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Diagnóstico SIPRAC</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF9F6; padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Main Glass Container -->
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 24px; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 10px 40px rgba(0,0,0,0.05); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px; background-color: #ffffff;">
                            <h1 style="margin: 0; color: #f97316; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">Nuevo Lead Cualificado</h1>
                            <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Diagnóstico Preliminar</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            
                            <!-- Identification Section -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="background-color: #FAF9F6; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px; font-weight: 700; display: flex; align-items: center;">
                                            <span style="color: #f97316; margin-right: 8px;">●</span> Identificación
                                        </h3>
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Nombre:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Empresa:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">${company}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Email:</td>
                                                <td style="padding-bottom: 8px; color: #f97316; font-size: 14px; font-weight: 600; text-decoration: none;">${email}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="color: #6b7280; font-size: 14px; font-weight: 500;">Teléfono:</td>
                                                <td style="color: #111827; font-size: 14px; font-weight: 600;">${phone}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Profile Section -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="background-color: #FAF9F6; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px; font-weight: 700; display: flex; align-items: center;">
                                            <span style="color: #f97316; margin-right: 8px;">●</span> Perfil Operativo
                                        </h3>
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Empleados:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">${employees}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Riesgo ARL:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">Clase ${risk}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="color: #6b7280; font-size: 14px; font-weight: 500;">Sector:</td>
                                                <td style="color: #111827; font-size: 14px; font-weight: 600;">${sector}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- System Status Section -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="background-color: #FAF9F6; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px; font-weight: 700; display: flex; align-items: center;">
                                            <span style="color: #f97316; margin-right: 8px;">●</span> Estado Actual
                                        </h3>
                                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Avance SG-SST:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">${progress}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="padding-bottom: 8px; color: #6b7280; font-size: 14px; font-weight: 500;">Accidentalidad:</td>
                                                <td style="padding-bottom: 8px; color: #111827; font-size: 14px; font-weight: 600;">${accidents}</td>
                                            </tr>
                                            <tr>
                                                <td width="35%" style="color: #6b7280; font-size: 14px; font-weight: 500;">Sistemas:</td>
                                                <td style="color: #111827; font-size: 14px; font-weight: 600;">${currentSystems || 'No especificado'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 24px; background-color: #111827; border-top: 4px solid #f97316;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">SIPRAC &copy; ${new Date().getFullYear()}</p>
                            <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 10px;">Sistema Automático de Notificaciones</p>
                        </td>
                    </tr>
                </table>

                <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">Este mensaje es confidencial y exclusivo para el equipo de SIPRAC.</p>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Error enviando email:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Error inesperado:', err);
        return { success: false, error: 'Ocurrió un error inesperado al enviar el diagnóstico.' };
    }
}
�T"(b80abb75684d6dc31d813f8591342fb8ad2a41b22ofile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/app/actions/send-email.ts:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac