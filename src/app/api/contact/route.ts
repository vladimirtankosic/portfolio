import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/mailer';
import { autoReplyTemplate, contactNotificationTemplate } from '@/lib/email/templates';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const toEmail = process.env.MY_EMAIL;

  if (!toEmail) {
    console.error('Missing MY_EMAIL env variable');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request data.' }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const notification = await sendEmail({
    from: 'Contact form <info@vladimirtankosic.com>',
    to: toEmail,
    subject: `New message from ${name}`,
    html: contactNotificationTemplate({ name, email, message }),
    replyTo: email,
  });

  if (!notification.success) {
    console.error('Failed to send notification email:', notification.error);
    return NextResponse.json(
      { message: 'Failed to send email. Please try again later.' },
      { status: 500 },
    );
  }

  const autoReply = await sendEmail({
    from: 'Vladimir Tankosic <info@vladimirtankosic.com>',
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: autoReplyTemplate({ name }),
  });

  if (!autoReply.success) {
    console.error('Failed to send auto-reply:', autoReply.error);
  }

  return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
}
