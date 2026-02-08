"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExaWinKernelVisual } from './ExaWinKernelVisual';

import { MainPageData } from './types';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/config/site.settings';

interface EXAWinProps {
  textData?: MainPageData['exawin'];
}

export const EnterpriseEXAWinSection = ({ textData }: EXAWinProps) => {
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || siteConfig.defaultLocale;
    
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

    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-24 lg:py-32">
            <div className="max-w-screen-2xl mx-auto px-6">
                
                {/* Header - Aligned with Bento Grid Style */}
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

                {/* Main Content Grid - Bento Style */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
                    
                    {/* 1. Primary Feature Card (Graph Visualization) */}
                    <div className="lg:col-span-8 relative group overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-2xl flex flex-col justify-between p-0">
                         
                         {/* Content Layer (Top-Left overlay) */}
                         <div className="relative z-20 max-w-xl p-10 md:p-14 mb-32 pointer-events-none">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-200 mb-8 leading-[1.6] pointer-events-auto whitespace-pre-line tracking-tight break-keep">
                                {content.cardTitle}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-[1.8] max-w-md pointer-events-auto font-medium break-keep">
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
                            
                            {/* Launch Button */}
                            <div className="mt-10 pointer-events-auto">
                                <Link href={`/${currentLocale}/products/exawin`} className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {content.button}
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                         </div>

                         {/* Graph Layer (Bottom/Full) - The Visual IS the card body essentially */}
                         <div className="absolute bottom-0 left-0 right-0 h-[400px] z-10 w-full overflow-hidden rounded-b-[2.5rem]">
                             <div className="w-full h-full">
                                <ExaWinKernelVisual />
                             </div>
                         </div>
                    </div>

                    {/* 2. Secondary Stack (Action & Info) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Status Card */}
                        <div className="flex-1 rounded-[2.5rem] bg-blue-600 dark:bg-blue-700 p-10 flex flex-col justify-center items-start text-white relative overflow-hidden shadow-xl group">
                             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-32 h-32 transform rotate-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                             </div>
                             <h4 className="text-2xl font-bold mb-2 relative z-10">{content.feature1}</h4>
                             <p className="text-blue-100 mb-8 relative z-10">
                                Available for enterprise clients worldwide.
                             </p>
                             <div className="flex items-center gap-3 relative z-10">
                                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold backdrop-blur-md">Cloud</span>
                                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold backdrop-blur-md">On-Premise</span>
                             </div>
                        </div>

                        {/* CTA Card (Case Studies) - MOST EMPHASIZED */}
                        <div className="h-[240px] rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-gray-900 border-2 border-dashed border-orange-400 dark:border-orange-500/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 hover:border-orange-600 dark:hover:border-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-all duration-500 cursor-pointer group shadow-[0_0_50px_-12px_rgba(249,115,22,0.2)] hover:shadow-[0_0_60px_-12px_rgba(249,115,22,0.4)] hover:-translate-y-2 relative overflow-hidden">
                             {/* Floating Glow Effect */}
                             <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-300/30 transition-colors" />
                             
                             <Link href="/solutions/exawin" className="w-full h-full flex flex-col items-center justify-center relative z-10">
                                 <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                    <svg className="w-10 h-10 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                 </div>
                                 <span className="text-xl font-black text-gray-950 dark:text-white mb-2 tracking-tight">{content.feature2}</span>
                             </Link>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};
