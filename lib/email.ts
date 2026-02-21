/**
 * Email utility using Resend
 * Handles verification emails and password reset emails.
 */
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('[Email] RESEND_API_KEY is not set. Cannot send emails.')
    }
    _resend = new Resend(apiKey)
  }
  return _resend
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@exaeuler.com'
const SITE_URL = process.env.NEXTAUTH_URL || 'http://localhost:6006'

export async function sendVerificationEmail(email: string, token: string, name?: string) {
  const verifyUrl = `${SITE_URL}/verify-email?token=${token}`

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Verify your email — EXA Platform',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #111; margin: 0;">EXA</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Enterprise Platform</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #111; margin-bottom: 16px;">Welcome${name ? `, ${name}` : ''}!</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          Thank you for signing up. Please verify your email address to access the documentation.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verifyUrl}" style="display: inline-block; background: #ea580c; color: white; padding: 12px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none;">
            Verify Email
          </a>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          This link expires in 24 hours. If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${SITE_URL}/reset-password?token=${token}`

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Reset your password — EXA Platform',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #111; margin: 0;">EXA</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Enterprise Platform</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #111; margin-bottom: 16px;">Password reset</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset your password. Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #ea580c; color: white; padding: 12px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none;">
            Reset Password
          </a>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          This link expires in 2 hours. If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
  })
}
