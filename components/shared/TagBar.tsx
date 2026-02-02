import Link from 'next/link';

interface TagBarProps {
  tags: string[];
}

export const TagBar = ({ tags }: TagBarProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-[110px] lg:top-[65px] z-40 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 h-10 md:h-12 whitespace-nowrap text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
                
                {/* Decoration Icon */}
                <span className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                </span>

                {tags.map((tag) => (
                    <Link 
                        key={tag} 
                        href={`/tags/${tag.toLowerCase().replace(/ /g, '-')}`} // Assuming standard tag url structure
                        className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group"
                    >
                        {tag}
                        <span className="w-0 group-hover:w-full h-0.5 bg-orange-600 dark:bg-orange-400 block transition-all duration-300 absolute bottom-0 left-0 bg-opacity-0 group-hover:bg-opacity-100"></span> {/* Optional underline effect logic can be simple hover text color first */}
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
};
