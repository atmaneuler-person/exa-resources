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
  const decodedPath = decodeURI(slugArray.join('/'));

  // Try exact match
  let post = allBlogs.find((p) => p.path === decodedPath);

  // Try with 'posts/' prefix
  if (!post) {
    post = allBlogs.find((p) => p.path === `posts/${decodedPath}`);
  }

  // Try with 'posts/[defaultLocale]/' if path doesn't start with locale
  if (!post) {
    // Check if first segment is locale
    const firstSegment = slugArray[0];
    const isLocale = siteConfig.locales.includes(firstSegment);
    if (!isLocale) {
      const locale = siteConfig.defaultLocale || 'en';
      post = allBlogs.find((p) => p.path === `posts/${locale}/${decodedPath}`);
    }
  }

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

  const currentLocale = isFirstSegmentLocale ? segments[0] : (siteConfig.defaultLocale || 'en');
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

  if (subPath === 'refund') {
    const { RefundPage } = await import('@/components/shared/pages/RefundPage');
    return <RefundPage locale={currentLocale} />;
  }

  if (subPath === 'login') {
    const { LoginPage } = await import('@/components/shared/pages/LoginPage');
    return <LoginPage locale={currentLocale} />;
  }

  if (subPath === 'products/exawin') {
    const { ExaWinProductPage } = await import('@/components/shared/pages/ExaWinProductPage');
    return <ExaWinProductPage params={{ locale: currentLocale }} />;
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
    const posts = sortPosts(allBlogs).filter(post => !post.draft);
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
          <DocLayout allDocPosts={sortedPosts} locale={currentLocale}>
            <div className="py-12">
              <h2 className="text-2xl font-bold mb-6">Welcome to the {categoryName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPosts.map(p => (
                  <Link key={p.path} href={`/${currentLocale}/${p.path}`} className="p-6 border border-gray-100 rounded-2xl hover:border-orange-500 transition-all">
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

  // ==========================================================================================
  // [GRAND PRINCIPLE: SELECTED LANGUAGE PERSISTENCE & SLUG INTEGRITY]
  // ==========================================================================================
  // RULE 1: Selected Language (URL Prefix) is the ABSOLUTE Master.
  // RULE 2: Slug Integrity - Preservation of file identity across languages.
  // RULE 3: Content retrieval is STRICTLY folder-based (posts/[locale]/[Category]/...).
  // ==========================================================================================

  let slugIdentity = "";
  const allLocales = siteConfig.locales as string[];
  const lookupSegments = [...baseSlug];

  if (lookupSegments[0] === 'posts') lookupSegments.shift();
  if (allLocales.includes(lookupSegments[0])) lookupSegments.shift();

  slugIdentity = lookupSegments.join('/');

  // [RULE 4] Selection (Tab) dictates Reality (Folder Location)
  const targetPath = `posts/${currentLocale}/${slugIdentity}`;
  let post = allBlogs.find(p => p.path === targetPath);

  // [Fallback Logic] Strictly for internal linking stability, never breaking Rule 1
  if (!post) {
    post = allBlogs.find(p => p.path === `${currentLocale}/${slugIdentity}`);
  }
  if (!post) {
    const rawDecodedPath = decodeURI(slugArray.join('/'));
    post = allBlogs.find(p => p.path === rawDecodedPath || p.path === `posts/${rawDecodedPath}`);
  }

  // Handle 404
  if (!post) {
    return (
      <div className="flex flex-col w-full items-center">
        <Header />
        <div className="mt-24 text-center min-h-[50vh]">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <div className="mt-4 text-gray-500">Requested identity: {slugIdentity} in {currentLocale}</div>
          <Button asChild className="mt-8"><Link href={`/${currentLocale}`}>Back to Home</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  // ==========================================================================================
  // [GRAND PRINCIPLE: STRICT ISOLATION & CATEGORY RULE]
  // ==========================================================================================
  // RULE A: 5 Blog Categories (Bayesian, AI, Business, Science, Solution) & Docs are fixed.
  // RULE B: Documentation (Docs) is isolated based on physical path 'posts/[locale]/docs/...'.
  // RULE C: Blog and Docs NEVER share lists or indices.
  // ==========================================================================================

  const sourcePath = post._raw.sourceFilePath;
  const pathParts = sourcePath.split('/');
  // [ISOLATION CHECK] Identify if content is 'Docs' based on folder structure index 2
  const isDocsContent = pathParts.length >= 3 && pathParts[2].toLowerCase() === 'docs';

  // [Selective Public Access] public: true인 Docs 문서는 비로그인 접근 허용
  const isPublicDoc = (post as any).public === true;
  let isAuthenticated = false;
  if (isDocsContent) {
    const session = await auth();
    isAuthenticated = !!session?.user;
    if (!isPublicDoc && !isAuthenticated) {
      return <RestrictedContentGate postTitle={post.title} />;
    }
  }

  // ==========================================================================================
  // [GRAND PRINCIPLE: UNIQUE CONTENT IDENTITY]
  // ==========================================================================================
  // RULE: Every post must have a unique identity for Comments and Stats.
  //       We explicitly pass 'path' to ensure DB keys are unique.
  // ==========================================================================================
  const mainContent = {
    ...coreContent(post),
    path: post.path, // Force inclusion of unique ID for Comments/Stats
  };

  const authorDetails = post.authors?.map((author) => {
    const authorRes = allAuthors.find((p) => p.slug === author);
    return coreContent(authorRes as Authors);
  }) || [];

  // [RULE] Docs Layout: Technical manual structure with sidebar and order-based sorting.
  if (isDocsContent) {
    const allDocPosts = allBlogs.filter(p => {
      const pSource = p._raw.sourceFilePath;
      const pParts = pSource.split('/');
      return pParts.length >= 3 &&
        pParts[1].toLowerCase() === currentLocale.toLowerCase() &&
        pParts[2].toLowerCase() === 'docs';
    }).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    return (
      <div className="flex flex-col w-full">
        <Header />
        <DocLayout content={mainContent} allDocPosts={allDocPosts} toc={post.toc} locale={currentLocale} isAuthenticated={isAuthenticated}>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        </DocLayout>
        <Footer />
      </div>
    );
  }

  // [RULE] Standard Blog Layout: For the 5 designate categories.
  const Layout = layouts[post.layout || defaultLayout as keyof typeof layouts];
  return (
    <Layout content={mainContent} authorDetails={authorDetails} next={undefined} prev={undefined}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </Layout>
  );
}