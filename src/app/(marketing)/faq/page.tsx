import { getFAQs } from '@/lib/sanity/queries';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Gravitas Index, Entity Search, pricing, and implementation.',
};

// Revalidate every hour to get fresh content
export const revalidate = 3600;

export default async function FAQPage() {
  // Fetch FAQs from Sanity (with fallback to static data)
  let faqs;
  try {
    faqs = await getFAQs();
    // If Sanity returns empty array, use fallback
    if (!faqs || faqs.length === 0) {
      throw new Error('No FAQs in Sanity');
    }
  } catch (error) {
    console.error('Error fetching FAQs from Sanity:', error);
    // Fallback to static data if Sanity is not configured yet
    faqs = [
      {
        _id: '1',
        question: "What is Entity Search and why does it matter?",
        answer: "Entity Search is Google's new way of displaying real estate results. Instead of showing ten blue links to Zillow and Realtor.com, Google will show the home itself—photos, price, details—directly in search results. Next to each listing: the agent's name, response time, and review score. The agents with the fastest response times and strongest reputations will get priority placement. The ones who don't adapt will disappear.",
        order: 1,
      },
      {
        _id: '2',
        question: "How long does setup take?",
        answer: "Most implementations are live within 7-10 business days. We handle CRM integration, AI configuration, review automation setup, and Schema implementation. You'll have a dedicated onboarding call to map out your specific workflow, then we execute everything on our end.",
        order: 2,
      },
      {
        _id: '3',
        question: "Do I need to change my CRM or website?",
        answer: "No. Gravitas Index integrates with your existing tools—Follow Up Boss, kvCORE, LionDesk, or whatever you're using. We layer on top of your current stack, we don't replace it.",
        order: 3,
      },
      {
        _id: '4',
        question: "What's the pricing?",
        answer: "$1,500 setup fee (one-time) + $500/month for solo agents or $1,750/month for teams. Setup covers full implementation, onboarding, and integration. Monthly fee includes 24/7 AI monitoring, review automation, ongoing entity optimization, and support.",
        order: 4,
      },
      {
        _id: '5',
        question: "Is there a contract?",
        answer: "Month-to-month after the first 90 days. We're confident in the results. If it's not working after three months, you can walk away. No long-term lock-in.",
        order: 5,
      },
      {
        _id: '6',
        question: "Why only 12 agents per market?",
        answer: "Entity Search rewards first movers. If we onboard 50 agents in Denver, they're competing against each other. We limit capacity to 12 per market so our clients have a structural advantage. Once spots fill, we close applications and open a waitlist.",
        order: 6,
      },
      {
        _id: '7',
        question: "Do you guarantee results?",
        answer: "We guarantee infrastructure—your AI will respond in under 60 seconds, your review automation will run every month, and your entity optimization will be implemented correctly. What we can't control is your close rate or how fast Google rolls out Entity Search in your specific market. But when it does, you'll be ready. Your competitors won't.",
        order: 7,
      },
      {
        _id: '8',
        question: "Can I see a demo?",
        answer: "Yes. Book a qualification call and we'll walk you through the system, show you live examples, and answer technical questions. We don't do generic sales pitches. If it's not a fit, we'll tell you.",
        order: 8,
        hasLink: true,
        linkText: "Schedule a consultation",
        linkUrl: "https://cal.com/gravitasindex/consultation"
      },
    ];
  }

  // Generate FAQ structured data for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="container mx-auto px-8 py-28">
        <h1 className="font-serif text-6xl font-normal mb-8">
          Frequently Asked Questions
        </h1>
        <p className="text-text-muted text-xl max-w-3xl mb-16 leading-relaxed">
          Everything you need to know about Entity Search, Gravitas Index, and what happens next.
        </p>

        <div className="max-w-4xl space-y-12">
          {faqs.map((faq: any) => (
            <div key={faq._id} className="border-t border-border pt-8">
              <h2 className="font-serif text-2xl font-normal mb-4 text-text-main">
                {faq.question}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
              {faq.hasLink && (
                <a
                  href={faq.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-accent hover:underline font-medium"
                >
                  {faq.linkText} →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-border">
          <h2 className="font-serif text-3xl font-normal mb-6">
            Still have questions?
          </h2>
          <p className="text-text-muted text-lg mb-6">
            Email us at{' '}
            <a href="mailto:hello@gravitasindex.com" className="text-accent hover:underline">
              hello@gravitasindex.com
            </a>
            {' '}or book a call to talk through your specific situation.
          </p>
        </div>
      </section>
    </div>
  );
}
