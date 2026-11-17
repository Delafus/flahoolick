import type { MetadataRoute } from 'next'
import { todas } from '@/sanity/lib/jerga'
import { JERGA_VISIBLE } from '@/components/jerga-visible'

const BASE = 'https://www.flahoolick.com'

const RUTAS = [
  '',
  '/servicios',
  '/servicios/estrategia-de-contenido',
  '/servicios/marca-y-relato',
  '/servicios/produccion-de-contenido',
  '/servicios/ia-para-marketing-y-ventas',
  '/metodologia',
  '/clientes/dunamis',
  '/sobre-flahoolick',
  '/faq',
  ...(JERGA_VISIBLE ? ['/jerga'] : []),
  '/politica-de-privacidad',
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const piezas = await todas().catch(() => [])
  return [
    ...RUTAS.map(r => ({ url: `${BASE}${r}` })),
    ...piezas.map(p => ({ url: `${BASE}/jerga/${p.slug}` })),
  ]
}
