import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { CoreContent, sortPosts, allCoreContent } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import type { Blog, Authors } from 'contentlayer/generated';
import Link from '@/components/shared/Link';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import SectionContainer from '@/components/shared/SectionContainer';
import Image from '@/components/shared/Image';
import Tag from '@/components/blog/Tag'; 
import { siteConfig } from '@/data/config/site.settings';
import ScrollTop from '@/components/shared/ScrollTop';
import PostCard from '@/components/shared/PostCard'; 

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  className?: string;
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  className,
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, date, title, tags } = content;

  // 1. 현재 카테고리 파악 및 관련 글 3개 추출
  const allPosts = allCoreContent(sortPosts(allBlogs));
  const lastSlashIndex = path.lastIndexOf('/');
  const parentFolder = lastSlashIndex > -1 ? path.substring(0, lastSlashIndex) : '';
  const categoryName = parentFolder.split('/').pop() || 'Blog';

  const categoryPosts = allPosts.filter((p) => p.path.startsWith(parentFolder));
  
  const relatedPosts = categoryPosts
    .filter((p) => p.path !== path)
    .slice(0, 3);

  // ----------------------------------------------------------------
  // [수정된 로직] 제1 태그 규칙 적용 (서브카테고리 추출)
  // ----------------------------------------------------------------
  const subCategoriesSet = new Set<string>();
  
  categoryPosts.forEach(post => {
    // 각 글의 '첫 번째 태그'만 가져와서 서브카테고리 목록에 추가
    if (post.tags && post.tags.length > 0) {
      subCategoriesSet.add(post.tags[0]);
    }
  });
  
  // 알파벳/가나다 순 정렬
  const subCategories = Array.from(subCategoriesSet).sort();

  return (
    <div className="flex flex-col w-full items-center">
      <Header />

      <SectionContainer
        type="wide"
        className={cn('fancy-overlay fancy-overlay--muted !max-w-screen-2xl', className)}
      >
        <ScrollTop />
        <article>
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteConfig.locale,
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            
            {/* 좌측 사이드바 */}
            <div className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dl>
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">
                            {author.name}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>

              {/* [수정됨] 서브카테고리 메뉴 영역 */}
              <div className="hidden xl:block mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 mb-4">
                  {categoryName} Menu
                </h3>
                <div className="flex flex-col space-y-3">
                  {subCategories.length > 0 ? (
                    subCategories.map((t) => (
                      <Link 
                        key={t} 
                        href={`/tags/${t.toLowerCase()}`} 
                        className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {/* 메뉴처럼 보이기 위해 # 기호 제거 */}
                        {t}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No sub-categories</span>
                  )}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/category/${categoryName}`}
                    className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-primary-500"
                  >
                    ← All {categoryName} Posts
                  </Link>
                </div>
              </div>
            </div>

            {/* 본문 영역 */}
            <div className="lg:bg-white dark:lg:bg-slate-900 lg:px-10 lg:py-4 divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                {children}
              </div>
            </div>
          </div>
        </article>
      </SectionContainer>

      {/* 하단 관련 글 */}
      {relatedPosts.length > 0 && (
        <div className="w-full max-w-screen-2xl px-4 py-12 mx-auto mt-10 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              More in {categoryName}
            </h2>
            <Link 
              href={`/category/${categoryName}`} 
              className="text-sm font-medium text-primary-500 hover:text-primary-600"
            >
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}