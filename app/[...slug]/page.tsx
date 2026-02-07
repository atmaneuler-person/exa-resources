// import { sortPosts } from '@shipixen/pliny/utils/contentlayer';
// import { allBlogs, allAuthors } from 'contentlayer/generated';
// import type { Authors, Blog } from 'contentlayer/generated';
// import { coreContent } from '@shipixen/pliny/utils/contentlayer';
// import Link from 'next/link';
// import { Button } from '@/components/shared/ui/button';
// import Header from '@/components/shared/Header';
// import Footer from '@/components/shared/Footer';
// import PostCard from '@/components/shared/PostCard'; 
// import { TagBar } from '@/components/shared/TagBar';
// import RestrictedContentGate from '@/components/shared/RestrictedContentGate'; // Import Gate Component
// import { MDXLayoutRenderer } from '@shipixen/pliny/mdx-components';
// import { components } from '@/components/MDXComponents';
// import PostSimple from '@/layouts/PostSimple';
// import PostLayout from '@/layouts/PostLayout';
// import PostBanner from '@/layouts/PostBanner';
// import ListLayoutWithTags from '@/layouts/ListLayoutWithTags';
// import DocLayout from '@/layouts/DocLayout';
// import { siteConfig } from '@/data/config/site.settings';
// import { Metadata } from 'next';
// import { MainPage } from '@/components/shared/MainPage';
// import { CompanyPage } from '@/components/shared/CompanyPage';
// import { auth } from '@/lib/auth';

// const defaultLayout = 'PostLayout';
// const layouts = { PostSimple, PostLayout, PostBanner };
// const BLOG_URL = siteConfig.blogPath ? `/${siteConfig.blogPath}` : '';

// export async function generateMetadata(props: {
//   params: Promise<{ slug: string[] }>;
// }): Promise<Metadata | undefined> {
//   const params = await props.params;
//   const slugArray = params.slug;

//   const segments = slugArray;
//   const isFirstSegmentLocale = (siteConfig.locales as readonly string[]).includes(segments[0]);
//   const currentLocaleForMeta = isFirstSegmentLocale ? segments[0] : (siteConfig.defaultLocale || 'ko');
//   const baseSlugForMeta = isFirstSegmentLocale ? segments.slice(1) : segments;
//   const subPathForMeta = baseSlugForMeta.join('/');

//   if (baseSlugForMeta[0] === 'category') {
//     const categoryName = decodeURI(baseSlugForMeta[1] || '');
//     return {
//       title: categoryName,
//       description: `Articles in ${categoryName}`,
//     };
//   }

//   if (subPathForMeta === 'about') {
//     return {
//       title: 'About Us',
//       description: 'We are an Applied Science Company.',
//     };
//   }

//   if (subPathForMeta === 'pricing') {
//     return {
//       title: 'Pricing',
//       description: 'Flexible pricing plans for EXA services.',
//     };
//   }

//   if (subPathForMeta === 'solutions/exawin') {
//     return {
//       title: 'ExaWin',
//       description: 'The Physics of Global Sales with NSBI.',
//     };
//   }

//   if (subPathForMeta === 'privacy') {
//     return {
//       title: 'Privacy Policy',
//       description: 'Our privacy practices and policies.',
//     };
//   }

//   if (subPathForMeta === 'terms') {
//     return {
//       title: 'Terms of Service',
//       description: 'Terms and conditions for using EXA services.',
//     };
//   }

//   if (subPathForMeta === 'login') {
//     return {
//       title: 'Login',
//       description: 'Authorized Access Only',
//     };
//   }

//   const path = BLOG_URL + decodeURI(slugArray.join('/'));
//   const post = allBlogs.find((p) => p.path === path);
//   if (!post) return;

//   return {
//     title: post.title,
//     description: post.summary,
//   };
// }

// export const generateStaticParams = async () => {
//   return allBlogs.map((p) => ({ slug: p.path.split('/') }));
// };

// import Pagination from '@/components/shared/Pagination';

// export default async function Page(props: { params: Promise<{ slug: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
//   const params = await props.params;
//   const searchParams = await props.searchParams;
//   const slugArray = params.slug;

//   const segments = params.slug;
//   const isFirstSegmentLocale = (siteConfig.locales as readonly string[]).includes(segments[0]);
  
//   const currentLocale = isFirstSegmentLocale ? segments[0] : (siteConfig.defaultLocale || 'ko');
//   const baseSlug = isFirstSegmentLocale ? segments.slice(1) : segments;

//   // If it's just the locale (e.g. /en), render MainPage
//   if (baseSlug.length === 0) {
//     return <MainPage locale={currentLocale} />;
//   }

//   // =========================================================
//   // [NEW] Static Page Handling (About, Pricing, Solutions, etc.)
//   // Intercept locale-prefixed routes like /ko/about, /ja/pricing, etc.
//   // =========================================================
//   const subPath = baseSlug.join('/');
  
//   if (subPath === 'about') {
//       const { companyData, contactData } = await import('@/components/shared/data/companyData');
//       const t = companyData[currentLocale] || companyData['en'];
//       const c = contactData[currentLocale] || contactData['en'];
//       return <CompanyPage locale={currentLocale} textData={t} contactData={c} />;
//   }

//   if (subPath === 'pricing') {
//       const { PricingPage } = await import('@/components/shared/pages/PricingPage');
//       return <PricingPage locale={currentLocale} />;
//   }

//   if (subPath === 'solutions/exawin') {
//       const { ExaWinPage } = await import('@/components/shared/pages/ExaWinPage');
//       return <ExaWinPage locale={currentLocale} />;
//   }

//   if (subPath === 'privacy') {
//       const { PrivacyPage } = await import('@/components/shared/pages/PrivacyPage');
//       return <PrivacyPage locale={currentLocale} />;
//   }

//   if (subPath === 'terms') {
//       const { TermsPage } = await import('@/components/shared/pages/TermsPage');
//       return <TermsPage locale={currentLocale} />;
//   }

//   if (subPath === 'login') {
//       const { LoginPage } = await import('@/components/shared/pages/LoginPage');
//       return <LoginPage locale={currentLocale} />;
//   }

//   // =========================================================
//   // [CASE 1] Category or Tag List
//   // =========================================================
//   let isCategoryPage = false;
//   let isTagPage = false;
//   let categoryName = '';
//   let tagName = '';

//   // Pattern: /category/[name], /tags, /tags/[name]
//   if (baseSlug[0] === 'category') {
//     isCategoryPage = true;
//     categoryName = decodeURI(baseSlug[1] || '');
//   } else if (baseSlug[0] === 'tags') {
//     isTagPage = true;
//     tagName = decodeURI(baseSlug[1] || '');
//   }

//   // =========================================================
//   // [NEW] All Articles List
//   // =========================================================
//   let isAllArticlesPage = false;
//   if (baseSlug[0] === 'all-articles') {
//     isAllArticlesPage = true;
//     categoryName = 'EXA Business Science Lab';
//   }

//   if (isCategoryPage || isAllArticlesPage || isTagPage) {
//     const posts = sortPosts(allBlogs);
//     const { slug } = await import('github-slugger');

//     // Filter by Category/Tag AND Locale
//     // const filteredPosts = posts.filter((post) => {
//     //   const sourcePath = post._raw.sourceFilePath;
//     //   const pathParts = sourcePath.split('/'); 
//     const filteredPosts = posts.filter((post) => {
//       // post._raw가 존재하지 않을 경우를 대비한 방어 코드
//       const sourcePath = post?._raw?.sourceFilePath || '';     
//       if (!sourcePath) return false;

//       const pathParts = sourcePath.split('/');
//       if (pathParts.length < 3) return false;

//       const postLocale = pathParts[1].toLowerCase();
//       if (postLocale !== currentLocale.toLowerCase()) return false;

//       const isDocsPost = pathParts.some(part => part.toLowerCase() === 'docs');

//       if (isTagPage) {
//         if (!tagName) return !isDocsPost;
//         return post.tags && post.tags.map((t) => slug(t)).includes(tagName) && !isDocsPost;
//       }

//       if (isAllArticlesPage) return !isDocsPost;

//       const postCategory = pathParts[2].toLowerCase();
//       const targetCategory = categoryName.toLowerCase();
//       if (targetCategory !== 'docs' && isDocsPost) return false;
//       return postCategory === targetCategory;
//     });
    
//     // If it's a Tag Root Page (/ko/tags), render a list of tags
//     if (isTagPage && !tagName) {
//        const tagData = (await import('app/tag-data.json')).default as Record<string, number>;
//        return (
//          <div className="flex flex-col w-full items-center">
//             <Header />
//             <div className="flex items-center justify-center min-h-[50vh] py-10">
//               <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
//                 <div className="space-x-2 pb-8 pt-6 md:space-y-5">
//                   <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 uppercase">
//                     Tags
//                   </h1>
//                 </div>
//                 <div className="flex flex-wrap max-w-lg">
//                   {Object.keys(tagData).length === 0 && 'No tags found.'}
//                   {Object.keys(tagData).map((t) => (
//                     <div key={t} className="mb-2 mr-5 mt-2">
//                       <Link
//                         href={`/${currentLocale}/tags/${slug(t)}`}
//                         className="-ml-2 text-sm font-semibold uppercase text-orange-600 hover:text-orange-500"
//                         aria-label={`View posts tagged ${t}`}
//                       >
//                         {t} ({tagData[t]})
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <Footer />
//          </div>
//        );
//     }

//     if (isTagPage) {
//       categoryName = `${tagName[0].toUpperCase() + tagName.slice(1)} Posts`;
//     }
//     // Extract Unique Tags from Filtered Posts
//     const allTags = filteredPosts
//         .map(post => post.tags?.[0])
//         .filter((tag): tag is string => !!tag);
//     const uniqueTags = Array.from(new Set(allTags));

//     // [PAGINATION LOGIC]
//     const POSTS_PER_PAGE = 9;
//     const pageNumber = parseInt(searchParams.page as string || '1');
//     const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
//     const displayPosts = filteredPosts.slice((pageNumber - 1) * POSTS_PER_PAGE, pageNumber * POSTS_PER_PAGE);

//     // [CASE 1-A] Documentation Layout (Sidebar Style)
//     if (categoryName.toLowerCase() === 'docs') {
//        const session = await auth();
//        if (!session?.user) {
//           return <RestrictedContentGate postTitle="Documentation Library" />;
//        }

//        const sortedPosts = filteredPosts.sort((a, b) => {
//           const orderA = a.order ?? 999;
//           const orderB = b.order ?? 999;
//           return orderA - orderB;
//        });

//        return (
//          <div className="flex flex-col w-full items-center">
//             <Header />
//             <DocLayout allDocPosts={sortedPosts}>
//                <div className="py-12">
//                   <h2 className="text-2xl font-bold mb-6">Welcome to the {categoryName}</h2>
//                   <p className="text-gray-600 dark:text-gray-400 mb-12">
//                      Select a topic from the sidebar to start reading our comprehensive guides.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                      {sortedPosts.map(p => (
//                         <Link key={p.path} href={`/${p.path}`} className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-orange-500/50 transition-all">
//                            <h3 className="font-bold mb-2">{p.title}</h3>
//                            <p className="text-sm text-gray-500 line-clamp-2">{p.summary}</p>
//                         </Link>
//                      ))}
//                   </div>
//                </div>
//             </DocLayout>
//             <Footer />
//          </div>
//        );
//     }

//     // [CASE 1-B] Standard Blog Layout (Resource Hub Style)
//     return (
//       <div className="flex flex-col w-full items-center">
//         <Header />
//         <ListLayoutWithTags 
//            posts={filteredPosts} 
//            title={categoryName} 
//            initialDisplayPosts={displayPosts}
//            pagination={{ totalPages, currentPage: pageNumber }}
//         />
//         <Footer />
//       </div>
//     );
//   }

//   // =========================================================
//   // [CASE 2] 글 상세 화면
//   // =========================================================
//   const path = decodeURI(baseSlug.join('/'));
//   const post = allBlogs.find((p) => p.path === path) as Blog;

//   if (!post) {
//     return (
//       <div className="flex flex-col w-full items-center">
//         <Header />
//         <div className="mt-24 text-center min-h-[50vh]">
//           <h1 className="text-3xl font-bold">Page Not Found</h1>
//           <div className="mt-4 text-gray-500">Path: {path}</div>
//           <Button asChild className="mt-8"><Link href="/">Back to Home</Link></Button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // [ACCESS CONTROL] Check if post is Documentation
//   const isDocumentation = post.tags?.includes('Manual') || post.path.includes('/Docs/');
  
//   if (isDocumentation) {
//      const session = await auth();
//      if (!session?.user) {
//         return <RestrictedContentGate postTitle={post.title} />;
//      }
//   }

//   const mainContent = coreContent(post);
//   const authorDetails = post.authors?.map((author) => {
//     const authorRes = allAuthors.find((p) => p.slug === author);
//     return coreContent(authorRes as Authors);
//   }) || [];
  
//   if (isDocumentation) {
//     const pathParts = post.path.split('/');
//     const postLocale = pathParts[1].toLowerCase();
    
//     const allDocPosts = allBlogs.filter(p => {
//        const pParts = p.path.split('/');
//        return pParts.length >= 3 && pParts[1].toLowerCase() === postLocale && pParts[2].toLowerCase() === 'docs';
//     }).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

//     return (
//       <div className="flex flex-col w-full">
//          <Header />
//          <DocLayout content={mainContent} allDocPosts={allDocPosts} toc={post.toc}>
//             <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
//          </DocLayout>
//          <Footer />
//       </div>
//     );
//   }

//   const Layout = layouts[post.layout || defaultLayout as keyof typeof layouts];

//   return (
//     <Layout content={mainContent} authorDetails={authorDetails} next={undefined} prev={undefined}>
//       <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
//     </Layout>
//   );
// }


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
import RestrictedContentGate from '@/components/shared/RestrictedContentGate';
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
import { CompanyPage } from '@/components/shared/CompanyPage';
import { auth } from '@/lib/auth';
import Pagination from '@/components/shared/Pagination';

const defaultLayout = 'PostLayout';
const layouts = { PostSimple, PostLayout, PostBanner };
const BLOG_URL = siteConfig.blogPath ? `/${siteConfig.blogPath}` : '';

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const slugArray = params.slug;
  const path = BLOG_URL + decodeURI(slugArray.join('/'));
  const post = allBlogs.find((p) => p.path === path);
  if (!post) return;
  return { title: post.title, description: post.summary };
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.path.split('/') }));
};

export default async function Page(props: { params: Promise<{ slug: string[] }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slugArray = params.slug;

  const segments = params.slug;
  const isFirstSegmentLocale = (siteConfig.locales as readonly string[]).includes(segments[0]);
  
  const currentLocale = isFirstSegmentLocale ? segments[0] : (siteConfig.defaultLocale || 'ko');
  const baseSlug = isFirstSegmentLocale ? segments.slice(1) : segments;

  if (baseSlug.length === 0) {
    return <MainPage locale={currentLocale} />;
  }

  const subPath = baseSlug.join('/');
  
  if (subPath === 'about') {
      const { companyData, contactData } = await import('@/components/shared/data/companyData');
      const t = companyData[currentLocale] || companyData['en'];
      const c = contactData[currentLocale] || contactData['en'];
      return <CompanyPage locale={currentLocale} textData={t} contactData={c} />;
  }

  if (subPath === 'pricing') {
      const { PricingPage } = await import('@/components/shared/pages/PricingPage');
      return <PricingPage locale={currentLocale} />;
  }

  if (subPath === 'solutions/exawin') {
      const { ExaWinPage } = await import('@/components/shared/pages/ExaWinPage');
      return <ExaWinPage locale={currentLocale} />;
  }

  if (subPath === 'privacy') {
      const { PrivacyPage } = await import('@/components/shared/pages/PrivacyPage');
      return <PrivacyPage locale={currentLocale} />;
  }

  if (subPath === 'terms') {
      const { TermsPage } = await import('@/components/shared/pages/TermsPage');
      return <TermsPage locale={currentLocale} />;
  }

  if (subPath === 'login') {
      const { LoginPage } = await import('@/components/shared/pages/LoginPage');
      return <LoginPage locale={currentLocale} />;
  }

  let isCategoryPage = false;
  let isTagPage = false;
  let categoryName = '';
  let tagName = '';

  if (baseSlug[0] === 'category') {
    isCategoryPage = true;
    categoryName = decodeURI(baseSlug[1] || '');
  } else if (baseSlug[0] === 'tags') {
    isTagPage = true;
    tagName = decodeURI(baseSlug[1] || '');
  }

  let isAllArticlesPage = false;
  if (baseSlug[0] === 'all-articles') {
    isAllArticlesPage = true;
    categoryName = 'EXA Business Science Lab';
  }

  if (isCategoryPage || isAllArticlesPage || isTagPage) {
    const posts = sortPosts(allBlogs);
    const { slug } = await import('github-slugger');

    const filteredPosts = posts.filter((post) => {
      // [Antigravity Rules] 다국어 대원칙 준수: 물리적 파일 경로(posts/[locale]/...)를 기준으로 언어 및 카테고리 판별
      const sourcePath = post._raw.sourceFilePath; // 예: posts/ko/Docs/intro.mdx
      const pathParts = sourcePath.split('/');
      
      // 최소 깊이 확인: posts/locale/category/... (최소 3단계)
      if (pathParts.length < 3) return false;

      // [Rule] 1. 언어 폴더 위치: pathParts[1]
      const postLocale = pathParts[1].toLowerCase();

      // 현재 로케일과 불일치하면 제외
      if (postLocale !== currentLocale.toLowerCase()) return false;

      // [Rule] 2. 카테고리 폴더 위치: pathParts[2]
      const postCategory = pathParts[2].toLowerCase();
      
      // Docs 포스트 식별: 카테고리 폴더명이 'docs'인 경우
      const isDocsPost = postCategory === 'docs';

      if (isTagPage) {
        if (!tagName) return !isDocsPost;
        return post.tags && post.tags.map((t) => slug(t)).includes(tagName) && !isDocsPost;
      }

      if (isAllArticlesPage) return !isDocsPost;

      const targetCategory = categoryName.toLowerCase();

      // Docs 페이지 요청인 경우: Docs 포스트만 반환
      if (targetCategory === 'docs') {
          return isDocsPost;
      }

      // Docs 페이지가 아닌 경우: Docs 포스트는 제외 (블로그 글 목록에 Docs가 나오지 않도록 함)
      if (isDocsPost) return false;
      
      // 일반 카테고리 일치 여부 확인
      return postCategory === targetCategory;
    });
    
    if (isTagPage && !tagName) {
       const tagData = (await import('app/tag-data.json')).default as Record<string, number>;
       return (
         <div className="flex flex-col w-full items-center">
            <Header />
            <div className="flex items-center justify-center min-h-[50vh] py-10">
              <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
                <div className="space-x-2 pb-8 pt-6 md:space-y-5">
                  <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 uppercase">
                    Tags
                  </h1>
                </div>
                <div className="flex flex-wrap max-w-lg">
                  {Object.keys(tagData).map((t) => (
                    <div key={t} className="mb-2 mr-5 mt-2">
                      <Link href={`/${currentLocale}/tags/${slug(t)}`} className="-ml-2 text-sm font-semibold uppercase text-orange-600 hover:text-orange-500">
                        {t} ({tagData[t]})
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
         </div>
       );
    }

    if (isTagPage) categoryName = `${tagName[0].toUpperCase() + tagName.slice(1)} Posts`;

    const POSTS_PER_PAGE = 9;
    const pageNumber = parseInt(searchParams.page as string || '1');
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const displayPosts = filteredPosts.slice((pageNumber - 1) * POSTS_PER_PAGE, pageNumber * POSTS_PER_PAGE);

    if (categoryName.toLowerCase() === 'docs') {
       const session = await auth();
       if (!session?.user) return <RestrictedContentGate postTitle="Documentation Library" />;
       const sortedPosts = filteredPosts.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

       return (
         <div className="flex flex-col w-full items-center">
            <Header />
            <DocLayout allDocPosts={sortedPosts}>
               <div className="py-12">
                  <h2 className="text-2xl font-bold mb-6">Welcome to the {categoryName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {sortedPosts.map(p => (
                        <Link key={p.path} href={`/${p.path}`} className="p-6 border border-gray-100 rounded-2xl hover:border-orange-500 transition-all">
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

    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <ListLayoutWithTags posts={filteredPosts} title={categoryName} initialDisplayPosts={displayPosts} pagination={{ totalPages, currentPage: pageNumber }} />
        <Footer />
      </div>
    );
  }

  const path = decodeURI(baseSlug.join('/'));
  const post = allBlogs.find((p) => p.path === path) as Blog;

  if (!post) {
    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <div className="mt-24 text-center min-h-[50vh]">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <Button asChild className="mt-8"><Link href="/">Back to Home</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isDocumentation = post.tags?.includes('Manual') || post.path.includes('/Docs/');
  if (isDocumentation) {
     const session = await auth();
     if (!session?.user) return <RestrictedContentGate postTitle={post.title} />;
  }

  const mainContent = coreContent(post);
  const authorDetails = post.authors?.map((author) => coreContent(allAuthors.find((p) => p.slug === author) as Authors)) || [];
  
  if (isDocumentation) {
    const pathParts = post.path.split('/');
    // [Antigravity Rules] 상세 페이지의 로케일 판별도 물리적 경로 기준 (pathParts[1])
    // post.path는 contentlayer config에 의해 'local/Docs/...' 형태로 올 수 있으나, 안전하게 '_raw'를 쓰거나
    // 여기서 이미 post 객체가 확정되었으므로 post.path를 신뢰하되, 인덱스를 정확히 함.
    // 기존 로직: postLocale = pathParts[0] === '' ? ... -> 불안정함.
    // data/posts/ko/Docs/... -> path: ko/Docs/... (contentlayer 설정에 따라 다름)
    // 하지만 가장 확실한 건 현재 보고 있는 post의 언어(currentLocale)를 기준으로 필터링하는 것.
    
    // [수정] 현재 페이지의 로케일(currentLocale)을 사용하여 Docs 목록 필터링
    const allDocPosts = allBlogs.filter(p => {
       const sourcePath = p._raw.sourceFilePath; // 물리적 경로 사용 (posts/ko/Docs/...)
       const pParts = sourcePath.split('/');
       
       // 최소 깊이 및 Docs 폴더 확인
       if (pParts.length < 3) return false;

       const pLocale = pParts[1].toLowerCase();
       const pCategory = pParts[2].toLowerCase();

       // 1. 카테고리가 Docs인지 확인
       // 2. 언어가 현재 로케일(currentLocale)과 일치하는지 확인
       return pCategory === 'docs' && pLocale === currentLocale.toLowerCase();
    }).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    return (
      <div className="flex flex-col w-full"><Header />
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