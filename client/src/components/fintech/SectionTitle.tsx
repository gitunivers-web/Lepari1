import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionTitle({ title, subtitle, action, className = '' }: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-6 ${className}`}>
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
