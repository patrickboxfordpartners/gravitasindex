import { Card } from '@/components/ui/Card';

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-normal mb-2 text-text-main">Content Management</h2>
        <p className="text-text-muted">Manage FAQs, case studies, and spot counts</p>
      </div>

      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4 text-text-main">Sanity Studio</h3>
        <p className="text-text-muted mb-6">
          Use Sanity Studio to manage your content. You can edit FAQs, case studies, testimonials, and spot counts.
        </p>
        <div className="space-y-4">
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-bg border border-border rounded hover:border-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-main mb-1">Open Sanity Studio</p>
                <p className="text-sm text-text-muted">
                  Edit content in the Sanity management interface
                </p>
              </div>
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">FAQs</h3>
          <p className="text-text-muted mb-4">
            Frequently asked questions displayed on the FAQ page
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Add new questions</li>
            <li>• Edit existing answers</li>
            <li>• Reorder by changing order number</li>
            <li>• Categorize questions</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">Case Studies</h3>
          <p className="text-text-muted mb-4">
            Success stories and client results
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Add new case studies</li>
            <li>• Update metrics and results</li>
            <li>• Change market information</li>
            <li>• Add before/after comparisons</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">Spot Counts</h3>
          <p className="text-text-muted mb-4">
            Available spots per market (12 total per market)
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Update spots remaining</li>
            <li>• Add new markets</li>
            <li>• Set as sold out (0 spots)</li>
            <li>• Auto-updates last modified date</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">Testimonials</h3>
          <p className="text-text-muted mb-4">
            Client testimonials (currently inactive)
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Add client quotes</li>
            <li>• Include name and role</li>
            <li>• Upload avatars</li>
            <li>• Display on homepage when active</li>
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4 text-text-main">Content Types Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Content Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Fields</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-4 px-4 text-text-main">FAQ</td>
                <td className="py-4 px-4 text-text-muted text-sm">
                  question, answer, category, order
                </td>
                <td className="py-4 px-4 text-text-muted text-sm">/faq</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-4 text-text-main">Case Study</td>
                <td className="py-4 px-4 text-text-muted text-sm">
                  title, market, beforeMetrics, afterMetrics, results, date
                </td>
                <td className="py-4 px-4 text-text-muted text-sm">Homepage</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-4 text-text-main">Spot Count</td>
                <td className="py-4 px-4 text-text-muted text-sm">
                  market, spotsRemaining (max 12), lastUpdated
                </td>
                <td className="py-4 px-4 text-text-muted text-sm">Homepage</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-4 text-text-main">Testimonial</td>
                <td className="py-4 px-4 text-text-muted text-sm">
                  name, quote, role, avatar, featured
                </td>
                <td className="py-4 px-4 text-text-muted text-sm">Homepage (inactive)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
