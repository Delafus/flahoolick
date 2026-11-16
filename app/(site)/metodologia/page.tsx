import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Metodología | Del conocimiento disperso a un sistema que trabaja | Flahoolick',
  description: 'Entendemos el negocio, definimos su posición y ponemos su conocimiento en circulación mediante contenido y herramientas para ventas.',
}

const PASOS = [
  {
    id: 'paso-entendemos',
    titulo: '1. Encontramos',
    texto: 'Entramos a tu negocio, hablamos con quienes lo conocen y revisamos lo que ya tienes. Identificamos qué problemas reales resuelves y a qué clientes les importa más. Revisamos la oferta, el mercado, las audiencias y el proceso comercial. Entrevistamos a dirección, ventas y especialistas. Identificamos el conocimiento que distingue a la empresa y las brechas que dificultan explicarlo.',
    resultado: 'Un diagnóstico con los argumentos y evidencias que hacen que un cliente te elija.',
  },
  {
    id: 'paso-posicion',
    titulo: '2. Ordenamos',
    texto: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver. Definimos a quién hablarle, con qué mensaje y sobre qué temas. Elegimos qué lugar puede ocupar la empresa, qué idea debe organizar su relato y qué mensajes, argumentos y pruebas necesitan compartir dirección, marketing, ventas y los equipos técnicos.',
    resultado: 'Una propuesta de valor y un mapa de mensajes que toda la empresa cuenta igual.',
  },
  {
    id: 'paso-circulacion',
    titulo: '3. Ponemos en circulación',
    texto: 'Lo convertimos en contenido y herramientas que tus clientes pueden encontrar, entender y recordar. Convertimos esa dirección en una operación concreta: temas, contenidos, herramientas comerciales, formatos, canales, responsables y criterios de medición.',
    resultado: 'Piezas publicadas, con resultados que revisamos junto a marketing y ventas.',
  },
]

const PRINCIPIOS = [
  { titulo: 'El negocio va primero', texto: 'Cada recomendación parte de entender cómo la empresa crea valor y por qué alguien debería elegirla.' },
  { titulo: 'El conocimiento interno aporta evidencia', texto: 'Buscamos experiencia, datos, decisiones y aprendizajes propios que la empresa puede afirmar con plena legitimidad.' },
  { titulo: 'Cada activo cumple un trabajo', texto: 'Su función puede ser descubrir un problema, explicar una solución, comparar alternativas, resolver una objeción o avanzar una venta.' },
  { titulo: 'Marketing y ventas comparten el relato', texto: 'Todo lo que el mercado encuentra y escucha construye la misma comprensión de la empresa.' },
  { titulo: 'El criterio guía la tecnología', texto: 'La IA amplía nuestra capacidad para investigar, ordenar y ejecutar. El juicio humano senior dirige las decisiones estratégicas y editoriales.' },
]

export default function Metodologia() {
  return (
    <Pagina>
      <Hero
        eyebrow="Metodología"
        titulo="Del conocimiento disperso a un sistema que trabaja."
        bajada="Entendemos cómo tu empresa crea valor, definimos la posición que puede defender y convertimos esa dirección en contenido y herramientas para el mercado."
      />
      <Bloque titulo="Una comunicación clara nace de comprender profundamente el negocio.">
        <p>Un buen vendedor quiere crear valor para su cliente. Lo difícil es que diga lo mismo que dice el resto de su empresa. Cada área ve una parte distinta del cliente, y gran parte de lo que la empresa sabe nunca se escribió.</p>
        <p>Por eso empezamos con el Value Proposition Canvas, de Strategyzer: cruzamos lo que tu empresa ofrece con lo que cada segmento de clientes necesita resolver. De ahí sale a quién hablarle primero, con qué mensaje y qué historias contar para que el mercado te recuerde antes de la decisión de compra.</p>
      </Bloque>
      {PASOS.map(p => (
        <Bloque key={p.id} id={p.id} titulo={p.titulo}>
          <p>{p.texto}</p>
          <p><span style={{ fontWeight: 500 }}>Recibes:</span> {p.resultado}</p>
        </Bloque>
      ))}
      <Bloque titulo="Cinco principios para producir comunicación con sustancia.">
        <Items items={PRINCIPIOS} />
      </Bloque>
      <Bloque titulo="Tus expertos pueden concentrarse en su trabajo.">
        <p>Capturamos lo que saben mediante entrevistas breves, conversaciones de trabajo, documentos existentes, reuniones, datos y preguntas comerciales. Transformamos esa materia prima conservando su precisión y su carácter.</p>
      </Bloque>
      <CasoEnlace titulo="El sistema en acción: Dunamis.">
        <p>Su equipo comercial explicaba lo mismo desde cero en cada llamada. Sistematizamos lo que sabía y lo convertimos en una identidad, dos sitios, una plataforma editorial, herramientas digitales y un asistente virtual.</p>
      </CasoEnlace>
      <Cierre titulo="El conocimiento adquiere valor cuando encuentra una función en el mercado." cta="Conversemos sobre tu empresa →" />
    </Pagina>
  )
}
