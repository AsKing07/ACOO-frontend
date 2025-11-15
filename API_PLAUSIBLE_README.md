# API Plausible Intégrée - Documentation

## 📋 Description

Cette API remplace le serveur Node.js externe pour les requêtes vers l'API Plausible. Elle est intégrée directement dans le projet PHP afin de ne pas dépendre d'un autre service comme s'était le cas.

## 🚀 Installation et Configuration

### 1. Fichiers :

- `service/api/plausible/plausible.php` - L'API principale
- `service/plausible-config.php` - Configuration
- service/api/plausible/`.htaccess ` - Configuration serveur
- `service/api/analyticsApi.js` - service pour utiliser l' API

### 2. Configuration :

**Étape 1 :** Modifiez le fichier `service/plausible-config.php` :

```php
// Votre clé API Plausible
define('PLAUSIBLE_API_KEY', 'VOTRE_CLE_API_ICI');

// Votre site ID
define('PLAUSIBLE_SITE_ID', 'votre-domaine.com');
```

    Les variables d'environnement dans plausible-config.php doivent être les même que celles dans config.js

**Étape 2 :** Ajoutez le script Plausible dans l'en-tête de vos pages :

```html
<!-- À ajouter dans le <head> de TOUTES vos pages -->
<script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.js"></script>
```

⚠️ **Important** : Le `data-domain` doit correspondre exactement à votre `PLAUSIBLE_SITE_ID`

## 📊 Intégration du Script Plausible dans vos Pages

### Script requis :

Pour que Plausible puisse collecter les données de votre site, vous devez ajouter ce script dans **toutes** vos pages :

```html
<script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.js"></script>
```

### Où l'ajouter :

**Dans vos fichiers PHP :**

```php
<!DOCTYPE html>
<html>
<head>
    <title>Mon Site ACOO</title>
    <meta charset="UTF-8">
    <!-- AJOUTER ICI -->
    <script defer data-domain="club-acoo.fr" src="https://plausible.io/js/script.js"></script>
</head>
<body>
    <!-- Contenu de votre page -->
</body>
</html>
```

**Ou dans un template commun :**

```php
<!-- Dans templates/head.php par exemple -->
<script defer data-domain="<?php echo PLAUSIBLE_SITE_ID; ?>" src="https://plausible.io/js/script.js"></script>
```

### Vérification :

1. Le script doit être présent sur **toutes** les pages
2. Le `data-domain` doit être identique à `PLAUSIBLE_SITE_ID`
3. Testez en allant sur votre site et vérifiez dans Plausible que les visiteurs sont comptés

## 📡 Endpoints Disponibles

### GET `/api/plausible.php?endpoint=realtime`

- **Paramètres** : `site_id`
- **Description** : Visiteurs en temps réel

### GET `/api/plausible.php?endpoint=aggregate`

- **Paramètres** : `site_id`, `period`, `metrics`
- **Description** : Métriques agrégées

### GET `/api/plausible.php?endpoint=timeseries`

- **Paramètres** : `site_id`, `period`, `metrics`, `dimensions`
- **Description** : Données temporelles

### GET `/api/plausible.php?endpoint=breakdown`

- **Paramètres** : `site_id`, `dimensions`, `period`, `metrics`
- **Description** : Répartition par propriété

### POST `/api/plausible.php?endpoint=test-connection`

- **Body** : `{"api_key": "...", "site_id": "..."}`
- **Description** : Test de connexion

## 🔧 Migration depuis le serveur Node.js

### Ancien (serveur externe) :

```javascript
const ANALYTICS_API_URL = "https://acoo-plausible-analytics-back.onrender.com/api/plausible";
```

### Nouveau (API intégrée) :

```javascript
const PHP_API_URL = window.location.origin + "/service/api/plausible/plausible.php";
```

## 🛠️ Feuille de Route - Modification des Variables

### Pour changer l'environnement (dev/prod) :

1. **Modifier la configuration** :
   Éditez `service/plausible-config.php` :

   ```php
   define('PLAUSIBLE_API_KEY', 'NOUVELLE_CLE_API');
   define('PLAUSIBLE_SITE_ID', 'nouveau-domaine.com');
   ```
2. **Variables d'environnement disponibles** :

   - `PLAUSIBLE_API_KEY` : Votre clé API Plausible
   - `PLAUSIBLE_SITE_ID` : L'ID de votre site
   - `API_TIMEOUT` : Timeout des requêtes (défaut: 30s)
   - `ENABLE_CACHE` : Activer le cache (défaut: false)
3. **Pour un environnement plus avancé** :
   Créez un fichier `.env` et modifiez la configuration :

   ```php
   // Utiliser des variables d'environnement
   define('PLAUSIBLE_API_KEY', getenv('PLAUSIBLE_API_KEY') ?: 'valeur_par_defaut');
   define('PLAUSIBLE_SITE_ID', getenv('PLAUSIBLE_SITE_ID') ?: 'site_par_defaut');
   ```

### Étapes de migration complète :

1. ✅ **Fichiers créés** - API PHP intégrée
2. ✅ **Configuration** - Variables dans plausible-config.php
3. ✅ **Script Plausible** - Ajouté dans les pages HTML
4. ✅ **Code modifié** - analyticsApi.js utilise la nouvelle API
5. 🔄 **Test** - Vérifiez que tout fonctionne
6. 🗑️ **Nettoyage** - Supprimez les références à l'ancien serveur

### Variables à modifier dans config.js (si nécessaire) :

```javascript
// Ancien - À SUPPRIMER ou commenter
// export const ANALYTICS_API_URL = "https://acoo-plausible-analytics-back.onrender.com/api/plausible";

// Modifier les variables dans config.js pour qu'elles correspondent à celles dans plausible-config.js
```

## ⚠️ Notes Importantes

1. **Sécurité** : La clé API est stockée côté serveur (plus sécurisé)
2. **Performance** : Pas de serveur externe, requêtes plus rapides
3. **Maintenance** : Plus simple, tout dans le même projet
4. **Cache** : Possibilité d'ajouter du cache côté serveur

## 🧪 Test de l'API

Pour tester votre nouvelle API :

```javascript
// Dans la console du navigateur
import { testConnection } from './service/api/analyticsApi.js';
testConnection().then(console.log);
```

## 🚨 Dépannage

### Erreur 500 :

- Vérifiez que `plausible-config.php` existe
- Vérifiez les permissions du dossier `api/`

### Erreur CORS :

- Vérifiez le fichier `.htaccess`
- Les headers CORS sont configurés dans `plausible.php`

### Données vides :

- Vérifiez votre clé API dans `plausible-config.php`
- Testez avec l'endpoint `test-connection`
