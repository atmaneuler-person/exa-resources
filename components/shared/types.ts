export interface HeroData {
  label: string;
  title: string;
  desc: string;
  cta: string;
  videoLabel: string;
}

export interface SectionData {
  label: string;
  title: string;
  desc: string;
}

export interface BentoCards {
  finance: string;
  supply: string;
  risk: string;
  hr: string;
}

export interface BentoData {
  title: string;
  cards: BentoCards;
}

export interface BlogHeroData {
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  viewAll: string;
}

export interface ExaWinData {
  label: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDesc: string;
  button: string;
  feature1: string;
  feature2: string;
  cta?: string;
}

export interface ShowcaseData {
  label: string;
  title: string;
  subtitle?: string;
  desc: string;
  button: string;
}

export interface FilterData {
  label: string;
}

export interface MainPageData {
  hero: HeroData;
  erpSection: SectionData;
  aiSection: SectionData;
  bento: BentoData;
  blogHero: BlogHeroData;
  exawin: ExaWinData;
  showcase: ShowcaseData;
  filter: FilterData;
}

export interface CompanyPageData {
  label: string;
  hero: { identity: string };
  genesis: { title: string; subtitle: string; content: string };
  foundation: { title: string; subtitle: string; content: string };
  spirit: { title: string; subtitle: string; content: string };
}

export interface ContactData {
  title: string;
  subtitle: string;
  info: { hq: string; address: string; email: string };
  form: { name: string; email: string; message: string; submit: string };
}
