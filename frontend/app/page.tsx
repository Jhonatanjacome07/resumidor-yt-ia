"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Zap, Shield, PlayCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function LandingPage() {
  // Variantes para las animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        {/* Efecto de Blur/Gradiente de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
              <Zap size={14} className="mr-2 fill-blue-400" /> Potenciado por Gemini 1.5 Pro
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Resume videos de YouTube <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                en segundos con IA
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deja de perder tiempo viendo videos largos. Obtén los puntos clave, 
              resúmenes ejecutivos y análisis profundos al instante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 rounded-full">
                  Probar Gratis Ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full">
                  <PlayCircle className="mr-2 h-5 w-5" /> Ver Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-slate-900/50 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué SafeSolutions?</h2>
            <p className="text-slate-400">Tecnología avanzada para maximizar tu productividad.</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Bot className="h-10 w-10 text-blue-400" />,
                title: "IA Avanzada",
                desc: "Utilizamos Google Gemini para entender el contexto, tono y matices de cada video."
              },
              {
                icon: <Shield className="h-10 w-10 text-teal-400" />,
                title: "Privacidad Total",
                desc: "Tus análisis son privados y seguros. Solo tú tienes acceso a tu historial."
              },
              {
                icon: <Zap className="h-10 w-10 text-amber-400" />,
                title: "Velocidad Rayo",
                desc: "Procesamos transcripciones de horas en cuestión de segundos gracias a n8n."
              }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="bg-slate-950 border-slate-800 hover:border-slate-700 transition-colors h-full">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-slate-900 w-fit rounded-xl border border-slate-800">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-slate-100">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl text-slate-200">SafeSolutions</span>
            <p className="text-slate-500 text-sm mt-1">© 2025 Jhonatan Jácome. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Github</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}