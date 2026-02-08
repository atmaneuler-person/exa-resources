/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { siteConfig } from '../../data/config/site.settings';
import Image from 'next/image'; 
import { Lock as LockIcon } from 'lucide-react';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import SearchButton from '@/components/search/SearchButton';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import { headerNavLinks } from '../../data/config/headerNavLinks';

import { cn } from '@/lib/utils';

export const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  // Extract locale for link maintenance
  const possibleLocale = pathname.split('/')[1];
  const currentLocale = (siteConfig.locales as readonly string[]).includes(possibleLocale) 
    ? possibleLocale 
    : (siteConfig.defaultLocale || 'ko');

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-[100] w-full bg-gradient-to-r from-gray-950 via-gray-950 to-gray-900/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]", className)}>
      <div className="flex items-center justify-between py-4 px-4 w-full max-w-screen-2xl mx-auto h-16">
      <div>
        {/* Logo: Returns to the root of the CURRENT locale */}
        <Link href={`/${currentLocale}`} aria-label={siteConfig.title}>
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
      <div className="flex items-center gap-10">
        {/* 1. Main Navigation */}
        <div className="hidden lg:flex space-x-6">
          {headerNavLinks.map((link) => {
            // ALWAYS prefix internal links with currentLocale to maintain the principle
            let href = link.href;
            if (href.startsWith('/')) {
              href = `/${currentLocale}${href === '/' ? '' : href}`.replace(/\/+/g, '/');
            }

            const isActive = pathname === href || (href !== `/${currentLocale}` && pathname.startsWith(href));
            
            // Special Case: Insert "Product" Dropdown after Home
            if (link.title === 'Home') {
                return (
                    <div className="flex items-center space-x-6" key="home-group">
                        <Link
                            href={href}
                            className={`font-medium transition-colors whitespace-nowrap ${
                            isActive 
                                ? 'text-orange-500 font-bold' 
                                : 'text-gray-100 hover:text-orange-500'
                            }`}
                        >
                            {link.title}
                        </Link>
                        
                        {/* Product Dropdown */}
                        <div className="relative group">
                            <button className={`flex items-center font-medium transition-colors whitespace-nowrap text-gray-100 group-hover:text-orange-500 ${pathname.includes('/products') ? 'text-orange-500 font-bold' : ''}`}>
                                Product
                                <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                                <Link 
                                    href={`/${currentLocale}/products/exawin`}
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-l-2 border-transparent hover:border-orange-500"
                                >
                                    <div className="font-bold">EXAWin</div>
                                    <div className="text-xs text-gray-500 mt-0.5">Sales Intelligence Engine</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
              <Link
                key={link.title}
                href={href}
                className={`font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. Utility Navigation */}
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        <div className="hidden lg:flex items-center space-x-6 border-l border-white/10 pl-6">
             <Link
                href={`/${currentLocale}/category/Docs`}
                className={`flex items-center font-medium transition-colors ${
                  pathname.includes('/category/Docs')
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                }`}
             >
                Docs
                <span className="ml-1 flex items-center justify-center bg-yellow-500 w-3 h-3 rounded-[2px] flex-shrink-0">
                  <LockIcon className="w-2 h-2 text-black fill-black" strokeWidth={0} />
                </span>
             </Link>

             {isLoggedIn && (session?.user as any)?.isAdmin && (
              <Link
                href="/admin/stats"
                className={`flex items-center font-medium transition-colors ${
                  pathname === '/admin/stats' 
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                }`}
              >
                Stats
              </Link>
             )}
        </div>
        
        <div className="hidden lg:block">
           <LanguageSwitcher />
        </div>
        
        <div className="hidden lg:block text-gray-100 hover:text-orange-500 transition-colors">
            <SearchButton />
        </div>

        <div className="hidden lg:block">
           <ThemeSwitch className="text-gray-100" />
        </div>

        <div className="flex items-center gap-4">
             <Link
               href={`/${currentLocale}/about#contact`}
               className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-all shadow-lg shadow-orange-900/20 hover:scale-105 active:scale-95 whitespace-nowrap"
             >
               Contact Us
             </Link>

             {status === 'loading' ? (
                <div className="w-16 h-8" /> // Spacer
             ) : isLoggedIn ? (
                <button 
                  onClick={() => signOut()}
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Sign Out
                </button>
             ) : (
                <Link
                  href={`/${currentLocale}/pricing`}
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Pricing
                </Link>
             )}
        </div>

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