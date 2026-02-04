"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HeroDistributionVisual } from './HeroDistributionVisual';

interface HeroProps {
  textData?: any;
}

export const EnterpriseHero = ({ textData }: HeroProps) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });
    // Default fallback content (English)
    const content = textData || {
        label: "Enterprise AI 2.0",
        title: "The era of record-centric \nERP is over.",
        desc: "EXA Enterprise Platform drives the entire enterprise with two engines.\n\nThe APS | DBR Process Engine optimizes physical execution, while the EXA Engine (Bayesian & AI) manages risk and strategy. From Planning to Finance, we integrate strategy and execution into a precisely designed science.",
        cta: "Discover the OS",
        videoLabel: "Logic Kernel v2.4 initialized"
    };

    // Helper to render title with highlights
    const renderTitle = (title: string) => {
        const lines = title.split('\n');
        return lines.map((line, i) => (
            <span key={i} className="block">
                {i === 1 ? (
                    <span className="text-gray-400 dark:text-gray-600">{line}</span>
                ) : (
                    line
                )}
            </span>
        ));
    };

    // Helper to render description with highlights
    const renderDesc = (desc: string) => {
        const parts = desc.split(/(\*\*.*?\*\*|EXA Enterprise Platform|APS \| DBR Process Engine|EXA Engine \(Bayesian & AI\)|two engines|Planning to Finance|APS \| DBR 프로세스 엔진|EXA 엔진\(Bayesian & AI\)|EXA 엔진\(베이지안 & AI\)|두 개의 엔진|계획\(Planning\)에서 재무\(Finance\)까지)/g);
        return parts.map((part, i) => {
            if (part === "EXA Enterprise Platform") {
                return <span key={i} className="text-gray-950 dark:text-white font-black">{part}</span>;
            }
            if (part === "APS | DBR Process Engine" || part === "APS | DBR 프로세스 엔진") {
                return <span key={i} className="text-orange-600 dark:text-orange-500 font-bold">{part}</span>;
            }
            if (part === "EXA Engine (Bayesian & AI)" || part === "EXA 엔진(Bayesian & AI)" || part === "EXA 엔진(베이지안 & AI)") {
                return <span key={i} className="text-blue-600 dark:text-blue-400 font-bold">{part}</span>;
            }
            if (part === "two engines" || part === "두 개의 엔진" || part === "Planning to Finance" || part === "계획(Planning)에서 재무(Finance)까지") {
                return <span key={i} className="text-gray-900 dark:text-gray-200 font-bold">{part}</span>;
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-gray-900 dark:text-gray-200 font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <section ref={sectionRef} className="relative w-full min-h-[90vh] flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden pt-20 transition-colors duration-500">
            {/* 1. Background Content (Hero components are z-10 or higher) */}
            <div className="absolute inset-0 z-0" />

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-12">
                
                {/* 2. Text Content (Left Aligned) */}
                <div className="flex-1 space-y-12 md:space-y-20 text-left pt-10 md:pt-0">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                            {content.label}
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.35] whitespace-pre-line text-left break-keep bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-400"
                    >
                        {renderTitle(content.title)}
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl text-left"
                    >
                        <p className="text-xl md:text-[20px] text-gray-600 dark:text-gray-400 leading-[1.7] font-medium whitespace-pre-line break-keep">
                            {renderDesc(content.desc)}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-start"
                    >
                        <button className="group relative px-8 py-4 bg-gray-950 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-xl">
                            <span className="relative z-10 flex items-center gap-2">
                                {content.cta}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </span>
                        </button>
                        <button className="px-8 py-4 bg-orange-50/30 dark:bg-orange-500/5 border-2 border-orange-200/50 dark:border-orange-500/20 text-gray-900 dark:text-white rounded-full font-bold text-lg backdrop-blur-md hover:bg-orange-100/50 dark:hover:bg-orange-500/10 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
                           View Technical Whitepaper
                        </button>
                    </motion.div>
                </div>

                {/* 3. Hero Visual (Right) */}
                <div className="flex-1 w-full relative h-[500px] md:h-[700px] flex items-center justify-center">
                    <HeroDistributionVisual />
                    
                    {/* Floating HUD: Inference Core (Top Right - Overlapping corner) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { 
                            opacity: 1, 
                            x: 0,
                            y: [0, -10, 0] 
                        } : {}}
                        transition={{ 
                            x: { duration: 0.8, delay: 1.0 },
                            opacity: { duration: 0.8, delay: 1.0 },
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute -top-12 -right-8 z-[100] bg-black/90 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hidden md:flex"
                    >
                        <div className="w-2 h-10 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                        <div>
                            <div className="text-[9px] text-orange-500 font-black uppercase tracking-widest">Inference Core</div>
                            <div className="text-lg font-black text-gray-200 tracking-tighter">MCMC / SIGMOID</div>
                        </div>
                    </motion.div>

                    {/* Overlay UI for 'Tech Feel' (Bottom Right) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { 
                            opacity: 1,
                            y: [0, 8, 0]
                        } : {}}
                        transition={{ 
                            opacity: { delay: 1.2 },
                            y: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute -bottom-16 -right-8 z-40 bg-black/70 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl hidden md:block shadow-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-xs text-gray-400 font-mono mb-1">System Status</div>
                                <div className="text-sm font-bold text-green-400 flex items-center gap-2 justify-end">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    ONLINE
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                            {content.videoLabel}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
