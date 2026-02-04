"use client";
import { usePathname } from 'next/navigation';
import Image from '@/components/shared/Image';
import { cn } from '@/lib/utils';
import {
  MailIcon,
  GithubIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedinIcon,
  InstagramIcon,
  BoxesIcon,
} from 'lucide-react';

import { siteConfig } from '@/data/config/site.settings';
import Link from './Link';
import ActiveLink from '@/components/shared/ActiveLink';
import { TwitterXIcon } from '@/components/icons/XIcon';
import { FooterSupportButton } from '@/components/shared/FooterSupportButton';
import { Button } from '@/components/shared/ui/button';
import { footerLinks } from '@/data/config/footerLinks';
import { TiktokIcon } from '@/components/icons/TiktokIcon';
import { ThreadsIcon } from '@/components/icons/ThreadsIcon';

export const Footer = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const columnNumber = footerLinks.filter(({ links }) => links.length).length;

  return (
    <footer
      className={cn(
        'relative w-full mt-32 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-950 px-6 overflow-hidden',
        className,
      )}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{ 
              backgroundImage: `linear-gradient(to right, #80808060 1px, transparent 1px), linear-gradient(to bottom, #80808060 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
          }}
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <div className="relative h-8 w-32 group-hover:scale-105 transition-transform duration-500">
                  {/* Light Mode Logo */}
                  <Image
                    src="/static/images/logo-light.svg"
                    alt="EXAEULER"
                    fill
                    className="object-contain object-left block dark:hidden"
                  />
                  {/* Dark Mode Logo */}
                  <Image
                    src="/static/images/logo-dark.svg"
                    alt="EXAEULER"
                    fill
                    className="object-contain object-left hidden dark:block"
                  />
                </div>
              </div>
            </Link>

            <div className="space-y-4 max-w-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {siteConfig.description || "Next-generation business orchestration powered by Bayesian logic and sovereign GAI. Transforming enterprise uncertainty into definitive strategic results."}
              </p>
              
              {/* Professional Badges or Certificates could go here */}
              <div className="flex items-center gap-3 pt-4">
                <div className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  Enterprise AI 2.0
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Sovereign Logic
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8">
            <div className={cn(
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12",
              columnNumber <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            )}>
              {footerLinks
                .filter(({ links }) => links.length)
                .map((column, index) => (
                  <div key={index} className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-white/5">
                      {column.columnName}
                    </h3>
                    <ul className="space-y-4">
                      {column.links.map((link, linkIdx) => {
                        const possibleLocale = pathname.split('/')[1];
                        const currentLocale = siteConfig.locales.includes(possibleLocale) 
                          ? possibleLocale 
                          : (siteConfig.defaultLocale || 'ko');
                        
                        let href = link.href || '#';
                        if (href.startsWith('/')) {
                          href = `/${currentLocale}${href === '/' ? '' : href}`.replace(/\/+/g, '/');
                        }

                        return (
                          <li key={linkIdx}>
                            <ActiveLink
                              href={href}
                              className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center gap-2 group"
                              activeClassName="text-orange-600 dark:text-orange-500"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-800 group-hover:bg-orange-600 transition-colors" />
                              {link.title}
                            </ActiveLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                {/* Newsletter or CTA column */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-white/5">
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {siteConfig.email && (
                      <a href={`mailto:${siteConfig.email}`} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-orange-500/30 hover:bg-white dark:hover:bg-white/10 transition-all text-gray-500 dark:text-gray-400 hover:text-orange-600" aria-label="Email">
                        <MailIcon className="w-5 h-5" />
                      </a>
                    )}
                    {siteConfig.linkedin && (
                      <a href={siteConfig.linkedin} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-orange-500/30 hover:bg-white dark:hover:bg-white/10 transition-all text-gray-500 dark:text-gray-400 hover:text-orange-600" aria-label="LinkedIn">
                        <LinkedinIcon className="w-5 h-5" />
                      </a>
                    )}
                    {siteConfig.github && (
                      <a href={siteConfig.github} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-orange-500/30 hover:bg-white dark:hover:bg-white/10 transition-all text-gray-500 dark:text-gray-400 hover:text-orange-600" aria-label="GitHub">
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    Join the ecosystem of <br/> intelligent business.
                  </p>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <span>&copy; {new Date().getFullYear()} EXAEULER</span>
            <span className="hidden md:inline text-gray-200 dark:text-gray-800">|</span>
            <span>All Rights Reserved</span>
            <span className="hidden md:inline text-gray-200 dark:text-gray-800">|</span>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Systems Operational</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
