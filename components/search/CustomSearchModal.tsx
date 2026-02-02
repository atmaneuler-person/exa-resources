/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { SearchIcon, X, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';
import { formatDate } from '@shipixen/pliny/utils/formatDate';

interface SearchResult {
  title: string;
  description: string;
  summary: string;
  date: string;
  tags: string[];
  path: string;
  slug: string;
  body: { raw: string };
  matches?: any[];
}

export const CustomSearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);

  useEffect(() => {
    fetch('/search.json')
      .then((res) => res.json())
      .then((data) => {
        setSearchIndex(data);
        const fuseInstance = new Fuse(data, {
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 2,
          ignoreLocation: true,
          threshold: 0.2,
          keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1.5 },
            { name: 'summary', weight: 1 },
            { name: 'body.raw', weight: 0.8 },
          ],
        }) as Fuse<SearchResult>;
        setFuse(fuseInstance);
      });
  }, []);

  useEffect(() => {
    if (query && fuse) {
      const fuseResults = fuse.search(query);
      const mappedResults = fuseResults.map((result) => ({
        ...result.item,
        matches: result.matches ? [...result.matches] : [],
      })).slice(0, 50);
      setResults(mappedResults);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleLinkClick = (path: string) => {
    onClose();
    const targetPath = path.startsWith('/') ? path : `/${path}`;
    router.push(targetPath);
  };

  const getContextSnippet = (text: string, matches: any[]) => {
    if (!text) return '';
    if (!query) return text.slice(0, 100) + '...';

    let matchIndex = -1;
    const bodyMatch = matches?.find((m) => m.key === 'body.raw');
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
          <span className="text-sm text-gray-500 dark:text-gray-400 break-words">
             {parts.map((part, i) => 
               part.toLowerCase() === query.toLowerCase() 
               ? <span key={i} className="bg-yellow-200 dark:bg-yellow-900/60 text-gray-900 dark:text-yellow-100 font-bold px-0.5 rounded-[1px]">{part}</span> 
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
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
                <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white dark:bg-[#0d1117] shadow-xl border-l border-gray-200 dark:border-gray-800 flex h-full flex-col">
                  {/* Header */}
                  <div className="p-6 pb-0 flex-shrink-0">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Search</h2>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-xl border-0 py-4 pl-10 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:bg-gray-800 sm:text-sm sm:leading-6"
                        placeholder="Search relevant contents..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 pb-6 overflow-y-auto">
                       {query.length > 0 && results.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                              <SearchIcon className="h-12 w-12 text-gray-300 mb-4" />
                              <p className="text-gray-500">No results found for "{query}"</p>
                              <p className="text-sm text-gray-400 mt-2">Try searching for keywords in the article body.</p>
                          </div>
                      )}

                      <ul className="space-y-4">
                          {results.map((result) => (
                              <li key={result.path}>
                                  <div 
                                     className="group relative flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                                     onClick={() => handleLinkClick(result.path)}
                                  >
                                      {/* Meta */}
                                      <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                                          <span className="text-orange-600">{result.path.split('/')[2] || 'BLOG'}</span>
                                          <span>•</span>
                                          <span>{result.tags?.[0]}</span>
                                      </div>

                                      {/* Title */}
                                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                          {result.title}
                                          <span className="absolute inset-0" aria-hidden="true" />
                                      </h3>

                                      {/* Description (Static) */}
                                      {result.description && (
                                          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{result.description}</p>
                                      )}
                                      
                                      {/* Snippet (Dynamic) */}
                                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                                          <HighlightedText text={result.body.raw} matches={result.matches || []} />
                                      </div>

                                      {/* Chevron */}
                                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
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
