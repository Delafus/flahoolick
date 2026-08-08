# REGLA DE LA GRILLA DE DOTS

Canon del sistema visual de Flahoolick. Aplica a todo componente que dibuje o anime dots.

## Principio

El punto es el único elemento que se renderiza. Toda forma, figura, trayectoria, conexión, onda o transición se construye con puntos: encendiéndolos, escalándolos, coloreándolos o desplazándolos. El espacio entre dos puntos queda vacío siempre.

La grilla no ilustra ideas dibujándolas. Las ilustra con la distribución, la densidad y el estado de sus puntos.

## Referencia canónica

`components/grilla-proceso.tsx` es el modelo correcto y la referencia de implementación.

- Población fija de 100 puntos en grilla 10×10 (`GRID = 10`, `COUNT = GRID * GRID`)
- Cada punto tiene identidad estable entre estados: mismo índice, misma partícula
- Los pulsos del paso 03 se resuelven calculando la distancia de cada punto al origen del pulso y modulando su diámetro y su alfa. No existe un anillo dibujado — el anillo emerge de qué puntos están encendidos en ese frame
- Los viajes del paso 02 interpolan la posición de cada punto entre su casilla de origen y su casilla de destino. No existe una trayectoria dibujada — el recorrido emerge del punto moviéndose

Cualquier componente nuevo se escribe contra este modelo.

## Prohibido

- `<line>`, `<polyline>`, `<path>`, `<rect>` o cualquier SVG de trazo dentro de un componente de dots
- `<circle>` con `stroke` y `fill="none"` usado como anillo, pulso u onda
- Canvas: `ctx.stroke()`, `ctx.lineTo()`, `ctx.moveTo()`, `ctx.arc()` para trazar contornos
- CSS: `border`, `outline`, divs de 1px, gradientes o `box-shadow` empleados como línea entre puntos
- Trails, motion blur o estelas que dejen material visual en el recorrido de un punto
- Cualquier relleno, blur o degradado que ocupe el espacio entre dos puntos

Aplica también a las ilustraciones estáticas, no solo a las animadas.

## Permitido por punto

- `opacity` / alfa
- radio o diámetro
- color / `fill`
- posición (x, y) — un punto puede desplazarse desde su casilla hacia una posición objetivo y volver
- `delay` y easing individuales

## Invariantes

- La cantidad de puntos es constante. No se crean ni se destruyen durante una animación.
- Los puntos se reposicionan; nunca se sustituyen por otro tipo de elemento.
- Cada punto conserva su identidad entre estados.

## Cómo se resuelve una conexión

Una relación entre dos zonas de la grilla se expresa encendiendo los puntos que caen sobre el eje que las une, con un alfa que decae hacia los extremos. La línea la lee el ojo por proximidad de puntos encendidos.

## Cómo se resuelve una forma

La forma se rasteriza contra la población de puntos. Cada punto recibe un estado o una posición objetivo dentro de la máscara de la forma. La resolución queda determinada por la densidad de la grilla: si una forma no se lee a esa densidad, se aumenta la densidad completa o se simplifica la forma.

## Criterio de aceptación

Al pausar en cualquier frame, todo pixel iluminado pertenece a un punto. Si existe material visual entre dos puntos, la implementación está mal.

## Deuda existente

`components/dot-pattern.tsx` incumple la regla en tres lugares y debe migrarse:

- línea 68, patrón `'mapa'` — `<line>` entre los puntos de la ruta
- línea 128, patrón `'captura'` — `<line>` como estelas hacia el colector
- línea 184, patrón `'origen'` — `<circle stroke>` animado como pulso

Cumplen: `trapped-dots.tsx`, `circulation-dots.tsx`, `megamenu-dots.tsx`, `grilla-proceso.tsx`.
