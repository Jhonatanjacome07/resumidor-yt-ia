"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-slate-900 dark:text-white">
            Actualiza a Pro para desbloquear todas las funciones
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Plan Gratis */}
          <PricingCard
            title="Hobby"
            description="Para uso personal"
            price="$0"
            features={["3 Análisis diarios", "Resúmenes básicos", "Historial de 7 días", "Soporte comunitario"]}
            buttonText="Plan Actual"
            onButtonClick={() => onOpenChange(false)}
            buttonVariant="outline"
          />

          {/* Plan Pro */}
          <PricingCard
            title="Pro"
            description="Para creadores y estudiantes"
            price="$9"
            features={["Análisis ilimitados", "Análisis profundos con GPT-4", "Historial ilimitado", "Exportar a PDF/Notion", "Soporte prioritario"]}
            isRecommended={true}
            buttonText="Próximamente"
            onButtonClick={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
