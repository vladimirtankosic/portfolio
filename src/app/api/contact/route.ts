import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.MY_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or MY_EMAIL env variable');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid request data.' }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [toEmail],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; margin-bottom: 24px;">New message from your portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 100px;">From</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #0f172a; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send email. Please try again later.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
