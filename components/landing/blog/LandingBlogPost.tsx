import Image from '@/components/shared/Image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { slug as slugifier } from 'github-slugger';

export interface BlogPost {
  path?: string;
  basePath?: string;
  slug?: string;
  date: string;
  title: string;
  summary?: string;
  tags?: string[] | { url: string; text: string }[];
  images?: string[];
  readingTime?: number | string;
  author?: {
    name?: string;
    avatar?: string;
  };
}

/**
 * This component displays a single blog post card.
 * It's meant to be used inside a blog list component, but can be used as a standalone component as well.
 */
export const LandingBlogPost = ({
  className,
  innerClassName,
  post,
  imagePosition,
}: {
  className?: string;
  innerClassName?: string;
  post: BlogPost;
  imagePosition?: 'left' | 'center' | 'right';
}) => {
  const {
    path,
    basePath = '/blog',
    slug,
    date,
    title,
    summary,
    tags,
    images,
    readingTime,
    author,
  } = post;
  const firstImage = images?.[0];

  // Extract category from path: posts/locale/Category/Slug
  // formattedPosts adds a leading slash, so splitting gives ['', 'posts', 'locale', 'category', ...]
  // We use filter(Boolean) to get ['posts', 'locale', 'category', ...]
  const pathParts = path ? path.split('/').filter(Boolean) : []; 
  // Index 0: posts, 1: locale, 2: Category
  const category = pathParts.length > 2 ? pathParts[2] : 'Blog';
  
  const firstTag = tags && tags.length > 0 ? tags[0] : null;
  const firstTagText = typeof firstTag === 'string' ? firstTag : firstTag?.text;
  const firstTagUrl = typeof firstTag === 'string' ? `/tags/${slugifier(firstTag)}` : firstTag?.url;

  const isHorizontalLayout = imagePosition
    ? imagePosition === 'left' || imagePosition === 'right'
    : true; // Use imagePosition prop if provided, otherwise use data attributes to control the layout. Default to horizontal when no prop (data attributes will override)

  return (
    <div
      className={clsx(
        'flex group/post overflow-hidden transition-all',
        imagePosition &&
          (isHorizontalLayout ? 'flex-col-reverse md:flex-row' : 'flex-col'),
        !imagePosition && 'flex-col-reverse md:flex-row',

        // When inside a list container
        '[.list_&]:!p-0',
        '[.list_&]:m-0 [.list_&]:lg:m-0 [.list_&]:h-full',
        '[.bgrid_&]:flex-col [.bgrid_&]:md:flex-col',
        className,
      )}
    >
      <div
        className={clsx(
          'relative overflow-hidden',
          imagePosition === 'center' && 'w-full h-48',
          imagePosition === 'left' && 'w-full h-40 md:w-1/3 md:h-auto',
          imagePosition === 'right' &&
            'w-full h-40 md:w-1/3 md:h-auto order-last',
          !imagePosition && 'w-full h-40 md:w-1/3 md:h-auto order-last',

          // When inside a grid container
          !imagePosition &&
            '[.bgrid_&]:w-full [.bgrid_&]:h-48 [.bgrid_&]:order-first',
           !firstImage && 'bg-gray-100 dark:bg-gray-800'
        )}
      >
        <div className="absolute top-4 left-4 z-20 flex flex-row gap-2 items-start pointer-events-none">
           <Link href={`/category/${category}`} className="pointer-events-auto px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded shadow-sm hover:bg-black/90 transition-colors">
             {category}
           </Link>
           {firstTagText && (
             <Link href={firstTagUrl || '#'} className="pointer-events-auto px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded shadow-sm hover:bg-white transition-colors">
               {firstTagText}
             </Link>
           )}
        </div>

        {firstImage ? (
          <Link href={path || `${basePath}/${slug}`}>
            <Image
              src={firstImage}
              alt={title || 'Blog post image'}
              fill
              className="object-cover transition-transform group-hover/post:scale-105 duration-500"
            />
          </Link>
        ) : (
          <Link href={path || `${basePath}/${slug}`} className="block w-full h-full" />
        )}
      </div>

      <div
        className={clsx(
          'relative flex flex-col gap-3 p-4', // Increased padding slightly, reduced gap
          isHorizontalLayout && 'flex-1',
          innerClassName,
        )}
      >
        <Link
          href={path || `${basePath}/${slug}`}
          className="absolute w-full h-full top-0 left-0 opacity-0"
        >
          Open post
        </Link>
        
        {/* Title */}
        <h3 className="text-lg font-bold line-clamp-2 group-hover/post:text-primary-600 dark:group-hover/post:text-primary-400 transition-colors leading-tight">
          {title}
        </h3>

        {/* Metas: Author & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
             <span className="font-medium">
                {author?.name || 'EXA Team'} {/* Fallback Author */}
             </span>
          </div>
          <time>
            {date}
          </time>
        </div>

        {/* Summary */}
        {summary && (
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            <p className="line-clamp-4 inline">{summary}</p>
            <Link
              href={path || `${basePath}/${slug}`}
              className="inline-block ml-1 text-green-500 font-medium hover:text-green-600 transition-colors"
            >
              Read More »
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
