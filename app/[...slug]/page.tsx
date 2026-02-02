import { sortPosts } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import type { Authors, Blog } from 'contentlayer/generated';
import { coreContent } from '@shipixen/pliny/utils/contentlayer';
import Link from 'next/link';
import { Button } from '@/components/shared/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PostCard from '@/components/shared/PostCard'; 
import { TagBar } from '@/components/shared/TagBar';
import DocumentationListLayout from '@/layouts/DocumentationListLayout'; // Import Doc Layout
import RestrictedContentGate from '@/components/shared/RestrictedContentGate'; // Import Gate Component
import { MDXLayoutRenderer } from '@shipixen/pliny/mdx-components';
import { components } from '@/components/MDXComponents';
import PostSimple from '@/layouts/PostSimple';
import PostLayout from '@/layouts/PostLayout';
import PostBanner from '@/layouts/PostBanner';
import { siteConfig } from '@/data/config/site.settings';
import { Metadata } from 'next';
import { MainPage } from '@/components/shared/MainPage';
import { auth } from '@/lib/auth';

const defaultLayout = 'PostLayout';
const layouts = { PostSimple, PostLayout, PostBanner };
const BLOG_URL = siteConfig.blogPath ? `/${siteConfig.blogPath}` : '';

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const slugArray = params.slug;

  if (slugArray[0] === 'category') {
    const categoryName = decodeURI(slugArray[1] || '');
    return {
      title: `${categoryName} | ${siteConfig.title}`,
      description: `Articles in ${categoryName}`,
    };
  }

  const path = BLOG_URL + decodeURI(slugArray.join('/'));
  const post = allBlogs.find((p) => p.path === path);
  if (!post) return;

  return {
    title: post.title,
    description: post.summary,
  };
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.path.split('/') }));
};

import Pagination from '@/components/shared/Pagination';

export default async function Page(props: { params: Promise<{ slug: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slugArray = params.slug;

  // =========================================================
  // [CASE 0] Locale Home Page (e.g. /en, /ja)
  // =========================================================
  if (slugArray.length === 1 && siteConfig.locales.includes(slugArray[0])) {
    return <MainPage locale={slugArray[0]} />;
  }

  // =========================================================
  // [CASE 1] Category List
  // =========================================================
  let isCategoryPage = false;
  let categoryName = '';
  let currentLocale = siteConfig.defaultLocale; // Default to 'ko'

  // Pattern 1: /category/[name] -> Default Locale
  if (slugArray[0] === 'category') {
    isCategoryPage = true;
    categoryName = decodeURI(slugArray[1] || '');
  }
  // Pattern 2: /[locale]/category/[name] -> Specific Locale
  else if (siteConfig.locales.includes(slugArray[0]) && slugArray[1] === 'category') {
    isCategoryPage = true;
    currentLocale = slugArray[0];
    categoryName = decodeURI(slugArray[2] || '');
  }

  if (isCategoryPage) {
    const posts = sortPosts(allBlogs);

    // Filter by Category AND Locale (STRICT FOLDER MATCHING)
    const filteredPosts = posts.filter((post) => {
      const pathParts = post.path.split('/'); // e.g. ['posts', 'ko', 'Bayesian', 'filename']
      
      // Ensure path has enough parts (posts/locale/category/filename)
      if (pathParts.length < 3) return false;

      const postLocale = pathParts[1].toLowerCase();
      const postCategory = pathParts[2].toLowerCase(); // The folder name
      
      const targetLocale = currentLocale.toLowerCase();
      const targetCategory = categoryName.toLowerCase();
      
      return postLocale === targetLocale && postCategory === targetCategory;
    });
    
    // Extract Unique Tags from Filtered Posts
    const allTags = filteredPosts
        .map(post => post.tags?.[0])
        .filter((tag): tag is string => !!tag);
    const uniqueTags = Array.from(new Set(allTags));

    // [PAGINATION LOGIC]
    const POSTS_PER_PAGE = 9;
    const pageNumber = parseInt(searchParams.page as string || '1');
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const displayPosts = filteredPosts.slice((pageNumber - 1) * POSTS_PER_PAGE, pageNumber * POSTS_PER_PAGE);

    // [CASE 1-A] Documentation Layout (Sidebar Style)
    if (categoryName.toLowerCase() === 'documentation') {
       const session = await auth();
       if (!session?.user) {
          return <RestrictedContentGate postTitle="Documentation Library" />;
       }

       return (
         <div className="flex flex-col w-full items-center">
            <Header />
            {/* Doc Layout handles its own sidebar */}
            <DocumentationListLayout posts={filteredPosts} title={categoryName} />
            <Footer />
         </div>
       );
    }

    // [CASE 1-B] Standard Blog Layout (Grid Style)
    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <TagBar tags={uniqueTags} />
        
        <div className="w-full max-w-6xl px-4 py-12">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {categoryName} <span className="text-primary-500 text-2xl align-top">({currentLocale.toUpperCase()})</span>
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {filteredPosts.length} posts found.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {displayPosts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </div>

          <Pagination totalPages={totalPages} currentPage={pageNumber} />

          {!filteredPosts.length && (
            <div className="mt-20 text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-500">No posts found in this language.</h3>
              <p className="mt-2 text-gray-400">Try switching to another language.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // =========================================================
  // [CASE 2] 글 상세 화면
  // =========================================================
  const path = decodeURI(slugArray.join('/'));
  const post = allBlogs.find((p) => p.path === path) as Blog;

  if (!post) {
    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <div className="mt-24 text-center min-h-[50vh]">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <div className="mt-4 text-gray-500">Path: {path}</div>
          <Button asChild className="mt-8"><Link href="/">Back to Home</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  // [ACCESS CONTROL] Check if post is Documentation
  const isDocumentation = post.tags?.includes('Manual') || post.path.includes('/Documentation/');
  
  if (isDocumentation) {
     const session = await auth();
     if (!session?.user) {
        return <RestrictedContentGate postTitle={post.title} />;
     }
  }

  const mainContent = coreContent(post);
  const Layout = layouts[post.layout || defaultLayout];

  return (
    <Layout content={mainContent} authorDetails={[]} next={undefined} prev={undefined}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </Layout>
  );
}