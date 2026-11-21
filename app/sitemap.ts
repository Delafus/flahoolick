import type { MetadataRoute } from 'next'
import { todas } from '@/sanity/lib/jerga'
import { JERGA_VISIBLE } from '@/components/jerga-visible'

const BASE = 'https://www.flahoolick.com'

const RUTAS = [
  '',
  '/servicios',
  '/servicios/estrategia-y-relato-de-marca',
  '/servicios/sistema-operativo-de-contenido',
  '/servicios/estudio-creativo-e-inteligencia-artificial',
  '/metodologia',
  '/metodologia/encontramos',
  '/metodologia/ordenamos',
  '/metodologia/ponemos-en-circulacion',
  '/clientes/dunamis',
  '/clientes/rameau',
  '/sobre-flahoolick',
  '/faq',
  ...(JERGA_VISIBLE ? ['/jerga'] : []),
  '/politica-de-privacidad',
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Las piezas de JERGA entran al sitemap solo cuando JERGA esté visible.
  const piezas = JERGA_VISIBLE ? await todas().catch(() => []) : []
  return [
    ...RUTAS.map(r => ({ url: `${BASE}${r}` })),
    ...piezas.map(p => ({ url: `${BASE}/jerga/${p.slug}` })),
  ]
}
