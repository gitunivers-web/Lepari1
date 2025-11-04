import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';
import { Plus, ArrowRightLeft, History } from 'lucide-react';

export default function QuickActions() {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.quickActions}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start gap-3"
          size="lg"
          data-testid="button-new-loan"
          onClick={() => console.log('New loan clicked')}
        >
          <Plus className="h-5 w-5" />
          {t.dashboard.newLoan}
        </Button>
        <Button
          className="w-full justify-start gap-3"
          variant="secondary"
          size="lg"
          data-testid="button-transfer-funds"
          onClick={() => console.log('Transfer funds clicked')}
        >
          <ArrowRightLeft className="h-5 w-5" />
          {t.dashboard.transferFunds}
        </Button>
        <Button
          className="w-full justify-start gap-3"
          variant="outline"
          size="lg"
          data-testid="button-transaction-history"
          onClick={() => console.log('Transaction history clicked')}
        >
          <History className="h-5 w-5" />
          {t.dashboard.transactionHistory}
        </Button>
      </CardContent>
    </Card>
  );
}
