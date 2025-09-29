const resetPass = (username, resetLink) => {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Reset your password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
      img{ -ms-interpolation-mode:bicubic; }
      img{ border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
      a{ text-decoration:none; color:inherit; }
      body{ margin:0; padding:0; width:100% !important; -webkit-font-smoothing:antialiased; }
      @media screen and (max-width:600px){
        .container { width:100% !important; padding:16px !important; }
        .button{ width:100% !important; }
      }
    </style>
  </head>
  <body style="background-color:#f9fafb; margin:0; padding:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; font-size:1px; line-height:1px; color:#fff; opacity:0;">
      Reset your password and regain access to your account.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <tr>
              <td style="padding:28px 32px 0;">
                <h1 style="margin:0; font-size:20px; font-weight:600; color:#111827;">Password Reset Request</h1>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:20px 32px; color:#374151; font-size:15px; line-height:1.6;">
                <p style="margin:0 0 12px;">Hi <strong>${username}</strong>,</p>

                <p style="margin:0 0 18px;">
                  We received a request to reset your password. You can create a new password by clicking the button below.
                </p>

                <!-- CTA button -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0;">
                  <tr>
                    <td align="center">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td bgcolor="#2563eb" style="border-radius:8px;">
                            <a href="${resetLink}" target="_blank"
                               style="display:inline-block; padding:12px 22px; font-size:16px; color:#ffffff; font-weight:600; text-decoration:none; border-radius:8px;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 12px;">If the button doesn’t work, copy and paste this link into your browser:</p>
                <p style="word-break:break-all; margin:0 0 18px; font-size:13px;">
                  <a href="${resetLink}" target="_blank" style="color:#2563eb;">${resetLink}</a>
                </p>

                <p style="margin:0 0 6px; font-size:13px; color:#6b7280;">
                  This link will expire in 30 minutes for your security.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px; border-top:1px solid #f3f4f6; font-size:13px; color:#6b7280;">
                <p style="margin:0 0 8px;">If you didn’t request a password reset, you can safely ignore this email.</p>
                <p style="margin:0;">Thanks,<br>The Support Team</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export default resetPass;
