"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
  buttonText: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  mode?: "adaptive" | "dark";
}

export function PricingCard({
  title,
  description,
  price,
  features,
  isRecommended = false,
  buttonText,
  buttonLink,
  onButtonClick,
  buttonVariant = "default",
  className,
  mode = "adaptive",
}: PricingCardProps) {
  const isDark = mode === "dark";

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl",
        mode === "adaptive" && "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800",
        isDark && "bg-slate-950 border-slate-800",
        isRecommended && (isDark ? "border-blue-500/50 shadow-2xl shadow-blue-900/20" : "border-blue-500/50 shadow-2xl shadow-blue-900/20"),
        className
      )}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          RECOMENDADO
        </div>
      )}
      
      <CardHeader>
        <CardTitle className={cn("text-2xl", isDark ? "text-white" : "text-slate-900 dark:text-white")}>{title}</CardTitle>
        <CardDescription className={cn(isDark ? "text-slate-400" : "text-slate-500 dark:text-slate-400")}>{description}</CardDescription>
        <div className="mt-4">
          <span className={cn("text-4xl font-bold", isDark ? "text-white" : "text-slate-900 dark:text-white")}>{price}</span>
          <span className={cn(isDark ? "text-slate-500" : "text-slate-500 dark:text-slate-400")}>/mes</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {features.map((item) => (
          <div key={item} className={cn("flex items-center gap-3", isDark ? "text-slate-300" : "text-slate-700 dark:text-slate-300")}>
            <CheckCircle2 size={18} className={isRecommended ? "text-blue-400" : "text-blue-500"} /> 
            {item}
          </div>
        ))}
      </CardContent>
      
      <CardFooter>
        {buttonLink ? (
          <Link href={buttonLink} className="w-full">
            <Button 
              variant={buttonVariant} 
              className={cn(
                "w-full",
                isRecommended && "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0",
                isDark && !isRecommended && "border-slate-700 text-white hover:bg-slate-800"
              )}
            >
              {buttonText}
            </Button>
          </Link>
        ) : (
          <Button 
            onClick={onButtonClick}
            variant={buttonVariant}
            className={cn(
              "w-full",
              isRecommended && "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0",
              isDark && !isRecommended && "border-slate-700 text-white hover:bg-slate-800"
            )}
          >
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
