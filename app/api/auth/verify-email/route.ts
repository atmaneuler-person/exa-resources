/**
 * GET /api/auth/verify-email?token=xxx
 * Verify user's email address.
 */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
        return NextResponse.json({ error: 'Missing token.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { verifyToken: token } })

    if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 })
    }

    // Check expiration (24 hours)
    if (user.verifySentAt && new Date().getTime() - user.verifySentAt.getTime() > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ error: 'Token has expired. Please register again.' }, { status: 400 })
    }

    // Verify email
    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, verifyToken: null, verifySentAt: null },
    })

    return NextResponse.json({ success: true, message: 'Email verified successfully.' })
}
