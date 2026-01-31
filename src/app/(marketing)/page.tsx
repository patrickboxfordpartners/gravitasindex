import { HeroSection } from '@/components/marketing/HeroSection';

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
            <span className="text-text-muted italic">Whether You're Ready or Not.</span>
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
              search results. And next to every listing: the agent's name, response time, and
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
                aggregates public trust signals into a single authority score. If you're not
                actively building digital credibility, you're invisible.
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
          Most agents think they need "better marketing." They don't. They need infrastructure—the
          backend systems that turn leads into closed deals at scale. This is what separates
          $200K producers from $2M producers.
        </p>

        {/* System cards will be added */}
        <div className="text-center text-text-muted mt-20">
          [System cards to be implemented]
        </div>
      </section>

      {/* Alpha Section Placeholder */}
      <section className="container mx-auto px-8 py-28 border-t border-border" id="alpha">
        <div className="mb-10">
          <span className="font-mono text-accent text-xs block mb-6 tracking-wider font-normal">
            04 // ACCESS
          </span>
          <h2 className="font-serif text-5xl font-normal text-text-main">
            Limited Alpha Access
          </h2>
        </div>
        <p className="text-text-muted text-lg mb-12 max-w-3xl">
          We're onboarding 12 agents per market. Applications close when spots fill.
          If you're serious about owning your market, this is your window.
        </p>
        <div className="text-center text-text-muted">
          [Alpha form to be implemented in Phase 2]
        </div>
      </section>
    </div>
  );
}
