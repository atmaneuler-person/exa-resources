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

  const handleRestrictedClick = (e: React.MouseEvent, href: string) => {
    // Optional
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-[100] w-full bg-gradient-to-r from-gray-950 via-gray-950 to-gray-900/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]", className)}>
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
      <div className="flex items-center gap-10">
        {/* 1. Main Navigation (Left/Center) */}
        <div className="hidden lg:flex space-x-6">
          {headerNavLinks.map((link) => {
            const possibleLocale = pathname.split('/')[1];
            const currentLocale = siteConfig.locales.includes(possibleLocale) 
              ? possibleLocale 
              : (siteConfig.defaultLocale || 'ko');
            
            // Generate locale-aware href - ALWAYS include currentLocale
            let href = link.href;
            if (href.startsWith('/')) {
              href = `/${currentLocale}${href === '/' ? '' : href}`.replace(/\/+/g, '/');
            }

            const isActive = link.href === '/' 
              ? pathname === `/${currentLocale}`
              : pathname.startsWith(href);

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

      {/* 2. Utility Navigation (Right) */}
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        <div className="hidden lg:flex items-center space-x-6 border-l border-white/10 pl-6">
             {/* Docs Link (Manually added here) */}
             <Link
                href={pathname.split('/')[1] && siteConfig.locales.includes(pathname.split('/')[1]) ? `/${pathname.split('/')[1]}/category/Docs` : '/ko/category/Docs'}
                className={`flex items-center font-medium transition-colors ${
                  pathname.includes('/category/Docs')
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                }`}
             >
                Docs
                {!isLoggedIn && (
                  <span className="ml-1 flex items-center justify-center bg-yellow-500 w-[7px] h-[7px] rounded-[1px] flex-shrink-0">
                    <LockIcon className="w-[5px] h-[5px] text-gray-950" strokeWidth={4} />
                  </span>
                )}
             </Link>

        {/* Admin Stats Link */}
             {isLoggedIn && (session?.user as any)?.isAdmin && (
              <Link
                href="/admin/stats"
                className={`flex items-center font-medium transition-colors ${
                  pathname === '/admin/stats' 
                    ? 'text-orange-500 font-bold' 
                    : 'text-gray-100 hover:text-orange-500'
                }`}
              >
                <LockIcon className="w-4 h-4 mr-1.5 text-yellow-500" />
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
        <div className="flex items-center gap-4">
             {/* Primary CTA: Contact Us */}
             <Link
               href={`/${pathname.split('/')[1] || 'ko'}/about#contact`}
               className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-all shadow-lg shadow-orange-900/20 hover:scale-105 active:scale-95 whitespace-nowrap"
             >
               {{
                 ko: '문의하기',
                 en: 'Contact Us',
                 ja: 'お問い合わせ',
                 zh: '联系我们',
                 vi: 'Liên hệ',
               }[pathname.split('/')[1] || 'ko'] || 'Contact Us'}
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
                  href="/login"
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Sign In
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