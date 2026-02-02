"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const EnterpriseShowcase = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gray-950 py-24 lg:py-32 rounded-[2rem] my-12 shadow-2xl">
            {/* 1. Dark Technical Background */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid on Dark */}
                <div className="absolute inset-0 opacity-[0.1]" 
                    style={{ 
                        backgroundImage: `linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' 
                    }}
                />
                
                {/* Radial Glows for Depth */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            {/* 2. Dynamic Connection Lines (Agreed Style) */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-40" viewBox="0 0 1200 600">
                <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M-50 300 Q 300 150 600 300 T 1250 300" 
                    stroke="url(#gradient-line)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Floating data dots */}
                {[...Array(5)].map((_, i) => (
                    <motion.circle
                        key={i}
                        r="2"
                        fill="#f97316"
                        initial={{ 
                            opacity: 0,
                            // @ts-ignore
                            "--offset-distance": "0%"
                        }}
                        animate={{ 
                            opacity: [0, 1, 1, 0],
                            // @ts-ignore
                            "--offset-distance": "100%"
                        }}
                        style={{ 
                            offsetPath: "path('M-50 300 Q 300 150 600 300 T 1250 300')",
                            // @ts-ignore
                            offsetDistance: "var(--offset-distance)"
                        }}
                        transition={{ 
                            duration: 10 + i * 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: i * 1.5 
                        }}
                    />
                ))}
            </svg>

            {/* 3. Content */}
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-orange-500">
                        Unified Intelligence Ecosystem
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                        Mastering Complexity via <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                            Unrefutable Conclusions
                        </span>
                    </h3>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                    From the foundational precision of <span className="text-white">Bayesian Logic</span> to the transformative power of <span className="text-white">Generative AI</span>. 
                    EXA orchestrates a multidimensional architecture of <span className="text-gray-200">ML, DL, and Reinforcement Learning</span> to distill raw uncertainty into undeniable enterprise facts.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 relative flex justify-center group/btn-container"
                >
                    {/* Coming Soon Tooltip */}
                    <motion.div 
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover/btn-container:opacity-100 group-hover/btn-container:-top-16 transition-all duration-500 pointer-events-none shadow-[0_10px_20px_rgba(249,115,22,0.3)] z-50 flex flex-col items-center"
                    >
                        Coming Soon
                        <div className="absolute -bottom-1 w-2 h-2 bg-orange-600 rotate-45" />
                    </motion.div>

                    <button 
                        disabled
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-950 font-bold rounded-full cursor-not-allowed group-hover:bg-gray-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    >
                        <span className="relative z-10">Explore the Ecosystem</span>
                        <svg className="w-5 h-5 relative z-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
