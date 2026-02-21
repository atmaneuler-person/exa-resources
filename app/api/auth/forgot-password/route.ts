/**
 * POST /api/auth/forgot-password
 * Send password reset email.
 */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })

        // Always return success to prevent email enumeration
        if (!user || !user.isActive) {
            return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken, resetSentAt: new Date() },
        })

        // Send email
        try {
            await sendPasswordResetEmail(normalizedEmail, resetToken)
        } catch (emailErr) {
            console.error('[ForgotPassword] Failed to send email:', emailErr)
        }

        return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' })
    } catch (err) {
        console.error('[ForgotPassword] Error:', err)
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
    }
}
