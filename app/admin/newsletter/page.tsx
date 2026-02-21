'use client'

/**
 * ===================================================================
 * Admin Newsletter Page — Select blog posts & send newsletter
 * ===================================================================
 *
 * UX Flow: Multi-check posts → Write subject → Confirm → Send
 *
 * [AUTH] Super Admin only (same pattern as admin/stats, admin/users)
 * [DATA] Fetches from /api/admin/newsletter/posts (draft-filtered, Docs-excluded)
 * [API]  Posts to /api/admin/newsletter for batch delivery
 * [NEW]  This is a NEW file — no existing code modified
 * ===================================================================
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import {
    ArrowLeft,
    Search,
    Send,
    CheckSquare,
    Square,
    Mail,
    FileText,
    Loader2,
    Users,
    X,
    AlertTriangle,
    CheckCircle,
    Home,
} from 'lucide-react'

// ── Types ──
interface BlogPost {
    title: string
    summary: string
    date: string
    tags: string[]
    path: string
    slug: string
    locale: string
    images: string[]
}

// ── Locale badge helper ──
const LOCALE_COLORS: Record<string, string> = {
    ko: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    en: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    jp: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    cn: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    vn: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

function LocaleBadge({ locale }: { locale: string }) {
    return (
        <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${LOCALE_COLORS[locale] || 'bg-gray-100 text-gray-600'
                }`}
        >
            {locale}
        </span>
    )
}

// ── Loading spinner ──
function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
            <Loader2 className="animate-spin text-orange-600" size={32} />
        </div>
    )
}

// ── Main component ──
export default function AdminNewsletterPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const isAdmin = (session?.user as any)?.isAdmin

    const [isClient, setIsClient] = useState(false)
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set())
    const [subject, setSubject] = useState('')
    const [introMessage, setIntroMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [subscriberCount, setSubscriberCount] = useState(0)
    const [showConfirm, setShowConfirm] = useState(false)

    // Client mount
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Auth redirect
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    // Fetch posts from admin API (draft-filtered)
    useEffect(() => {
        if (isAdmin) {
            setPostsLoading(true)
            fetch('/api/admin/newsletter/posts')
                .then((r) => r.json())
                .then((data) => setPosts(data.posts || []))
                .catch(() => setPosts([]))
                .finally(() => setPostsLoading(false))
        }
    }, [isAdmin])

    // Fetch subscriber count
    useEffect(() => {
        if (isAdmin) {
            fetch('/api/admin/users?limit=1')
                .then((r) => r.json())
                .then((data) => setSubscriberCount(data.stats?.newsletterSubs || 0))
                .catch(() => { })
        }
    }, [isAdmin])

    // Filter posts by search (no language filter — all posts shown)
    const filteredPosts = useMemo(() => {
        return posts.filter((p) =>
            !search
                ? true
                : p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.summary.toLowerCase().includes(search.toLowerCase())
        )
    }, [posts, search])

    // Selection helpers
    const toggleSelect = useCallback((path: string) => {
        setSelectedPaths((prev) => {
            const next = new Set(prev)
            if (next.has(path)) next.delete(path)
            else next.add(path)
            return next
        })
    }, [])

    const toggleAll = useCallback(() => {
        if (selectedPaths.size === filteredPosts.length) {
            setSelectedPaths(new Set())
        } else {
            setSelectedPaths(new Set(filteredPosts.map((p) => p.path)))
        }
    }, [selectedPaths, filteredPosts])

    const selectedPosts = useMemo(
        () => posts.filter((p) => selectedPaths.has(p.path)),
        [posts, selectedPaths]
    )

    // Send handler
    const handleSend = async () => {
        if (selectedPosts.length === 0 || !subject.trim()) return

        setShowConfirm(false)
        setSending(true)
        setResult(null)

        try {
            const res = await fetch('/api/admin/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: subject.trim(),
                    introMessage: introMessage.trim() || undefined,
                    posts: selectedPosts.map((p) => ({
                        title: p.title,
                        url: `/${p.path}`,
                        summary: p.summary || '',
                        date: p.date,
                    })),
                }),
            })
            const data = await res.json()
            setResult(data)
        } catch {
            setResult({ error: 'Network error' })
        } finally {
            setSending(false)
        }
    }

    // Guards
    if (status === 'loading' || !isClient) return <LoadingSpinner />
    if (!session || !isAdmin) return null

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/admin/users')}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Send Newsletter
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Select posts and send to subscribers
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <Users size={14} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                                {subscriberCount} subscribers
                            </span>
                        </div>
                        <button
                            onClick={() => router.push('/admin/users')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                            <Users size={14} />
                            Users
                        </button>
                    </div>
                </div>

                {/* Email Form */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail size={18} className="text-orange-600" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Email</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. 🚀 New articles from EXA"
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Intro Message (optional)
                            </label>
                            <textarea
                                value={introMessage}
                                onChange={(e) => setIntroMessage(e.target.value)}
                                placeholder="Add a personal message to your subscribers..."
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Search bar */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 relative">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                </div>

                {/* Select all bar */}
                <div className="flex items-center justify-between mb-2 px-2">
                    <button
                        onClick={toggleAll}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-orange-600 transition-colors"
                    >
                        {selectedPaths.size === filteredPosts.length && filteredPosts.length > 0 ? (
                            <CheckSquare size={14} className="text-orange-600" />
                        ) : (
                            <Square size={14} />
                        )}
                        Select All ({filteredPosts.length} posts)
                    </button>
                    {selectedPaths.size > 0 && (
                        <span className="text-xs font-bold text-orange-600">
                            {selectedPaths.size} selected
                        </span>
                    )}
                </div>

                {/* Post list */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
                    {postsLoading ? (
                        <div className="p-12 flex items-center justify-center">
                            <Loader2 size={24} className="animate-spin text-orange-600" />
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                            <FileText size={32} className="mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No posts found.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredPosts.map((post) => {
                                const isSelected = selectedPaths.has(post.path)
                                return (
                                    <div
                                        key={post.path}
                                        onClick={() => toggleSelect(post.path)}
                                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${isSelected
                                                ? 'bg-orange-50 dark:bg-orange-900/10'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                            }`}
                                    >
                                        <div className="mt-0.5 flex-shrink-0">
                                            {isSelected ? (
                                                <CheckSquare size={18} className="text-orange-600" />
                                            ) : (
                                                <Square size={18} className="text-gray-300 dark:text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className={`text-sm font-semibold truncate ${isSelected
                                                        ? 'text-orange-700 dark:text-orange-400'
                                                        : 'text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                {post.title}
                                            </h3>
                                            {post.summary && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                                    {post.summary}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(post.date).toLocaleDateString()}
                                                </span>
                                                <LocaleBadge locale={post.locale} />
                                                {post.tags?.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Send button */}
                <div className="sticky bottom-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between shadow-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedPaths.size > 0 ? (
                                <>
                                    <span className="font-bold text-orange-600">{selectedPaths.size}</span> post
                                    {selectedPaths.size > 1 ? 's' : ''} selected →{' '}
                                    <span className="font-bold text-blue-600">{subscriberCount}</span> subscribers
                                </>
                            ) : (
                                'Select posts to send'
                            )}
                        </div>
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={sending || selectedPaths.size === 0 || !subject.trim()}
                            className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg transition-colors"
                        >
                            {sending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    Send Newsletter
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Dialog */}
                {showConfirm && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowConfirm(false)}
                    >
                        <div
                            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                    <AlertTriangle size={20} className="text-orange-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Confirm Send
                                </h3>
                            </div>

                            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    <strong>Subject:</strong> {subject}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    <strong>Recipients:</strong>{' '}
                                    <span className="text-blue-600 font-bold">{subscriberCount}</span> subscribers
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-1">
                                    <strong>Posts ({selectedPosts.length}):</strong>
                                </p>
                                <ul className="pl-4 space-y-1">
                                    {selectedPosts.map((p) => (
                                        <li key={p.path} className="text-xs text-orange-600 font-medium">
                                            • {p.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSend}
                                    className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send size={14} />
                                    Send Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result */}
                {result && (
                    <div
                        className={`mt-4 p-5 rounded-xl border ${result.error
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                {result.error ? (
                                    <X size={20} className="text-red-600 mt-0.5" />
                                ) : (
                                    <CheckCircle size={20} className="text-green-600 mt-0.5" />
                                )}
                                <div>
                                    {result.error ? (
                                        <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                                            {result.error}
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                                                {result.message}
                                            </p>
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                Sent: {result.sent} | Failed: {result.failed} | Total: {result.total}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setResult(null)}
                                className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Back to main buttons */}
                        {!result.error && (
                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-green-200 dark:border-green-800">
                                <button
                                    onClick={() => router.push('/admin/users')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors"
                                >
                                    <Users size={14} />
                                    User Management
                                </button>
                                <button
                                    onClick={() => router.push('/admin/stats')}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                                >
                                    <Home size={14} />
                                    Admin Home
                                </button>
                                <button
                                    onClick={() => {
                                        setResult(null)
                                        setSelectedPaths(new Set())
                                        setSubject('')
                                        setIntroMessage('')
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors"
                                >
                                    <Send size={14} />
                                    Send Another
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}
