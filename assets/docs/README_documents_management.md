# Gestion des Documents - Fonctionnalités d'Upload/Download

## Description
Ces fonctionnalités permettent aux administrateurs de gérer les documents officiels du club via l'interface d'administration.

## Documents gérés
1. **Règlement Intérieur** - Règles de fonctionnement du club
2. **Guide d'Inscription** - Informations pour les nouveaux membres
3. **Conditions Générales d'Utilisation (CGU)** - Conditions d'usage du site et des services

## Fonctionnalités
- **Téléchargement** : Permet de télécharger la version actuelle de chaque document
- **Upload** : Permet d'uploader une nouvelle version de chaque document

## Fichiers concernés

### Frontend
- `pages/admin/club.php` : Interface d'administration avec les cartes d'upload/download
- `script/admin/club_dahsboard.js` : Logique JavaScript pour gérer les actions
- `scss/components/_edit_wording_card.scss` : Styles pour les cartes d'édition

### Backend
- `service/api/upload_reglement.php` : API pour l'upload du règlement intérieur
- `service/api/upload_guide.php` : API pour l'upload du guide d'inscription
- `service/api/upload_cgu.php` : API pour l'upload des CGU

### Stockage
- `assets/docs/reglement_club.pdf` : Fichier du règlement intérieur
- `assets/docs/guide_inscription.pdf` : Fichier du guide d'inscription
- `assets/docs/CGU.pdf` : Fichier des conditions générales d'utilisation

## Utilisation

### Pour l'administrateur
1. Accéder à la section "Club" du dashboard d'administration
2. Localiser la carte du document à gérer
3. Cliquer sur "Télécharger" pour obtenir la version actuelle
4. Cliquer sur "Uploader" pour remplacer par une nouvelle version

### Pour les utilisateurs
- **Règlement Intérieur** : Accessible via la page club
- **Guide d'Inscription** : Accessible via la page d'inscription
- **CGU** : Accessible via le footer du site (lien "Conditions d'utilisation")

## Configuration
- Les fichiers uploadés remplacent automatiquement les versions existantes
- Extensions acceptées : `.pdf`, `.doc`, `.docx`
- Stockage centralisé : `/assets/docs/`

## Sécurité
- Validation du type de fichier pour chaque upload
- Gestion des erreurs d'upload avec messages explicites
- Notifications utilisateur pour les succès/échecs
- Noms de fichiers standardisés pour éviter les conflits

## Structure des APIs

### upload_reglement.php
- Paramètre : `reglement` (fichier)
- Sortie : `reglement_club.{ext}`

### upload_guide.php
- Paramètre : `guide` (fichier)
- Sortie : `guide_inscription.{ext}`

### upload_cgu.php
- Paramètre : `cgu` (fichier)
- Sortie : `CGU.{ext}`
