/**
 * ===================================================================
 * Admin Newsletter API — Batch email sending to subscribers
 * ===================================================================
 *
 * POST /api/admin/newsletter — Send newsletter to all active subscribers
 *
 * [AUTH] Super Admin only: session.user.email === ADMIN_EMAIL
 * [EMAIL] Uses Resend (same provider as verification/reset emails)
 * [BATCH] Processes 50 recipients per batch to avoid rate limits
 * [MULTI] Supports multiple posts via sendNewsletterDigest
 * ===================================================================
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sendNewsletterEmail, sendNewsletterDigest } from '@/lib/email';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { subject, posts, introMessage, postTitle, postUrl, postSummary } = await req.json();

        if (!subject) {
            return NextResponse.json(
                { error: 'Subject is required.' },
                { status: 400 }
            );
        }

        // Get all active newsletter subscribers
        const subscribers = await prisma.user.findMany({
            where: {
                newsletter: true,
                isActive: true,
                emailVerified: true,
            },
            select: {
                email: true,
                name: true,
            },
        });

        if (subscribers.length === 0) {
            return NextResponse.json({
                success: true,
                sent: 0,
                failed: 0,
                message: 'No active newsletter subscribers found.',
            });
        }

        // Determine if multi-post (digest) or single-post mode
        const isDigest = posts && Array.isArray(posts) && posts.length > 0;

        if (!isDigest && (!postTitle || !postUrl)) {
            return NextResponse.json(
                { error: 'Either posts array or postTitle+postUrl is required.' },
                { status: 400 }
            );
        }

        // Send in batches of 50
        const BATCH_SIZE = 50;
        let sent = 0;
        let failed = 0;

        for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
            const batch = subscribers.slice(i, i + BATCH_SIZE);

            const results = await Promise.allSettled(
                batch.map((sub) => {
                    if (isDigest) {
                        // Multi-post digest email
                        return sendNewsletterDigest(
                            sub.email,
                            subject,
                            posts,
                            introMessage,
                            sub.name || undefined
                        );
                    } else {
                        // Single-post backward compat
                        return sendNewsletterEmail(
                            sub.email,
                            subject,
                            postTitle,
                            postUrl,
                            postSummary,
                            sub.name || undefined
                        );
                    }
                })
            );

            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    sent++;
                } else {
                    failed++;
                    console.error('[Newsletter] Send failed:', result.reason);
                }
            });

            // Small delay between batches to respect rate limits
            if (i + BATCH_SIZE < subscribers.length) {
                await new Promise((r) => setTimeout(r, 1000));
            }
        }

        return NextResponse.json({
            success: true,
            sent,
            failed,
            total: subscribers.length,
            message: `Newsletter sent: ${sent} succeeded, ${failed} failed out of ${subscribers.length}.`,
        });
    } catch (error) {
        console.error('[Admin Newsletter] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
