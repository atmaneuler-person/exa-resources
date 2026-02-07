/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, Fragment, useMemo } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { SearchIcon, X, ArrowRight, ExternalLink } from 'lucide-react';
import Fuse from 'fuse.js';
import { siteConfig } from '@/data/config/site.settings';
import { searchTranslations } from './data/searchLocale';
import { searchLinks } from '@/data/config/searchLinks';

interface SearchResult {
  title: string;
  description?: string;
  summary?: string;
  date?: string;
  tags?: string[];
  path: string;
  slug?: string;
  body?: { raw: string };
  matches?: any[];
  type?: 'post' | 'link';
}

export const CustomSearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect locale
  const possibleLocale = pathname.split('/')[1];
  const currentLocale = (siteConfig.locales as readonly string[]).includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  const t = searchTranslations[currentLocale] || searchTranslations['en'];

  useEffect(() => {
    setIsLoading(true);
    fetch('/search.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch search index');
        return res.json();
      })
      .then((data) => {
        // Prepare data from search.json
        const posts: SearchResult[] = data.map((post: any) => ({
          ...post,
          type: 'post',
        }));

        // Prepare localized links
        const links: SearchResult[] = (searchLinks[currentLocale] || searchLinks['en'] || []).map((link: any) => ({
          title: link.name,
          description: link.keywords,
          path: link.href,
          type: 'link',
        }));

        const combinedData = [...links, ...posts];

        const fuseInstance = new Fuse(combinedData, {
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 2,
          ignoreLocation: true,
          threshold: 0.4, // Increased from 0.25 for better matching
          keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1.5 },
            { name: 'summary', weight: 1 },
            { name: 'body.raw', weight: 0.8 },
            { name: 'body', weight: 0.8 },
          ],
        }) as Fuse<SearchResult>;
        setFuse(fuseInstance);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Search index fetch error:', err);
        setIsLoading(false);
      });
  }, [currentLocale]);

  useEffect(() => {
    if (query && fuse) {
      const fuseResults = fuse.search(query);
      const filteredResults = fuseResults
        .map((result) => ({
          ...result.item,
          matches: result.matches ? [...result.matches] : [],
        }))
        .filter((item) => {
          if (item.type === 'link') return true; // Links are already localized
          
          const itemPathParts = item.path.split('/');
          const itemLocale = itemPathParts[0] === 'posts' ? itemPathParts[1] : itemPathParts[0];
          return itemLocale?.toLowerCase() === currentLocale.toLowerCase();
        })
        .slice(0, 50);
        
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query, fuse, currentLocale]);

  const handleLinkClick = (path: string) => {
    onClose();
    const targetPath = path.startsWith('/') ? path : `/${path}`;
    router.push(targetPath);
  };

  const getContextSnippet = (text: string, matches: any[]) => {
    if (!text) return '';
    if (!query) return text.slice(0, 100) + '...';

    let matchIndex = -1;
    // Check for both body.raw and body matches
    const bodyMatch = matches?.find((m) => m.key === 'body.raw' || m.key === 'body');
    if (bodyMatch) {
      matchIndex = bodyMatch.indices[0][0];
    } else {
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx >= 0) matchIndex = idx;
    }

    if (matchIndex === -1) {
      return text.slice(0, 100) + '...';
    }

    const padding = 60;
    const start = Math.max(0, matchIndex - padding);
    const end = Math.min(text.length, matchIndex + query.length + padding);
    
    let snippet = text.slice(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
  };
  
  const HighlightedText = ({ text, matches }: { text: string; matches: any[] }) => {
    const snippet = getContextSnippet(text, matches);
    
    if (!snippet) return null;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = snippet.split(new RegExp(`(${escapedQuery})`, 'gi'));
    
    return (
      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors break-words">
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="bg-orange-500/20 text-orange-400 font-bold px-0.5 rounded-[2px]">{part}</span> 
            : part
        )}
      </span>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md bg-gray-950/95 shadow-2xl border-l border-white/10 flex h-full flex-col">
                  {/* Header */}
                  <div className="p-8 pb-0 flex-shrink-0">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                         <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                         {t.title}
                      </h2>
                      <button
                        type="button"
                        className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative group">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <SearchIcon className="h-5 w-5 text-gray-500 group-focus-within:text-orange-500 transition-colors" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        className="block w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white shadow-inner placeholder:text-gray-500 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all sm:text-sm"
                        placeholder={t.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="relative mt-8 flex-1 px-4 sm:px-8 pb-8 overflow-y-auto custom-scrollbar">
                    {isLoading && (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-10 h-10 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
                        <p className="text-gray-500 text-sm">Loading search index...</p>
                      </div>
                    )}

                    {!isLoading && query.length > 0 && results.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                           <SearchIcon className="h-8 w-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 font-medium">{t.noResults} "{query}"</p>
                        <p className="text-sm text-gray-600 mt-2 max-w-[240px] leading-relaxed">{t.tryKeywords}</p>
                      </div>
                    )}

                    <ul className="space-y-4">
                      {results.map((result) => (
                        <li key={result.path} className="animate-in slide-in-from-bottom-2 duration-300">
                          <div 
                            className="group relative flex flex-col gap-2 p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                            onClick={() => handleLinkClick(result.path)}
                          >
                            {/* Glass background effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-orange-600/10 transition-colors" />

                            {/* Meta */}
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase">
                              {result.type === 'link' ? (
                                <span className="flex items-center gap-1 text-blue-400"><ExternalLink className="w-2.5 h-2.5" /> LINK</span>
                              ) : (
                                <span>{result.path.split('/')[2] || t.blog}</span>
                              )}
                              <span className="w-1 h-1 bg-gray-700 rounded-full" />
                              <span className="text-gray-500">{result.tags?.[0] || 'SITE'}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                              {result.title}
                            </h3>

                            {/* Description (Static) */}
                            {result.description && (
                              <p className="text-xs text-gray-500 line-clamp-1 italic">{result.description}</p>
                            )}
                            
                            {/* Snippet (Dynamic) */}
                            {result.type === 'post' && (result.body?.raw || (result as any).body) && (
                              <div className="mt-2 pt-3 border-t border-white/5">
                                <HighlightedText 
                                  text={result.body?.raw || (result as any).body} 
                                  matches={result.matches || []} 
                                />
                              </div>
                            )}

                            {/* Chevron */}
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                              <ArrowRight className="h-5 w-5 text-orange-500" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomSearchModal;
