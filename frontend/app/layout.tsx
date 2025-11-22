import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Nabar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"; 
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VidSum - Resúmenes de Video con IA",
  description: "Resúmenes de video con Inteligencia Artificial",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(outfit.className, "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors /> 
        </ThemeProvider>
      </body>
    </html>
  );
}