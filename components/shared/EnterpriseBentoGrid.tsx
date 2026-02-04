"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BayesianVisual } from './BayesianVisual';

interface BentoProps {
  locale?: string;
  textData?: any;
}

export const EnterpriseBentoGrid = ({ locale = 'en', textData }: BentoProps) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
    
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setActiveStep(prev => (prev % 5) + 1);
            }, 700);
            return () => clearInterval(interval);
        } else {
            setActiveStep(0);
        }
    }, [isInView]);
    
    // Default Fallback
    const content = textData || {
        title: "Two Engines. Total Integration.",
        cards: {
            finance: "Autonomous Finance",
            supply: "Supply Chain",
            risk: "Risk Management",
            hr: "Human Capital"
        }
    };

    // Description text per locale (Integrated logic or use passed prop implies rich text needed)
    // Ideally this should also be passed via textData if possible, but for now we keep the rich-text structure here
    // or we assume textData contains the description string.
    
    // Since mainPageData.ts doesn't have the long description, let's keep this local map for the description specifically,
    // BUT mapped to valid locales to fix the English display issue.
    const descriptions: Record<string, React.ReactNode> = {
        en: (
            <>
                The EXA Enterprise Platform drives your entire enterprise with two core engines. The <strong className="text-blue-600 dark:text-blue-400">Process Engine</strong>, based on APS|DBR scheduling, optimizes execution, while the <strong className="text-orange-500 dark:text-orange-400">EXA Engine</strong>, combining precise mathematics with risk management, supports process management and strategic decision-making. Through the combination of the two engines, strategy and execution are integrated. <br/><br/>
                <span className="text-gray-950 dark:text-white font-bold italic">"With <span className="font-black underline decoration-blue-500/30 underline-offset-4">EXA</span>, business in the fog of uncertainty finally transforms into a precisely designed science."</span>
            </>
        ),
        ko: (
            <>
                EXA Enterprise Platform은 두 개의 엔진으로 기업 전체를 구동합니다.<br/>
                APS|DBR 스케줄링 기반 <strong className="text-blue-600 dark:text-blue-400">Process Engine</strong>이 실행을 최적화하고
                정교한 수학과 리스크 관리를 결합한 <strong className="text-orange-500 dark:text-orange-400">EXA Engine</strong>이
                프로세스 관리와 전략적 의사결정을 지원합니다.
                두 엔진의 결합으로 전략과 실행이 통합됩니다.<br/><br/>
                <span className="text-gray-950 dark:text-white font-bold italic">"<span className="font-black underline decoration-blue-500/30 underline-offset-4">EXA</span>와 함께라면, 불확실성의 안개 속 비즈니스가 비로소 정밀하게 설계된 과학이 됩니다."</span>
            </>
        ),
        vi: (
            <>
                Nền tảng Doanh nghiệp EXA vận hành toàn bộ doanh nghiệp của bạn bằng hai động cơ cốt lõi. <strong className="text-blue-600 dark:text-blue-400">Process Engine</strong>, dựa trên lập lịch APS|DBR, tối ưu hóa việc thực thi, trong khi <strong className="text-orange-500 dark:text-orange-400">EXA Engine</strong>, kết hợp toán học chính xác với quản lý rủi ro, hỗ trợ quản lý quy trình và ra quyết định chiến lược. Thông qua sự kết hợp của hai động cơ này, chiến lược và thực thi được tích hợp.<br/><br/>
                <span className="text-gray-900 dark:text-white font-serif italic">"Với EXA, việc kinh doanh trong màn sương không chắc chắn cuối cùng sẽ chuyển mình thành một khoa học được thiết kế chính xác."</span>
            </>
        ),
        ja: (
            <>
                EXAエンタープライズプラットフォームは、2つのコアエンジンで企業全体を駆動します。APS|DBRスケジューリングに基づく<strong className="text-blue-600 dark:text-blue-400">Process Engine</strong>が実行を最適化し、精密な数学とリスク管理を組み合わせた<strong className="text-orange-500 dark:text-orange-400">EXA Engine</strong>がプロセス管理と戦略的意思決定をサポートします。2つのエンジンの組み合わせにより、戦略と実行が統合されます。<br/><br/>
                <span className="text-gray-900 dark:text-white font-serif italic">「EXAとともに、不確実性の霧の中のビジネスが、ついに精密に設計された科学へと変貌します。」</span>
            </>
        ),
        zh: (
            <>
                EXA企业平台通过两个核心引擎驱动您的整个企业。基于APS|DBR调度的<strong className="text-blue-600 dark:text-blue-400">流程引擎</strong>优化执行，而结合精确数学与风险管理的<strong className="text-orange-500 dark:text-orange-400">EXA引擎</strong>支持流程管理和战略决策。通过两个引擎的结合，战略与执行得以整合。<br/><br/>
                <span className="text-gray-900 dark:text-white font-serif italic">「有了EXA，不确定性迷雾中的商业终于转变为精确设计的科学。」</span>
            </>
        )
    };

    const renderTitle = (title: string) => {
        const parts = title.split('.');
        if (parts.length < 2) return title;
        return (
            <>
                {parts[0]}. <span className="text-gray-400 dark:text-gray-600 font-medium">{parts.slice(1).join('.')}</span>
            </>
        );
    };

    return (
        <section ref={sectionRef} className="relative w-full py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
                
                {/* 1. New Section Header: Dual Engine Concept */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center space-y-6 max-w-4xl mx-auto"
                >
                    <span className="text-orange-600 font-bold tracking-[0.3em] text-xs uppercase">
                        The Core Architecture
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white tracking-tighter">
                        {renderTitle(content.title)}
                    </h2>
                    <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium transition-all duration-500">
                        {descriptions[locale] || descriptions['en']}
                    </div>
                </motion.div>

                {/* 2. DUAL ENGINE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    
                    {/* LEFT ENGINE: Process Engine */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group overflow-hidden rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 md:p-10 flex flex-col justify-between min-h-[500px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Header */}
                        <div className="relative z-10 space-y-2">
                             <div className="inline-flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-sm" />
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Execution Backbone</span>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                                Process Engine
                            </h3>
                            <p className="text-gray-500 text-sm max-w-sm">
                                Synchronizes the physical flow of materials and resources with mathematical constraint theory.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                            {[
                                { name: 'On-Time Risk Control', desc: 'Bayesian On-Time Risk & Buffer Management', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                                { name: 'APS | DBR', desc: 'Advanced Finite Capacity Scheduling', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                                { name: 'MTA', desc: 'The Volatility Shock Absorber via Decoupling', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
                                { name: 'Valuation', desc: 'Free Cash Flow Driven Management', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
                            ].map((item, i) => (
                                <div key={item.name} className="bg-white dark:bg-white/10 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col gap-2 hover:border-orange-500/30 transition-colors shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="font-black text-gray-900 dark:text-white text-base leading-tight mb-1">{item.name}</div>
                                        <div className="text-[9px] text-gray-500 uppercase tracking-wide font-bold leading-tight">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT ENGINE: EXA Engine (The Brain) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group overflow-hidden rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-0 flex flex-col justify-between min-h-[500px]"
                    >
                        <div className="p-8 md:p-10 relative z-10 flex flex-col h-full justify-between">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Intelligence Core</span>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                                        EXA Engine
                                    </h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-bold text-sm leading-relaxed">
                                        Powered by Bayesian AI —<br/> 
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Elevating Business to an Exact Science</span>
                                    </p>
                                </div>
                            </div>

                            {/* Blank Spacer for Graph visibility */}
                            <div className="h-20"></div> 
                        </div>

                        {/* The Restored High-Fidelity Graph Visual */}
                        <div className="absolute inset-x-0 bottom-40 h-[500px] w-full">
                             <div className="w-[120%] -ml-[10%] h-full relative">
                                <BayesianVisual className="!bg-transparent !border-none !shadow-none" hideGhostText={true} />
                             </div>
                             
                             {/* Overlay Gradient to blend top text */}
                             <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-gray-50 dark:from-[#0c0c0e] via-gray-50/50 dark:via-[#0c0c0e]/50 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* 3. END-TO-END FLOW (The Value Chain) */}
                <div className="w-full rounded-3xl bg-gray-900 text-white p-10 md:p-14 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
                    />

                    <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                        {/* Title - Simplified Again */}
                        <div className="lg:col-span-4 space-y-2">
                            <h4 className="text-3xl font-black tracking-tight mb-2">End-to-End <br/> Coverage</h4>
                            <p className="text-sm text-gray-400">From strategic planning to financial realization.</p>
                        </div>

                        <div className="lg:col-span-8 flex flex-col md:flex-row items-start justify-end gap-4 md:gap-6 w-full">
                            {['Planning', 'Sourcing', 'Manufacturing', 'Logistics', 'Finance'].map((step, i) => {
                                const isActive = (i + 1) === activeStep;
                                return (
                                    <React.Fragment key={step}>
                                        <div className="flex flex-col items-center gap-4 relative group">
                                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${isActive ? 'bg-white text-gray-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-white/5 border-white/10 group-hover:border-orange-500/50 group-hover:bg-white/10'}`}>
                                                <span className="font-bold text-lg md:text-xl">{i + 1}</span>
                                            </div>
                                            <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase transition-colors ${isActive ? 'text-orange-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                                {step}
                                            </span>
                                        </div>
                                        {i < 4 && (
                                            <div className={`h-8 w-0.5 md:w-8 md:h-0.5 mt-7 md:mt-8 transition-colors duration-700 ${(i + 1) < activeStep ? 'bg-orange-500/50' : 'bg-white/10'}`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
