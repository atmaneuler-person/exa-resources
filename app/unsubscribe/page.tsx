'use client'

/**
 * ===================================================================
 * Unsubscribe Confirmation Page
 * ===================================================================
 *
 * /unsubscribe — Shows unsubscribe result based on ?status= param
 *
 * status=success  → "Successfully unsubscribed"
 * status=already  → "You were already unsubscribed"
 * status=error    → "Something went wrong"
 * ===================================================================
 */

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { CheckCircle, Info, AlertTriangle, Mail } from 'lucide-react'

function UnsubscribeContent() {
    const params = useSearchParams()
    const status = params.get('status')

    const config: Record<string, { icon: any; title: string; message: string; color: string }> = {
        success: {
            icon: CheckCircle,
            title: 'Unsubscribed Successfully',
            message:
                'You have been removed from our newsletter mailing list. You will no longer receive newsletter emails from EXA.',
            color: 'text-green-600',
        },
        already: {
            icon: Info,
            title: 'Already Unsubscribed',
            message:
                'You are already unsubscribed from our newsletter. No further action is needed.',
            color: 'text-blue-600',
        },
        error: {
            icon: AlertTriangle,
            title: 'Something Went Wrong',
            message:
                'We could not process your unsubscribe request. Please try again or contact support.',
            color: 'text-orange-600',
        },
    }

    const current = config[status || ''] || {
        icon: Mail,
        title: 'Newsletter Subscription',
        message:
            'To manage your newsletter subscription, please use the unsubscribe link in your newsletter email.',
        color: 'text-gray-600',
    }

    const IconComp = current.icon

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div
                        className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${status === 'success'
                                ? 'bg-green-100 dark:bg-green-900/30'
                                : status === 'already'
                                    ? 'bg-blue-100 dark:bg-blue-900/30'
                                    : status === 'error'
                                        ? 'bg-orange-100 dark:bg-orange-900/30'
                                        : 'bg-gray-100 dark:bg-gray-800'
                            }`}
                    >
                        <IconComp size={28} className={current.color} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {current.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                        {current.message}
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        Back to Home
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function UnsubscribePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-600" />
                </div>
            }
        >
            <UnsubscribeContent />
        </Suspense>
    )
}
