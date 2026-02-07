export const searchLinks: Record<string, Array<{
  id: string;
  name: string;
  keywords: string;
  shortcut?: string[];
  section: string;
  href: string;
}>> = {
  ko: [
    { id: '', name: '홈', keywords: '', section: '탐색', href: '/ko' },
    { id: 'pricing', name: '가격', keywords: '', section: '탐색', href: '/ko/pricing' },
    { id: 'about', name: '회사 소개', keywords: '', section: '탐색', href: '/ko/about' },
    { id: 'all-articles', name: '전체 글', keywords: '', section: '탐색', href: '/ko/all-articles' },
  ],
  en: [
    { id: '', name: 'Home', keywords: '', section: 'Navigation', href: '/en' },
    { id: 'pricing', name: 'Pricing', keywords: '', section: 'Navigation', href: '/en/pricing' },
    { id: 'about', name: 'About', keywords: '', section: 'Navigation', href: '/en/about' },
    { id: 'all-articles', name: 'Articles', keywords: '', section: 'Navigation', href: '/en/all-articles' },
  ],
  vi: [
    { id: '', name: 'Trang chủ', keywords: '', section: 'Điều hướng', href: '/vi' },
    { id: 'pricing', name: 'Bảng giá', keywords: '', section: 'Điều hướng', href: '/vi/pricing' },
    { id: 'about', name: 'Giới thiệu', keywords: '', section: 'Điều hướng', href: '/vi/about' },
    { id: 'all-articles', name: 'Tất cả bài viết', keywords: '', section: 'Điều hướng', href: '/vi/all-articles' },
  ],
  ja: [
    { id: '', name: 'ホーム', keywords: '', section: 'ナビゲーション', href: '/ja' },
    { id: 'pricing', name: '料金', keywords: '', section: 'ナビゲーション', href: '/ja/pricing' },
    { id: 'about', name: '会社概要', keywords: '', section: 'ナビゲーション', href: '/ja/about' },
    { id: 'all-articles', name: 'すべての記事', keywords: '', section: 'ナビゲーション', href: '/ja/all-articles' },
  ],
  zh: [
    { id: '', name: '首页', keywords: '', section: '导航', href: '/zh' },
    { id: 'pricing', name: '价格', keywords: '', section: '导航', href: '/zh/pricing' },
    { id: 'about', name: '关于我们', keywords: '', section: '导航', href: '/zh/about' },
    { id: 'all-articles', name: '所有文章', keywords: '', section: '导航', href: '/zh/all-articles' },
  ],
};
