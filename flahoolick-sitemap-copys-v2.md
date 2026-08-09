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

## 1.4 Sistema visual de headers — DECISIÓN ACTUALIZADA

**Los headers internos van con placeholder vacío (borde sutil) hasta que Felipe suba sus SVG de micrographics.**

Las animaciones de dots generadas para headers internos se eliminan. Razones: `TrappedDots` en las 4 subpáginas de servicios es una simulación de física con movimiento errático permanente que se lee como ruido, no como concepto — y además "atrapado" es la metáfora del problema, mal puesta en páginas que venden la solución. Las "cuatro constelaciones" del hero de Servicios quedaron como cuatro bloques idénticos sin significado.

Criterio de fondo: en un header, el titular manda. Una animación en loop permanente compite con el texto y nunca deja de competir. El movimiento se justifica donde significa algo y tiene principio y fin.

**Dónde SÍ se conserva movimiento:**
- Los 3 heroes de la home (TrappedDots / CirculationDots) — el scroll narra, el movimiento acompaña el relato. **Ajuste pendiente: subir su visibilidad** (TrappedDots usa `#D8D8D7`, casi invisible; CirculationDots usa `#403D37`). Palancas en orden: contraste/opacidad del punto (~35-40% contra el fondo), luego radio, luego amplitud de la animación.
- `GrillaProceso` en Metodología — las 3 coreografías sincronizadas con los pasos. Es la única grilla protagonista del sitio.
- `MegamenuDots` en el header.

**Conceptos para los SVG de Felipe** (referencia para cuando los produzca en Figma, todos derivados del lenguaje de puntos = piezas de conocimiento):

| Página | Concepto |
|---|---|
| Servicios | Cuatro clusters de puntos claramente distintos entre sí |
| Estrategia de contenido | Puntos conectados por líneas finas formando una ruta con ramificaciones |
| Marca y relato | Puntos periféricos orbitando un punto central mayor |
| Producción de contenido | Puntos en filas ordenadas saliendo por el borde derecho |
| Sistemas de contenido con IA | Grilla 10×10 con algunos puntos en verde Flahoolick |
| FrecuenciA | Ondas concéntricas desde 2-3 puntos |
| Sobre Flahoolick | Un punto en la esquina de una grilla vacía |
| JERGA | Logotipo JERGA (ya funciona) |

## 1.5 Regla de forma: píldora

Los botones llevan esquinas redondeadas tipo píldora. `borderRadius: '999px'` en todo el sitio. Revisar y corregir donde haya `borderRadius: '2px'` u otro valor angular en botones/CTAs.

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

**Hero:** H1 **El conocimiento de tu empresa puede vender por ti.** / Bajada: *Cuatro servicios que convierten ese conocimiento en presencia de mercado, herramientas comerciales y clientes que llegan informados.* / CTA primario + microcopy / Columna izquierda: **placeholder vacío con borde sutil** hasta que Felipe suba su SVG de micrographics. *(Corrección: el titular anterior "Tu empresa sabe cosas que venden" se descarta — vago y suena a traducción. Y la animación de dots generada se elimina: cuatro bloques idénticos que no comunican nada.)*

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

**estrategia-de-contenido (140 líneas)** — se reestructura como página de servicio completa, con Column Five (`marketing.columnfivemedia.com/content-strategy-services`) como referencia de arquitectura comercial. Es la página piloto: una vez validada, las otras tres siguen su patrón.

- Módulos hoy: Apertura / Qué resolvemos / Qué construimos / Qué incluye / Qué recibes / Cierre.
- **Corrección respecto a la v1 de este documento:** "Qué incluye" NO se elimina. Una lista explícita de entregables es de lo que mejor convierte en páginas de servicio B2B — Column Five la usa y le pone un CTA al lado. El error actual es que está en acordeón cerrado (esconde justo lo que el comprador quiere ver) y sin CTA. Se abre a lista visible + CTA.

**Estructura objetivo:**

1. **Hero** — H1 **El mapa antes que las piezas.** / *Definimos qué decir, a quién, cuándo y por qué canal — antes de producir nada.* / CTA primario / Dots: el mapa.
2. **Qué resolvemos** — se mantiene. El problema nombrado en concreto, antes de la solución.
3. **Qué construimos — SE ELIMINA.** *(Corrección importante respecto a versiones anteriores de este documento, que decían conservarlo.)* Es `components/servicio-scroll-steps.tsx`: pasos numerados conectados por una línea horizontal con nodos circulares. Se elimina de las 4 subpáginas y de FrecuenciA; el archivo del componente se borra.

   Razones: **el método estaba contado tres veces en el sitio** con nombres distintos que no calzan entre sí (Encontramos/Extraemos, Ordenamos/Enfocamos) — en Metodología, en cada subpágina de servicios y en FrecuenciA. Además el diagrama de línea de tiempo con círculos rellenos no pertenece al lenguaje visual de Flahoolick (que es la grilla de puntos), y se desborda del viewport con 4 y 5 pasos.

   El método queda **solo en Metodología**, que es la página dedicada a explicarlo. En páginas de servicio, el orden que convierte es: qué problema resuelves, qué construyes, qué recibes, cuánto cuesta. El cómo va con un link.

   Lo que sí se conserva es la **jerarquía visual** que hacía bueno a ese módulo (label numerado, título corto, una línea) — se aplica a "Qué incluye" y "Qué recibes".
4. **Qué incluye** *(reformateado)* — lista visible en dos columnas, sin acordeón, **con CTA al costado**. Estructura: entregables base + un bloque menor de "Complementos opcionales". Patrón catálogo.
5. **Qué recibes** — el mockup del playbook. Se mantiene.
6. **Cómo cobramos** *(NUEVO — el módulo que más frena a un comprador B2B y hoy no existe en ningún lado del sitio)*:
   > **Cómo cobramos**
   > El diagnóstico de visibilidad tiene un valor fijo de **$[PRECIO] CLP** y se entrega en cinco días hábiles. Te quedas con él, decidas lo que decidas después.
   > Los proyectos de estrategia son fee fijo con entregables definidos, desde **$[PRECIO] CLP**.
   > Los programas continuos van por retainer mensual, según alcance y cadencia de producción.
   > `[Agenda una llamada →]`

   *Nota para implementación: Felipe entrega las cifras. No inventar montos bajo ninguna circunstancia — dejar los placeholders visibles hasta que él los defina.*
7. **FAQ de la página** *(NUEVO — 3 preguntas, no más)*. Column Five las pone dentro de la página de servicio, no en una página aparte, y resuelve las tres objeciones de compra:
   - *¿Cómo trabajan con nuestro equipo interno?*
   - *¿Cuánto tarda en verse resultados?*
   - *¿Qué pasa si ya tenemos una estrategia hecha?*
   Las respuestas se adaptan desde el FAQ general, que ya las tiene resueltas para el sitio.
8. **Contacto** — título: **Empecemos por el diagnóstico.**

**Lo que NO se copia de Column Five:** ellos tienen tres módulos que dicen casi lo mismo ("What's Included", "What You'll Walk Away With", "Why Our Clients Stick With Us"). Es redundancia de agencia grande — clonarla replicaría el problema que este documento busca eliminar.

**Módulo de casos: se omite por ahora.** Column Five apoya toda la página en 4 casos con resultados numéricos. Flahoolick tiene un caso publicable (Dunamis) y vive en FrecuenciA. Un módulo "Casos" vacío en la posición más importante de la página resta más de lo que suma. Se agrega cuando exista el primer caso de estrategia publicable.

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
| **Módulo de proceso con círculos y línea** | `components/servicio-scroll-steps.tsx` — 4 subpáginas + /frecuencia | El método estaba contado 3 veces en el sitio con nombres distintos. Queda solo en Metodología. El diagrama no pertenece al lenguaje visual (grilla de puntos) y se desborda del viewport |
| Animaciones de dots en headers internos | `TrappedDots` en 4 subpáginas, dots del hero de /servicios | Movimiento errático que se lee como ruido; compite con el titular. Van placeholders hasta los SVG de Felipe |
| Botones tipo píldora | /frecuencia, hero de /servicios | No usamos curvas. `borderRadius: '2px'` |
| Acordeón "Qué incluye" — **se conserva, se reformatea** | Las 4 subpáginas | Corrección: la lista de entregables convierte. Deja de ser acordeón cerrado, pasa a lista visible + CTA al costado |
| "Formas de trabajo" | produccion-de-contenido, sistemas-con-ia | Modalidades de contratación pertenecen a la llamada |
| "Cómo funciona" (4 pasos) DECK | Sección #deck | Duplica los 3 pasos generales |
| "Cómo funciona" (5 pasos) | /frecuencia | Comprimido a labels + link a Metodología |
| Ítem "Cómo trabajamos con IA" | Mega menú Metodología | Apunta a un servicio; rompe la categoría del menú |
| Filas planas Dunamis | /frecuencia | → 5 cards patrón estándar |
| CTAs "Conversemos/Hablemos/..." | Todo el sitio | Verbo único |
| SENSOR, DECK, Sobre, FAQ, Contacto, Privacidad del nav | `header.tsx` | Nav de 10 → 4 + CTA |

---

# PARTE 5 — QUÉ QUEDA PENDIENTE (actualizado 8 agosto, noche)

Etapas 1 a 4 ya implementadas por Claude Code (nav, footer, CTAs, home reordenada, caso Dunamis). Lo que falta:

**A. Eliminar el módulo de proceso** — `servicio-scroll-steps.tsx` fuera de las 4 subpáginas y de /frecuencia; borrar el componente. En /frecuencia lo reemplaza una línea de labels (`Encontramos · Ordenamos · Construimos · Publicamos · Medimos`) + link `Así trabajamos →` a /metodologia.

**B. Hero de /servicios** — H1 nuevo (**El conocimiento de tu empresa puede vender por ti.**), eliminar la animación de dots, botón a `borderRadius: '999px'` (píldora).

**C. Barrido de botones a tipo píldora** (`borderRadius: '999px'`) en todo el sitio — regla definitiva, confirmada.

**D. Eliminar animaciones de dots de los headers de las 4 subpáginas** (`TrappedDots`), dejar placeholder con borde sutil.

**E. Módulo "Cómo cobramos"** en estrategia-de-contenido — Felipe entrega las cifras. NO inventar montos.

**F. FAQ de 3 preguntas** dentro de estrategia-de-contenido.

**G. "Qué incluye"** de acordeón cerrado a lista visible + CTA al costado (las 4 subpáginas).

**H. Subir visibilidad de la grilla en los 3 heroes de la home** — contraste primero.

**I. Tamaño de heroes internos** en `globals.css` → `clamp(2.5rem, 5vw, 5.5rem)`.

**J. SVGs de micrographics** por header, cuando Felipe los produzca (conceptos en 1.4).

Orden sugerido: A → B → C → D en una tanda (son eliminaciones y ajustes, bajo riesgo). Después E → F → G en estrategia-de-contenido como página piloto, validar, y replicar en las otras tres.

---

# PARTE 6 — CORRECCIONES ABIERTAS (9 agosto, madrugada)

Todo lo de esta parte es NUEVO y no debe interpretarse como reemplazo silencioso de nada anterior en el documento. Cada punto dice exactamente qué archivo toca.

## 6.1 Sistema de dots — hallazgo y regla ya vigentes en el repo

Ya existe `regla-grilla-dots.md` en la raíz del proyecto (lo escribió Claude Code, es el canon correcto). Resumen: todo se resuelve con la población fija de 100 puntos en grilla 10×10 de `grilla-proceso.tsx` — nunca líneas, trazos ni trigonometría libre.

**Hallazgo adicional (no estaba en ese archivo):** varios patrones de `components/dot-pattern.tsx` — `constelaciones`, `mapa`, `convergencia`, `cadencia`, `malla`, `captura`, `pieza`, `ondas`, `origen` — calculan posiciones con `Math.cos`/`Math.sin` en coordenadas libres, no desde la grilla. Por eso se ven como nubes sueltas sin relación con la retícula real (confirmado en headers de Servicios y FrecuenciA, y en SENSOR/DECK dentro de Metodología — se describen como "cartel de topless" parpadeando sin lógica).

**Pendiente:** reescribir todos los patrones de `dot-pattern.tsx` contra la misma grilla fija de `grilla-proceso.tsx`, agregando esta invariante a `regla-grilla-dots.md`:
> Todo punto vive en una casilla de la grilla 10×10 fija. Ningún patrón calcula posiciones en coordenadas continuas o con trigonometría libre.

No es necesario preservar el diseño visual actual de estos headers — están mal desde la base, se rediseñan contra la grilla real.

## 6.2 Headers internos — nuevo concepto por página, reemplaza la tabla de la sección 1.4

La tabla de la sección 1.4 de este documento queda OBSOLETA en su columna "descripción del SVG" (pedía composiciones libres tipo "puntos conectados por líneas" — es la causa raíz del problema de 6.1). Se reemplaza por comportamientos, todos derivados de la grilla fija:

| Página | Comportamiento |
|---|---|
| Servicios | Cascada al scroll: 4 clusters de casillas contiguas se encienden en secuencia al entrar el hero en viewport, quedan encendidos |
| Estrategia de contenido | Cursor magnético: casillas cercanas al mouse aumentan radio/opacidad, caída suave por distancia |
| Marca y relato | Morphing lento entre 2 estados: puntos dispersos ↔ convergen al centro, loop con pausa larga en cada extremo |
| Producción de contenido | Cascada direccional continua: ola de encendido cruzando la grilla de izquierda a derecha, en loop |
| Sistemas de contenido con IA | Respiración: variación lenta de opacidad/radio en toda la grilla, con un grupo fijo en verde Flahoolick que NO respira (criterio humano = señal fija) |
| FrecuenciA | Ondas concéntricas resueltas en grilla real: anillos de casillas a distancia creciente del centro, encendido en secuencia al entrar en viewport, después quietas |
| Sobre Flahoolick | Un solo punto respirando, solo, en una esquina de grilla vacía |
| FAQ | Sin dots — página utilitaria |
| Metodología (hero superior) | Ver 6.3 — es el único header con tratamiento especial, no sigue esta tabla |

**Referencia técnica para Servicios/FrecuenciA (cascadas):** encendido secuencial de casillas ya predefinidas por posición — no inventar geometría nueva, solo timing de encendido.
**Referencia técnica para Estrategia (cursor magnético):** distancia del mouse a cada casilla fija, modula radio/opacidad — sin desplazamiento de posición.

## 6.3 Metodología — tres cambios en `app/(site)/metodologia/page.tsx`

**A. Hero superior (hoy sin ningún dot):** implementar efecto de ola 3D interactiva al cursor. Referencia técnica: `https://codepen.io/jsabutis/pen/emYQyEX` — Three.js, `THREE.Points`, grilla de posiciones que se desplazan en eje Z según `Math.sin(distancia_al_cursor - tiempo)`. Es la ÚNICA pieza del sitio que sale del sistema SVG 2D de `dot-pattern.tsx` — se justifica por ser el header de la página más importante del método, y hoy está completamente vacío. Cuidar performance en mobile: fallback estático si el dispositivo no soporta bien WebGL.

**B. Eliminar el módulo CTA intermedio** — el `BodySection dark` con "30 minutos. Sin presentaciones ni decks de venta." + botón, ubicado entre "Tres pasos" y "SENSOR". No aporta nada nuevo (el CTA del hero y el del contacto final ya cubren la conversión). Queda descartada la recomendación anterior de este documento que pedía agregar un CTA ahí — se elimina en cambio.

**C. Rediseño de `components/metodologia-pasos.tsx` — DECISIÓN FINAL: Opción 1.**

Problema diagnosticado: la grilla (`GrillaProceso`) se ve casi invisible junto al bloque de texto (mismo problema de bajo contraste que los heroes de la home, nunca corregido acá — color negro puro sin ajuste). Y cada paso trae 2-3 párrafos con igual peso visual, sin jerarquía — se lee como pared de texto.

**Opción 1 — mantener scroll-driven, arreglar jerarquía (confirmada, 9 agosto):** el mecanismo actual (`IntersectionObserver` cambia el paso activo al hacer scroll) se mantiene, sin tocar. Se sube el contraste de la grilla (mismo tratamiento que los dots de los heroes de la home) y se agranda un poco su tamaño. Del texto, solo el primer párrafo queda siempre visible; los párrafos siguientes van bajo un toggle discreto "Ver más" / "Ver menos" dentro del paso, sin convertir todo en acordeón — el paso completo sigue visible siempre. La línea "Recibes: ..." se mantiene siempre visible, fuera del toggle.

Descartada: Opción 2 (acordeón completo click-driven).

## 6.4 Botones: la regla vigente es PILL, no 2px

Corrección ya aplicada arriba en este mismo mensaje (secciones 1.5, B y C corregidas a `999px`). Si en el futuro aparece algo en `2px`, está desactualizado — corregir a `999px`.
