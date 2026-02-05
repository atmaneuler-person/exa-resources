"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BayesianVisual } from '@/components/shared/BayesianVisual';

export function ExaWinPage({ locale }: { locale: string }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
            <Header />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black" />
                <div className="absolute inset-0 opacity-[0.1]" 
                     style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                />
            </div>

            <main className="relative z-10 pt-32">
                <section className="px-6 max-w-screen-xl mx-auto text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4">
                            EXA Solution Series
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                            The Physics of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-600">
                                Global Sales.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            We replaced "Gut Feeling" with <span className="text-white font-bold">Normalized Sequential Bayesian Inference</span>.
                            <br className="hidden md:block"/>
                            This is how we calculate the <span className="text-orange-400 font-bold">Decision Impedance</span> of your B2B Pipeline.
                        </p>
                    </motion.div>
                </section>

                <section className="py-20 border-y border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-16 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold flex items-center gap-4">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-mono">01</span>
                                    Dealing with Uncertainty
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-lg pl-14">
                                    In B2B sales, information is always noisy. We use <strong className="text-white">Recursive Kalman Updates</strong> to filter out the signal from market noise, constantly refining the probability of a win.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold flex items-center gap-4">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-mono">02</span>
                                    Decision Impedance
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-lg pl-14">
                                    Applying the <strong className="text-white">Weber-Fechner Law</strong>, we model the client's resistance to change. We calculate the <strong className="text-white">Information Entropy</strong> to measure the chaos in the negotiation process.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold flex items-center gap-4">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm font-mono">03</span>
                                    The NSBI Engine
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-lg pl-14">
                                    Unlike static scoring models, our <strong className="text-white">NSBI</strong> engine learns sequentially. Every email, meeting, and delay updates the posterior probability distribution in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-gray-900 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-50 pointer-events-none" />
                            <div className="absolute inset-0 scale-90 md:scale-100 origin-center">
                                <BayesianVisual className="!bg-transparent !shadow-none !border-none" />
                            </div>
                            <div className="absolute top-8 right-8 text-right z-20 mix-blend-difference">
                                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Live Simulation</div>
                                <div className="text-3xl font-mono text-white font-bold tracking-tighter">P(Win | Signal)</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 max-w-screen-xl mx-auto px-6">
                    <h2 className="text-5xl font-black mb-20 text-center tracking-tight">Inside the EXA Decision Kernel v5</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Log-Sigmoid Weights', desc: 'Non-linear weighting of stakeholder influence based on organizational hierarchy.', icon: '∑', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
                            { title: 'Information Entropy', desc: 'Quantifying the ambiguity in client communication. Higher entropy = Lower predictability.', icon: 'H', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                            { title: 'Kalman Filter', desc: 'Predicting the future state of the deal by minimizing the covariance of error.', icon: 'K', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
                        ].map((item) => (
                            <div key={item.title} className={`p-10 rounded-[2rem] bg-gray-900 border ${item.border} hover:border-opacity-50 transition-all group hover:-translate-y-2`}>
                                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center text-3xl font-serif italic ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light text-lg">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-32 text-center border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-orange-600/5 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">Ready to control the chaos?</h2>
                        <button className="px-10 py-5 bg-white text-black text-lg rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95">
                            Request EXAWin Demo
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
