import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export function GlassPanel({ children, className = '', intensity = 'medium' }: GlassPanelProps) {
  const intensityClasses = {
    light: 'bg-white/40 dark:bg-white/5 backdrop-blur-sm',
    medium: 'bg-white/60 dark:bg-white/10 backdrop-blur-md',
    strong: 'bg-white/80 dark:bg-white/15 backdrop-blur-lg',
  };

  return (
    <div
      className={`rounded-xl border border-white/20 dark:border-white/10 shadow-lg ${intensityClasses[intensity]} ${className}`}
      style={{ borderRadius: 'var(--dashboard-radius)' }}
    >
      {children}
    </div>
  );
}
