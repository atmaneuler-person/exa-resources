'use client';
import React from 'react';
import { LegalPages } from './LegalPages';

export function PrivacyPage({ locale }: { locale: string }) {
  return <LegalPages section="privacy" locale={locale} />;
}
