'use client';

import { useState } from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setSent(true);
            } else {
                setError(data.error || 'Something went wrong.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
                <Header />
                <main className="flex-grow flex items-center justify-center py-12 px-4">
                    <div className="max-w-md w-full text-center space-y-6 p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
                        <span className="text-5xl">📧</span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            If an account exists for <strong className="text-gray-900 dark:text-white">{email}</strong>,
                            we&apos;ve sent a password reset link.
                        </p>
                        <p className="text-xs text-gray-400">The link expires in 2 hours.</p>
                        <a href="/login" className="mt-4 inline-block text-orange-600 hover:text-orange-500 text-sm font-semibold">
                            ← Back to sign in
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
                    <div className="text-center">
                        <span className="text-4xl">🔑</span>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                            Reset password
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Enter your email and we&apos;ll send you a reset link.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                placeholder="you@company.com"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Remember your password?{' '}
                        <a href="/login" className="font-semibold text-orange-600 hover:text-orange-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
