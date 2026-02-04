import { companyData, contactData } from '@/components/shared/data/companyData';
import { CompanyPage } from '@/components/shared/CompanyPage';
import { siteConfig } from '@/data/config/site.settings';

export default function About() {
  // Static content from centralized data
  // Default to English for the static /about route
  const textData = companyData['en'];
  const cData = contactData['en'];

  return (
    <CompanyPage 
      locale={siteConfig.defaultLocale || 'en'} 
      textData={textData}
      contactData={cData}
    />
  );
}
