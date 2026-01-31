import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-panel py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Logo size="small" />
            <p className="text-text-muted text-sm mt-6 leading-relaxed max-w-md">
              Transform your business into a market authority Google can't ignore.
              Data-driven entity optimization that turns search invisibility into market dominance.
            </p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-main mb-4 font-normal">
              Product
            </h5>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-sm text-text-muted hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#alpha" className="text-sm text-text-muted hover:text-accent transition-colors">
                  Join Alpha
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-text-muted hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-main mb-4 font-normal">
              Company
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@gravitasindex.com"
                  className="text-sm text-text-muted hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-muted hover:text-accent transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-muted hover:text-accent transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-main mb-4 font-normal">
              Connect
            </h5>
            <p className="text-sm text-text-muted mb-4">
              Questions? Reach out:
            </p>
            <a
              href="mailto:hello@gravitasindex.com"
              className="text-sm text-accent hover:underline font-mono"
            >
              hello@gravitasindex.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-text-muted font-mono font-normal">
            © {currentYear} GRAVITAS INDEX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
