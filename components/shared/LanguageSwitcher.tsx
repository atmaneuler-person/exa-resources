'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // 현재 경로에서 언어 코드 교체 로직
  const switchLanguage = (targetLang: string) => {
    // 1. 현재 경로가 '/'(루트)인 경우
    if (pathname === '/') {
      return targetLang === 'ko' ? '/' : `/${targetLang}`;
    }

    // 2. 현재 경로가 '/[locale]' 또는 '/[locale]/...' 형태인지 확인
    const localeRegex = /^\/(en|ja|zh|vi)(\/|$)/;
    const match = pathname.match(localeRegex);

    if (match) {
      // 현재 URL에 언어 코드가 있음 (예: /en/..., /en)
      const currentLoc = match[1];
      
      // 타겟 언어가 'ko'이면 언어 코드 제거 (예: /en/blog -> /blog)
      if (targetLang === 'ko') {
        return pathname.replace(`/${currentLoc}`, '') || '/';
      }
      
      // 타겟 언어가 다른 언어이면 코드 교체 (예: /en/blog -> /ja/blog)
      return pathname.replace(`/${currentLoc}`, `/${targetLang}`);
    } 

    // 3. 언어 코드가 없는 경우 (현재 ko 상태)
    if (targetLang === 'ko') return pathname;
    
    // ko -> 다른 언어: 맨 앞에 붙임 (예: /blog -> /en/blog)
    return `/${targetLang}${pathname}`;
  };

  // 현재 활성화된 언어인지 확인하는 헬퍼 함수
  const isActive = (langCode: string) => {
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