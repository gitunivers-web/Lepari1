import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: 'Quels sont les documents nécessaires pour une demande de prêt ?',
      answer: 'Pour les particuliers : pièce d\'identité, justificatif de domicile, derniers bulletins de salaire et avis d\'imposition. Pour les professionnels : Kbis, bilans comptables des 3 dernières années, business plan et relevés bancaires.',
    },
    {
      question: 'Quel est le délai pour obtenir une réponse ?',
      answer: 'Vous recevrez une réponse de principe sous 24 à 48 heures après soumission de votre dossier complet. Une fois approuvé, les fonds peuvent être débloqués en 5 à 7 jours ouvrés.',
    },
    {
      question: 'Puis-je rembourser mon prêt par anticipation ?',
      answer: 'Oui, tous nos prêts sont remboursables par anticipation sans frais ni pénalités. Vous pouvez effectuer un remboursement partiel ou total à tout moment depuis votre espace client.',
    },
    {
      question: 'Quels sont les taux d\'intérêt appliqués ?',
      answer: 'Nos taux varient de 0,5% à 8,5% selon le type de prêt, le montant emprunté, la durée et votre profil. Utilisez notre simulateur en ligne pour obtenir une estimation personnalisée. Les taux sont fixes et garantis pendant toute la durée du prêt.',
    },
    {
      question: 'Comment fonctionne le processus de demande en ligne ?',
      answer: '1) Remplissez notre formulaire en ligne (10 minutes). 2) Soumettez vos documents justificatifs. 3) Recevez une réponse de principe sous 48h. 4) Signez électroniquement votre contrat. 5) Recevez les fonds sous 5-7 jours.',
    },
    {
      question: 'Quelle est la différence entre prêt affecté et non affecté ?',
      answer: 'Un prêt affecté est lié à un achat spécifique (auto, travaux) et nécessite un justificatif d\'utilisation. Un prêt non affecté (prêt personnel) vous laisse libre d\'utiliser les fonds comme vous le souhaitez sans justificatif.',
    },
    {
      question: 'Y a-t-il des frais de dossier ?',
      answer: 'Les frais de dossier varient selon le type et le montant du prêt. Pour les prêts particuliers, ils sont généralement de 1% du montant (plafonné à 500€). Pour les prêts professionnels, ils peuvent aller de 1% à 2%. Ces frais sont clairement indiqués dans votre simulation.',
    },
    {
      question: 'Que se passe-t-il si je ne peux plus rembourser ?',
      answer: 'En cas de difficultés financières temporaires, contactez immédiatement notre service client. Nous pouvons étudier des solutions comme le report d\'échéances, la modulation des mensualités ou un rééchelonnement du prêt. Notre assurance emprunteur peut également couvrir certaines situations.',
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              Vous ne trouvez pas la réponse à votre question ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe d'experts est disponible du lundi au vendredi de 9h à 19h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Contactez-nous
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" data-testid="button-resources">
                  Centre d'aide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
