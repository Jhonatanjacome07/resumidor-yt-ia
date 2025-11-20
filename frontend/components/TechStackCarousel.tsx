"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { name: "Next.js", icon: "/tech-icons/nextdotjs.svg" },
  { name: "React", icon: "/tech-icons/react.svg" },
  { name: "TypeScript", icon: "/tech-icons/typescript.svg" },
  { name: "Tailwind CSS", icon: "/tech-icons/tailwindcss.svg" },
  { name: "Laravel", icon: "/tech-icons/laravel.svg" },
  { name: "PHP", icon: "/tech-icons/php.svg" },
  { name: "n8n", icon: "/tech-icons/n8n.svg" },
  { name: "Gemini AI", icon: "/tech-icons/googlegemini.svg" },
  { name: "PostgreSQL", icon: "/tech-icons/postgresql.svg" },
  { name: "Docker", icon: "/tech-icons/docker.svg" },
];

export function TechStackCarousel() {
  // Triplicamos el array para asegurar un loop perfecto sin espacios
  const duplicatedStack = [...techStack, ...techStack, ...techStack];

  return (
    <div className="w-full py-12 bg-slate-950 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-sm text-slate-500 dark:text-slate-500 uppercase tracking-wider font-medium">
          Tecnologías Utilizadas
        </p>
      </div>
      
      <div className="relative">
        {/* Gradientes en los bordes para efecto de fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Contenedor del carrusel */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: ["0%", "-33.333%"], // Mueve exactamente 1/3 del contenido (un set completo)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50, // Muy lento - 50 segundos
              ease: "linear",
            },
          }}
        >
          {duplicatedStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-800/50 backdrop-blur-sm whitespace-nowrap flex-shrink-0 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
