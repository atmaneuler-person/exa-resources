import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from 'next/link';

interface DocumentationListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
}

export default function DocumentationListLayout({ posts, title }: DocumentationListLayoutProps) {
  // Sort posts by 'order' field (ascending). 
  // Posts without order default to 999 (end of list).
  const sortedPosts = [...posts].sort((a, b) => {
     const orderA = a.order ?? 999;
     const orderB = b.order ?? 999;
     if (orderA !== orderB) return orderA - orderB;
     // Secondary sort by date (newest first) or title
     return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full min-h-screen">
      {/* LEFT SIDEBAR: Navigation */}
      <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:h-screen md:sticky md:top-[65px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-gray-900 dark:text-gray-100 flex items-center gap-2">
           <span className="w-1 h-5 bg-orange-500 rounded-sm"></span>
           DOCS
        </h3>
        
        <nav className="space-y-1">
          {sortedPosts.map((post) => (
             <Link 
               key={post.path} 
               href={`/${post.path}`}
               className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 rounded-md transition-colors"
             >
               {post.title}
             </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12 lg:p-16">
         <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
              {title}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-gray-600 dark:text-gray-300">
               <p className="mb-8">
                 Welcome to the <strong>{title}</strong>. Here you will find detailed guides and references for our logic and solutions.
               </p>

               {/* Quick Links Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                  {sortedPosts.map((post) => (
                    <Link 
                       key={post.path} 
                       href={`/${post.path}`}
                       className="block p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
                    >
                       <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                         {post.title}
                       </h3>
                       {post.summary && (
                         <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                           {post.summary}
                         </p>
                       )}
                    </Link>
                  ))}
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
