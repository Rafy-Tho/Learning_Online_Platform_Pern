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

  async sendPaymentConfirmation(to, { planName, amount, startDate, endDate }) {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);

    const formattedStart = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedEnd = new Date(endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return this.send({
      to,
      subject: `Payment Confirmation - ${planName}`,
      text: `Your payment of ${formattedAmount} for ${planName} has been confirmed. Valid from ${formattedStart} to ${formattedEnd}.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Payment Confirmed</h2>
          <p>Thank you for your purchase! Your payment has been successfully processed.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Plan</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${planName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Amount</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Start Date</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedStart}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">End Date</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedEnd}</td>
            </tr>
          </table>
          <p style="color: #666; font-size: 12px;">If you have any questions, please contact our support team.</p>
        </div>
      `,
    });
  }

  async sendWelcome(to, name) {
    return this.send({
      to,
      subject: "Welcome to Learning Platform",
      text: `Hi ${name}, welcome to Learning Platform! We're glad to have you.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Learning Platform!</h2>
          <p>Hi ${name},</p>
          <p>We're excited to have you on board. Here's what you can do:</p>
          <ul>
            <li>Browse and enroll in courses</li>
            <li>Track your learning progress</li>
            <li>Earn certificates upon completion</li>
          </ul>
          <p>Start exploring our courses and begin your learning journey today!</p>
          <p style="color: #666; font-size: 12px;">If you have any questions, feel free to reach out to our support team.</p>
        </div>
      `,
    });
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
          <p>Expires in 10 minutes</p>
        </div>
      `,
    });
  }
}

export default new EmailService();
