'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Missing verification token.');
            return;
        }

        fetch(`/api/auth/verify-email?token=${token}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Verification failed.');
                }
            })
            .catch(() => {
                setStatus('error');
                setMessage('Network error. Please try again.');
            });
    }, [token]);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full text-center space-y-6 p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
                    {status === 'loading' && (
                        <>
                            <span className="text-5xl">⏳</span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verifying...</h2>
                            <p className="text-gray-500">Please wait while we verify your email.</p>
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            <span className="text-5xl">✅</span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email verified!</h2>
                            <p className="text-gray-500 dark:text-gray-400">{message}</p>
                            <button
                                onClick={() => router.push('/login')}
                                className="mt-4 inline-block py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Sign in now
                            </button>
                        </>
                    )}
                    {status === 'error' && (
                        <>
                            <span className="text-5xl">❌</span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verification failed</h2>
                            <p className="text-red-500">{message}</p>
                            <button
                                onClick={() => router.push('/register')}
                                className="mt-4 text-orange-600 hover:text-orange-500 text-sm font-semibold"
                            >
                                ← Back to register
                            </button>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
