/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/**
 * ===================================================================
 * Admin Users Page — User management dashboard
 * ===================================================================
 * [AUTH] Super Admin only (useSession + isAdmin check)
 * [PATTERN] Follows admin/stats/page.tsx structure
 * [FEATURES] User list, search, filter, manual add, edit, newsletter send
 * ===================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import {
    Users, Mail, Shield, Search, Plus, ChevronLeft, ChevronRight,
    Send, X, Check, Edit3, UserPlus, BarChart3
} from 'lucide-react';
import clsx from 'clsx';

// ── Types ──
interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    source: string;
    description: string | null;
    emailVerified: boolean;
    isActive: boolean;
    newsletter: boolean;
    unsubscribed: boolean;
    lastLoginAt: string | null;
    createdAt: string;
}

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface Stats {
    totalUsers: number;
    activeUsers: number;
    exawinUsers: number;
    newsletterSubs: number;
}

// ── Stat Card ──
const StatCard = ({ title, value, icon: Icon, color = 'orange' }: any) => (
    <div className="bg-white dark:bg-gray-900 px-4 py-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-orange-200">
        <div className="flex justify-between items-center mb-3">
            <div className={clsx(
                'p-2 rounded-lg',
                color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' :
                    color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' :
                        color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                            'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            )}>
                <Icon size={18} />
            </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</h3>
        <p className="text-xl font-bold mt-1 tracking-tight text-gray-900 dark:text-white">{value}</p>
    </div>
);

// ── Source Badge ──
const SourceBadge = ({ source }: { source: string }) => {
    const styles: Record<string, string> = {
        homepage: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        exawin: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        manual: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return (
        <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase', styles[source] || styles.homepage)}>
            {source}
        </span>
    );
};

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isAdmin = (session?.user as any)?.isAdmin;

    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [stats, setStats] = useState<Stats>({ totalUsers: 0, activeUsers: 0, exawinUsers: 0, newsletterSubs: 0 });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Filters
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);

    // Inline editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    // Add user form
    const [addForm, setAddForm] = useState({ email: '', password: '', name: '', description: '', newsletter: true });
    const [addError, setAddError] = useState('');
    const [addLoading, setAddLoading] = useState(false);

    // Newsletter form
    const [nlForm, setNlForm] = useState({ subject: '', postTitle: '', postUrl: '', postSummary: '' });
    const [nlLoading, setNlLoading] = useState(false);
    const [nlResult, setNlResult] = useState<any>(null);

    // ── Fetch users ──
    const fetchUsers = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(page), limit: '20' });
            if (search) params.set('search', search);
            if (sourceFilter) params.set('source', sourceFilter);

            const res = await fetch(`/api/admin/users?${params}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
                setPagination(data.pagination);
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    }, [search, sourceFilter]);

    useEffect(() => {
        if (status === 'authenticated' && !isAdmin) router.push('/');
        else if (status === 'unauthenticated') router.push('/login');
        else if (isAdmin) fetchUsers(currentPage);
    }, [status, isAdmin, router, currentPage, fetchUsers]);

    // ── Search debounce ──
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            fetchUsers(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [search, sourceFilter, fetchUsers]);

    // ── Toggle newsletter ──
    const toggleNewsletter = async (user: User) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, newsletter: !user.newsletter }),
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, newsletter: !u.newsletter } : u));
            }
        } catch (err) {
            console.error('Toggle failed:', err);
        }
    };

    // ── Toggle active ──
    const toggleActive = async (user: User) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
            }
        } catch (err) {
            console.error('Toggle failed:', err);
        }
    };

    // ── Save description ──
    const saveDescription = async (userId: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, description: editValue }),
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, description: editValue } : u));
                setEditingId(null);
            }
        } catch (err) {
            console.error('Save failed:', err);
        }
    };

    // ── Add user ──
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddError('');
        setAddLoading(true);

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addForm),
            });
            const data = await res.json();
            if (!res.ok) {
                setAddError(data.error || 'Failed to add user.');
            } else {
                setShowAddModal(false);
                setAddForm({ email: '', password: '', name: '', description: '', newsletter: true });
                fetchUsers(currentPage);
            }
        } catch (err) {
            setAddError('Network error.');
        } finally {
            setAddLoading(false);
        }
    };

    // ── Send newsletter ──
    const handleSendNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        setNlLoading(true);
        setNlResult(null);

        try {
            const res = await fetch('/api/admin/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nlForm),
            });
            const data = await res.json();
            setNlResult(data);
        } catch (err) {
            setNlResult({ error: 'Network error.' });
        } finally {
            setNlLoading(false);
        }
    };

    // ── Loading / Auth guard ──
    if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" /></div>;
    if (!session || !isAdmin) return null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#020617]">
            <Header />

            <main className="flex-grow pt-20 pb-12 px-4 max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">User Management</h1>
                        <p className="text-xs text-gray-500 mt-0.5 font-medium">Manage registered users and newsletter</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/admin/stats')} className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors">
                            <BarChart3 size={14} /> Stats
                        </button>
                        <button onClick={() => router.push('/admin/newsletter')} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors">
                            <Send size={14} /> Send Newsletter
                        </button>
                        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors">
                            <UserPlus size={14} /> Add User
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="orange" />
                    <StatCard title="Active" value={stats.activeUsers} icon={Shield} color="green" />
                    <StatCard title="EXAWin" value={stats.exawinUsers} icon={Users} color="blue" />
                    <StatCard title="Newsletter" value={stats.newsletterSubs} icon={Mail} />
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by email or name..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 rounded-lg">
                        {['', 'homepage', 'exawin', 'manual'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSourceFilter(s)}
                                className={clsx(
                                    'px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all',
                                    sourceFilter === s
                                        ? 'bg-orange-600 text-white shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                                )}
                            >
                                {s || 'All'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-20 text-gray-400 text-sm">No users found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Source</th>
                                        <th className="px-4 py-3 text-center">Newsletter</th>
                                        <th className="px-4 py-3">Description</th>
                                        <th className="px-4 py-3">Registered</th>
                                        <th className="px-4 py-3">Last Login</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className={clsx(
                                            'border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors',
                                            !user.isActive && 'opacity-50',
                                            user.unsubscribed && 'bg-red-50 dark:bg-red-900/10'
                                        )}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900 dark:text-gray-100 text-xs">{user.email}</span>
                                                    {user.unsubscribed && (
                                                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded whitespace-nowrap">
                                                            🚫 수신거부
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                                                {user.name || '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <SourceBadge source={user.source} />
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => toggleNewsletter(user)}
                                                    className={clsx(
                                                        'w-8 h-5 rounded-full transition-colors relative',
                                                        user.newsletter ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                                                    )}
                                                >
                                                    <span className={clsx(
                                                        'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform',
                                                        user.newsletter ? 'left-3.5' : 'left-0.5'
                                                    )} />
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 max-w-[200px]">
                                                {editingId === user.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            className="flex-1 text-xs px-2 py-1 border border-orange-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveDescription(user.id);
                                                                if (e.key === 'Escape') setEditingId(null);
                                                            }}
                                                        />
                                                        <button onClick={() => saveDescription(user.id)} className="text-green-600 hover:text-green-800"><Check size={14} /></button>
                                                        <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="flex items-center gap-1 group cursor-pointer"
                                                        onClick={() => { setEditingId(user.id); setEditValue(user.description || ''); }}
                                                    >
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {user.description || '—'}
                                                        </span>
                                                        <Edit3 size={10} className="text-gray-300 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-[10px] text-gray-400 whitespace-nowrap">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-4 py-3 text-[10px] text-gray-400 whitespace-nowrap">
                                                {user.lastLoginAt
                                                    ? new Date(user.lastLoginAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                    : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => toggleActive(user)}
                                                    className={clsx(
                                                        'px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors',
                                                        user.isActive
                                                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100'
                                                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100'
                                                    )}
                                                >
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let pageNum;
                                if (pagination.totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= pagination.totalPages - 2) {
                                    pageNum = pagination.totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={clsx(
                                            'h-8 w-8 rounded-lg text-xs font-bold',
                                            currentPage === pageNum
                                                ? 'bg-orange-600 text-white'
                                                : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        )}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                        <span className="ml-2 text-[10px] text-gray-400 font-medium">
                            {pagination.total} users total
                        </span>
                    </div>
                )}
            </main>

            {/* ── Add User Modal ── */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Plus size={18} className="text-orange-600" /> Add User (Manual)
                            </h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Email *</label>
                                <input type="email" required value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Password *</label>
                                <input type="password" required value={addForm.password} onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Name</label>
                                <input type="text" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                                <input type="text" value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Admin memo..."
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="addNewsletter" checked={addForm.newsletter} onChange={e => setAddForm(f => ({ ...f, newsletter: e.target.checked }))}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                                <label htmlFor="addNewsletter" className="ml-2 text-xs text-gray-600 dark:text-gray-400">Subscribe to newsletter</label>
                            </div>
                            {addError && <div className="text-red-500 text-xs text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">{addError}</div>}
                            <button type="submit" disabled={addLoading}
                                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50">
                                {addLoading ? 'Creating...' : 'Create User'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Newsletter Modal ── */}
            {showNewsletterModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowNewsletterModal(false); setNlResult(null); }}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Send size={18} className="text-green-600" /> Send Newsletter
                            </h2>
                            <button onClick={() => { setShowNewsletterModal(false); setNlResult(null); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                            This will send an email to <strong className="text-orange-600">{stats.newsletterSubs}</strong> active subscribers.
                        </p>
                        <form onSubmit={handleSendNewsletter} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Email Subject *</label>
                                <input type="text" required value={nlForm.subject} onChange={e => setNlForm(f => ({ ...f, subject: e.target.value }))}
                                    placeholder="New article: Title..."
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Post Title *</label>
                                <input type="text" required value={nlForm.postTitle} onChange={e => setNlForm(f => ({ ...f, postTitle: e.target.value }))}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Post URL *</label>
                                <input type="text" required value={nlForm.postUrl} onChange={e => setNlForm(f => ({ ...f, postUrl: e.target.value }))}
                                    placeholder="/ko/posts/ko/Bayesian/ba010-story"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Summary (optional)</label>
                                <textarea value={nlForm.postSummary} onChange={e => setNlForm(f => ({ ...f, postSummary: e.target.value }))}
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none" />
                            </div>
                            {nlResult && (
                                <div className={clsx(
                                    'text-xs text-center font-medium p-3 rounded-lg',
                                    nlResult.error ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                )}>
                                    {nlResult.error || nlResult.message}
                                </div>
                            )}
                            <button type="submit" disabled={nlLoading}
                                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50">
                                {nlLoading ? 'Sending...' : `Send to ${stats.newsletterSubs} Subscribers`}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
