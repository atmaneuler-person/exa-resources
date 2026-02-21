/**
 * POST /api/auth/register
 * Register a new user with email verification.
 */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name, email, password, newsletter } = await req.json()

        // Validate
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
        }

        const normalizedEmail = email.toLowerCase().trim()

        // Check existing
        const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
        if (existing) {
            return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Generate verification token
        const verifyToken = crypto.randomBytes(32).toString('hex')

        // Create user
        const user = await prisma.user.create({
            data: {
                name: name || null,
                email: normalizedEmail,
                password: hashedPassword,
                emailVerified: false,
                verifyToken,
                verifySentAt: new Date(),
                newsletter: newsletter !== false,
                source: 'homepage',
            },
        })

        // Also add to Subscriber table if newsletter opted in
        if (newsletter !== false) {
            await prisma.subscriber.upsert({
                where: { email: normalizedEmail },
                update: { name: name || null, source: 'signup', isActive: true },
                create: { email: normalizedEmail, name: name || null, source: 'signup' },
            })
        }

        // Send verification email
        try {
            await sendVerificationEmail(normalizedEmail, verifyToken, name)
        } catch (emailErr) {
            console.error('[Register] Failed to send verification email:', emailErr)
            // Don't fail registration if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'Account created. Please check your email to verify your account.',
        })
    } catch (err) {
        console.error('[Register] Error:', err)
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
    }
}
