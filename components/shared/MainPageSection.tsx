/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from '@/components/shared/Image';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { siteConfig } from '@/data/config/site.settings';
import PostCard from '@/components/shared/PostCard'; 
import { usePathname } from 'next/navigation';


interface MainPageSectionProps {
  title: string;
  posts: any[];
  linkTo?: string;
  categoryName?: string;
  layout?: 'grid' | 'magazine';
}

export const MainPageSection = ({ title, posts, linkTo, categoryName, layout = 'grid' }: MainPageSectionProps) => {
  const pathname = usePathname();
  const hasPosts = posts && posts.length > 0;
  
  const possibleLocale = pathname.split('/')[1];
  const currentLocale = siteConfig.locales.includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');
  
  if (!hasPosts) {
      return (
        <section className="py-10 border-b border-gray-100 dark:border-gray-800 last:border-0 text-left">
           {title && (
             <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-8 bg-orange-600 rounded-sm"></div>
               <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                {title}
              </h2>
              {linkTo && (
                 <Link href={linkTo} className="ml-auto text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors">
                   VIEW ALL &rarr;
                 </Link>
               )}
              </div>
           )}
            <div className="py-12 text-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 border-dashed">
                <p className="text-gray-500 dark:text-gray-400">No posts available in this section yet.</p>
            </div>
        </section>
      );
  }

  // --- 1. Magazine Layout Logic (Featured + Sidebar + Bottom Grid) ---
  if (layout === 'magazine') {
    const featuredPost = posts[0];
    const sidebarPosts = posts.slice(1, 5); // Next 4 posts
    const bottomPosts = posts.slice(5);     // Remaining posts (up to 5 more)

    return (
      <section className="py-10 border-b border-gray-100 dark:border-gray-800 last:border-0 text-left">
        {title && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-orange-600 rounded-sm"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
              {title}
            </h2>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Featured Post Card (Clean UI + Ribbon) */}
          {/* Featured Post Card (Clean UI + Ribbon) */}
          <div className="lg:col-span-2 group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch transition-all min-h-[456px]"> 
            
            {/* 1. Text Content (Left, Narrower ~40%) */}
            <div className="order-2 md:order-1 md:col-span-6 flex flex-col h-full justify-start py-10 px-10 gap-8 bg-white dark:bg-gray-900/50 rounded-l-2xl border-l-[6px] border-orange-500">
                 <div className="flex items-center gap-3">
                    <div className="bg-gray-900 dark:bg-white -skew-x-12 px-3 py-1">
                        <span className="skew-x-12 text-[10px] font-black uppercase text-white dark:text-gray-900 tracking-[0.2em]">
                          {featuredPost.path.split('/').length > 2 ? featuredPost.path.split('/')[featuredPost.path.split('/').length - 2].replace('-', ' ') : (categoryName || "INTEL")}
                        </span>
                    </div>
                    {featuredPost.tags?.[0] && (
                       <div className="bg-orange-500 -skew-x-12 px-3 py-1">
                         <span className="skew-x-12 text-[10px] font-black uppercase text-white tracking-[0.2em]">
                           {featuredPost.tags[0]}
                         </span>
                       </div>
                    )}
                 </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">
                  <Link href={currentLocale ? `/${currentLocale}/${featuredPost.path.replace(/^\//, '')}`.replace(/\/+/g, '/') : `/${featuredPost.path.replace(/^\//, '')}`.replace(/\/+/g, '/')}>
                    {featuredPost.title}
                  </Link>
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 line-clamp-4 md:line-clamp-6 text-base leading-relaxed overflow-hidden opacity-90">
                  {featuredPost.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>{featuredPost.author?.name || 'EXA Intel'}</span>
                  </div>
                  <div className="text-gray-400 font-mono">
                    {formatDate(featuredPost.date, siteConfig.locale)}
                  </div>
                </div>
            </div>

            {/* 2. Image (Right, Wider ~50%, Full Height) */}
            {(() => {
                const fPath = `/${currentLocale}/${featuredPost.path.replace(/^\//, '')}`.replace(/\/+/g, '/');
                return (
                    <Link href={fPath} className="order-1 md:order-2 md:col-span-6 block relative overflow-hidden h-full min-h-[400px] shadow-2xl rounded-r-2xl">
                    {featuredPost.images && featuredPost.images.length > 0 ? (
                        <div className="relative w-full h-full">
                            <Image
                            src={featuredPost.images[0]}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                            No Image
                        </div>
                    )}
                    </Link>
                );
            })()}
          </div>

          {/* Sidebar Posts (Clean UI) */}
          <div className="flex flex-col justify-between py-2">
              {sidebarPosts.map((post) => {
                 const postPath = currentLocale 
                    ? `/${currentLocale}/${post.path.replace(/^\//, '')}`.replace(/\/+/g, '/')
                    : `/${post.path.replace(/^\//, '')}`.replace(/\/+/g, '/');
                 return (
                    <Link href={postPath} key={post.path} className="group flex items-start gap-4 transition-all">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-orange-600 tracking-wider">
                                {post.path.split('/').length > 2 ? post.path.split('/')[post.path.split('/').length - 2] : (categoryName || "BLOG")}
                              </span>
                              {post.tags?.[0] && (
                                 <>
                                   <span className="text-[10px] text-gray-300">|</span>
                                   <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                                     {post.tags[0]}
                                   </span>
                                 </>
                              )}
                          </div>
                          
                          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 mt-2">
                              {post.title}
                          </h4>
    
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            <span>{post.author?.name || 'EXA Team'}</span>
                            <time>{formatDate(post.date, siteConfig.locale)}</time>
                          </div>
                        </div>
    
                        {/* Thumbnail Image */}
                        {post.images && post.images.length > 0 && (
                          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                            <Image
                              src={post.images[0]}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                    </Link>
                 );
              })}
          </div>
        </div>

         {/* Bottom Grid for Remaining Posts (Text Only + Ribbons) */}
        {bottomPosts.length > 0 && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">
              {bottomPosts.map((post) => (
                 <div key={post.path} className="group relative flex flex-col gap-4 items-start p-4 hover:bg-white dark:hover:bg-white/5 transition-all rounded-xl border-l-2 border-transparent hover:border-orange-500 hover:shadow-lg">
                     {/* Ribbon Tag */}
                     <Link href={`/${post.path}`} className="inline-flex items-center gap-1">
                        <div className="bg-gray-900 dark:bg-white -skew-x-12 px-2 py-0.5">
                             <span className="skew-x-12 text-[8px] font-black uppercase text-white dark:text-gray-900 tracking-[0.2em]">
                                {post.path.split('/').length > 2 ? post.path.split('/')[post.path.split('/').length - 2].replace('-', ' ') : (categoryName || "INTEL")}
                             </span>
                        </div>
                        {post.tags?.[0] && (
                           <div className="bg-orange-500 -skew-x-12 px-2 py-0.5">
                                <span className="skew-x-12 text-[8px] font-black uppercase text-white tracking-[0.2em]">{post.tags[0]}</span>
                           </div>
                        )}
                     </Link>

                     <h5 className="text-md font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-orange-600 transition-colors line-clamp-3 mt-4">
                       <Link href={`/${post.path}`}>
                         {post.title}
                       </Link>
                     </h5>
                     
                     <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center justify-between w-full mt-auto">
                       <span>{post.author?.name || 'EXA Intel'}</span>
                       <time className="font-mono">{formatDate(post.date, siteConfig.locale)}</time>
                     </div>
                 </div>
              ))}
           </div>
        )}
      </section>
    );
  }

  // --- 2. Grid Layout Logic (Default) ---
  return (
    <section className="py-10 border-b border-gray-100 dark:border-gray-800 last:border-0 text-left">
      {title && (
        <div className="flex items-center gap-3 mb-8">
           <div className="w-2 h-8 bg-orange-600 rounded-sm"></div>
           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
            {title}
          </h2>
          {linkTo && (
             <Link 
               href={`/${currentLocale}${linkTo.startsWith('/') ? '' : '/'}${linkTo}`.replace(/\/+/g, '/')} 
               className="ml-auto text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
             >
               VIEW ALL &rarr;
             </Link>
           )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {posts.map((post) => (
           <PostCard key={post.path} post={post} />
         ))}
      </div>
    </section>
  );
};
