export const metadata = {
  title: 'Terms of Service | GRAVITAS INDEX',
  description: 'Terms of Service for Gravitas Index.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-8 py-28">
        <h1 className="font-serif text-6xl font-normal mb-8">
          Terms of Service
        </h1>
        <p className="text-text-muted text-sm mb-16">
          Last updated: January 2025
        </p>

        <div className="max-w-4xl prose prose-invert">
          <div className="space-y-8 text-text-muted">
            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Gravitas Index, you accept and agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our
                services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">2. Services Description</h2>
              <p className="leading-relaxed">
                Gravitas Index provides entity optimization, AI concierge, review automation, and
                related infrastructure services for real estate professionals. We reserve the right
                to modify, suspend, or discontinue any aspect of our services at any time.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">3. Payment Terms</h2>
              <p className="leading-relaxed mb-4">
                Services require a one-time setup fee and recurring monthly subscription. Payment
                terms:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Setup fee is non-refundable after work begins</li>
                <li>Monthly subscriptions bill automatically</li>
                <li>Cancellation requires 30 days notice after initial 90-day period</li>
                <li>No refunds for partial months</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">4. User Responsibilities</h2>
              <p className="leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not misuse or abuse our services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Gravitas Index provides infrastructure and tools but does not guarantee specific
                business outcomes, lead conversion rates, or search engine rankings. We are not
                liable for indirect, incidental, or consequential damages arising from your use of
                our services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">6. Termination</h2>
              <p className="leading-relaxed">
                We reserve the right to terminate or suspend access to our services at any time for
                violations of these terms or for any other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">7. Changes to Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms of Service from time to time. Continued use of our
                services after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">8. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms, contact us at{' '}
                <a href="mailto:hello@gravitasindex.com" className="text-accent hover:underline">
                  hello@gravitasindex.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
