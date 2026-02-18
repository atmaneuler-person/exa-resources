"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BayesianLiveDemo } from './BayesianLiveDemo';

import { MainPageData } from './types';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/config/site.settings';

interface EXAWinProps {
    textData?: MainPageData['exawin'];
}

export const EnterpriseEXAWinSection = ({ textData }: EXAWinProps) => {
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || siteConfig.defaultLocale;
    const [mobileSlide, setMobileSlide] = React.useState(0);

    // Default fallback content (English)
    const content = textData || {
        label: "Deploy Evidence-Based Sales",
        title: "EXAWin:",
        subtitle: "Sales is now Science.",
        cardTitle: "Transform Ambiguity \ninto Certainty.",
        cardDesc: "EXAWin replaces gut-feeling sales forecasts with Recursive Bayesian Inference.",
        button: "Get Started",
        feature1: "Global Access",
        feature2: "View Case Studies"
    };

    // Auto-slide mobile screenshots every 3 seconds
    React.useEffect(() => {
        const timer = setInterval(() => {
            setMobileSlide(prev => (prev + 1) % 2);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-24 lg:py-32">
            <div className="max-w-screen-2xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                        {content.label}
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-snug max-w-5xl">
                        <span className="text-gray-950 dark:text-gray-100">{content.title}</span>
                        {content.subtitle && (
                            <div className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium text-gray-400 dark:text-gray-500 tracking-tight leading-normal">
                                {content.subtitle}
                            </div>
                        )}
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">

                    {/* ── LEFT COLUMN: Main Card (Text + Graph) ── */}
                    <div className="lg:col-span-7 relative group overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-2xl flex flex-col p-0 min-h-[620px]">

                        {/* Content Layer */}
                        <div className="relative z-20 max-w-xl p-10 md:p-12 pointer-events-none">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-200 mb-6 leading-[1.6] pointer-events-auto whitespace-pre-line tracking-tight break-keep">
                                {content.cardTitle}
                            </h3>
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-[1.8] max-w-md pointer-events-auto font-medium break-keep">
                                {(() => {
                                    const highlightRegex = /(NSBI|베타분포|Log 가중치|정보엔트로피|의사결정 임피던스|Recursive Bayesian Inference|재귀적 베이지안 추론)/g;
                                    const parts = content.cardDesc.split(highlightRegex);
                                    return parts.map((part: string, i: number) => {
                                        if (["NSBI", "베타분포", "Log 가중치", "정보엔트로피", "의사결정 임피던스", "Recursive Bayesian Inference", "재귀적 베이지안 추론"].includes(part)) {
                                            return <span key={i} className="text-gray-950 dark:text-gray-200 font-bold">{part}</span>;
                                        }
                                        return part;
                                    });
                                })()}
                            </p>

                            {/* Buttons: Get Started + Analyze Case Studies */}
                            <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
                                <Link href={`/${currentLocale}/products/exawin`} className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {content.button}
                                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                                <Link href={`/${currentLocale}/products/exawin#research-section`} className="inline-flex items-center gap-2 px-6 py-3 text-orange-600 dark:text-orange-400 font-bold text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors group/case">
                                    {content.feature2}
                                    <svg className="w-4 h-4 transform group-hover/case:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Graph Layer (Bottom) */}
                        <div className="relative z-10 mt-auto w-full h-[360px] overflow-hidden rounded-b-[2.5rem]">
                            <div className="w-full h-full">
                                <BayesianLiveDemo compact />
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Global Access + Screenshot ── */}
                    <div className="lg:col-span-5 flex flex-col gap-5 relative">

                        {/* Global Strategic Access Card — ORIGINAL SIZE */}
                        <div className="rounded-[2rem] bg-blue-600 dark:bg-blue-700 px-8 py-20 flex flex-col text-white relative shadow-xl group">
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-1">{content.feature1}</h4>
                                <p className="text-blue-100 text-xs mb-3">
                                    Available for enterprise clients worldwide.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-md">Cloud</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-md">On-Premise</span>
                                </div>
                            </div>
                            {/* Mobile Phone — absolute inside card, vertically centered */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center z-20">
                                <div className="w-[72px] h-[170px] rounded-[5px] border-[2px] border-black bg-black overflow-hidden shadow-2xl relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-black rounded-b-full z-10" />
                                    {[
                                        { src: '/static/images/mobile_analytics.png', alt: 'Bayesian Analytics' },
                                        { src: '/static/images/mobile_activity_light.png', alt: 'Activity Record - Light' },
                                    ].map((screen, idx) => (
                                        <div
                                            key={idx}
                                            className="absolute inset-0 transition-opacity duration-700"
                                            style={{ opacity: mobileSlide === idx ? 1 : 0 }}
                                        >
                                            <Image
                                                src={screen.src}
                                                alt={screen.alt}
                                                fill
                                                className="object-cover"
                                                sizes="72px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* EXAWin Screenshot — Real System Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-700/50 shadow-2xl group mt-auto"
                        >
                            {/* Title Header */}
                            <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-tight">
                                    Bayesian Sales Activity War Room
                                </h4>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                                    Real-time Sales Analytics & Meeting Intelligence
                                </p>
                            </div>
                            {/* Screenshot Image */}
                            <div className="relative w-full aspect-[16/9] bg-white dark:bg-gray-950">
                                <Image
                                    src="/static/images/exawin-activity-warroom.png"
                                    alt="EXAWin Activity War Room — Real-time Bayesian Sales Analytics"
                                    fill
                                    className="object-contain object-left-top group-hover:scale-[1.02] transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    priority
                                />
                                {/* Subtle overlay gradient at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/70 dark:from-black/30 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};
