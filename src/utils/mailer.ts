import nodemailer from "nodemailer";
// import { google } from "googleapis";

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

export async function sendEmail({ to, subject, template, text}: {
  to: string;
  subject: string;
  template?: string;
  text?: string;
}) {
  try {
    // const { token } = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // type: "OAuth2",
        // user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        // accessToken: token!,
      },
    });

    const mailOptions = {
      from: `"Ecommerce"<${process.env.GMAIL_USER}>`,
      to,
      subject,
      template,
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
