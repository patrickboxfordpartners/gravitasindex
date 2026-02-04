'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(1);

  const toggleLayer = (layer: number) => {
    setExpandedLayer(expandedLayer === layer ? null : layer);
  };

  const layers = [
    {
      number: 1,
      label: 'LAYER 01 // RESPONSE INFRASTRUCTURE',
      title: 'AI Concierge: Sub-60s Response Time',
      description: [
        'Your AI concierge monitors all incoming leads 24/7. When someone reaches out, it responds instantly with personalized, contextual information—property details, neighborhood insights, or answers to specific questions. No generic auto-responders. Real intelligence that books qualified conversations.',
        'Google measures this. Agents who respond in under 60 seconds get priority placement. Those who take hours disappear. This is infrastructure, not effort.',
      ],
      icon: '⚡',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      label: 'LAYER 02 // TRUST SIGNAL ENGINEERING',
      title: 'Review Capture + Reputation Automation',
      description: [
        'After every closing, the system automatically triggers a review request sequence. All customers receive the opportunity to leave reviews on Google, Zillow, and Facebook. Internal feedback helps you improve service quality.',
        'Google\'s Entity Search algorithm weighs review velocity, recency, and sentiment. Most agents get 2-3 reviews per year. You\'ll get 2-3 per month. That\'s the difference between page three and position one.',
      ],
      icon: '⭐',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      label: 'LAYER 03 // ENTITY OPTIMIZATION',
      title: 'Structured Data + Knowledge Graph Injection',
      description: [
        'Your website becomes machine-readable. We implement Schema markup, JSON-LD, and Knowledge Graph protocols that tell Google exactly who you are, what you do, and why you\'re an authority.',
        'When Google rolls out Entity Search in your market, you\'ll already be indexed as the primary agent entity. Your competitors will be scrambling. You\'ll be closing.',
      ],
      icon: '🎯',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-8 py-28">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-serif text-6xl font-normal mb-8 text-white">
            How It Works
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Three infrastructure layers working together to transform you into a market authority
            Google can&apos;t ignore.
          </p>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setExpandedLayer(num)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  expandedLayer === num
                    ? 'bg-cyan-400 w-8'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Jump to layer ${num}`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Layers */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {layers.map((layer) => (
            <div
              key={layer.number}
              className={`border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 ${
                expandedLayer === layer.number
                  ? 'bg-slate-900/50 shadow-2xl shadow-cyan-500/10'
                  : 'bg-slate-900/20 hover:bg-slate-900/30'
              }`}
            >
              {/* Layer Header - Always Visible */}
              <button
                onClick={() => toggleLayer(layer.number)}
                className="w-full p-8 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <div
                    className={`text-5xl transition-transform duration-300 ${
                      expandedLayer === layer.number ? 'scale-110' : 'scale-100 group-hover:scale-105'
                    }`}
                  >
                    {layer.icon}
                  </div>

                  {/* Title */}
                  <div className="text-left">
                    <span className="font-mono text-cyan-400 text-xs block mb-3 tracking-wider">
                      {layer.label}
                    </span>
                    <h2 className="font-serif text-3xl font-normal text-white">
                      {layer.title}
                    </h2>
                  </div>
                </div>

                {/* Expand Icon */}
                <div
                  className={`text-slate-400 transition-transform duration-300 ${
                    expandedLayer === layer.number ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Layer Content - Expandable */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedLayer === layer.number ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pt-0">
                  <div className="pl-[88px] space-y-6">
                    {layer.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-slate-300 text-lg leading-relaxed"
                        style={{
                          animation: expandedLayer === layer.number ? `fadeInUp 0.6s ease-out ${idx * 0.1}s both` : 'none',
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/* Visual Accent Bar */}
                    <div
                      className={`h-1 bg-gradient-to-r ${layer.color} rounded-full mt-8`}
                      style={{
                        animation: expandedLayer === layer.number ? 'expandWidth 0.8s ease-out 0.3s both' : 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What You Get Section */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-cyan-400 text-xs block mb-6 tracking-wider">
              WHAT YOU GET
            </span>
            <h2 className="font-serif text-5xl font-normal text-white mb-6">
              Complete Infrastructure Package
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to dominate Entity Search, from initial setup to ongoing optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">🚀</div>
                <h3 className="font-mono text-xl text-cyan-400">Setup & Integration</h3>
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>AI concierge configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>CRM integration (any platform)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Review automation setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Schema markup implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Knowledge Graph optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">📊</div>
                <h3 className="font-mono text-xl text-purple-400">Ongoing Management</h3>
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>24/7 lead monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Monthly performance reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Review velocity tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Entity ranking updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Priority support channel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/#alpha"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono text-sm rounded-full hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>Join the Alpha Program</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
