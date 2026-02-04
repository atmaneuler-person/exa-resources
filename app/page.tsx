import { MainPage } from '@/components/shared/MainPage';
import { siteConfig } from '@/data/config/site.settings';

export default function Home() {
  return <MainPage locale={siteConfig.defaultLocale || 'en'} />;
}
