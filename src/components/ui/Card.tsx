import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  showBracket?: boolean;
  number?: string;
}

export function Card({ children, className = '', showBracket = false, number }: CardProps) {
  return (
    <div className={`bg-panel border border-border p-10 transition-all duration-300 hover:border-accent hover:-translate-y-1 relative overflow-hidden ${className}`}>
      {showBracket && (
        <div className="absolute top-8 right-8 w-5 h-5 border-t-2 border-r-2 border-text-muted opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {number && (
        <div className="absolute top-8 left-8 font-mono text-5xl font-normal text-text-muted/20">
          {number}
        </div>
      )}
      {children}
    </div>
  );
}
