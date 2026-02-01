import { sortPosts } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';
import Image from '@/components/shared/Image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { MainPageSection } from '@/components/shared/MainPageSection';
import { siteConfig } from '@/data/config/site.settings';

interface MainPageProps {
  locale?: string;
}

export const MainPage = ({ locale = siteConfig.defaultLocale }: MainPageProps) => {
  const posts = sortPosts(allBlogs);
  const currentLocale = locale;

  // 1. Get Top 4 Latest Posts (Mixed Categories) for this locale
  const latestPosts = posts.filter((post) => {
    const lowerPath = post.path.toLowerCase();
    const pathParts = lowerPath.split('/');
    return pathParts.includes(currentLocale.toLowerCase());
  }).slice(0, 10);

  const categories = [
    'Bayesian',
    'AI',
    'Business',
    'Science', 
    'Solution', 
    'Documentation'
  ];

  return (
    <div className="flex flex-col w-full items-center fancy-overlay">
      <Header />

      <div className="w-full max-w-screen-2xl px-4 py-8 space-y-12">
        
        {/* Intro / Hero Section (Split Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 mb-12 border-b border-gray-200 dark:border-gray-800">
          {/* Left Column: Title */}
          <div className="text-left space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {siteConfig.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg">
              {siteConfig.description}
            </p>
          </div>

          {/* Right Column: Intro Text + Image */}
          <div className="flex flex-col gap-6">
             <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-base leading-relaxed text-gray-700 dark:text-gray-300 shadow-sm">
               This room is a knowledge warehouse for business people. It doesn't distinguish between natural science, mathematics, artificial intelligence, humanities, and business theory. It values the correct thought process and thinking ability. EXA acknowledges only『Undeniable clear Facts & Unrefutable Conclusions』
             </div>
             
             {/* Image Removed as per User Request */}
          </div>
        </section>

        {/* === TOP SECTION: LATEST STORIES (All Categories) === */}
        {latestPosts.length > 0 && (
          <MainPageSection 
            title="" 
            posts={latestPosts} 
            categoryName="LATEST"
            layout="magazine"
          />
        )}

        {/* === BANNER SECTION === */}
        <div className="w-full mb-12 relative group">
          {/* Banner Image (Links to Home) */}
          <Link href="/" className="block relative overflow-hidden">
            <Image 
              src="/static/images/home-banner.png" 
              alt="Home Banner" 
              width={1400} 
              height={300} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Dark Overlay for better text readability (optional, light) */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
          </Link>

          {/* "Go to EXA" Overlay Button */}
          <a 
            href="https://atmaneuler.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 px-6 py-2.5 
                       bg-white/10 backdrop-blur-md border border-white/20 
                       text-white font-medium tracking-wide rounded-full 
                       shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 
                       transition-all duration-300 flex items-center gap-2 group/btn"
          >
            <span>Go to EXA</span>
            <svg className="w-4 h-4 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* === CATEGORY SECTIONS === */}
        {categories.map((category) => {
          
          // Strict Filtering Logic
          const categoryPosts = posts.filter((post) => {
            const lowerPath = post.path.toLowerCase(); // e.g. posts/ko/bayesian/ba01...
            const pathParts = lowerPath.split('/');

            // 1. Check Locale
            if (!pathParts.includes(currentLocale.toLowerCase())) return false;

            // 2. Check Category
            if (!pathParts.includes(category.toLowerCase())) return false;

            return true;
          });

          // Even if empty, show section (with placeholder handled inside component) but pass empty array
          // Actually, MainPageSection returns null if empty. 
          // Re-reading task: "Verified UI shows all sections" -> user wanted empty sections visible.
          // I should modify MainPageSection to handle empty, OR handle it here.
          // Let's modify MainPageSection logic via props, or just pass empty array.
          
          // logic update: MainPageSection currently returns null if empty.
          // Let's rely on the previous logic I added to MainPage.tsx? 
          // Check MainPageSection code I just wrote: `if (!posts) return null`.
          // Ah, I need to update MainPageSection to NOT return null if I want to show "No posts".
          // BUT, for now, let's use the component. I will update MainPageSection in next step if needed to show empty. 
          // Wait, user explicitly asked for "Empty State: If a category has no posts, it will now simply show...".
          // My previous edit to MainPage.tsx did this manually. My NEW MainPageSection.tsx has `if (!posts) return null`.
          // I MUST fix MainPageSection.tsx to allow empty state. 
          // For now, let's insert the code.
          
          return (
             <MainPageSection 
                key={category}
                title={category}
                posts={categoryPosts.slice(0, 4)} 
                linkTo={currentLocale === siteConfig.defaultLocale ? `/category/${category}` : `/${currentLocale}/category/${category}`}
                categoryName={category}
             />
          );
        })}

      </div>

      <Footer />
    </div>
  );
};
