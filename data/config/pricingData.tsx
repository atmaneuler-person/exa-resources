import {
  PricingTier,
  PricingTierFrequency,
} from '@/data/config/pricingDataInterface';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    id: 'tier-1',
    href: '/subscribe',
    discountPrice: { '1': '', '2': '' },
    price: { '1': '$0', '2': '$0' },
    description: 'Get all goodies for free, no credit card required.',
    features: [
      'Multi-platform compatibility',
      'Real-time notification system',
      'Advanced user permissions',
    ],
    featured: false,
    highlighted: false,
    cta: 'Sign up',
  },
];

export const pricingFrequencies: PricingTierFrequency[] = [
  {
    id: '0de6641c-ca68-4dd6-a9b0-ec14414f68d7',
    value: '1',
    label: 'Monthly',
    priceSuffix: '/month',
  },
  {
    id: '162d76dc-be02-4ea0-809e-e5dad35aaabc',
    value: '2',
    label: 'Annually',
    priceSuffix: '/year',
  },
];
