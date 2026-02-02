'use client';

import { KBarSearchProvider } from '@shipixen/pliny/search/KBar';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import { Blog } from 'contentlayer/generated';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { searchLinks } from '@/data/config/searchLinks';

export const SearchProvider = ({ children }) => {
  const router = useRouter();

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
          return [
            ...json.map((post: any) => ({
              id: post.path,
              name: post.title,
              keywords: (post?.description || '') + ' ' + (post?.summary || '') + ' ' + (post.body?.raw || ''),
              section: 'Blog',
              subtitle: post.description || post.summary || post.tags.join(', '),
              perform: () => router.push(makeRootPath(post.path)),
            })),

            ...searchLinks.map((link) => {
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
