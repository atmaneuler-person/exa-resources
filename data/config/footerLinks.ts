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
      { href: '/category/Documentation', title: 'Documentation' },
      { href: '/all-articles', title: 'All Posts' },
    ],
  },
  {
    columnName: 'Company',
    links: [
      { href: '/about', title: 'About' },
      { href: '/pricing', title: 'Pricing' },
      { href: '/terms', title: 'Terms' },
      { href: '/privacy', title: 'Privacy' },
    ],
  },
];
