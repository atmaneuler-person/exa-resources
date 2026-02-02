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
    return pathParts.includes(currentLocale.toLowerCase());
  }).slice(0, 10);

  // --- Extract Unique Sub-Category Tags (First Tag of each post) ---
  const allTags = posts
    .filter((post) => {
        const lowerPath = post.path.toLowerCase();
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
    'Solution', 
    'Documentation'
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
      <TagBar tags={uniqueTags} />

      <EnterpriseHero />

      <div className="relative z-10 w-full max-w-screen-2xl px-4 py-8 space-y-12">
        
        {/* === TOP SECTION: LATEST STORIES (All Categories) === */}
        {latestPosts.length > 0 && (
          <MainPageSection 
            title="" 
            posts={latestPosts} 
            categoryName="LATEST"
            layout="magazine"
          />
        )}


        {/* === BANNER SECTION === */}
        <div className="w-full mb-12 relative group">
          {/* Banner Image (Links to Home) */}
          <Link href="/" className="block relative overflow-hidden rounded-2xl">
            <Image 
              src="/static/images/home-banner.png" 
              alt="Home Banner" 
              width={1400} 
              height={300} 
              priority
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Dark Overlay for better text readability (optional, light) */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
          </Link>

          {/* "Go to EXA" Overlay Button */}
          <a 
            href="https://atmaneuler.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 px-6 py-2.5 
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

        {/* === CATEGORY SECTIONS === */}
        {categories.map((category, index) => {
          
          // Strict Filtering Logic
          const categoryPosts = posts.filter((post) => {
            const lowerPath = post.path.toLowerCase();
            const pathParts = lowerPath.split('/');
            if (!pathParts.includes(currentLocale.toLowerCase())) return false;
            if (pathParts.includes(category.toLowerCase())) return true;
            return false;
          });

          return (
             <React.Fragment key={category}>
                <MainPageSection 
                    title={category}
                    posts={categoryPosts.slice(0, 12)} 
                    linkTo={currentLocale === siteConfig.defaultLocale ? `/category/${category}` : `/${currentLocale}/category/${category}`}
                    categoryName={category}
                />
                
                {/* 
                   Visual Break Logic: 
                   Show EnterpriseShowcase after 'AI' section
                   Show EnterpriseBentoGrid after 'Solution' section
                */}
                {category === 'AI' && <EnterpriseShowcase />}
                {category === 'Solution' && <EnterpriseBentoGrid />}
             </React.Fragment>
          );
        })}

      </div>

      <Footer />
    </div>
  );
};
