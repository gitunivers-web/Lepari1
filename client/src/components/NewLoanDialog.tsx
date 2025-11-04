import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

interface NewLoanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewLoanDialog({ open, onOpenChange }: NewLoanDialogProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '',
    duration: '',
  });

  const createLoanMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create loan');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['/api/loans'] });
      toast({
        title: 'Demande de prêt envoyée',
        description: 'Votre demande de prêt a été soumise avec succès.',
      });
      onOpenChange(false);
      setFormData({ amount: '', interestRate: '', duration: '' });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la demande de prêt.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLoanMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.dashboard.newLoan}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant du prêt (€)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="3.5"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Durée (mois)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="60"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={createLoanMutation.isPending}>
              {createLoanMutation.isPending ? 'Envoi...' : 'Soumettre la demande'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
