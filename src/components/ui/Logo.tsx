import React from 'react';

interface LogoProps {
  size?: 'default' | 'small';
  className?: string;
}

export function Logo({ size = 'default', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 font-mono text-xl leading-none ${className}`}>
      {/* CSS-based "G" monogram */}
      <div
        className={`relative flex-shrink-0 ${size === 'small' ? 'scale-75 origin-left' : ''}`}
        style={{ width: '40px', height: '40px' }}
      >
        {/* The C-Shape Body */}
        <div
          className="w-full h-full border-[3px] border-text-muted border-r-0 rounded-l-sm"
          style={{ borderRightWidth: 0 }}
        >
          {/* 1. THE CROSSBAR (::before) */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-text-muted"
            style={{ width: '12px', height: '3px' }}
          />

          {/* 2. THE "I" (The Blue Vertical Downstroke - ::after) */}
          <div
            className="absolute -right-[3px] bg-accent shadow-[0_0_12px_rgba(56,189,248,0.5)]"
            style={{
              top: '50%',
              height: '26px',
              width: '3px',
              transform: 'translateY(-1.5px)'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-extrabold tracking-[0.1em] uppercase">GRAVITAS</span>
        <span className="font-light text-text-muted lowercase text-[0.9em]">index</span>
      </div>
    </div>
  );
}
