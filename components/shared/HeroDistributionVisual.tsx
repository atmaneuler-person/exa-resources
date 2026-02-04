"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const HeroDistributionVisual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let time = 0;
        let animationId: number;

        const resize = () => {
            const canvas = canvasRef.current;
            const parent = canvas?.parentElement;
            if (canvas && parent) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                const ctx = canvas.getContext('2d');
                if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const getGaussian = (x: number, mean: number, stdDev: number) => {
            return Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
        };

        const samples = [...Array(15)].map(() => ({
            x: Math.random(),
            yOffset: (Math.random() - 0.5) * 40,
            size: 1.5 + Math.random() * 2
        }));

        const draw = () => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            if (width === 0 || height === 0) {
                animationId = requestAnimationFrame(draw);
                return;
            }
            
            ctx.clearRect(0, 0, width, height);
            time += 0.015;

            const centerY = height * 0.8;
            const peakHeight = height * 0.55;
            const meanX = width * 0.6;
            const movingMean = meanX + Math.sin(time * 0.4) * 30; 
            const posteriorStdDev = 70 + Math.sin(time) * 5;
            const priorStdDev = 140 + Math.cos(time * 0.7) * 10;
            
            // 1. Grid
            ctx.setLineDash([]);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 40) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
            }
            for (let j = 0; j < height; j += 40) {
                ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
            }

            // 2. Prior
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            for (let x = 0; x <= width; x += 4) {
                const y = centerY - getGaussian(x, meanX, priorStdDev) * (peakHeight * 0.6);
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // 3. Posterior Fill
            const gradient = ctx.createLinearGradient(0, centerY - peakHeight, 0, centerY);
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            for (let x = 0; x <= width; x += 2) {
                const y = centerY - getGaussian(x, movingMean, posteriorStdDev) * peakHeight;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(width, centerY);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            // 4. Posterior Stroke
            ctx.beginPath();
            for (let x = 0; x <= width; x += 2) {
                const y = centerY - getGaussian(x, movingMean, posteriorStdDev) * peakHeight;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // 5. Samples
            samples.forEach((s, i) => {
                const sx = s.x * width;
                const baseHeight = getGaussian(sx, movingMean, posteriorStdDev) * peakHeight;
                const sy = centerY - baseHeight + s.yOffset + Math.sin(time + i) * 5;
                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fillStyle = i % 3 === 0 ? '#ef4444' : 'rgba(239, 68, 68, 0.6)';
                ctx.fill();
            });

            // 6. Peak
            const peakY = centerY - getGaussian(movingMean, movingMean, posteriorStdDev) * peakHeight;
            ctx.beginPath();
            ctx.arc(movingMean, peakY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 2;
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [isInView]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-[#080a12] rounded-3xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
             {/* 1. Ghost Text Layer */}
             <div className="absolute inset-0 pointer-events-none select-none p-10 font-mono">
                <div className="text-2xl text-white/5 absolute top-8 left-10">E(Flow | Constraint)</div>
                <div className="text-md text-white/5 absolute bottom-40 left-1/4">p(θ | D) ∝ p(D | θ) p(θ)</div>
                <div className="text-sm text-white/5 absolute top-1/2 right-12">Σ [rᵢ log(pᵢ)]</div>
                
                <div className="absolute top-24 right-10 text-right">
                    <div className="text-[10px] text-cyan-500/40 font-black uppercase tracking-[0.3em] mb-1">EXA Decision Kernel v5</div>
                    <div className="text-[9px] text-gray-600 font-mono">KERNEL_TYPE: RECURSIVE_BAYESIAN</div>
                    <div className="text-[9px] text-gray-600 font-mono">STATUS: OPTIMIZING_POSTERIOR</div>
                </div>
             </div>

             {/* 2. Canvas Layer */}
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

             {/* 3. Bottom Overlay Intelligence */}
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Information Stability</span>
                        <div className="flex gap-1 items-end h-6">
                            {[...Array(12)].map((_,i) => (
                               <motion.div 
                                  key={i} 
                                  animate={{ height: [8, 16 + Math.random()*12, 8] }}
                                  transition={{ duration: 0.8 + Math.random(), repeat: Infinity }}
                                  className="w-1 bg-cyan-500/40 rounded-t-[1px]"
                               /> 
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-green-500/5 border border-green-500/20 px-3 py-1.5 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[10px] text-green-500 font-mono font-bold uppercase tracking-widest">System Online</span>
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="text-[11px] text-orange-500 font-black uppercase tracking-widest mb-1">Decision Significance</div>
                    <div className="text-5xl font-black text-white tracking-tighter tabular-nums">
                        65.87<span className="text-2xl text-gray-500">%</span>
                    </div>
                </div>
             </div>
        </div>
    );
};
