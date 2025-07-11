# Guide d'Inscription - Fonctionnalité d'Upload/Download

## Description
Cette fonctionnalité permet aux administrateurs de gérer le guide d'inscription du club via l'interface d'administration.

## Fonctionnalités
- **Téléchargement** : Permet de télécharger le guide d'inscription actuel
- **Upload** : Permet d'uploader une nouvelle version du guide d'inscription

## Fichiers concernés

### Frontend
- `pages/admin/club.php` : Interface d'administration avec les boutons d'upload/download
- `script/admin/club_dahsboard.js` : Logique JavaScript pour gérer les actions
- `scss/components/_edit_wording_card.scss` : Styles pour la carte d'édition

### Backend
- `service/api/upload_guide.php` : API pour l'upload du guide d'inscription
- `assets/docs/guide_inscription.pdf` : Fichier du guide d'inscription

## Utilisation

### Pour l'administrateur
1. Accéder à la section "Club" du dashboard d'administration
2. Localiser la carte "Guide d'Inscription"
3. Cliquer sur "Télécharger" pour obtenir le guide actuel
4. Cliquer sur "Uploader" pour remplacer le guide par une nouvelle version

### Pour les utilisateurs
- Le guide d'inscription est accessible via la page d'inscription (`pages/inscription.php`)
- Bouton de téléchargement disponible pour les visiteurs

## Configuration
- Le fichier uploadé remplace automatiquement `guide_inscription.pdf`
- Extensions acceptées : `.pdf`, `.doc`, `.docx`
- Stockage : `/assets/docs/guide_inscription.pdf`

## Sécurité
- Validation du type de fichier
- Gestion des erreurs d'upload
- Notifications utilisateur pour les succès/échecs
