import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import { ScrollTop } from '@/components/shared/ScrollTop';

// Extended type to include Docs-specific frontmatter fields
interface DocPost extends CoreContent<Blog> {
  section?: string;
  sectionOrder?: number;
  order?: number;
}

interface DocLayoutProps {
  content?: DocPost;
  allDocPosts: DocPost[];
  toc?: { value: string; url: string; depth: number }[];
  locale?: string;
  children: React.ReactNode;
}

// ==========================================================================================
// [GRAND PRINCIPLE: DOCUMENTATION SECTION GROUPING]
// ==========================================================================================
// RULE: Docs sidebar groups pages by 'section' frontmatter field.
//       Pages without section go to a default "General" group.
//       Sections are ordered by 'sectionOrder', then pages by 'order'.
//       Style: LangChain Docs — always-open sections, no collapse.
// ==========================================================================================

interface SectionGroup {
  name: string;
  sectionOrder: number;
  posts: DocPost[];
}

function groupBySection(posts: DocPost[]): SectionGroup[] {
  const sectionMap = new Map<string, SectionGroup>();

  for (const post of posts) {
    const sectionName = post.section || 'General';
    const sectionOrder = post.sectionOrder ?? 999;

    if (!sectionMap.has(sectionName)) {
      sectionMap.set(sectionName, {
        name: sectionName,
        sectionOrder,
        posts: [],
      });
    }
    sectionMap.get(sectionName)!.posts.push(post);
  }

  const sections = Array.from(sectionMap.values());
  sections.sort((a, b) => a.sectionOrder - b.sectionOrder);
  sections.forEach(section => {
    section.posts.sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  return sections;
}

export default function DocLayout({ content, allDocPosts, toc, locale, children }: DocLayoutProps) {
  const sections = groupBySection(allDocPosts);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full" style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
      <ScrollTop />
      {/* LEFT SIDEBAR: Fixed, independently scrollable */}
      <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 p-6 pt-8 overflow-y-auto">

        <nav className="space-y-3">
          {sections.map((section) => {
            const isActiveSection = section.posts.some(p => p.path === content?.path);
            return (
              <div key={section.name}>
                <details open={isActiveSection || section.name === 'General'}>
                  {/* Section Header — collapsible */}
                  <summary className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-1 px-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden flex items-center gap-1.5 hover:text-orange-500 transition-colors">
                    <svg className="w-3 h-3 flex-shrink-0 transition-transform [[open]>*>&]:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {section.name}
                  </summary>

                  {/* Section Items */}
                  <div className="space-y-0.5 mt-1">
                    {section.posts.map((post) => {
                      const isActive = content?.path === post.path;
                      const rawPath = post.path.startsWith('/') ? post.path : `/${post.path}`;
                      const fullPath = locale ? `/${locale}${rawPath}` : rawPath;
                      return (
                        <Link
                          key={post.path}
                          href={fullPath}
                          className={`group flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-lg transition-all ${isActive
                            ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-900/20'
                            : 'text-gray-600 dark:text-gray-400 font-medium hover:bg-white dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400'
                            }`}
                        >
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${isActive ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-400'
                            }`} />
                          {post.title}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA: Only this part scrolls */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-950 overflow-y-auto">
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

      {/* RIGHT SIDEBAR: Fixed, independently scrollable */}
      {toc && toc.length > 0 && (
        <aside className="hidden xl:block w-64 flex-shrink-0 p-8 pt-8 overflow-y-auto">
          <h3 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-gray-400">
            JUMP TO SECTION
          </h3>
          <nav className="space-y-3">
            {toc.map((heading) => (
              <a
                key={heading.url}
                href={heading.url}
                className={`block text-[13px] font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${heading.depth > 2 ? 'pl-4 text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
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
