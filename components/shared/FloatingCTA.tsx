"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { usePathname } from 'next/navigation';

export const FloatingCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'ko';

    useEffect(() => {
        const toggleVisibility = () => {
             // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const labels: Record<string, string> = {
        ko: '문의하기',
        en: 'Contact Us',
        ja: 'お問い合わせ',
        zh: '联系我们',
        vi: 'Liên hệ',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Link 
                        href={`/${currentLocale}/about#contact`}
                        className="group flex items-center gap-3 px-6 py-4 bg-gray-900 border border-white/10 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 font-bold"
                    >
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span>{labels[currentLocale] || 'Contact Us'}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
