"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ScrollProgressBar } from './ScrollProgressBar';

import { CompanyPageData, ContactData } from './types';

interface CompanyPageProps {
  locale: string;
  textData: CompanyPageData;
  contactData?: ContactData;
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
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.2] max-w-6xl break-keep whitespace-pre-line text-gray-900 dark:text-white"
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
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-orange-600/5 blur-[100px] opacity-30" />
                 <div className="relative w-full aspect-[4/3] rounded-[2rem] p-1 bg-gradient-to-br from-gray-200 to-white dark:from-white/10 dark:to-white/5 shadow-2xl overflow-hidden group">
                     {/* Inner Dark Container */}
                     <div className="absolute inset-[1px] rounded-[1.9rem] bg-[#0A0A0A] overflow-hidden">
                         {/* Grid Background */}
                         <div className="absolute inset-0 opacity-20" 
                              style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                         />
                         
                         {/* Animated Orbs */}
                         <motion.div 
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 blur-[80px]" 
                         />
                         <motion.div 
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
                            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                            className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-600/20 blur-[80px]" 
                         />

                         {/* Content Container */}
                         <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
                             
                             {/* Header Tech Spec */}
                             <div className="flex justify-between items-start mb-4">
                                 <div className="flex gap-2">
                                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                     <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">System Online</span>
                                 </div>
                                 <div className="text-[9px] font-mono text-gray-600 select-none tracking-widest text-right">
                                     EXA_KERNEL_V4.0<br/>
                                     ARCH_TYPE: DUAL_CORE
                                 </div>
                             </div>

                             {/* ENGINE 1: PROCESS (Physics) */}
                             <div className="relative group/engine">
                                 <div className="absolute inset-0 bg-blue-900/10 border border-blue-500/20 rounded-xl" />
                                 <div className="relative p-5 flex items-center gap-5">
                                     {/* Icon Core */}
                                     <div className="relative justify-center items-center flex w-16 h-16">
                                         <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover/engine:blur-xl transition-all" />
                                         <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl border border-blue-400/30 flex items-center justify-center shadow-lg">
                                             <span className="text-2xl font-black text-white">P</span>
                                         </div>
                                     </div>
                                     {/* Text Info */}
                                     <div className="flex-1">
                                         <div className="flex items-center justify-between mb-1">
                                             <h4 className="font-bold text-sm text-blue-400 tracking-wider">PROCESS ENGINE</h4>
                                             <span className="text-[9px] font-mono text-blue-500/60 border border-blue-500/20 px-1 rounded">PHYSICS</span>
                                         </div>
                                         <p className="text-[11px] text-gray-400 font-mono leading-tight">
                                             APS | DBR Scheduling<br/>
                                             Throughput Optimization
                                         </p>
                                     </div>
                                 </div>
                             </div>

                             {/* CONNECTION LINES (Animated) */}
                             <div className="flex-1 relative flex justify-center items-center py-4">
                                 <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-gray-700 to-orange-500/0" />
                                 <motion.div 
                                    className="relative z-10 px-6 py-2 bg-gray-950 border border-gray-700 rounded-full flex items-center gap-3 shadow-2xl"
                                    animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.1)", "0 0 0px rgba(255,255,255,0)"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                 >
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    <span className="text-[10px] font-black text-white tracking-[0.2em]">UNIFIED KERNEL</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                 </motion.div>
                             </div>

                             {/* ENGINE 2: EXA (Logic) */}
                             <div className="relative group/engine">
                                 <div className="absolute inset-0 bg-orange-900/10 border border-orange-500/20 rounded-xl" />
                                 <div className="relative p-5 flex items-center gap-5">
                                     {/* Icon Core */}
                                     <div className="relative justify-center items-center flex w-16 h-16">
                                         <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-lg group-hover/engine:blur-xl transition-all" />
                                         <div className="relative w-full h-full bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl border border-orange-400/30 flex items-center justify-center shadow-lg">
                                             <span className="text-2xl font-black text-white">E</span>
                                         </div>
                                     </div>
                                     {/* Text Info */}
                                     <div className="flex-1">
                                         <div className="flex items-center justify-between mb-1">
                                             <h4 className="font-bold text-sm text-orange-400 tracking-wider">EXA ENGINE</h4>
                                             <span className="text-[9px] font-mono text-orange-500/60 border border-orange-500/20 px-1 rounded">LOGIC</span>
                                         </div>
                                         <div className="flex gap-2 mt-1.5">
                                             <span className="text-[9px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">Risk Mgmt</span>
                                             <span className="text-[9px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">AI Core</span>
                                         </div>
                                     </div>
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
                      <form 
                        className="space-y-5"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.target as HTMLFormElement;
                          const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                          const email = (form.elements.namedItem('email') as HTMLInputElement).value; // User's email
                          const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                          
                          const subject = `[Business Inquiry] from ${name}`;
                          const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                          
                          window.location.href = `mailto:contact@atmaneuler.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.name}</label>
                          <input name="name" type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.email}</label>
                          <input name="email" type="email" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{contactData.form.message}</label>
                          <textarea name="message" required rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-orange-500 transition-colors text-white text-sm" />
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
