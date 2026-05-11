import { Resend } from 'resend';

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asOptionalTrimmedString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function isValidEmail(email: string): boolean {
  // pragmatic RFC-ish check; avoid overly strict validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { success: false, error: 'Missing RESEND_API_KEY' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = (await request.json()) as ContactBody;

    const name = asOptionalTrimmedString(body.name);
    const email = asOptionalTrimmedString(body.email)?.toLowerCase();
    const phone = asOptionalTrimmedString(body.phone);
    const company = asOptionalTrimmedString(body.company);
    const message = asOptionalTrimmedString(body.message);

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #0f172a;">
        <h2 style="margin: 0 0 16px; font-size: 18px;">Yeni iletişim formu mesajı</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
          <tbody>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; width: 160px; font-weight: 600;">Ad Soyad</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(
                name
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; width: 160px; font-weight: 600;">E-posta</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(
                email
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; width: 160px; font-weight: 600;">Telefon</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(
                phone ?? '-'
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; width: 160px; font-weight: 600;">Şirket</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(
                company ?? '-'
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; width: 160px; font-weight: 600; vertical-align: top;">Mesaj</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(
                message
              )}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `.trim();

    await resend.emails.send({
      from: 'SENTAS Website <website@sentasmuhendislik.com>',
      to: ['info@sentasmuhendislik.com'],
      replyTo: email,
      subject: 'Yeni iletişim formu mesajı - SENTAS',
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
