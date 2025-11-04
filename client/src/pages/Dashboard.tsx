import BalanceOverview from '@/components/BalanceOverview';
import ActiveLoans from '@/components/ActiveLoans';
import BorrowingCapacity from '@/components/BorrowingCapacity';
import QuickActions from '@/components/QuickActions';
import FeeSection from '@/components/FeeSection';
import PendingTransfers from '@/components/PendingTransfers';
import AvailableFundsChart from '@/components/AvailableFundsChart';
import UpcomingRepaymentsChart from '@/components/UpcomingRepaymentsChart';
import { useTranslations } from '@/lib/i18n';

export default function Dashboard() {
  const t = useTranslations();

  const mockLoans = [
    {
      id: '1',
      amount: 200000,
      interestRate: 3.5,
      nextPaymentDate: '15 Déc 2025',
      totalRepaid: 75000,
    },
    {
      id: '2',
      amount: 150000,
      interestRate: 4.2,
      nextPaymentDate: '20 Déc 2025',
      totalRepaid: 50000,
    },
    {
      id: '3',
      amount: 100000,
      interestRate: 3.8,
      nextPaymentDate: '28 Déc 2025',
      totalRepaid: 30000,
    },
  ];

  const mockFees = [
    {
      id: '1',
      feeType: 'Frais de dossier',
      reason: 'Traitement de la demande de prêt #12345',
      amount: 150,
      createdAt: '1 Nov 2025',
      category: 'loan' as const,
    },
    {
      id: '2',
      feeType: 'Frais de transfert international',
      reason: 'Transfert vers compte étranger',
      amount: 25,
      createdAt: '5 Nov 2025',
      category: 'transfer' as const,
    },
    {
      id: '3',
      feeType: 'Frais de gestion mensuel',
      reason: 'Gestion de compte professionnel',
      amount: 15,
      createdAt: '1 Nov 2025',
      category: 'account' as const,
    },
    {
      id: '4',
      feeType: 'Frais de garantie',
      reason: 'Assurance sur prêt #12346',
      amount: 200,
      createdAt: '10 Nov 2025',
      category: 'loan' as const,
    },
  ];

  const mockTransfers = [
    {
      id: '1',
      amount: 50000,
      recipient: 'Fournisseur ABC SARL',
      status: 'in-progress' as const,
      currentStep: 3,
      updatedAt: 'Il y a 2 heures',
    },
    {
      id: '2',
      amount: 25000,
      recipient: 'Partenaire XYZ Inc.',
      status: 'pending' as const,
      currentStep: 1,
      updatedAt: 'Il y a 1 jour',
    },
  ];

  const mockFundsData = [
    { month: 'Jan', available: 300000, committed: 150000, reserved: 50000 },
    { month: 'Fév', available: 320000, committed: 140000, reserved: 40000 },
    { month: 'Mar', available: 310000, committed: 160000, reserved: 30000 },
    { month: 'Avr', available: 340000, committed: 130000, reserved: 30000 },
    { month: 'Mai', available: 350000, committed: 120000, reserved: 30000 },
    { month: 'Juin', available: 355000, committed: 115000, reserved: 30000 },
    { month: 'Juil', available: 360000, committed: 110000, reserved: 30000 },
    { month: 'Août', available: 365000, committed: 105000, reserved: 30000 },
    { month: 'Sep', available: 370000, committed: 100000, reserved: 30000 },
    { month: 'Oct', available: 375000, committed: 95000, reserved: 30000 },
    { month: 'Nov', available: 380000, committed: 90000, reserved: 30000 },
    { month: 'Déc', available: 385000, committed: 85000, reserved: 30000 },
  ];

  const mockRepaymentsData = [
    { month: 'Jan', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Fév', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Mar', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Avr', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Mai', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Juin', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Juil', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Août', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Sep', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Oct', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Nov', loan1: 8000, loan2: 6000, loan3: 4000 },
    { month: 'Déc', loan1: 8000, loan2: 6000, loan3: 4000 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre compte professionnel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceOverview
          currentBalance={145250.75}
          activeLoansCount={3}
          totalBorrowed={500000}
          availableCredit={354749.25}
          lastUpdated="Il y a 5 minutes"
        />
        <BorrowingCapacity maxCapacity={500000} currentCapacity={354749.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveLoans loans={mockLoans} />
        <QuickActions />
        <FeeSection fees={mockFees} />
      </div>

      <PendingTransfers transfers={mockTransfers} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AvailableFundsChart data={mockFundsData} />
        <UpcomingRepaymentsChart data={mockRepaymentsData} />
      </div>
    </div>
  );
}
