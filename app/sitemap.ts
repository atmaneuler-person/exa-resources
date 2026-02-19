import { MetadataRoute } from 'next';
import { allBlogs } from 'contentlayer/generated';
import { siteConfig } from '@/data/config/site.settings';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.siteUrl;
  const blogRoutes = allBlogs
    .filter((post) => {
      const isDocs = post._raw.sourceFilePath.toLowerCase().split('/').includes('docs');
      const isPublicDoc = (post as any).public === true;
      // [Selective Public Access] public: true인 Docs 문서는 sitemap에 포함 (검색엔진 노출)
      return !post.draft && (!isDocs || isPublicDoc);
    })
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }));

  const routes = ['', 'overview', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
