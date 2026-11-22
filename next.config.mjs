/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // La dirección de Vercel lleva siempre al dominio propio.
      { source: '/:path*', has: [{ type: 'host', value: 'flahoolick.vercel.app' }], destination: 'https://www.flahoolick.com/:path*', permanent: true },
      { source: '/casos/dunamis', destination: '/clientes/dunamis', permanent: true },
      { source: '/clientes/dunamis-borrador', destination: '/clientes/dunamis', permanent: false },
      { source: '/sensor', destination: '/metodologia#sensor', permanent: true },
      { source: '/deck', destination: '/metodologia#deck', permanent: true },
      // De cuatro servicios a tres capacidades.
      { source: '/servicios/marca-y-relato', destination: '/servicios/estrategia-y-relato-de-marca', permanent: true },
      { source: '/servicios/estrategia-de-contenido', destination: '/servicios/sistema-operativo-de-contenido', permanent: true },
      { source: '/servicios/produccion-de-contenido', destination: '/servicios/estudio-creativo-e-inteligencia-artificial', permanent: true },
      { source: '/servicios/ia-para-marketing-y-ventas', destination: '/servicios/estudio-creativo-e-inteligencia-artificial', permanent: true },
      { source: '/servicios/sistemas-de-contenido-con-ia', destination: '/servicios/estudio-creativo-e-inteligencia-artificial', permanent: true },
      { source: '/servicios/herramientas-de-ia-para-marketing', destination: '/servicios/estudio-creativo-e-inteligencia-artificial', permanent: true },
    ]
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}
export default nextConfig
