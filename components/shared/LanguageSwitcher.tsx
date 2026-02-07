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
    // [Antigravity Rules] 경로 기반 언어 판별 로직 강화
    // pathname: /ko/..., /en/..., /posts/ko/..., / (default ko)
    
    // 1. 경로를 '/'로 분리하여 분석
    const pathParts = pathname.split('/');
    // pathParts[0]은 빈 문자열, pathParts[1]이 첫 번째 세그먼트 (언어 코드 또는 posts 등)
    const firstSegment = pathParts[1] || '';

    // 2. /posts/ko/... 형태 처리
    if (firstSegment === 'posts' && pathParts.length > 2) {
      return pathParts[2] === langCode;
    }

    // 3. /ko, /en 등 언어 코드로 시작하는 경우
    if (['ko', 'en', 'ja', 'zh', 'vi'].includes(firstSegment)) {
      return firstSegment === langCode;
    }

    // 4. 언어 코드가 없는 경우 (기본 언어: ko)
    // 예: /, /about, /tags (기본 언어 ko로 가정)
    return langCode === 'ko';
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