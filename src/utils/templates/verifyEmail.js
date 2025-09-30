const verifyEmail = (user, useremail, verificationLink) => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Verify your email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <!-- preheader text (hidden in inbox preview) -->
  <style>
    /* Basic mobile-friendly reset */
    body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img{ -ms-interpolation-mode:bicubic; }
    img{ border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    a{ text-decoration:none; color:inherit; }
    body{ margin:0; padding:0; width:100% !important; -webkit-font-smoothing:antialiased; }
    .mobile-center { text-align:center !important; }
    @media screen and (max-width:600px){
      .container { width:100% !important; padding:16px !important; }
      .stack{ display:block !important; width:100% !important; }
      .button{ width:100% !important; }
    }
  </style>
</head>
<body style="background-color:#f2f4f7; margin:0; padding:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Noto Sans',sans-serif;">
  <!-- Preheader: short summary shown in inbox preview -->
  <div style="display:none; max-height:0; max-width:0; overflow:hidden; font-size:1px; line-height:1px; color:#fff; opacity:0;">
    Confirm your email to activate your account.
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(20,20,30,0.06);">
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px 0; text-align:left;">
              <h1 style="margin:0; font-size:20px; font-weight:600; color:#0f1724;">Verify your email</h1>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding:20px 32px 8px; color:#475569; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 12px;">Hi <strong>${user}</strong>,</p>

              <p style="margin:0 0 18px;">
                Thanks for creating an account with us. Please confirm your email address ${useremail} by clicking the button below — this helps keep your account secure.
              </p>

              <!-- CTA button (bulletproof) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#2563eb" style="border-radius:8px;">
                          <a href="${verificationLink}"
                             target="_blank"
                             style="display:inline-block; padding:12px 22px; font-size:16px; color:#ffffff; text-decoration:none; font-weight:600; border-radius:8px;"
                             class="button">Verify your email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;">If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break:break-all; margin:0 0 18px; font-size:13px; color:#0f1724;">
                <a href="${verificationLink}" target="_blank" style="color:#2563eb;">${verificationLink}</a>
              </p>

              <p style="margin:0 0 6px; font-size:13px; color:#94a3b8;">
                This link will expire in 24 hours.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px 28px; border-top:1px solid #eef2f7; font-size:13px; color:#64748b;">
              <p style="margin:0 0 8px;">If you didn't create an account with us, you can safely ignore this email.</p>
              <p style="margin:0;">Thanks,<br>The Team</p>
            </td>
          </tr>
        </table>

        <!-- Small print / company -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px; margin-top:14px;">
          <tr>
            <td style="padding:10px 12px; text-align:center; font-size:12px; color:#9aa4b2;">
              Company Name • Street Addr • City, Country<br>
              <a href="#" style="color:#9aa4b2; text-decoration:underline;">Privacy policy</a>
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

// export default verifyEmail;
module.exports = {
  verifyEmail
}