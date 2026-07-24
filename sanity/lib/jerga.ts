import type { TipoContenido } from '@/content/jerga'
import { client } from './client'

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
  destacada: boolean
  orden?: number
  imagenDestacadaUrl?: string
  imagenDestacadaAlt?: string
  cuerpo: any[]
}

const PIEZA_PROYECCION = `{
  "slug": slug.current,
  tipo,
  "categoria": categoria->slug.current,
  titulo,
  "bajada": extracto,
  fecha,
  autor,
  lectura,
  "destacada": destacada == true,
  orden,
  "imagenDestacadaUrl": imagenDestacada.asset->url,
  "imagenDestacadaAlt": imagenDestacada.alt,
  cuerpo,
}`

export async function todas(): Promise<Pieza[]> {
  return client.fetch(`*[_type == "articulo"] | order(fecha desc) ${PIEZA_PROYECCION}`)
}

export async function porSlug(slug: string): Promise<Pieza | null> {
  return client.fetch(
    `*[_type == "articulo" && slug.current == $slug][0] ${PIEZA_PROYECCION}`,
    { slug },
  )
}

export async function porCategoria(slug: string): Promise<Pieza[]> {
  return client.fetch(
    `*[_type == "articulo" && categoria->slug.current == $slug] | order(fecha desc) ${PIEZA_PROYECCION}`,
    { slug },
  )
}

export async function porTipo(tipo: TipoContenido): Promise<Pieza[]> {
  return client.fetch(
    `*[_type == "articulo" && tipo == $tipo] | order(coalesce(orden, 99) asc) ${PIEZA_PROYECCION}`,
    { tipo },
  )
}

export async function destacada(): Promise<Pieza | null> {
  return client.fetch(`*[_type == "articulo" && destacada == true][0] ${PIEZA_PROYECCION}`)
}

export async function categorias(): Promise<Categoria[]> {
  return client.fetch(
    `*[_type == "categoria"] | order(nombre asc){ "slug": slug.current, nombre, descripcion }`,
  )
}

export async function categoria(slug: string): Promise<Categoria | null> {
  return client.fetch(
    `*[_type == "categoria" && slug.current == $slug][0]{ "slug": slug.current, nombre, descripcion }`,
    { slug },
  )
}

export async function relacionadas(pieza: Pieza, cantidad = 3): Promise<Pieza[]> {
  const todasLasPiezas = await todas()
  const mismaCategoria = todasLasPiezas.filter(p => p.categoria === pieza.categoria && p.slug !== pieza.slug)
  const resto = todasLasPiezas.filter(p => p.categoria !== pieza.categoria && p.slug !== pieza.slug)
  return [...mismaCategoria, ...resto].slice(0, cantidad)
}

export async function conteoPorCategoria(): Promise<{ categoria: Categoria; total: number }[]> {
  const [cats, piezas] = await Promise.all([categorias(), todas()])
  return cats.map(c => ({ categoria: c, total: piezas.filter(p => p.categoria === c.slug).length }))
}
