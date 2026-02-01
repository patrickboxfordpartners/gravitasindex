'use client';

import { useState } from 'react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkUrl?: string;
  order: number;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          className="border border-border bg-panel rounded-lg overflow-hidden transition-all duration-300 hover:border-accent/50"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 transition-colors"
            aria-expanded={openIndex === index}
          >
            <h2 className="font-serif text-xl md:text-2xl font-normal text-text-main">
              {faq.question}
            </h2>
            <span
              className={`flex-shrink-0 text-accent transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-8 pb-6">
              <p className="text-text-muted text-lg leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
              {faq.hasLink && (
                <a
                  href={faq.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent hover:underline font-medium transition-colors"
                >
                  {faq.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
