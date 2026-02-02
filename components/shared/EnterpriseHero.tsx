"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/config/site.settings';
import { BayesianVisual } from '@/components/shared/BayesianVisual';

export const EnterpriseHero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-20 lg:py-32 border-b border-gray-100 dark:border-gray-900">
            {/* 1. Infinite Technical Grid (Dense & Full-Width) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]" 
                    style={{ 
                        backgroundImage: `linear-gradient(to right, #80808060 1px, transparent 1px), linear-gradient(to bottom, #80808060 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            {/* 2. Abstract Technical Nodes & Atmospheric Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Intensified atmospheric glow for depth */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] blur-[150px] bg-orange-600/20 dark:bg-orange-500/30 rounded-full"
                />
                
                {/* SVG Decorative Nodes - Geometric & Technical */}
                <svg className="absolute top-0 right-0 w-full h-full opacity-30 dark:opacity-50" viewBox="0 0 1000 800" fill="none">
                    {/* Top Right Node Group */}
                    <motion.circle 
                        animate={{ r: [2, 3.5, 2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        cx="880" cy="180" r="3" fill="#f97316" 
                    />
                    <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 2, delay: 1 }}
                        d="M880 180 L940 100" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" 
                    />
                    
                    {/* Bottom Right Node Group */}
                    <motion.circle 
                        animate={{ r: [2, 3, 2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                        cx="750" cy="320" r="2.5" fill="#f97316" 
                    />
                    <motion.path 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        d="M880 180 L750 320" stroke="#f97316" strokeWidth="0.5" strokeDasharray="2 2" 
                    />

                    {/* Left Subtle Node */}
                    <motion.circle 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        cx="100" cy="400" r="1.5" fill="#f97316" 
                    />
                </svg>

                {/* Floating Math Symbols (Very Subtle) */}
                <div className="absolute top-[15%] right-[25%] text-gray-200 dark:text-gray-800 font-sans text-4xl opacity-20 pointer-events-none select-none">
                    Σ
                </div>
                <div className="absolute bottom-[20%] left-[10%] text-gray-200 dark:text-gray-800 font-sans text-3xl opacity-20 pointer-events-none select-none">
                    β
                </div>
            </div>

            {/* 3. Main Content Content Container */}
            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Left Side: Copy */}
                <div className="flex flex-col space-y-12">
                    <div className="space-y-8">
                        {/* Alive Badge */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Enterprise Intelligence Platform
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.95]"
                        >
                            {siteConfig.title.split(' ').map((word, i) => (
                                <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl border-l-2 border-orange-500/20 pl-6"
                        >
                            {siteConfig.description}
                        </motion.p>
                    </div>

                    {/* Mission Text Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="p-8 rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-100 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                            <span className="text-orange-500 font-bold mr-2">“</span>
                            This room is a knowledge warehouse for business people. EXA acknowledges only 
                            <span className="text-gray-900 dark:text-white font-bold px-1 underline decoration-orange-500/30">『Undeniable clear Facts & Unrefutable Conclusions』</span>
                            <span className="text-orange-500 font-bold ml-1">”</span>
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Visual Placeholder */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="relative group perspective-1000 hidden lg:block"
                >
                    {/* Multi-layered glass effect */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/10 to-blue-500/5 rounded-[2rem] blur-2xl opacity-40"></div>
                    
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[500px] bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-2xl border border-white/60 dark:border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
                        
                        {/* Fake Browser Top Bar */}
                        <div className="h-10 border-b border-gray-100 dark:border-white/5 flex items-center px-4 gap-1.5 bg-gray-50/50 dark:bg-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <BayesianVisual />
                        </div>
                    </div>

                    {/* Ambient glow following mouse could be added later */}
                </motion.div>
            </div>
        </section>
    );
};
