import ENV from "../configs/Env.js";

class EmailService {
  async send({ to, subject, text, html }) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": ENV.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "Learning Platform",
            email: ENV.SENDER_EMAIL,
          },
          to: [{ email: to }],
          subject: subject,
          textContent: text,
          htmlContent: html || `<p>${text}</p>`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(JSON.stringify(data));
      }

      console.log("✅ Email sent:", data.messageId);
      return data;
    } catch (err) {
      console.error("❌ Email error:", err.message);
      throw err;
    }
  }

  async sendResetCode(to, code) {
    return this.send({
      to,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
      html: `
        <div style="font-family: Arial;">
          <h2>Password Reset</h2>
          <p>Your code:</p>
          <h1 style="color:green;">${code}</h1>
          <p>Expires in 5 minutes</p>
        </div>
      `,
    });
  }
}

export default new EmailService();
