"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ProcessEngineVisual } from './ProcessEngineVisual';

// --- Improved Visual: Adaptive Risk Engine (On-Time Risk Management) ---
const AdaptiveRiskVisual = () => {
    // Simulated Bayesian On-time probability and its distribution across 3 zones
    const [prob, setProb] = useState(92);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProb(prev => {
                const change = Math.floor(Math.random() * 6) - 3;
                return Math.max(70, Math.min(98, prev + change));
            });
            setTime(prev => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Generate Pillars matching the 3 zones (Green, Yellow, Red)
    // 15 pillars representing lead time segmentation
    const pillars = Array.from({ length: 15 }).map((_, i) => {
        let zone = i < 7 ? 'green' : i < 11 ? 'yellow' : 'red';
        // Bayesian Weight: Center of probability moves based on "prob" state
        const center = (100 - prob) / 5; // simplified logic to shift peak
        const dist = Math.abs(i - center);
        const height = Math.max(10, 80 - dist * 10) + Math.sin(time + i) * 5;
        return { height, zone };
    });

    return (
        <div className="w-full h-full p-8 flex flex-col justify-center bg-[#0a0e1a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative aspect-[16/10]">
             {/* Background Grids */}
             <div className="absolute inset-x-0 bottom-24 h-[1px] bg-white/5 z-0" />
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
             />

             {/* Header HUD */}
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="space-y-1">
                    <div className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] animate-pulse">On-Time Risk Control</div>
                    <h3 className="text-3xl font-black text-white tracking-tighter">Adaptive Risk Engine</h3>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-mono uppercase font-black mb-1">Bayesian Inference</div>
                    <div className="text-4xl font-black text-orange-500 tabular-nums">{prob}%</div>
                    <div className="text-[8px] text-orange-500/50 font-bold uppercase tracking-widest leading-none">P(On-Time Delivery)</div>
                </div>
            </div>
            
            {/* The High-Fidelity Discrete Probability Chart over 3 Zones */}
            <div className="flex-1 flex items-end justify-between gap-1 pb-10 relative z-10 min-h-[220px]">
                
                {/* 3 Zone Background Labels */}
                <div className="absolute inset-0 flex pointer-events-none opacity-20">
                    <div className="h-full border-r border-white/5 flex-1 bg-green-500/5 flex items-start justify-center pt-2 text-[7px] font-black text-green-500 uppercase tracking-widest">Zone: Green (Safety)</div>
                    <div className="h-full border-r border-white/5 flex-1 bg-yellow-500/5 flex items-start justify-center pt-2 text-[7px] font-black text-yellow-500 uppercase tracking-widest">Zone: Yellow (Caution)</div>
                    <div className="h-full flex-1 bg-red-500/5 flex items-start justify-center pt-2 text-[7px] font-black text-red-500 uppercase tracking-widest">Zone: Red (Critical)</div>
                </div>

                {pillars.map((p, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                        <motion.div 
                            className={`w-full max-w-[40px] rounded-t-sm relative transition-all duration-500 ${
                                p.zone === 'green' ? 'bg-green-500/80 border-green-400/30' : 
                                p.zone === 'yellow' ? 'bg-yellow-500/80 border-yellow-400/30' : 
                                'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            } border-t border-x`}
                            initial={{ height: 0 }}
                            animate={{ height: `${p.height}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.02 }}
                        >
                            {/* Inner Glow for Peak Probability */}
                            {p.height > 60 && (
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            )}
                        </motion.div>
                        {/* Shadow underneath */}
                        <div className="w-full h-1 mt-1 bg-white/5 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Bottom HUD Labels */}
            <div className="mt-6 flex justify-between items-center relative z-10 border-t border-white/5 pt-6">
                 <div className="flex gap-8">
                    <div className="space-y-1">
                        <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Uncertainty Matrix</div>
                        <div className="text-[10px] text-white font-mono">Recursive Lead-Time Update</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Sample Rate</div>
                        <div className="text-[10px] text-white font-mono">0.02ms / Sync</div>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
                        <div className="text-[8px] text-gray-500 font-black uppercase mb-0.5">Risk Level</div>
                        <div className="text-xs font-black text-green-500 uppercase tracking-tighter">Minimal Risk</div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

// --- FCF Bar Chart Visual (Finance Modules) ---
const FCFVisual = () => {
    return (
        <div className="w-full h-full p-8 flex flex-col justify-center bg-[#0a0e1a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative aspect-[16/10]">
             <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="space-y-1">
                    <div className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Financial Strategy</div>
                    <h3 className="text-3xl font-black text-white tracking-tighter">FCF-Driven Valuation</h3>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase opacity-60">Decision Equation</div>
                    <div className="text-sm font-black text-blue-500">FCFF = FCFC + FCFE</div>
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-1.5 pb-2 relative border-b border-white/10 z-10 px-2 min-h-[220px]">
                <motion.div 
                    className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-20 pointer-events-none"
                    animate={{ left: ['-10%', '110%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {[65, 45, 80, 55, 90, 75, 95, 85, 100, 110, 105, 125].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center h-full gap-3 relative">
                        <motion.div 
                            className={`w-full max-w-[40px] rounded-t-md relative group border-t border-x ${i >= 9 ? 'bg-orange-600 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-blue-600 border-blue-400/50'}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${(h / 130) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                        >
                            <div className="absolute inset-0 bg-white/20" />
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-black text-white bg-black/80 px-2 py-1 rounded border border-white/10 pointer-events-none z-20">${h}M</div>
                        </motion.div>
                        <span className={`text-[9px] font-mono text-center font-black tracking-tighter ${i >= 9 ? 'text-orange-400' : 'text-gray-500'}`}>
                            {i >= 9 ? `F${i-8}` : `M${i+1}`}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center relative z-10 pt-4 border-t border-white/5">
                 <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest font-black opacity-50">Valuation Focus: Free Cash Flow</div>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[9px] text-gray-500 font-black"><div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /> ACTUALS</div>
                    <div className="flex items-center gap-2 text-[9px] text-orange-500 font-black"><div className="w-2.5 h-2.5 bg-orange-600 rounded-sm shadow-sm" /> FORECAST</div>
                 </div>
            </div>
        </div>
    );
};

export const EnterpriseERPSection = ({ textData }: { textData?: any }) => {
    const [activeTab, setActiveTab] = useState(0); 
    const [progress, setProgress] = useState(0);
    const cycleDuration = 10000; 

    const content = textData || {
        label: "Process Engine",
        title: "Synchronized Execution.",
        desc: "Integration with legacy ERP systems (SAP, Oracle) to inject intelligence into every transaction."
    };

    const renderTitle = (title: string) => {
        const lines = title.split('\n');
        const highlightRegex = /(불확실성|과학)/g;

        const processLine = (text: string) => {
            const parts = text.split(highlightRegex);
            return parts.map((part, i) => {
                if (part === "불확실성" || part === "과학") {
                    return <span key={i} className="font-extrabold text-gray-950 dark:text-gray-200">{part}</span>;
                }
                return <span key={i} className="font-medium text-gray-900/80 dark:text-gray-400">{part}</span>;
            });
        };

        return lines.map((line, i) => (
            <span key={i} className="block">
                {processLine(line)}
            </span>
        ));
    };

    const renderDesc = (desc: string) => {
        const parts = desc.split(/(베이지안|불확실성|과학|학습|지능형 추론|데이터와 논리|지능형 기업|Synchronized|legacy ERP systems|intelligence|SAP|Oracle)/g);
        return parts.map((part, i) => {
            if (["베이지안", "불확실성", "과학", "학습", "지능형 추론", "데이터와 논리", "지능형 기업", "Synchronized", "legacy ERP systems", "intelligence", "SAP", "Oracle"].includes(part)) {
                return <span key={i} className="text-gray-900 dark:text-gray-200 font-bold">{part}</span>;
            }
            return part;
        });
    };

    const modules = [
        { id: 0, label: "PROCESS MODULE", title: "APS | DBR SCHEDULING", desc: "Synchronized scheduling system based on Theory of Constraints." },
        { id: 1, label: "INTELLIGENCE MODULE", title: "ADAPTIVE RISK ENGINE", desc: "Recursive Bayesian On-time Delivery Risk Control via Buffer Mapping." },
        { id: 2, label: "FINANCE MODULES", title: "FCF-DRIVEN MANAGEMENT", desc: "Free Cash Flow optimization and financial strategy mapping." }
    ];

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    useEffect(() => {
        if (!isInView) return;
        
        const interval = 50; 
        const step = (interval / cycleDuration) * 100;
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setActiveTab(current => (current + 1) % modules.length);
                    return 0;
                }
                return prev + step;
            });
        }, interval);
        return () => clearInterval(timer);
    }, [activeTab, isInView]);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="mb-16 md:mb-20">
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                        {content.label}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.3] md:leading-[1.5] mb-8 md:mb-12 whitespace-normal break-all md:whitespace-pre-line md:break-keep bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-400">
                        {renderTitle(content.title)}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-[1.9] max-w-3xl font-medium whitespace-normal break-all md:whitespace-pre-line md:break-keep opacity-90">
                        {renderDesc(content.desc)}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Module Selector (Left Side) */}
                <div className="w-full lg:w-2/5 space-y-6">
                    <div className="space-y-4">
                        {modules.map((mod) => (
                            <div
                                key={mod.id}
                                onClick={() => { setActiveTab(mod.id); setProgress(0); }}
                                className={`group p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                                    activeTab === mod.id 
                                    ? 'bg-white border-blue-500 shadow-[0_20px_50px_rgba(34,211,238,0.25)]' 
                                    : 'bg-slate-50 dark:bg-transparent border-gray-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/10'
                                }`}
                            >
                                <div className="space-y-1 relative z-10">
                                    <div className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${activeTab === mod.id ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600'}`}>{mod.label}</div>
                                    <h4 className={`text-xl font-black tracking-tight transition-colors ${activeTab === mod.id ? 'text-gray-950' : 'text-gray-900 dark:text-gray-400'}`}>{mod.title}</h4>
                                    <p className={`text-sm leading-relaxed transition-colors ${activeTab === mod.id ? 'text-gray-600' : 'text-gray-500 dark:text-gray-700'}`}>{mod.desc}</p>
                                </div>

                                {activeTab === mod.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
                                        <motion.div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Visual (Right Side) */}
                <div className="w-full lg:w-3/5 min-h-[350px] md:min-h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {activeTab === 0 && (
                            <motion.div key="dbr" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} className="w-full">
                                <ProcessEngineVisual />
                            </motion.div>
                        )}
                        {activeTab === 1 && (
                            <motion.div key="risk" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} className="w-full">
                                <AdaptiveRiskVisual />
                            </motion.div>
                        )}
                        {activeTab === 2 && (
                            <motion.div key="fcf" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} className="w-full">
                                <FCFVisual />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </section>
);
};
