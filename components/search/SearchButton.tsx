'use client';

import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import CustomSearchModal from '@/components/search/CustomSearchModal';
import { siteConfig } from '@/data/config/site.settings';

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!siteConfig.search) return null;

  return (
    <>
      <button 
        aria-label="Search" 
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
