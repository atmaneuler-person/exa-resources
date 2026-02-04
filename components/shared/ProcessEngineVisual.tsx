"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const ProcessEngineVisual = () => {
    const [cycle, setCycle] = useState(450);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setCycle(prev => prev + Math.floor(Math.random() * 10) - 5);
        }, 1000);
        return () => clearInterval(interval);
    }, [isInView]);

    // PUCK (Batch) Data for Box 2
    const batches = [
        { id: '#1042', color: 'bg-blue-500' },
        { id: '#1044', color: 'bg-indigo-500' },
        { id: '#1048', color: 'bg-blue-600' },
        { id: '#1052', color: 'bg-blue-400' },
    ];

    const scanDuration = 4;

    return (
        <div ref={containerRef} className="relative w-full aspect-[16/10] bg-[#0a0e1a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-6 font-mono select-none">
            {/* MASTER SCAN LINE (Horizontal movement) */}
            <motion.div 
                className="absolute top-0 bottom-0 w-[1.5px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-50 pointer-events-none"
                animate={isInView ? { left: ['0%', '100%'] } : {}}
                transition={{ duration: scanDuration, repeat: Infinity, ease: "linear" }}
            />

            {/* Header Content */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[7px] text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#d97706] rounded-sm" /> SETUP
                    </div>
                    <div className="flex items-center gap-1.5 text-[7px] text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-sm" /> PROCESS
                    </div>
                    <div className="flex items-center gap-1.5 text-[7px] text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-sm" /> BUFFER OK
                    </div>
                    <div className="flex items-center gap-1.5 text-[7px] text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-sm" /> RISK
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-cyan-400 text-[9px] font-black tracking-tighter">
                        RUNNING CYCLE: {cycle}ms
                    </div>
                </div>
            </div>

            {/* BOX 1: THE ROPE */}
            <div className="mb-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-gray-500 font-black tracking-widest uppercase">The Rope</span>
                    <span className="text-[7px] text-cyan-500/80 font-black tracking-widest px-2 py-0.5 border border-cyan-500/20 rounded">JIT ACTIVE</span>
                </div>
                <div className="flex justify-between gap-1 bg-white/5 p-2 rounded-xl border border-white/5">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <motion.div 
                            key={i}
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#0d1117] border border-white/5 flex items-center justify-center text-[9px] text-gray-600 font-black relative`}
                            animate={isInView ? { 
                                scale: [1, 1.1, 1],
                                borderColor: ['rgba(255,255,255,0.05)', 'rgba(34,211,238,0.4)', 'rgba(255,255,255,0.05)']
                            } : {}}
                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: scanDuration - 0.6, delay: (i / 10) * scanDuration }}
                        >
                            M{i+1}
                            {i < 8 && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full" />}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* BOX 2: WORK CENTER (DRUM) - OPPOSITE MOVEMENT */}
            <div className="mb-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-gray-500 font-black tracking-widest uppercase">Work Center (DRUM)</span>
                    <span className="text-[7px] text-red-500 font-black tracking-widest">DRM LOAD HIGH</span>
                </div>
                <div className="relative h-16 bg-[#161b22] rounded-xl border border-white/10 overflow-hidden flex items-center px-4">
                    <div className="flex gap-2 w-full h-10">
                        {batches.map((batch, i) => (
                            <motion.div 
                                key={i}
                                className="flex-1 flex overflow-hidden rounded-md border border-white/10"
                                // MOVE OPPOSITE TO SCAN: As scan goes Left->Right, Puck goes Right->Left
                                animate={isInView ? { 
                                    x: [0, -6, 0],
                                    filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                                } : {}}
                                transition={{ 
                                    duration: 0.8, 
                                    repeat: Infinity, 
                                    repeatDelay: scanDuration - 0.8,
                                    delay: ((i * 25 + 12.5) / 100) * scanDuration - 0.4
                                }}
                            >
                                <div className="w-[30%] bg-[#92400e] text-[6px] flex items-center justify-center text-white/50 font-black">SET</div>
                                <div className={`flex-1 ${batch.color} text-[8px] flex items-center justify-center text-white font-black tracking-tighter relative`}>
                                    Batch {batch.id}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOX 3: BUFFER STATUS - EXACT SCREENSHOT MATCH */}
            <div className="relative z-10">
                <div className="text-[9px] text-gray-500 font-black tracking-widest mb-2 uppercase">Buffer Status</div>
                <div className="relative h-24 bg-[#0d131f] rounded-xl border border-white/5 p-4 flex items-center gap-3 overflow-hidden shadow-inner">
                    {/* Zones matching screenshot background */}
                    <div className="absolute inset-y-0 left-0 w-[40%] bg-green-900/10 border-r border-white/5" />
                    <div className="absolute inset-y-0 left-[40%] w-[30%] bg-yellow-900/10 border-r border-white/5" />
                    <div className="absolute inset-y-0 right-0 w-[30%] bg-red-900/10" />

                    {/* Buffer Pucks with Borders (as in screenshot) */}
                    {[
                        { id: 'B-0', color: 'bg-red-800/80', border: 'border-red-500', delay: 0 },
                        { id: 'B-1', color: 'bg-red-900', border: 'border-red-600', delay: 0.1 },
                        { id: 'B-2', color: 'bg-[#92400e]', border: 'border-[#d97706]', delay: 0.2 },
                        { id: 'B-3', color: 'bg-[#78350f]', border: 'border-orange-600', delay: 0.3 },
                        { id: 'B-4', color: 'bg-green-800', border: 'border-green-500', delay: 0.4 },
                        { id: 'B-5', color: 'bg-green-900', border: 'border-green-600', delay: 0.5 },
                    ].map((puck, i) => (
                        <motion.div 
                            key={i}
                            className={`w-10 h-10 ${puck.color} ${puck.border} border-2 rounded-lg flex items-center justify-center text-[8px] font-black text-white shadow-lg relative z-10`}
                            animate={isInView ? { 
                                scale: [1, 1.15, 1],
                                x: [0, -4, 0], // Opposite movement
                                boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(34,211,238,0.4)', '0 0 0px rgba(255,255,255,0)']
                            } : {}}
                            transition={{ 
                                duration: 0.7, 
                                repeat: Infinity, 
                                repeatDelay: scanDuration - 0.7,
                                delay: (i / 15) * scanDuration 
                            }}
                        >
                            {puck.id}
                        </motion.div>
                    ))}

                    {/* HUD Labels */}
                    <div className="absolute right-4 bottom-4 text-right">
                        <div className="text-[10px] text-green-400 font-black uppercase leading-tight">Optimal Flow</div>
                        <div className="text-[7px] text-gray-500 font-bold uppercase">Throughput: HIGH</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
