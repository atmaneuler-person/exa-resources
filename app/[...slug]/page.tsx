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
import RestrictedContentGate from '@/components/shared/RestrictedContentGate'; // Import Gate Component
import { MDXLayoutRenderer } from '@shipixen/pliny/mdx-components';
import { components } from '@/components/MDXComponents';
import PostSimple from '@/layouts/PostSimple';
import PostLayout from '@/layouts/PostLayout';
import PostBanner from '@/layouts/PostBanner';
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags';
import DocLayout from '@/layouts/DocLayout';
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
  // [NEW] Resolve Locale and Base Slug
  // =========================================================
  let currentLocale = siteConfig.defaultLocale;
  let baseSlug = slugArray;

  if (siteConfig.locales.includes(slugArray[0])) {
    currentLocale = slugArray[0];
    // If it's just the locale (e.g. /en), render MainPage
    if (slugArray.length === 1) {
      return <MainPage locale={currentLocale} />;
    }
    // Otherwise, strip the locale from the slug for further processing
    baseSlug = slugArray.slice(1);
  }

  // =========================================================
  // [CASE 1] Category List
  // =========================================================
  let isCategoryPage = false;
  let categoryName = '';

  // Pattern: /category/[name] or /[locale]/category/[name]
  if (baseSlug[0] === 'category') {
    isCategoryPage = true;
    categoryName = decodeURI(baseSlug[1] || '');
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

       const sortedPosts = filteredPosts.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
       });

       return (
         <div className="flex flex-col w-full items-center">
            <Header />
            <DocLayout allDocPosts={sortedPosts}>
               <div className="py-12">
                  <h2 className="text-2xl font-bold mb-6">Welcome to the {categoryName}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-12">
                     Select a topic from the sidebar to start reading our comprehensive guides.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {sortedPosts.map(p => (
                        <Link key={p.path} href={`/${p.path}`} className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-orange-500/50 transition-all">
                           <h3 className="font-bold mb-2">{p.title}</h3>
                           <p className="text-sm text-gray-500 line-clamp-2">{p.summary}</p>
                        </Link>
                     ))}
                  </div>
               </div>
            </DocLayout>
            <Footer />
         </div>
       );
    }

    // [CASE 1-B] Standard Blog Layout (Resource Hub Style)
    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <ListLayoutWithTags 
           posts={filteredPosts} 
           title={categoryName} 
           initialDisplayPosts={displayPosts}
           pagination={{ totalPages, currentPage: pageNumber }}
        />
        <Footer />
      </div>
    );
  }

  // =========================================================
  // [CASE 2] 글 상세 화면
  // =========================================================
  const path = decodeURI(baseSlug.join('/'));
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
  const authorDetails = post.authors?.map((author) => {
    const authorRes = allAuthors.find((p) => p.slug === author);
    return coreContent(authorRes as Authors);
  }) || [];
  
  if (isDocumentation) {
    const pathParts = post.path.split('/');
    const postLocale = pathParts[1].toLowerCase();
    
    const allDocPosts = allBlogs.filter(p => {
       const pParts = p.path.split('/');
       return pParts.length >= 3 && pParts[1].toLowerCase() === postLocale && pParts[2].toLowerCase() === 'documentation';
    }).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    return (
      <div className="flex flex-col w-full">
         <Header />
         <DocLayout content={mainContent} allDocPosts={allDocPosts} toc={post.toc}>
            <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
         </DocLayout>
         <Footer />
      </div>
    );
  }

  const Layout = layouts[post.layout || defaultLayout as keyof typeof layouts];

  return (
    <Layout content={mainContent} authorDetails={authorDetails} next={undefined} prev={undefined}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </Layout>
  );
}