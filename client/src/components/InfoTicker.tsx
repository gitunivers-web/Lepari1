import { Shield, Award, Clock, Lock } from 'lucide-react';

const messages = [
  {
    icon: Shield,
    text: "Vos données sont protégées avec un cryptage de niveau bancaire",
  },
  {
    icon: Award,
    text: "Taux préférentiels pour nos clients fidèles - Jusqu'à -0,5% sur votre prochain prêt",
  },
  {
    icon: Clock,
    text: "Réponse en 24h pour toute demande de prêt",
  },
  {
    icon: Lock,
    text: "Authentification à deux facteurs disponible pour plus de sécurité",
  },
  {
    icon: Award,
    text: "Programme de parrainage : 100€ offerts pour chaque filleul",
  },
];

export default function InfoTicker() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg shadow-sm">
      <div className="flex animate-scroll whitespace-nowrap py-3">
        {[...messages, ...messages].map((message, index) => {
          const Icon = message.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center mx-8 text-sm text-blue-900 dark:text-blue-100"
              data-testid={`ticker-message-${index}`}
            >
              <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="font-medium">{message.text}</span>
              <span className="mx-4 text-blue-400">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
