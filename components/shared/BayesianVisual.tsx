"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Point {
    x: number;
    y: number;
}

const getNormal = (x: number, mean: number, stdDev: number, scale: number) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * scale;
};

const generatePath = (mean: number, stdDev: number, scale: number) => {
    const points: Point[] = [];
    for (let x = 0; x <= 100; x += 1) {
        points.push({ x, y: getNormal(x, mean, stdDev, scale) });
    }
    return `M ${points.map(p => `${p.x * 4},${250 - p.y}`).join(' L ')}`;
};

export const BayesianVisual = () => {
    const [step, setStep] = useState(0);
    const [precision, setPrecision] = useState(0.999404);
    
    // Core Bayesian State
    const [paths, setPaths] = useState({
        prior: generatePath(30, 15, 1200),
        likelihood: generatePath(70, 8, 800),
        posterior: generatePath(55, 6, 1600)
    });

    // Refs to track the mathematical state for sequential updates
    const stateRef = useRef({
        priorMean: 30,
        priorStd: 15,
        targetMean: 70
    });

    useEffect(() => {
        // 1. Ticking precision (Visual feedback only)
        const tickInterval = setInterval(() => {
            setPrecision(prev => {
                const delta = (Math.random() - 0.5) * 0.00001;
                return Math.max(0.9994, Math.min(0.999999, prev + delta));
            });
        }, 80);

        // 2. Sequential Bayesian Update (Biological/Sequential feel)
        const updateInterval = setInterval(() => {
            const current = stateRef.current;
            
            // Generate a new piece of evidence (Likelihood) 
            // It "pulls" the prior towards it, but smoothly
            const likelihoodMean = 20 + Math.random() * 60; 
            const likelihoodStd = 5 + Math.random() * 5;

            // Bayesian Formula:
            // Precision = 1 / Variance
            const priorPrec = 1 / Math.pow(current.priorStd, 2);
            const likPrec = 1 / Math.pow(likelihoodStd, 2);
            
            const postPrec = priorPrec + likPrec;
            const postStd = Math.sqrt(1 / postPrec);
            const postMean = (current.priorMean * priorPrec + likelihoodMean * likPrec) / postPrec;

            // Update Paths
            setPaths({
                prior: generatePath(current.priorMean, current.priorStd, 1000),
                likelihood: generatePath(likelihoodMean, likelihoodStd, 800),
                posterior: generatePath(postMean, postStd, 1800)
            });

            // The Posterior of this step becomes the Prior of the next step (Sequential update)
            // We add a tiny bit of "noise/entropy" to the Prior Std to prevent it from converging to zero zero (infinite precision)
            // for the sake of continuous animation.
            stateRef.current = {
                priorMean: postMean,
                priorStd: Math.max(postStd, 4) + (Math.random() * 0.5), // Minimum Std for visual visibility
                targetMean: likelihoodMean
            };

            setStep(s => (s + 1) % 1000);

            // If it becomes too narrow, reset slightly to keep it moving
            if (stateRef.current.priorStd < 5) {
                stateRef.current.priorStd = 12;
            }

        }, 3500); // 3.5s for a more deliberate, scientific feel

        return () => {
            clearInterval(tickInterval);
            clearInterval(updateInterval);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 transition-colors duration-500 bg-white dark:bg-[#020617]/50 lg:rounded-2xl">
            {/* Header */}
            <div className="absolute top-6 left-8 text-left space-y-1.5 z-20">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 dark:text-white/70">Probability Engine v2.2</span>
                </div>
                <div className="flex gap-4 text-[9px] font-mono text-gray-500 dark:text-gray-400 leading-tight">
                   <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-gray-400 dark:bg-gray-600" /> Current Belief (Prior)</div>
                   <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-yellow-500/50" /> New Evidence (Likelihood)</div>
                   <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-orange-500" /> Optimal Conclusion (Posterior)</div>
                </div>
            </div>

            {/* Formula - Fraction Style */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-[110px] left-8 z-20 pointer-events-none"
            >
                <div className="flex flex-col gap-2.5">
                    <span className="text-[7px] font-black text-orange-600 dark:text-orange-500/80 uppercase tracking-[0.5em]">Identity Logic</span>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white/95 font-serif italic text-base md:text-xl font-extralight tracking-widest leading-none">
                        <span>P(θ|D) = </span>
                        <div className="flex flex-col items-center px-1">
                            <span className="px-3 pb-1 border-b border-gray-900/20 dark:border-white/30">P(D|θ) P(θ)</span>
                            <span className="text-[10px] opacity-60 dark:opacity-50 not-italic mt-1">P(D)</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main SVG Plot */}
            <div className="relative w-full h-auto max-w-md mt-24">
                <svg viewBox="0 0 400 320" className="w-full h-auto drop-shadow-[0_0_35px_rgba(249,115,22,0.1)]">
                    <g className="opacity-[0.1] dark:opacity-[0.08]">
                        {[0, 50, 100, 150, 200, 250].map(y => (
                            <line key={y} x1="0" y1={280-y} x2="400" y2={280-y} stroke="currentColor" className="text-gray-400 dark:text-white" strokeWidth="0.5" strokeDasharray="5 5" />
                        ))}
                    </g>

                    <motion.path
                        animate={{ d: paths.prior }}
                        transition={{ duration: 2.8, ease: "easeInOut" }}
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-400 dark:text-gray-700"
                        strokeWidth="1.2"
                        strokeDasharray="4 2"
                    />
                    
                    <motion.path
                        animate={{ d: paths.likelihood }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        fill="none"
                        stroke="#eab308"
                        className="opacity-30 dark:opacity-20"
                        strokeWidth="1.5"
                    />

                    <motion.path
                        animate={{ d: paths.posterior }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        fill="url(#gradient-post-responsive)"
                        stroke="#f97316"
                        strokeWidth="3.5"
                        className="drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    />

                    <motion.g animate={{ x: 200, y: 295 }} className="text-[10px] font-bold fill-gray-400 dark:fill-gray-500 uppercase tracking-[0.3em] opacity-40">
                        <text textAnchor="middle">S-{step}</text>
                    </motion.g>

                    <defs>
                        <linearGradient id="gradient-post-responsive" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Evidence Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ bottom: "20%", left: "50%", opacity: 0 }}
                            animate={{ 
                                bottom: ["20%", "45%"],
                                opacity: [0, 0.8, 0],
                                left: [`${30 + i*8}%`, `${32 + i*8 + (Math.random()-0.5)*10}%`]
                            }}
                            transition={{ 
                                duration: 2.5 + Math.random(), 
                                repeat: Infinity, 
                                delay: i * 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute w-1.5 h-1.5 bg-yellow-500/80 rounded-full blur-[1px]"
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Panel */}
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="space-y-0.5">
                    <p className="text-[7px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Learning Convergence</p>
                    <p className="text-[9px] font-mono text-gray-800 dark:text-white/60">iter_idx: {step}</p>
                </div>
                <div className="text-right">
                    <p className="text-[7px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Certainty Precision</p>
                    <motion.p className="text-sm md:text-base font-mono font-bold text-orange-600 dark:text-orange-500/90">
                         {precision.toFixed(6)}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};
