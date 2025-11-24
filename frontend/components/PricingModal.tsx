"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUsage?: number;
}

export default function PricingModal({ open, onOpenChange, currentUsage = 0 }: PricingModalProps) {
  const handleUpgrade = () => {
    // Redirect to Lemon Squeezy checkout
    window.location.href = 'https://safesolutions.lemonsqueezy.com/buy/934dcb77-2f21-4356-bb5b-6c0b8d235a95';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-slate-900 dark:text-white">
            Desbloquea Todo el Potencial
          </DialogTitle>
          <DialogDescription className="text-center text-slate-600 dark:text-slate-400">
            Has usado {currentUsage} de 3 análisis gratuitos este mes
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Free Plan */}
          <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Plan Gratuito</h3>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">$0</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-300">3 análisis de video por mes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Resúmenes básicos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Historial de análisis</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                Plan Premium
                <Zap className="w-5 h-5 text-yellow-500" />
              </h3>
              <div className="text-right">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">$9.99</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">/mes</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Análisis ilimitados</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Resúmenes detallados con IA</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Análisis de videos largos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Soporte prioritario</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Acceso anticipado a nuevas funciones</span>
              </li>
            </ul>

            <Button 
              onClick={handleUpgrade} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              size="lg"
            >
              Actualizar a Premium - $9.99/mes
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Después del pago, tu cuenta será activada en menos de 24 horas
        </p>
      </DialogContent>
    </Dialog>
  );
}
