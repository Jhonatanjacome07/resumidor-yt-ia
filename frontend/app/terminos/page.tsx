import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones - VidSum",
  description: "Términos y condiciones de uso de VidSum",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Última actualización: 20 de noviembre de 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Al acceder y utilizar VidSum, aceptas estar sujeto a estos Términos y Condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              2. Descripción del Servicio
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              VidSum es una plataforma que utiliza inteligencia artificial para generar resúmenes 
              de videos de YouTube. El servicio está diseñado para ayudar a los usuarios a obtener 
              información clave de videos de manera rápida y eficiente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              3. Uso Aceptable
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Al utilizar VidSum, te comprometes a:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Utilizar el servicio solo para fines legales y legítimos</li>
              <li>No intentar acceder a áreas no autorizadas del sistema</li>
              <li>No sobrecargar o interferir con el funcionamiento del servicio</li>
              <li>Respetar los derechos de propiedad intelectual de terceros</li>
              <li>No utilizar el servicio para actividades fraudulentas o maliciosas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              4. Cuenta de Usuario
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Para utilizar ciertas funciones de VidSum, debes crear una cuenta. Eres responsable 
              de mantener la confidencialidad de tu cuenta y contraseña, y de todas las actividades 
              que ocurran bajo tu cuenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              5. Propiedad Intelectual
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Los resúmenes generados por VidSum son proporcionados "tal cual" y están basados en 
              contenido de terceros (videos de YouTube). VidSum no reclama propiedad sobre el contenido 
              original de los videos analizados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              6. Limitación de Responsabilidad
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              VidSum se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos la 
              exactitud, completitud o utilidad de los resúmenes generados. El uso del servicio 
              es bajo tu propio riesgo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              7. Privacidad
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tu privacidad es importante para nosotros. Recopilamos y utilizamos información 
              personal de acuerdo con nuestra política de privacidad. Al usar VidSum, aceptas 
              la recopilación y uso de información según lo descrito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              8. Modificaciones del Servicio
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Nos reservamos el derecho de modificar o discontinuar VidSum en cualquier momento, 
              con o sin previo aviso. No seremos responsables ante ti o terceros por cualquier 
              modificación, suspensión o discontinuación del servicio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              9. Cambios a los Términos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Podemos actualizar estos Términos y Condiciones periódicamente. Te notificaremos 
              sobre cambios significativos publicando los nuevos términos en esta página. Se 
              recomienda revisar esta página regularmente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              10. Contacto
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través 
              de nuestros canales oficiales en LinkedIn o GitHub.
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">Nota:</strong> Este es un proyecto 
              de portafolio desarrollado por SafeSolutions. VidSum utiliza la API de YouTube y 
              Gemini AI para proporcionar sus servicios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
