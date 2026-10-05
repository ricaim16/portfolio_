/* ==========================================================================
   Vercel Serverless Function: receives the portfolio contact form and emails
   it to the site owner through Gmail (SMTP). Credentials come from
   environment variables set in the Vercel dashboard, never from the code:

     GMAIL_USER          Gmail address that sends the mail
     GMAIL_APP_PASSWORD  16-character Google "App Password"
     CONTACT_TO          (optional) where to deliver; defaults to GMAIL_USER
   ========================================================================== */

const nodemailer = require("nodemailer");

const EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]+$/;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Vercel parses JSON bodies; fall back to parsing a raw string just in case
  let data = req.body;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      data = null;
    }
  }
  if (!data || typeof data !== "object") {
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }

  // Honeypot: real visitors never fill this in. Pretend success so bots move on.
  if (data._gotcha) return res.status(200).json({ ok: true });

  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: "Message must be between 10 and 5000 characters." });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    return res.status(500).json({ ok: false, error: "Server is not configured." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, "") }, // Google shows it with spaces
    });

    await transporter.sendMail({
      from: `"Portfolio contact form" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: email, // hitting Reply in Gmail answers the visitor
      subject: `New portfolio message from ${email}`,
      text: `From: ${email}\n\n${message}`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("sendMail failed:", err.message);
    return res.status(502).json({ ok: false, error: "Could not send the message." });
  }
};
