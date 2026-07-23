// ─────────────────────────────────────────────────────────────
// JERGA — fuente única de contenido
// Todo listado del sitio (portada, categorías, módulo home,
// relacionados) se deriva de este archivo.
// ─────────────────────────────────────────────────────────────

export type TipoContenido = 'articulo' | 'guia' | 'tutorial'

export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'subtitulo'; texto: string }
  | { tipo: 'cita'; texto: string; autor?: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'imagen'; alt: string; pie?: string; ratio?: string }
  | { tipo: 'destacado'; texto: string }
  | { tipo: 'paso'; numero: number; titulo: string; texto: string }

export interface Categoria {
  slug: string
  nombre: string
  descripcion: string
}

export interface Pieza {
  slug: string
  tipo: TipoContenido
  categoria: string
  titulo: string
  bajada: string
  fecha: string
  autor: string
  lectura: number
  destacada?: boolean
  orden?: number
  cuerpo: Bloque[]
}

export const CATEGORIAS: Categoria[] = [
  {
    slug: 'el-mercado',
    nombre: 'El Mercado',
    descripcion: 'Cómo decide un comprador B2B, cuánto dura la ventana de decisión y qué recuerda cuando llega el momento.',
  },
  {
    slug: 'el-sistema',
    nombre: 'El Sistema',
    descripcion: 'La infraestructura editorial que mantiene el conocimiento de una empresa en circulación.',
  },
  {
    slug: 'el-oficio',
    nombre: 'El Oficio',
    descripcion: 'Cómo se hace el trabajo. Método, criterio y decisiones de producción.',
  },
  {
    slug: 'el-criterio',
    nombre: 'El Criterio',
    descripcion: 'La columna de Felipe de la Fuente.',
  },
]

const LOREM_1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

const LOREM_2 = 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.'

const LOREM_3 = 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'

const CUERPO_BASE: Bloque[] = [
  { tipo: 'parrafo', texto: LOREM_1 },
  { tipo: 'parrafo', texto: LOREM_2 },
  { tipo: 'subtitulo', texto: 'Lorem ipsum dolor sit amet' },
  { tipo: 'parrafo', texto: LOREM_3 },
  { tipo: 'imagen', alt: 'Placeholder', pie: 'Pie de foto de la imagen.', ratio: '16/9' },
  { tipo: 'parrafo', texto: LOREM_1 },
]

export const PIEZAS: Pieza[] = [
  // ── Destacada ───────────────────────────────────────────────
  {
    slug: 'that-is-not-your-decision',
    tipo: 'articulo',
    categoria: 'el-criterio',
    titulo: 'That is not your decision.',
    bajada: 'Cuando le das clic a publicar, hay una suposición que nunca se dice en voz alta: que producir y llegar son la misma cosa. El mercado responde como Ragnar Lothbrok. Todos los días. A todas las marcas. Sin excepción.',
    fecha: '2026-07-15',
    autor: 'Felipe de la Fuente',
    lectura: 6,
    destacada: true,
    cuerpo: [
      { tipo: 'parrafo', texto: LOREM_1 },
      { tipo: 'parrafo', texto: LOREM_2 },
      { tipo: 'destacado', texto: 'Un bloque destacado sirve para sostener la idea central del texto y darle respiro a la lectura.' },
      { tipo: 'subtitulo', texto: 'Lo que el mercado decide' },
      { tipo: 'parrafo', texto: LOREM_3 },
      { tipo: 'cita', texto: 'Una cita ocupa el ancho completo de la columna y rompe el ritmo de la lectura.', autor: 'Autor de la cita' },
      { tipo: 'parrafo', texto: LOREM_1 },
      { tipo: 'imagen', alt: 'Placeholder', pie: 'Pie de foto de la imagen.', ratio: '16/9' },
      { tipo: 'subtitulo', texto: 'Qué hacer con eso' },
      { tipo: 'parrafo', texto: LOREM_2 },
      { tipo: 'lista', items: [
        'Primer punto de la enumeración.',
        'Segundo punto de la enumeración.',
        'Tercer punto de la enumeración.',
      ] },
      { tipo: 'parrafo', texto: LOREM_3 },
    ],
  },

  // ── Guías (numeradas) ───────────────────────────────────────
  {
    slug: 'guia-95-5',
    tipo: 'guia',
    categoria: 'el-mercado',
    titulo: 'La regla 95:5, explicada para comités de decisión',
    bajada: 'Solo el 5% de tu mercado está listo para comprar hoy. Qué implica eso para el presupuesto, el calendario y la manera de medir.',
    fecha: '2026-07-10',
    autor: 'Flahoolick',
    lectura: 12,
    orden: 1,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'guia-sistema-de-contenido',
    tipo: 'guia',
    categoria: 'el-sistema',
    titulo: 'Cómo instalar un sistema de contenido que no dependa de una campaña',
    bajada: 'Las cuatro capas, en orden, con lo que hay que resolver en cada una antes de pasar a la siguiente.',
    fecha: '2026-07-08',
    autor: 'Flahoolick',
    lectura: 15,
    orden: 2,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'guia-voz-ejecutiva',
    tipo: 'guia',
    categoria: 'el-oficio',
    titulo: 'Voz ejecutiva: cómo suena un líder que el mercado recuerda',
    bajada: 'Qué separa a un ejecutivo con presencia pública de uno que publica. Registro, frecuencia y territorio.',
    fecha: '2026-07-02',
    autor: 'Flahoolick',
    lectura: 10,
    orden: 3,
    cuerpo: CUERPO_BASE,
  },

  // ── Tutoriales ──────────────────────────────────────────────
  {
    slug: 'tutorial-mapa-de-señales',
    tipo: 'tutorial',
    categoria: 'el-sistema',
    titulo: 'Cómo levantar un mapa de señales en tu empresa',
    bajada: 'Un procedimiento en cinco pasos para capturar el conocimiento que hoy vive en reuniones y propuestas comerciales.',
    fecha: '2026-06-28',
    autor: 'Flahoolick',
    lectura: 8,
    cuerpo: [
      { tipo: 'parrafo', texto: LOREM_1 },
      { tipo: 'paso', numero: 1, titulo: 'Identifica las fuentes', texto: LOREM_2 },
      { tipo: 'paso', numero: 2, titulo: 'Define el criterio de captura', texto: LOREM_3 },
      { tipo: 'paso', numero: 3, titulo: 'Establece la cadencia', texto: LOREM_1 },
      { tipo: 'paso', numero: 4, titulo: 'Asigna responsables', texto: LOREM_2 },
      { tipo: 'paso', numero: 5, titulo: 'Revisa y calibra', texto: LOREM_3 },
      { tipo: 'parrafo', texto: LOREM_1 },
    ],
  },
  {
    slug: 'tutorial-brief-editorial',
    tipo: 'tutorial',
    categoria: 'el-oficio',
    titulo: 'Cómo escribir un brief editorial que no termine en un texto genérico',
    bajada: 'El formato que usamos internamente, con los campos que importan y los que se pueden dejar fuera.',
    fecha: '2026-06-20',
    autor: 'Flahoolick',
    lectura: 7,
    cuerpo: [
      { tipo: 'parrafo', texto: LOREM_2 },
      { tipo: 'paso', numero: 1, titulo: 'Empieza por la audiencia', texto: LOREM_1 },
      { tipo: 'paso', numero: 2, titulo: 'Declara la tesis', texto: LOREM_3 },
      { tipo: 'paso', numero: 3, titulo: 'Define la evidencia', texto: LOREM_2 },
      { tipo: 'parrafo', texto: LOREM_1 },
    ],
  },

  // ── Artículos ───────────────────────────────────────────────
  {
    slug: 'category-entry-points',
    tipo: 'articulo',
    categoria: 'el-mercado',
    titulo: 'Category Entry Points: cómo tu comprador decide antes de buscar',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-06-15',
    autor: 'Flahoolick',
    lectura: 5,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'contenido-generico',
    tipo: 'articulo',
    categoria: 'el-oficio',
    titulo: 'Por qué el contenido genérico es la peor inversión de marketing B2B',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-06-10',
    autor: 'Flahoolick',
    lectura: 4,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'bothism',
    tipo: 'articulo',
    categoria: 'el-criterio',
    titulo: 'Mark Ritson tenía razón: bothism es rigor',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-06-04',
    autor: 'Felipe de la Fuente',
    lectura: 6,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'banco-de-evidencia',
    tipo: 'articulo',
    categoria: 'el-sistema',
    titulo: 'El banco de evidencia: cuando el conocimiento de tu empresa se vuelve activo',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-05-28',
    autor: 'Flahoolick',
    lectura: 7,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'byron-sharp-crecimiento',
    tipo: 'articulo',
    categoria: 'el-mercado',
    titulo: 'Cómo Byron Sharp cambió lo que sabemos sobre el crecimiento de marcas',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-05-20',
    autor: 'Flahoolick',
    lectura: 8,
    cuerpo: CUERPO_BASE,
  },
  {
    slug: 'gossage-atencion',
    tipo: 'articulo',
    categoria: 'el-criterio',
    titulo: 'Howard Gossage lo dijo en 1965: la atención se merece',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    fecha: '2026-05-12',
    autor: 'Felipe de la Fuente',
    lectura: 5,
    cuerpo: CUERPO_BASE,
  },
]

// ── Selectores ────────────────────────────────────────────────

export const porFecha = (a: Pieza, b: Pieza) => (a.fecha < b.fecha ? 1 : -1)

export function todas(): Pieza[] {
  return [...PIEZAS].sort(porFecha)
}

export function porSlug(slug: string): Pieza | undefined {
  return PIEZAS.find(p => p.slug === slug)
}

export function porCategoria(slug: string): Pieza[] {
  return PIEZAS.filter(p => p.categoria === slug).sort(porFecha)
}

export function porTipo(tipo: TipoContenido): Pieza[] {
  return PIEZAS.filter(p => p.tipo === tipo).sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
}

export function destacada(): Pieza | undefined {
  return PIEZAS.find(p => p.destacada)
}

export function categoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find(c => c.slug === slug)
}

export function relacionadas(pieza: Pieza, cantidad = 3): Pieza[] {
  const mismaCategoria = PIEZAS.filter(p => p.categoria === pieza.categoria && p.slug !== pieza.slug)
  const resto = PIEZAS.filter(p => p.categoria !== pieza.categoria && p.slug !== pieza.slug)
  return [...mismaCategoria, ...resto].sort(porFecha).slice(0, cantidad)
}

export function conteoPorCategoria(): { categoria: Categoria; total: number }[] {
  return CATEGORIAS.map(c => ({ categoria: c, total: porCategoria(c.slug).length }))
}

export const ETIQUETA_TIPO: Record<TipoContenido, string> = {
  articulo: 'Artículo',
  guia: 'Guía',
  tutorial: 'Tutorial',
}

export const CTA_TIPO: Record<TipoContenido, string> = {
  articulo: 'Leer artículo →',
  guia: 'Leer guía →',
  tutorial: 'Ver tutorial →',
}

export function fechaLegible(iso: string): string {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const [a, m, d] = iso.split('-')
  return `${Number(d)} de ${meses[Number(m) - 1]} de ${a}`
}
