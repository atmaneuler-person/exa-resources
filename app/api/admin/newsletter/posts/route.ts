/**
 * ===================================================================
 * Admin Newsletter Posts API — Blog list with draft filtering
 * ===================================================================
 *
 * GET /api/admin/newsletter/posts — Returns blog posts metadata
 *
 * [NEW] Created to provide draft-filtered, Docs-excluded post list
 * [AUTH] Super Admin only
 * [DATA] Reads from contentlayer generated data (allBlogs)
 * ===================================================================
 */
import { NextResponse } from 'next/server'
import { allBlogs } from 'contentlayer/generated'
import { auth } from '@/lib/auth'

export async function GET() {
    const session = await auth()
    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const posts = allBlogs
        .filter((post) => post.draft !== true)
        .filter((post) => {
            const isDocs = post._raw.sourceFilePath
                .toLowerCase()
                .split('/')
                .includes('docs')
            return !isDocs
        })
        .map((post) => ({
            title: post.title,
            summary: post.summary || post.description || '',
            date: post.date,
            tags: post.tags || [],
            path: post.path,
            slug: post.slug,
            images: post.images || [],
            locale: (() => {
                const parts = post._raw.flattenedPath.split('/')
                const loc = parts.find((p: string) =>
                    ['ko', 'en', 'jp', 'cn', 'vn'].includes(p)
                )
                return loc || 'ko'
            })(),
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ posts })
}
