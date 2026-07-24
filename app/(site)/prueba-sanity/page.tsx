import { client } from '@/sanity/lib/client'

// Página temporal del Paso 4 — solo confirma la conexión con Sanity.
// Se elimina una vez migradas las páginas reales de JERGA (Paso 5).
export default async function PruebaSanityPage() {
  const categorias = await client.fetch<{ nombre: string; descripcion: string }[]>(
    `*[_type == "categoria"]{nombre, descripcion} | order(nombre asc)`
  )

  return (
    <pre style={{ padding: '2rem', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
      {categorias.length > 0
        ? JSON.stringify(categorias, null, 2)
        : 'Conexión OK. El dataset todavía no tiene documentos de tipo "categoria".'}
    </pre>
  )
}
