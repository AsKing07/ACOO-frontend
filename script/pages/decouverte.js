/**
 * Gestionnaire de la page découverte
 * Charge et affiche le guide de l'avironnier
 */

import { getIntroductionByTitle } from '../../service/api/introductionApi.js';
import { cookiesChecker } from "../cookies.js";


class DecouverteManager {
    constructor() {
        this.guideLoader = document.getElementById('guide-loader');
        this.guideContent = document.getElementById('guide-content');
        this.guideError = document.getElementById('guide-error');
        
        this.init();
    }

    async init() {
        console.log('Initialisation de la page découverte');
        await this.loadGuideAvironnier();
           // Initialisation du gestionnaire de cookies
            cookiesChecker();
    }

    /**
     * Charge le guide de l'avironnier
     */
    async loadGuideAvironnier() {
        try {
            console.log('Chargement du guide de l\'avironnier...');
            
            const introductions = await getIntroductionByTitle('Guide de l\'avironnier');
            console.log('Guide chargé:', introductions);

            if (introductions && introductions.length > 0) {
                this.displayGuide(introductions[0]);
            } else {
                this.displayNoGuide();
            }

        } catch (error) {
            console.error('Erreur lors du chargement du guide:', error);
            this.displayError();
        } finally {
            this.hideLoader();
        }
    }

    /**
     * Affiche le guide de l'avironnier
     */
    displayGuide(introduction) {
        const imageHtml = introduction.image && introduction.image.length > 0 
            ? `<div class="guide__image">
                 <img src="${introduction.image[0]}" alt="Guide de l'avironnier" loading="lazy">
               </div>` 
            : '';

        this.guideContent.innerHTML = `
            <div class="guide-avironnier">
                <h2 class="section-title">${introduction.title}</h2>
                ${imageHtml}
                <div class="guide__content">
                    <div class="guide__description">
                        ${this.formatDescription(introduction.description)}
                    </div>
                </div>
            </div>
        `;

        this.guideContent.style.display = 'block';
    }

    /**
     * Formate la description en paragraphes
     */
    formatDescription(description) {
        if (!description) return '<p>Aucune information disponible dans le guide.</p>';
        
        // Divise la description en paragraphes basés sur les sauts de ligne doubles
        const paragraphs = description.split('\n\n').filter(p => p.trim().length > 0);
        
        if (paragraphs.length === 0) {
            return `<p>${description}</p>`;
        }
        
        return paragraphs.map(paragraph => `<p>${paragraph.trim()}</p>`).join('');
    }

    /**
     * Affiche un message quand aucun guide n'est trouvé
     */
    displayNoGuide() {
        this.guideContent.innerHTML = `
            <div class="no-guide">
                <h2 class="section-title">Guide de l'Avironnier</h2>
                <div class="no-guide__message">
                    <div class="no-guide__icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h3 class="no-guide__title">Guide en préparation</h3>
                    <p class="no-guide__text">
                        Notre guide de l'avironnier est en cours de préparation. 
                        Il contiendra bientôt tous les conseils et informations 
                        pour bien débuter et progresser en aviron.
                    </p>
                    <p class="no-guide__text">
                        En attendant, n'hésitez pas à nous contacter pour toute question 
                        ou à participer à nos stages de découverte !
                    </p>
                </div>
            </div>
        `;

        this.guideContent.style.display = 'block';
    }

    /**
     * Affiche un message d'erreur
     */
    displayError() {
        this.guideError.style.display = 'block';
    }

    /**
     * Cache le loader
     */
    hideLoader() {
        if (this.guideLoader) {
            this.guideLoader.style.display = 'none';
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new DecouverteManager();
});