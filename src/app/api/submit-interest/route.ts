export const runtime = 'edge'; // needed for Cloudflare Pages

type Payload = {
  name?: string;
  email?: string;
  role?: string;
  org?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(req: Request) {
  const data = (await req.json()) as Payload;

  // basic anti-spam: block if honeypot filled
  if (data.website) return new Response('ok', { status: 204 });

  const TO = process.env.COMPANY_EMAIL || 'hello@example.com';
  const FROM = process.env.MAIL_FROM || 'noreply@nexbtholdings.com';
  const SUBJECT = `New Interest: ${data.name ?? 'Anonymous'}`;

  const content = `
Name: ${data.name ?? '-'}
Email: ${data.email ?? '-'}
Role: ${data.role ?? '-'}
Organization: ${data.org ?? '-'}

Message:
${data.message ?? '-'}
  `.trim();

  // MailChannels API
  const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: TO }] }],
      from: { email: FROM, name: 'nexBT Website' },
      subject: SUBJECT,
      content: [{ type: 'text/plain', value: content }],
    }),
  });

  if (res.ok) return new Response('ok', { status: 200 });
  return new Response(await res.text(), { status: 500 });
}
