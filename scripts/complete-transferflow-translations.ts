import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const missingTranslations = {
  progress: {
    securityVerificationTitle: {
      fr: "Vérification de sécurité",
      en: "Security verification",
      es: "Verificación de seguridad",
      pt: "Verificação de segurança",
      it: "Verifica di sicurezza",
      de: "Sicherheitsüberprüfung",
      nl: "Beveiligingsverificatie"
    },
    transferProcessingTitle: {
      fr: "Virement en cours de traitement",
      en: "Transfer being processed",
      es: "Transferencia en proceso",
      pt: "Transferência em processamento",
      it: "Trasferimento in elaborazione",
      de: "Überweisung wird verarbeitet",
      nl: "Overdracht wordt verwerkt"
    },
    toPrefix: {
      fr: "Vers:",
      en: "To:",
      es: "Para:",
      pt: "Para:",
      it: "A:",
      de: "An:",
      nl: "Naar:"
    },
    securityVerificationRequired: {
      fr: "Vérification de sécurité requise",
      en: "Security verification required",
      es: "Verificación de seguridad requerida",
      pt: "Verificação de segurança necessária",
      it: "Verifica di sicurezza richiesta",
      de: "Sicherheitsüberprüfung erforderlich",
      nl: "Beveiligingsverificatie vereist"
    },
    enterVerificationCode: {
      fr: "Pour des raisons de sécurité, veuillez saisir le code de vérification qui vous a été transmis",
      en: "For security reasons, please enter the verification code that was sent to you",
      es: "Por razones de seguridad, ingrese el código de verificación que se le envió",
      pt: "Por razões de segurança, insira o código de verificação que lhe foi enviado",
      it: "Per motivi di sicurezza, inserisci il codice di verifica che ti è stato inviato",
      de: "Aus Sicherheitsgründen geben Sie bitte den Ihnen zugesandten Verifizierungscode ein",
      nl: "Om veiligheidsredenen voert u de verificatiecode in die naar u is verzonden"
    },
    codeFromAdvisor: {
      fr: "Le code de sécurité vous sera communiqué par votre conseiller",
      en: "The security code will be provided by your advisor",
      es: "Su asesor le proporcionará el código de seguridad",
      pt: "O código de segurança será fornecido pelo seu consultor",
      it: "Il codice di sicurezza sarà fornito dal tuo consulente",
      de: "Der Sicherheitscode wird Ihnen von Ihrem Berater mitgeteilt",
      nl: "De beveiligingscode wordt verstrekt door uw adviseur"
    },
    validationCodeLabel: {
      fr: "Code de validation (6 chiffres)",
      en: "Validation code (6 digits)",
      es: "Código de validación (6 dígitos)",
      pt: "Código de validação (6 dígitos)",
      it: "Codice di validazione (6 cifre)",
      de: "Validierungscode (6 Ziffern)",
      nl: "Validatiecode (6 cijfers)"
    },
    enterCodePlaceholder: {
      fr: "Entrez le code à 6 chiffres",
      en: "Enter the 6-digit code",
      es: "Ingrese el código de 6 dígitos",
      pt: "Insira o código de 6 dígitos",
      it: "Inserisci il codice a 6 cifre",
      de: "Geben Sie den 6-stelligen Code ein",
      nl: "Voer de 6-cijferige code in"
    },
    validating: {
      fr: "Validation...",
      en: "Validating...",
      es: "Validando...",
      pt: "Validando...",
      it: "Validazione...",
      de: "Validierung...",
      nl: "Valideren..."
    },
    validateAndContinue: {
      fr: "Valider et continuer",
      en: "Validate and continue",
      es: "Validar y continuar",
      pt: "Validar e continuar",
      it: "Convalida e continua",
      de: "Validieren und fortfahren",
      nl: "Valideren en doorgaan"
    },
    processingTransfer: {
      fr: "Traitement de votre virement...",
      en: "Processing your transfer...",
      es: "Procesando su transferencia...",
      pt: "Processando sua transferência...",
      it: "Elaborazione del trasferimento...",
      de: "Ihre Überweisung wird verarbeitet...",
      nl: "Uw overdracht wordt verwerkt..."
    },
    doNotCloseProcessing: {
      fr: "Votre opération est en cours de traitement sécurisé. Ne fermez pas cette page.",
      en: "Your transaction is being securely processed. Do not close this page.",
      es: "Su operación se está procesando de forma segura. No cierre esta página.",
      pt: "Sua operação está sendo processada com segurança. Não feche esta página.",
      it: "La tua operazione è in fase di elaborazione sicura. Non chiudere questa pagina.",
      de: "Ihre Transaktion wird sicher verarbeitet. Schließen Sie diese Seite nicht.",
      nl: "Uw transactie wordt veilig verwerkt. Sluit deze pagina niet."
    }
  },
  toast: {
    transferInProgress: {
      fr: "Transfert en cours",
      en: "Transfer in progress",
      es: "Transferencia en curso",
      pt: "Transferência em andamento",
      it: "Trasferimento in corso",
      de: "Überweisung läuft",
      nl: "Overdracht bezig"
    },
    transferAlreadyInProgress: {
      fr: "Un transfert est déjà en cours pour ce prêt. Redirection...",
      en: "A transfer is already in progress for this loan. Redirecting...",
      es: "Ya hay una transferencia en curso para este préstamo. Redirigiendo...",
      pt: "Já existe uma transferência em andamento para este empréstimo. Redirecionando...",
      it: "Un trasferimento è già in corso per questo prestito. Reindirizzamento...",
      de: "Für dieses Darlehen läuft bereits eine Überweisung. Weiterleitung...",
      nl: "Er is al een overdracht bezig voor deze lening. Omleiden..."
    },
    transferInitiated: {
      fr: "Transfert initié avec succès. Vérification en cours...",
      en: "Transfer initiated successfully. Verification in progress...",
      es: "Transferencia iniciada con éxito. Verificación en curso...",
      pt: "Transferência iniciada com sucesso. Verificação em andamento...",
      it: "Trasferimento avviato con successo. Verifica in corso...",
      de: "Überweisung erfolgreich eingeleitet. Verifizierung läuft...",
      nl: "Overdracht succesvol geïnitieerd. Verificatie bezig..."
    },
    selectExternalAccount: {
      fr: "Veuillez sélectionner un compte externe.",
      en: "Please select an external account.",
      es: "Por favor, seleccione una cuenta externa.",
      pt: "Por favor, selecione uma conta externa.",
      it: "Si prega di selezionare un conto esterno.",
      de: "Bitte wählen Sie ein externes Konto.",
      nl: "Selecteer een extern account."
    },
    noActiveLoan: {
      fr: "Aucun prêt actif disponible.",
      en: "No active loan available.",
      es: "No hay préstamo activo disponible.",
      pt: "Nenhum empréstimo ativo disponível.",
      it: "Nessun prestito attivo disponibile.",
      de: "Kein aktives Darlehen verfügbar.",
      nl: "Geen actieve lening beschikbaar."
    }
  }
};

const i18nFilePath = path.resolve(__dirname, '../client/src/lib/i18n.ts');
let content = fs.readFileSync(i18nFilePath, 'utf-8');

function addMissingKeys(lang: string) {
  // Find the transferFlow progress section
  const progressPattern = new RegExp(
    `(transferFlow:\\s*{[\\s\\S]*?progress:\\s*{[\\s\\S]*?)(circularProgressSubtitle: ['"](.*?)['"],)`,
    'g'
  );
  
  content = content.replace(progressPattern, (match, before, lastLine) => {
    let additions = '';
    Object.entries(missingTranslations.progress).forEach(([key, translations]) => {
      if (!before.includes(`${key}:`)) {
        additions += `\n        ${key}: "${translations[lang as keyof typeof translations.fr]}",`;
      }
    });
    return before + additions + '\n        ' + lastLine;
  });
  
  // Find the transferFlow toast section
  const toastPattern = new RegExp(
    `(transferFlow:\\s*{[\\s\\S]*?toast:\\s*{[\\s\\S]*?)(unblockedDesc: ['"](.*?)['"],)`,
    'g'
  );
  
  content = content.replace(toastPattern, (match, before, lastLine) => {
    let additions = '';
    Object.entries(missingTranslations.toast).forEach(([key, translations]) => {
      if (!before.includes(`${key}:`)) {
        additions += `\n        ${key}: "${translations[lang as keyof typeof translations.fr]}",`;
      }
    });
    return before + additions + '\n        ' + lastLine;
  });
}

['fr', 'en', 'es', 'pt', 'it', 'de', 'nl'].forEach(lang => {
  addMissingKeys(lang);
});

fs.writeFileSync(i18nFilePath, content, 'utf-8');
console.log('✅ Missing TransferFlow translations added successfully!');
