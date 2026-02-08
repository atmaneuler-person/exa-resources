'use client';
import React from 'react';
import { LegalPages } from './LegalPages';

export function TermsPage({ locale }: { locale: string }) {
  return <LegalPages section="terms" locale={locale} />;
}
