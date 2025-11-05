# Guide de Déploiement sur Render

Ce projet est maintenant correctement configuré pour être déployé sur Render.

## ✅ Configuration Vérifiée

### Package.json
Le fichier `package.json` contient tous les scripts nécessaires :

```json
{
  "scripts": {
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "vite build",
    "build:backend": "esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

### Dépendances
- ✅ `esbuild` est dans `devDependencies` (ligne 110 du package.json)
- ✅ `vite` est dans `devDependencies` (ligne 115 du package.json)
- ✅ Toutes les dépendances de build sont installées

### Structure de Build
- **Frontend** : compilé dans `dist/public/` par Vite
- **Backend** : compilé dans `dist/index.js` par esbuild
- **Point d'entrée** : `server/index.ts`

## 📋 Instructions de Déploiement sur Render

### 1. Créer un nouveau Web Service sur Render

1. Connectez votre dépôt GitHub à Render
2. Créez un nouveau **Web Service**

### 2. Configuration du Service

Dans les paramètres de votre Web Service Render :

**Build & Deploy :**
- **Build Command** : `npm install && npm run build`
- **Start Command** : `npm start`
- **Branch** : `main` (ou votre branche principale)

**Environment :**
- **Node Version** : 20.x (recommandé)
- **Region** : Choisissez la région la plus proche de vos utilisateurs

### 3. Variables d'Environnement Requises

Configurez ces variables dans l'onglet "Environment" de Render :

```
NODE_ENV=production
DATABASE_URL=<votre-url-postgresql>
SESSION_SECRET=<générer-une-clé-secrète-forte>
PORT=5000
```

**Variables Optionnelles (si utilisées) :**
```
SENDGRID_API_KEY=<votre-clé-sendgrid>
VITE_APP_NAME=Altus Group
```

### 4. Configuration de la Base de Données

**Option 1 : PostgreSQL géré par Render**
1. Créez une nouvelle base de données PostgreSQL sur Render
2. Copiez la `DATABASE_URL` dans les variables d'environnement
3. Les migrations seront automatiquement appliquées au démarrage

**Option 2 : Base de données externe (Neon, Supabase, etc.)**
1. Utilisez la `DATABASE_URL` de votre fournisseur
2. Assurez-vous que la connexion SSL est activée

### 5. Migrations de Base de Données

Après le premier déploiement, exécutez les migrations :

```bash
npm run db:push
```

Vous pouvez le faire via le shell Render ou en ajoutant un script de post-déploiement.

### 6. Santé du Service

Le service expose un endpoint de santé :
```
GET /health
```

Configurez Render pour utiliser ce endpoint dans les "Health Checks".

## 🔧 Dépannage

### Problème : "Cannot find module"
**Solution** : Assurez-vous que la commande `npm install` s'exécute avant le build

### Problème : "Database connection failed"
**Solution** : Vérifiez que `DATABASE_URL` est correctement configurée avec SSL activé

### Problème : "Port already in use"
**Solution** : Ne modifiez pas le port, Render gère automatiquement le PORT via variable d'environnement

### Problème : "Session store error"
**Solution** : Assurez-vous que `SESSION_SECRET` est défini dans les variables d'environnement

## 📦 Structure des Fichiers de Build

Après un build réussi :
```
dist/
├── index.js              # Serveur backend compilé
└── public/              # Frontend React compilé
    ├── index.html
    ├── assets/
    │   ├── index-*.js
    │   └── index-*.css
    └── ...
```

## 🚀 Commandes Utiles

**Build local** :
```bash
npm run build
```

**Test de production local** :
```bash
npm run build
npm start
```

**Vérifier la santé** :
```bash
curl http://localhost:5000/health
```

## 📝 Notes Importantes

1. **Session Store** : Le projet utilise PostgreSQL pour stocker les sessions. Assurez-vous que `DATABASE_URL` pointe vers une base PostgreSQL.

2. **Sécurité** : Générez une clé `SESSION_SECRET` forte et unique pour la production.

3. **CORS & Helmet** : Le projet utilise Helmet pour la sécurité. Certaines configurations peuvent nécessiter des ajustements selon vos besoins.

4. **Uploads** : Les fichiers uploadés sont stockés localement dans `uploads/`. Pour la production, envisagez un stockage cloud (S3, Cloudinary, etc.).

## ✅ Checklist Pré-Déploiement

- [ ] Variables d'environnement configurées sur Render
- [ ] Base de données PostgreSQL créée et URL configurée
- [ ] SESSION_SECRET généré et ajouté
- [ ] Build testé localement (`npm run build`)
- [ ] Migrations de base de données prêtes (`npm run db:push`)
- [ ] Health check configuré sur Render

---

**Statut du Projet** : ✅ Prêt pour le déploiement sur Render

Tous les scripts et dépendances sont correctement configurés. Le projet a été testé et build avec succès.
