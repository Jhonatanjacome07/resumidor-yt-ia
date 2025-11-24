# 🎥 VidSum - Resumidor de Videos de YouTube con IA

**VidSum** es un sitio moderno que permite a los usuarios obtener resúmenes detallados, transcripciones y análisis profundos de videos de YouTube utilizando Inteligencia Artificial. Diseñado con una arquitectura robusta y escalable, ofrece una experiencia de usuario premium con soporte para modos claro/oscuro, gestión de historial y suscripciones.

---

## 🚀 ¿Qué es y cómo funciona?

VidSum automatiza el proceso de consumo de contenido de video. En lugar de ver videos largos, los usuarios simplemente pegan una URL de YouTube y reciben:
1.  **Resumen Ejecutivo**: Los puntos clave del video.
2.  **Análisis Detallado**: Desglose por secciones y temas.
3.  **Chat con el Video (Futuro)**: Capacidad de hacer preguntas sobre el contenido.

### Flujo de Trabajo
1.  **Usuario**: Envía la URL del video desde el Frontend (Next.js).
2.  **Backend (Laravel)**: Valida la solicitud, verifica límites de uso (Plan Gratuito vs Premium) y envía el trabajo a la cola de procesamiento.
3.  **Automatización (n8n)**:
    *   Recibe la URL del video vía Webhook.
    *   Descarga/Obtiene la transcripción del video.
    *   Procesa el texto con **OpenAI (GPT-4o)** para generar el resumen y análisis.
    *   Envía los resultados de vuelta al Backend.
4.  **Base de Datos**: Se guarda el análisis y se asocia al usuario.
5.  **Frontend**: Muestra el resultado en tiempo real y lo guarda en el historial.

---

## 🛠️ Tecnologías Usadas

### 🎨 Frontend (Carpeta `/frontend`)
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Lenguaje**: TypeScript
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/)
*   **Iconos**: Lucide React
*   **Estado Global**: Zustand
*   **Cliente HTTP**: Axios
*   **Animaciones**: Framer Motion

### ⚙️ Backend (Carpeta `/backend`)
*   **Framework**: [Laravel 11](https://laravel.com/)
*   **Lenguaje**: PHP 8.2+
*   **Base de Datos**: PostgreSQL
*   **Autenticación**: Laravel Sanctum (API Tokens / Cookies)
*   **Mailing**: SMTP (Mailtrap/Gmail)
*   **Pagos**: Lemon Squeezy (anteriormente Stripe)

### 🤖 Automatización e IA (Carpeta `/worflow-n8n`)
*   **Orquestador**: [n8n](https://n8n.io/)
*   **Modelos IA**: OpenAI GPT-4o / GPT-3.5-turbo
*   **Integración**: Webhooks HTTP

---

## 📝 Guía de Instalación

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Requisitos Previos
*   Node.js 20+ y npm
*   PHP 8.2+ y Composer
*   PostgreSQL
*   Instancia de n8n (Local o Cloud)

### 1. Clonar el Repositorio
```bash
git clone <https://github.com/Jhonatanjacome07/resumidor-yt-ia.git>
cd ia-portfolio-project
```

### 2. Configuración del Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
```

**Configura tu archivo `.env` con tus credenciales:**

```ini
APP_NAME="VidSum"
APP_URL=http://localhost:8000

# Base de Datos
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vidsum_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password

# Configuración de Correo (Para verificación de email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=tu_usuario_mailtrap
MAIL_PASSWORD=tu_password_mailtrap
MAIL_FROM_ADDRESS="hello@vidsum.com"

# Integración con n8n
N8N_WEBHOOK_URL="https://tu-instancia-n8n.com/webhook/..."
N8N_API_KEY="tu_api_key_secreta"

# Frontend URL (Para CORS y Sanctum)
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

**Finalizar configuración:**
```bash
php artisan key:generate
php artisan migrate
php artisan serve
```
*El backend estará corriendo en `http://localhost:8000`*

### 3. Configuración del Frontend (Next.js)

Abre una nueva terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
```

**Configura tu archivo `.env.local`:**

```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Iniciar servidor de desarrollo:**
```bash
npm run dev
```
*El frontend estará corriendo en `http://localhost:3000`*

### 4. Configuración de n8n (Automatización)

1.  Abre tu instancia de n8n.
2.  Importa el archivo de flujo ubicado en: `worflow-n8n/Resumidor-YT - Análisis de Videos con Transcripción.json`.
3.  Configura las credenciales dentro de n8n:
    *   **OpenAI API Key**: Para generar los resúmenes.
4.  Asegúrate de que el nodo **Webhook** en n8n coincida con la URL que pusiste en `N8N_WEBHOOK_URL` en el backend.

### 5. Configuración de Pagos (Lemon Squeezy)

El proyecto utiliza enlaces de pago directos de Lemon Squeezy configurados en el Frontend.
*   Para cambiar los enlaces de pago, edita `frontend/components/PricingModal.tsx` y `frontend/app/page.tsx`.

---

## 🚀 Despliegue (Deploy)

*   **Frontend**: Recomendado usar [Vercel](https://vercel.com).
*   **Backend**: Recomendado usar [Railway](https://railway.app), [DigitalOcean](https://digitalocean.com) o [Laravel Forge](https://forge.laravel.com).
*   **Base de Datos**: Supabase o Railway PostgreSQL.

## 📄 Licencia

Este proyecto es propiedad privada. Todos los derechos reservados.
