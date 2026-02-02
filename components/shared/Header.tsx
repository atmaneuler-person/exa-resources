/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { siteConfig } from '../../data/config/site.settings';
import Image from 'next/image'; 
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import SearchButton from '@/components/search/SearchButton';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import { headerNavLinks } from '../../data/config/headerNavLinks';

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const handleRestrictedClick = (e: React.MouseEvent, href: string) => {
    // Optional
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-gradient-to-r from-gray-950 via-gray-950 to-gray-900/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between py-4 px-4 w-full max-w-screen-2xl mx-auto h-16">
      <div>
        <Link href="/" aria-label={siteConfig.title}>
          <div className="flex items-center">
            <div className="relative h-8 w-32">
              <Image
                src="/static/images/logo-dark.svg"
                alt={siteConfig.title}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        <div className="hidden lg:flex space-x-6">
          {headerNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href) || 
                             (link.title === 'Documentation' && pathname.includes('/Documentation/'));
            const isRestricted = !isLoggedIn && link.title === 'Documentation';

            return (
              <Link
                key={link.title}
                href={link.href}
                onClick={(e) => handleRestrictedClick(e, link.href)}
                className={`font-medium transition-colors ${
                  isActive 
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                } ${isRestricted ? 'opacity-90' : ''}`}
              >
                {link.title}
                {isRestricted && (
                    <span className="ml-1 text-[10px] align-top text-gray-500">🔒</span>
                )}
              </Link>
            );
          })}
          
        {/* Admin Stats Link - Only visible when logged in AS ADMIN */}
        {isLoggedIn && (session?.user as any)?.isAdmin && (
          <Link
            href="/admin/stats"
            className={`font-medium transition-colors ${
              pathname === '/admin/stats' 
                ? 'text-orange-500 font-bold' 
                : 'text-gray-100 hover:text-orange-500'
            }`}
          >
            Stats
          </Link>
        )}
        </div>
        
        {/* 언어 선택 버튼 (Desktop only) */}
        <div className="hidden lg:block">
           <LanguageSwitcher />
        </div>
        
        <div className="hidden lg:block text-gray-100 hover:text-orange-500 transition-colors">
            <SearchButton />
        </div>

        <div className="hidden lg:block">
           <ThemeSwitch className="text-gray-100" />
        </div>

        {/* Auth Buttons */}
        {status === 'loading' ? (
           <div className="w-16 h-8" /> // Spacer
        ) : isLoggedIn ? (
           <button 
             onClick={() => signOut()}
             className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
           >
             Sign Out
           </button>
        ) : (
           <Link
             href="/login"
             className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors shadow-lg shadow-orange-900/20"
           >
             Sign In
           </Link>
        )}

        <div className="lg:hidden">
            <MobileNav />
        </div>
      </div>
      </div>
      
      {/* Mobile Utility Bar (New) */}
      <div className="lg:hidden w-full bg-[#000519] border-t border-gray-800 flex items-center justify-center px-4 py-2 gap-6 text-gray-100">
         <LanguageSwitcher />
         <SearchButton />
         <ThemeSwitch className="text-gray-100" />
      </div>
    </header>
  );
};

export default Header;