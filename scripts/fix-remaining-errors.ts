import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const i18nFilePath = path.resolve(__dirname, '../client/src/lib/i18n.ts');
let content = fs.readFileSync(i18nFilePath, 'utf-8');

// 1. Remove welcomeUser lines
content = content.replace(/\s*welcomeUser: ['"].*?['"],?\n/g, '');

// 2. Rename noPendingRequests to pendingRequests (keep the value the same)
content = content.replace(/noPendingRequests:/g, 'pendingRequests:');

// 3. Add approveDialogTitle to adminLoans for FR, EN, ES
const approveDialogTitleTranslations = {
  fr: 'Approuver la demande',
  en: 'Approve request',
  es: 'Aprobar solicitud',
  pt: 'Aprovar solicitação',
  it: 'Approva richiesta',
  de: 'Antrag genehmigen',
  nl: 'Aanvraag goedkeuren'
};

Object.entries(approveDialogTitleTranslations).forEach(([lang, translation]) => {
  // Find adminLoans section for this language and add approveDialogTitle if missing
  const regex = new RegExp(
    `(${lang}:\\s*{[\\s\\S]*?adminLoans:\\s*{[\\s\\S]*?deleteDialogDesc: ["'](.*?)["'],)`,
    'g'
  );
  
  content = content.replace(regex, (match, before) => {
    if (!before.includes('approveDialogTitle:')) {
      return before + `\n        approveDialogTitle: "${translation}",`;
    }
    return match;
  });
});

fs.writeFileSync(i18nFilePath, content, 'utf-8');
console.log('✅ Remaining errors fixed successfully!');
