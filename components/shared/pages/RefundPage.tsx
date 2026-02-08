'use client';
import React from 'react';
import { LegalPages } from './LegalPages';

export function RefundPage({ locale }: { locale: string }) {
  return <LegalPages section="refund" locale={locale} />;
}
