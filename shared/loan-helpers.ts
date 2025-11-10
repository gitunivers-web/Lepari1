import type { LoanOffer } from './loan-offers';
import { individualLoanOffers, businessLoanOffers } from './loan-offers';

export interface RequiredDocument {
  id: string;
  label: string;
  required: boolean;
}

export function getRequiredDocuments(accountType: 'individual' | 'business'): RequiredDocument[] {
  if (accountType === 'individual') {
    return [
      { id: 'id_card', label: 'Pièce d\'identité valide (CNI, passeport)', required: true },
      { id: 'proof_of_address', label: 'Justificatif de domicile (moins de 3 mois)', required: true },
      { id: 'pay_slips', label: '3 derniers bulletins de salaire', required: true },
      { id: 'tax_assessment', label: 'Dernier avis d\'imposition', required: true },
      { id: 'bank_statements', label: 'Relevés bancaires (3 mois)', required: true },
      { id: 'project_justification', label: 'Justificatifs du projet (devis, factures)', required: false },
    ];
  } else {
    return [
      { id: 'kbis', label: 'Kbis de moins de 3 mois', required: true },
      { id: 'director_id', label: 'Pièce d\'identité du dirigeant', required: true },
      { id: 'company_statutes', label: 'Statuts de l\'entreprise', required: true },
      { id: 'financial_statements', label: 'Bilans comptables (3 dernières années)', required: true },
      { id: 'tax_package', label: 'Liasse fiscale complète', required: true },
      { id: 'bank_statements_pro', label: 'Relevés bancaires professionnels (6 mois)', required: true },
      { id: 'business_plan', label: 'Business plan', required: false },
      { id: 'financial_forecast', label: 'Prévisionnel financier sur 3 ans', required: false },
      { id: 'quotes', label: 'Devis ou factures proforma', required: false },
    ];
  }
}

export function calculateInterestRate(
  loanType: string,
  amount: number,
  duration: number,
  accountType: 'individual' | 'business'
): number {
  const offers = accountType === 'individual' ? individualLoanOffers : businessLoanOffers;
  const offer = offers.find(o => o.id === loanType);
  
  if (!offer) return 5.0;
  
  const rateRange = offer.rate.match(/(\d+(?:,\d+)?)/g);
  if (!rateRange || rateRange.length < 2) return 5.0;
  
  const minRate = parseFloat(rateRange[0].replace(',', '.'));
  const maxRate = parseFloat(rateRange[1].replace(',', '.'));
  
  const amountRange = offer.amount.match(/(\d+\s?\d*)/g);
  if (!amountRange || amountRange.length < 2) return minRate;
  
  const minAmount = parseInt(amountRange[0].replace(/\s/g, ''));
  const maxAmount = parseInt(amountRange[1].replace(/\s/g, ''));
  
  const amountRatio = (amount - minAmount) / (maxAmount - minAmount);
  const calculatedRate = minRate + (amountRatio * (maxRate - minRate));
  
  return Math.min(Math.max(calculatedRate, minRate), maxRate);
}

export function getLoanOfferLimits(loanType: string, accountType: 'individual' | 'business'): {
  minAmount: number;
  maxAmount: number;
  minDuration: number;
  maxDuration: number;
} {
  const offers = accountType === 'individual' ? individualLoanOffers : businessLoanOffers;
  const offer = offers.find(o => o.id === loanType);
  
  if (!offer) {
    return { minAmount: 1000, maxAmount: 75000, minDuration: 12, maxDuration: 84 };
  }
  
  const amountRange = offer.amount.match(/(\d+\s?\d*)/g);
  const minAmount = amountRange ? parseInt(amountRange[0].replace(/\s/g, '')) : 1000;
  const maxAmount = amountRange ? parseInt(amountRange[1].replace(/\s/g, '')) : 75000;
  
  const durationRange = offer.duration.match(/(\d+)/g);
  const minDuration = durationRange ? parseInt(durationRange[0]) : 12;
  const maxDuration = durationRange ? parseInt(durationRange[1]) : 84;
  
  return { minAmount, maxAmount, minDuration, maxDuration };
}
