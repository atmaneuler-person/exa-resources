'use client';

import { usePathname } from 'next/navigation';
import { slug } from 'github-slugger';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import { allAuthors } from 'contentlayer/generated'; // Import allAuthors
import Link from '@/components/shared/Link';
import { siteConfig } from '@/data/config/site.settings';
import tagData from 'app/tag-data.json';
import SectionContainer from '@/components/shared/SectionContainer';
import {
  LandingBlogPost,
  BlogPost,
} from '@/components/landing/blog/LandingBlogPost';
import { LandingBlogList } from '@/components/landing/blog/LandingBlogList';

const BLOG_URL = siteConfig.blogPath ? `/${siteConfig.blogPath}` : '/';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          const link =
            page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`;
          
          return isCurrent ? (
            <span
              key={page}
              className="px-3 py-1 bg-primary-500 text-white rounded-md font-bold"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={link}
              className="px-3 py-1 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              {page}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Compute Category Counts
  const categoryCounts = posts.reduce((acc, post) => {
    const pathParts = post.path.split('/');
    // Assuming path: posts/locale/Category/Slug.
    // We want index 2.
    if (pathParts.length > 2) {
      const category = pathParts[2];
      // Exclude Documentation from the Menu list if desired, or keep it.
      // User asked to exclude it in Footer, but sidebar usually shows all content or navigation.
      // Given "Topic이 아니고 메뉴(키데고리) 리스트가 보여주고", I'll list all found categories EXCEPT Documentation if it's considered a separate resource.
      // But typically "Blog" sidebar filters blog posts. If Documentation is in posts, it might be here.
      // I'll include it for now, unless explicit exclusion.
      // Actually user said "below documentation excluded menus...".
      // I will include all categories found in the blog list.
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const categoryKeys = Object.keys(categoryCounts).sort();

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  if (displayPosts.length === 0) {
    return (
      <div className="flex flex-col gap-1 p-6 mb-10">
        <h2 className="text-4xl">No posts found</h2>
        <p>Please check back later!</p>
      </div>
    );
  }

  const formattedPosts = displayPosts.map((post): BlogPost => {
    return {
      path: `/${post.path}`,
      slug: post.slug || '',
      date: formatDate(post.date, siteConfig.locale),
      title: post.title,
      summary: post.summary,
      tags: post.tags?.map((tag) => {
        return {
          url: `/tags/${slug(tag)}`,
          text: tag,
        };
      }),
      images: post.images || [],
      readingTime: post.readingTime?.text || '',
      author: (() => {
        const authorSlug = post.authors?.[0] || 'default';
        const authorData = allAuthors.find((a) => a.slug === authorSlug);
        return {
          name: authorData?.name || 'EXA Team',
          avatar: authorData?.avatar,
        };
      })(),
    };
  });

  return (
    <>
      <SectionContainer type="ultrawide" className="!p-0">
        <div className="flex sm:gap-12">
          <div className="w-full">
            <div className="px-6">
              <h1 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
                {title}
              </h1>
            </div>

            <LandingBlogList display="grid" variant="primary" className="!pt-6">
              {formattedPosts.map((post) => (
                <LandingBlogPost
                  key={post.slug}
                  post={post}
                />
              ))}
            </LandingBlogList>

            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>

          <div className="hidden max-h-screen h-full lg:flex flex-col min-w-[280px] max-w-[280px] overflow-y-auto pt-24 no-scrollbar">
            {/* Categories (Menu) Section */}
            <div className="py-4 px-6">
              <h3 className="font-bold uppercase text-xl mb-4">Menu</h3>
              <ul className="flex flex-col gap-2">
                {categoryKeys.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/category/${cat}`}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-500 transition-colors">
                        {cat}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                        {categoryCounts[cat]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Section */}
            <div className="py-4 px-6 mt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="font-bold uppercase text-sm text-gray-400 mb-4 tracking-wider">
                Tags
              </h3>
              <ul className="flex flex-col gap-2">
                {sortedTags.map((t) => {
                  return (
                    <li key={t}>
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline-block transition-all uppercase text-sm font-bold text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="inline-block translate-x-0 transition-all uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
