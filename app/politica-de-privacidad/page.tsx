import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'

const CREMA = '#F9F0E2'
const NEGRO = '#000000'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Flahoolick',
  description: 'Cómo Flahoolick recopila, usa y protege los datos personales de quienes visitan este sitio.',
}

const ACTUALIZADO = '[indicar fecha]'
const CORREO = '[correo de contacto]'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      marginTop: '3.5rem',
      marginBottom: '1.25rem',
    }}>{children}</h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="label" style={{ marginTop: '2rem', marginBottom: '0.875rem', opacity: 0.55 }}>
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 'clamp(1rem, 1.15vw, 1.0625rem)',
      lineHeight: 1.75,
      opacity: 0.75,
      marginBottom: '1.125rem',
    }}>{children}</p>
  )
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: '1.5rem', paddingLeft: 0, listStyle: 'none' }}>
      {items.map(i => (
        <li key={i} style={{
          fontSize: 'clamp(1rem, 1.15vw, 1.0625rem)',
          lineHeight: 1.7,
          opacity: 0.75,
          paddingLeft: '1.25rem',
          position: 'relative',
          marginBottom: '0.5rem',
        }}>
          <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>
          {i}
        </li>
      ))}
    </ul>
  )
}

function Contenido() {
  return (
    <div>
      <p className="label" style={{ opacity: 0.5, marginBottom: '2.5rem' }}>
        Última actualización: {ACTUALIZADO}
      </p>

      <P>Flahoolick respeta la privacidad de las personas que visitan este sitio web y se compromete a tratar sus datos personales de forma responsable, transparente y segura.</P>
      <P>Esta Política de Privacidad explica qué información podemos recopilar, cómo la usamos, con quién podríamos compartirla y qué derechos puedes ejercer respecto de tus datos personales.</P>
      <P>Al visitar este sitio web, contactarnos mediante formularios o suscribirte a nuestras comunicaciones, aceptas las prácticas descritas en esta política.</P>

      <H2>1. Quiénes somos</H2>
      <P>Flahoolick es una consultora de estrategia y contenido para empresas B2B.</P>
      <P>Para efectos de esta política, «Flahoolick», «nosotros» o «nuestro» se refiere a Flahoolick y a las personas o proveedores que apoyan la operación de este sitio y sus comunicaciones.</P>
      <P>Sitio web: flahoolick.com</P>
      <P>Contacto: {CORREO}</P>

      <H2>2. Qué información recopilamos</H2>
      <P>Podemos recopilar información personal y técnica cuando visitas nuestro sitio, completas un formulario, nos escribes directamente o te suscribes a nuestras comunicaciones.</P>

      <H3>Datos que entregas voluntariamente</H3>
      <P>Podemos recopilar datos como:</P>
      <Lista items={[
        'Nombre',
        'Empresa',
        'Cargo',
        'Correo electrónico',
        'Teléfono',
        'Mensaje o consulta enviada',
        'Intereses relacionados con nuestros servicios, contenidos o actividades',
      ]} />
      <P>Esta información se recopila cuando completas un formulario de contacto, solicitas información, respondes una comunicación o te suscribes a JERGA u otras comunicaciones de Flahoolick.</P>

      <H3>Datos técnicos y de navegación</H3>
      <P>También podemos recopilar información técnica asociada al uso del sitio, como:</P>
      <Lista items={[
        'Dirección IP',
        'Tipo de navegador',
        'Sistema operativo',
        'Dispositivo utilizado',
        'Páginas visitadas',
        'Tiempo de navegación',
        'Fuente de tráfico',
        'Interacciones dentro del sitio',
        'Fecha y hora de acceso',
      ]} />
      <P>Esta información puede recopilarse mediante cookies, herramientas de analítica web, registros del servidor u otras tecnologías similares.</P>

      <H2>3. Uso de Google Analytics</H2>
      <P>Este sitio puede usar Google Analytics para entender cómo las personas navegan y utilizan nuestras páginas.</P>
      <P>Google Analytics puede recopilar información sobre dispositivos, navegadores, actividad en el sitio y cookies propias para generar estadísticas de uso. Google señala que Google Analytics no registra ni almacena direcciones IP al recoger datos en sus sistemas actuales de medición.</P>
      <P>Usamos esta información para analizar rendimiento, mejorar contenidos, detectar problemas de navegación y tomar decisiones sobre la evolución del sitio.</P>
      <P>Puedes configurar tu navegador para bloquear o eliminar cookies. También puedes revisar las opciones de privacidad y publicidad disponibles en los servicios de Google.</P>

      <H2>4. Cookies y tecnologías similares</H2>
      <P>Este sitio puede utilizar cookies y tecnologías similares para:</P>
      <Lista items={[
        'Hacer funcionar correctamente el sitio',
        'Recordar preferencias técnicas',
        'Medir uso y rendimiento',
        'Entender qué contenidos generan mayor interés',
        'Mejorar la experiencia de navegación',
      ]} />
      <P>Algunas cookies son necesarias para el funcionamiento del sitio. Otras pueden estar relacionadas con analítica, medición o futuras herramientas de comunicación.</P>
      <P>Podremos implementar un banner o panel de preferencias de cookies cuando el sitio incorpore tecnologías que requieran consentimiento específico.</P>

      <H2>5. Para qué usamos la información</H2>
      <P>Podemos usar la información recopilada para:</P>
      <Lista items={[
        'Responder consultas o solicitudes de contacto',
        'Enviar información sobre Flahoolick, sus servicios o contenidos',
        'Gestionar suscripciones a JERGA u otras comunicaciones editoriales',
        'Mejorar el sitio web y su rendimiento',
        'Analizar intereses de navegación de forma agregada',
        'Preparar propuestas o conversaciones comerciales',
        'Mantener registros internos de contacto',
        'Cumplir obligaciones legales o requerimientos de autoridad competente',
        'Proteger la seguridad del sitio y prevenir usos indebidos',
      ]} />
      <P>No vendemos tus datos personales.</P>

      <H2>6. Newsletter y comunicaciones editoriales</H2>
      <P>Más adelante, Flahoolick podrá ofrecer la suscripción a JERGA, nuestro medio editorial.</P>
      <P>Si te suscribes, usaremos tu correo electrónico y los datos asociados a la suscripción para enviarte contenidos, artículos, novedades, invitaciones o comunicaciones relacionadas con Flahoolick.</P>
      <P>Podrás darte de baja de estas comunicaciones mediante el enlace de desuscripción incluido en cada correo o escribiéndonos directamente a {CORREO}.</P>

      <H2>7. Con quién podemos compartir información</H2>
      <P>Podemos compartir información con proveedores que nos ayudan a operar el sitio, analizar su desempeño, administrar comunicaciones o prestar servicios tecnológicos.</P>
      <P>Estos proveedores pueden incluir:</P>
      <Lista items={[
        'Servicios de hosting',
        'Herramientas de analítica web',
        'Plataformas de email marketing',
        'Herramientas de formularios',
        'Servicios de seguridad',
        'Proveedores de soporte técnico',
        'Herramientas de gestión comercial o CRM',
      ]} />
      <P>Estos terceros deben usar la información únicamente para prestar los servicios correspondientes.</P>
      <P>También podemos revelar información cuando sea necesario para cumplir una obligación legal, responder a una autoridad competente, proteger nuestros derechos o prevenir usos indebidos del sitio.</P>

      <H2>8. Transferencias internacionales</H2>
      <P>Algunas herramientas tecnológicas que usamos o podríamos usar pueden operar desde otros países o almacenar información en servidores ubicados fuera de Chile.</P>
      <P>En esos casos, procuraremos trabajar con proveedores que mantengan estándares adecuados de seguridad, confidencialidad y protección de datos.</P>

      <H2>9. Seguridad de la información</H2>
      <P>Adoptamos medidas razonables para proteger la información personal frente a acceso no autorizado, pérdida, uso indebido, alteración o divulgación.</P>
      <P>Ningún sistema de transmisión o almacenamiento digital es completamente infalible. Por eso, mantenemos prácticas de revisión y mejora continua sobre las herramientas que usamos.</P>

      <H2>10. Conservación de datos</H2>
      <P>Conservaremos los datos personales durante el tiempo necesario para cumplir las finalidades descritas en esta política.</P>
      <P>También podremos conservar información cuando sea necesario para cumplir obligaciones legales, resolver disputas, mantener registros comerciales o proteger nuestros derechos.</P>
      <P>Cuando la información deje de ser necesaria, podremos eliminarla, anonimizarla o conservarla solo en la medida permitida por la ley.</P>

      <H2>11. Derechos de las personas</H2>
      <P>De acuerdo con la normativa chilena sobre protección de datos personales, las personas pueden ejercer derechos relacionados con acceso, rectificación, cancelación o eliminación, oposición y bloqueo de sus datos personales. La Ley N° 19.628 regula el tratamiento de datos personales en Chile y reconoce derechos sobre información, procedencia, finalidad y destinatarios de los datos.</P>
      <P>Puedes solicitar:</P>
      <Lista items={[
        'Acceso a los datos personales que mantenemos sobre ti',
        'Rectificación de datos incorrectos o incompletos',
        'Eliminación o cancelación de datos cuando corresponda',
        'Oposición al tratamiento en los casos aplicables',
        'Bloqueo de datos en los casos previstos por la normativa',
      ]} />
      <P>Para ejercer estos derechos, puedes escribirnos a {CORREO}.</P>
      <P>Podremos solicitar información adicional para verificar tu identidad antes de responder una solicitud.</P>

      <H2>12. Menores de edad</H2>
      <P>Este sitio está dirigido a empresas, profesionales y audiencias vinculadas al mercado B2B.</P>
      <P>No buscamos recopilar información personal de menores de edad. Si tomamos conocimiento de que hemos recibido información personal de un menor sin autorización correspondiente, adoptaremos medidas razonables para eliminarla.</P>

      <H2>13. Enlaces a sitios de terceros</H2>
      <P>Nuestro sitio puede incluir enlaces a sitios externos, artículos, plataformas o servicios de terceros.</P>
      <P>Esta Política de Privacidad aplica únicamente al sitio de Flahoolick. No somos responsables por las prácticas de privacidad, seguridad o contenido de sitios externos.</P>

      <H2>14. Cambios a esta política</H2>
      <P>Podemos actualizar esta Política de Privacidad cuando cambien nuestras prácticas, herramientas, servicios o requisitos legales.</P>
      <P>La versión vigente estará siempre disponible en esta página, con su fecha de última actualización.</P>

      <H2>15. Contacto</H2>
      <P>Para preguntas sobre esta Política de Privacidad o para ejercer derechos sobre tus datos personales, puedes contactarnos en:</P>
      <P>Flahoolick<br />Santiago, Chile<br />{CORREO}</P>
    </div>
  )
}

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <PageColorSetter bg={CREMA} text={NEGRO} />

      <section className="page-px section-py" style={{ backgroundColor: CREMA, color: NEGRO, paddingTop: 'calc(64px + var(--section-py))' }}>
        <div className="max-container">

          {/* Mobile — apilado */}
          <div className="flex flex-col gap-10 md:hidden">
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.75rem, 10vw, 4rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}>
              Política de Privacidad
            </h1>
            <Contenido />
          </div>

          {/* Desktop — título sticky + divisor + texto */}
          <div className="hidden md:grid items-start gap-0" style={{ gridTemplateColumns: '5fr 1px 6fr' }}>
            <div style={{ paddingRight: '3rem', alignSelf: 'stretch' }}>
              <h1 style={{
                position: 'sticky',
                top: 'calc(64px + 3rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
              }}>
                Política de Privacidad
              </h1>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.12)', height: '100%', width: '1px' }} />

            <div style={{ paddingLeft: '3rem', maxWidth: '760px' }}>
              <Contenido />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
