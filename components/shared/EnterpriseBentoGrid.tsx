"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Activity, Database, ShieldCheck, Zap, TrendingUp, Cpu, Network, Bot, Info } from 'lucide-react';

// --- Mathematical Helper for Bento Grid ---
const getNormal = (x: number, mean: number, stdDev: number, scale: number) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) * scale;
};

const BayesianEngineVisual = () => {
    const [time, setTime] = useState(0);
    const [targets, setTargets] = useState({ m1: 30, m2: 55, m3: 75, s2: 8 });
    const smooth = useRef({ m1: 30, m2: 55, m3: 75, s2: 8 });

    // Continuous Frame Loop for super smooth movement
    useEffect(() => {
        let frame: number;
        const animate = (t: number) => {
            setTime(t);
            const lerp = 0.015; // Slow water-like transition
            smooth.current.m1 += (targets.m1 - smooth.current.m1) * lerp;
            smooth.current.m2 += (targets.m2 - smooth.current.m2) * lerp;
            smooth.current.m3 += (targets.m3 - smooth.current.m3) * lerp;
            smooth.current.s2 += (targets.s2 - smooth.current.s2) * lerp;
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [targets]);

    // Slow scenario switching
    useEffect(() => {
        const interval = setInterval(() => {
            setTargets({
                m1: 25 + Math.random() * 15,
                m2: 45 + Math.random() * 25,
                m3: 65 + Math.random() * 25,
                s2: 6 + Math.random() * 4
            });
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const winProb = (smooth.current.m2).toFixed(1);

    // Continuous dancing path for the curve
    const path = useMemo(() => {
        const peakX = smooth.current.m2 * 4;
        const peakY = 180 - (22 - smooth.current.s2) * 12;
        // Add smooth wave to the peak
        const dance = Math.sin(time * 0.001) * 5;
        return `M 40,180 Q ${peakX},${peakY + dance} ${peakX + 100},180`;
    }, [time]);

    return (
        <div className="relative w-full aspect-video bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-orange-500/10 overflow-hidden font-mono shadow-2xl">
            {/* Background Formulas - Repositioned to avoid overlap */}
            <div className="absolute inset-x-0 bottom-16 top-12 z-0 pointer-events-none select-none p-6 opacity-[0.15] dark:opacity-[0.2]">
                <div className="flex flex-col gap-6 items-end">
                    <p className="text-[11px] text-gray-600 dark:text-orange-200 font-serif italic whitespace-nowrap">
                        {"P(Success | Data) = [ L(θ) · π(θ) ] / P(D)"}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-orange-100 font-serif italic mr-4 whitespace-nowrap">
                        {"Update: α' = α + s"}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-orange-100 font-serif italic whitespace-nowrap">
                        {"logit(p) = ln( p / [1-p] )"}
                    </p>
                </div>
            </div>

            {/* HUD Header */}
            <div className="absolute inset-x-0 top-0 p-5 flex justify-between items-start z-20">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
                    <span className="text-xs text-gray-900 dark:text-orange-600 font-black tracking-[0.3em] uppercase">EXA WIN KERNEL</span>
                </div>
            </div>

            {/* Main Fluid Visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-10">
                <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="bentoCurveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Faint Grid Lines */}
                    <g className="opacity-15 text-gray-400 dark:text-gray-800">
                        <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="200" y1="40" x2="200" y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    </g>

                    {/* Main Posterior Fluid Curve */}
                    <path 
                        d={path}
                        fill="url(#bentoCurveFill)"
                        stroke="#f97316"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    />

                    {/* Center Point - Optimized visibility and bounds */}
                    <circle 
                        cx={smooth.current.m2 * 4} 
                        cy={Math.max(30, 180 - (20 - smooth.current.s2) * 10 + Math.sin(time * 0.001) * 6)} 
                        r="4" 
                        fill="#f97316"
                        className="filter drop-shadow-[0_0_5px_rgba(249,115,22,1)]"
                    />
                </svg>
            </div>

            {/* Bottom HUD Data */}
            <div className="absolute bottom-0 inset-x-0 h-14 bg-white/80 dark:bg-orange-600/5 backdrop-blur-md border-t border-gray-100 dark:border-orange-500/10 flex items-center px-4 justify-between z-10">
                <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-widest">Inference_Success</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">{winProb}%</span>
                </div>
                <div className="flex gap-1 items-end h-4">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-1 bg-orange-500/20"
                            style={{ height: `${30 + Math.sin(time * 0.003 + i) * 20}%` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const EnterpriseBentoGrid = ({ locale = 'ko' }: { locale?: string }) => {
    const descriptions: Record<string, React.ReactNode> = {
        ko: <>
            단순한 성공 확률을 넘어 <strong>의사결정 임피던스(Decision Impedance)</strong>를 정교하게 해결합니다. 
            엔트로피 기반의 시간 감쇠 설계와 로그-오즈(Log-odds) 공간에서의 결합을 통해, 
            비즈니스의 ‘감’을 <strong>『부정할 수 없는 수학적 결론』</strong>으로 변환합니다.
        </>,
        en: <>
            Beyond simple probability, EXAWin solves <strong>Decision Impedance</strong> with precision. 
            By integrating entropy-based time decay and calculation in <strong>Log-odds space</strong>, 
            it transforms business intuition into <strong>『Unrefutable Mathematical Conclusions』</strong>.
        </>,
        ja: <>
            単なる成功確率を超え、<strong>意思決定インピーダンス（Decision Impedance）</strong>を精교에 해결합니다.
            エント로ピーベースの時間減衰設計とログ・오즈（Log-odds）空間での結合を通じて、
            ビジネスの「勘」を<strong>『否定できない数学的結論』</strong>に変換します.
        </>,
        zh: <>
            超越简单的成功概率，EXAWin 精确地解决了<strong>决策阻抗 (Decision Impedance)</strong>。
            通过基于熵的时间衰减设计和 <strong>Log-odds 空间</strong> 中的结合，
            它将商业直觉转变为<strong>『无可反驳의数学结论』</strong>。
        </>,
        vi: <>
            Vượt xa xác suất thành công đơn giản, EXAWin giải quyết <strong>Trở kháng Quyết định (Decision Impedance)</strong> một cách tinh vi. 
            Thông qua thiết kế phân rã thời gian dựa trên entropy và sự kết hợp trong không gian <strong>Log-odds</strong>, 
            nó biến trực giác kinh doanh thành <strong>『Kết luận toán học không thể bác bỏ』</strong>.
        </>
    };

    return (
        <section className="relative w-full py-24 bg-white dark:bg-gray-950">
            <div className="max-w-screen-2xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-20 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-px w-12 bg-orange-500" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-orange-600">
                            Enterprise Integration
                        </h2>
                    </motion.div>
                    <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                        AI-Augmented <br/> Business Orchestration
                    </h3>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    
                    {/* 1. Large Feature Card: Probabilistic Decision Core (Bayesian + Business) */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 lg:col-span-3 row-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-10 border border-gray-100 dark:border-white/10 flex flex-col justify-between overflow-hidden relative group"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-colors" />
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-600/20 mb-8">
                                    <Activity size={36} />
                                </div>
                                <h4 className="text-3xl font-black text-gray-900 dark:text-gray-300 mb-6 tracking-tight leading-none">Decision Impedance Solver</h4>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm font-medium">
                                    Conquering the geometry of uncertainty via Logarithmic Weighting and Sigmoid Calibration.
                                </p>
                            </div>

                            {/* SaaS Product Teaser - EXAWin */}
                            <div className="mt-12 p-8 bg-white/50 dark:bg-white/5 rounded-3xl border border-orange-500/20 backdrop-blur-sm relative group/saas">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em]">Kernel Core Inference</span>
                                        <h5 className="text-2xl font-black text-gray-900 dark:text-gray-300 leading-tight tracking-tight">EXAWin</h5>
                                    </div>
                                    <div className="px-2 py-1 bg-orange-100 dark:bg-orange-100 rounded text-[9px] font-bold text-orange-600">COMING SOON</div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                                    {descriptions[locale] || descriptions['ko']}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="relative inline-block group/tooltip w-full sm:w-auto">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                            Beta Registration Opening Soon
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                        </div>

                                        <button disabled className="w-full px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-xs font-bold rounded-xl opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                                            Launch Beta
                                            <TrendingUp size={14} />
                                        </button>
                                    </div>

                                    <Link 
                                        href="/category/Literature" 
                                        className="w-full sm:w-auto px-6 py-2.5 bg-white dark:bg-orange-500/5 hover:bg-orange-500 text-orange-600 dark:text-orange-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 border border-orange-500/30 hover:border-orange-500 shadow-lg shadow-orange-500/5 hover:shadow-orange-500/20 flex items-center justify-center gap-2 whitespace-nowrap group/case"
                                    >
                                        View Case Studies
                                        <TrendingUp size={14} className="group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* HIGH IMPACT VISUAL */}
                        <div className="mt-12 group/engine">
                             <BayesianEngineVisual />
                        </div>
                    </motion.div>

                    {/* 2. ERP-Integrated GAI - Data Reasoning */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <Database size={28} />
                                </div>
                                <h4 className="text-2xl font-black text-gray-900 dark:text-gray-300 tracking-tight leading-none">
                                    ERP-Native GAI
                                </h4>
                            </div>
                            <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Beyond simple chat. Our GAI agents reason directly over your <span className="text-orange-600 dark:text-orange-500 font-bold">ERP structured databases</span>, translating complex SQL-level insights into strategic natural language.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Deep Learning Neural Hub (The Connector) */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 lg:col-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 flex flex-col justify-center text-center space-y-6 group relative overflow-hidden"
                    >
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-400 group-hover:text-orange-600 transition-all duration-500">
                            <Network size={28} />
                        </div>
                        <div className="space-y-2 relative z-10">
                            <h4 className="text-xl font-black text-gray-900 dark:text-gray-300 uppercase tracking-tighter leading-none">Deep Neural Hub</h4>
                            <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">The ML/DL Nexus</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium relative z-10">
                            The computational engine unifying <span className="dark:text-white">Bayesian Probability</span>, <span className="dark:text-white">GAI Reasoning</span>, and <span className="dark:text-white">RL Strategies</span> into a single neural matrix.
                        </p>
                    </motion.div>

                    {/* 4. Adaptive Resource RL */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col items-center justify-center text-center group"
                    >
                        <Zap size={28} className="text-orange-500 mb-4 group-hover:scale-125 transition-transform" />
                        <span className="text-xl font-black text-gray-900 dark:text-gray-300 leading-none">RL</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 text-center font-black">Resource Optimization</span>
                    </motion.div>

                    {/* 5. Sovereign Governance - Wide Bottom */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-4 lg:col-span-3 bg-gray-900 dark:bg-white rounded-3xl p-10 border border-transparent shadow-2xl flex items-center justify-between text-white dark:text-gray-900 group"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={28} className="text-orange-500" />
                                <h4 className="text-2xl font-black tracking-tight leading-none">Enterprise Sovereignty</h4>
                            </div>
                            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[320px] font-medium leading-relaxed">
                                Aligning AI logic with corporate governance, ensuring ethical compliance and absolute data security.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
