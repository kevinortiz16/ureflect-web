import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mailer";

// Esquema de validación del lado del servidor. Nunca confiamos en la
// validación del formulario en el navegador (el "use client") — cualquiera
// puede llamar a este endpoint directamente con curl/Postman sin pasar
// por el formulario, así que la validación real vive aquí.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  // Campo "honeypot": invisible para una persona real (oculto con CSS en
  // el formulario), pero los bots que rellenan formularios automáticamente
  // sí lo completan. Si llega con contenido, tratamos el envío como spam
  // sin decírselo al bot (respondemos como si todo hubiera salido bien).
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Honeypot activado: probablemente un bot. Respondemos éxito falso
    // para no revelar que fue detectado.
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
      },
    });
  } catch (error) {
    console.error("Error guardando mensaje de contacto:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }

  // El mensaje ya quedó guardado en la base de datos, que es lo esencial.
  // Si el correo de notificación falla (credenciales SMTP mal
  // configuradas, Zoho caído, etc.) igual respondemos éxito al usuario
  // y solo dejamos el error en el log del servidor para revisarlo después.
  try {
    await sendContactNotification({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      service: data.service || undefined,
      message: data.message,
    });
  } catch (error) {
    console.error("Error enviando notificación por correo:", error);
  }

  return NextResponse.json({ ok: true });
}
