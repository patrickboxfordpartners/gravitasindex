'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' },
    { href: '/#alpha', label: 'Join Alpha' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-border bg-bg/85 backdrop-blur-[10px] py-6">
        <nav className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            <Link href="/" aria-label="GRAVITAS INDEX Home">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-8 text-xs text-text-muted uppercase tracking-wider font-medium transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Hamburger Menu */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-1 z-[200]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`block w-full h-0.5 bg-text-muted transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-x-0 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-text-muted transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-text-muted transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 translate-x-0 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${
          mobileMenuOpen ? 'flex' : 'hidden'
        } md:hidden fixed inset-0 bg-bg/98 backdrop-blur-[10px] z-[150] flex-col justify-center items-center gap-8 overflow-y-auto`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-base text-text-muted uppercase tracking-[0.1em] px-6 py-3 transition-colors hover:text-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
