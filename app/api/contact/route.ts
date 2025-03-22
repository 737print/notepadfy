import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Enviar email usando Resend
    await resend.emails.send({
      from: 'Notepadfy Contact <contact@notepadfy.com>',
      to: 'support@notepadfy.com',
      subject: `[Contact Form] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Enviar confirmação para o usuário
    await resend.emails.send({
      from: 'Notepadfy <noreply@notepadfy.com>',
      to: email,
      subject: 'We received your message - Notepadfy',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>For your reference, here's a copy of your message:</p>
        <hr>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
        <hr>
        <p>Best regards,</p>
        <p>The Notepadfy Team</p>
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 