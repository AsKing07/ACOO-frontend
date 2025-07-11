# Page Règlement Intérieur - Documentation

## Description
La page `reglement_interieur.php` permet aux utilisateurs de consulter les informations sur la vie du club et de télécharger le règlement intérieur.

## Fonctionnalités

### 1. Affichage de la vie du club
- Charge dynamiquement les informations via l'API Introduction
- Recherche l'introduction avec le titre "Vie du club"
- Affiche le texte et l'image associée (si disponible)
- Gestion des états de chargement et d'erreur

### 2. Téléchargement du règlement intérieur
- Bouton de téléchargement direct vers le fichier PDF
- Lien vers `/assets/docs/reglement_club.pdf`
- Attribution automatique du nom de fichier lors du téléchargement

## Fichiers concernés

### Frontend
- `pages/reglement_interieur.php` : Page principale avec structure HTML et SEO
- `script/pages/reglement.js` : Logique JavaScript pour charger les données
- `scss/pages/_reglement.scss` : Styles spécifiques à la page

### API
- `service/api/introductionApi.js` : API pour charger les introductions
- `service/models/Introduction.js` : Modèle de données Introduction
- Utilise la fonction `getIntroductionByTitle('Vie du club')`

### Document
- `assets/docs/reglement_club.pdf` : Fichier du règlement intérieur

## Structure de la page

### Hero Section
- Titre principal : "Vie du Club"
- Sous-titre : "Règlement Intérieur"
- Design avec dégradé et image de fond

### Section Vie du Club
- Chargement dynamique via JavaScript
- Affichage du titre, description et image
- États : loader, contenu, erreur, pas d'info

### Section Règlement Intérieur
- Description du document
- Bouton de téléchargement avec icône
- Design centré et accessible

## Utilisation de l'API

### Fonction utilisée
```javascript
getIntroductionByTitle('Vie du club')
```

### Structure des données attendues
```javascript
{
  id: number,
  title: string,
  image: string[], // Tableau d'images (utilise la première)
  description: string
}
```

### Gestion des erreurs
- Pas de données trouvées : Affiche un message informatif
- Erreur API : Affiche un message d'erreur avec icône
- Loader pendant le chargement

## SEO et Métadonnées
- Title optimisé pour le SEO
- Meta description pertinente
- Open Graph et Twitter Card
- Données structurées JSON-LD
- Canonical URL
- Sitemap inclus

## Navigation
- Accessible via le menu "RAMER AU CLUB" → "Vie du club et Règlement intérieur"
- Lien présent dans la navigation desktop et mobile

## Responsive Design
- Adaptation mobile complète
- Breakpoints : 768px et 480px
- Typography et espacement adaptatifs
- Images responsives

## États d'affichage

### 1. Loader
- Spinner animé
- Message "Chargement des informations..."

### 2. Contenu normal
- Image (si disponible)
- Titre et description formatée
- Section de téléchargement

### 3. Pas d'informations
- Icône informative
- Message explicatif
- Redirection vers le téléchargement

### 4. Erreur
- Icône d'erreur
- Message d'erreur
- Suggestion de réessayer plus tard
