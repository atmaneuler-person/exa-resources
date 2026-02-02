"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Database, ShieldCheck, Zap, TrendingUp, Cpu, Network, Bot } from 'lucide-react';

export const EnterpriseBentoGrid = () => {
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
                                    <Briefcase size={36} />
                                </div>
                                <h4 className="text-3xl font-black text-gray-900 dark:text-gray-300 mb-4">Probabilistic Decision Logic</h4>
                                <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm font-medium">
                                    Integrating Bayesian inference directly into ERP workflows to filter market noise and drive unrefutable strategic choices.
                                </p>
                            </div>

                            {/* SaaS Product Teaser - Sales Forecaster */}
                            <div className="mt-12 p-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-orange-500/20 backdrop-blur-sm relative group/saas">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em]">SaaS Solution</span>
                                        <h5 className="text-lg font-bold text-gray-900 dark:text-gray-300 leading-tight">Sales Win-Rate <br/>Forecaster</h5>
                                    </div>
                                    <div className="px-2 py-1 bg-orange-100 dark:bg-orange-600/20 rounded text-[9px] font-bold text-orange-600 dark:text-orange-400">COMING SOON</div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Advanced SaaS tool to calculate deal-closing probabilities using Bayesian logic. 
                                </p>
                                
                                <div className="relative inline-block group/tooltip">
                                     {/* Coming Soon Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                        Beta Registration Opening Soon
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                    </div>

                                    <button disabled className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-xs font-bold rounded-xl opacity-50 cursor-not-allowed flex items-center gap-2">
                                        Launch Beta
                                        <TrendingUp size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Visual Logic Map - Business Trend Style */}
                        <div className="relative mt-12 h-44 border-t border-gray-100 dark:border-white/5 pt-10 flex items-end justify-between px-2">
                            {[45, 60, 40, 85, 55, 95, 75].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                                    className="w-[12%] bg-gradient-to-t from-orange-600 to-gray-400 dark:to-gray-700 rounded-t-lg relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-mono font-bold text-orange-600 transition-opacity whitespace-nowrap">
                                        FACT v{i}.0
                                    </div>
                                </motion.div>
                            ))}
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
                                <h4 className="text-2xl font-black text-gray-900 dark:text-gray-300 tracking-tight">
                                    ERP-Native GAI
                                </h4>
                            </div>
                            <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Beyond simple chat. Our GAI agents reason directly over your <span className="text-orange-600 dark:text-orange-500 font-bold">ERP structured databases</span>, translating complex SQL-level insights into strategic natural language.
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                             <div className="grid grid-cols-3 gap-2 w-32">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-500 rounded-sm" />
                                ))}
                             </div>
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
                            <h4 className="text-xl font-black text-gray-900 dark:text-gray-300 uppercase tracking-tighter">Deep Neural Hub</h4>
                            <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">The ML/DL Nexus</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium relative z-10">
                            The computational engine unifying <span className="dark:text-white">Bayesian Probability</span>, <span className="dark:text-white">GAI Reasoning</span>, and <span className="dark:text-white">RL Strategies</span> into a single neural matrix.
                        </p>
                        {/* Subtle background connection lines effect */}
                        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" />
                                <line x1="90" y1="10" x2="100" y2="90" stroke="currentColor" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" />
                            </svg>
                        </div>
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
                        <span className="text-xl font-black text-gray-900 dark:text-gray-300">RL</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 text-center">Resource Optimization</span>
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
                                <h4 className="text-2xl font-black tracking-tight">Enterprise Sovereignty</h4>
                            </div>
                            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[320px] font-medium leading-relaxed">
                                Aligning AI logic with corporate governance, ensuring ethical compliance and absolute data security.
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-4 text-orange-500/50">
                             <Briefcase size={40} className="opacity-20 translate-x-4" />
                             <Database size={60} className="opacity-40" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
