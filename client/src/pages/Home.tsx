import Hero from '@/components/Hero';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 right-0 z-50 p-4 flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>
      <Hero />
    </div>
  );
}
