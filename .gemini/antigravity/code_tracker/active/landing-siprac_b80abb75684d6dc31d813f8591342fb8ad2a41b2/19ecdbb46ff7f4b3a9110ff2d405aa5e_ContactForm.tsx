֏"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User, Building, Phone, Mail, List, Settings, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendDiagnosticEmail } from "@/app/actions/send-email";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const formData = new FormData(event.currentTarget);
        const result = await sendDiagnosticEmail(formData);

        setIsSubmitting(false);
        if (result.success) {
            setStatus('success');
            (event.target as HTMLFormElement).reset();
        } else {
            setStatus('error');
            setErrorMessage(result.error || "Ocurrió un error al enviar el diagnóstico.");
        }
    }

    if (status === 'success') {
        return (
            <section className="py-20 bg-transparent text-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-16 border border-gray-50 flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 animate-bounce">
                            <CheckCircle2 className="size-10" />
                        </div>
                        <h2 className="text-3xl font-black text-black mb-4 uppercase">¡Diagnóstico Enviado!</h2>
                        <p className="text-gray-500 font-bold leading-relaxed mb-8">
                            Hemos recibido su información correctamente. Un consultor experto de SIPRAC
                            revisará su perfil y se pondrá en contacto en menos de 24 horas.
                        </p>
                        <Button onClick={() => setStatus('idle')} className="rounded-full px-12">
                            Enviar otro diagnóstico
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-[#FAF9F6] rounded-[2.5rem] shadow-[20px_20px_40px_#d1cfcc,-20px_-20px_40px_#ffffff] p-8 md:p-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight uppercase">Diagnóstico Preliminar</h2>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em] opacity-70">
                            Complete los detalles operativos para una asesoría personalizada
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* 1. Datos de Identificación */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-gray-200/50 pb-4">
                                <div className="p-3 bg-[#FAF9F6] rounded-xl text-orange-500 shadow-[inset_4px_4px_8px_#d1cfcc,inset_-4px_-4px_8px_#ffffff]">
                                    <User className="size-5" />
                                </div>
                                <h3 className="text-xl font-black text-black uppercase tracking-tight">Datos de Identificación</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-400">Nombre Completo / Cargo *</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 size-4 group-focus-within:scale-110 transition-transform" />
                                        <Input id="name" name="name" type="text" placeholder="Ej: Juan Pérez / Gerente HSEQ"
                                            className="pl-12 h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-gray-400">Razón Social *</Label>
                                    <div className="relative group">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 size-4 group-focus-within:scale-110 transition-transform" />
                                        <Input id="company" name="company" type="text" placeholder="Nombre legal de la empresa"
                                            className="pl-12 h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-400">Correo Electrónico Corporativo *</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 size-4 group-focus-within:scale-110 transition-transform" />
                                        <Input id="email" name="email" type="email" placeholder="ejemplo@empresa.com"
                                            className="pl-12 h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-gray-400">Teléfono / WhatsApp *</Label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 size-4 group-focus-within:scale-110 transition-transform" />
                                        <Input id="phone" name="phone" type="tel" placeholder="+57 300 000 0000"
                                            className="pl-12 h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Perfil Operativo */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-gray-200/50 pb-4">
                                <div className="p-3 bg-[#FAF9F6] rounded-xl text-blue-500 shadow-[inset_4px_4px_8px_#d1cfcc,inset_-4px_-4px_8px_#ffffff]">
                                    <List className="size-5" />
                                </div>
                                <h3 className="text-xl font-black text-black uppercase tracking-tight">Perfil Operativo</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="employees" className="text-xs font-black uppercase tracking-widest text-gray-400">Número de Empleados</Label>
                                    <Select name="employees">
                                        <SelectTrigger className="h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all w-full">
                                            <SelectValue placeholder="Seleccione el rango" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1 - 10 empleados</SelectItem>
                                            <SelectItem value="11-50">11 - 50 empleados</SelectItem>
                                            <SelectItem value="51-200">51 - 200 empleados</SelectItem>
                                            <SelectItem value="200+">Más de 200 empleados</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="risk" className="text-xs font-black uppercase tracking-widest text-gray-400">Nivel de Riesgo (ARL)</Label>
                                    <Select name="risk">
                                        <SelectTrigger className="h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all w-full">
                                            <SelectValue placeholder="Seleccione el nivel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="I">Clase I (Mínimo)</SelectItem>
                                            <SelectItem value="II">Clase II (Bajo)</SelectItem>
                                            <SelectItem value="III">Clase III (Medio)</SelectItem>
                                            <SelectItem value="IV">Clase IV (Alto)</SelectItem>
                                            <SelectItem value="V">Clase V (Máximo)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="sector" className="text-xs font-black uppercase tracking-widest text-gray-400">Sector Económico / Actividad Principal</Label>
                                    <Input id="sector" name="sector" type="text" placeholder="Ej: Construcción, Servicios, Manufactura..."
                                        className="h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Estado Actual del Sistema */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-gray-200/50 pb-4">
                                <div className="p-3 bg-[#FAF9F6] rounded-xl text-green-500 shadow-[inset_4px_4px_8px_#d1cfcc,inset_-4px_-4px_8px_#ffffff]">
                                    <Settings className="size-5" />
                                </div>
                                <h3 className="text-xl font-black text-black uppercase tracking-tight">Estado Actual del Sistema</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="progress" className="text-xs font-black uppercase tracking-widest text-gray-400">% de Avance del SG-SST</Label>
                                    <Input id="progress" name="progress" type="text" placeholder="Ej: 45%"
                                        className="h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accidents" className="text-xs font-black uppercase tracking-widest text-gray-400">Índice de Accidentalidad (Último año)</Label>
                                    <Input id="accidents" name="accidents" type="text" placeholder="N° de accidentes o índice"
                                        className="h-14 bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400" />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="current-systems" className="text-xs font-black uppercase tracking-widest text-gray-400">¿Cuenta actualmente con algún Sistema de Gestión implementado?</Label>
                                    <Textarea
                                        id="current-systems"
                                        name="current-systems"
                                        placeholder="Mencione ISO 9001, 14001, 45001, RUC, etc."
                                        className="min-h-[100px] bg-[#FAF9F6] border-none rounded-2xl shadow-[inset_6px_6px_12px_#d1cfcc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_2px_2px_4px_#d1cfcc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-orange-500/20 transition-all resize-none pt-4 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-10 border-t border-gray-200/50">
                            <div className="flex items-start space-x-3 group cursor-pointer">
                                <Checkbox id="terms" name="terms" className="mt-1 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" required />
                                <Label htmlFor="terms" className="text-[10px] text-gray-500 font-bold leading-relaxed cursor-pointer group-hover:text-gray-700 transition-colors uppercase tracking-wider">
                                    Acepto la <span className="text-orange-500 hover:underline">Política de Privacidad</span> y autorizo el tratamiento de mis datos personales *
                                </Label>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
                                <AlertCircle className="size-5 shrink-0" />
                                {errorMessage}
                            </div>
                        )}

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 rounded-full text-lg font-black shadow-[6px_6px_12px_#d1cfcc,-6px_-6px_12px_#ffffff] hover:shadow-[10px_10px_20px_#d1cfcc,-10px_-10px_20px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1cfcc,inset_-4px_-4px_8px_#ffffff] hover:-translate-y-1 transition-all group disabled:opacity-70 disabled:grayscale disabled:hover:translate-y-0 text-white bg-orange-500 hover:bg-orange-600"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Procesando Diagnóstico...
                                    </span>
                                ) : (
                                    <>
                                        <Send className="mr-2 size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Enviar Diagnóstico
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
֏"(b80abb75684d6dc31d813f8591342fb8ad2a41b22xfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/ContactForm.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac