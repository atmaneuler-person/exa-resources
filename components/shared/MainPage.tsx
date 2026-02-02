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
import { EnterpriseBentoGrid } from '@/components/shared/EnterpriseBentoGrid';
import { ScrollProgressBar } from '@/components/shared/ScrollProgressBar';





interface MainPageProps {
  locale?: string;
}

export const MainPage = ({ locale = siteConfig.defaultLocale }: MainPageProps) => {
  // Ensure posts are sorted by date (DESC) accurately
  const posts = sortPosts(allBlogs).map(post => {
    const authorSlug = post.authors?.[0] || 'default';
    const authorDoc = allAuthors.find(a => a.slug === authorSlug) || allAuthors.find(a => a._raw.flattenedPath === `authors/${authorSlug}`);
    return {
      ...post,
      author: authorDoc ? { name: authorDoc.name, avatar: authorDoc.avatar } : { name: 'EXA Team' }
    };
  });
  const currentLocale = locale;

  // 1. Get Top 4 Latest Posts (Mixed Categories) for this locale
  const latestPosts = posts.filter((post) => {
    const lowerPath = post.path.toLowerCase();
    const pathParts = lowerPath.split('/');
    // Exclude Documentation from Latest Posts
    if (pathParts.includes('documentation')) return false;
    return pathParts.includes(currentLocale.toLowerCase());
  }).slice(0, 10);

  // --- Extract Unique Sub-Category Tags (First Tag of each post) ---
  const allTags = posts
    .filter((post) => {
        const lowerPath = post.path.toLowerCase();
        if (lowerPath.includes('documentation')) return false;
        return lowerPath.includes(currentLocale.toLowerCase());
    })
    .map(post => post.tags?.[0]) // Get first tag
    .filter((tag): tag is string => !!tag); // Remove undefined/null

  const uniqueTags = Array.from(new Set(allTags));

  const categories = [
    'Bayesian',
    'AI',
    'Business',
    'Science', 
    'Solution'
  ];

  return (
    <div className="relative flex flex-col w-full items-center bg-white dark:bg-gray-950 pt-[120px] lg:pt-0">
      <ScrollProgressBar />
      
      {/* Global Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:hidden"
           style={{ 
             backgroundImage: `radial-gradient(#808080 0.5px, transparent 0.5px)`,
             backgroundSize: '24px 24px' 
           }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block opacity-[0.12]"
           style={{ 
             backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
             backgroundSize: '24px 24px' 
           }}
      />

      <Header />
      
      {/* 1. HERO SECTION: The Breathing Logic */}
      <EnterpriseHero />

      {/* 2. HIGH-LEVEL VISION: Unified Ecosystem */}
      <div className="w-full max-w-screen-2xl px-6">
        <EnterpriseShowcase />
      </div>

      {/* RESTORED: EXA Enterprise Platform Logic Banner */}
      <div className="w-full max-w-screen-2xl px-6 py-8 relative group">
          <Link href="/" className="block relative overflow-hidden rounded-2xl">
            <Image 
              src="/static/images/home-banner.png" 
              alt="EXA Enterprise Platform Logic" 
              width={1400} 
              height={300} 
              priority
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
          </Link>

          {/* "Go to EXA" Overlay Button */}
          <a 
            href="https://atmaneuler.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 left-12 md:bottom-10 md:left-16 z-10 px-6 py-2.5 
                       bg-white/10 backdrop-blur-md border border-white/20 
                       text-white font-medium tracking-wide rounded-full 
                       shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 
                       transition-all duration-300 flex items-center gap-2 group/btn"
          >
            <span>Go to EXA</span>
            <svg className="w-4 h-4 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
      </div>

      {/* 3. PRODUCT DEEP DIVE: EXAWin & Capabilities */}
      <EnterpriseBentoGrid locale={currentLocale} />

      {/* 4. RESEARCH & INSIGHTS: Curated Feed */}
      <div className="relative z-10 w-full max-w-screen-2xl px-6 py-24 space-y-12 border-t border-gray-100 dark:border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-orange-500" />
                    <span className="text-sm font-bold uppercase tracking-[0.4em] text-orange-600">
                        Knowledge Hub
                    </span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                    Latest Research & Insights
                </h3>
            </div>

            <Link 
                href="/all-articles" 
                className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
            >
                View All Articles
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>

        {latestPosts.length > 0 ? (
          <MainPageSection 
            title="" 
            posts={latestPosts.slice(0, 6)} 
            categoryName="RESEARCH"
            layout="magazine"
          />
        ) : (
          <div className="py-20 text-center text-gray-500">
             No research articles found.
          </div>
        )}
      </div>

      {/* 5. TAG EXPLORATION (Bottom Navigation) */}
      <div className="w-full border-t border-gray-100 dark:border-white/5 py-12 bg-gray-50/50 dark:bg-black/20">
         <div className="max-w-screen-2xl mx-auto px-6 text-center space-y-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Explore Intelligence by Topic</p>
            <TagBar tags={uniqueTags} />
         </div>
      </div>

      <Footer />
    </div>
  );
};
