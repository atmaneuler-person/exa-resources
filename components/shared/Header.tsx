import { siteConfig } from '../../data/config/site.settings';
import Image from 'next/image'; 
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';

// [수정] 6대 메인 메뉴 정의 (경로는 /category/이름 으로 설정)
const headerNavLinks = [
  { href: '/category/Bayesian', title: 'Bayesian' },
  { href: '/category/AI', title: 'AI' },
  { href: '/category/Business', title: 'Business' },
  { href: '/category/Science', title: 'Science' },
  { href: '/category/Solution', title: 'Solution' },
  { href: '/category/Documentation', title: 'Documentation' },
];

// [수정] 주소를 /category/ -> /topics/ 로 변경
// const headerNavLinks = [
//   { href: '/topics/Bayesian', title: 'Bayesian' },
//   { href: '/topics/AI', title: 'AI' },
//   { href: '/topics/Business', title: 'Business' },
//   { href: '/topics/Science', title: 'Science' },
//   { href: '/topics/Solution', title: 'Solution' },
//   { href: '/topics/Documentation', title: 'Documentation' },
// ];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#000519]/90 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between py-4 px-4 w-full max-w-screen-2xl mx-auto">
      <div>
        <Link href="/" aria-label={siteConfig.title}>
          <div className="flex items-center justify-between">
            <div className="mr-3 relative h-8 w-32">
              <Image
                src="/static/images/logo-dark.svg"
                alt={siteConfig.title}
                fill
                className="block object-contain object-left"
                priority
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="hidden sm:block font-medium text-gray-100 hover:text-orange-500 transition-colors"
          >
            {link.title}
          </Link>
        ))}
        
        {/* 언어 선택 버튼 */}
        <LanguageSwitcher />
        
        <ThemeSwitch />
        <MobileNav />
      </div>
      </div>
    </header>
  );
};

export default Header;