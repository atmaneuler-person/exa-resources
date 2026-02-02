import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { CoreContent, sortPosts, allCoreContent } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import type { Blog, Authors } from 'contentlayer/generated';
import Link from '@/components/shared/Link';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import SectionContainer from '@/components/shared/SectionContainer';
import Image from '@/components/shared/Image';
import Tag from '@/components/blog/Tag'; 
import { siteConfig } from '@/data/config/site.settings';
import ScrollTop from '@/components/shared/ScrollTop';
import PostCard from '@/components/shared/PostCard'; 
import Comments from '@/components/blog/Comments'; 
import { ProductBanner } from '@/components/shared/ProductBanner';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  className?: string;
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  className,
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, date, title, tags } = content;

  // 1. 현재 카테고리 파악 및 관련 글 3개 추출
  const allPosts = allCoreContent(sortPosts(allBlogs));
  const lastSlashIndex = path.lastIndexOf('/');
  const parentFolder = lastSlashIndex > -1 ? path.substring(0, lastSlashIndex) : '';
  const categoryName = parentFolder.split('/').pop() || 'Blog';

  const categoryPosts = allPosts.filter((p) => p.path.startsWith(parentFolder));
  
  const relatedPosts = categoryPosts
    .filter((p) => p.path !== path)
    .slice(0, 3);

  // ----------------------------------------------------------------
  // [수정된 로직] 제1 태그 규칙 적용 (서브카테고리 추출)
  // ----------------------------------------------------------------
  const subCategoriesSet = new Set<string>();
  
  categoryPosts.forEach(post => {
    // 각 글의 '첫 번째 태그'만 가져와서 서브카테고리 목록에 추가
    if (post.tags && post.tags.length > 0) {
      subCategoriesSet.add(post.tags[0]);
    }
  });
  
  // 알파벳/가나다 순 정렬
  const subCategories = Array.from(subCategoriesSet).sort();

  return (
    <div className="flex flex-col w-full items-center relative min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Background Grid - Global Pattern Consistency */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{ 
                backgroundImage: `linear-gradient(to right, #80808060 1px, transparent 1px), linear-gradient(to bottom, #80808060 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
            }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-[500px] bg-orange-500/5 blur-[120px] rounded-full opacity-40" />
      </div>

      <Header />

      <SectionContainer
        type="wide"
        className={cn('relative z-10 !max-w-screen-2xl px-4 lg:px-6 py-8', className)}
      >
        <ScrollTop />
        <article className="space-y-8">
          <header className="pt-8 pb-12 border-b border-gray-100 dark:border-white/5">
            <div className="space-y-4 text-center">
              <dl>
                <div className="flex flex-col items-center gap-2">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteConfig.locale,
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-400">
                    {title}
                  </span>
                </h1>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Glassmorphism */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="sticky top-24 p-6 bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-md rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> AUTHORS
                    </h3>
                    <ul className="space-y-4">
                      {authorDetails.map((author) => (
                        <li className="flex items-center space-x-3" key={author.name}>
                          {author.avatar && (
                            <Image
                              src={author.avatar}
                              width={40}
                              height={40}
                              alt="avatar"
                              className="h-10 w-10 rounded-full border border-gray-100 dark:border-white/10"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{author.name}</span>
                            <span className="text-[10px] text-gray-500 font-medium">Enterprise Analyst</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                      {categoryName} CATEGORIES
                    </h3>
                    <nav className="flex flex-col space-y-2">
                      {subCategories.length > 0 ? (
                        subCategories.map((t) => (
                          <Link 
                            key={t} 
                            href={`/tags/${t.toLowerCase()}`} 
                            className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-all text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500"
                          >
                            <span>{t}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400 italic px-3">No categories</span>
                      )}
                    </nav>
                  </div>

                  <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                    <Link
                      href={`/category/${categoryName}`}
                      className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white hover:text-orange-600 transition-colors"
                    >
                      ← Master Archive
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area - Glassmorphism Card */}
            <main className="lg:col-span-3 space-y-8">
              <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm p-6 md:p-12 lg:p-16 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none min-h-[600px]">
                <div className="prose max-w-none pt-2 dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-lg">
                  {children}
                </div>

                {/* Contextual System Banner */}
                <div className="mt-16">
                  <ProductBanner 
                    type={
                        categoryName.toLowerCase().includes('bayesian') ? 'bayesian' :
                        categoryName.toLowerCase().includes('ai') ? 'gai' :
                        categoryName.toLowerCase().includes('enterprise') ? 'enterprise' : 'generic'
                    } 
                  />
                </div>
                
                <div className="mt-16 pt-12 border-t border-gray-100 dark:border-white/5">
                  <Comments postId={path} />
                </div>
              </div>
            </main>
          </div>
        </article>
      </SectionContainer>

      {/* Recommended Posts - Clean Grid */}
      {relatedPosts.length > 0 && (
        <section className="w-full relative z-10 py-24 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5 mt-16">
          <div className="max-w-screen-2xl px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-orange-600">Deep Dive</span>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                  More in {categoryName}
                </h2>
              </div>
              <Link 
                href={`/category/${categoryName}`} 
                className="group flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-orange-600 transition-colors"
              >
                Explore Archive <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <PostCard key={post.path} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}