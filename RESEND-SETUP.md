# Conectar el formulario de contacto a Resend

Hoy el formulario (`components/contact-form.tsx`) no envía nada — el botón "enviar" solo
simula un delay de 900ms y muestra "Mensaje enviado". Esta guía deja todo listo para que
efectivamente te llegue un email cada vez que alguien completa el formulario, usando
[Resend](https://resend.com) (el servicio de envío de emails transaccionales).

Tiempo estimado: 20-30 minutos. No necesitas saber programar más allá de copiar y pegar.

---

## 1. Crear cuenta en Resend

1. Andá a [resend.com](https://resend.com) y creá una cuenta (gratis, incluye 100 emails/día y 3.000/mes, más que suficiente para un formulario de contacto).
2. Una vez adentro, andá a **API Keys** (menú lateral) → **Create API Key**.
3. Dale un nombre (ej. "Flahoolick sitio") y dejalo con permiso "Sending access" (el default).
4. Copiá la key que te muestra — **empieza con `re_`** y solo se muestra una vez. Guárdala en algún lugar seguro por ahora (la vas a necesitar en el paso 3).

## 2. Verificar tu dominio (para que los emails no caigan en spam)

Sin esto, Resend igual puede enviar emails usando un dominio de prueba (`onboarding@resend.dev`), pero para producción es mejor usar tu propio dominio.

1. En Resend, andá a **Domains** → **Add Domain**.
2. Escribí tu dominio (ej. `flahoolick.cl` o el que uses para el sitio).
3. Resend te va a dar 3-4 registros DNS (tipo TXT y MX) para agregar donde tengas contratado el dominio (en el panel de tu proveedor — GoDaddy, NIC Chile, Cloudflare, etc.).
4. Agregá esos registros ahí, volvé a Resend y apretá **Verify DNS Records**. Puede tardar unos minutos a unas horas en propagar.

**Si querés probar todo esto YA, sin esperar la verificación del dominio**: podés usar
`onboarding@resend.dev` como remitente mientras tanto (funciona igual, solo que el email
va a decir que viene "vía resend.dev"). Cambiás el remitente después sin tocar nada más.

## 3. Guardar la API key en el proyecto

1. En la raíz del proyecto, abrí (o creá) el archivo `.env.local` — **este archivo nunca se sube a git** (ya está en `.gitignore`), así que la key queda solo en tu compu.
2. Agregá esta línea (reemplazando por tu key real):
   ```
   RESEND_API_KEY=re_tu_key_aca
   ```
3. Si ya tenías el server corriendo (`npm run dev`), reiniciarlo para que tome la variable nueva.

## 4. Instalar el paquete de Resend

En la terminal, en la raíz del proyecto:
```bash
npm install resend
```

## 5. Crear el endpoint que envía el email

Creá el archivo `app/api/contacto/route.ts` con este contenido:

```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Mientras el dominio no esté verificado en Resend, usa 'onboarding@resend.dev'.
// Una vez verificado tu dominio, cambia esto a algo como 'contacto@flahoolick.cl'.
const FROM = 'Flahoolick <onboarding@resend.dev>'
// El email (o emails) donde quieres recibir los mensajes del formulario.
const TO = ['delafus@gmail.com']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, empresa, email, mensaje } = body

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nuevo contacto: ${nombre}${empresa ? ` (${empresa})` : ''}`,
      text: `Nombre: ${nombre}\nEmpresa: ${empresa || '—'}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email de contacto:', error)
    return NextResponse.json({ error: 'No se pudo enviar el mensaje' }, { status: 500 })
  }
}
```

**Notas sobre este archivo:**
- `TO` es tu email — cambialo si quieres que llegue a otra dirección (o varias, como array: `['a@x.com', 'b@x.com']`).
- `replyTo: email` hace que cuando le des "Responder" al email que te llega, le respondas directo a la persona que llenó el formulario, no a Resend.
- Este código va en el **servidor** (Next.js API route), nunca se lo mandamos al navegador — por eso la API key queda segura.

## 6. Conectar el formulario al endpoint

En `components/contact-form.tsx`, el `handleSubmit` actual es:

```tsx
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setSent(true)
    setLoading(false)
  }
```

Reemplázalo por:

```tsx
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const formData = new FormData(e.currentTarget)
    const payload = {
      nombre: formData.get('nombre'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      mensaje: formData.get('mensaje'),
    }

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Fallo el envío')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
```

Y agrega el `useState` de `error` junto a los otros dos que ya existen arriba del componente
(`const [sent, setSent] = useState(false)` / `const [loading, setLoading] = useState(false)`).

Por último, en el JSX, justo antes del botón de submit (`<button type="submit" ...>`), podés
agregar un mensaje de error simple si `error` es `true`:
```tsx
              {error && (
                <p className="text-sm" style={{ color: '#EE3F4A' }}>
                  Hubo un problema al enviar. Intenta de nuevo o escríbenos directo.
                </p>
              )}
```

## 7. Probar en local

1. Corré `npm run dev`.
2. Andá a cualquier página con formulario de contacto (ej. `http://localhost:3000/#contacto`).
3. Completa y enviá el formulario.
4. Revisa el email que pusiste en `TO` (paso 5) — debería llegar en segundos.
5. Si algo falla, mirá la consola del navegador (F12) y la terminal donde corre `npm run dev` — el error queda logueado ahí (`console.error('Error enviando email de contacto:', error)`).

## 8. Agregar la variable de entorno en Vercel (para producción)

El paso 3 (`.env.local`) solo funciona en tu compu — Vercel no lo lee (por diseño, para
que las keys no queden en el repo). Hay que agregarla también ahí:

1. Andá a [vercel.com](https://vercel.com), abrí el proyecto del sitio.
2. **Settings** → **Environment Variables**.
3. Agregá: Key = `RESEND_API_KEY`, Value = tu key (`re_...`), marca los 3 entornos (Production, Preview, Development).
4. Guardá y hacé un nuevo deploy (o esperá al próximo push) para que tome la variable.

## 9. Confirmar que quedó andando

Una vez desplegado, probá el formulario directo en `https://flahoolick.vercel.app/#contacto`
(o el dominio final) igual que en el paso 7, y confirma que te llega el email.

---

## Resumen de archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `.env.local` (local) y Vercel → Environment Variables (producción) | Se agrega `RESEND_API_KEY` |
| `app/api/contacto/route.ts` (nuevo) | Recibe el POST del formulario y llama a Resend |
| `components/contact-form.tsx` | El `handleSubmit` pasa de simular un delay a hacer `fetch` real al endpoint |
| `package.json` | Se agrega la dependencia `resend` (automático al correr `npm install resend`) |
