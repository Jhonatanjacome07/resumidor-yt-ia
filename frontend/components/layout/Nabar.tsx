"use client";

import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { Button } from "@/components/ui/button"; 
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, History, Menu, Sun, Moon, X } from "lucide-react"; 
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Evitar mismatch de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            VidSum
          </span>
        </Link>

        {/* --- MENÚ DE ESCRITORIO --- */}
        <div className="hidden md:flex items-center gap-8">
          
          {!user ? (
            // Opción A: Visitante (No Logueado)
            <>
              <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                <Link href="/#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Características</Link>
                <Link href="/#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cómo funciona</Link>
                <Link href="/#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Precios</Link>
              </div>
              <div className="flex gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                    Comenzar Gratis
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // Opción B: Usuario (Logueado)
            <>
              <div className="flex gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white gap-2">
                    <LayoutDashboard size={16} />
                    Analizar
                  </Button>
                </Link>
                <Link href="/dashboard/history">
                  <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white gap-2">
                    <History size={16} />
                    Mis Análisis
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{user.name}</span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={logout}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          )}

          {/* Toggle Theme Button (Ahora al final) */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white ml-2"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          )}
        </div>

        {/* --- MENÚ MÓVIL (Botón) --- */}
        <div className="md:hidden flex items-center gap-4">
           {/* Toggle Theme Button Mobile */}
           {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
                <X className="text-slate-500 dark:text-slate-300" />
            ) : (
                <Menu className="text-slate-500 dark:text-slate-300" />
            )}
          </Button>
        </div>
      </div>

      {/* --- CONTENIDO MENÚ MÓVIL --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
            >
                <div className="p-6 flex flex-col space-y-4">
                    {!user ? (
                        <>
                            <Link href="/#features" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2" onClick={() => setIsMobileMenuOpen(false)}>Características</Link>
                            <Link href="/#how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2" onClick={() => setIsMobileMenuOpen(false)}>Cómo funciona</Link>
                            <Link href="/#pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-2" onClick={() => setIsMobileMenuOpen(false)}>Precios</Link>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
                                        Ingresar
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                                        Comenzar Gratis
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-2">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 gap-2">
                                    <LayoutDashboard size={16} />
                                    Analizar
                                </Button>
                            </Link>
                            <Link href="/dashboard/history" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 gap-2">
                                    <History size={16} />
                                    Mis Análisis
                                </Button>
                            </Link>
                            <Button 
                                variant="destructive" 
                                className="w-full justify-start bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white mt-4"
                                onClick={() => {
                                    logout();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <LogOut size={16} className="mr-2" />
                                Cerrar Sesión
                            </Button>
                        </>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}