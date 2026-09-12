import nodemailer from "nodemailer";

// Zoho Mail expone SMTP para enviar correo desde una cuenta propia
// (@ureflect.net en este caso). Requiere una "contraseña de aplicación"
// generada en https://accounts.zoho.com/home#security/app_passwords —
// nunca la contraseña normal de la cuenta.
//
// ZOHO_SMTP_HOST es configurable porque Zoho separa sus centros de datos
// por región (smtp.zoho.com para EE. UU./global, smtp.zoho.eu para
// Europa, smtp.zoho.in para India, etc.) — el correcto depende de en
// qué región se creó la cuenta.
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

type ContactNotificationInput = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

export async function sendContactNotification(data: ContactNotificationInput) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ZOHO_EMAIL;

  await transporter.sendMail({
    from: `"Ureflect — Sitio web" <${process.env.ZOHO_EMAIL}>`,
    to,
    replyTo: data.email,
    subject: `Nuevo mensaje de contacto: ${data.name}`,
    text: [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      data.phone ? `Teléfono: ${data.phone}` : null,
      data.service ? `Servicio de interés: ${data.service}` : null,
      "",
      "Mensaje:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
