import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';
import { Plus, ArrowRightLeft, History } from 'lucide-react';
import NewLoanDialog from './NewLoanDialog';
import TransactionHistoryDialog from './TransactionHistoryDialog';

export default function QuickActions() {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  return (
    <>
      <Card className="shadow-xl border-2 border-purple-100 dark:border-purple-900 bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{t.dashboard.quickActions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
            data-testid="button-new-loan"
            onClick={() => setLoanDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
            {t.dashboard.newLoan}
          </Button>
          <Button
            className="w-full justify-start gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
            data-testid="button-transfer-funds"
            onClick={() => setLocation('/transfer/new')}
          >
            <ArrowRightLeft className="h-5 w-5" />
            {t.dashboard.transferFunds}
          </Button>
          <Button
            className="w-full justify-start gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
            data-testid="button-transaction-history"
            onClick={() => setHistoryDialogOpen(true)}
          >
            <History className="h-5 w-5" />
            {t.dashboard.transactionHistory}
          </Button>
        </CardContent>
      </Card>

      <NewLoanDialog open={loanDialogOpen} onOpenChange={setLoanDialogOpen} />
      <TransactionHistoryDialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen} />
    </>
  );
}
