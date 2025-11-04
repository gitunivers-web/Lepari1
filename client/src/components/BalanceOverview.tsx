import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/lib/i18n';

interface BalanceOverviewProps {
  currentBalance: number;
  activeLoansCount: number;
  totalBorrowed: number;
  availableCredit: number;
  lastUpdated: string;
}

export default function BalanceOverview({
  currentBalance,
  activeLoansCount,
  totalBorrowed,
  availableCredit,
  lastUpdated,
}: BalanceOverviewProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <Card className="lg:col-span-2 shadow-xl border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{t.dashboard.currentBalance}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-4xl md:text-5xl font-mono font-bold" data-testid="text-current-balance">
            {formatCurrency(currentBalance)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.dashboard.lastUpdated}: {lastUpdated}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t.dashboard.activeLoans}</p>
            <p className="text-2xl md:text-3xl font-mono font-semibold" data-testid="text-active-loans">
              {activeLoansCount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t.dashboard.totalBorrowed}</p>
            <p className="text-2xl md:text-3xl font-mono font-semibold" data-testid="text-total-borrowed">
              {formatCurrency(totalBorrowed)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t.dashboard.availableCredit}</p>
            <p className="text-2xl md:text-3xl font-mono font-semibold" data-testid="text-available-credit">
              {formatCurrency(availableCredit)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
