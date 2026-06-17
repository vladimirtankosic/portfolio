function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

interface Cta {
  label: string;
  href: string;
}

export interface BaseTemplateOptions {
  title: string;
  /** Raw HTML — caller must escape any user-supplied data before inserting */
  content: string;
  footer: string;
  cta?: Cta;
}

export function baseTemplate(opts: BaseTemplateOptions): string {
  const { title, content, footer, cta } = opts;

  const ctaHtml = cta
    ? `<tr>
        <td align="center" style="padding:0 40px 32px;">
          <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${escapeHtml(cta.href)}" style="height:44px;v-text-anchor:middle;width:180px;" arcsize="18%" fillcolor="#6366f1" strokecolor="#6366f1"><center><![endif]-->
          <a href="${escapeHtml(cta.href)}"
             style="display:inline-block;background-color:#6366f1;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;mso-padding-alt:0;text-align:center;">
            <!--[if mso]><span style="font-size:14px;font-weight:600;color:#ffffff;">${escapeHtml(cta.label)}</span><![endif]-->
            <span style="mso-hide:all;">${escapeHtml(cta.label)}</span>
          </a>
          <!--[if mso]></center></v:roundrect><![endif]-->
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f5f9;min-width:100%;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;">
          <!--[if mso]>
          <tr><td style="background-color:#0f172a;padding:32px 40px;">
          <![endif]-->
          <!--[if !mso]><!-->
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;border-radius:12px 12px 0 0;">
          <!--<![endif]-->
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;line-height:1.3;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;color:#0f172a;font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>
          ${ctaHtml}
          <tr>
            <td style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;line-height:1.6;">${escapeHtml(footer)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Contact notification — sent to portfolio owner
// ---------------------------------------------------------------------------

export interface ContactNotificationData {
  name: string;
  email: string;
  message: string;
}

export function contactNotificationTemplate(data: ContactNotificationData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br>');

  const content = `
    <p style="margin:0 0 20px;color:#0f172a;"><strong>Name:</strong> ${safeName}</p>
    <p style="margin:0 0 20px;color:#0f172a;"><strong>Email:</strong>
      <a href="mailto:${safeEmail}" style="color:#6366f1;text-decoration:none;">${safeEmail}</a>
    </p>
    <p style="margin:0 0 8px;font-weight:600;color:#0f172a;">Message:</p>
    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;color:#334155;font-size:14px;line-height:1.8;">
      ${safeMessage}
    </div>
  `;

  return baseTemplate({
    title: `New message from ${data.name}`,
    content,
    footer: 'Sent from your portfolio website contact form.',
    cta: {
      label: `Reply to ${data.name}`,
      href: `mailto:${data.email}`,
    },
  });
}

// ---------------------------------------------------------------------------
// Auto-reply — sent to the person who filled the contact form
// ---------------------------------------------------------------------------

export interface AutoReplyData {
  name: string;
}

export function autoReplyTemplate(data: AutoReplyData): string {
  const safeName = escapeHtml(data.name);

  const content = `
    <p style="margin:0 0 16px;color:#0f172a;">Hi ${safeName},</p>
    <p style="margin:0 0 16px;color:#334155;">
      Thanks for reaching out! I've received your message and will get back to you
      as soon as possible.
    </p>
    <p style="margin:0;color:#0f172a;">
      Cheers,<br>
      <strong>Vladimir Tankosic</strong>
    </p>
  `;

  return baseTemplate({
    title: 'Got your message!',
    content,
    footer: "You're receiving this because you submitted the contact form on vladimirtankosic.com.",
  });
}

// ---------------------------------------------------------------------------
// Generic — reusable for future one-off emails
// ---------------------------------------------------------------------------

export interface GenericEmailData {
  title: string;
  /** Raw HTML body — escape user data before passing */
  body: string;
  cta?: Cta;
  footer?: string;
}

export function genericTemplate(data: GenericEmailData): string {
  return baseTemplate({
    title: data.title,
    content: data.body,
    footer: data.footer ?? 'Sent from vladimirtankosic.com',
    cta: data.cta,
  });
}
