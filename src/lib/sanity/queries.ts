import { sanityFetch } from './client';

// FAQ Types
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

// Case Study Types
export interface CaseStudy {
  _id: string;
  title: string;
  market: string;
  agent: string;
  beforeMetrics: {
    portalSpend: string;
    closeRate: string;
    responseTime: string;
  };
  afterMetrics: {
    responseTime: string;
    reviewCount: string;
    gci: string;
  };
  summary: string;
  date: string;
}

// Spot Count Types
export interface SpotCount {
  _id: string;
  market: string;
  spotsRemaining: number;
  totalSpots: number;
  lastUpdated: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  market: string;
  quote: string;
  avatar?: string;
  order: number;
  active: boolean;
}

// Fetch all FAQs ordered by order field
export async function getFAQs(): Promise<FAQ[]> {
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;

  return sanityFetch<FAQ[]>(query);
}

// Fetch FAQs by category
export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  const query = `*[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;

  return sanityFetch<FAQ[]>(query, { category });
}

// Fetch all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = `*[_type == "caseStudy"] | order(date desc) {
    _id,
    title,
    market,
    agent,
    beforeMetrics,
    afterMetrics,
    summary,
    date
  }`;

  return sanityFetch<CaseStudy[]>(query);
}

// Fetch spot count for specific market
export async function getSpotCount(market: string): Promise<SpotCount | null> {
  const query = `*[_type == "spotCount" && market == $market][0] {
    _id,
    market,
    spotsRemaining,
    totalSpots,
    lastUpdated
  }`;

  return sanityFetch<SpotCount | null>(query, { market });
}

// Fetch all active testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial" && active == true] | order(order asc) {
    _id,
    name,
    role,
    market,
    quote,
    avatar,
    order,
    active
  }`;

  return sanityFetch<Testimonial[]>(query);
}
