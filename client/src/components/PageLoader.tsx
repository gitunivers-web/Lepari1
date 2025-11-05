import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const previousLocationRef = useRef(location);

  useEffect(() => {
    if (location !== previousLocationRef.current) {
      setIsLoading(true);
      previousLocationRef.current = location;

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg p-8 shadow-lg flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" data-testid="loader-page" />
        <p className="text-lg font-medium text-foreground">Chargement...</p>
      </div>
    </div>
  );
}
