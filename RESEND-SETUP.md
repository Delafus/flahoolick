# Conectar el formulario de contacto a Resend

El código ya está listo: `app/api/contacto/route.ts` recibe el formulario y lo envía por
[Resend](https://resend.com), y `components/contact-form.tsx` llama a ese endpoint de
verdad (ya no simula el envío). Solo faltan los pasos que dependen de tu cuenta.

## 1. Crear cuenta y API key en Resend

1. Andá a [resend.com](https://resend.com) y creá una cuenta (gratis, 100 emails/día).
2. **API Keys** → **Create API Key**. Nombre libre (ej. "Flahoolick sitio"), permiso "Sending access".
3. Copiá la key (empieza con `re_`, solo se muestra una vez).

## 2. Verificar tu dominio (opcional para probar, necesario para producción)

Sin esto, Resend igual envía usando `onboarding@resend.dev` como remitente — sirve para
probar ahora mismo, pero para producción real conviene tu propio dominio.

1. En Resend: **Domains** → **Add Domain** → tu dominio.
2. Agregá los registros DNS (TXT/MX) que te muestre en el panel de tu proveedor de dominio.
3. Volvé a Resend y apretá **Verify DNS Records**.

## 3. Completar `.env.local` (local)

Ya dejé las variables listas en `.env.local`, solo falta el valor:

```
RESEND_API_KEY=re_tu_key_aca
RESEND_FROM_EMAIL=Flahoolick <onboarding@resend.dev>   # o tu dominio verificado
RESEND_TO_EMAIL=delafus@gmail.com                       # a dónde llegan los mensajes
```

`RESEND_FROM_EMAIL` y `RESEND_TO_EMAIL` son opcionales — si los dejas vacíos, el código usa
`onboarding@resend.dev` y `delafus@gmail.com` por defecto. Reiniciá `npm run dev` después de editar.

## 4. Agregar la misma variable en Vercel (para producción)

`.env.local` solo funciona en tu compu. En Vercel:

1. Abrí el proyecto → **Settings** → **Environment Variables**.
2. Agregá `RESEND_API_KEY` (y `RESEND_FROM_EMAIL`/`RESEND_TO_EMAIL` si los usas) en los 3 entornos.
3. Hacé un nuevo deploy para que tome la variable.

## 5. Probar

Completa el formulario en `http://localhost:3000/#contacto` (local) o en el sitio
desplegado, y confirma que te llega el email. Si falla, el error queda logueado en la
consola del servidor (`console.error('Error enviando email de contacto:', ...)`).
