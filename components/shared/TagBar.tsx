import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/config/site.settings';

interface TagBarProps {
  tags: string[];
}

export const TagBar = ({ tags }: TagBarProps) => {
  const pathname = usePathname();
  if (!tags || tags.length === 0) return null;

  const possibleLocale = pathname.split('/')[1];
  const currentLocale = siteConfig.locales.includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  return (
    <div className="w-full transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-8 h-12 md:h-16 whitespace-nowrap text-[11px] md:text-xs font-black text-gray-700 dark:text-gray-400 tracking-widest uppercase bg-gray-300/60 dark:bg-white/[0.03] backdrop-blur-sm border-y border-gray-400/20 dark:border-white/20">
                
                {/* Decoration Icon */}
                <span className="text-orange-500/80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                </span>

                {tags.map((tag) => {
                    const tagSlug = tag.toLowerCase().replace(/ /g, '-');
                    const href = currentLocale 
                        ? `/${currentLocale}/tags/${tagSlug}`.replace(/\/+/g, '/')
                        : `/tags/${tagSlug}`;

                    return (
                        <Link 
                            key={tag} 
                            href={href} 
                            className="hover:text-orange-600 dark:hover:text-white transition-all duration-300 flex items-center gap-2 group relative py-4"
                        >
                            <span className="relative z-10">{tag}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    );
                })}
            </div>
        </div>
    </div>
  );
};
