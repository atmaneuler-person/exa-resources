'use client';

import { KBarSearchProvider } from '@shipixen/pliny/search/KBar';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, usePathname } from 'next/navigation';
import { searchLinks } from '@/data/config/searchLinks';
import { siteConfig } from '@/data/config/site.settings';
import { searchTranslations } from '@/components/search/data/searchLocale';

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const possibleLocale = pathname.split('/')[1];
  const currentLocale = (siteConfig.locales as readonly string[]).includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  const t = searchTranslations[currentLocale] || searchTranslations['en'];

  const makeRootPath = (path: string) => {
    if (!path.startsWith('/')) {
      return `/${path}`;
    }

    return path;
  };

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        onSearchDocumentsLoad(json) {
          const localizedLinks = searchLinks[currentLocale] || searchLinks['en'] || [];
          
          return [
            ...json.map((post: any) => ({
              id: post.path,
              name: post.title,
              keywords: (post?.description || '') + ' ' + (post?.summary || '') + ' ' + (post.body?.raw || ''),
              section: t.blog,
              subtitle: post.description || post.summary || post.tags.join(', '),
              perform: () => router.push(makeRootPath(post.path)),
            })),

            ...localizedLinks.map((link) => {
              return {
                id: link.id,
                name: link.name,
                keywords: link.keywords,
                section: link.section,
                perform: () => router.push(link.href),
              };
            }),
          ];
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  );
};

export default SearchProvider;
