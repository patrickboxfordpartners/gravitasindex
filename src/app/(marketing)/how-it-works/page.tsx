export const metadata = {
  title: 'How It Works | GRAVITAS INDEX',
  description: 'A complete breakdown of the Gravitas Index system: AI concierge, review capture, onboarding, and what you get.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-8 py-28">
        <h1 className="font-serif text-6xl font-normal mb-8">
          How It Works
        </h1>
        <p className="text-text-muted text-xl max-w-3xl mb-16 leading-relaxed">
          Three infrastructure layers working together to transform you into a market authority
          Google can't ignore.
        </p>

        <div className="space-y-20">
          {/* Layer 1 */}
          <div className="border-t border-border pt-12">
            <span className="font-mono text-accent text-xs block mb-6 tracking-wider">
              LAYER 01 // RESPONSE INFRASTRUCTURE
            </span>
            <h2 className="font-serif text-4xl font-normal mb-6">
              AI Concierge: Sub-60s Response Time
            </h2>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed mb-6">
              Your AI concierge monitors all incoming leads 24/7. When someone reaches out, it
              responds instantly with personalized, contextual information—property details,
              neighborhood insights, or answers to specific questions. No generic auto-responders.
              Real intelligence that books qualified conversations.
            </p>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed">
              Google measures this. Agents who respond in under 60 seconds get priority
              placement. Those who take hours disappear. This is infrastructure, not effort.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="border-t border-border pt-12">
            <span className="font-mono text-accent text-xs block mb-6 tracking-wider">
              LAYER 02 // TRUST SIGNAL ENGINEERING
            </span>
            <h2 className="font-serif text-4xl font-normal mb-6">
              Review Capture + Reputation Automation
            </h2>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed mb-6">
              After every closing, the system automatically triggers a review request sequence.
              Positive experiences get published to Google, Zillow, and Facebook. Negative
              feedback goes to private channels for resolution.
            </p>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed">
              Google's Entity Search algorithm weighs review velocity, recency, and sentiment.
              Most agents get 2-3 reviews per year. You'll get 2-3 per month. That's the
              difference between page three and position one.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="border-t border-border pt-12">
            <span className="font-mono text-accent text-xs block mb-6 tracking-wider">
              LAYER 03 // ENTITY OPTIMIZATION
            </span>
            <h2 className="font-serif text-4xl font-normal mb-6">
              Structured Data + Knowledge Graph Injection
            </h2>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed mb-6">
              Your website becomes machine-readable. We implement Schema markup, JSON-LD, and
              Knowledge Graph protocols that tell Google exactly who you are, what you do, and
              why you're an authority.
            </p>
            <p className="text-text-muted text-lg max-w-3xl leading-relaxed">
              When Google rolls out Entity Search in your market, you'll already be indexed as
              the primary agent entity. Your competitors will be scrambling. You'll be closing.
            </p>
          </div>

          {/* What You Get */}
          <div className="border-t border-border pt-12">
            <span className="font-mono text-accent text-xs block mb-6 tracking-wider">
              WHAT YOU GET
            </span>
            <h2 className="font-serif text-4xl font-normal mb-12">
              Complete Infrastructure Package
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-panel border border-border p-8">
                <h3 className="font-mono text-lg text-accent mb-4">Setup & Integration</h3>
                <ul className="space-y-3 text-text-muted">
                  <li>• AI concierge configuration</li>
                  <li>• CRM integration (any platform)</li>
                  <li>• Review automation setup</li>
                  <li>• Schema markup implementation</li>
                  <li>• Knowledge Graph optimization</li>
                </ul>
              </div>

              <div className="bg-panel border border-border p-8">
                <h3 className="font-mono text-lg text-accent mb-4">Ongoing Management</h3>
                <ul className="space-y-3 text-text-muted">
                  <li>• 24/7 lead monitoring</li>
                  <li>• Monthly performance reports</li>
                  <li>• Review velocity tracking</li>
                  <li>• Entity ranking updates</li>
                  <li>• Priority support channel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
