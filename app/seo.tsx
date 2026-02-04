import { Metadata } from 'next';
import { siteConfig } from '@/data/config/site.settings';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  canonical,
  locale,
  ...rest
}: PageSEOProps & { locale?: string }): Metadata {
  const currentLocale = locale || siteConfig.locale || 'en-US';
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description: description || siteConfig.description,
      url: './',
      siteName: siteConfig.title,
      images: image ? [image] : [siteConfig.socialBanner],
      locale: currentLocale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteConfig.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteConfig.socialBanner],
    },
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
        }
      : {}),
    ...rest,
  };
}
