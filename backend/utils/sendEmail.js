import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",

      port: 587,

      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    console.log("SMTP connected");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(
      mailOptions
    );

    console.log(
      "Email sent:",
      info.response
    );

  } catch (error) {
    console.error(
      "Email error:",
      error
    );

    throw error;
  }
};