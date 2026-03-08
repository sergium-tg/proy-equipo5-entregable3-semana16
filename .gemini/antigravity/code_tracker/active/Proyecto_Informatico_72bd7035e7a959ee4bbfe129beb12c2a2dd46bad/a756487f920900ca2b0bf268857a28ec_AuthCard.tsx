¿j"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FormProps {
    loading: boolean;
    error: string;
}

export const LoginForm = ({ loading, error }: FormProps) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: identifier, password }),
            });
            if (res.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (err) { }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl h-auto md:h-[600px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row mx-auto"
        >
            {/* Form Side (Content) */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Â¡Bienvenid@!</h1>
                    <p className="text-slate-500 font-medium text-sm">Gestiona tu identidad en la plataforma.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] text-blue-600 font-black uppercase tracking-widest ml-1">Email / Usuario</Label>
                        <Input
                            className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Introduce tus credenciales"
                            type="text"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 relative">
                        <Label className="text-[10px] text-blue-600 font-black uppercase tracking-widest ml-1">ContraseÃ±a</Label>
                        <div className="relative group">
                            <Input
                                className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold text-center">{error}</p>}

                    <div className="flex justify-end">
                        <Link href="/forgot-password" title="Recover Access" className="text-blue-600 text-[11px] font-bold hover:underline underline-offset-4">
                            Â¿Olvidaste tu contraseÃ±a?
                        </Link>
                    </div>

                    <button
                        className="w-full h-12 bg-slate-900 hover:bg-black text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 text-sm uppercase tracking-widest"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Iniciando..." : "Acceder ahora"}
                    </button>

                    <div className="pt-4 text-center">
                        <p className="text-slate-400 text-xs font-semibold">
                            Â¿Necesitas una cuenta? <Link href="/register" className="text-blue-600 hover:text-blue-700 font-black transition-colors">Crear perfil</Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Visual Side (Branding) */}
            <div className="hidden md:flex w-1/2 bg-blue-600 relative overflow-hidden p-12 flex-col justify-between">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -mr-32 -mt-32" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]" />
                </div>

                <div className="relative z-10">
                    <span className="text-white font-black text-xl tracking-tighter">DevAuth</span>
                </div>

                <div className="relative z-10 space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                        Protocolo de Identidad Avanzado
                    </h2>
                    <p className="text-white/80 text-base font-medium leading-relaxed">
                        Seguridad y gestiÃ³n centralizada para tus servicios de desarrollo.
                    </p>
                    <div className="pt-4 space-y-3">
                        {["Secure Access", "Infrastructure API", "Global Dashboard"].map((item, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={14} className="text-white" />
                                <span className="text-white/90 font-bold text-xs uppercase tracking-widest">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">
                    System Core v2.0
                </div>
            </div>
        </motion.div>
    );
};

export const RegisterForm = ({ loading, error }: FormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, email, password }),
            });
            if (res.ok) router.push("/login");
        } catch (err) { }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl h-auto md:h-[650px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row-reverse mx-auto"
        >
            {/* Form Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-6">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Crear Cuenta</h1>
                    <p className="text-slate-500 font-medium text-sm">RegÃ­strate para desplegar tus servicios.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] text-purple-600 font-black uppercase tracking-widest ml-1">Nickname</Label>
                        <Input
                            className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-10 rounded-xl"
                            placeholder="Tu alias dev"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] text-purple-600 font-black uppercase tracking-widest ml-1">Email</Label>
                        <Input
                            className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-10 rounded-xl"
                            placeholder="dev@ejemplo.com"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 relative">
                        <Label className="text-[10px] text-purple-600 font-black uppercase tracking-widest ml-1">Password</Label>
                        <div className="relative">
                            <Input
                                className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-10 rounded-xl"
                                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold text-center">{error}</p>}

                    <button
                        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl transition-all shadow-lg text-sm uppercase tracking-widest mt-2"
                        type="submit"
                        disabled={loading}
                    >
                        Desplegar Perfil
                    </button>

                    <div className="pt-4 text-center">
                        <p className="text-slate-400 text-xs font-semibold">
                            Â¿Ya tienes cuenta? <Link href="/login" className="text-purple-600 hover:text-purple-700 font-black transition-colors">Entrar</Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Visual Side */}
            <div className="hidden md:flex w-1/2 bg-purple-600 relative overflow-hidden p-12 flex-col justify-between">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -ml-32 -mb-32" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]" />
                </div>

                <div className="relative z-10 text-right">
                    <span className="text-white font-black text-xl tracking-tighter">DevAuth</span>
                </div>

                <div className="relative z-10 space-y-4 text-right">
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                        EvoluciÃ³n Continua
                    </h2>
                    <p className="text-white/80 text-base font-medium leading-relaxed">
                        Potencia tu flujo de trabajo con una identidad digital robusta.
                    </p>
                </div>

                <div className="relative z-10 text-[10px] text-white/40 font-black uppercase tracking-[0.4em] text-right">
                    Identity protocol v2.0
                </div>
            </div>
        </motion.div>
    );
};

export default function AuthCard() { return null; }' *cascade08''*cascade08'/ *cascade08/0*cascade0805 *cascade085T*cascade08Tƒ *cascade08ƒŒ *cascade08Œ« *cascade08«Í *cascade08ÍÍ*cascade08Íå *cascade08åî *cascade08îø*cascade08øù *cascade08ù€*cascade08€ *cascade08*cascade08Ž *cascade08Ž”*cascade08”• *cascade08•˜*cascade08˜™ *cascade08™œ*cascade08œ *cascade08¥*cascade08¥¦ *cascade08¦¨*cascade08¨© *cascade08©«*cascade08«¬ *cascade08¬¯ *cascade08¯º *cascade08º¼*cascade08¼½ *cascade08½¾*cascade08¾Í *cascade08ÍÏ*cascade08Ïå *cascade08åæ*cascade08æï *cascade08ïð *cascade08ðò *cascade08òø *cascade08øù *cascade08ùþ*cascade08þÿ *cascade08ÿˆ*cascade08ˆ‰ *cascade08‰œ *cascade08œž *cascade08ž» *cascade08»½*cascade08½¾ *cascade08¾Â*cascade08ÂÃ *cascade08ÃÅ*cascade08ÅÆ *cascade08ÆÊ *cascade08ÊÑ*cascade08ÑÒ *cascade08ÒÔ*cascade08Ôå *cascade08åê *cascade08ê¢ *cascade08¢ß*cascade08ßó *cascade08óö *cascade08ö† *cascade08†Š*cascade08Š‹ *cascade08‹Œ*cascade08Œ  *cascade08 ¬*cascade08¬¶ *cascade08¶Ñ*cascade08ÑÒ *cascade08Ò×*cascade08×Ø *cascade08ØÝ*cascade08ÝÞ *cascade08Þþ*cascade08þÿ *cascade08ÿ˜*cascade08˜™ *cascade08™œ*cascade08œ *cascade08´*cascade08´¿ *cascade08¿À*cascade08ÀÁ *cascade08ÁÆ*cascade08ÆÇ *cascade08ÇÌ*cascade08ÌÍ *cascade08ÍÎ*cascade08ÎÐ *cascade08ÐÖ*cascade08Ö× *cascade08×Ø*cascade08ØÝ *cascade08Ýæ*cascade08æî *cascade08îï *cascade08ïö*cascade08öù *cascade08ùÜ	*cascade08Ü	Ý	 *cascade08Ý	î	î	ï	 *cascade08
ï	õ	 õ	ö	*cascade08ö	ù	 *cascade08ù	ƒ
*cascade08ƒ
‡
 *cascade08‡
ˆ
*cascade08ˆ

 *cascade08
’
*cascade08’
“
 *cascade08“
•
*cascade08•

 *cascade08
¨
*cascade08¨
©
 *cascade08©
À
*cascade08À
É
 *cascade08É
Ñ
*cascade08Ñ
ç
 *cascade08ç
í
*cascade08í
î
 *cascade08î
ñ
*cascade08ñ
ò
 *cascade08ò
õ
*cascade08õ
ö
 *cascade08ö
ø
*cascade08ø
„ *cascade08„*cascade08¤ *cascade08¤¨*cascade08¨ª *cascade08ª®*cascade08®¯ *cascade08¯°*cascade08°ß *cascade08ßâ*cascade08âã *cascade08ãä*cascade08äå *cascade08åæ*cascade08æç *cascade08çê*cascade08ê *cascade08”*cascade08”º *cascade08º»*cascade08»æ *cascade08æç*cascade08çú *cascade08úý*cascade08ýÿ *cascade08ÿƒ*cascade08ƒ˜ *cascade08˜™*cascade08™Û *cascade08ÛÜ*cascade08Üí *cascade08íî*cascade08îï *cascade08ïõ*cascade08õ€ *cascade08€‚*cascade08‚ƒ *cascade08ƒ‰*cascade08‰ *cascade08“*cascade08“” *cascade08”›*cascade08›á *cascade08áâ*cascade08â© *cascade08©¬*cascade08¬ï *cascade08ïð*cascade08ð‘ *cascade08‘”*cascade08”• *cascade08•—*cascade08—ž *cascade08ž¡*cascade08¡¢ *cascade08¢«*cascade08«ñ *cascade08ñ¨*cascade08¨³ *cascade08³½*cascade08½¾ *cascade08¾Â*cascade08ÂÃ *cascade08ÃÍ*cascade08ÍÎ *cascade08ÎÑ*cascade08ÑÒ *cascade08ÒÕ*cascade08ÕÖ *cascade08ÖÙ*cascade08ÙÚ *cascade08ÚÛ*cascade08ÛÜ *cascade08Üç*cascade08çè *cascade08è—*cascade08—˜ *cascade08˜š*cascade08š› *cascade08›¥*cascade08¥¦ *cascade08¦ª*cascade08ª« *cascade08«¬*cascade08¬® *cascade08®°*cascade08°± *cascade08±¶*cascade08¶· *cascade08·»*cascade08»è *cascade08èë*cascade08ë· *cascade08·¸*cascade08¸Ù *cascade08ÙÜ*cascade08ÜÝ *cascade08Ýß*cascade08ßö *cascade08ö*cascade08Ö *cascade08Ö×*cascade08×å *cascade08åè*cascade08èê *cascade08êî*cascade08îß *cascade08ßà*cascade08àó *cascade08óô*cascade08ô™ *cascade08™*cascade08ž *cascade08žŸ*cascade08Ÿ²  *cascade08² ³ *cascade08³ ´  *cascade08´ ¶ *cascade08¶ ¹  *cascade08¹ ¼ *cascade08¼ ½  *cascade08½ ¿ *cascade08¿ Á  *cascade08Á Å *cascade08Å Æ  *cascade08Æ Ç  *cascade08Ç Þ  *cascade08Þ ß *cascade08ß ç  *cascade08ç ë *cascade08ë ì  *cascade08ì í *cascade08í ô  *cascade08ô õ *cascade08õ ö  *cascade08ö ÷ *cascade08÷ þ  *cascade08þ !*cascade08!‚! *cascade08‚!ƒ!*cascade08ƒ!„! *cascade08„!ˆ!*cascade08ˆ!‰! *cascade08‰!‹!*cascade08‹!! *cascade08!Ž!*cascade08Ž!! *cascade08!‘!*cascade08‘!“! *cascade08“!•!*cascade08•!–! *cascade08–!š!*cascade08š!Ú" *cascade08Ú"Û"*cascade08Û"ß" *cascade08ß"à"*cascade08à"á" *cascade08á"ã"*cascade08ã"å" *cascade08å"æ"*cascade08æ"ô" *cascade08ô"÷"*cascade08÷"Ú# *cascade08Ú#Û#*cascade08Û#ß# *cascade08ß#á#*cascade08á#ã# *cascade08ã#é#*cascade08é#ë# *cascade08ë#ì#*cascade08ì#ð# *cascade08ð#ø#*cascade08ø#ù# *cascade08ù#û#*cascade08û#ˆ% *cascade08ˆ%‰%*cascade08‰%Š% *cascade08Š%%*cascade08%™% *cascade08™%š%*cascade08š%›% *cascade08›%Ÿ%*cascade08Ÿ%¥% *cascade08¥%§%*cascade08§%°& *cascade08°&±&*cascade08±&¹& *cascade08¹&º&*cascade08º&Á& *cascade08Á&Â&*cascade08Â&Ã& *cascade08Ã&Ä&*cascade08Ä&Å& *cascade08Å&É&*cascade08É&ì& *cascade08ì&í&*cascade08í&î& *cascade08î&ò&*cascade08ò&§' *cascade08§'ª'*cascade08ª'«' *cascade08«'¯'*cascade08¯'À' *cascade08À'Á'*cascade08Á'à' *cascade08à'ã'*cascade08ã'å' *cascade08å'æ'*cascade08æ'è' *cascade08è'é'*cascade08é'ë' *cascade08ë'ì'*cascade08ì'í' *cascade08í'î'*cascade08î'ê( *cascade08ê(î(*cascade08î(ð( *cascade08ð(õ(*cascade08õ(÷( *cascade08÷(ü(*cascade08ü(ý( *cascade08ý(þ(*cascade08þ(²) *cascade08²)µ)*cascade08µ)¶) *cascade08¶)¸)*cascade08¸)¹) *cascade08¹)»)*cascade08»)¼) *cascade08¼)Á)*cascade08Á)Ê) *cascade08Ê)Ú)*cascade08Ú)* *cascade08*‘**cascade08‘*’* *cascade08’*“**cascade08“*”* *cascade08”*™**cascade08™*ß* *cascade08ß*à**cascade08à*µ+ *cascade08µ+·+*cascade08·+º+ *cascade08º+¼+*cascade08¼+À+ *cascade08À+Ä+*cascade08Ä+Î+ *cascade08Î+Ï+*cascade08Ï+Ð+ *cascade08Ð+Ñ+*cascade08Ñ+ã+ *cascade08ã+å+*cascade08å+ê+ *cascade08ê+ì+*cascade08ì+½, *cascade08½,À,*cascade08À,Â, *cascade08Â,Ã,*cascade08Ã,Í, *cascade08Í,Î,*cascade08Î,Ï, *cascade08Ï,Õ,*cascade08Õ,á, *cascade08á,â,*cascade08â,ä, *cascade08ä,ï,*cascade08ï,ñ, *cascade08ñ,ò,*cascade08ò,ó, *cascade08ó,õ,*cascade08õ,†- *cascade08†-‡-*cascade08‡-“- *cascade08“-”-*cascade08”-˜- *cascade08˜-™-*cascade08™-ÿ- *cascade08ÿ-‚.*cascade08‚.¡. *cascade08¡.¤.*cascade08¤.ª. *cascade08ª.¬.*cascade08¬.¶. *cascade08¶.·.*cascade08·.¸. *cascade08¸.¹.*cascade08¹.½. *cascade08½.À.*cascade08À.Â. *cascade08Â.Ä.*cascade08Ä.Æ. *cascade08Æ.È.*cascade08È.É. *cascade08É.Ê.*cascade08Ê.œ/ *cascade08œ//*cascade08/š0 *cascade08š00*cascade080ž0 *cascade08ž0£0*cascade08£0§0 *cascade08§0¨0*cascade08¨0©0 *cascade08©0¬0*cascade08¬0­0 *cascade08­0®0*cascade08®0¯0 *cascade08¯0°0 *cascade08°0±0 *cascade08±0´0*cascade08´0µ0 *cascade08µ0¹0*cascade08¹0û0 *cascade08û0þ0*cascade08þ0€1 *cascade08€1‚1*cascade08‚1‰1 *cascade08‰11*cascade081Ä1 *cascade08Ä1Å1*cascade08Å1Æ1 *cascade08Æ1Ç1*cascade08Ç1È1 *cascade08È1Ê1 *cascade08Ê1Ë1*cascade08Ë1Ì1 *cascade08Ì1Í1*cascade08Í1Î1 *cascade08Î1Ï1*cascade08Ï1Ð1 *cascade08Ð1Ò1*cascade08Ò1Ù1 *cascade08Ù1Û1 *cascade08Û1Ü1*cascade08Ü1Ý1 *cascade08Ý1Þ1 *cascade08Þ1á1 *cascade08á1â1*cascade08â1ã1 *cascade08ã1ä1*cascade08ä1æ1 *cascade08æ1ç1*cascade08ç1è1 *cascade08è1é1*cascade08é1ê1 *cascade08ê1ì1 *cascade08ì1î1*cascade08î1ï1 *cascade08ï1ñ1 *cascade08ñ1ò1 *cascade08ò1ó1*cascade08ó1ô1 *cascade08ô1õ1 *cascade08õ1ö1*cascade08ö1÷1 *cascade08÷1ü1 *cascade08ü1ÿ1*cascade08ÿ1€2 *cascade08€22*cascade082‚2 *cascade08‚2†2*cascade08†2Å2 *cascade08Å2Ê2*cascade08Ê2Ò2 *cascade08Ò2Ó2*cascade08Ó2ñ2 *cascade08ñ2ó2*cascade08ó2ô2 *cascade08ô2÷2*cascade08÷2ø2 *cascade08ø2ý2*cascade08ý2‚3 *cascade08‚3†3*cascade08†3‡3 *cascade08‡3‹3*cascade08‹3Œ3 *cascade08Œ33*cascade083‘3 *cascade08‘3”3*cascade08”3˜3 *cascade08˜3ž3*cascade08ž3Ÿ3 *cascade08Ÿ3¥3*cascade08¥3¦3 *cascade08¦3§3*cascade08§3Å4 *cascade08Å4Æ4*cascade08Æ4˜5 *cascade08˜5›5*cascade08›55 *cascade085Ÿ5*cascade08Ÿ5°5 *cascade08°5±5*cascade08±5²5 *cascade08²5Ì5*cascade08Ì57 *cascade0877*cascade087’7 *cascade08’7”7*cascade08”7Ò7 *cascade08Ò7Ó7*cascade08Ó7Ö7 *cascade08Ö7Û7*cascade08Û7Ý7 *cascade08Ý7â7*cascade08â7—8 *cascade08—8ž8*cascade08ž8˜> *cascade08˜>üi*cascade08üi‰j *cascade08‰j›j *cascade08›j¤j*cascade08¤j¬j *cascade08¬j¼j*cascade08¼j½j *cascade08½j¿j*cascade08¿j¿j"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2xfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/components/auth/AuthCard.tsx:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico