import { useState, useEffect } from 'react';
import { Info, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface InfoMessage {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'success' | 'update';
}

const messages: InfoMessage[] = [
  {
    id: '1',
    text: 'Votre espace reste accessible pendant les mises à jour système',
    type: 'info',
  },
  {
    id: '2',
    text: 'Les virements sont traités sous 24h ouvrées',
    type: 'update',
  },
  {
    id: '3',
    text: 'Sécurité renforcée - Activez l\'authentification à deux facteurs',
    type: 'warning',
  },
  {
    id: '4',
    text: 'Nouveau - Consultez vos contrats signés dans la section Contrats',
    type: 'success',
  },
];

export function ScrollingInfoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentMessage = messages[currentIndex];

  const getIcon = () => {
    switch (currentMessage.type) {
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'update':
        return <Clock className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getBgColor = () => {
    switch (currentMessage.type) {
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-900 dark:text-amber-200';
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200';
      case 'update':
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-900 dark:text-blue-200';
      default:
        return 'bg-muted/50 border-border text-foreground';
    }
  };

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${getBgColor()} animate-fade-in transition-all duration-500`}
      data-testid="info-banner"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <p className="text-sm font-medium flex-1 min-w-0">
        {currentMessage.text}
      </p>
      <div className="flex gap-1">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-current w-4' : 'bg-current/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
