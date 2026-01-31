export const metadata = {
  title: 'Privacy Policy | GRAVITAS INDEX',
  description: 'Privacy Policy for Gravitas Index.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-8 py-28">
        <h1 className="font-serif text-6xl font-normal mb-8">
          Privacy Policy
        </h1>
        <p className="text-text-muted text-sm mb-16">
          Last updated: January 2025
        </p>

        <div className="max-w-4xl prose prose-invert">
          <div className="space-y-8 text-text-muted">
            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information you provide directly to us when you use our services,
                including your name, email address, phone number, business information, and any
                other information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">2. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">3. Information Sharing</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information with service providers who assist us in operating our
                platform and conducting our business, subject to confidentiality obligations.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">5. Your Rights</h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or delete your personal information. To
                exercise these rights, please contact us at hello@gravitasindex.com.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-normal text-text-main mb-4">6. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
