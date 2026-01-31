import React from 'react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="container mx-auto px-8 relative min-h-[85vh] flex flex-col justify-center py-16">
      {/* System Badge - top right corner */}
      <div
        className="absolute top-4 right-4 font-mono text-xs tracking-wider opacity-70 text-right pointer-events-none text-text-muted hidden md:block"
        aria-hidden="true"
      >
        <span>SYSTEM STATUS: ONLINE</span>
        <br />
        <span>PROTOCOL: SNIPER_V4</span>
      </div>

      {/* Hero Pre-text */}
      <div className="font-mono text-accent text-xs mb-8 flex items-center gap-2 font-normal">
        <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
        ENTITY SEARCH IS LIVE — THE WINDOW IS CLOSING
      </div>

      {/* Main Heading */}
      <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] leading-[1.05] mb-8 font-normal tracking-tight">
        You're Paying Zillow $30K a Year
        <br />
        <span className="text-text-muted italic">For Leads That Don't Close.</span>
      </h1>

      {/* Lead Paragraphs */}
      <p className="max-w-[620px] text-text-muted text-lg mb-4 leading-relaxed">
        The average agent spends $2,500/month on portal leads with a 2% close rate.
        That's $30K annually for maybe six deals—while Zillow builds their brand on your listings.
      </p>
      <p className="max-w-[620px] text-text-muted text-lg mb-14 leading-relaxed">
        Google's Entity Search is rolling out now. Homes are becoming searchable objects.
        Agents are being ranked by response time and reviews. The agents who move fast will
        own the first page. The ones who wait will keep writing checks to Zillow.
      </p>

      {/* Metrics Ticker */}
      <div className="border border-border bg-panel inline-flex flex-wrap rounded overflow-hidden mb-8">
        <div className="flex-1 min-w-0 relative px-12 py-6 border-r border-border">
          <span className="block font-mono text-3xl text-accent font-normal">$30K+</span>
          <span className="text-[0.7rem] uppercase tracking-wider text-text-muted mt-2 block font-normal">
            Annual Portal Spend (Avg)
          </span>
        </div>
        <div className="flex-1 min-w-0 relative px-12 py-6 border-r border-border">
          <span className="block font-mono text-3xl text-text-main font-normal">2%</span>
          <span className="text-[0.7rem] uppercase tracking-wider text-text-muted mt-2 block font-normal">
            Portal Lead Close Rate
          </span>
        </div>
        <div className="flex-1 min-w-0 relative px-12 py-6">
          <span className="block font-mono text-3xl text-accent font-normal">&lt;60s</span>
          <span className="text-[0.7rem] uppercase tracking-wider text-text-muted mt-2 block font-normal">
            Response Time Google Measures
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <Button variant="accent" onClick={() => {
          document.getElementById('shift')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          See What's Coming
        </Button>
      </div>
    </section>
  );
}
