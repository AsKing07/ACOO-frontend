import { getGalleries } from "../../service/api/galleryApi.js";
import { getPictures } from '../../service/api/pictureApi.js';
import { showNotification } from "../showNotification.js";

class ModernGallery {
    constructor() {
        this.allGalleries = [];
        this.allPictures = [];
        this.filteredPictures = [];
        this.currentPage = 1;
        this.imagesPerPage = 6;
        this.activeGallery = 'all';
        this.searchTerm = '';
        this.currentLightboxIndex = 0;
        
        this.elements = {};
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        try {
            this.initElements();
            this.attachEventListeners();
            await this.loadData();
            this.setupLightbox();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de la galerie:', error);
            this.showError('Erreur lors du chargement de la galerie');
        }
    }

    initElements() {
        this.elements = {
            // Navigation et contrôles
            searchInput: document.getElementById('searchInput'),
            clearSearch: document.getElementById('clearSearch'),
            galleryFiltersContainer: document.getElementById('gallery-filters-container'),
            
            // Affichage
            galleryImages: document.getElementById('galleryImages'),
            pagination: document.getElementById('pagination'),
            pageIndicator: document.getElementById('pageIndicator'),
            
            // Statistiques
            totalImages: document.getElementById('total-images'),
            totalGalleries: document.getElementById('total-galleries'),
            filteredCount: document.getElementById('filtered-count'),
            
            // Navigation
            navPrev: document.getElementById('nav-prev'),
            navNext: document.getElementById('nav-next'),
            
            // Loaders et messages
            galleryLoader: document.getElementById('gallery-loader'),
            noImagesMessage: document.getElementById('no-images-message'),
            
            // Image en vedette
            featuredImage: document.getElementById('featured-image'),
            featuredDescription: document.getElementById('featured-description'),
            featuredLoader: document.getElementById('featured-loader'),
            
            // Lightbox
            lightbox: document.getElementById('lightbox'),
            lightboxImage: document.getElementById('lightbox-image'),
            lightboxTitle: document.getElementById('lightbox-title'),
            lightboxDescription: document.getElementById('lightbox-description'),
            lightboxGallery: document.getElementById('lightbox-gallery'),
            lightboxDate: document.getElementById('lightbox-date'),
            lightboxCounter: document.getElementById('lightbox-counter'),
            lightboxClose: document.getElementById('lightbox-close'),
            lightboxPrev: document.getElementById('lightbox-prev'),
            lightboxNext: document.getElementById('lightbox-next'),
            lightboxLoader: document.getElementById('lightbox-loader')
        };
    }

    async loadData() {
        try {
            this.showLoader(true);
            
            // Chargement parallèle des galeries et images
            const [galleries, pictures] = await Promise.all([
                getGalleries(),
                getPictures()
            ]);
            
            this.allGalleries = galleries;
            this.allPictures = pictures;
            this.filteredPictures = [...pictures];
            
            this.updateStats();
            this.generateGalleryFilters();
            this.setFeaturedImage();
            this.displayImages();
            
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.showError('Impossible de charger les images');
        } finally {
            this.showLoader(false);
        }
    }

    generateGalleryFilters() {
        if (!this.elements.galleryFiltersContainer) return;

        this.elements.galleryFiltersContainer.innerHTML = '';
        
        this.allGalleries.forEach(gallery => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.dataset.gallery = gallery.id;
            button.innerHTML = `
                <i class="fas fa-folder"></i>
                <span>${gallery.theme}</span>
            `;
            
            button.addEventListener('click', () => this.filterByGallery(gallery.id));
            this.elements.galleryFiltersContainer.appendChild(button);
        });
    }

    setFeaturedImage() {
        if (this.allPictures.length === 0) return;

        // Prendre l'image la plus récente
        const featuredPicture = this.allPictures.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        if (this.elements.featuredImage && featuredPicture) {
            this.elements.featuredLoader.style.display = 'block';
            
            const img = new Image();
            img.onload = () => {
                this.elements.featuredImage.src = featuredPicture.image;
                this.elements.featuredImage.alt = featuredPicture.description || 'Image en vedette';
                this.elements.featuredLoader.style.display = 'none';
            };
            img.onerror = () => {
                this.elements.featuredLoader.style.display = 'none';
            };
            img.src = featuredPicture.image;

            if (this.elements.featuredDescription) {
                this.elements.featuredDescription.textContent = 
                    featuredPicture.description || 'Découvrez les moments forts de notre club d\'aviron';
            }
        }
    }

    displayImages() {
        if (!this.elements.galleryImages) return;

        const totalPages = Math.ceil(this.filteredPictures.length / this.imagesPerPage);
        const start = (this.currentPage - 1) * this.imagesPerPage;
        const end = start + this.imagesPerPage;
        const currentImages = this.filteredPictures.slice(start, end);

        // Afficher message si aucune image
        if (this.filteredPictures.length === 0) {
            this.elements.galleryImages.innerHTML = '';
            this.elements.noImagesMessage.style.display = 'block';
            this.updateNavigation(0);
            this.updatePagination(0, 1);
            return;
        }

        this.elements.noImagesMessage.style.display = 'none';

        // Générer le HTML des images
        this.elements.galleryImages.innerHTML = currentImages.map((picture, index) => 
            this.createImageCard(picture, start + index)
        ).join('');

        // Mettre à jour la navigation et pagination
        this.updateNavigation(totalPages);
        this.updatePagination(totalPages, this.currentPage);
        this.updateStats();

        // Ajouter les event listeners pour les images
        this.attachImageListeners();
    }

    createImageCard(picture, globalIndex) {
        const galleryName = picture.gallery?.theme || 'Galerie inconnue';
        const description = picture.description || 'Aucune description';
        const formattedDate = picture.createdAt;

        return `
            <div class="image-card" data-index="${globalIndex}">
                <div class="image-container">
                    <img src="${picture.image}" alt="${description}" class="gallery-img" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-info">
                            <h4 class="image-title">${description}</h4>
                            <p class="image-gallery">${galleryName}</p>
                        </div>
                    </div>
                </div>
                <div class="gallery-badge">${galleryName}</div>
            </div>
        `;
    }

    attachImageListeners() {
        const imageCards = this.elements.galleryImages.querySelectorAll('.image-card');
        imageCards.forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.openLightbox(index);
            });
        });
    }

    filterByGallery(galleryId) {
        this.activeGallery = galleryId;
        this.currentPage = 1;
        
        // Mettre à jour l'état actif des boutons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (galleryId === 'all') {
            document.querySelector('.filter-btn[data-gallery="all"]').classList.add('active');
        } else {
            document.querySelector(`.filter-btn[data-gallery="${galleryId}"]`)?.classList.add('active');
        }
        
        this.applyFilters();
    }

    searchImages(term) {
        this.searchTerm = term.toLowerCase();
        this.currentPage = 1;
        
        // Gérer l'affichage du bouton clear
        if (this.elements.clearSearch) {
            this.elements.clearSearch.style.display = term ? 'block' : 'none';
        }
        
        this.applyFilters();
    }

    applyFilters() {
        this.filteredPictures = this.allPictures.filter(picture => {
            // Filtre par galerie
            const matchesGallery = this.activeGallery === 'all' || 
                                 picture.gallery?.id == this.activeGallery;
            
            // Filtre par recherche
            const matchesSearch = !this.searchTerm || 
                                (picture.description?.toLowerCase().includes(this.searchTerm)) ||
                                (picture.gallery?.theme?.toLowerCase().includes(this.searchTerm));
            
            return matchesGallery && matchesSearch;
        });
        
        this.displayImages();
    }

    updateStats() {
        if (this.elements.totalImages) {
            this.elements.totalImages.textContent = this.allPictures.length;
        }
        if (this.elements.totalGalleries) {
            this.elements.totalGalleries.textContent = this.allGalleries.length;
        }
        if (this.elements.filteredCount) {
            this.elements.filteredCount.textContent = this.filteredPictures.length;
        }
    }

    updateNavigation(totalPages) {
        if (this.elements.navPrev) {
            this.elements.navPrev.disabled = this.currentPage <= 1;
        }
        if (this.elements.navNext) {
            this.elements.navNext.disabled = this.currentPage >= totalPages;
        }
    }

    updatePagination(totalPages, currentPage) {
        if (!this.elements.pagination || !this.elements.pageIndicator) return;

        // Pagination
        this.elements.pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = i === currentPage ? 'active' : '';
            btn.addEventListener('click', () => this.goToPage(i));
            this.elements.pagination.appendChild(btn);
        }

        // Indicateur de page
        this.elements.pageIndicator.textContent = totalPages > 0 ? 
            `Page ${currentPage} sur ${totalPages}` : 'Aucune image';
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayImages();
        
        // Scroll vers le haut de la galerie
        this.elements.galleryImages.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    // ===== LIGHTBOX =====
    setupLightbox() {
        if (!this.elements.lightbox) return;

        // Fermeture
        this.elements.lightboxClose?.addEventListener('click', () => this.closeLightbox());
        this.elements.lightbox.addEventListener('click', (e) => {
            if (e.target === this.elements.lightbox) {
                this.closeLightbox();
            }
        });

        // Navigation
        this.elements.lightboxPrev?.addEventListener('click', () => this.previousImage());
        this.elements.lightboxNext?.addEventListener('click', () => this.nextImage());

        // Clavier
        document.addEventListener('keydown', (e) => {
            if (this.elements.lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openLightbox(index) {
        this.currentLightboxIndex = index;
        this.showLightboxImage();
        this.elements.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.elements.lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    showLightboxImage() {
        const picture = this.filteredPictures[this.currentLightboxIndex];
        if (!picture) return;

        // Afficher le loader
        this.elements.lightboxLoader.style.display = 'block';
        this.elements.lightboxImage.style.display = 'none';

        // Charger l'image
        const img = new Image();
        img.onload = () => {
            this.elements.lightboxImage.src = picture.image;
            this.elements.lightboxImage.alt = picture.description || 'Image';
            this.elements.lightboxLoader.style.display = 'none';
            this.elements.lightboxImage.style.display = 'block';
        };
        img.src = picture.image;

        // Mettre à jour les informations
        if (this.elements.lightboxTitle) {
            this.elements.lightboxTitle.textContent = picture.description || 'Sans titre';
        }
        if (this.elements.lightboxDescription) {
            this.elements.lightboxDescription.textContent = picture.description || 'Aucune description disponible';
        }
        if (this.elements.lightboxGallery) {
            this.elements.lightboxGallery.textContent = picture.gallery?.theme || 'Galerie inconnue';
        }
        if (this.elements.lightboxDate) {
            this.elements.lightboxDate.textContent = picture.createdAt;
        }
        if (this.elements.lightboxCounter) {
            this.elements.lightboxCounter.textContent = 
                `${this.currentLightboxIndex + 1} / ${this.filteredPictures.length}`;
        }
    }

    previousImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
            this.showLightboxImage();
        }
    }

    nextImage() {
        if (this.currentLightboxIndex < this.filteredPictures.length - 1) {
            this.currentLightboxIndex++;
            this.showLightboxImage();
        }
    }

    // ===== EVENT LISTENERS =====
    attachEventListeners() {
        // Recherche
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.searchImages(e.target.value);
            });
        }

        // Clear search
        if (this.elements.clearSearch) {
            this.elements.clearSearch.addEventListener('click', () => {
                this.elements.searchInput.value = '';
                this.searchImages('');
            });
        }

        // Navigation
        if (this.elements.navPrev) {
            this.elements.navPrev.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.goToPage(this.currentPage - 1);
                }
            });
        }

        if (this.elements.navNext) {
            this.elements.navNext.addEventListener('click', () => {
                const totalPages = Math.ceil(this.filteredPictures.length / this.imagesPerPage);
                if (this.currentPage < totalPages) {
                    this.goToPage(this.currentPage + 1);
                }
            });
        }

        // Filtre "Toutes"
        const allFilter = document.querySelector('.filter-btn[data-gallery="all"]');
        if (allFilter) {
            allFilter.addEventListener('click', () => this.filterByGallery('all'));
        }
    }

    // ===== UTILITAIRES =====

    showLoader(show) {
        if (this.elements.galleryLoader) {
            this.elements.galleryLoader.style.display = show ? 'flex' : 'none';
        }
    }

    showError(message) {
        console.error(message);
        if (this.elements.noImagesMessage) {
            this.elements.noImagesMessage.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de chargement</h3>
                <p>${message}</p>
            `;
            this.elements.noImagesMessage.style.display = 'block';
        }
        showNotification(message, 'error');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new ModernGallery();
});
