"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Mathematical Helpers ---
const getNormal = (x: number, mean: number, stdDev: number, scale: number) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * scale;
};

const generateNormalPath = (mean: number, stdDev: number, scale: number, time: number, waveAmp: number = 2) => {
    const points: {x: number, y: number}[] = [];
    for (let x = -10; x <= 110; x += 2) {
        const wave = Math.sin(time * 0.001 + x * 0.05) * waveAmp;
        points.push({ x, y: getNormal(x, mean, stdDev, scale) + wave });
    }
    return `M ${points.map(p => `${p.x * 4},${250 - p.y}`).join(' L ')}`;
};

export const BayesianVisual = () => {
    const [time, setTime] = useState(0);
    const requestRef = useRef<number>(0);
    
    const [targets, setTargets] = useState({
        priorM: 35, postM: 65, likM: 80, postS: 6
    });

    const animate = (t: number) => {
        setTime(t / 1000);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTargets({
                priorM: 20 + Math.random() * 30,
                postM: 50 + Math.random() * 35,
                likM: 65 + Math.random() * 30,
                postS: 5 + Math.random() * 5
            });
        }, 8000); 
        return () => clearInterval(interval);
    }, []);

    const smoothState = useRef({ m1: 35, m2: 65, m3: 80, s2: 6 });
    useEffect(() => {
        let frame: number;
        const update = () => {
            const lerp = 0.012; 
            smoothState.current.m1 += (targets.priorM - smoothState.current.m1) * lerp;
            smoothState.current.m2 += (targets.postM - smoothState.current.m2) * lerp;
            smoothState.current.m3 += (targets.likM - smoothState.current.m3) * lerp;
            smoothState.current.s2 += (targets.postS - smoothState.current.s2) * lerp;
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, [targets]);

    const paths = useMemo(() => ({
        prior: generateNormalPath(smoothState.current.m1, 15, 800, time * 1000, 2),
        posterior: generateNormalPath(smoothState.current.m2, smoothState.current.s2, 1800, time * 1000, 4),
        likelihood: generateNormalPath(smoothState.current.m3, 12, 600, time * 1000, 2.5)
    }), [time]);

    const winProb = (smoothState.current.m2).toFixed(2);

    return (
        <div className="relative w-full h-[500px] lg:h-[650px] bg-white dark:bg-black/90 backdrop-blur-3xl rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden font-mono shadow-2xl transition-colors duration-500">
            
            {/* 1. Background "Ghost" Math Formulas - Much Fainter Unicode Notation */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none p-16 pt-40 pb-32 overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-40 dark:opacity-10">
                    <div className="text-xl lg:text-3xl font-serif italic text-gray-300 dark:text-orange-200/40 whitespace-nowrap">
                        {"P(θ | D) = [ P(D | θ) P(θ) ] / P(D)"}
                    </div>
                </div>
                
                <div className="flex justify-end pr-10 lg:pr-32 opacity-30 dark:opacity-8">
                    <div className="text-lg lg:text-2xl font-serif italic text-gray-300 dark:text-orange-100/30 whitespace-nowrap">
                        {"rᵢ = [ π · N₁ ] / [ (1-π) · N₀ + π · N₁ ]"}
                    </div>
                </div>

                <div className="flex justify-start pl-10 lg:pl-20 opacity-20 dark:opacity-5">
                    <div className="text-base lg:text-xl font-serif italic text-gray-300 dark:text-orange-100/20 whitespace-nowrap">
                        {"zᵢ ~ Bernoulli( rᵢ )"}
                    </div>
                </div>

                <div className="flex justify-center opacity-20 dark:opacity-3">
                    <div className="text-xl lg:text-3xl font-serif italic text-gray-300 dark:text-orange-50/10 whitespace-nowrap">
                        {"∫ p(θ | D) dθ = 1"}
                    </div>
                </div>
            </div>

            {/* 2. Technical HUD Tags - Clean Title & High Contrast */}
            <div className="absolute top-10 left-10 z-20 space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                    <h2 className="text-base lg:text-xl font-black text-gray-950 dark:text-gray-200 uppercase tracking-[0.2em]">EXA Uncertainty Core v4</h2>
                </div>
                <div className="flex gap-6 pl-5">
                    <span className="text-[10px] lg:text-xs text-gray-700 dark:text-gray-500 font-bold uppercase tracking-widest">Model: MIXTURE DENSITY</span>
                    <span className="text-[10px] lg:text-xs text-orange-600 dark:text-orange-500 font-bold uppercase tracking-widest">Logic: MCMC GIBBS SAMPLING</span>
                </div>
            </div>

            {/* 4. The Visual Plot */}
            <div className="absolute inset-0 flex items-center justify-center p-12 lg:p-24">
                <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                    <g className="opacity-25 dark:opacity-30 text-gray-300 dark:text-gray-800">
                        {[0, 50, 100, 150, 200, 250].map(y => (
                            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                        ))}
                    </g>

                    {/* Curves */}
                    <path d={paths.prior} fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-700" strokeWidth="1" strokeDasharray="5 5" />
                    <path d={paths.likelihood} fill="none" stroke="#eab308" className="opacity-30 dark:opacity-20" strokeWidth="1.5" />
                    <path d={paths.posterior} fill="url(#mainFillHero)" stroke="#f97316" strokeWidth="6" strokeLinecap="round" className="drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]" />

                    {/* Peak Point */}
                    <motion.circle
                        cx={smoothState.current.m2 * 4}
                        cy={250 - getNormal(smoothState.current.m2, smoothState.current.m2, smoothState.current.s2, 1800)}
                        r={4}
                        fill="#f97316"
                        className="filter blur-[0.5px]"
                    />

                    <defs>
                        <linearGradient id="mainFillHero" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* 5. Bottom Data Stream */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-gray-200 dark:border-white/10 pt-8 z-20">
                <div className="space-y-3">
                    <h5 className="text-xs font-black text-gray-800 dark:text-gray-400 uppercase tracking-widest">Information Stability</h5>
                    <div className="flex gap-1.5 h-16 items-end">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-1.5 bg-orange-600/60 dark:bg-orange-500/30 rounded-t-sm"
                                style={{ height: `${30 + Math.sin(time * 3 + i) * 35}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-xs lg:text-sm text-gray-700 dark:text-gray-400 font-bold uppercase tracking-[0.3em]">Decision Significance</span>
                    <div className="text-6xl lg:text-8xl font-black text-gray-950 dark:text-white tabular-nums tracking-tighter">
                        {winProb}<span className="text-3xl opacity-30 ml-2 font-bold">%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
