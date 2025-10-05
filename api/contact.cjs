// api/contact.cjs
const nodemailer = require("nodemailer");

async function readJsonBody(req) {
  if (req.body) return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

module.exports = async function handler(req, res) {
  // CORS (radi i bez ovoga kad je isti domen; ostavljeno za slučaj drugačijeg hosta)
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.CORS_ORIGIN || "*",
    );
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = await readJsonBody(req);
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Missing fields: name, email, message" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true za 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL, // npr. "Portfolio <noreply@tvoj-domen.com>"
      to: process.env.TO_EMAIL, // gdje želiš da stigne poruka
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    });

    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.CORS_ORIGIN || "*",
    );
    return res.status(200).json({ message: "message sent" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
};
