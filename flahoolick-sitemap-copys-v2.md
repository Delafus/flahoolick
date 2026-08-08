# FLAHOOLICK — SITEMAP, DIAGRAMACIÓN Y COPYS FINALES — v2
**Fecha:** 8 agosto 2026
**Base:** código real del repo (commit 5e95bd8, "Fusionar Cómo trabajamos con IA dentro de Sistemas de Contenido con IA") + lectura del sitio publicado.
**Intocable:** los 3 heroes del scroll inicial y el módulo "Somos FLAHOOLICK".
**Reemplaza a la v1** — esta versión referencia archivos y componentes reales para pasársela directo a Claude Code.

---

# PARTE 0 — LO QUE EL CÓDIGO REVELÓ (cambios respecto a v1)

1. `/metodologia/como-trabajamos-con-ia` **ya no existe** — la fusionaste hoy dentro de Sistemas de Contenido con IA. El documento ya no la menciona.
2. Las 4 subpáginas de servicios comparten una plantilla implícita de módulos. La v1 no podía verlas; ahora están diagnosticadas una a una (Parte 3.3).
3. El mega menú de Metodología tiene un 4º ítem "Cómo trabajamos con IA" apuntando a `/servicios/sistemas-de-contenido-con-ia` — mezcla el menú del método con un servicio. Se corrige (Parte 3.0).
4. El módulo Productos de la home es `components/modulo-productos.tsx` — nació "para que SENSOR/DECK fueran accesibles fuera del menú hamburguesa" según su propio comentario. Con la fusión en Metodología, su razón de existir desaparece.
5. Chequeo de seguridad del repo público: sin `.env` commiteados, sin tokens en el código, credenciales de Sanity vía variables de entorno en Vercel. OK para quedar público.

---

# PARTE 1 — SISTEMA (aplica a todo el sitio)

## 1.1 El sistema de cards: una anatomía, tres patrones

**La anatomía es universal** — tres niveles de jerarquía en toda card del sitio (es lo que hace que "Qué construimos" se sienta clarita):

```
LABEL EN CAPS        ← contexto (PASO 01, NIVEL 2, HERRAMIENTA, categoría)
Título               ← 1 a 3 palabras
Una línea de descripción — máximo dos.
[CTA opcional →]
```

Si un contenido necesita más de dos líneas, pertenece a un párrafo.

**El contenedor varía según la naturaleza del contenido** — tres patrones:

1. **SECUENCIA** (`servicio-scroll-steps.tsx`) — labels numerados, scroll-reveal, conector entre pasos. Solo para contenido con orden real: "Qué construimos" en subpáginas, los 3 pasos de Metodología, los "Cuatro niveles" de FrecuenciA (progresión de complejidad).
2. **CATÁLOGO** — grilla uniforme, sin números, mismo peso visual. Para listas parejas: los 8 outputs de DECK, los 5 de SENSOR, las 4 fuentes de captura, "Qué puede producir", los 3 dolores de FrecuenciA.
3. **NAVEGABLE** — catálogo + CTA propio + hover evidente. Para cuando la card ES el link: las 5 herramientas de Dunamis, las cards de disciplinas, "Más sobre Flahoolick".

**Regla de decisión:** ¿tiene orden? → secuencia. ¿Lista pareja? → catálogo. ¿Se hace clic? → navegable. Numerar un catálogo inventa un orden que no existe — por eso NO todo se convierte a scroll-steps.

Diagnóstico de las filas Dunamis con este lente: son navegables sin anatomía — puro título y flecha, sin label ni descripción. El arreglo es darles los tres niveles, no numerarlas.

**Aplicación inmediata:**
- Links del caso Dunamis en `/frecuencia` (hoy: filas planas con VER → que parecen filete de tabla). Pasan a 5 cards en grilla:
  `HERRAMIENTA / Dossier / Reemplaza el PDF de ventas. / Ver →` · `HERRAMIENTA / Simulador / Valoriza propiedades y captura leads. / Ver →` · `HERRAMIENTA / Diagnóstico / Comprar o arrendar, resuelto en minutos. / Ver →` · `EDITORIAL / Blog / 12 artículos con voz propia. / Ver →` · `AGENTE / Dee / Conversa, filtra y agenda visitas. / Ver →`
- "Lo que produce DECK" (8 ítems) y "Lo que genera SENSOR" (5 ítems): descripciones a una línea.
- "Cuatro niveles" de FrecuenciA: ya cumple. Referencia junto a "Qué construimos".

## 1.2 Sistema de CTAs (un solo verbo)

- **Primario:** `Agenda una llamada →` + microcopy *"30 minutos. Sin presentaciones ni decks de venta."* (hoy enterrada en la pregunta 14 del FAQ).
- **Secundario:** `Explorar →` / `Ver →`.
- **Header (`components/header.tsx`):** botón sólido `Agenda una llamada` a la derecha del nav. Hoy el header no tiene CTA.
- **Formulario (`components/contact-form.tsx`):** el título se contextualiza por página — el componente ya recibe props de color; se le agrega prop `titulo` (los títulos por página están en Parte 3).
- Se eliminan: "Conversemos", "Hablemos", "Cuéntanos qué necesitas resolver", "Agendar una llamada".
- Excepción: FrecuenciA usa `Agenda una demo →` (es producto).

## 1.3 Tamaño de heroes internos

Hoy: `clamp(3.5rem, 8vw, 11rem)` — más grande que el hero de la home (9rem). Nuevo: `clamp(2.5rem, 5vw, 5.5rem)` en `app/globals.css`. Consecuencia: los H1 internos pueden ser frases comerciales.

## 1.4 Sistema visual de headers — dots por página

Puntos = piezas de conocimiento. Cada página muestra un **estado**. Estáticos (SVG) salvo GrillaProceso (`components/grilla-proceso.tsx`), que es la única animada y se muda a Metodología.

| Página | Estado | Descripción del SVG |
|---|---|---|
| Home (3 heroes) | Ya resuelto | TrappedDots / CirculationDots / CirculationDots con pulses — se mantienen |
| Servicios | Cuatro constelaciones | 100 puntos en 4 clusters separados — las 4 disciplinas sobre el mismo campo |
| Estrategia de contenido | El mapa | Puntos conectados por líneas finas formando ruta con ramificaciones |
| Marca y relato | Convergencia | Puntos periféricos orbitando un punto central más grande |
| Producción de contenido | La cadencia | Puntos en filas ordenadas saliendo por el borde derecho |
| Sistemas de contenido con IA | La malla | Grilla 10×10 perfecta con algunos puntos en verde Flahoolick |
| Metodología | GrillaProceso animada | Las 3 coreografías (latir / cascada / ondas) sincronizadas con pasos 01-02-03 |
| SENSOR (sección) | La captura | Puntos dispersos con estelas hacia un punto colector |
| DECK (sección) | La pieza | Puntos alineados formando un rectángulo 16:9 |
| FrecuenciA | Las ondas | Ondas concéntricas desde 2-3 puntos — calza con el nombre |
| JERGA | Logotipo JERGA | Se mantiene |
| Sobre Flahoolick | El origen | Un punto latiendo en la esquina de una grilla vacía |

---

# PARTE 2 — SITEMAP FINAL

```
NAV PRINCIPAL (4 ítems + botón CTA)
├── Servicios
│   ├── /servicios/estrategia-de-contenido
│   ├── /servicios/marca-y-relato
│   ├── /servicios/produccion-de-contenido
│   └── /servicios/sistemas-de-contenido-con-ia
├── FrecuenciA
├── Metodología          ← absorbe SENSOR y DECK como secciones
├── JERGA
└── [botón] Agenda una llamada

FOOTER
Sobre Flahoolick · FAQ · Política de Privacidad · LinkedIn

SE ELIMINAN COMO PÁGINAS
├── app/(site)/sensor/  → redirect 301 a /metodologia#sensor  (en next.config.mjs)
└── app/(site)/deck/    → redirect 301 a /metodologia#deck
```

**Justificación SENSOR/DECK:** el FAQ dice que los opera el equipo de Flahoolick — son módulos del método. Como páginas de primer nivel compiten con FrecuenciA (producto con caso vivo). El comentario del propio `modulo-productos.tsx` confirma que su módulo en la home fue un parche de accesibilidad, un problema que el nav nuevo resuelve de raíz.

**Decisiones tomadas (revisables):** Dunamis con nombre (ya público con links vivos). "FrecuenciA" sin descriptor en el nav; el descriptor va en su hero.

---

# PARTE 3 — PÁGINA POR PÁGINA

## 3.0 HEADER (`components/header.tsx`)

- Nav visible: Servicios · FrecuenciA · Metodología · JERGA + botón `Agenda una llamada` (link a `#contacto` de la página activa).
- **FrecuenciA entra al nav visible** — hoy solo existe en el panel hamburguesa.
- Mega menú Servicios: se mantiene (las 4 disciplinas desde `DISCIPLINAS` en `servicios-datos.ts`).
- Mega menú Metodología: quedan los 3 pasos. **El 4º ítem "Cómo trabajamos con IA" se elimina** — apunta a un servicio y rompe la categoría del menú. Se agregan en su lugar SENSOR y DECK apuntando a `/metodologia#sensor` y `#deck`.
- Panel hamburguesa: principales = los 4 del nav; secundarios = Sobre Flahoolick, FAQ, Contacto, Política de Privacidad. SENSOR y DECK salen (viven dentro de Metodología).
- Footer (`components/footer.tsx`): columna "Servicios" pasa a llamarse "Qué hacemos" (Servicios, FrecuenciA, Metodología); columna "Empresa" mantiene Sobre, JERGA, FAQ, Contacto, + Política de Privacidad.

## 3.1 HOME (`app/(site)/page.tsx`)

Orden de módulos:

1. **3 heroes scroll** — textos intocados. **Ajuste visual único: subir la visibilidad de la grilla de dots** (TrappedDots hoy usa `#D8D8D7`, casi invisible; CirculationDots usa `#403D37`). Palancas en orden: primero contraste/opacidad del punto (objetivo ~35-40% de contraste contra el fondo), luego radio del punto, luego amplitud de la animación. La grilla acompaña al titular sin competirle — el protagonismo pleno de la grilla ocurre en Metodología. Nota de sistema: estos heroes son el debut del lenguaje de dots en el sitio; Metodología lo retoma y lo explica.
2. **Somos FLAHOOLICK** — intocado.
3. **Caso Dunamis** *(NUEVO — módulo `modulo-caso-dunamis.tsx` a crear, versión comprimida del de /frecuencia; puede reutilizar `caso-imagen-brief.tsx`)*:
   - Label: `CASO REAL`
   - Titular: **Dunamis nos mandó un audio de 8 minutos. Hoy un agente les agenda visitas solo.**
   - Línea: *De esa conversación salieron un dossier, un simulador, un blog y Dee — el agente que su equipo de ventas usa a diario.*
   - CTAs: `Conoce FrecuenciA →` + `Habla con Dee →` (externo a dunamis.agency)
4. **Qué hacemos** — `ModuloComoTrabajamos` se simplifica: titular **Cuatro disciplinas. Un sistema.** + 4 cards patrón estándar desde `DISCIPLINAS` (una línea cada una, copys nuevos en 3.2) + `Explorar servicios →`. **La GrillaProceso sale de este módulo** y se muda a Metodología.
5. **Marcas que nos formaron** — se mantiene (`Marquee` + párrafo 25 años + industrias), sube una posición.
6. **`ModuloMetodologia`** — se comprime a titular **Del conocimiento disperso a un sistema que trabaja.** + `Explorar metodología →`. Sin grilla.
7. **`ModuloJerga`** — como está.
8. **`ContactForm`** — título: **¿Empezamos por una llamada?** + microcopy.

**Se elimina:** `<ModuloProductos />` (línea ~157 de page.tsx) y el archivo `components/modulo-productos.tsx`.

## 3.2 SERVICIOS (`app/(site)/servicios/page.tsx`)

**Hero:** H1 **Tu empresa sabe cosas que venden.** / Bajada: *Cuatro servicios que convierten ese conocimiento en presencia de mercado, herramientas comerciales y clientes que llegan informados.* / CTA primario + microcopy / Dots: cuatro constelaciones.

**Módulos:**
1. **Los cuatro servicios** — cards desde `DISCIPLINAS`, con `desc` reescritas en `servicios-datos.ts`:
   - Estrategia de contenido → *Mapeamos qué busca tu comprador y qué temas puede liderar tu empresa.*
   - Marca y relato → *Una idea central y mensajes que todo el equipo cuenta igual.*
   - Producción de contenido → *Piezas de autoridad y herramientas de venta, en cadencia mensual.*
   - Sistemas de contenido con IA → *Infraestructura que captura y distribuye conocimiento a escala, con criterio senior.*
2. **Qué puede producir** — se mantiene (`GRUPOS_ACTIVOS`, ya en una línea).
3. **Oferta de entrada** *(NUEVO)*: **Empezamos con un diagnóstico de cinco días.** / *Auditamos qué sabe tu empresa, cómo te ven los modelos de IA cuando tu comprador busca, y dónde están los vacíos. Te quedas con el diagnóstico, decidas lo que decidas después.* / CTA primario.
4. **ContactForm** — título: **Empecemos por el diagnóstico.**

**Se elimina:** el módulo "Un mismo método / Cuatro servicios. Un sistema común." — repite el titular del módulo 1; su único contenido es un link que ya está en el nav.

## 3.3 SUBPÁGINAS DE SERVICIOS — diagnóstico real del código

Plantilla objetivo (4 módulos + contacto): **Apertura → Qué resolvemos → Qué construimos → Qué recibes → Contacto.**

**estrategia-de-contenido (140 líneas)** — la más sana, es el modelo:
- Módulos hoy: Apertura / Qué resolvemos / Qué construimos / Qué incluye / Qué recibes / Cierre.
- Cambio: **"Qué incluye" (acordeón) se elimina** — con "Qué construimos" (pasos) y "Qué recibes" (mockup) ya está dicho qué hace y qué entrega; el acordeón es el módulo de más que tú mismo intuías. El detalle fino del alcance pertenece a la propuesta comercial, a la página no.

**marca-y-relato (143 líneas)** — estructura idéntica a la anterior:
- Mismo cambio: eliminar "Qué incluye".

**produccion-de-contenido (176 líneas)** — dos módulos extra:
- Módulos hoy: Apertura / Qué resolvemos / Qué producimos / Cómo trabajamos / Qué incluye / Qué recibes / Formas de trabajo / Cierre.
- Cambios: eliminar **"Qué incluye"** (mismo criterio). **"Formas de trabajo"** se comprime a una línea dentro del cierre o se elimina — si describe modalidades de contratación, esa conversación pertenece a la llamada. **"Qué producimos"** se mantiene: acá sí es contenido diferencial (es EL servicio de producción).

**sistemas-de-contenido-con-ia (192 líneas)** — la más cargada:
- Módulos hoy: Apertura / Qué construimos / Qué resolvemos / Cómo funciona / Cómo usamos la IA nosotros mismos / Qué incluye / Qué recibes / Formas de trabajo / Cierre.
- Cambios: **ordenar** — "Qué resolvemos" va antes de "Qué construimos" (problema antes que solución, como las otras tres). Eliminar **"Qué incluye"** y **"Formas de trabajo"**. **"Cómo usamos la IA nosotros mismos" se mantiene** — es prueba de producto ("comemos lo que cocinamos") y absorbió el contenido de la ex página Cómo-trabajamos-con-IA; se comprime a 3 cards patrón estándar si hoy es más largo.

**Heroes nuevos (tamaño nuevo):**
- Estrategia de contenido: **El mapa antes que las piezas.** / *Definimos qué decir, a quién, cuándo y por qué canal — antes de producir nada.*
- Marca y relato: **Una idea que todo tu equipo cuenta igual.** / *La idea central y la arquitectura de mensajes que unifica cómo tu empresa habla.*
- Producción de contenido: **Piezas que construyen presencia y cierran ventas.** / *Contenido de autoridad y herramientas comerciales, producidos en cadencia.*
- Sistemas de contenido con IA: **IA a escala. Criterio senior.** / *La infraestructura que captura, prioriza y distribuye tu conocimiento todos los meses.*

## 3.4 METODOLOGÍA (`app/(site)/metodologia/page.tsx`) — absorbe SENSOR y DECK

**Hero:** se mantiene **Del conocimiento disperso a un sistema que trabaja.** — el mejor del sitio. CTA unificado. **GrillaProceso llega aquí** (al costado del hero o entre hero y pasos), con sus 3 coreografías sincronizadas con los pasos visibles (los anchors `#paso-encontramos / #paso-ordenamos / #paso-circulacion` ya existen en el mega menú).

**Módulos:**
1. **Tres pasos** — se mantienen con sus "Recibes:".
2. **CTA intermedio** tras el paso 03: `Agenda una llamada →` + microcopy (hoy hay un vacío justo donde el lector termina convencido).
3. **#sensor** *(sección comprimida desde app/(site)/sensor/page.tsx)*:
   - `MÓDULO DE CAPTURA` / **SENSOR: la materia prima sale de lo que ya tienes.** / *Manuales, propuestas, grabaciones de reuniones, notas de CRM. El 70% del contenido nace de material que ya existe; el resto, de notas de voz de 10 minutos de tus expertos.*
   - 4 cards de fuentes + 5 cards de outputs (las actuales, descripciones a una línea). Sin hero ni formulario propios.
4. **#deck** *(sección comprimida desde app/(site)/deck/page.tsx)*:
   - `MÓDULO DE PRODUCCIÓN` / **DECK: información compleja convertida en piezas que deciden.** / *Presentaciones, propuestas, battlecards y playbooks con un mismo criterio editorial y visual.*
   - Los 8 outputs en cards patrón estándar. **Los 4 pasos "Cómo funciona" de DECK se eliminan** — duplican los 3 pasos generales recién leídos.
5. **ContactForm** — título: **Tu conocimiento ya existe. Activémoslo.**

**Implementación:** las carpetas `app/(site)/sensor/` y `app/(site)/deck/` se eliminan; redirects 301 en `next.config.mjs`.

## 3.5 FRECUENCIA (`app/(site)/frecuencia/page.tsx`)

**Hero:** Label `FRECUENCIA — CONSTRUIDO CON IA, PUBLICADO EN SEMANAS` / H1 **Herramientas públicas que venden por ti.** / Bajada: *Convertimos el conocimiento de tu empresa en dossiers, simuladores, blogs y agentes conectados a tus datos.* / CTA `Agenda una demo →` / Dots: ondas.

**Módulos:**
1. **Qué resuelve** — los 3 dolores a cards patrón (label DOLOR / título corto / una línea).
2. **Caso Dunamis** — orden: audio (`caso-audio-brief.tsx`) → línea "De esta conversación salió el sistema completo" → **5 cards patrón estándar** (reemplazan las filas planas — copys en 1.1) → social proof *"El equipo de ventas de Dunamis lo usa a diario para cerrar clientes."* → **CTA inmediato:** `¿Quieres esto para tu empresa? Agenda una demo →` (hoy el pico de convicción queda sin botón).
3. **Cuatro niveles** — se mantiene.
4. **Cómo funciona (5 pasos)** — se comprime a línea horizontal de 5 labels (Encontramos · Ordenamos · Construimos · Publicamos · Medimos) + `Así trabajamos →` a Metodología. Los pasos 01-02 repiten los de Metodología; dos versiones del método generan el desorden.
5. **ContactForm** — título: **Agenda tu demo de FrecuenciA.** (se conserva)

## 3.6 JERGA — sin cambios estructurales en esta pasada.

## 3.7 SOBRE FLAHOOLICK (pasa al footer)

1. Hero — se mantiene. Dots: el origen.
2. Por qué existimos — se mantiene.
3. **Marcas que nos formaron** *(NUEVO — reutiliza `Marquee`)*: al eliminar "Con quiénes hemos trabajado" la página quedó sin prueba externa.
4. Más sobre Flahoolick — de 3 a **4 cards**: Servicios / FrecuenciA / Metodología / JERGA.
5. ContactForm.

## 3.8 FAQ (pasa al footer)

1. **"¿Cómo empezamos?"** sube del último al primer lugar.
2. Links a SENSOR/DECK → `/metodologia#sensor` y `/metodologia#deck`.
3. Pregunta nueva: **"¿Qué es FrecuenciA?"** — *FrecuenciA convierte el conocimiento de tu empresa en herramientas públicas que venden: dossiers interactivos, simuladores, blogs y agentes conectados a tus datos. Construido con IA, publicado en semanas.* + `Conoce FrecuenciA →`. (Hoy el FAQ cubre SENSOR y DECK y omite el único producto público.)
4. Links comerciales en formato botón; los de navegación como texto.

## 3.9 POLÍTICA DE PRIVACIDAD — sin cambios. Pendiente vivo: fecha y correo reales + revisión legal.

---

# PARTE 4 — RESUMEN DE ELIMINACIONES

| Qué | Archivo/lugar | Por qué |
|---|---|---|
| Páginas /sensor y /deck | `app/(site)/sensor/`, `app/(site)/deck/` | Módulos del método → secciones de Metodología, redirects 301 |
| Módulo Productos | `components/modulo-productos.tsx` + home | Su comentario lo delata: fue parche de accesibilidad; el nav nuevo lo resuelve |
| Grilla en módulo home | `ModuloComoTrabajamos` → Metodología | Pertenece al relato del método |
| Módulo "Un mismo método" | `/servicios` | Repite titular, solo contiene un link ya presente en el nav |
| Acordeón "Qué incluye" | Las 4 subpáginas de servicios | El alcance fino pertenece a la propuesta comercial; con Construimos + Recibes está dicho |
| "Formas de trabajo" | produccion-de-contenido, sistemas-con-ia | Modalidades de contratación pertenecen a la llamada |
| "Cómo funciona" (4 pasos) DECK | Sección #deck | Duplica los 3 pasos generales |
| "Cómo funciona" (5 pasos) | /frecuencia | Comprimido a labels + link a Metodología |
| Ítem "Cómo trabajamos con IA" | Mega menú Metodología | Apunta a un servicio; rompe la categoría del menú |
| Filas planas Dunamis | /frecuencia | → 5 cards patrón estándar |
| CTAs "Conversemos/Hablemos/..." | Todo el sitio | Verbo único |
| SENSOR, DECK, Sobre, FAQ, Contacto, Privacidad del nav | `header.tsx` | Nav de 10 → 4 + CTA |

---

# PARTE 5 — ORDEN DE IMPLEMENTACIÓN (para Claude Code)

1. `header.tsx` + `footer.tsx`: nav nuevo, botón CTA, mega menú Metodología corregido.
2. CTAs unificados: buscar/reemplazar los 5 verbos + prop `titulo` en `contact-form.tsx`.
3. Fusión: secciones #sensor/#deck en `metodologia/page.tsx`, eliminar carpetas, redirects en `next.config.mjs`, mudar `GrillaProceso`.
4. Home: crear módulo caso Dunamis, simplificar `ModuloComoTrabajamos` y `ModuloMetodologia`, eliminar `ModuloProductos`.
5. FrecuenciA: cards Dunamis + CTA post-caso + compresión de pasos.
6. `/servicios` + `servicios-datos.ts`: descs nuevas, módulo diagnóstico, eliminar "Un mismo método".
7. Subpáginas: heroes nuevos, eliminar "Qué incluye" (las 4) y "Formas de trabajo" (2), reordenar sistemas-con-ia.
8. `globals.css`: tamaño de heroes internos.
9. SVGs de dots por página (con placeholders mientras se producen).
