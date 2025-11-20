import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Nabar"; 

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeSolutions AI",
  description: "Resumidor de videos con Inteligencia Artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground antialiased min-h-screen")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar /> 
          <main className="pt-16"> 
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}