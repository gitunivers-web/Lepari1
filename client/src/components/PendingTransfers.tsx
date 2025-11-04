import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/lib/i18n';
import { CheckCircle2, Clock } from 'lucide-react';

interface Transfer {
  id: string;
  amount: number;
  recipient: string;
  status: 'pending' | 'in-progress' | 'approved' | 'rejected';
  currentStep: number;
  updatedAt: string;
}

interface PendingTransfersProps {
  transfers: Transfer[];
}

const STEPS = [
  'requestSubmitted',
  'documentVerification',
  'complianceCheck',
  'approvalPending',
  'transferComplete',
] as const;

export default function PendingTransfers({ transfers }: PendingTransfersProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: Transfer['status']) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.pendingTransfers}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {transfers.map((transfer) => (
          <div
            key={transfer.id}
            className="border rounded-md p-6 space-y-4"
            data-testid={`transfer-${transfer.id}`}
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <p className="text-2xl md:text-3xl font-mono font-bold">
                  {formatCurrency(transfer.amount)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Destinataire: {transfer.recipient}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dernière mise à jour: {transfer.updatedAt}
                </p>
              </div>
              <Badge variant={getStatusBadgeVariant(transfer.status)}>
                {transfer.status === 'in-progress' ? t.transfer.inProgress : t.transfer[transfer.status]}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium mb-3">
                <span>Progression</span>
                <span className="text-muted-foreground">
                  Étape {transfer.currentStep}/{STEPS.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {STEPS.map((step, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = stepNumber < transfer.currentStep;
                  const isCurrent = stepNumber === transfer.currentStep;

                  return (
                    <div key={step} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : isCurrent
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <p className="text-xs text-center text-muted-foreground hidden sm:block">
                        {t.transfer[step]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
