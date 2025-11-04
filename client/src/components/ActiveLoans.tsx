import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from '@/lib/i18n';
import { useLocation } from 'wouter';
import LoanDetailsDialog from './LoanDetailsDialog';

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  nextPaymentDate: string | null;
  totalRepaid: number;
  status: string;
}

interface ActiveLoansProps {
  loans: Loan[];
}

export default function ActiveLoans({ loans }: ActiveLoansProps) {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const displayedLoans = loans.slice(0, 3);

  const handleLoanClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setDetailsOpen(true);
  };

  return (
    <>
      <Card className="shadow-xl border-2 border-emerald-100 dark:border-emerald-900 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 dark:from-slate-800 dark:via-emerald-950/30 dark:to-teal-950/30">
        <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">{t.dashboard.activeLoans}</CardTitle>
          {loans.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              data-testid="button-view-all-loans"
              onClick={() => setLocation('/loans')}
            >
              {t.loan.viewAll}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {displayedLoans.map((loan) => {
            const progress = (loan.totalRepaid / loan.amount) * 100;
            return (
              <div
                key={loan.id}
                className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-800 dark:to-emerald-950/50 rounded-xl p-4 space-y-3 hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 cursor-pointer"
                data-testid={`card-loan-${loan.id}`}
                onClick={() => handleLoanClick(loan)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.loan.amount}</p>
                    <p className="text-2xl font-mono font-semibold">{formatCurrency(loan.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t.loan.interestRate}</p>
                    <p className="text-lg font-semibold">{loan.interestRate}%</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{t.loan.nextPayment}</span>
                    <span>{loan.nextPaymentDate}</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      
      <LoanDetailsDialog 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen}
        loan={selectedLoan}
      />
    </>
  );
}
