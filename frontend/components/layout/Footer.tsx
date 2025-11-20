import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">VidSum</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Resúmenes inteligentes de videos de YouTube potenciados por IA. 
              Ahorra tiempo y obtén insights valiosos al instante.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Producto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal y Redes */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Conecta</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.linkedin.com/in/jhonatan-jacome-" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/Jhonatanjacome07/resumidor-yt-ia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-slate-300 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-500 text-center md:text-left">
              © 2025 <span className="font-semibold">SafeSolutions</span>. Todos los derechos reservados.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-600 text-center md:text-right">
              Desarrollado con ❤️ usando Next.js, Laravel y Gemini AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
