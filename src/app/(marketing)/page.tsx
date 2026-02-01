import { HeroSection } from '@/components/marketing/HeroSection';
import { AlphaForm } from '@/components/marketing/AlphaForm';

export const metadata = {
  title: "GRAVITAS INDEX | Win Google's Entity Search",
  description: "Transform your business into a market authority Google can't ignore. Data-driven entity optimization that turns search invisibility into market dominance.",
};

export default function HomePage() {
  return (
    <div className="grid-bg">
      <HeroSection />

      {/* More sections will be added here */}
      <section className="container mx-auto px-8 py-28 border-t border-border" id="shift">
        <div className="mb-16">
          <span className="font-mono text-accent text-xs block mb-6 tracking-wider font-normal">
            00 // THE SHIFT
          </span>
          <h2 className="font-serif text-5xl font-normal mb-0 text-text-main">
            Google Is Ranking You Right Now.
            <br />
            <span className="text-text-muted italic">Whether You&apos;re Ready or Not.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-serif text-2xl mb-6 font-normal">What is Entity Search?</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Right now, Google shows you ten blue links. You search "homes for sale in Denver,"
              you get Zillow, Redfin, Realtor.com. The portals win. You pay for scraps.
            </p>
            <p className="text-text-muted mb-6 leading-relaxed">
              Entity Search changes the game. Instead of links, Google displays the{' '}
              <em>home itself</em>—photos, price, beds, baths, structured data—directly in
              search results. And next to every listing: the agent&apos;s name, response time, and
              review score.
            </p>
            <p className="text-text-main mb-6 leading-relaxed">
              <strong>This is happening now.</strong> Google piloted Entity Search in LA, Miami,
              Houston, and Denver throughout 2025. National rollout is underway. The ranking
              factors are already being measured.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-6 font-normal">Two Metrics Decide Who Wins</h3>

            <div className="border-l-2 border-accent pl-6 mb-8">
              <h4 className="font-mono text-[0.85rem] text-accent mb-3 tracking-wider">
                01 — RESPONSE VELOCITY
              </h4>
              <p className="text-text-muted leading-relaxed">
                Google measures how fast you respond to inquiries. Not hours. Not minutes.{' '}
                <em>Seconds.</em> Agents who respond in under 60 seconds get priority placement.
                The ones who take 4 hours to check their email disappear.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-6">
              <h4 className="font-mono text-[0.85rem] text-accent mb-3 tracking-wider">
                02 — TRUST SIGNAL DENSITY
              </h4>
              <p className="text-text-muted leading-relaxed">
                Review count, recency, sentiment, transaction volume, years in business. Google
                aggregates public trust signals into a single authority score. If you&apos;re not
                actively building digital credibility, you&apos;re invisible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for remaining sections */}
      <section className="container mx-auto px-8 py-28 border-t border-border" id="thesis">
        <div className="mb-16">
          <span className="font-mono text-accent text-xs block mb-6 tracking-wider font-normal">
            01 // THE SYSTEM
          </span>
          <h2 className="font-serif text-5xl font-normal text-text-main">
            Three Infrastructure Layers.
            <br />
            <span className="text-text-muted italic">One Competitive Moat.</span>
          </h2>
        </div>
        <p className="text-text-muted text-lg mb-12 max-w-3xl">
          Most agents think they need "better marketing." They don&apos;t. They need infrastructure—the
          backend systems that turn leads into closed deals at scale. This is what separates
          $200K producers from $2M producers.
        </p>

        {/* System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Velocity */}
          <div className="border border-border bg-panel p-8 relative transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1 group cursor-default overflow-hidden">
            <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4 transition-opacity group-hover:opacity-40">
              01
            </span>
            <h3 className="font-serif text-2xl mb-4 font-normal">Velocity</h3>
            <p className="text-text-muted mb-4 leading-relaxed">
              <strong className="text-text-main">The Sub-60-Second Response Engine.</strong> When a lead hits your website at 11:47 PM, they get a response at 11:47 PM. Not a form confirmation—a conversation. Our AI concierge qualifies intent, answers property questions, and books showings while you sleep.
            </p>
            <p className="text-accent text-sm mb-6">
              Google&apos;s Entity Search will measure this. We make sure you win.
            </p>
            <div className="pt-4 border-t border-border">
              <span className="font-mono text-xs text-text-muted tracking-wider">
                LICENSE-SAFE:
              </span>
              <span className="text-sm text-text-muted ml-2">
                Trained to deflect Fair Housing traps. It knows what NOT to say.
              </span>
            </div>

            {/* Hover Preview */}
            <div className="absolute inset-0 bg-panel border-2 border-accent p-8 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4">
                01
              </span>
              <h3 className="font-serif text-2xl mb-4 font-normal text-accent">Velocity Details</h3>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Instant Qualification:</strong> AI asks pre-approval, timeline, agent status</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Smart Scheduling:</strong> Books showings directly to your calendar</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">24/7 Coverage:</strong> Never miss a lead at night or weekends</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">CRM Integration:</strong> Syncs with Follow Up Boss, kvCORE, LionDesk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Trust */}
          <div className="border border-border bg-panel p-8 relative transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1 group cursor-default overflow-hidden">
            <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4 transition-opacity group-hover:opacity-40">
              02
            </span>
            <h3 className="font-serif text-2xl mb-4 font-normal">Trust</h3>
            <p className="text-text-muted mb-4 leading-relaxed">
              <strong className="text-text-main">The Review Capture Protocol.</strong> We don&apos;t hope for reviews. We engineer them. The reviewSNIPER system triggers within 2 hours of closing—when satisfaction peaks and the experience is fresh. One tap from SMS to published review.
            </p>
            <p className="text-accent text-sm mb-6">
              Your review velocity becomes your ranking velocity.
            </p>
            {/* Sample Google Review Card */}
            <div className="bg-bg border border-border p-4 rounded">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-bg font-bold text-sm">
                  G
                </span>
                <div className="text-accent text-lg">★★★★★</div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-3">
                &ldquo;The most professional transaction I&apos;ve experienced. Responded instantly, knew the market cold, made the whole process seamless.&rdquo;
              </p>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="text-accent">✓ Verified</span>
                <span>2 hrs post-close</span>
              </div>
            </div>

            {/* Hover Preview */}
            <div className="absolute inset-0 bg-panel border-2 border-accent p-8 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4">
                02
              </span>
              <h3 className="font-serif text-2xl mb-4 font-normal text-accent">Trust Details</h3>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">2-Hour Trigger:</strong> SMS sent when dopamine peaks post-closing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">One-Tap Flow:</strong> From text to published review in 30 seconds</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Multi-Platform:</strong> Google, Zillow, Realtor.com simultaneously</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Conversion Rate:</strong> 67% average (industry: 12%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Capital */}
          <div className="border border-border bg-panel p-8 relative transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1 group cursor-default overflow-hidden">
            <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4 transition-opacity group-hover:opacity-40">
              03
            </span>
            <h3 className="font-serif text-2xl mb-4 font-normal">Capital</h3>
            <p className="text-text-muted mb-4 leading-relaxed">
              <strong className="text-text-main">The Qualification Firewall.</strong> Before anyone gets on your calendar, they answer three questions: Are you pre-approved? What&apos;s your timeline? Are you working with another agent?
            </p>
            <p className="text-accent text-sm">
              No more driving across town for a &ldquo;buyer&rdquo; who can&apos;t get a loan. Every tour is transaction-ready.
            </p>

            {/* Hover Preview */}
            <div className="absolute inset-0 bg-panel border-2 border-accent p-8 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <span className="font-mono text-6xl text-accent opacity-20 absolute top-4 right-4">
                03
              </span>
              <h3 className="font-serif text-2xl mb-4 font-normal text-accent">Capital Details</h3>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Pre-Approval Check:</strong> Verifies financial readiness before showing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Timeline Filtering:</strong> Only serious buyers within 90 days</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Agent Conflict:</strong> Auto-declines if already represented</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span><strong className="text-text-main">Time ROI:</strong> Average 73% reduction in wasted showings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alpha Section */}
      <section className="container mx-auto px-8 py-28 border-t border-border" id="alpha">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <div>
            <span className="font-mono text-accent text-xs block mb-6 tracking-wider font-normal">
              04 // ACCESS
            </span>
            <h2 className="font-serif text-5xl font-normal text-text-main mb-6">
              Limited Alpha Access
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              We&apos;re onboarding 12 agents per market. Applications close when spots fill.
              If you&apos;re serious about owning your market, this is your window.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-accent pl-6">
                <h3 className="font-mono text-sm text-accent mb-2 tracking-wider">
                  WHO THIS IS FOR
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Solo agents and teams doing $500K+ in GCI who want infrastructure, not
                  marketing fluff. If you&apos;re willing to invest in long-term competitive advantage,
                  this is for you.
                </p>
              </div>

              <div className="border-l-2 border-accent pl-6">
                <h3 className="font-mono text-sm text-accent mb-2 tracking-wider">
                  WHO THIS ISN&apos;T FOR
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Part-timers looking for a quick fix. Agents who want "more leads" instead of
                  better systems. Anyone expecting overnight results without doing the work.
                </p>
              </div>

              <div className="border-l-2 border-accent pl-6">
                <h3 className="font-mono text-sm text-accent mb-2 tracking-wider">
                  WHAT HAPPENS NEXT
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Submit your application. We&apos;ll review within 24 hours. If it&apos;s a fit, we&apos;ll
                  schedule a qualification call to walk through the system and answer technical
                  questions. No generic sales pitches.
                </p>
              </div>
            </div>
          </div>

          <div>
            <AlphaForm />
          </div>
        </div>
      </section>
    </div>
  );
}
