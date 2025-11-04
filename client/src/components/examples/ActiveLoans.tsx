import ActiveLoans from '../ActiveLoans';

export default function ActiveLoansExample() {
  const mockLoans = [
    {
      id: '1',
      amount: 200000,
      interestRate: 3.5,
      nextPaymentDate: '15 Dec 2025',
      totalRepaid: 75000,
    },
    {
      id: '2',
      amount: 150000,
      interestRate: 4.2,
      nextPaymentDate: '20 Dec 2025',
      totalRepaid: 50000,
    },
    {
      id: '3',
      amount: 100000,
      interestRate: 3.8,
      nextPaymentDate: '28 Dec 2025',
      totalRepaid: 30000,
    },
  ];

  return <ActiveLoans loans={mockLoans} />;
}
