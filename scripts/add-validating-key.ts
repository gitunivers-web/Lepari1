import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validatingTranslations = {
  en: "Validating...",
  es: "Validando...",
  pt: "Validando...",
  it: "Validazione...",
  de: "Validierung...",
  nl: "Valideren..."
};

const i18nFilePath = path.resolve(__dirname, '../client/src/lib/i18n.ts');
let content = fs.readFileSync(i18nFilePath, 'utf-8');

Object.entries(validatingTranslations).forEach(([lang, translation]) => {
  // Find the progress section for this language and add validating if missing
  const regex = new RegExp(
    `(${lang}:\\s*{[\\s\\S]*?transferFlow:\\s*{[\\s\\S]*?progress:\\s*{[\\s\\S]*?enterCodePlaceholder: ["'](.*?)["'],)`,
    'g'
  );
  
  content = content.replace(regex, (match, before) => {
    if (!before.includes('validating:')) {
      return before + `\n        validating: "${translation}",`;
    }
    return match;
  });
});

fs.writeFileSync(i18nFilePath, content, 'utf-8');
console.log('✅ Validating keys added successfully!');
