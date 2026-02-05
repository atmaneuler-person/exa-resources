"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

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

const generateAreaPath = (mean: number, stdDev: number, scale: number, time: number, waveAmp: number = 2) => {
    const points: {x: number, y: number}[] = [];
    for (let x = -10; x <= 110; x += 2) {
        const wave = Math.sin(time * 0.001 + x * 0.05) * waveAmp;
        points.push({ x, y: getNormal(x, mean, stdDev, scale) + wave });
    }
    // Close the path at the bottom to allow filling
    const startX = points[0].x * 4;
    const endX = points[points.length - 1].x * 4;
    
    return `M ${points.map(p => `${p.x * 4},${250 - p.y}`).join(' L ')} L ${endX},300 L ${startX},300 Z`;
};

interface BayesianVisualProps {
    className?: string;
    hideGhostText?: boolean;
    variant?: 'sales' | 'production' | 'intelligence';
}

const THEMES = {
    sales: {
        primary: '#f97316', // orange-500
        secondary: '#fdba74', // orange-300
        accent: '#c2410c', // orange-700
        label: 'Win Probability',
        subLabel: 'Decision Significance',
        formula: 'P(Win | Signal)',
        strokeClass: 'stroke-orange-500',
        fillClass: 'bg-orange-600', 
        textClass: 'text-orange-500',
        gradientId: 'grad-orange'
    },
    production: {
        primary: '#06b6d4', // cyan-500
        secondary: '#67e8f9', // cyan-300
        accent: '#0e7490', // cyan-700
        label: 'Efficiency Rate', 
        subLabel: 'Process Stability',
        formula: 'E(Flow | Constraint)',
        strokeClass: 'stroke-cyan-500',
        fillClass: 'bg-cyan-600',
        textClass: 'text-cyan-500',
        gradientId: 'grad-cyan'
    },
    intelligence: {
        primary: '#a855f7', // purple-500
        secondary: '#d8b4fe', // purple-300
        accent: '#7e22ce', // purple-700
        label: 'Model Confidence', 
        subLabel: 'Inference Accuracy',
        formula: 'P(H | Evidence)', 
        strokeClass: 'stroke-purple-500',
        fillClass: 'bg-purple-600',
        textClass: 'text-purple-500',
        gradientId: 'grad-purple'
    }
};

export const BayesianVisual = ({ className = "", hideGhostText = false, variant = 'sales' }: BayesianVisualProps) => {
    const theme = THEMES[variant];
    const [time, setTime] = useState(0);
    const [mounted, setMounted] = useState(false);
    
    // Target state (Where we want to go)
    const targets = useRef({
        priorM: 35, postM: 65, likM: 80, postS: 6
    });

    // Current interpolated state (Where we are)
    const smoothState = useRef({ m1: 35, m2: 65, m3: 80, s2: 6 });

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.05 });

    // 1. Initialize & Periodically change targets
    useEffect(() => {
        if (!isInView) return;
        setMounted(true);
        const interval = setInterval(() => {
            targets.current = {
                priorM: 20 + Math.random() * 30, // Random mean between 20-50
                postM: 50 + Math.random() * 35, // Random mean between 50-85
                likM: 65 + Math.random() * 30, // Random mean between 65-95
                postS: 5 + Math.random() * 5    // Random stdDev
            };
        }, 3000); // Change target every 3 seconds

        return () => clearInterval(interval);
    }, [isInView]);

    // 2. Main Animation Loop (Runs every frame)
    useEffect(() => {
        if (!isInView) return;

        let animationFrameId: number;
        const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

        const animate = (now: number) => {
            const T = (now - startTime) / 1000; // Time in seconds
            setTime(T); // Trigger re-render with new time

            // Smoothly interpolate current state towards targets
            // Higher factor = faster, Lower = smoother
            const lerpFactor = 0.15; 
            smoothState.current.m1 += (targets.current.priorM - smoothState.current.m1) * lerpFactor;
            smoothState.current.m2 += (targets.current.postM - smoothState.current.m2) * lerpFactor;
            smoothState.current.m3 += (targets.current.likM - smoothState.current.m3) * lerpFactor;
            smoothState.current.s2 += (targets.current.postS - smoothState.current.s2) * lerpFactor;

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView]);

    const paths = useMemo(() => {
        const m2 = smoothState.current.m2;
        const s2 = smoothState.current.s2;
        const scale = 1800;
        const waveAmp = 4;
        
        // Calculate Peak Position
        const peakX = m2;
        const peakYBase = getNormal(peakX, m2, s2, scale); 
        const wave = Math.sin(time + peakX * 0.05) * waveAmp; 
        
        return {
            prior: generateNormalPath(smoothState.current.m1, 15, 800, time * 1000, 2),
            posterior: generateNormalPath(m2, s2, 1800, time * 1000, 4),
            likelihood: generateNormalPath(smoothState.current.m3, 12, 600, time * 1000, 2.5),
            peak: { 
                x: peakX * 4, 
                y: 250 - (peakYBase + wave) 
            }
        };
    }, [time]); // Re-calculate when 'time' changes (every frame)

    const winProb = (smoothState.current.m2).toFixed(2);

    return (
        <div ref={containerRef} className={`relative w-full h-[500px] lg:h-[650px] overflow-hidden font-mono transition-colors duration-500 ${className || 'bg-white dark:bg-black/90 backdrop-blur-3xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl'}`}>
            
            {/* SVG Gradients Definition */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <linearGradient id={theme.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={theme.primary} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Background "Ghost" Formulas */}
            {!hideGhostText && (
            <div className="absolute inset-0 z-0 pointer-events-none select-none p-16 pt-40 pb-32 overflow-hidden flex flex-col justify-between opacity-60 dark:opacity-40">
                <div className="flex justify-between items-start">
                    <div className="text-xl lg:text-3xl font-serif italic text-gray-300 dark:text-white/20 whitespace-nowrap">
                        {theme.formula}
                    </div>
                </div>
                <div className="flex justify-end pr-10 lg:pr-32">
                    <div className="text-lg lg:text-2xl font-serif italic text-gray-300 dark:text-white/10 whitespace-nowrap">
                        {"rᵢ = [ π · N₁ ] / [ (1-π) · N₀ + π · N₁ ]"}
                    </div>
                </div>
                <div className="flex justify-center pl-10 lg:pl-20">
                    <div className="text-base lg:text-xl font-serif italic text-gray-300 dark:text-white/10 whitespace-nowrap">
                        {"zᵢ ~ Bernoulli( rᵢ )"}
                    </div>
                </div>
            </div>
            )}

            {/* Technical HUD Tags */}
            {!hideGhostText && (
            <div className="absolute top-8 right-8 z-20 space-y-2 pointer-events-none flex flex-col items-end text-right">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm lg:text-base font-black text-gray-950 dark:text-gray-200 uppercase tracking-[0.2em] drop-shadow-md">EXA Decision Kernel v5</h2>
                    <div className={`w-2 h-2 rounded-full ${theme.fillClass} animate-pulse`} />
                </div>
            </div>
            )}

            {/* The Interactive Graph */}
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-12 z-10">
                {mounted && (
                <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="mainFillHero" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={theme.primary} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
                        </linearGradient>
                        <filter id="glowHero" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Grid Lines */}
                    {!hideGhostText && (
                    <g className="opacity-10 dark:opacity-20 text-gray-400 dark:text-gray-600">
                        {[0, 50, 100, 150, 200, 250].map(y => (
                            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                        ))}
                    </g>
                    )}

                    {/* Curves */}
                    <path d={paths.prior} fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-700" strokeWidth="1" strokeDasharray="5 5" />
                    <path d={paths.likelihood} fill="none" stroke="#eab308" className="opacity-30 dark:opacity-20" strokeWidth="1.5" />
                    
                    {/* Confidence Interval (Area) */}
                    <motion.path
                        d={generateAreaPath(smoothState.current.m2, smoothState.current.s2, 1800, time * 1000, 4)}
                        fill="url(#mainFillHero)"
                        stroke="none"
                        animate={{ d: generateAreaPath(smoothState.current.m2, smoothState.current.s2, 1800, time * 1000, 4) }}
                        transition={{ duration: 0, ease: "linear" }}
                    />

                    {/* Main Probability Density Function (Line) */}
                    <motion.path
                        d={generateNormalPath(smoothState.current.m2, smoothState.current.s2, 1800, time * 1000, 4)}
                        fill="none"
                        stroke={theme.primary}
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glowHero)"
                        animate={{ d: generateNormalPath(smoothState.current.m2, smoothState.current.s2, 1800, time * 1000, 4) }}
                        transition={{ duration: 0, ease: "linear" }}
                    />

                    {/* Peak Point */}
                    <motion.circle
                        cx={paths.peak.x}
                        cy={paths.peak.y}
                        r={6}
                        fill="white"
                        stroke={theme.primary}
                        strokeWidth={3}
                        className="filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] z-50 pointer-events-none"
                        animate={{ cx: paths.peak.x, cy: paths.peak.y }}
                        transition={{ duration: 0, ease: "linear" }}
                    />
                    
                    {/* Ripple Effect */}
                    <motion.circle
                         cx={paths.peak.x}
                         cy={paths.peak.y}
                         r={6}
                         fill="transparent"
                         stroke={theme.primary}
                         strokeWidth={1}
                         initial={{ scale: 1, opacity: 0.8 }}
                         animate={{ scale: 2.5, opacity: 0, cx: paths.peak.x, cy: paths.peak.y }}
                         transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </svg>
                )}
            </div>

            {/* Bottom Metrics */}
            <div className="absolute bottom-24 left-16 right-40 flex justify-between items-end border-t border-gray-200 dark:border-white/10 pt-4 z-20">
                <div className="space-y-2">
                    <h5 className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest drop-shadow-sm">Information Stability</h5>
                    <div className="flex gap-1 h-12 items-end">
                        {[...Array(15)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 rounded-t-sm transition-all duration-300 ease-out ${theme.fillClass}`}
                                style={{ height: mounted ? `${20 + Math.sin(time * 5 + i) * 30}%` : '20%' }}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{theme.label}</div>
                    <div className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter tabular-nums leading-none">
                        {winProb}%
                    </div>
                </div>
            </div>
        </div>
    );
};
