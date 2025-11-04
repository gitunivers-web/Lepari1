import UpcomingRepaymentsChart from '../UpcomingRepaymentsChart';

export default function UpcomingRepaymentsChartExample() {
  const mockData = [
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

  return <UpcomingRepaymentsChart data={mockData} />;
}
