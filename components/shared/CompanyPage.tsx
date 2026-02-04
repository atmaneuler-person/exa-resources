"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ScrollProgressBar } from './ScrollProgressBar';

interface CompanyPageProps {
  locale: string;
  textData: any;
  contactData?: any;
}

export const CompanyPage = ({ locale, textData, contactData }: CompanyPageProps) => {
  return (
    <div className="relative flex flex-col w-full items-center bg-white dark:bg-gray-950 transition-colors duration-500 overflow-x-hidden">
      <ScrollProgressBar />
      <Header />

      {/* 1. Hero: Authoritative Declaration (No Italics) */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden border-b border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
        
        <div className="relative z-10 max-w-screen-2xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-sm md:text-base font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.5em] mb-4 block">
              {textData.label}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.2] max-w-6xl break-keep text-gray-900 dark:text-white"
          >
            {textData.hero.identity}
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="h-[2px] bg-orange-600 mt-16 shadow-[0_0_15px_rgba(234,88,12,0.5)]"
          />
        </div>
      </section>

      {/* 2. The Genesis: Why Business Science? */}
      <section className="relative w-full py-40 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                    <span className="text-sm md:text-base font-black text-orange-600 dark:text-orange-500 tracking-widest uppercase block mb-4">01. THE GENESIS</span>
                    <h2 className="text-4xl font-black tracking-tighter leading-tight text-gray-900 dark:text-white">
                        {textData.genesis.title}
                    </h2>
                </motion.div>
            </div>
            <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10"
                >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-orange-500 pl-6 py-1">
                      {textData.genesis.subtitle}
                    </h3>
                    <div className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line break-keep font-light max-w-3xl">
                        {textData.genesis.content}
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 3. The Foundation: Enterprise Governance Architecture */}
      <section className="relative w-full py-40 px-6 bg-gray-50 dark:bg-black/80 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-12 mb-16">
                 <span className="text-sm md:text-base font-black text-blue-600 dark:text-blue-500 tracking-widest uppercase block mb-4 text-center">02. THE FOUNDATION</span>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-6 space-y-10"
            >
                <div className="space-y-4 text-left">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-gray-900 dark:text-white">{textData.foundation.title}</h2>
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{textData.foundation.subtitle}</h3>
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line break-keep font-light">
                    {textData.foundation.content}
                </div>
            </motion.div>

            <div className="lg:col-span-6 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-orange-600/10 blur-[100px] opacity-30" />
                 <div className="relative border border-gray-200 dark:border-white/10 rounded-[2rem] p-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-2xl overflow-hidden group">
                     {/* Schematic Watermark */}
                     <div className="absolute top-4 right-6 text-[9px] font-mono text-gray-300 dark:text-gray-600 select-none tracking-widest">EXA_PROTOCOL_V4.0</div>
                     
                     <div className="flex flex-col space-y-12 relative z-10">
                         {/* Process Engine Block */}
                         <div className="relative p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 flex items-center gap-6">
                             <div className="min-w-[64px] h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-500/20">P</div>
                             <div>
                                 <h4 className="font-black text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400">Process Engine</h4>
                                 <p className="text-[10px] text-gray-500 font-mono mt-1">// SCM Optimization & Flow Dynamics</p>
                             </div>
                         </div>
                         
                         {/* The Core Synergy Indicator */}
                         <div className="flex justify-center -my-8 relative z-20">
                             <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="px-6 py-2 rounded-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl ring-8 ring-white dark:ring-gray-900"
                             >
                                 Unified Kernel
                             </motion.div>
                         </div>

                         {/* EXA Engine Block (Unified Kernel Internal) */}
                         <div className="relative p-6 rounded-2xl bg-white dark:bg-black/40 border border-orange-500/30 flex items-center gap-6 shadow-xl shadow-orange-500/5">
                             <div className="min-w-[64px] h-16 rounded-xl bg-orange-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-500/20">E</div>
                             <div>
                                 <h4 className="font-black text-sm uppercase tracking-widest text-orange-600 dark:text-orange-400">EXA Engine</h4>
                                 <p className="text-[10px] text-gray-500 font-mono mt-1 mb-2">// Intrinsic Risk Mgmt & Governance</p>
                                 <div className="flex flex-wrap gap-1.5 mt-2">
                                     <span className="text-[8px] px-1.5 py-0.5 rounded-sm border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono font-bold tracking-tighter uppercase leading-none">Risk Control</span>
                                     <span className="text-[8px] px-1.5 py-0.5 rounded-sm border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono font-bold tracking-tighter uppercase leading-none">Decision Core</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
      </section>

      {/* 4. Laboratory Spirit: The R&D Heart */}
      <section className="relative w-full py-40 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                    <span className="text-sm md:text-base font-black text-gray-400 dark:text-gray-600 tracking-widest uppercase block mb-4">03. THE SPIRIT</span>
                    <h2 className="text-4xl font-black tracking-tighter leading-tight text-gray-900 dark:text-white">
                        {textData.spirit.title}
                    </h2>
                </motion.div>
            </div>
            <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10"
                >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-300 border-l-4 border-gray-950 dark:border-white pl-6 py-1 leading-none">
                        {textData.spirit.subtitle}
                    </h3>
                    <div className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line break-keep font-light max-w-3xl">
                        {textData.spirit.content}
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 5. Contact Us: Integrated Call to Action */}
      {contactData && (
        <section className="relative w-full py-32 px-6 bg-gray-950 dark:bg-black overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.2),transparent_70%)]" />
          </div>
          
          <div className="relative z-10 max-w-screen-xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8 text-left">
                   <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                   >
                      <span className="text-sm font-black text-orange-500 tracking-[0.3em] uppercase block">Connect with EXA</span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-white break-keep">
                        {contactData.title}
                      </h2>
                      <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                        {contactData.subtitle}
                      </p>
                   </motion.div>

                   <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10"
                   >
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.info.hq}</p>
                        <p className="text-sm font-bold text-white">{contactData.info.address}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{contactData.info.email}</p>
                        <p className="text-sm font-bold text-white">contact@atmaneuler.com</p>
                      </div>
                   </motion.div>
                </div>

                <div className="lg:col-span-5">
                   <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl"
                   >
                      <form className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.name}</label>
                          <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.email}</label>
                          <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.message}</label>
                          <textarea rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
                        </div>
                        <button type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] shadow-lg shadow-orange-600/20">
                          {contactData.form.submit}
                        </button>
                      </form>
                   </motion.div>
                </div>
             </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};
