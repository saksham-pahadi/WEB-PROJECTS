// /lib/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendMail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: '"Notes App" <no-reply@notesapp.com>',
      to,
      subject,
      text,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email send error:", err);
    throw err;
  }
}
