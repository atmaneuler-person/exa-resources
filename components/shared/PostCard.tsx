/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from '@/components/shared/Link';
import Image from '@/components/shared/Image';
import Tag from '@/components/blog/Tag';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { siteConfig } from '@/data/config/site.settings';

interface PostCardProps {
  post: any; // 타입 단순화
}

const PostCard = ({ post }: PostCardProps) => {
  const { path, date, title, summary, tags, images } = post;
  
  // 이미지가 있으면 첫 번째 이미지를 쓰고, 없으면 회색 박스로 대체
  const displayImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className="group flex flex-col transition-all">
      {/* 1. 이미지 영역 + 리본 태그 */}
      <Link href={`/${path}`} aria-label={`Link to ${title}`} className="relative block aspect-video w-full overflow-hidden">
        {displayImage ? (
          <Image
            alt={title}
            src={displayImage}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}

        {/* Dual Ribbon Overlay (Category + Tag) */}
        <div className="absolute top-4 left-4 flex gap-1 z-10">
           {/* Category Ribbon */}
           <div className="bg-orange-600 -skew-x-12 shadow-sm px-3 py-1">
             <div className="skew-x-12 text-[10px] font-bold tracking-wider text-white uppercase">
               {path.split('/').length > 2 ? path.split('/')[path.split('/').length - 2] : 'BLOG'}
             </div>
           </div>
           
           {/* Tag Ribbon */}
           {tags && tags.length > 0 && (
             <div className="bg-orange-500/90 -skew-x-12 shadow-sm px-3 py-1">
               <div className="skew-x-12 text-[10px] font-bold tracking-wider text-white uppercase">
                 {tags[0]}
               </div>
             </div>
           )}
        </div>
      </Link>

      {/* 2. 텍스트 내용 영역 (박스 제거, 패딩 최소화) */}
      <div className="flex flex-1 flex-col justify-between pt-4">
        <div className="space-y-2">
          {/* Metas: Author & Date */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <div className="flex items-center gap-2">
              {post.author?.avatar && (
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  width={16} 
                  height={16} 
                  className="rounded-full w-4 h-4 grayscale group-hover:grayscale-0 transition-all"
                />
              )}
              <span className="text-gray-500 group-hover:text-orange-600 transition-colors">
                {post.author?.name || 'EXA Team'}
              </span>
            </div>
            <time dateTime={date}>{formatDate(date, siteConfig.locale)}</time>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-orange-600 transition-colors">
            <Link href={`/${path}`}>
              {title}
            </Link>
          </h2>

          {/* 요약글 (길게, 5줄) */}
          <div className="prose max-w-none text-xs text-gray-500 dark:text-gray-400 line-clamp-5 leading-relaxed mb-4">
            {summary}
          </div>

          <div className="text-xs font-bold text-green-500 hover:text-green-600 transition-colors uppercase tracking-wide">
             Read More »
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;