# FLAHOOLICK — ESTADO ACTUAL, SITEMAP Y DECISIONES VIGENTES — v3

**Fecha de actualización:** 18 de agosto de 2026
**Estado general estimado:** 90%
**Fuentes contrastadas:** código de `main`, sitio publicado en `https://flahoolick.vercel.app/` y documentos v2 del proyecto.
**Propósito:** describir lo que existe hoy, separar lo terminado de lo pendiente y evitar que planes históricos del v2 se interpreten como instrucciones vigentes.

---

## 1. Cómo leer este documento

Este archivo reemplaza a `flahoolick-sitemap-copys-v2.md` como documento maestro del sitio.

El v2 se conserva sin cambios como respaldo histórico. Contiene diagnósticos, alternativas y decisiones tomadas durante distintas etapas; varias se contradicen entre sí o ya fueron implementadas, reemplazadas o descartadas. No debe usarse como lista de tareas actual.

La fuente de verdad operativa es:

1. El código actual del repositorio.
2. El sitio publicado en Vercel.
3. Este v3 para contexto, decisiones vigentes y pendientes reales.

---

## 2. Estado ejecutivo

El sitio está avanzado aproximadamente en un **90%**. La arquitectura principal, la navegación, las páginas, los servicios, JERGA, Sanity, el formulario de contacto y la mayor parte del sistema visual ya están implementados y publicados.

### Terminado y funcionando

- Sitio público en Vercel.
- Navegación principal, menú lateral, footer y diseño responsive.
- Home completa en estructura y contenido.
- Página general de Servicios y cuatro páginas de servicio.
- Página de Metodología con sus tres pasos.
- Página Sobre Flahoolick.
- FAQ.
- Política de Privacidad.
- JERGA conectada a Sanity.
- Sanity Studio montado en `/studio`.
- Formulario de contacto conectado a Resend y funcionando en producción.
- API de contacto con validación básica, estados de envío y manejo de error.
- Sistema de botones tipo píldora consolidado en los componentes principales.
- Redirecciones históricas de SENSOR, DECK y Sistemas de contenido con IA.

### Pendiente real

- Recibir y subir algunas imágenes finales.
- Reemplazar los placeholders visuales que todavía aparecen en páginas internas.
- Definir la solución visual definitiva de los tres héroes de la home: conservar, ajustar o reemplazar las animaciones actuales por otras animaciones o imágenes.
- Hacer una última pasada de terminaciones visuales, consistencia de copys y QA responsive después de incorporar los recursos definitivos.

---

## 3. Stack y estructura actual

- **Framework:** Next.js 14 con App Router.
- **Lenguaje:** TypeScript y React 18.
- **Estilos:** Tailwind CSS más estilos globales y estilos inline por componente.
- **CMS:** Sanity 3 / next-sanity.
- **Correo:** Resend.
- **Animación 3D disponible:** Three.js.
- **Hosting:** Vercel.

Estructura principal:

```text
app/
├── (site)/                 páginas públicas
├── api/contacto/           endpoint del formulario
├── studio/                 Sanity Studio
├── globals.css             sistema global de estilos
└── layout.tsx              layout raíz

components/                 módulos, layouts y visualizaciones
content/                    contenido estático histórico de JERGA
context/                    estado global de color de página
lib/                        utilidades
public/                     logos, iconos e imágenes publicadas
sanity/                     cliente, consultas, schemas y estructura del Studio
```

---

## 4. Sitemap vigente

```text
NAV PRINCIPAL
├── Servicios
├── Metodología
├── JERGA
└── Agenda una llamada

MENÚ COMPLETO
├── Servicios
├── Metodología
├── JERGA
├── Sobre Flahoolick
├── FAQ
├── Contacto
└── Política de Privacidad

SERVICIOS
├── /servicios/estrategia-de-contenido
├── /servicios/marca-y-relato
├── /servicios/produccion-de-contenido
└── /servicios/herramientas-de-ia-para-marketing

JERGA
├── /jerga
├── /jerga/[slug]
└── /jerga/categoria/[slug]
```

### Redirecciones vigentes

- `/sensor` → `/metodologia#sensor`
- `/deck` → `/metodologia#deck`
- `/servicios/sistemas-de-contenido-con-ia` → `/servicios/herramientas-de-ia-para-marketing`

La cuarta disciplina vigente se llama **Herramientas de IA para marketing y ventas**. El nombre anterior “Sistemas de contenido con IA” queda como referencia histórica y redirección.

---

## 5. Estado por página

### Home — `/`

Estructura publicada:

1. Tres héroes narrativos.
2. Somos FLAHOOLICK.
3. Caso Dunamis.
4. Cuatro disciplinas.
5. Marcas que nos formaron e industrias.
6. Metodología.
7. JERGA.
8. Formulario de contacto.

Los tres héroes usan hoy:

- Hero 1: `TrappedDots`, con puntos claros colisionando dentro de un círculo negro.
- Hero 2: `EyeGrid`.
- Hero 3: `FunnelDots`.

Estas animaciones están implementadas y funcionando, pero **no se consideran una decisión visual final**. Felipe definirá si se conservan, ajustan o reemplazan por nuevas animaciones o imágenes.

Pendiente visual adicional: el módulo del caso Dunamis mantiene un placeholder de ilustración.

### Servicios — `/servicios`

Página terminada en estructura. Incluye:

- Hero “Construye autoridad”.
- Cuatro disciplinas.
- Catálogo de piezas que se pueden producir.
- Diagnóstico de cinco días como oferta de entrada.
- Formulario contextualizado.

Pendiente: imagen o micrográfica del hero.

### Estrategia de contenido

Ruta: `/servicios/estrategia-de-contenido`

Incluye hero, problema, proceso, entregables, resultado y contacto. Los cuatro iconos de entregables ya están integrados.

Pendientes:

- Visual del hero.
- Imagen/mockup de “Recibes una estrategia lista para usar”.

### Marca y relato

Ruta: `/servicios/marca-y-relato`

Incluye hero, problema, qué construimos, qué resolvemos, sistema de marca, cierre y contacto.

Pendientes:

- Visual del hero.
- Imagen/mockup del módulo oscuro.

### Producción de contenido

Ruta: `/servicios/produccion-de-contenido`

Incluye hero, problema, catálogo de producción, sistema de activos, cierre y contacto.

Pendientes:

- Visual del hero.
- Imagen/mockup del módulo oscuro.

### Herramientas de IA para marketing y ventas

Ruta: `/servicios/herramientas-de-ia-para-marketing`

Incluye hero, propuesta general, agente telefónico, catálogo de herramientas, formas posibles, entrada por tarea y contacto.

Pendiente: visual del hero.

### Metodología — `/metodologia`

La versión vigente es compacta y se concentra en tres pasos:

1. Encontramos.
2. Ordenamos.
3. Ponemos en circulación.

Cada paso tiene descripción y resultado. No están actualmente incorporadas como secciones visibles las versiones extensas de SENSOR y DECK descritas en el v2.

Pendientes:

- Visual del hero.
- Una imagen o micrográfica para cada uno de los tres pasos.

Los componentes experimentales `WaveHero`, `GrillaProceso` y `MicrogrillaMetodologia` existen en el repositorio, pero no forman parte de la página publicada actual.

### JERGA — `/jerga`

Está implementada y conectada a Sanity. Incluye:

- Portada editorial.
- Guías y contenidos recientes.
- Categorías.
- Páginas dinámicas por pieza y categoría.
- Imágenes servidas desde el CDN de Sanity.
- Portable Text, tabla de contenidos y guías fijadas.

No tiene placeholders visuales detectados en la portada publicada.

### Sobre Flahoolick — `/sobre-flahoolick`

Incluye hero, historia, “Por qué existimos”, marcas, navegación relacionada y contacto.

Pendientes:

- Imagen de “Por qué existimos” en sus versiones mobile y desktop; puede resolverse con una sola imagen adaptable.
- Revisar si el hero requiere un recurso visual adicional o si su composición actual queda definitiva.

### FAQ — `/faq`

Página funcional con preguntas desplegables, enlaces internos y formulario.

Pendientes:

- Visual del hero.
- Imagen del bloque editorial intermedio, utilizada en layouts mobile y desktop.

### Política de Privacidad — `/politica-de-privacidad`

Publicada y estructurada en 15 secciones. No tiene placeholders visuales. Antes del cierre legal definitivo conviene confirmar datos de contacto y vigencia con quien corresponda.

---

## 6. Sanity y JERGA

Sanity es la fuente activa de contenido de JERGA.

### Documentos

- `categoria`
- `articulo`

El documento `articulo` permite los tipos:

- Artículo.
- Guía.
- Tutorial.

### Bloques editoriales

- Texto Portable Text.
- Cita.
- Destacado.
- Paso numerado.
- Imagen dentro del cuerpo.

### Funciones activas

- Listado total.
- Consulta por slug.
- Consulta por categoría.
- Consulta por tipo.
- Artículo destacado.
- Guías fijadas.
- Contenidos relacionados.
- Conteo por categoría.

`content/jerga.ts` conserva contenido y funciones estáticas de una etapa anterior. Las páginas publicadas usan `sanity/lib/jerga.ts`; el archivo estático no es la fuente editorial principal vigente.

---

## 7. Formulario de contacto y Resend

**Estado: terminado y funcionando.**

El formulario:

- Solicita nombre, empresa, email y mensaje.
- Envía los datos a `/api/contacto`.
- Usa Resend en el servidor.
- Configura `replyTo` con el email del contacto.
- Muestra estados de enviando, éxito y error.
- Se reutiliza y contextualiza en las distintas páginas.

`RESEND-SETUP.md` se conserva como documentación técnica histórica de configuración, pero la activación de Resend ya no es una tarea pendiente.

---

## 8. Sistema visual y animaciones

### Regla vigente de dots

`regla-grilla-dots.md` sigue siendo el canon para cualquier componente basado en puntos:

- El punto es el único elemento visual.
- Las formas emergen de posición, escala, color y opacidad.
- No se dibujan líneas, contornos o rellenos entre puntos.
- Cuando se usa grilla, la identidad y población de los puntos deben permanecer estables.

### Animaciones activas

- Home: `KnowledgeCluster`, `EyeGrid`, `FunnelDots` y `ScrollConnector`.
- Header: `MegamenuDots`.
- Logos: marquee continuo e `IdeaGenerosaLogo`.
- Navegación editorial: observadores de intersección para tabla de contenidos y conectores.

### Componentes experimentales o guardados

Existen, pero no están integrados actualmente en las páginas publicadas:

- `WaveHero`.
- `DotGrid`.
- `DotPattern`.
- `GrillaProceso`.
- `MicrogrillaMetodologia`.
- `TrappedDots`.
- `CirculationDots`.
- Los cuatro componentes `Pulso*`.

No deben asumirse como decisiones aprobadas por el solo hecho de existir en el repositorio.

### Decisión pendiente de los héroes de la home

Los tres héroes mantienen su texto y función narrativa. Lo abierto es únicamente su tratamiento visual definitivo. Las alternativas posibles son:

- Conservar y afinar las animaciones actuales.
- Reemplazar alguna o todas por nuevas animaciones.
- Reemplazar alguna o todas por imágenes definitivas.

No implementar un reemplazo hasta que Felipe defina la dirección y entregue las referencias o recursos necesarios.

---

## 9. Imágenes pendientes

La lista antigua de `IMAGENES-PENDIENTES.md` ya no representa exactamente el estado actual: varias piezas e iconos ya fueron incorporados y el sitio cambió desde que se escribió.

Pendientes confirmados por el código y producción:

1. Caso Dunamis en la home.
2. Hero de Servicios.
3. Hero de Estrategia de contenido.
4. Mockup/resultado de Estrategia de contenido.
5. Hero de Marca y relato.
6. Mockup/resultado de Marca y relato.
7. Hero de Producción de contenido.
8. Mockup/resultado de Producción de contenido.
9. Hero de Herramientas de IA.
10. Hero de Metodología.
11. Visual del paso Encontramos.
12. Visual del paso Ordenamos.
13. Visual del paso Ponemos en circulación.
14. Imagen de “Por qué existimos” en Sobre Flahoolick.
15. Hero de FAQ.
16. Imagen editorial intermedia de FAQ.

Algunos placeholders aparecen duplicados en el DOM por tener variantes separadas para mobile y desktop; eso no implica necesariamente dos archivos gráficos distintos.

La lista debe ajustarse nuevamente cuando Felipe entregue las imágenes y defina cuáles héroes usarán animación y cuáles imagen.

---

## 10. Git y archivos todavía no integrados

Al momento de crear este documento:

- Rama: `main`.
- `main` está alineada con `origin/main`.
- No existen modificaciones pendientes sobre archivos rastreados.
- El v3 es el único archivo rastreable nuevo creado durante esta actualización.

Archivos previos que estaban sueltos en la raíz y aún no participan del sitio:

- `95-5-dots.svg` — existe además una copia integrada en `public/`.
- `elasticas-caida.html`.
- `icon-claude.svg`.
- `icon-gpt.svg`.
- `icon-technology.svg`.
- `icon-whatsapp.svg`.
- `medicine-sign-icon.svg`.
- `robot-line-icon.svg`.

Estos archivos no deben moverse, borrarse ni integrarse automáticamente. Primero hay que decidir si corresponden a recursos finales, referencias o prototipos descartados.

---

## 11. Prioridades para cerrar el sitio

1. Recibir y catalogar las imágenes finales.
2. Definir el tratamiento visual de los tres héroes de la home.
3. Reemplazar los placeholders confirmados.
4. Revisar mobile y desktop con los recursos definitivos.
5. Hacer una pasada final de copys, enlaces, metadatos y accesibilidad.
6. Confirmar la Política de Privacidad desde el punto de vista legal y de datos de contacto.
7. Limpiar prototipos y componentes no utilizados solo después de una decisión explícita.

---

## 12. Reglas de trabajo vigentes

- No reabrir tareas del v2 sin comprobar primero el código y producción.
- No inventar imágenes, precios, casos, resultados ni decisiones visuales.
- No reemplazar las animaciones de los tres héroes sin aprobación de Felipe.
- Mantener el formulario de Resend como funcional; cualquier cambio debe preservar su comportamiento.
- Mantener Sanity como fuente editorial de JERGA.
- Mantener la ruta vigente `herramientas-de-ia-para-marketing` y su redirección histórica.
- Mantener botones principales con forma de píldora salvo nueva decisión explícita.
- Conservar el lenguaje visual de dots conforme a `regla-grilla-dots.md`.
- Antes de eliminar componentes o prototipos sin uso, confirmar que no sean referencias reservadas.
