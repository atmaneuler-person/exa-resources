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

const FROM_EMAIL = process.env.FROM_EMAIL || 'EXA <noreply@exaeuler.com>'
const NEWSLETTER_FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || 'EXA Enterprise Platform <newsletter@exaeuler.com>'
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

/**
 * Send newsletter email to a subscriber when a new post is published.
 * [NEWSLETTER] Called by /api/admin/newsletter for batch delivery.
 */
export async function sendNewsletterEmail(
  to: string,
  subject: string,
  postTitle: string,
  postUrl: string,
  postSummary?: string,
  recipientName?: string
) {
  const fullUrl = postUrl.startsWith('http') ? postUrl : `${SITE_URL}${postUrl}`

  await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #111; margin: 0;">EXA</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Enterprise Platform</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #111; margin-bottom: 16px;">
          New Post${recipientName ? `, ${recipientName}` : ''}!
        </h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 8px;">
          A new article has been published:
        </p>
        <h3 style="font-size: 18px; font-weight: 700; color: #ea580c; margin-bottom: 12px;">
          ${postTitle}
        </h3>
        ${postSummary ? `<p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">${postSummary}</p>` : ''}
        <div style="text-align: center; margin: 32px 0;">
          <a href="${fullUrl}" style="display: inline-block; background: #ea580c; color: white; padding: 12px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none;">
            Read Now
          </a>
        </div>
        <p style="color: #999; font-size: 11px; margin-top: 32px; text-align: center;">
          You are receiving this because you subscribed to our newsletter.<br/>
          To unsubscribe, update your preferences in your account settings.
        </p>
      </div>
    `,
  })
}

/**
 * Send newsletter digest email with multiple posts.
 * [NEWSLETTER] Used by /api/admin/newsletter for multi-post delivery.
 * [NEW] Added for digest format — existing sendNewsletterEmail untouched.
 */
export async function sendNewsletterDigest(
  to: string,
  subject: string,
  posts: { title: string; url: string; summary: string; date?: string }[],
  introMessage?: string,
  recipientName?: string
) {
  const postsHtml = posts
    .map((post) => {
      const fullUrl = post.url.startsWith('http')
        ? post.url
        : `${SITE_URL}${post.url}`
      return `
        <div style="margin-bottom: 28px; padding: 20px; background: #fafafa; border-radius: 12px; border-left: 4px solid #ea580c;">
          <h3 style="font-size: 16px; font-weight: 700; color: #ea580c; margin: 0 0 8px 0;">
            ${post.title}
          </h3>
          ${post.summary ? `<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 12px 0;">${post.summary}</p>` : ''}
          <a href="${fullUrl}" style="display: inline-block; background: #ea580c; color: white; padding: 8px 20px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none;">
            Read →
          </a>
        </div>
      `
    })
    .join('')

  // Token-based unsubscribe URL (base64 encoded email)
  const unsubscribeToken = Buffer.from(to).toString('base64')
  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?token=${unsubscribeToken}`

  await getResend().emails.send({
    from: NEWSLETTER_FROM_EMAIL,
    to,
    subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #111; margin: 0;">EXA</h1>
          <p style="color: #666; font-size: 13px; margin-top: 4px;">Enterprise Platform Newsletter</p>
        </div>
        ${recipientName ? `<p style="color: #333; font-size: 15px; font-weight: 600; margin-bottom: 16px;">Hello, ${recipientName}!</p>` : ''}
        ${introMessage ? `<p style="color: #555; font-size: 14px; line-height: 1.7; margin-bottom: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; border-left: 3px solid #3b82f6;">${introMessage}</p>` : ''}
        <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          ${posts.length === 1 ? 'A new article has been published:' : `${posts.length} new articles have been published:`}
        </p>
        ${postsHtml}
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 11px; text-align: center; line-height: 1.6;">
          이 뉴스레터는 EXA가 발행하는 기술 블로그 소식입니다.<br/>
          This newsletter is published by EXA Enterprise Platform.<br/><br/>
          You are receiving this because you subscribed to our newsletter.<br/>
          <a href="${unsubscribeUrl}" style="color: #ea580c; text-decoration: underline;">Unsubscribe</a> · <a href="${SITE_URL}" style="color: #999; text-decoration: none;">Visit EXA</a>
        </p>
      </div>
    `,
  })
}
