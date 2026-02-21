/**
 * ===================================================================
 * Admin Users API — CRUD for user management
 * ===================================================================
 * 
 * GET    /api/admin/users    — List users (paginated, searchable, filterable)
 * POST   /api/admin/users    — Manual user registration
 * PATCH  /api/admin/users    — Update user (description, newsletter, isActive)
 * DELETE /api/admin/users    — Soft-delete (isActive: false)
 *
 * [AUTH] Super Admin only: session.user.email === ADMIN_EMAIL
 * [PATTERN] Follows api/admin/comments/route.ts structure
 * ===================================================================
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// ── Admin guard ──
async function requireAdmin() {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
        return null;
    }
    return session;
}

// ── GET: List users ──
export async function GET(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const source = searchParams.get('source') || '';
    const newsletter = searchParams.get('newsletter');

    const skip = (page - 1) * limit;

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (search) {
        where.OR = [
            { email: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (source) {
        where.source = source;
    }
    if (newsletter !== null && newsletter !== undefined && newsletter !== '') {
        where.newsletter = newsletter === 'true';
    }

    try {
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    source: true,
                    description: true,
                    emailVerified: true,
                    isActive: true,
                    newsletter: true,
                    unsubscribed: true,
                    lastLoginAt: true,
                    createdAt: true,
                },
            }),
            prisma.user.count({ where }),
        ]);

        // Summary stats
        const [totalUsers, activeUsers, exawinUsers, newsletterSubs] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { isActive: true } }),
            prisma.user.count({ where: { source: 'exawin' } }),
            prisma.user.count({ where: { newsletter: true, isActive: true } }),
        ]);

        return NextResponse.json({
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            stats: {
                totalUsers,
                activeUsers,
                exawinUsers,
                newsletterSubs,
            },
        });
    } catch (error) {
        console.error('[Admin Users] GET error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// ── POST: Manual user registration ──
export async function POST(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { email, password, name, description, newsletter } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check existing
        const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (existing) {
            return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashedPassword,
                name: name || null,
                description: description || null,
                source: 'manual',
                emailVerified: true, // Admin-registered, auto-verified
                newsletter: newsletter !== false,
                isActive: true,
            },
            select: {
                id: true,
                email: true,
                name: true,
                source: true,
                description: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error('[Admin Users] POST error:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}

// ── PATCH: Update user (description, newsletter, isActive) ──
export async function PATCH(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, description, newsletter, isActive } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        // Only allow updating safe fields
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {};
        if (description !== undefined) updateData.description = description;
        if (newsletter !== undefined) updateData.newsletter = newsletter;
        if (isActive !== undefined) updateData.isActive = isActive;

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                description: true,
                newsletter: true,
                isActive: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('[Admin Users] PATCH error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// ── DELETE: Soft-delete (isActive: false) ──
export async function DELETE(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: { id: true, email: true, isActive: true },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('[Admin Users] DELETE error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
