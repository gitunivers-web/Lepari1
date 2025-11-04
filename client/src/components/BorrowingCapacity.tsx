import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/lib/i18n';

interface BorrowingCapacityProps {
  maxCapacity: number;
  currentCapacity: number;
}

export default function BorrowingCapacity({
  maxCapacity,
  currentCapacity,
}: BorrowingCapacityProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const percentage = (currentCapacity / maxCapacity) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.borrowingCapacity}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-mono font-bold">{Math.round(percentage)}%</p>
              <p className="text-sm text-muted-foreground">disponible</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{t.dashboard.canBorrowUpTo}</p>
          <p className="text-3xl font-mono font-bold" data-testid="text-borrowing-capacity">
            {formatCurrency(currentCapacity)}
          </p>
          <p className="text-xs text-muted-foreground">sur {formatCurrency(maxCapacity)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
