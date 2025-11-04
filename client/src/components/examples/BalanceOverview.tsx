import BalanceOverview from '../BalanceOverview';

export default function BalanceOverviewExample() {
  return (
    <BalanceOverview
      currentBalance={145250.75}
      activeLoansCount={3}
      totalBorrowed={500000}
      availableCredit={354749.25}
      lastUpdated="Il y a 5 minutes"
    />
  );
}
