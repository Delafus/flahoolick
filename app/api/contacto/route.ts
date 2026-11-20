import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/** Texto basura de bot: una sola "palabra" larga de letras al azar, con muchos cambios entre mayúscula y minúscula
    (ej. "CRsWdkVfVfOwFizHW"). Un nombre o mensaje real tiene espacios o pocos cambios de caja. */
function pareceBasura(texto: unknown) {
  const t = String(texto ?? '').trim()
  if (t.length < 8 || /\s/.test(t) || !/^[A-Za-z]+$/.test(t)) return false
  let cambios = 0
  for (let i = 1; i < t.length; i++) {
    const a = t[i - 1], b = t[i]
    if ((a === a.toUpperCase()) !== (b === b.toUpperCase())) cambios++
  }
  return cambios >= t.length / 3
}

export async function POST(request: Request) {
  const { nombre, empresa, email, mensaje, sitio_web, t } = await request.json()
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida'

  // Antispam: campo trampa lleno, envío en menos de 3 segundos (o sin pasar por el formulario) o texto basura.
  // Al bot se le responde "ok" para que no insista; el correo no se envía. Queda registrado con su IP en los logs de Vercel.
  const motivo = sitio_web ? 'campo trampa'
    : !(typeof t === 'number' && t >= 3000) ? 'demasiado rápido'
    : pareceBasura(nombre) && pareceBasura(mensaje) ? 'texto basura'
    : null
  if (motivo) {
    console.warn(`Contacto descartado (${motivo}) desde IP ${ip}`)
    return NextResponse.json({ ok: true })
  }
  console.log(`Contacto recibido desde IP ${ip}`)

  if (!nombre || !empresa || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY no está configurada.')
    return NextResponse.json({ error: 'El envío de correo no está configurado.' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Flahoolick <onboarding@resend.dev>',
      to: process.env.RESEND_TO_EMAIL || 'delafus@gmail.com',
      replyTo: email,
      subject: `Nuevo contacto de ${nombre} (${empresa})`,
      text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    })

    if (error) {
      console.error('Error de Resend:', error)
      return NextResponse.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email de contacto:', error)
    return NextResponse.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 })
  }
}
