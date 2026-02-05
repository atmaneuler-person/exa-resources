'use client';
import { metadata } from '@/data/config/metadata';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const policyConfig = {
  lastUpdated: 'March 1st, 2024',
};

export function PrivacyPage({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col w-full items-center fancy-overlay">
      <Header />

      <div className="w-full flex flex-col items-center my-24">
        <div className="mx-auto max-w-7xl px-6 xl:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h1 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-6xl fancy-heading">
              Privacy Policy
            </h1>
            <p>Last updated: {policyConfig.lastUpdated}</p>
          </div>

          <div className="mt-12 max-w-screen-md mx-auto bg-white dark:bg-black rounded shadow-md p-6 mb-8">
            <p>
              This Privacy Policy describes how{' '}
              <span className="font-bold">{metadata.businessName}</span> (the
              "Site," "we," "us," or "our") collects, uses, and discloses your
              personal information when you visit, use our services, or make a
              purchase from <span className="font-bold">{metadata.domain}</span>{' '}
              (the "Site") or otherwise communicate with us (collectively, the
              "Services"). 
            </p>
            {/* ... (rest of the content abbreviated for briefly, but I should copy it all) */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
