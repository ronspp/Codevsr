# Mangation — Next.js + Tailwind CSS

Recreación de las referencias: catálogo, ficha de manga y lector vertical. Next.js 16, React 19, TypeScript y Tailwind CSS 4. No necesita claves ni servicios para ejecutarse.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000. `npm run build` genera una versión estática en `out/`; `npm run typecheck` comprueba TypeScript. Sirve `out/` con cualquier servidor estático con soporte de directorios/index.html. `next start` no sirve exportaciones estáticas.

## Vistas

- `/`: tendencias, popular, géneros, colecciones, búsqueda y carruseles.
- `/manga/how-do-we-relationship/`: ficha, capítulos, detalles, relacionados y favoritos.
- `/read/how-do-we-relationship/?chapter=1`: lector continuo con selector de capítulo, menú discreto, tema y progreso local.
- Cada título del mock tiene sus rutas de ficha y lectura.

## Conectar la API

Copia `.env.example` a `.env.local` y configura `NEXT_PUBLIC_API_BASE_URL=https://tu-api.example`. Reinicia el servidor o vuelve a compilar. Esa variable es pública: no debe contener credenciales. La API debe permitir el origen del frontend mediante CORS.

Toda la carga está centralizada en `lib/catalog.ts`. Las pantallas usan el mismo contrato tanto con mocks como con HTTP. Los modelos están en `lib/types.ts` y los datos de ejemplo en `lib/mock-data.ts`.

Endpoints esperados, JSON sin envoltorio:

- `GET /catalog` → `Catalog`: `items`, `trending`, `popular`, `comedy`, `fantasy`, `nextReads`, `delicate`, `picks`. Las colecciones contienen IDs presentes en `items`.
- `GET /manga/:id` → `Manga`.
- `GET /manga/:id/chapters/:chapterId` → `ChapterContent`.

```json
{
  "mangaId": "how-do-we-relationship",
  "chapterId": 1,
  "title": "The Confession",
  "isPreview": false,
  "pages": [
    {
      "id": "page-1",
      "image": "https://tu-cdn.example/chapter-1/page-1.webp",
      "width": 1200,
      "height": 1800,
      "alt": "Chapter 1, page 1"
    }
  ]
}
```

Ancho y alto reservan el espacio de las imágenes para evitar saltos y restaurar bien la lectura. Las solicitudes se cancelan al abandonar la vista y los errores de carga permiten reintentar.

**Rutas nuevas:** esta entrega usa `output: 'export'` y prerenderiza los 22 IDs incluidos. Para un catálogo dinámico de IDs nuevos, elimina `output: 'export'` y `generateStaticParams`, carga la ficha por API en la ruta y despliega Next.js en un servidor; o genera los parámetros desde tu catálogo durante el build. La API de catálogo no crea rutas estáticas automáticamente.

## Comportamiento del lector

- Scroll vertical; fondo oscuro por defecto.
- Páginas de hasta 760 px en escritorio; todo el ancho disponible en móvil.
- Cabecera mínima: volver, capítulo y menú de tres puntos. Navegación inferior Previous / Next.
- Tema, favoritos y progreso en `localStorage`, solo en el dispositivo actual.
- “Start reading” recupera capítulo y página guardados.
- Selector y botón de siguiente capítulo mantienen una ruta compartible.
- Amongst Us muestra dos páginas públicas de muestra de Airport, sin la portada de introducción; How Do We Relationship? muestra una página pública. Los demás títulos muestran un estado sin páginas disponibles, sin simular capítulos con portadas. No contiene capítulos completos; las muestras se reutilizan entre capítulos del mismo título para demostrar navegación.
- Las imágenes proceden de fuentes registradas en `ASSETS.md`. Las miniaturas de capítulo y la pequeña ilustración del banner de escritorio se muestran mediante recortes CSS de las referencias aportadas. La interfaz, texto, controles y layout son componentes HTML reales.

## Alcance del mock

Los formularios de acceso no crean cuentas ni envían credenciales. Calendario, comunidad y enlaces informativos muestran contenido de demostración. Las cifras y capítulos son ficticios. Favoritos/progreso no se sincronizan con un backend; se pueden conectar después a endpoints autenticados. No se incluyen las aplicaciones móviles enlazadas en la referencia.

## Diseño

Contenedor del 83.33 %, máximo 1120 px; fondo blanco; acento `#fa2d70`; fuente Arial/Helvetica; portadas 151:221; separación de 24 px en tendencias; rejillas de dos columnas en listas; adaptación a 800 y 540 px. En móvil, el inicio se limita a una portada protagonista, géneros, Next Reads y navegación inferior. El lector prioriza el contenido sin intro, contador fijo ni tarjetas de cierre.

## Referencias técnicas

- https://nextjs.org/docs/app/guides/static-exports
- https://tailwindcss.com/docs/installation/framework-guides/nextjs

## Correcciones móviles

Banner de capítulos eliminado; logo Mangation; cierre de diálogos al seguir un enlace; navegación móvil con biblioteca, historial, favoritos y perfil local; lector con áreas seguras, controles de 44 px y remount por capítulo. Configuración `allowedDevOrigins` para la IP local 192.168.100.72. Plan de autenticación en `AUTH-PLAN.md`. Se requiere verificar los cambios en el Safari físico del usuario.
# Codevrs
# Codevsr
