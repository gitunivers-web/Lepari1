import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const i18nFilePath = path.resolve(__dirname, '../client/src/lib/i18n.ts');
let content = fs.readFileSync(i18nFilePath, 'utf-8');

// Remove serverError lines (doesn't exist in type)
content = content.replace(/\s*serverError: ['"].*?['"],?\n/g, '');

// Remove duplicate pendingRequests (the second one that was noPendingRequests)
// We need to find and remove the lines like: pendingRequests: 'Aucune demande en attente',
// Keep only: pendingRequests: 'Demandes en attente',
const lines = content.split('\n');
const result: string[] = [];
const seenKeys: Set<string> = new Set();
let currentSection = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Track current dashboard section
  if (line.match(/^\s+dashboard:\s*{/)) {
    seenKeys.clear();
    currentSection = 'dashboard';
  } else if (currentSection === 'dashboard' && line.match(/^\s+},$/)) {
    currentSection = '';
    seenKeys.clear();
  }
  
  // Check for duplicate keys in dashboard section
  if (currentSection === 'dashboard') {
    const keyMatch = line.match(/^\s+(\w+):\s*/);
    if (keyMatch) {
      const key = keyMatch[1];
      if (seenKeys.has(key)) {
        // Skip this duplicate line
        console.log(`Removing duplicate key in dashboard: ${key}`);
        continue;
      }
      seenKeys.add(key);
    }
  }
  
  result.push(line);
}

fs.writeFileSync(i18nFilePath, result.join('\n'), 'utf-8');
console.log('✅ Duplicates and serverError removed successfully!');
