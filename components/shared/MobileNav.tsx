/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import Link from './Link';
import { headerNavLinks } from '@/data/config/headerNavLinks';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';

export const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="lg:hidden ml-1 p-2 text-white hover:text-orange-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[99999] flex flex-col bg-white dark:bg-[#000519] lg:hidden overflow-y-auto ${
            navShow ? 'translate-x-0' : 'translate-x-full invisible'
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              className="h-10 w-10 p-1 cursor-pointer"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col flex-1 px-8 pb-8">
            {headerNavLinks.map((link) => (
              <div key={link.title} className="border-b border-gray-100 dark:border-gray-800 last:border-none">
                <Link
                  href={link.href}
                  className="block py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              </div>
            ))}
            
            {status === 'authenticated' && (session?.user as any)?.isAdmin && (
              <div className="border-b border-gray-100 dark:border-gray-800 last:border-none">
                <Link
                  href="/admin/stats"
                  className="block py-4 text-2xl font-bold tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
                  onClick={onToggleNav}
                >
                  Stats
                </Link>
              </div>
            )}
            
            <div className="mt-auto pt-8 pb-12 flex flex-col space-y-6">
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Theme</span>
                  <ThemeSwitch />
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Language</span>
                  <LanguageSwitcher />
               </div>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default MobileNav;
