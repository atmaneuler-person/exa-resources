import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from './data/config/site.settings';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public files, api, and internal next paths
  if (
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname === '/login' ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // 2. Check if the pathname already has a valid locale
  const pathnameHasLocale = siteConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 3. Redirect if there is no locale
  const locale = siteConfig.defaultLocale || 'en';
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Special case for root: / -> /ko
  if (pathname === '/') {
    request.nextUrl.pathname = `/${locale}`;
  }

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|static|favicon.ico).*)',
  ],
};
