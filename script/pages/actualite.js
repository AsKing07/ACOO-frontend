import { getNews } from "../../service/api/newsApi.js";

/**
 * Gestionnaire de la page actualités
 * Charge et affiche les actualités depuis la base de données
 */
class ActualitesManager {
    constructor() {
        this.allNews = [];
        this.filteredNews = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.filters = {
            date: 'all',
            sort: 'recent'
        };
        
        this.elements = {};
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initialisation de la page actualités...');
            this.initElements();
            this.attachEventListeners();
            await this.loadNews();
            console.log(this.allNews[0])
            console.log('✅ Page actualités initialisée avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.showError();
        }
    }

    initElements() {
        this.elements = {
            // Filtres
            dateFilter: document.getElementById('date-filter'),
            sortFilter: document.getElementById('sort-filter'),
            resetFiltersBtn: document.getElementById('reset-filters'),
            clearFiltersBtn: document.getElementById('clear-filters-btn'),
            
            // Affichage
            actualitesGrid: document.getElementById('actualites-grid'),
            resultsCount: document.getElementById('results-count'),
            
            // États
            loader: document.getElementById('actualites-loader'),
            errorMessage: document.getElementById('error-message'),
            noResults: document.getElementById('no-results'),
            retryBtn: document.getElementById('retry-btn'),
            
            // Pagination
            pagination: document.getElementById('pagination'),
            prevPageBtn: document.getElementById('prev-page'),
            nextPageBtn: document.getElementById('next-page'),
            pageInfo: document.getElementById('page-info'),
            
            // Modal
            newsModal: document.getElementById('news-modal'),
            modalTitle: document.getElementById('modal-title'),
            modalBody: document.getElementById('modal-body'),
            closeModalBtn: document.getElementById('close-modal')
        };
    }

    async loadNews() {
        try {
            this.showLoader(true);
            this.hideError();
            this.hideNoResults();
            
            console.log('📥 Chargement des actualités...');
            const news = await getNews();

            // Correction du format des dates pour chaque actualité
            this.allNews = news.map(item => ({
                ...item,
                createdAt: item.createdAt && item.createdAt.date ? new Date(item.createdAt.date + 'Z') : null,
                updatedAt: item.updatedAt && item.updatedAt.date ? new Date(item.updatedAt.date + 'Z') : null
            }));
            this.applyFilters();
            
            console.log(`✅ ${news.length} actualité(s) chargée(s)`);
            
        } catch (error) {
            console.error('❌ Erreur lors du chargement:', error);
            this.showError();
        } finally {
            this.showLoader(false);
        }
    }

    applyFilters() {
        let filtered = [...this.allNews];
        
        // Filtre par date
        if (this.filters.date !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (this.filters.date) {
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case 'year':
                    filterDate.setFullYear(now.getFullYear() - 1);
                    break;
            }
            
            filtered = filtered.filter(news => {
                const newsDate = new Date(news.createdAt);
                return newsDate >= filterDate;
            });
        }
        
        // Tri
        switch (this.filters.sort) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        
        this.filteredNews = filtered;
        this.currentPage = 1;
        this.updateDisplay();
    }

    updateDisplay() {
        this.updateResultsCount();
        
        if (this.filteredNews.length === 0) {
            this.showNoResults();
            this.hidePagination();
            this.clearGrid();
        } else {
            this.hideNoResults();
            this.renderNews();
            this.updatePagination();
        }
    }

    renderNews() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageNews = this.filteredNews.slice(startIndex, endIndex);
        
        if (!this.elements.actualitesGrid) return;
        
        this.elements.actualitesGrid.innerHTML = pageNews.map(news => 
            this.createNewsCard(news)
        ).join('');
        
        // Attacher les event listeners aux nouvelles cartes
        this.attachCardListeners();
    }

    createNewsCard(news) {
        const createdDate = new Date(news.createdAt);
        const formattedDate = createdDate.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const excerpt = this.createExcerpt(news.content, 150);
        const imageUrl = news.image || '/assets/images/default-news.png';
        
        return `
            <article class="news-card" data-news-id="${news.id}">
                <div class="news-card__image-container">
                    <img src="${imageUrl}" alt="${news.title}" class="news-card__image" 
                         onerror="this.src='/assets/images/default-news.png'">
                    <div class="news-card__date-badge">
                        <span class="date-day">${createdDate.getDate()}</span>
                        <span class="date-month">${createdDate.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                    </div>
                </div>
                
                <div class="news-card__content">
                    <header class="news-card__header">
                        <h3 class="news-card__title">${this.escapeHtml(news.title)}</h3>
                        <time class="news-card__date" datetime="${news.createdAt}">
                            <i class="fas fa-calendar-alt"></i>
                            ${formattedDate}
                        </time>
                    </header>
                    
                    <div class="news-card__excerpt">
                        <p>${excerpt}</p>
                    </div>
                    
                    <footer class="news-card__footer">
                        <button class="news-card__btn-read-more" data-news-id="${news.id}">
                            <span>Lire la suite</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </footer>
                </div>
            </article>
        `;
    }

    createExcerpt(content, maxLength) {
        if (!content) return 'Aucun contenu disponible.';
        
        const textContent = content.replace(/<[^>]*>/g, ''); // Supprimer les balises HTML
        if (textContent.length <= maxLength) return textContent;
        
        return textContent.substring(0, maxLength).trim() + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    attachCardListeners() {
        // Event listeners pour les boutons "Lire la suite"
        document.querySelectorAll('.news-card__btn-read-more').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newsId = parseInt(e.currentTarget.dataset.newsId);
                this.showNewsModal(newsId);
            });
        });
        
        // Event listeners pour les cartes (clic sur l'image ou le titre)
        document.querySelectorAll('.news-card__image, .news-card__title').forEach(element => {
            element.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.news-card');
                const newsId = parseInt(card.dataset.newsId);
                this.showNewsModal(newsId);
            });
        });
    }

    showNewsModal(newsId) {
        const news = this.allNews.find(n => n.id === newsId);
        if (!news) return;
        
        this.elements.modalTitle.textContent = news.title;
        
        const createdDate = new Date(news.createdAt);
        const formattedDate = createdDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        this.elements.modalBody.innerHTML = `
            <div class="modal-news-content">
                ${news.image ? `
                    <div class="modal-news-image">
                        <img src="${news.image}" alt="${news.title}" 
                             onerror="this.style.display='none'">
                    </div>
                ` : ''}
                
                <div class="modal-news-meta">
                    <time class="modal-news-date">
                        <i class="fas fa-calendar-alt"></i>
                        Publié le ${formattedDate}
                    </time>
                </div>
                
                <div class="modal-news-text">
                    ${news.content || 'Aucun contenu disponible.'}
                </div>
            </div>
        `;
        
        this.elements.newsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.elements.newsModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    updateResultsCount() {
        if (this.elements.resultsCount) {
            const count = this.filteredNews.length;
            this.elements.resultsCount.textContent = 
                `${count} actualité${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
        }
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredNews.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            this.hidePagination();
            return;
        }
        
        this.showPagination();
        
        // Mettre à jour les boutons
        this.elements.prevPageBtn.disabled = this.currentPage <= 1;
        this.elements.nextPageBtn.disabled = this.currentPage >= totalPages;
        
        // Mettre à jour l'info de page
        this.elements.pageInfo.textContent = `Page ${this.currentPage} sur ${totalPages}`;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredNews.length / this.itemsPerPage);
        
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderNews();
        this.updatePagination();
        
        // Faire défiler vers le haut de la grille
        this.elements.actualitesGrid.scrollIntoView({ behavior: 'smooth' });
    }

    resetFilters() {
        this.filters = { date: 'all', sort: 'recent' };
        this.elements.dateFilter.value = 'all';
        this.elements.sortFilter.value = 'recent';
        this.applyFilters();
    }

    // Méthodes d'affichage
    showLoader(show) {
        if (this.elements.loader) {
            this.elements.loader.style.display = show ? 'flex' : 'none';
        }
    }

    showError() {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.style.display = 'block';
        }
    }

    hideError() {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.style.display = 'none';
        }
    }

    showNoResults() {
        if (this.elements.noResults) {
            this.elements.noResults.style.display = 'flex';
        }
    }

    hideNoResults() {
        if (this.elements.noResults) {
            this.elements.noResults.style.display = 'none';
        }
    }

    showPagination() {
        if (this.elements.pagination) {
            this.elements.pagination.style.display = 'flex';
        }
    }

    hidePagination() {
        if (this.elements.pagination) {
            this.elements.pagination.style.display = 'none';
        }
    }

    clearGrid() {
        if (this.elements.actualitesGrid) {
            this.elements.actualitesGrid.innerHTML = '';
        }
    }

    attachEventListeners() {
        // Filtres
        this.elements.dateFilter?.addEventListener('change', (e) => {
            this.filters.date = e.target.value;
            this.applyFilters();
        });

        this.elements.sortFilter?.addEventListener('change', (e) => {
            this.filters.sort = e.target.value;
            this.applyFilters();
        });

        this.elements.resetFiltersBtn?.addEventListener('click', () => {
            this.resetFilters();
        });

        this.elements.clearFiltersBtn?.addEventListener('click', () => {
            this.resetFilters();
        });

        // Pagination
        this.elements.prevPageBtn?.addEventListener('click', () => {
            this.goToPage(this.currentPage - 1);
        });

        this.elements.nextPageBtn?.addEventListener('click', () => {
            this.goToPage(this.currentPage + 1);
        });

        // Bouton retry
        this.elements.retryBtn?.addEventListener('click', () => {
            this.loadNews();
        });

        // Modal
        this.elements.closeModalBtn?.addEventListener('click', () => {
            this.closeModal();
        });

        this.elements.newsModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.newsModal) {
                this.closeModal();
            }
        });

        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation de la page actualités...');
    new ActualitesManager();
});
