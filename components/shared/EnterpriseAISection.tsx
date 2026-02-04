"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- Internal Visualization Components ---

const SignalVisual = () => {
    return (
        <div className="h-24 w-full relative mb-4 bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-center p-4">
            <div className="absolute top-2 left-3 text-[10px] text-blue-300 font-mono tracking-wider">MODULE: SIGNAL PROCESSOR</div>
            <div className="flex items-end justify-between gap-2 h-full pt-6 px-4">
                {[40, 70, 30, 80, 50, 90, 20, 60, 45, 75, 35, 65].map((h, i) => (
                    <motion.div 
                        key={i}
                        className="relative flex flex-col items-center justify-end w-2"
                        initial={{ height: "10%" }}
                        animate={{ height: [`${h}%`, `${Math.random() * 80 + 20}%`, `${h}%`] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                    >
                        {/* Balloon (Circle) */}
                        <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] z-10" />
                        {/* Stick (Bar) */}
                        <div className="w-[2px] flex-1 bg-gradient-to-t from-transparent via-blue-500/50 to-blue-400/80 rounded-full" />
                    </motion.div>
                ))}
            </div>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/static/images/grid.svg')] opacity-10 pointer-events-none" />
        </div>
    );
};

const NeuralNetworkVisual = () => {
    // 3 layers: Input (3), Hidden (4), Output (2)
    const layers = [
        [20, 50, 80],       // Input y-coords
        [10, 35, 65, 90], // Hidden y-coords
        [30, 70]          // Output y-coords
    ];
    const xPositions = [10, 50, 90]; // x% positions

    return (
         <div className="h-32 w-full relative mb-4 bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden">
             <div className="absolute top-2 left-3 text-[10px] text-purple-300 font-mono tracking-wider">MODULE: DEEP LEARNING</div>
             <svg className="w-full h-full p-2">
                {layers.slice(0, 2).map((layer, lIdx) => 
                    layer.map((y1, i) => 
                        layers[lIdx + 1].map((y2, j) => (
                            <motion.line 
                                key={`edge-${lIdx}-${i}-${j}`}
                                x1={`${xPositions[lIdx]}%`} y1={`${y1}%`}
                                x2={`${xPositions[lIdx+1]}%`} y2={`${y2}%`}
                                stroke="rgba(167, 139, 250, 0.2)"
                                strokeWidth="1"
                            />
                        ))
                    )
                )}
                {layers.slice(0, 2).map((layer, lIdx) => 
                    layer.map((y1, i) => 
                        layers[lIdx + 1].map((y2, j) => (
                            <motion.circle 
                                key={`pulse-${lIdx}-${i}-${j}`}
                                r="2"
                                fill="#a78bfa"
                                initial={{ cx: `${xPositions[lIdx]}%`, cy: `${y1}%`, opacity: 0 }}
                                animate={{ 
                                    cx: [`${xPositions[lIdx]}%`, `${xPositions[lIdx+1]}%`],
                                    cy: [`${y1}%`, `${y2}%`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
                            />
                        ))
                    )
                )}
                {layers.map((layer, lIdx) => 
                    layer.map((y, i) => (
                        <motion.circle 
                            key={`node-${lIdx}-${i}`}
                            cx={`${xPositions[lIdx]}%`} cy={`${y}%`} r="3"
                            fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: lIdx * 0.5 + i * 0.2 }}
                        />
                    ))
                )}
             </svg>
         </div>
    );
};

const BayesianNetworkVisual = () => {
    return (
        <div className="h-32 w-full relative mb-4 bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute top-2 left-3 text-[10px] text-indigo-300 font-mono tracking-wider">MODULE: BAYESIAN NET</div>
            <div className="relative w-full h-full max-w-[200px]">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <path d="M100 20 L60 60" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                     <path d="M100 20 L140 60" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                     <path d="M60 60 L100 100" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                     <path d="M140 60 L100 100" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                 </svg>
                 <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 bg-indigo-900 border border-indigo-500 rounded-full w-8 h-8 flex items-center justify-center text-[7px] text-white font-bold">P(Rate)</motion.div>
                 <motion.div className="absolute top-1/2 -translate-y-1/2 left-[20%] bg-indigo-900/50 border border-indigo-500/50 rounded-full w-6 h-6 flex items-center justify-center text-[6px] text-indigo-200">Err</motion.div>
                 <motion.div className="absolute top-1/2 -translate-y-1/2 right-[20%] bg-indigo-900/50 border border-indigo-500/50 rounded-full w-6 h-6 flex items-center justify-center text-[6px] text-indigo-200">Delay</motion.div>
                 <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-900 border border-blue-400 rounded-full w-10 h-10 flex flex-col items-center justify-center text-[7px] text-white font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    Result
                 </motion.div>
            </div>
        </div>
    );
};

const BoxPlotVisual = () => {
    return (
        <div className="h-32 w-full relative mb-4 bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden p-4 flex items-center justify-around">
            <div className="absolute top-2 left-3 text-[10px] text-teal-300 font-mono tracking-wider">MODULE: STATISTICAL DIST.</div>
            {/* 3 Box Plots */}
            {[1, 2, 3].map((id, index) => (
                <div key={id} className="relative h-full w-12 flex flex-col items-center justify-center pt-4">
                    {/* Whiskers (Line) */}
                    <motion.div 
                        className="absolute w-[1px] bg-teal-500/50"
                        initial={{ height: 0, top: "50%" }}
                        animate={{ height: "80%", top: "15%" }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                    />
                    {/* Top Cap */}
                    <motion.div className="absolute w-3 h-[1px] bg-teal-400 top-[15%]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: index * 0.2 + 0.5 }} />
                    {/* Bottom Cap */}
                    <motion.div className="absolute w-3 h-[1px] bg-teal-400 bottom-[5%]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: index * 0.2 + 0.5 }} />
                    
                    {/* The Box (IQR) */}
                    <motion.div 
                        className="relative w-6 bg-teal-500/20 border border-teal-400 z-10"
                        initial={{ height: 0 }}
                        animate={{ height: ["20%", "40%", "30%"] }} // Fluctuating distribution
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.3 }}
                    >
                        {/* Median Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-teal-200" />
                    </motion.div>

                    {/* Outliers (Dots) */}
                    <motion.div 
                        className="absolute w-1 h-1 rounded-full bg-teal-200 top-[10%]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 + 1 }}
                    />
                </div>
            ))}
        </div>
    );
};

const PredictionVisual = () => {
    return (
        <div className="h-32 w-full relative mb-4 bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden p-4 flex flex-col justify-end">
            <div className="absolute top-2 left-3 text-[10px] text-green-300 font-mono tracking-wider">MODULE: PREDICTIVE FORECAST</div>
            <div className="relative w-full h-20">
                <svg className="w-full h-full overflow-visible">
                    <motion.path 
                        d="M0 80 Q 40 70, 80 40 T 160 30 T 240 50 T 320 10" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path 
                        d="M0 80 Q 40 70, 80 40 T 160 30 T 240 50 T 320 10 V 100 H 0 Z" 
                        fill="url(#gradientGreen)" 
                        opacity="0.2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 1, delay: 1 }}
                    />
                    <defs>
                        <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

interface AIProps {
  textData?: any;
}

export const EnterpriseAISection = ({ textData }: AIProps) => {
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    // Simulation of AI processing steps (0: Reset, 1: Signal, 2: DL, 3: BN, 4: Box, 5: Pred, 6: Result)
    useEffect(() => {
        if (!isInView) return;

        let interval: NodeJS.Timeout;
        const startTimer = setTimeout(() => {
            setStep(1);
            interval = setInterval(() => {
                setStep((prev) => (prev + 1) % 7);
            }, 3500); 
        }, 800);

        return () => {
            clearTimeout(startTimer);
            if (interval) clearInterval(interval);
        };
    }, [isInView]);

    const content = textData || {
        label: "EXA Engine",
        title: "The Science of Certainty.",
        desc: "Beyond generative text. We build causal inference models that understand 'Why' not just 'What'."
    };

    const chatHistory = [
        { role: 'user', content: "Analyze production delay risk for Order #2291." },
        { role: 'ai', content: "Likelihood of delay: 84.2%. Bottleneck detected at CNC-04." },
        { role: 'ai', action: "Proposed Action: Reroute via Line B (Cost +2%, On-time Probability 99%)." }
    ];

    const renderTitle = (title: string) => {
        const lines = title.split('\n');
        const highlightRegex = /(다차원 지능의 결합이)/g;

        const processLine = (text: string) => {
            const parts = text.split(highlightRegex);
            return parts.map((part, i) => {
                if (part === "다차원 지능의 결합이") {
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
        const parts = desc.split(/(딥러닝|베이지안|강화학습|인과관계|지능형 결정 엔진)/g);
        return parts.map((part, i) => {
            if (["딥러닝", "베이지안", "강화학습", "인과관계", "지능형 결정 엔진"].includes(part)) {
                return <span key={i} className="text-gray-950 dark:text-gray-200 font-bold">{part}</span>;
            }
            return part;
        });
    };

    return (
        <section ref={containerRef} className="py-24 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-screen-2xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Visual Representation (Chat Console & Graph) - Encapsulated */}
                <div className="lg:w-1/2 w-full flex justify-center order-2 lg:order-1">
                    <div className="relative w-full max-w-lg">
                        {/* Decorative Blob */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 blur-3xl opacity-50 rounded-full pointer-events-none" />
                        
                        {/* The Console Card */}
                        <div className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10 h-[450px] md:h-[600px] flex flex-col">
                            
                            {/* Header */}
                            <div className="h-12 bg-gray-800/50 border-b border-white/5 flex items-center px-5 gap-2 flex-shrink-0">
                                 <div className="flex gap-2">
                                    <motion.div 
                                        className="w-3 h-3 rounded-full bg-red-500" 
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                                    />
                                    <motion.div 
                                        className="w-3 h-3 rounded-full bg-yellow-500" 
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2, delay: 0.6, ease: "easeInOut" }}
                                    />
                                    <motion.div 
                                        className="w-3 h-3 rounded-full bg-green-500" 
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2, delay: 1.2, ease: "easeInOut" }}
                                    />
                                 </div>
                                 <div className="ml-auto text-[10px] text-gray-400 font-mono tracking-wider opacity-70">EXA-AGENT-V4 CONNECTED</div>
                            </div>
    
                            {/* Chat Interface */}
                            <div className="flex-1 p-6 space-y-4 font-mono text-sm overflow-y-auto relative custom-scrollbar">
                                 
                                 <motion.div 
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                                    className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 text-gray-200 self-start max-w-[90%]"
                                 >
                                    <div className="flex items-center gap-2 mb-1 text-xs text-blue-400 font-bold mb-2">
                                        <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px]">U</div>
                                        USER
                                    </div>
                                    {chatHistory[0].content}
                                 </motion.div>
    
                                 <AnimatePresence mode='wait'>
                                    {step === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="ml-auto w-[90%] bg-blue-900/10 p-4 rounded-2xl border border-blue-500/20 text-blue-200">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>SIGNAL PROCESSING</div>
                                            <SignalVisual />
                                            <div className="text-[10px] opacity-70">Acquiring real-time sensor streams...</div>
                                        </motion.div>
                                    )}
                                    {step === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="ml-auto w-[90%] bg-purple-900/10 p-4 rounded-2xl border border-purple-500/20 text-purple-200">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-400"><div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"/>DEEP LEARNING</div>
                                            <NeuralNetworkVisual />
                                            <div className="text-[10px] opacity-70">Recognizing anomaly patterns...</div>
                                        </motion.div>
                                    )}
                                    {step === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="ml-auto w-[90%] bg-indigo-900/10 p-4 rounded-2xl border border-indigo-500/20 text-indigo-200">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-400"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"/>BAYESIAN CAUSALITY</div>
                                            <BayesianNetworkVisual />
                                            <div className="text-[10px] opacity-70">Inferring root cause probabilities...</div>
                                        </motion.div>
                                    )}
                                    {step === 4 && (
                                        <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="ml-auto w-[90%] bg-teal-900/10 p-4 rounded-2xl border border-teal-500/20 text-teal-200">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-teal-400"><div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"/>STATISTICAL ANALYSIS</div>
                                            <BoxPlotVisual />
                                            <div className="text-[10px] opacity-70">Computing quartile distributions...</div>
                                        </motion.div>
                                    )}
                                    {step === 5 && (
                                        <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="ml-auto w-[90%] bg-green-900/10 p-4 rounded-2xl border border-green-500/20 text-green-200">
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-green-400"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>PREDICTIVE MODELING</div>
                                            <PredictionVisual />
                                            <div className="text-[10px] opacity-70">Forecasting production impact...</div>
                                        </motion.div>
                                    )}
                                    {step === 6 && (
                                        <motion.div key="step6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 ml-auto w-[90%]">
                                            <div className="bg-gray-800 p-4 rounded-2xl rounded-tr-none border border-gray-700 text-gray-200">
                                                <div className="text-xs text-green-400 font-bold mb-2">ANALYSIS COMPLETE</div>
                                                {chatHistory[1].content}
                                            </div>
                                            <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-400/30 text-white font-bold text-sm shadow-lg flex gap-3 items-center">
                                                 <div className="p-2 bg-blue-600 rounded-lg"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                                                 <div>
                                                     <div className="text-[10px] text-blue-300 uppercase">Recommended Action</div>
                                                     {chatHistory[2].action}
                                                 </div>
                                            </div>
                                        </motion.div>
                                    )}
                                 </AnimatePresence>
                            </div>
    
                            <div className="p-4 border-t border-white/5 bg-white/5 flex gap-3 items-center backdrop-blur-md flex-shrink-0">
                                <div className="flex-1 bg-black/40 rounded-full h-10 border border-white/5 px-4 flex items-center text-xs text-gray-500">
                                    Type your query...
                                </div>
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors cursor-pointer">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">{content.label}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.3] md:leading-[1.5] whitespace-normal break-all md:whitespace-pre-line md:break-keep mb-8 md:mb-10 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-gray-100 dark:to-gray-400">
                        {renderTitle(content.title)}
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-[1.9] max-w-xl font-medium whitespace-normal break-all md:whitespace-pre-line md:break-keep opacity-90">
                        {renderDesc(content.desc)}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full">
                        {[
                            { name: 'Generative AI', desc: 'Natural Language Insight' },
                            { name: 'Deep Learning', desc: 'Pattern Recognition' },
                            { name: 'Reinforcement Learning', desc: 'Strategic Optimization' },
                            { name: 'Bayesian Networks', desc: 'Probabilistic Reasoning' }
                        ].map((item) => (
                            <div key={item.name} className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors group">
                                <div className="text-blue-700 dark:text-blue-400 font-bold mb-1 group-hover:text-blue-600 transition-colors">{item.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
