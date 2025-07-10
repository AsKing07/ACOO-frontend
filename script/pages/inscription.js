/**
 * Gestionnaire de la page inscription
 * Charge et affiche dynamiquement les équipes du club
 */

import { getTeams } from '../../service/api/teamApi.js';
import { cookiesChecker } from "../cookies.js";


class InscriptionManager {
    constructor() {
        this.teamsContainer = document.getElementById('teams-container');
        this.teamsLoader = document.getElementById('teams-loader');
        
        this.init();
    }

    async init() {
        console.log('Initialisation de la page inscription');
        await this.loadTeams();
           // Initialisation du gestionnaire de cookies
            cookiesChecker();
    }

    /**
     * Charge les équipes depuis l'API
     */
    async loadTeams() {
        try {
            console.log('Chargement des équipes...');
            
            const result = await getTeams();
            console.log('Équipes chargées:', result);

            if (result.length > 0) {
                this.displayTeams(result);
            } else {
                this.displayNoTeams();
            }

        } catch (error) {
            console.error('Erreur lors du chargement des équipes:', error);
            this.displayError();
        } finally {
            this.hideLoader();
        }
    }

    /**
     * Affiche les équipes
     */
    displayTeams(teams) {
        const teamsHTML = teams.map(team => this.createTeamCard(team)).join('');
        
        this.teamsContainer.innerHTML = `
            <div class="teams-grid__content">
                ${teamsHTML}
            </div>
        `;
    }

    /**
     * Crée une carte d'équipe
     */
    createTeamCard(team) {
        // Utilisation des propriétés correctes de l'objet Teams
        const imageUrl = team.image;
        const description = team.role || 'Aucune description disponible.';
        const teamName = team.name || 'Équipe sans nom';
        const sportName = team.sport?.name || 'Sport non spécifié';

        return `
            <div class="team-card">
                <div class="team-card__image">
                ${imageUrl ? `<img src="${imageUrl}" alt="${teamName}" loading="lazy">` : 
            
            '<i class="fas fa-users team-placeholder" aria-hidden="true"></i>'
            }
                  
                </div>
                <div class="team-card__content">
                    <h3 class="team-card__title">${teamName}</h3>
                    <div class="team-card__info">
                        <div class="team-card__info-item">
<i class="fa-solid fa-person-drowning"></i>
                            <span>Sport: ${sportName}</span>
                        </div>
                        
                    </div>
                    <p class="team-card__description">${description}</p>
                    ${team.images && team.images.length > 1 ? `
                        <div class="team-card__gallery">
                            <i class="fas fa-images"></i>
                            <span>${team.images.length} photo(s) disponible(s)</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Affiche un message quand aucune équipe n'est trouvée
     */
    displayNoTeams() {
        this.teamsContainer.innerHTML = `
            <div class="no-teams">
                <div class="no-teams__icon">
                    <i class="fas fa-users-slash"></i>
                </div>
                <h3 class="no-teams__title">Aucune équipe disponible</h3>
                <p class="no-teams__text">
                    Les informations sur nos équipes seront bientôt disponibles. 
                    En attendant, n'hésitez pas à nous contacter pour plus d'informations.
                </p>
                <a href="contact.php" class="btn-secondary">
                    <i class="fas fa-envelope"></i>
                    Nous contacter
                </a>
            </div>
        `;
    }

    /**
     * Affiche un message d'erreur
     */
    displayError() {
        this.teamsContainer.innerHTML = `
            <div class="error-teams">
                <div class="error-teams__icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="error-teams__title">Erreur de chargement</h3>
                <p class="error-teams__text">
                    Impossible de charger les informations sur nos équipes. 
                    Veuillez réessayer ou nous contacter si le problème persiste.
                </p>
                <div class="error-teams__actions">
                    <button class="btn-primary" onclick="location.reload()">
                        <i class="fas fa-redo"></i>
                        Réessayer
                    </button>
                    <a href="contact.php" class="btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Nous contacter
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Cache le loader
     */
    hideLoader() {
        if (this.teamsLoader) {
            this.teamsLoader.style.display = 'none';
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new InscriptionManager();
    console.log('InscriptionManager initialisé');
});