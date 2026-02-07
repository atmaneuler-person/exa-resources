'use client';

import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CustomSearchModal from '@/components/search/CustomSearchModal';
import { siteConfig } from '@/data/config/site.settings';
import { searchTranslations } from './data/searchLocale';

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const possibleLocale = pathname.split('/')[1];
  const currentLocale = (siteConfig.locales as readonly string[]).includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  const t = searchTranslations[currentLocale] || searchTranslations['en'];

  if (!siteConfig.search) return null;

  return (
    <>
      <button 
        aria-label={t.title} 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <SearchIcon className="w-6 h-6" />
      </button>

      <CustomSearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SearchButton;
