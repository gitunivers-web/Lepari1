import { storage } from './storage';
import { type InsertNotification } from '@shared/schema';

export type NotificationType =
  | 'loan_request'
  | 'loan_under_review'
  | 'loan_approved'
  | 'loan_rejected'
  | 'loan_contract_generated'
  | 'loan_contract_signed'
  | 'loan_disbursed'
  | 'transfer_initiated'
  | 'transfer_completed'
  | 'transfer_approved'
  | 'transfer_suspended'
  | 'code_issued'
  | 'kyc_approved'
  | 'kyc_rejected'
  | 'fee_added'
  | 'account_status_changed'
  | 'admin_message_sent'
  | 'general';

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  metadata?: any;
}

export async function createUserNotification(params: CreateNotificationParams) {
  const notification: InsertNotification = {
    userId: params.userId,
    type: params.type,
    title: params.title,
    message: params.message,
    severity: params.severity || 'info',
    isRead: false,
    metadata: params.metadata,
  };

  return await storage.createNotification(notification);
}

export async function notifyLoanApproved(userId: string, loanId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'loan_approved',
    title: 'Prêt approuvé',
    message: `Votre demande de prêt de ${amount} € a été approuvée. Vous pouvez maintenant procéder à la signature du contrat.`,
    severity: 'success',
    metadata: { loanId },
  });
}

export async function notifyLoanRejected(userId: string, loanId: string, reason: string) {
  return await createUserNotification({
    userId,
    type: 'loan_rejected',
    title: 'Prêt refusé',
    message: `Votre demande de prêt a été refusée. Raison : ${reason}`,
    severity: 'error',
    metadata: { loanId, reason },
  });
}

export async function notifyLoanDisbursed(userId: string, loanId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'loan_disbursed',
    title: 'Fonds déboursés',
    message: `Votre prêt de ${amount} € a été déboursé avec succès. Les fonds sont disponibles sur votre compte.`,
    severity: 'success',
    metadata: { loanId },
  });
}

export async function notifyTransferCompleted(userId: string, transferId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'transfer_completed',
    title: 'Transfert terminé',
    message: `Votre transfert de ${amount} € a été complété avec succès.`,
    severity: 'success',
    metadata: { transferId },
  });
}

export async function notifyTransferApproved(userId: string, transferId: string) {
  return await createUserNotification({
    userId,
    type: 'transfer_approved',
    title: 'Transfert approuvé',
    message: 'Votre demande de transfert a été approuvée par l\'administration.',
    severity: 'success',
    metadata: { transferId },
  });
}

export async function notifyTransferSuspended(userId: string, transferId: string, reason: string) {
  return await createUserNotification({
    userId,
    type: 'transfer_suspended',
    title: 'Transfert suspendu',
    message: `Votre transfert a été suspendu. Raison : ${reason}`,
    severity: 'warning',
    metadata: { transferId, reason },
  });
}

export async function notifyCodeIssued(userId: string, transferId: string, sequence: number) {
  return await createUserNotification({
    userId,
    type: 'code_issued',
    title: 'Code de validation émis',
    message: `Un nouveau code de validation (#${sequence}) a été émis pour votre transfert. Vérifiez vos emails.`,
    severity: 'info',
    metadata: { transferId, sequence },
  });
}

export async function notifyKycApproved(userId: string) {
  return await createUserNotification({
    userId,
    type: 'kyc_approved',
    title: 'Documents KYC approuvés',
    message: 'Vos documents ont été vérifiés et approuvés. Votre compte est maintenant actif.',
    severity: 'success',
  });
}

export async function notifyKycRejected(userId: string, reason: string) {
  return await createUserNotification({
    userId,
    type: 'kyc_rejected',
    title: 'Documents KYC refusés',
    message: `Vos documents ont été refusés. Raison : ${reason}. Veuillez soumettre de nouveaux documents.`,
    severity: 'error',
    metadata: { reason },
  });
}

export async function notifyFeeAdded(userId: string, feeId: string, amount: string, reason: string) {
  return await createUserNotification({
    userId,
    type: 'fee_added',
    title: 'Nouveaux frais',
    message: `Des frais de ${amount} € ont été ajoutés à votre compte. Raison : ${reason}`,
    severity: 'warning',
    metadata: { feeId, reason },
  });
}

export async function notifyAccountStatusChanged(userId: string, newStatus: string, reason?: string) {
  return await createUserNotification({
    userId,
    type: 'account_status_changed',
    title: 'Statut du compte modifié',
    message: reason 
      ? `Le statut de votre compte a changé: ${newStatus}. Raison : ${reason}`
      : `Le statut de votre compte a changé: ${newStatus}`,
    severity: newStatus === 'active' ? 'success' : 'warning',
    metadata: { newStatus, reason },
  });
}

export async function notifyLoanRequest(userId: string, loanId: string, amount: string, loanType: string) {
  return await createUserNotification({
    userId,
    type: 'loan_request',
    title: 'Demande de prêt soumise',
    message: `Votre demande de prêt ${loanType} de ${amount} € a été soumise avec succès. Notre équipe examinera votre demande dans les plus brefs délais.`,
    severity: 'success',
    metadata: { loanId, loanType, amount },
  });
}

export async function notifyLoanUnderReview(userId: string, loanId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'loan_under_review',
    title: 'Demande en cours d\'examen',
    message: `Votre demande de prêt de ${amount} € est actuellement en cours d'examen par notre équipe. Vous recevrez une réponse prochainement.`,
    severity: 'info',
    metadata: { loanId },
  });
}

export async function notifyLoanContractGenerated(userId: string, loanId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'loan_contract_generated',
    title: 'Contrat de prêt disponible',
    message: `Votre contrat de prêt de ${amount} € est maintenant disponible. Veuillez le télécharger, le signer et le retourner pour débloquer les fonds.`,
    severity: 'success',
    metadata: { loanId },
  });
}

export async function notifyLoanContractSigned(userId: string, loanId: string, amount: string) {
  return await createUserNotification({
    userId,
    type: 'loan_contract_signed',
    title: 'Contrat signé reçu',
    message: `Votre contrat signé pour le prêt de ${amount} € a été reçu avec succès. Les fonds seront débloqués prochainement.`,
    severity: 'success',
    metadata: { loanId },
  });
}

export async function notifyAdminMessage(userId: string, subject: string, severity: 'info' | 'success' | 'warning' | 'error' = 'info') {
  return await createUserNotification({
    userId,
    type: 'admin_message_sent',
    title: 'Nouveau message de l\'administration',
    message: subject,
    severity,
  });
}

export async function notifyTransferInitiated(userId: string, transferId: string, amount: string, recipientName: string) {
  return await createUserNotification({
    userId,
    type: 'transfer_initiated',
    title: 'Transfert initié',
    message: `Votre transfert de ${amount} € vers ${recipientName} a été initié avec succès. Il sera traité dans les plus brefs délais.`,
    severity: 'success',
    metadata: { transferId, recipientName },
  });
}
