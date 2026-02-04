import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex justify-center mb-4">
              <Logo size="small" />
            </div>

            <a
              href="https://www.boxfordpartners.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center inline-block px-2 py-1 mb-6 border border-slate-800 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:border-slate-600 hover:text-slate-300 transition-colors"
            >
              A Boxford Partners Company
            </a>

            <div className="text-center text-sm text-slate-500 space-y-2 mb-6">
              <p>
                <svg className="w-4 h-4 inline text-slate-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                345 California St, Suite 600<br />
                <span className="pl-5">San Francisco, CA 94104</span>
              </p>
              <p>
                <a href="mailto:hello@gravitasindex.com" className="hover:text-white transition-colors">
                  <svg className="w-4 h-4 inline text-slate-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  hello@gravitasindex.com
                </a>
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-center text-white font-bold mb-6 text-sm uppercase tracking-wide">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-center">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#alpha" className="hover:text-white transition-colors">
                  Join Alpha
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-center text-white font-bold mb-6 text-sm uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-center">
              <li>
                <a href="https://www.boxfordpartners.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:hello@gravitasindex.com" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="mailto:hello@gravitasindex.com" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-center text-white font-bold mb-6 text-sm uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-center">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-sm">
          <p>&copy; {currentYear} Boxford Partners LLC DBA GRAVITAS INDEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
