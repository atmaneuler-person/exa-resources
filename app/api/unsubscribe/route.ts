/**
 * ===================================================================
 * Unsubscribe API — Newsletter opt-out via token
 * ===================================================================
 *
 * GET /api/unsubscribe?token={base64email} — Unsubscribe from newsletter
 *
 * [AUTH] Token-based (base64 encoded email, no login required)
 * [DB]   Sets user.unsubscribed = true (separate from admin newsletter toggle)
 * [LOGIC] newsletter toggle = admin selective sending
 *         unsubscribed = user clicked unsubscribe in email
 * ===================================================================
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    try {
        // Decode base64 token to get email
        const email = Buffer.from(token, 'base64').toString('utf-8')

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (user.unsubscribed) {
            return NextResponse.redirect(new URL('/unsubscribe?status=already', req.url))
        }

        // Set unsubscribed = true (do NOT change newsletter toggle)
        await prisma.user.update({
            where: { email },
            data: { unsubscribed: true },
        })

        return NextResponse.redirect(new URL('/unsubscribe?status=success', req.url))
    } catch (error) {
        console.error('[Unsubscribe] Error:', error)
        return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url))
    }
}
