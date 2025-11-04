import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import heroImage from '@assets/generated_images/Professional_business_handshake_hero_a876f666.png';
import { Link } from 'wouter';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover-elevate active-elevate-2 gap-2"
              data-testid="button-request-loan"
            >
              {t.hero.cta1}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/20 text-white border-white/30 hover:bg-white/30"
              data-testid="button-my-account"
            >
              {t.hero.cta2}
            </Button>
          </Link>
        </div>

        <div className="text-white/80 text-sm">
          {t.hero.trustIndicator}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/60" />
      </div>
    </section>
  );
}
