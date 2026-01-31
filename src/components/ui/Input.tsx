import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {label}
        </label>
      )}
      <input
        className={`bg-panel border border-border px-4 py-3 text-text-main font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(56,189,248,0.18)] ${className}`}
        {...props}
      />
    </div>
  );
}
