"use client";
import React from 'react';
import { sortPosts } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import Link from 'next/link';
import Image from '@/components/shared/Image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { MainPageSection } from '@/components/shared/MainPageSection';
import { TagBar } from '@/components/shared/TagBar';
import { siteConfig } from '@/data/config/site.settings';
import { EnterpriseHero } from '@/components/shared/EnterpriseHero';
import { EnterpriseShowcase } from '@/components/shared/EnterpriseShowcase';
import { EnterpriseERPSection } from '@/components/shared/EnterpriseERPSection'; // Section 2
import { EnterpriseAISection } from '@/components/shared/EnterpriseAISection';   // Section 3
import { EnterpriseBentoGrid } from '@/components/shared/EnterpriseBentoGrid';   // Section 4
import { EnterpriseBlogHeroSection } from '@/components/shared/EnterpriseBlogHeroSection'; // Section 5
import { EnterpriseEXAWinSection } from '@/components/shared/EnterpriseEXAWinSection';   // Section 6
import { EnterpriseEndToEnd } from '@/components/shared/EnterpriseEndToEnd';             // Section 8
import { ScrollProgressBar } from '@/components/shared/ScrollProgressBar';
import { mainPageData } from '@/components/shared/mainPageData';

interface MainPageProps {
  locale?: string;
}

export const MainPage = ({ locale = siteConfig.defaultLocale }: MainPageProps) => {
  const currentLocale = locale.toLowerCase();
  
  const posts = sortPosts(allBlogs).map(post => {
    const authorSlug = post.authors?.[0] || 'default';
    const authorDoc = allAuthors.find(a => a.slug === authorSlug) || allAuthors.find(a => a._raw.flattenedPath === `authors/${authorSlug}`);
    return {
      ...post,
      author: authorDoc ? { name: authorDoc.name, avatar: authorDoc.avatar } : { name: 'EXA Team' }
    };
  });
  
  const t = mainPageData[currentLocale] || mainPageData['en'];

  const latestPosts = posts.filter((post) => {
    // sourceFilePath: e.g. "posts/ko/Bayesian/bayesian-1-odds.mdx"
    const filePath = post._raw.sourceFilePath.toLowerCase();
    const pathParts = filePath.split('/');
    const safeLocale = currentLocale.toLowerCase();
    
    // 1. Strict Locale Folder Check (posts/{locale}/)
    const isCorrectLanguage = pathParts[0] === 'posts' && pathParts[1] === safeLocale;
    if (!isCorrectLanguage) return false;

    // 2. Strict Docs Folder Exclusion (User Manual)
    const isDocs = pathParts.includes('docs');
    if (isDocs) return false;
    
    return true;
  }).slice(0, 5);

  const allTags = posts
    .filter((post) => {
        const filePath = post._raw.sourceFilePath.toLowerCase();
        const pathParts = filePath.split('/');
        const safeLocale = currentLocale.toLowerCase();
        
        // 1. Strict Locale Folder Check
        const isCorrectLanguage = pathParts[0] === 'posts' && pathParts[1] === safeLocale;
        if (!isCorrectLanguage) return false;

        // 2. Strict Docs Folder Exclusion
        const isDocs = pathParts.includes('docs');
        if (isDocs) return false;
        
        return true;
    })
    .map(post => post.tags?.[0])
    .filter((tag): tag is string => !!tag);
  const uniqueTags = Array.from(new Set(allTags));

  return (
    <div className="relative flex flex-col w-full items-center bg-white dark:bg-gray-950 pt-[120px] lg:pt-0 transition-colors duration-500">
      <ScrollProgressBar />
      
      {/* Background Layer (Pure white in light mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none" />

      <Header />
      
      {/* SECTION 1: HERO */}
      <EnterpriseHero textData={t.hero} />
      
      {/* SECTION 2: PROCESS ENGINE (Synchronized Execution) */}
      <div className={`w-full relative z-10 ${['ko', 'ja', 'zh'].includes(currentLocale) ? 'mt-12 md:mt-16' : 'mt-24 md:mt-32'}`}>
         <EnterpriseERPSection textData={t.erpSection} />
      </div>

      {/* SECTION 3: EXA ENGINE (The Science) */}
      <div className={`w-full relative z-10 ${['ko', 'ja', 'zh'].includes(currentLocale) ? 'mt-24 md:mt-32' : 'mt-24 md:mt-32'}`}>
         <EnterpriseAISection textData={t.aiSection} />
      </div>

      {/* SECTION 4: INTEGRATION (Dual Engine Synergy) */}
      <div className={`w-full bg-white dark:bg-gray-950/50 relative z-10 transition-colors ${['ko', 'ja', 'zh'].includes(currentLocale) ? 'mt-24 md:mt-32' : 'mt-24 md:mt-32'}`}>
        <EnterpriseBentoGrid locale={currentLocale} textData={t.bento} />
      </div>

      {/* SECTION 5: BLOG HERO (EXA Enterprise) */}
      <div className={`w-full relative z-10 ${['ko', 'ja', 'zh'].includes(currentLocale) ? 'mt-24 md:mt-32' : 'mt-24 md:mt-32'}`}>
        <EnterpriseBlogHeroSection textData={t.blogHero}>
             <div className="space-y-8">
                {latestPosts.length > 0 ? (
                <MainPageSection 
                    title="" 
                    posts={latestPosts} 
                    categoryName="RESEARCH" 
                    layout="magazine"
                />
                ) : (
                <div className="py-20 text-center text-gray-500">
                    Intelligence stream loading... (Locale: {currentLocale}, AllBlogs: {allBlogs.length})
                    <br />
                    Debug path: {posts.length > 0 ? posts[0]._raw.sourceFilePath : 'No posts'}
                </div>
                )}

                <div className="flex justify-center pt-8">
                    <Link 
                        href={`/${currentLocale}/all-articles`} 
                        className="group flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                    >
                        {t.blogHero.viewAll}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
             </div>
        </EnterpriseBlogHeroSection>
      </div>

      {/* SECTION 6: EXA WIN (First Product) */}
      <div className={`w-full relative z-10 border-t border-gray-100 dark:border-white/5 ${['ko', 'ja', 'zh'].includes(currentLocale) ? 'mt-24 md:mt-32' : 'mt-24 md:mt-32'}`}>
         <EnterpriseEXAWinSection textData={t.exawin} />
      </div>

      {/* SECTION 7: SHOWCASE (Conclusion) */}
      <div className="w-full max-w-screen-2xl px-6 py-24 mb-12">
        <EnterpriseShowcase textData={t.showcase} />
      </div>

      {/* SECTION 9: TAG EXPLORATION */}
      {/* SECTION 9: TAG EXPLORATION */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 py-20 bg-gray-200 dark:bg-[#080a12] transition-colors">
         <div className="max-w-screen-2xl mx-auto px-0 text-center space-y-8">
            <p className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-[0.4em] px-6">{t.filter.label}</p>
            <TagBar tags={uniqueTags} />
         </div>
      </div>

      <Footer />
    </div>
  );
};
