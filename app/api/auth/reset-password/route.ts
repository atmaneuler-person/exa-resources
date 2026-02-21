/**
 * POST /api/auth/reset-password
 * Reset password with token.
 */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json()

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 })
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { resetToken: token } })

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset link.' }, { status: 400 })
        }

        // Check expiration (2 hours)
        if (user.resetSentAt && new Date().getTime() - user.resetSentAt.getTime() > 2 * 60 * 60 * 1000) {
            return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 })
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(password, 12)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetSentAt: null,
            },
        })

        return NextResponse.json({ success: true, message: 'Password has been reset successfully.' })
    } catch (err) {
        console.error('[ResetPassword] Error:', err)
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
    }
}
