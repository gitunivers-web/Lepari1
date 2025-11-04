import FeeSection from '../FeeSection';

export default function FeeSectionExample() {
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

  return <FeeSection fees={mockFees} />;
}
