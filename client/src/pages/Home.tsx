import Hero from '@/components/Hero';
import Header from '@/components/Header';
import IndividualLoans from '@/components/IndividualLoans';
import BusinessLoans from '@/components/BusinessLoans';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <StatsSection />
      <IndividualLoans />
      <BusinessLoans />
      <FeaturesSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
