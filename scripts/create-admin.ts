import { neon } from '@neondatabase/serverless';
import * as bcrypt from 'bcrypt';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    // Vérifier que DATABASE_URL est défini
    if (!process.env.DATABASE_URL) {
      console.error('❌ Erreur: DATABASE_URL n\'est pas défini dans les variables d\'environnement');
      process.exit(1);
    }

    console.log('🔧 Création d\'un compte administrateur ALTUS\n');

    // Collecter les informations
    const fullName = await question('Nom complet de l\'admin: ');
    const email = await question('Email de l\'admin: ');
    const username = await question('Nom d\'utilisateur (laisser vide pour générer automatiquement): ');
    const password = await question('Mot de passe (minimum 12 caractères): ');

    // Validation du mot de passe
    if (password.length < 12) {
      console.error('❌ Le mot de passe doit contenir au moins 12 caractères');
      rl.close();
      process.exit(1);
    }

    // Générer un username UUID si non fourni
    const finalUsername = username.trim() || `admin_${Date.now()}`;

    // Hacher le mot de passe
    console.log('\n🔐 Hachage du mot de passe...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connexion à la base de données
    console.log('📡 Connexion à la base de données...');
    const sql = neon(process.env.DATABASE_URL);

    // Créer l'admin directement via SQL
    console.log('👤 Création du compte administrateur...');
    await sql`
      INSERT INTO users (
        username, password, email, email_verified, full_name, 
        account_type, role, status, kyc_status, preferred_language
      ) VALUES (
        ${finalUsername}, ${hashedPassword}, ${email}, true, ${fullName},
        'business', 'admin', 'active', 'approved', 'fr'
      )
    `;

    console.log('\n✅ Compte administrateur créé avec succès!');
    console.log('\n📋 Détails du compte:');
    console.log(`   Nom d'utilisateur: ${finalUsername}`);
    console.log(`   Email: ${email}`);
    console.log(`   Nom complet: ${fullName}`);
    console.log(`   Rôle: admin`);
    console.log(`   Statut: actif`);
    console.log('\n🔑 Vous pouvez maintenant vous connecter avec ces identifiants.');

    rl.close();
  } catch (error: any) {
    console.error('\n❌ Erreur lors de la création de l\'admin:', error.message);
    if (error.code === '23505') {
      console.error('   → L\'email ou le nom d\'utilisateur existe déjà.');
    }
    rl.close();
    process.exit(1);
  }
}

createAdmin();
