/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from '@/components/shared/Image';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { siteConfig } from '@/data/config/site.settings';
import PostCard from '@/components/shared/PostCard'; // Import Grid Card


interface MainPageSectionProps {
  title: string;
  posts: any[];
  linkTo?: string;
  categoryName?: string;
  layout?: 'grid' | 'magazine';
}

export const MainPageSection = ({ title, posts, linkTo, categoryName, layout = 'grid' }: MainPageSectionProps) => {
  const hasPosts = posts && posts.length > 0;
  
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
          <div className="lg:col-span-2 group relative grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch transition-all lg:h-[456px]"> 
            
            {/* 1. Text Content (Left, Narrower ~40%) */}
            <div className="order-2 md:order-1 md:col-span-5 flex flex-col h-full justify-start py-1 gap-4">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-orange-600 tracking-wider">
                      {featuredPost.path.split('/').length > 2 ? featuredPost.path.split('/')[featuredPost.path.split('/').length - 2] : (categoryName || "BLOG")}
                    </span>
                    {featuredPost.tags?.[0] && (
                       <>
                         <span className="text-xs text-gray-300">|</span>
                         <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                           {featuredPost.tags[0]}
                         </span>
                       </>
                    )}
                 </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">
                  <Link href={`/${featuredPost.path}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-[6] text-base leading-relaxed overflow-hidden">
                  {featuredPost.summary}
                </p>

                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mt-auto border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex items-center gap-2">
                    {featuredPost.author?.avatar && (
                      <Image 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name} 
                        width={20} 
                        height={20} 
                        className="rounded-full w-5 h-5"
                      />
                    )}
                    <span className="text-gray-900 dark:text-gray-100">
                      {featuredPost.author?.name || 'EXA Team'}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {formatDate(featuredPost.date, siteConfig.locale)}
                  </div>
                </div>
            </div>

            {/* 2. Image (Right, Wider ~60%, Full Height) */}
            <Link href={`/${featuredPost.path}`} className="order-1 md:order-2 md:col-span-7 block relative overflow-hidden h-full min-h-[300px] shadow-sm">
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
          </div>

          {/* Sidebar Posts (Clean UI) */}
          <div className="flex flex-col gap-6">
             {sidebarPosts.map((post) => (
                <Link href={`/${post.path}`} key={post.path} className="group flex items-start gap-4 transition-all">
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
                      
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
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
             ))}
          </div>
        </div>

        {/* Bottom Grid for Remaining Posts (Text Only + Ribbons) */}
        {bottomPosts.length > 0 && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">
              {bottomPosts.map((post) => (
                 <div key={post.path} className="group flex flex-col gap-3 items-start">
                     {/* Ribbon Tag */}
                     <Link href={`/${post.path}`} className="relative inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold uppercase tracking-wider transform -skew-x-12 hover:skew-x-0 transition-transform duration-300 shadow-sm rounded-sm">
                        <span className="transform skew-x-12 group-hover:skew-x-0 transition-transform duration-300">
                             {post.path.split('/').length > 2 ? post.path.split('/')[post.path.split('/').length - 2] : (categoryName || "BLOG")}
                        </span>
                        {post.tags?.[0] && (
                           <span className="transform skew-x-12 group-hover:skew-x-0 transition-transform duration-300 flex items-center gap-2">
                             <span className="opacity-60">|</span>
                             <span>{post.tags[0]}</span>
                           </span>
                        )}
                     </Link>

                     <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-orange-600 transition-colors line-clamp-3 mt-2">
                       <Link href={`/${post.path}`}>
                         {post.title}
                       </Link>
                     </h5>
                     
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between w-full">
                       <span>{post.author?.name || 'EXA Team'}</span>
                       <time>{formatDate(post.date, siteConfig.locale)}</time>
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
             <Link href={linkTo} className="ml-auto text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors">
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
