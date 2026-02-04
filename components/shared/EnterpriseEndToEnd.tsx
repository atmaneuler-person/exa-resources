"use client";
import React from 'react';

export const EnterpriseEndToEnd = () => {
    return (
        <section className="bg-gray-900 border-t border-gray-800 py-16">
            <div className="max-w-screen-2xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Left Text */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                        End-to-End Coverage
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                        From strategic planning to financial realization. <br/>
                        A closed-loop system for total enterprise control.
                    </p>
                </div>

                {/* Right Flow Visualization (Chain) */}
                <div className="flex items-center gap-4 lg:gap-8 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
                    
                    {[
                        { id: 1, label: 'PLANNING' },
                        { id: 2, label: 'SOURCING' },
                        { id: 3, label: 'MANUFACTURING' },
                        { id: 4, label: 'LOGISTICS' },
                        { id: 5, label: 'FINANCE', highlight: true }
                    ].map((step, idx, arr) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center gap-3 min-w-[80px]">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg transition-all ${
                                    step.highlight 
                                    ? 'bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                                    : 'bg-gray-800 text-gray-500 border border-gray-700'
                                }`}>
                                    {step.id}
                                </div>
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${
                                    step.highlight ? 'text-orange-500' : 'text-gray-500'
                                }`}>
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector Line */}
                            {idx !== arr.length - 1 && (
                                <div className="h-px w-8 lg:w-16 bg-gray-800" />
                            )}
                        </React.Fragment>
                    ))}

                </div>

            </div>
        </section>
    );
};
