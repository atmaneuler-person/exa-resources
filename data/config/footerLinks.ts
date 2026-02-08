export const footerLinks: Array<{
  columnName: string;
  links: Array<{
    href: string;
    title: string;
  }>;
}> = [
  {
    columnName: 'Blog',
    links: [
      { href: '/category/Bayesian', title: 'Bayesian' },
      { href: '/category/AI', title: 'AI' },
      { href: '/category/Business', title: 'Business' },
      { href: '/category/Science', title: 'Science' },
      { href: '/category/Solution', title: 'Solution' },
    ],
  },
  {
    columnName: 'Resources',
    links: [
      { href: '/category/Docs', title: 'Docs' },
      { href: '/all-articles', title: 'EXA BSL' },
    ],
  },
  {
    columnName: 'Company',
    links: [
      { href: '/about', title: 'About' },
      { href: '/pricing', title: 'Pricing' },
      { href: '/terms', title: 'Terms' },
      { href: '/privacy', title: 'Privacy' },
      { href: '/refund', title: 'Refund' },
    ],
  },
];
