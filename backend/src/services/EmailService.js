// services/EmailService.js
import { Resend } from "resend";
import ENV from "../configs/Env.js";

const resend = new Resend(ENV.RESEND_API_KEY);

class EmailService {
  async send(to, subject, text) {
    try {
      await resend.emails.send({
        from: `Learning Platform <${ENV.DOMAIN_NAME}>`,
        to,
        subject,
        text,
      });
      console.log("✅ Email sent");
    } catch (err) {
      console.error("❌ Email error:", err);
      throw err;
    }
  }

  async sendResetCode(to, code) {
    await this.send(
      to,
      "Password Reset Code",
      `Your password reset code is: ${code}`,
    );
  }
}

const emailService = new EmailService();
export default emailService;
