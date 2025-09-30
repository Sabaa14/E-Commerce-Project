import nodemailer from "nodemailer";
// import { google } from "googleapis";

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

export async function sendEmail({ to, subject, template, text }: {
  to: string;
  subject: string;
  template?: string;
  text?: string;
}) {
  try {
    // Validate credentials
    if (!process.env.APP_EMAIL_ADDRESS || !process.env.APP_EMAIL_PASSWORD) {
      throw new Error("Email credentials are missing. Please check APP_EMAIL_ADDRESS and APP_EMAIL_PASSWORD environment variables.");
    }

    console.log("Using email:", process.env.APP_EMAIL_ADDRESS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: `"Ecommerce"<${process.env.APP_EMAIL_ADDRESS}>`,
      to,
      subject,
      html: template, // Changed from 'template' to 'html'
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("The email has been sent successfully");
    console.log("The result from the mail: ", result);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error("Email could not be sent");
  }
}


/**
 * const nodemailer = require('nodemailer');

module.exports.sendEmail = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Taskaty" <${process.env.APP_EMAIL_ADDRESS}>`,
            to: userEmail,
            subject: subject,
            html: htmlTemplate
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("Internal Server Error: nodemailer\n", error.message)
    }
}
 */