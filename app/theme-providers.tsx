'use client';

import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/data/config/site.settings';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteConfig.theme}
      enableSystem={false} // [GRAND PRINCIPLE] OS 설정을 무시하고 프리미엄 다크모드 고정
    >
      {children}
    </ThemeProvider>
  );
}
