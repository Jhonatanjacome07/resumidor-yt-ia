"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface PremiumFeatureCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onUpgradeClick: () => void;
}

export function PremiumFeatureCard({ title, icon, children, onUpgradeClick }: PremiumFeatureCardProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-slate-900 dark:text-white">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {/* Blurred content */}
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
        
        {/* Premium overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-300">
          <Lock className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
          <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">Función Premium</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 text-center px-4">
            Actualiza a Pro para desbloquear esta función
          </p>
          <button
            onClick={onUpgradeClick}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            Ver Planes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
