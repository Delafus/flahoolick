# Imágenes pendientes — guía para reemplazar los placeholders

Esta es la lista completa de todos los lugares del sitio que hoy muestran un placeholder
("Ilustración" o un cuadro vacío) y necesitan una imagen real. Pensada para que puedas
hacerlo vos mismo, sin depender de Claude, editando los archivos a mano.

## Antes de empezar

1. **Formato**: SVG para íconos/ilustraciones planas (se ve nítido a cualquier tamaño y
   pesa poco). JPG o PNG para fotografías. Evita archivos de más de ~300kb si es una foto.
2. **Dónde va el archivo**: siempre dentro de la carpeta `public/`, en la raíz del
   proyecto (junto a `95-5-dots.svg`, que ya está ahí). El nombre del archivo es libre,
   pero usa minúsculas y guiones, sin espacios ni tildes — ej: `ilustracion-hero-3.svg`.
3. **Tamaño en píxeles**: como estas imágenes se muestran en distintos anchos según la
   pantalla, el ancho recomendado de cada archivo es 2x el tamaño máximo con el que se
   ve en el sitio (para que se vea nítido en pantallas retina). Ya viene calculado abajo
   en cada caso.
4. **Cómo editar sin Claude**: podés hacerlo directo en GitHub (abrí el archivo, tocá el
   lápiz "Edit", pegá el cambio, "Commit changes" — Vercel despliega solo) o clonando el
   repo y editando en tu editor de texto favorito.
5. **El patrón de reemplazo es siempre el mismo**: buscas el bloque de código de abajo
   (el "ANTES"), lo reemplazas por el de al lado (el "DESPUÉS"). Si el archivo no tiene
   ya una línea `import Image from 'next/image'` cerca del principio, agrégala.

---

## 1. Home — hero 3 ("Tu ventaja competitiva ya existe")

**Archivo**: `app/(site)/page.tsx`
**Tamaño recomendado**: 720×720px (cuadrado — se muestra hasta 360px de ancho en pantalla)

ANTES:
```tsx
              <div
                className="w-full max-w-[240px] md:max-w-[360px] mt-8 mb-8 md:mt-20 md:mb-20 mx-auto"
                style={{ position: 'relative', aspectRatio: '1', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
              </div>
```

DESPUÉS:
```tsx
              <div className="w-full max-w-[240px] md:max-w-[360px] mt-8 mb-8 md:mt-20 md:mb-20 mx-auto" style={{ position: 'relative', aspectRatio: '1' }}>
                <Image src="/NOMBRE-DEL-ARCHIVO.svg" alt="" fill style={{ objectFit: 'contain' }} />
              </div>
```

---

## 2. /servicios — íconos de las 4 cards (Estrategia, Marca, Producción, Herramientas de IA)

**Archivo**: `app/(site)/servicios/page.tsx`
**Tamaño recomendado**: 88×88px (cuadrado chico — se ve a 44×44px). Necesitas **4 archivos
distintos**, uno por disciplina.

ANTES:
```tsx
                  <div style={{ height: '2.75rem', width: '2.75rem', border: '1px solid rgba(0,0,0,0.15)' }} />
```

DESPUÉS (esta línea vive dentro de un `.map()`, así que hay que darle una imagen
distinta a cada ítem — la forma más simple es agregar un campo `icon` a cada objeto de
`QUE_HACEMOS` más arriba en el mismo archivo, con la ruta del ícono, y usarlo acá):
```tsx
                  <div style={{ height: '2.75rem', width: '2.75rem', position: 'relative' }}>
                    <Image src={s.icon} alt="" fill style={{ objectFit: 'contain' }} />
                  </div>
```
Y en la definición de `QUE_HACEMOS` (más arriba en el archivo), agregar `icon: '/icono-estrategia.svg'` (etc.) a cada uno de los 4 objetos.

---

## 3. /servicios — ilustración del hero (columna izquierda en desktop)

**Archivo**: `app/(site)/servicios/page.tsx`
**Tamaño recomendado**: 960×720px (ratio 4:3)

No hace falta tocar código a mano acá — el componente `PageLayout` ya tiene un prop
`illustration` pensado para esto. Solo agrega esto a la llamada a `<PageLayout ...>`
(cerca de la línea 47, junto a los otros props como `headline`, `heroBg`, etc.):
```tsx
        illustration={{ src: '/NOMBRE-DEL-ARCHIVO.png', alt: '' }}
```

**Este mismo truco (el prop `illustration`) aplica igual para estas otras páginas**, que
usan el mismo `PageLayout` y hoy no le pasan nada:
- `app/(site)/servicios/marca-y-relato/page.tsx` (hero)
- `app/(site)/servicios/estrategia-de-contenido/page.tsx` (hero)
- `app/(site)/servicios/produccion-de-contenido/page.tsx` (hero)
- `app/(site)/servicios/herramientas-de-ia-para-marketing/page.tsx` (hero)

---

## 4. /servicios/marca-y-relato — "Qué recibes" (mockup vertical)

**Archivo**: `app/(site)/servicios/marca-y-relato/page.tsx`
**Tamaño recomendado**: 640×853px (ratio 3:4, solo aparece en desktop)

ANTES:
```tsx
            <div
              className="hidden md:flex"
              style={{
                position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto',
                border: '1px solid rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span className="label" style={{ color: '#ffffff', opacity: 0.25 }}>Ilustración</span>
            </div>
```

DESPUÉS:
```tsx
            <div className="hidden md:flex" style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
              <Image src="/NOMBRE-DEL-ARCHIVO.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
```

---

## 5. /servicios/estrategia-de-contenido — "Entrega" (mismo mockup)

**Archivo**: `app/(site)/servicios/estrategia-de-contenido/page.tsx`
**Tamaño recomendado**: 640×853px (ratio 3:4)

ANTES:
```tsx
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
```

DESPUÉS:
```tsx
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
              <Image src="/NOMBRE-DEL-ARCHIVO.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
```

---

## 6. /servicios/produccion-de-contenido — "Qué recibes" (mismo mockup)

**Archivo**: `app/(site)/servicios/produccion-de-contenido/page.tsx`
**Tamaño recomendado**: 640×853px (ratio 3:4, solo desktop)

Mismo patrón que el punto 4 (busca el mismo bloque `Ilustración` con `aspectRatio: '3/4'`).

---

## 7. /faq — ilustración del hero (columna izquierda en desktop)

**Archivo**: `app/(site)/faq/page.tsx`
**Tamaño recomendado**: 960×720px (ratio 4:3)

ANTES:
```tsx
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '3rem' }}>
              <span className="label" style={{ color: NEGRO, opacity: 0.2 }}>Ilustración</span>
            </div>
```

DESPUÉS:
```tsx
            <div style={{ position: 'relative', aspectRatio: '4/3', marginRight: '3rem' }}>
              <Image src="/NOMBRE-DEL-ARCHIVO.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
```

---

## 8. /faq — placeholder donde antes iba "Preguntado y respondido"

**Archivo**: `app/(site)/faq/page.tsx`
**Tamaño recomendado**: 960×720px (ratio 4:3) — **hay DOS bloques idénticos** (uno para
mobile, otro para desktop), hay que repetir el cambio en ambos.

ANTES (aparece dos veces en el archivo):
```tsx
              <div style={{ aspectRatio: '4/3', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
              </div>
```

DESPUÉS:
```tsx
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image src="/NOMBRE-DEL-ARCHIVO.jpg" alt="" fill style={{ objectFit: 'cover' }} />
              </div>
```

---

## 9. /sobre-flahoolick — "Por qué existimos"

**Archivo**: `app/(site)/sobre-flahoolick/page.tsx`
**Tamaño recomendado**: una sola foto que sirva recortada en dos proporciones distintas
(mobile 4:3, desktop 4:5) — usa una foto vertical de al menos 1000×1250px y el recorte
(`objectFit: 'cover'`) se encarga del resto.

Hay **dos bloques** a cambiar (mismo patrón, distinto `aspectRatio`):

ANTES (mobile, `aspectRatio: '4/3'`):
```tsx
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
```

ANTES (desktop, `aspectRatio: '4/5'`):
```tsx
              <div style={{ aspectRatio: '4/5', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
              </div>
```

DESPUÉS (mismo patrón para ambos, solo cambia el `aspectRatio` que ya tenía):
```tsx
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src="/NOMBRE-DEL-ARCHIVO.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
```

---

## 10. /metodologia — ilustración de cada uno de los 3 pasos

**Archivo**: `components/metodologia-pasos.tsx`
**Tamaño recomendado**: 320×320px (cuadrado chico, se ve hasta 160px de ancho). Como es
un solo componente reutilizado para los 3 pasos, necesitas pasarle una imagen distinta
por paso desde `app/(site)/metodologia/page.tsx` (donde están definidos los 3 pasos —
`PASOS`, con `numero`, `titulo`, `texto`, etc.).

Pasos:
1. En `app/(site)/metodologia/page.tsx`, agrega `imagen: '/paso-1.svg'` (etc.) a cada uno de los 3 objetos del array `PASOS`.
2. En `components/metodologia-pasos.tsx`, cambia:

ANTES:
```tsx
            <div style={{ width: '100%', aspectRatio: '1', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
```

DESPUÉS:
```tsx
            <div style={{ width: '100%', aspectRatio: '1', position: 'relative' }}>
              <Image src={p.imagen} alt="" fill style={{ objectFit: 'contain' }} />
            </div>
```

---

## Resumen rápido

| # | Página | Tamaño | Cuántas imágenes |
|---|--------|--------|-------------------|
| 1 | Home hero 3 | 720×720 | 1 |
| 2 | /servicios — íconos cards | 88×88 | 4 |
| 3 | Hero de /servicios y las 4 subpáginas de servicios | 960×720 | 5 (una por página) |
| 4-6 | Mockups "Qué recibes" (marca, estrategia, producción) | 640×853 | 3 |
| 7 | Hero de /faq | 960×720 | 1 |
| 8 | Placeholder en /faq | 960×720 | 1 |
| 9 | /sobre-flahoolick "Por qué existimos" | 1000×1250 | 1 |
| 10 | /metodologia — 3 pasos | 320×320 | 3 |

**Total: 19 imágenes** para completar todos los placeholders del sitio.
