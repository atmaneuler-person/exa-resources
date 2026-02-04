'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from '@/components/shared/Link';
import Image from '@/components/shared/Image';
import Tag from '@/components/blog/Tag';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { siteConfig } from '@/data/config/site.settings';

interface PostCardProps {
  post: any; // 타입 단순화
}

import { usePathname } from 'next/navigation';

const PostCard = ({ post }: PostCardProps) => {
  const pathname = usePathname();
  const { path, date, title, summary, tags, images } = post;
  
  const possibleLocale = pathname.split('/')[1];
  const currentLocale = siteConfig.locales.includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  const localePath = `/${currentLocale}/${path.replace(/^\//, '')}`.replace(/\/+/g, '/');

  const displayImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className="group relative flex flex-col transition-all duration-500 hover:z-10 bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-transparent hover:border-gray-100 dark:hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      {/* Intelligence Report Style Accent Line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/0 group-hover:bg-orange-500 transition-all duration-500 z-20" />

      {/* 1. Image Area with Enhanced Hover */}
      <Link href={localePath} aria-label={`Link to ${title}`} className="relative block aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {displayImage ? (
          <Image
            alt={title}
            src={displayImage}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-gray-300 dark:text-gray-700 text-[10px] font-bold uppercase tracking-widest">EXA Media</span>
          </div>
        )}

        {/* Darkened Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Dual Ribbon Overlay */}
        <div className="absolute top-4 left-4 flex gap-1 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
           <div className="bg-gray-900 dark:bg-white -skew-x-12 shadow-md px-3 py-1.5">
             <div className="skew-x-12 text-[9px] font-black tracking-[0.2em] text-white dark:text-gray-950 uppercase">
               {path.split('/').length > 2 ? path.split('/')[path.split('/').length - 2].replace('-', ' ') : 'CORE'}
             </div>
           </div>
           
           {tags && tags.length > 0 && (
             <div className="bg-orange-500 -skew-x-12 shadow-md px-3 py-1.5">
               <div className="skew-x-12 text-[9px] font-black tracking-[0.2em] text-white uppercase">
                 {tags[0]}
               </div>
             </div>
           )}
        </div>
      </Link>

      {/* 2. Text Content (Professional Intelligence Style) */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-white/5 pb-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1 h-1 rounded-full bg-orange-600 flex-shrink-0" />
            <span className="truncate text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              {post.author?.name || 'EXA Intel'}
            </span>
          </div>
          <time dateTime={date} className="font-mono text-gray-400 ml-3 flex-shrink-0">
            {formatDate(date, siteConfig.locale)}
          </time>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-base font-black leading-tight text-gray-900 dark:text-gray-300 group-hover:text-orange-600 transition-colors">
            <Link href={localePath}>
              {title}
            </Link>
          </h2>

          <p className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed font-medium opacity-80">
            {summary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest">
             ANALYSIS
             <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;