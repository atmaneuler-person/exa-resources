"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- Beta Distribution Math ---
const getBetaKernel = (x: number, alpha: number, beta: number) => {
    if (x < 0 || x > 1) return 0;
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1);
};

export const ExaWinKernelVisual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    useEffect(() => {
        if (!isInView) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let time = 0;
        let animationId: number;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                ctx.scale(dpr, dpr);
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            
            ctx.clearRect(0, 0, width, height);
            
            time += 0.02;

            // --- Configuration ---
            const margin = 40;
            const graphWidth = width - margin * 2;
            const maxGraphHeight = height * 0.6; 
            const baseY = height * 0.8;

            // --- Dynamic Beta Parameters ---
            const alpha = 6 + Math.sin(time * 0.7) * 2; 
            const beta = 6 + Math.sin(time * 0.9 + 1) * 2;

            const mode = (alpha - 1) / (alpha + beta - 2);
            const peakKernelValue = getBetaKernel(mode, alpha, beta);

            // --- Draw Curve ---
            const startX = margin;
            
            ctx.beginPath();
            ctx.moveTo(startX, baseY);

            const steps = 100;
            for (let i = 0; i <= steps; i++) {
                const t = i / steps; 
                const kernel = getBetaKernel(t, alpha, beta);
                
                // Height scaling
                const normalizedHeight = (kernel / peakKernelValue) * maxGraphHeight;
                
                const px = margin + t * graphWidth;
                const py = baseY - normalizedHeight;
                ctx.lineTo(px, py);
            }
            ctx.lineTo(margin + graphWidth, baseY);
            ctx.closePath();

            // Gradient Fill
            const peakX = margin + mode * graphWidth;
            const peakY = baseY - maxGraphHeight;
            
            const gradient = ctx.createLinearGradient(0, peakY, 0, baseY);
            gradient.addColorStop(0, 'rgba(249, 115, 22, 0.6)'); 
            gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Stroke
            ctx.beginPath();
            ctx.moveTo(startX, baseY);
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const kernel = getBetaKernel(t, alpha, beta);
                const normalizedHeight = (kernel / peakKernelValue) * maxGraphHeight;
                ctx.lineTo(margin + t * graphWidth, baseY - normalizedHeight);
            }
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.stroke();


            // --- Decision Point (Mode) & Trail ---
            const floatY = peakY - 40 + Math.sin(time * 2) * 10;
            
            for(let i=1; i<=3; i++) {
                 const lag = i * 0.2;
                 const oldAlpha = 6 + Math.sin((time - lag) * 0.7) * 2;
                 const oldBeta = 6 + Math.sin((time - lag) * 0.9 + 1) * 2;
                 const oldMode = (oldAlpha - 1) / (oldAlpha + oldBeta - 2);
                 const oldPx = margin + oldMode * graphWidth;
                 // Add float movement to trail too
                 const oldFloatY = baseY - maxGraphHeight - 40 + Math.sin((time - lag) * 2) * 10; 
                 // Simple offset up/down for trail
                 const renderY = oldFloatY + (i * 15);

                 ctx.beginPath();
                 ctx.arc(oldPx, renderY, 3, 0, Math.PI * 2);
                 ctx.fillStyle = `rgba(249, 115, 22, ${0.4 - i * 0.1})`;
                 ctx.fill();
            }

            // Connector
            ctx.beginPath();
            ctx.setLineDash([4, 4]);
            ctx.moveTo(peakX, floatY + 10);
            ctx.lineTo(peakX, baseY - getBetaKernel(mode, alpha, beta)/peakKernelValue * maxGraphHeight); 
            // Connect to actual surface of graph at the peak
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            // Main Dot
            ctx.beginPath();
            ctx.arc(peakX, floatY, 8 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(peakX, floatY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#f97316';
            ctx.fill();

            // --- Baseline ---
            ctx.beginPath();
            ctx.moveTo(margin, baseY);
            ctx.lineTo(width - margin, baseY);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 1;
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
        <div ref={containerRef} className="relative w-full h-[400px] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden select-none">
            {/* Header Label - Moved to Right to avoid Button on Left */}
            <div className="absolute top-8 right-8 flex items-center justify-end gap-3 z-20">
                <span className="text-xs font-black tracking-[0.25em] text-gray-900 dark:text-white uppercase font-mono">
                    EXA WIN KERNEL
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
            </div>

            {/* Ghost Math Formulas - Moved down */}
            <div className="absolute top-20 right-8 text-right space-y-4 pointer-events-none opacity-30 z-10 hidden md:block">
                <div className="text-sm font-serif italic text-gray-400 dark:text-gray-500">
                    Beta(α, β) = [x^(α-1)(1-x)^(β-1)] / B(α, β)
                </div>
                <div className="text-xs font-serif italic text-gray-300 dark:text-gray-600">
                    Posterior ∝ Likelihood × Prior
                </div>
                <div className="text-xs font-serif italic text-gray-300 dark:text-gray-600">
                    μ = α / (α + β)
                </div>
            </div>

            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

            {/* Bottom Metrics */}
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end border-t border-gray-100 dark:border-white/5 pt-4 z-20">
                <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Inference_Success</div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter tabular-nums">
                        51.2<span className="text-xl text-gray-400">%</span>
                    </div>
                </div>
                
                {/* Equalizer Bars */}
                <div className="flex gap-1 h-6 items-end">
                    {[...Array(8)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={isInView ? { height: [4, 12 + Math.random() * 10, 4] } : {}}
                            transition={{ duration: 0.8 + Math.random(), repeat: Infinity }}
                            className="w-1.5 bg-orange-200 dark:bg-orange-900/40 rounded-sm"
                        >
                            <div className="w-full h-[60%] bg-orange-400 rounded-sm" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
