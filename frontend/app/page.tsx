"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Zap, Shield, PlayCircle, CheckCircle2, ArrowRight, Link as LinkIcon, FileText, Sparkles } from "lucide-react";
import { TechStackCarousel } from "@/components/TechStackCarousel";

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden selection:bg-blue-500/30">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none opacity-50" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-blue-500/30 text-blue-400 bg-blue-500/5 backdrop-blur-sm">
              <Sparkles size={14} className="mr-2 text-yellow-400" /> Potenciado por Gemini 
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white">
              Resume videos de YouTube <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                en segundos con IA
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Ahorra horas de visualización. Obtén resúmenes ejecutivos, puntos clave y análisis de sentimiento de cualquier video al instante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-full transition-all hover:scale-105">
                  Probar Gratis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="ghost" size="lg" className="h-14 px-8 text-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full">
                  Cómo funciona
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TECH STACK CAROUSEL --- */}
      <TechStackCarousel />

      {/* --- CÓMO FUNCIONA (HOW IT WORKS) --- */}
      <section id="how-it-works" className="py-24 bg-slate-100 dark:bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Tan simple como contar hasta tres</h2>
            <p className="text-slate-600 dark:text-slate-400">No necesitas configurar nada. Solo copia y pega.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Línea conectora (visible solo en desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30" />

            {[
              { icon: <LinkIcon className="h-8 w-8 text-white" />, title: "1. Pega el Link", desc: "Copia la URL de cualquier video de YouTube que quieras analizar." },
              { icon: <Bot className="h-8 w-8 text-white" />, title: "2. La IA Analiza", desc: "Nuestro motor n8n procesa la transcripción y Gemini extrae lo vital." },
              { icon: <FileText className="h-8 w-8 text-white" />, title: "3. Obtén el Resumen", desc: "Recibe un resumen estructurado, puntos clave y etiquetas al instante." }
            ].map((step, idx) => (
              <motion.div 
                key={idx} 
                className="relative z-10 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-900/10 group hover:border-blue-500/50 transition-colors">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRECIOS (PRICING) --- */}
      <section id="pricing" className="py-24 bg-slate-200 dark:bg-slate-900/30 border-y border-slate-300 dark:border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Planes transparentes</h2>
            <p className="text-slate-600 dark:text-slate-400">Comienza gratis y escala cuando lo necesites.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Gratis */}
            <Card className="bg-slate-950 border-slate-800 relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Hobby</CardTitle>
                <CardDescription>Para uso personal</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-slate-500">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {["3 Análisis diarios", "Resúmenes básicos", "Historial de 7 días", "Soporte comunitario"].map(item => (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-blue-500" /> {item}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button variant="outline" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0">Registrarse Gratis</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plan Pro */}
            <Card className="bg-slate-950 border-blue-500/50 relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                <CardDescription>Para creadores y estudiantes</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$9</span>
                  <span className="text-slate-500">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Análisis ilimitados", "Análisis profundos con GPT-4", "Historial ilimitado", "Exportar a PDF/Notion", "Soporte prioritario"].map(item => (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-blue-400" /> {item}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0">
                  Mejorar a Pro
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}