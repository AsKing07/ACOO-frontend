/**
 * Gestionnaire de la page règlement intérieur
 * Charge et affiche les informations sur la vie du club
 */

import { getIntroductionByTitle } from '../../service/api/introductionApi.js';
import { cookiesChecker } from "../cookies.js";


class ReglementManager {
    constructor() {
        this.clubLifeLoader = document.getElementById('club-life-loader');
        this.clubLifeContent = document.getElementById('club-life-content');
        this.clubLifeError = document.getElementById('club-life-error');
        
        this.init();
    }

    async init() {
        console.log('Initialisation de la page règlement intérieur');
        await this.loadClubLifeInfo();
                 // Initialisation du gestionnaire de cookies
            cookiesChecker();
    }

    /**
     * Charge les informations sur la vie du club
     */
    async loadClubLifeInfo() {
        try {
            console.log('Chargement des informations sur la vie du club...');
            
            const introductions = await getIntroductionByTitle('Vie du club');
            console.log('Informations chargées:', introductions);

            if (introductions && introductions.length > 0) {
                this.displayClubLifeInfo(introductions[0]);
            } else {
                this.displayNoInfo();
            }

        } catch (error) {
            console.error('Erreur lors du chargement des informations:', error);
            this.displayError();
        } finally {
            this.hideLoader();
        }
    }

    /**
     * Affiche les informations sur la vie du club
     */
    displayClubLifeInfo(introduction) {
        const imageHtml = introduction.image && introduction.image.length > 0 
            ? `<div class="club-life__image">
                 <img src="${introduction.image[0]}" alt="Vie du club" loading="lazy">
               </div>` 
            : '';

        this.clubLifeContent.innerHTML = `
            <div class="club-life">
                ${imageHtml}
                <div class="club-life__content">
                    <h2 class="section-title">${introduction.title}</h2>
                    <div class="club-life__description">
                        ${this.formatDescription(introduction.description)}
                    </div>
                </div>
            </div>
        `;

        this.clubLifeContent.style.display = 'block';
    }

    /**
     * Formate la description en paragraphes
     */
    formatDescription(description) {
        if (!description) return '<p>Aucune description disponible.</p>';
        
        // Divise la description en paragraphes basés sur les sauts de ligne doubles
        const paragraphs = description.split('\n\n').filter(p => p.trim().length > 0);
        
        if (paragraphs.length === 0) {
            return `<p>${description}</p>`;
        }
        
        return paragraphs.map(paragraph => `<p>${paragraph.trim()}</p>`).join('');
    }

    /**
     * Affiche un message quand aucune information n'est trouvée
     */
    displayNoInfo() {
        this.clubLifeContent.innerHTML = `
            <div class="no-info">
                <div class="no-info__icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <h3 class="no-info__title">Informations non disponibles</h3>
                <p class="no-info__text">
                    Les informations sur la vie du club seront bientôt disponibles. 
                    En attendant, vous pouvez télécharger notre règlement intérieur ci-dessous.
                </p>
            </div>
        `;

        this.clubLifeContent.style.display = 'block';
    }

    /**
     * Affiche un message d'erreur
     */
    displayError() {
        this.clubLifeError.style.display = 'block';
    }

    /**
     * Cache le loader
     */
    hideLoader() {
        if (this.clubLifeLoader) {
            this.clubLifeLoader.style.display = 'none';
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ReglementManager();
});