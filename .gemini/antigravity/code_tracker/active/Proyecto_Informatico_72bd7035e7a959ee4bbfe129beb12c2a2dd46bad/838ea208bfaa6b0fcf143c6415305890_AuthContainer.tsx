Ü."use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LoadingScreen from "../ui/LoadingScreen";
import { useRouter } from "next/navigation";
import { Code2, Sparkles } from "lucide-react";

interface AuthContainerProps {
    initialMode?: "login" | "register";
}

export default function AuthContainer({ initialMode = "login" }: AuthContainerProps) {
    const [mode, setMode] = useState<"login" | "register">(initialMode);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleSuccess = (data: any) => {
        setLoading(true);
        setTimeout(() => {
            router.push("/");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <AnimatePresence mode="wait">
                {loading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            <main className="flex-grow flex items-center justify-center relative px-4 py-32 overflow-hidden">
                {/* Dynamic Backgrounds Elements for Auth */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="hidden md:block absolute top-[20%] left-[10%] opacity-20 rotate-12">
                        <Code2 className="w-64 h-64 text-blue-500" />
                    </div>
                    <div className="hidden md:block absolute bottom-[20%] right-[10%] opacity-20 -rotate-12">
                        <Sparkles className="w-64 h-64 text-purple-500" />
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Branding/Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:flex flex-col space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-white leading-tight">
                                Impulsa tu carrera <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">colaborando en abierto.</span>
                            </h2>
                            <p className="text-xl text-white/40 font-light max-w-md">
                                √önete a miles de desarrolladores que comparten sus mejores soluciones y aprenden de los mejores expertos del sector.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="text-2xl font-bold text-white mb-1">99%</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest">Resoluci√≥n de Bugs</div>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest">Snippets Activos</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: The Form */}
                    <div className="flex justify-center lg:justify-end">
                        <AnimatePresence mode="wait">
                            {mode === "login" ? (
                                <motion.div
                                    key="login"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="w-full max-w-md"
                                >
                                    <LoginForm
                                        onSwitch={() => setMode("register")}
                                        onSuccess={handleSuccess}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="w-full max-w-md"
                                >
                                    <RegisterForm
                                        onSwitch={() => setMode("login")}
                                        onSuccess={handleSuccess}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
Ü.*cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2zfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/components/auth/AuthContainer.tsx:Tfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico