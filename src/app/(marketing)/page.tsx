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

        {/* System cards will be added */}
        <div className="text-center text-text-muted mt-20">
          [System cards to be implemented]
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
