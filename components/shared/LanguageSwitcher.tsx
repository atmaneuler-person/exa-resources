'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/data/config/site.settings';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // 현재 경로에서 언어 코드 교체 로직
  const switchLanguage = (targetLang: string) => {
    // 1. Clean current path from ANY existing locale prefix at the start
    // We check against all supported locales
    let cleanPath = pathname;
    const allLocales = siteConfig.locales.join('|');
    const localePrefixRegex = new RegExp(`^\\/(${allLocales})(\\/|$)`);
    
    // Replace the locale prefix with a single slash
    cleanPath = pathname.replace(localePrefixRegex, '/');
    
    // Normalize path to ensure it starts with / and doesn't have double slashes
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    cleanPath = cleanPath.replace(/\/+/g, '/');

    // 2. Handle /posts/ paths (which have internal locale like /posts/ko/...)
    const postPathRegex = /^\/posts\/(ko|en|ja|zh|vi)\//;
    if (cleanPath.match(postPathRegex)) {
      return cleanPath.replace(postPathRegex, `/posts/${targetLang}/`);
    }

    // 3. Prefix with target locale
    // Special case: if target is 'ko' (default), we might want to skip the prefix 
    // but to be safe and consistent with your "Not Null" rule, 
    // we can either always include it or follow the app's routing convention.
    // Based on your feedback, including it is safer.
    const finalPath = `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
    return finalPath.replace(/\/+/g, '/');
  };

  // 현재 활성화된 언어인지 확인하는 헬퍼 함수
  const isActive = (langCode: string) => {
    // 1. 블로그 포스트 경로 확인
    const postPathRegex = /^\/posts\/(ko|en|ja|zh|vi)\//;
    const postMatch = pathname.match(postPathRegex);
    if (postMatch) {
      return postMatch[1] === langCode;
    }

    if (langCode === 'ko') {
      // ko는 경로에 (en|ja|zh|vi)가 없으면 활성
      return !pathname.match(/^\/(en|ja|zh|vi)(\/|$)/);
    }
    // 그 외 언어는 경로 시작이 해당 언어여야 함
    return pathname.startsWith(`/${langCode}/`) || pathname === `/${langCode}`;
  };

  return (
    <div className="flex gap-2 text-sm font-bold items-center ml-4">
      <Link href={switchLanguage('ko')} className={isActive('ko') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-400'}>KR</Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link href={switchLanguage('en')} className={isActive('en') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-400'}>EN</Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link href={switchLanguage('ja')} className={isActive('ja') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-400'}>JP</Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link href={switchLanguage('zh')} className={isActive('zh') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-400'}>CN</Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      {/* 폴더는 vi, 화면 표시는 VN */}
      <Link href={switchLanguage('vi')} className={isActive('vi') ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400 hover:text-primary-400'}>VN</Link>
    </div>
  );
}