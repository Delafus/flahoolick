import { Metadata } from 'next'

/*
  Página de espera (2026-11-21), hasta nuevo aviso.
  La home completa quedó en app/(site)/home-completa.tsx. Para volver a ella:
  borra esta carpeta (espera) y renombra home-completa.tsx a page.tsx.
*/

export const metadata: Metadata = {
  title: 'Flahoolick | Estudio de estrategia y contenido B2B',
  description: 'Flahoolick es un estudio de estrategia y contenido B2B en Santiago de Chile.',
}

export default function Espera() {
  return (
    <main
      className="flex min-h-[100svh] items-center justify-center px-4"
      style={{ backgroundColor: '#F5FD92', color: '#1C1854' }}
    >
      <div className="flex flex-col items-start gap-3 text-left">
      <span
        role="img"
        aria-label="Flahoolick"
        className="block"
        style={{
          width: 'min(16rem, 70vw)', aspectRatio: '4 / 1', backgroundColor: '#1C1854',
          WebkitMaskImage: 'url(/logo-flahoolick-hrztl.svg)', maskImage: 'url(/logo-flahoolick-hrztl.svg)',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center', maskPosition: 'center',
          WebkitMaskSize: 'contain', maskSize: 'contain',
        }}
      />
      <p className="text-sm md:text-base">Estudio de estrategia y contenido B2B, © 2026 Flahoolick</p>
      </div>
    </main>
  )
}
