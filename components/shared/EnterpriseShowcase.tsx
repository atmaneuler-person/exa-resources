"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '@/components/shared/Image';

interface ShowcaseProps {
  textData?: any;
}

export const EnterpriseShowcase = ({ textData }: ShowcaseProps) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Default fallback (English)
    const content = textData || {
        label: "Unified Intelligence Ecosystem",
        title: "Mastering Complexity via \nUnrefutable Conclusions",
        desc: "From the foundational precision of Bayesian Logic to the transformative power of Generative AI. EXA orchestrates a multidimensional architecture to distill raw uncertainty into undeniable enterprise facts.",
        button: "Explore the Ecosystem"
    };

    const renderTitle = (title: string) => {
        const lines = title.split('\n');
        return lines.map((line, i) => (
            <span key={i} className="block">
                {line}
            </span>
        ));
    };

    const renderDesc = (desc: string) => {
        const parts = desc.split(/(EXA|ML|DL|강화학습|불확실성|팩트\(Fact\)|Bayesian Logic|Generative AI|enterprise facts|베이지안 논리|생성형 AI|사실\(Facts\))/g);
        return parts.map((part, i) => {
            if (["EXA", "ML", "DL", "강화학습", "불확실성", "팩트(Fact)", "Bayesian Logic", "Generative AI", "enterprise facts", "베이지안 논리", "생성형 AI", "사실(Facts)"].includes(part)) {
                return <span key={i} className="text-gray-100 font-bold">{part}</span>;
            }
            return part;
        });
    };

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#080a12] py-24 lg:py-40 rounded-[2rem] md:rounded-[3rem] my-12 shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/5">
            {/* 1. Technical Background */}
            <div className="absolute inset-0 z-0">
                {/* Radial Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            {/* 2. Connection Lines */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-40" viewBox="0 0 1200 600">
                <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M-50 300 Q 300 150 600 300 T 1250 300" 
                    stroke="url(#gradient-line-showcase)" 
                    strokeWidth="1" 
                    fill="none" 
                />
                <defs>
                    <linearGradient id="gradient-line-showcase" x1="0%" y1="0%" x2="100%" y2="0%">
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
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    {/* Level 1: Main Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1] whitespace-pre-line break-keep">
                        {renderTitle(content.title)}
                    </h2>
                    
                    {/* Level 2: Subtitle */}
                    {content.subtitle && (
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 tracking-tight leading-relaxed max-w-4xl mx-auto">
                            {content.subtitle}
                        </h3>
                    )}
                </motion.div>

                {/* Level 3: Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium"
                >
                    {renderDesc(content.desc)}
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 relative flex justify-center group/btn-container"
                >
                    <button 
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-950 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    >
                        <span className="relative z-10">{content.button}</span>
                        <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </motion.div>

                {/* 4. PRODUCT DASHBOARD MOCKUP - LIVE COMMAND CENTER */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative mt-20 mx-auto max-w-6xl px-4"
                >
                     {/* Enhanced depth glow behind the dashboard */}
                     <div className="absolute inset-0 bg-blue-600/20 blur-[150px] rounded-full opacity-30 pointer-events-none translate-x-[-10%]" />
                     <div className="absolute inset-0 bg-orange-600/10 blur-[150px] rounded-full opacity-20 pointer-events-none translate-x-[10%]" />
                     
                     {/* Dashboard Image Container */}
                     <div className="relative rounded-[10px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group/dashboard">
                        <div className="aspect-[16/9] w-full bg-gray-900/50 relative overflow-hidden">
                             <Image 
                                src="/static/images/PO Risk Control Hub.svg" 
                                alt="EXA Enterprise Dashboard" 
                                fill 
                                className="object-cover brightness-105 contrast-105 transition-transform duration-700 group-hover/dashboard:scale-[1.02]"
                             />
                             
                             {/* 1. Slow & Premium Neutral Light Scan Effect */}
                             <motion.div 
                                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                                }}
                                animate={isInView ? { x: ['-100%', '100%'] } : {}}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                             />
                             
                             {/* Other Overlay elements remain as they appear on the 'image' surface */}
                             {/* System status, pulse points, etc. */}
                             {/* Relocated pulse point with relative offset: +35mm right, +10mm down */}
                             <div className="absolute top-[93%] left-[54.5%] -translate-x-1/2 -translate-y-1/2 z-20">
                                <motion.span 
                                    className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
                                    animate={isInView ? { scale: [1, 2], opacity: [0.75, 0] } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                ></motion.span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border border-white/50"></span>
                             </div>

                             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end z-20">
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                        <motion.div 
                                            className="w-2 h-2 rounded-full bg-green-500" 
                                            animate={isInView ? { opacity: [0.5, 1, 0.5] } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <div className="text-green-500 font-mono text-xs uppercase tracking-widest font-bold">System Online</div>
                                     </div>
                                      <div className="text-white font-bold text-lg tracking-tight">Bayesian PO Risk & Buffer Management</div>
                                 </div>
                                 <div className="text-right hidden sm:block">
                                     <div className="text-gray-400 text-xs font-mono">Last Sync</div>
                                     <div className="text-white font-mono text-sm">00:00:01s ago</div>
                                 </div>
                             </div>
                        </div>
                     </div>
                </motion.div>
            </div>
        </section>
    );
};
