import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { TrendingUp, CreditCard, Wrench, FileText, User, Home, Car, GraduationCap, Leaf, Hammer } from 'lucide-react';

export default function Products() {
  const t = useTranslations();

  const individualProducts = [
    {
      icon: User,
      title: t.individualLoans.personalLoan,
      description: t.individualLoans.personalLoanDesc,
      features: ['€1,000 - €75,000', '12-84 months', '2.9% - 7.9% APR'],
    },
    {
      icon: Home,
      title: t.individualLoans.mortgageLoan,
      description: t.individualLoans.mortgageLoanDesc,
      features: ['€50,000 - €500,000', '10-25 years', '1.5%+ APR'],
    },
    {
      icon: Car,
      title: t.individualLoans.autoLoan,
      description: t.individualLoans.autoLoanDesc,
      features: ['€3,000 - €75,000', '12-84 months', '1.9% - 5.9% APR'],
    },
    {
      icon: GraduationCap,
      title: t.individualLoans.studentLoan,
      description: t.individualLoans.studentLoanDesc,
      features: ['€1,000 - €50,000', 'Deferred payment', '1.5%+ APR'],
    },
    {
      icon: Leaf,
      title: t.individualLoans.greenLoan,
      description: t.individualLoans.greenLoanDesc,
      features: ['€7,000 - €50,000', 'State aid eligible', '0.5%+ APR'],
    },
    {
      icon: Hammer,
      title: t.individualLoans.renovationLoan,
      description: t.individualLoans.renovationLoanDesc,
      features: ['€1,500 - €75,000', '12-120 months', '2.5% - 6.9% APR'],
    },
  ];

  const businessProducts = [
    {
      icon: TrendingUp,
      title: t.products.termLoans,
      description: t.products.termLoansDesc,
      features: ['€10,000 - €500,000', '1-7 years', '3.5% - 8.5% APR'],
    },
    {
      icon: CreditCard,
      title: t.products.lineOfCredit,
      description: t.products.lineOfCreditDesc,
      features: ['€5,000 - €100,000', 'Revolving', '4.0% - 9.0% APR'],
    },
    {
      icon: Wrench,
      title: t.products.equipmentFinancing,
      description: t.products.equipmentFinancingDesc,
      features: ['€20,000 - €300,000', '2-5 years', '3.9% - 7.5% APR'],
    },
    {
      icon: FileText,
      title: t.products.invoiceFactoring,
      description: t.products.invoiceFactoringDesc,
      features: ['€5,000 - €250,000', '30-90 days', '1-3% fee'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.products.title}</h1>
            <p className="text-xl text-muted-foreground">{t.products.subtitle}</p>
          </div>

          {/* Individual Loans Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-individual-loans">{t.individualLoans.title}</h2>
              <p className="text-lg text-muted-foreground">{t.individualLoans.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {individualProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card key={index} className="p-6" data-testid={`card-individual-loan-${index}`}>
                    <Icon className="w-10 h-10 mb-3 text-primary" />
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/dashboard" className="block">
                      <Button className="w-full" size="sm" data-testid={`button-apply-individual-${index}`}>{t.hero.cta1}</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Business Loans Section */}
          <div>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-business-loans">
                {t.products.businessTitle}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.products.businessSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {businessProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card key={index} className="p-8" data-testid={`card-business-loan-${index}`}>
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/dashboard" className="block">
                      <Button className="w-full" data-testid={`button-apply-business-${index}`}>{t.hero.cta1}</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
