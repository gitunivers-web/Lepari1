import PendingTransfers from '../PendingTransfers';

export default function PendingTransfersExample() {
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

  return <PendingTransfers transfers={mockTransfers} />;
}
