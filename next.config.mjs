/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/sensor', destination: '/metodologia#sensor', permanent: true },
      { source: '/deck', destination: '/metodologia#deck', permanent: true },
      { source: '/servicios/sistemas-de-contenido-con-ia', destination: '/servicios/ia-para-marketing-y-ventas', permanent: true },
      { source: '/servicios/herramientas-de-ia-para-marketing', destination: '/servicios/ia-para-marketing-y-ventas', permanent: true },
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
