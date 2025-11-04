import AvailableFundsChart from '../AvailableFundsChart';

export default function AvailableFundsChartExample() {
  const mockData = [
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

  return <AvailableFundsChart data={mockData} />;
}
