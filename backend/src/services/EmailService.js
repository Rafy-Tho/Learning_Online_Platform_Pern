import nodemailer from "nodemailer";
import ENV from "../configs/Env.js";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      // host: ENV.MAIL_HOST,
      // port: ENV.MAIL_PORT,
      // secure: false,
      service: "gmail",
      auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASSWORD,
      },
    });
  }

  async send(from = ENV.EMAIL_SENDER, to, subject, text) {
    try {
      await this.transporter.sendMail({
        from: `"Learning Online Platform" <${from}>`,
        to,
        subject,
        text,
      });
      console.log("✅ Email sent");
    } catch (err) {
      console.error("❌ Email error:", err); // 👈 VERY IMPORTANT
      throw err;
    }
  }

  async sendResetCode(to, code) {
    await this.send(
      ENV.EMAIL_SENDER_CODE,
      to,
      "Password Reset Code",
      `Your password reset code is: ${code}`,
    );
  }
}

const emailService = new EmailService();
export default emailService;
