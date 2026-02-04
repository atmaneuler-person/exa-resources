'use client';

import { usePathname } from 'next/navigation';
import { slug } from 'github-slugger';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { allAuthors } from 'contentlayer/generated'; // Import allAuthors
import SectionContainer from '@/components/shared/SectionContainer';
import PostCard from '@/components/shared/PostCard';
import Link from '@/components/shared/Link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config/site.settings';
import tagData from 'app/tag-data.json';
import { ProductBanner } from '@/components/shared/ProductBanner';
import { TrendingUp } from 'lucide-react';

interface InternalPost {
  path: string;
  slug: string;
  date: string;
  title: string;
  summary?: string;
  tags?: { url: string; text: string }[];
  images?: string[];
  readingTime?: string;
  author: { name: string; avatar?: string };
}

const BLOG_URL = siteConfig.blogPath ? `/${siteConfig.blogPath}` : '/';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          
          // Construct the link correctly:
          // If the path already has a page, we need to replace it or append it.
          // However, in this app's structure, pagination is handled by searchParams usually,
          // OR by path like /category/AI/page/2.
          // Let's check how the Page component handles it.
          // Based on app/[...slug]/page.tsx line 143, it uses searchParams.page.
          
          const link = page === 1 ? pathname : `${pathname}?page=${page}`;
          
          return isCurrent ? (
            <span
              key={page}
              className="px-3 py-1 bg-primary-500 text-white rounded-md font-bold"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={link}
              className="px-3 py-1 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              {page}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Compute Category Counts
  const categoryCounts = posts.reduce((acc, post) => {
    const pathParts = post.path.split('/');
    // Assuming path: posts/locale/Category/Slug.
    // We want index 2.
    if (pathParts.length > 2) {
      const category = pathParts[2];
      // Exclude Documentation from the Menu list if desired, or keep it.
      // User asked to exclude it in Footer, but sidebar usually shows all content or navigation.
      // Given "Topic이 아니고 메뉴(키데고리) 리스트가 보여주고", I'll list all found categories EXCEPT Documentation if it's considered a separate resource.
      // But typically "Blog" sidebar filters blog posts. If Documentation is in posts, it might be here.
      // I'll include it for now, unless explicit exclusion.
      // Actually user said "below documentation excluded menus...".
      // I will include all categories found in the blog list.
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const categoryKeys = Object.keys(categoryCounts).sort();

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  if (displayPosts.length === 0) {
    return (
      <div className="flex flex-col gap-1 p-6 mb-10">
        <h2 className="text-4xl">No posts found</h2>
        <p>Please check back later!</p>
      </div>
    );
  }

  const formattedPosts = displayPosts.map((post): InternalPost => {
    return {
      path: `/${post.path}`,
      slug: post.slug || '',
      date: formatDate(post.date, siteConfig.locale),
      title: post.title,
      summary: post.summary,
      tags: post.tags?.map((tag) => {
        return {
          url: `/tags/${slug(tag)}`,
          text: tag,
        };
      }),
      images: post.images || [],
      readingTime: post.readingTime?.text || '',
      author: (() => {
        const authorSlug = post.authors?.[0] || 'default';
        const authorData = allAuthors.find((a) => a.slug === authorSlug);
        return {
          name: authorData?.name || 'EXA Team',
          avatar: authorData?.avatar,
        };
      })(),
    };
  });

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{ 
                backgroundImage: `linear-gradient(to right, #80808060 1px, transparent 1px), linear-gradient(to bottom, #80808060 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
            }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-[400px] bg-orange-500/5 blur-[120px] rounded-full opacity-30" />
      </div>

      <SectionContainer type="wide" className="relative z-10 !max-w-screen-2xl">
        <div className="flex flex-col items-center py-12 space-y-20">
          
          {/* 1. Master Header - Centered Apex */}
          <header className="w-full max-w-5xl space-y-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-orange-600" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-orange-600">Enterprise Intelligence Hub</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.8]">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-800 to-gray-400 dark:from-white dark:via-gray-100 dark:to-gray-400">
                  {title}
              </span>
            </h1>
          </header>

          {/* 2. System Performance Banner - Centered Focus */}
          <div className="w-full max-w-5xl">
            <ProductBanner 
              type={
                title.toLowerCase().includes('bayesian') ? 'bayesian' :
                title.toLowerCase().includes('ai') ? 'gai' :
                title.toLowerCase().includes('enterprise') ? 'enterprise' : 'generic'
              } 
            />
          </div>

          {/* 3. Navigation & Filtering - Integrated Horizontal Bar */}
          <div className="sticky top-16 z-40 w-full py-4 bg-gray-950/95 backdrop-blur-md border-b border-white/5 shadow-xl transition-all duration-300">
            <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Categories as main filters */}
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <TrendingUp size={14} className="text-orange-600" />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {categoryKeys.map((c) => {
                            const possibleLocale = pathname.split('/')[1];
                            const currentLocale = siteConfig.locales.includes(possibleLocale) 
                                ? possibleLocale 
                                : (siteConfig.defaultLocale || 'ko');
                            const href = `/${currentLocale}/category/${c}`.replace(/\/+/g, '/');
                            
                            return (
                                <Link
                                    key={c}
                                    href={href}
                                    className={cn(
                                        "whitespace-nowrap px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all border",
                                        pathname.includes(`/category/${c}`)
                                            ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/20"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10"
                                    )}
                                >
                                    {c}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Vertical Divider in desktop */}
                <div className="hidden md:block w-px h-6 bg-white/10" />

                {/* Tags as secondary filters */}
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl overflow-x-auto no-scrollbar">
                    {sortedTags.slice(0, 10).map((t) => {
                        const tagSlug = slug(t);
                        const isActive = pathname.includes(`/tags/${tagSlug}`);
                        
                        const possibleLocale = pathname.split('/')[1];
                        const currentLocale = siteConfig.locales.includes(possibleLocale) 
                            ? possibleLocale 
                            : (siteConfig.defaultLocale || 'ko');
                        const href = `/${currentLocale}/tags/${tagSlug}`.replace(/\/+/g, '/');

                        return (
                            <Link
                                key={t}
                                href={href}
                                className={cn(
                                    "whitespace-nowrap px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all",
                                    isActive 
                                        ? "bg-orange-600/20 text-orange-500 border border-orange-500/30" 
                                        : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300 border border-transparent"
                                )}
                            >
                                {t}
                            </Link>
                        );
                    })}
                </div>

                {/* All Posts Button for specific categories */}
                {['bayesian', 'ai', 'business', 'science', 'solution'].includes(title.toLowerCase()) && (
                  <div className="ml-auto hidden lg:block">
                      {(() => {
                          const possibleLocale = pathname.split('/')[1];
                          const currentLocale = siteConfig.locales.includes(possibleLocale) 
                              ? possibleLocale 
                              : (siteConfig.defaultLocale || 'ko');
                          
                          return (
                            <Link
                                href={`/${currentLocale}/all-articles`.replace(/\/+/g, '/')}
                                className="flex items-center gap-2 px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-md active:scale-95"
                            >
                                All Posts
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                          );
                      })()}
                  </div>
                )}
            </div>
          </div>

          {/* 4. Main Intelligence Grid - The Real Protagonist */}
          <main className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {formattedPosts.map((post) => (
                <PostCard key={post.path} post={{
                  path: post.path.replace(/^\//, ''),
                  date: post.date,
                  title: post.title,
                  summary: post.summary,
                  images: post.images,
                  tags: post.tags?.map(t => t.text) || [],
                  author: post.author
                }} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-32 pt-16 border-t border-gray-100 dark:border-white/5 flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              </div>
            )}
          </main>

        </div>
      </SectionContainer>
    </div>
  );
}
