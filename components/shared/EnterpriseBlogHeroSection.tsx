"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children?: React.ReactNode;
  textData?: any;
}

export const EnterpriseBlogHeroSection = ({ children, textData }: Props) => {
    const content = textData || {
        label: "Intelligence Stream",
        title: "EXA Business Science Lab",
        subtitle: "Enterprise Platform Logic & Documentation",
        desc: "We explore the Physics of Business. Translating high-dimension chaos into clear, actionable Low-Dimension Decisions."
    };

    const renderTitle = (title: string) => {
        const highlightRegex = /(EXA|Business Science Lab)/g;
        const parts = title.split(highlightRegex);
        return parts.map((part, i) => {
            if (part === "EXA") {
                return <span key={i} className="font-black text-gray-950 dark:text-white">{part}</span>;
            }
            if (part === "Business Science Lab") {
                return (
                    <span key={i} className="relative inline-block ml-4">
                         <span className="relative z-10 font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 dark:from-orange-400 dark:via-orange-300 dark:to-amber-200">
                             {part}
                         </span>
                         <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: '100%', opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                            className="absolute -bottom-2 left-0 h-[30%] bg-orange-500/10 dark:bg-orange-400/10 -z-0 rounded-sm"
                         />
                    </span>
                );
            }
            return <span key={i} className="font-medium text-gray-900/40 dark:text-white/20">{part}</span>;
        });
    };

    const renderSubtitle = (subtitle: string) => {
        return subtitle.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
        ));
    };

    const renderDesc = (desc: string) => {
        const parts = desc.split(/(비즈니스의 과학|불확실성의 혼돈|의사결정|Physics of Business|High-dimension chaos|Low-Dimension Decisions)/g);
        return parts.map((part, i) => {
            if (["비즈니스의 과학", "불확실성의 혼돈", "의사결정", "Physics of Business", "High-dimension chaos", "Low-Dimension Decisions"].includes(part)) {
                return <span key={i} className="text-gray-950 dark:text-white font-bold">{part}</span>;
            }
            return part;
        });
    };

    return (
        <section className="relative w-full bg-white dark:bg-gray-950 py-32 border-t border-gray-100 dark:border-white/5 transition-colors duration-500 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-6">
                
                {/* PREMIUM HEADER LAYOUT */}
                <div className="mb-32 flex flex-col gap-20">
                    <div className="space-y-8 w-full">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[2px] w-12 bg-orange-500" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-orange-600 dark:text-orange-400">
                                {content.label}
                            </span>
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black tracking-tightest leading-none flex flex-wrap items-center">
                            {renderTitle(content.title)}
                        </h2>
                    </div>
                    
                    <div className="w-full flex justify-end">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-2xl space-y-8 text-right lg:text-left lg:pl-32"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-400 dark:text-gray-600 tracking-tight leading-tight">
                                {renderSubtitle(content.subtitle)}
                            </h3>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                 {renderDesc(content.desc)}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* The Content (Blog List) goes here */}
                <div>
                    {children}
                </div>

            </div>
        </section>
    );
};
