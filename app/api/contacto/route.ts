import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const { nombre, empresa, email, mensaje } = await request.json()

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
