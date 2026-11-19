import { Metadata } from 'next'
import {
  PaginaCaso, EncabezadoCaso, PortadaCaso, ResumenCaso, CuerpoCaso, SeccionCaso, EnlaceCaso,
  CitaCaso, CierreCaso, MasHistorias, type Dato, type CampoFicha, type Cita,
} from '@/components/caso'
import { CreditoStrategyzer } from '@/components/minimal'

/** Caso Rameau, con la misma estructura del caso Dunamis. Proyecto en curso.
    PENDIENTE (lo entrega el usuario): foto de portada, imágenes del taller y de las piezas,
    el segmento y el cargo al que le hablan, ejemplos de hipótesis, y resultados cuando los haya. */

export const metadata: Metadata = {
  title: 'Rameau | Historias de clientes | Flahoolick',
  description: 'Cómo Rameau encontró su propuesta de valor con el Value Proposition Canvas, la probó con leads reales y construye sobre ella su marca, su sitio y su contenido.',
}

const LOGO = { src: '/logo-rameau.svg', alt: 'Rameau' }

/** Hechos del proyecto (no son métricas: el proyecto está en curso). */
const DATOS_PORTADA: Dato[] = [
  { valor: '1', etiqueta: 'segmento elegido para empezar' },
  { valor: 'Leads', etiqueta: 'con quienes se probaron las hipótesis' },
  { valor: '7', etiqueta: 'frentes, del sitio al dossier para leads' },
]

const FICHA: CampoFicha[] = [
  { nombre: 'Industria', valores: ['Software B2B: documentos convertidos en datos'] },
  { nombre: 'Desafío', valores: ['La plataforma estaba desarrollada, pero su propuesta de valor no estaba clara: qué relato contar y a quién de la organización hablarle.'] },
  { nombre: 'Servicios', valores: ['Marca y relato', 'Estrategia de contenido', 'Producción de contenido'] },
  { nombre: 'Entregables', valores: ['Identidad visual', 'Sitio web', 'Estrategia de contenidos', 'Blog de artículos', 'Página de LinkedIn', 'Pitch comercial', 'Dossier digital para leads'] },
  { nombre: 'Metodología', valores: ['Value Proposition Canvas (Strategyzer)', 'Hipótesis probadas con leads'] },
  { nombre: 'Estado', valores: ['En curso'] },
  { nombre: 'Sitios', valores: [{ texto: 'rameau.co', href: 'https://rameau.co/es' }] },
]

/** Cita real del fundador, con su foto de LinkedIn. */
const CITA_FUNDADOR: Cita = {
  texto: 'Necesitábamos claridad sobre a quién venderle, qué problema resolver y cómo diferenciarnos. Flahoolick nos ayudó a conectar estrategia, producto y comunicación en una propuesta comercial coherente.',
  nombre: 'Alexey Mitjaew',
  cargo: 'CEO & Founder, Rameau',
  retrato: '/casos/rameau/retrato-alexey-mitjaew.jpg',
}

export default function HistoriaRameau() {
  return (
    <PaginaCaso>
      <EncabezadoCaso cliente="Rameau" titulo="Una plataforma lista que todavía no sabía a quién hablarle." />
      <PortadaCaso logo={LOGO} datos={DATOS_PORTADA} />
      <ResumenCaso>
        Rameau tenía la plataforma lista y le faltaba el relato. Con el Value Proposition Canvas encontró su propuesta de valor, la probó con sus leads y hoy construye sobre ella su marca, su sitio y su contenido.
      </ResumenCaso>

      <CuerpoCaso ficha={FICHA}>
        <SeccionCaso titulo="El problema: una plataforma lista, sin una propuesta de valor clara.">
          <p>Rameau convierte documentos operacionales, como facturas, contratos y formularios en PDF, imagen o Excel, en datos estructurados y listos para usar.</p>
          <p>Cuando llegamos, la plataforma ya estaba desarrollada. Lo que faltaba era decir con claridad por qué importa, para quién y qué cambia para la empresa que la usa.</p>
        </SeccionCaso>

        <SeccionCaso titulo="La solución: un taller con el Value Proposition Canvas.">
          <p>Hicimos un taller con el equipo de Rameau. Elegimos un segmento para empezar y trabajamos sobre él: qué tareas tiene, qué le complica el trabajo y qué gana cuando la plataforma resuelve ese problema.</p>
          <p>El equipo entendió la herramienta y le interesó tanto que no se quedó en el taller: llevó a terreno lo que salió de ahí.</p>
          <CreditoStrategyzer />
        </SeccionCaso>

        <SeccionCaso titulo="Las hipótesis salieron del taller y se probaron con leads reales.">
          <p>Del trabajo con el segmento salieron hipótesis sobre el valor de la plataforma. El equipo de Rameau las llevó a conversaciones con sus leads potenciales.</p>
          <p>Así fue aprendiendo qué relato necesita la plataforma y a quién, dentro de cada organización, le tiene que hablar.</p>
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITA_FUNDADOR} />

        <SeccionCaso titulo="Sobre esos aprendizajes construimos la marca, el sitio y el contenido.">
          <p>Estamos desarrollando la identidad visual y el sitio de Rameau, y la estrategia de contenidos que los alimenta: un blog de artículos y su página de LinkedIn, que manejamos nosotros.</p>
          <p>Para ventas, un pitch para su ejecutivo comercial y un kit digital: un dossier que explica la plataforma a cada lead que entra.</p>
          <EnlaceCaso href="https://rameau.co/es">Ver rameau.co →</EnlaceCaso>
        </SeccionCaso>
      </CuerpoCaso>

      <MasHistorias actual="rameau" />
      <CierreCaso />
    </PaginaCaso>
  )
}
