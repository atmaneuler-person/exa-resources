import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import { ScrollTop } from '@/components/shared/ScrollTop';

interface DocLayoutProps {
  content?: CoreContent<Blog>;
  allDocPosts: CoreContent<Blog>[];
  toc?: { value: string; url: string; depth: number }[];
  children: React.ReactNode;
}

export default function DocLayout({ content, allDocPosts, toc, children }: DocLayoutProps) {
  // ==========================================================================================
  // [GRAND PRINCIPLE: DOCUMENTATION ORDERING]
  // ==========================================================================================
  // RULE: Documentation library MUST be sorted by the 'order' field in metadata (ascending).
  //       This ensures a logical flow (e.g., Intro -> Setup -> Advanced) similar to 
  //       official technical docs (Python, Rails, etc.).
  // ==========================================================================================
  const sortedPosts = [...allDocPosts].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    // Secondary fallback: Date (Newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full min-h-screen pt-32">
      <ScrollTop />
      {/* LEFT SIDEBAR: Navigation */}
      <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 p-8 pt-8 h-[calc(100vh-64px)] sticky top-24 self-start overflow-y-auto">
        <h3 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
          RESOURCES
        </h3>
        
        <nav className="space-y-1">
          {sortedPosts.map((post) => {
            const isActive = content?.path === post.path;
            const fullPath = post.path.startsWith('/') ? post.path : `/${post.path}`;
            return (
              <Link 
                key={post.path} 
                href={fullPath}
                className={`block px-4 py-2 text-sm font-bold transition-all rounded-lg ${
                  isActive 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20 translate-x-1' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {post.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto xl:mr-auto xl:ml-0">
          {content && (
             <header className="mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
                <div className="space-y-4">
                   <div className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
                      DOCUMENTATION
                   </div>
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white">
                      {content.title}
                   </h1>
                   {content.summary && (
                      <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                         {content.summary}
                      </p>
                   )}
                </div>
             </header>
          )}
          
          <div className="prose prose-lg dark:prose-invert max-w-none 
                          prose-headings:font-black prose-headings:tracking-tighter
                          prose-a:text-orange-600 dark:prose-a:text-orange-400 no-underline hover:prose-a:underline
                          prose-img:rounded-2xl prose-img:shadow-2xl">
            {children}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Table of Contents */}
      {toc && toc.length > 0 && (
        <aside className="hidden xl:block w-64 flex-shrink-0 p-8 pt-8 h-[calc(100vh-64px)] sticky top-24 self-start overflow-y-auto">
          <h3 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-gray-400">
            JUMP TO SECTION
          </h3>
          <nav className="space-y-3">
            {toc.map((heading) => (
              <a
                key={heading.url}
                href={heading.url}
                className={`block text-[13px] font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${
                  heading.depth > 2 ? 'pl-4 text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {heading.value}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
