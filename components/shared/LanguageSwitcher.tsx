'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/data/config/site.settings';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // 현재 경로에서 언어 코드 교체 로직
  const switchLanguage = (targetLang: string) => {
    // ==========================================================================================
    // [GRAND PRINCIPLE: URL PREFIX IS THE MASTER STATE]
    // ==========================================================================================
    // RULE: To maintain language persistence, EVERY internal URL must start with the locale prefix.
    //       Example: /en/posts/en/Category/Post
    //       This ensures the system's 'currentLocale' is always aligned with the UI tab.
    // ==========================================================================================

    // 1. Clean current path from ANY existing locale prefix at the start
    let cleanPath = pathname;
    const allLocales = siteConfig.locales.join('|');
    const localePrefixRegex = new RegExp(`^\\/(${allLocales})(\\/|$)`);
    cleanPath = pathname.replace(localePrefixRegex, '/');
    
    // Normalize path
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    cleanPath = cleanPath.replace(/\/+/g, '/');

    // 2. Adjust internal content path for posts/docs
    const postPathRegex = /^\/posts\/(ko|en|ja|zh|vi)\//;
    if (cleanPath.match(postPathRegex)) {
      cleanPath = cleanPath.replace(postPathRegex, `/posts/${targetLang}/`);
    }

    // 3. MANDATORY: Always prefix with target locale to maintain persistence
    const finalPath = `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
    return finalPath.replace(/\/+/g, '/');
  };

  // 현재 활성화된 언어인지 확인하는 헬퍼 함수
  const isActive = (langCode: string) => {
    // ==========================================================================================
    // [GRAND PRINCIPLE: UI TAB IS THE MASTER CONTROLLER]
    // ==========================================================================================
    // RULE: The active language tab must strictly reflect the URL locale prefix selected by user.
    //       This maintains the "Selected Language Persistence" grand principle across all pages.
    // ==========================================================================================
    const pathParts = pathname.split('/');
    const firstSegment = pathParts[1] || '';

    // 1. URL의 첫 번째 세그먼트가 유효한 로케일인 경우 (탭 선택 상태)
    if (['ko', 'en', 'ja', 'zh', 'vi'].includes(firstSegment)) {
      return firstSegment === langCode;
    }

    // 2. 언어 코드가 없는 경우 (기본 언어: ko)
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