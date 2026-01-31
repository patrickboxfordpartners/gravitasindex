import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent';
  children: React.ReactNode;
}

export function Button({
  variant = 'default',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = "inline-block px-10 py-4 font-mono text-xs uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80";

  const variantClasses = {
    default: "bg-transparent border border-border text-text-main hover:border-text-main hover:bg-white/5",
    accent: "border border-accent text-accent shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:bg-accent hover:text-black hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
