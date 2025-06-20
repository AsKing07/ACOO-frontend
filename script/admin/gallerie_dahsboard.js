import { showNotification } from "../showNotification.js";
import { addGallery, updateGallery, deleteGallery, getGalleries } from "../../service/api/galleryApi.js";
import { addPicture, updatePicture, deletePicture, getPictures } from "../../service/api/pictureApi.js";
import { fileToBase64} from "../../service/imageFormatter.js";

// Variables globales
let allGalleries = [];
let filteredGalleries = [];
let currentGalleryId = null;
let currentPictureId = null;
let currentImage = null;
let deleteType = null;
let deleteId = null;
let hasUploadedImage = false;
let galleryViewModal;
let currentViewedGalleryId = null;

// Éléments DOM (seront initialisés après le chargement du DOM)
let galleriesContainer, galleriesLoader, noGalleriesMessage, searchInput;
let galleryModal, pictureModal, pictureViewModal, deleteModal;
let galleryForm, pictureForm;

// Fonction pour initialiser les éléments DOM
function initDOMElements() {
    galleriesContainer = document.getElementById('galleries-container');
    galleriesLoader = document.getElementById('galleries-loader');
    noGalleriesMessage = document.getElementById('no-galleries-message');
    searchInput = document.getElementById('search-galleries');
    
    galleryModal = document.getElementById('gallery-modal');
    pictureModal = document.getElementById('picture-modal');
    pictureViewModal = document.getElementById('picture-view-modal');
    deleteModal = document.getElementById('delete-modal');
    
    galleryForm = document.getElementById('gallery-form');
    pictureForm = document.getElementById('picture-form');
    galleryViewModal = document.getElementById('gallery-view-modal');
    
    // Vérifier que tous les éléments critiques existent
    const criticalElements = [
        galleriesContainer, galleryModal, pictureModal, galleryForm, pictureForm
    ];
    
    const missingElements = criticalElements.filter(el => !el);
    if (missingElements.length > 0) {
        console.error('Éléments DOM manquants détectés');
        showNotification('Erreur d\'initialisation de l\'interface', 'error');
        return false;
    }
    
    return true;
}

// Fonction pour afficher/masquer le loader
function toggleLoader(show) {
    if (galleriesLoader) {
        galleriesLoader.style.display = show ? 'block' : 'none';
    }
}

// Fonction pour rendre un élément d'image dans la galerie
function renderGalleryImageItem(picture) {
    return `
        <div class="gallery-image-item">
        <div class="image-container" data-picture-id="${picture.id}"> 
         <img src="${picture.image}" alt="${picture.description || 'Image'}" onclick="viewPicture(${picture.id})">
            <div class="image-overlay">
                <div class="image-actions">
                    <button class="action-icon-btn edit-btn" onclick="editPictureFromGallery(${picture.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon-btn delete-btn" onclick="confirmDeletePicture(${picture.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="image-info">
            <p class="image-description">${picture.description || 'Aucune description'}</p>
            <p class="image-date">${picture.createdAt}</p>
        </div> 
           
         
        </div>
    `;
}


// Fonction pour rendre une carte de galerie
function renderGalleryCard(gallery) {
    const pictureCount = gallery.getPictureCount();
    const coverImage = gallery.getCoverImage();
    
    return `
        <div class="gallery-card" data-gallery-id="${gallery.id}">
            <div class="gallery-cover" onclick="openGallery(${gallery.id})">
                ${coverImage ? 
                    `<img src="${coverImage}" alt="${gallery.theme}">` :
                    `<div class="no-cover"><i class="fas fa-images"></i></div>`
                }
                <div class="gallery-overlay">
                    <h3 class="gallery-title">${gallery.theme}</h3>
                </div>
            </div>
            <div class="gallery-info">
                <div class="gallery-meta">
                    <div class="picture-count">
                        <i class="fas fa-image"></i>
                        <span>${pictureCount} image${pictureCount > 1 ? 's' : ''}</span>
                    </div>
                </div>
                
                ${pictureCount > 0 ? `
                    <div class="pictures-grid">
                        ${gallery.pictures.slice(0, 6).map(picture => `
                            <div class="picture-thumbnail" onclick="viewPicture(${picture.id})">
                                <img src="${picture.image}" alt="${picture.description || 'Image'}">
                            </div>
                        `).join('')}
                        ${pictureCount > 6 ? `<div class="picture-thumbnail more-indicator">+${pictureCount - 6}</div>` : ''}
                        <div class="add-picture-btn" onclick="openAddPictureModal(${gallery.id})">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                ` : `
                    <div class="pictures-grid">
                        <div class="add-picture-btn" onclick="openAddPictureModal(${gallery.id})">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                `}
                
                <div class="gallery-actions">
                    <button class="action-btn btn-add" onclick="openAddPictureModal(${gallery.id})">
                        <i class="fas fa-plus"></i>
                        Ajouter
                    </button>
                    <button class="action-btn btn-edit" onclick="editGallery(${gallery.id})">
                        <i class="fas fa-edit"></i>
                        Modifier
                    </button>
                    <button class="action-btn btn-delete" onclick="confirmDeleteGallery(${gallery.id})">
                        <i class="fas fa-trash"></i>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour rendre les galeries
function renderGalleries() {
    if (!galleriesContainer) return;
    
    if (filteredGalleries.length === 0) {
        galleriesContainer.innerHTML = '';
        if (noGalleriesMessage) {
            noGalleriesMessage.style.display = 'block';
        }
    } else {
        if (noGalleriesMessage) {
            noGalleriesMessage.style.display = 'none';
        }
        galleriesContainer.innerHTML = filteredGalleries.map(renderGalleryCard).join('');
    }
}

// Fonction pour filtrer les galeries
function filterGalleries() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredGalleries = allGalleries.filter(gallery => 
        gallery.theme.toLowerCase().includes(searchTerm)
    );
    
    renderGalleries();
}

// Fonction pour charger les galeries
async function loadGalleries() {
    try {
        toggleLoader(true);
        allGalleries = await getGalleries();
        filteredGalleries = [...allGalleries];
        renderGalleries();
    } catch (error) {
        console.error('Erreur lors du chargement des galeries:', error);
        showNotification('Erreur lors du chargement des galeries', 'error');
    } finally {
        toggleLoader(false);
    }
}

// Fonction pour ouvrir la modal d'ajout de galerie
function openAddGalleryModal() {
    currentGalleryId = null;
    const modalTitle = document.getElementById('gallery-modal-title');
    const submitBtn = document.getElementById('gallery-submit-btn');
    
    if (modalTitle) modalTitle.textContent = 'Créer une Galerie';
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Créer';
    }
    
    if (galleryForm) galleryForm.reset();
    if (galleryModal) {
        galleryModal.classList.add('show');
        galleryModal.style.display = 'flex';
    }
}

// Fonction pour éditer une galerie
window.editGallery = function(id) {
    const gallery = allGalleries.find(g => g.id == id);
    if (!gallery) return;
    
    currentGalleryId = id;
    const modalTitle = document.getElementById('gallery-modal-title');
    const submitBtn = document.getElementById('gallery-submit-btn');
    
    if (modalTitle) modalTitle.textContent = 'Modifier la Galerie';
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Modifier';
    }
    
    const galleryIdInput = document.getElementById('gallery-id');
    const galleryThemeInput = document.getElementById('gallery-theme');
    
    if (galleryIdInput) galleryIdInput.value = gallery.id;
    if (galleryThemeInput) galleryThemeInput.value = gallery.theme;
    
    if (galleryModal) {
        galleryModal.classList.add('show');
        galleryModal.style.display = 'flex';
    }
};

// Fonction pour ouvrir la modal d'ajout d'image
window.openAddPictureModal = function(galleryId) {
    currentPictureId = null;
    currentGalleryId = galleryId;
    currentImage = null;
    
    const modalTitle = document.getElementById('picture-modal-title');
    const submitBtn = document.getElementById('picture-submit-btn');
    const galleryIdInput = document.getElementById('picture-gallery-id');
    const preview = document.getElementById('picture-image-preview');
    
    if (modalTitle) modalTitle.textContent = 'Ajouter une Image';
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Ajouter';
    }
    if (galleryIdInput) galleryIdInput.value = galleryId;
    
    if (pictureForm) pictureForm.reset();
    if (preview) preview.innerHTML = '';
    
    if (pictureModal) {
        pictureModal.classList.add('show');
        pictureModal.style.display = 'flex';
    }
};

// Fonction pour ouvrir la modal de visualisation de galerie
window.openGallery = function(galleryId) {
    const gallery = allGalleries.find(g => g.id == galleryId);
    if (!gallery) return;
    
    currentViewedGalleryId = galleryId;
    
    // Mettre à jour les informations de la galerie
    const titleEl = document.getElementById('gallery-view-title');
    const themeEl = document.getElementById('gallery-view-theme');
    const countEl = document.getElementById('gallery-view-count');
    const imagesGrid = document.getElementById('gallery-images-grid');
    const noImagesMsg = document.getElementById('no-images-in-gallery');
    
    if (titleEl) titleEl.textContent = `Galerie: ${gallery.theme}`;
    if (themeEl) themeEl.textContent = gallery.theme;
    if (countEl) countEl.textContent = gallery.getPictureCount();
    
    // Configurer les boutons d'action
    const addPictureBtn = document.getElementById('add-picture-from-gallery-btn');
    const editGalleryBtn = document.getElementById('edit-gallery-from-viewer-btn');
    
    if (addPictureBtn) {
        addPictureBtn.onclick = () => {
            closeModal(galleryViewModal);
            openAddPictureModal(galleryId);
        };
    }
    
    if (editGalleryBtn) {
        editGalleryBtn.onclick = () => {
            closeModal(galleryViewModal);
            editGallery(galleryId);
        };
    }
    
    // Afficher les images
    if (gallery.pictures && gallery.pictures.length > 0) {
        if (imagesGrid) {
            imagesGrid.innerHTML = gallery.pictures.map(picture => renderGalleryImageItem(picture)).join('');
        }
        if (noImagesMsg) noImagesMsg.style.display = 'none';
    } else {
        if (imagesGrid) imagesGrid.innerHTML = '';
        if (noImagesMsg) noImagesMsg.style.display = 'block';
    }
    
    // Ouvrir la modal
    if (galleryViewModal) {
        galleryViewModal.classList.add('show');
        galleryViewModal.style.display = 'flex';
    }
};

// Fonction pour éditer une image depuis la galerie
window.editPictureFromGallery = function(pictureId) {
    closeModal(galleryViewModal);
    editPicture(pictureId);
};

// Fonction pour voir une image
window.viewPicture = function(pictureId) {
    let picture = null;
    let galleryParent= null;
    
    // Chercher l'image dans toutes les galeries
    for (const gallery of allGalleries) {
        picture = gallery.pictures.find(p => p.id == pictureId);
        if (picture)
        {
            galleryParent = gallery;
            break;
        }
    }
    
    if (!picture) return;
    
    const imageEl = document.getElementById('view-picture-image');
    const descEl = document.getElementById('view-picture-description');
    const galleryEl = document.getElementById('view-picture-gallery');
    const dateEl = document.getElementById('view-picture-date');
    const editBtn = document.getElementById('edit-picture-btn');
    const deleteBtn = document.getElementById('delete-picture-btn');
    
    if (imageEl) imageEl.src = picture.image;
    if (descEl) descEl.textContent = picture.description || 'Aucune description';
    if (galleryEl) galleryEl.textContent = galleryParent.theme;
    if (dateEl) dateEl.textContent = picture.createdAt;
    
    // Configurer les boutons d'action
    if (editBtn) editBtn.onclick = () => editPicture(pictureId);
    if (deleteBtn) deleteBtn.onclick = () => confirmDeletePicture(pictureId);
    
    if (pictureViewModal) {
        pictureViewModal.classList.add('show');
        pictureViewModal.style.display = 'flex';
    }
};

// Fonction pour éditer une image
function editPicture(pictureId) {
    let picture = null;
    let galleryId = null;
    
    // Chercher l'image dans toutes les galeries
    for (const gallery of allGalleries) {
        picture = gallery.pictures.find(p => p.id == pictureId);
        if (picture) {
            galleryId = gallery.id;
            break;
        }
    }
    
    if (!picture) return;
    
    currentPictureId = pictureId;
    currentGalleryId = galleryId;
    currentImage =  picture.image; 
    
    const modalTitle = document.getElementById('picture-modal-title');
    const submitBtn = document.getElementById('picture-submit-btn');
    const pictureIdInput = document.getElementById('picture-id');
    const galleryIdInput = document.getElementById('picture-gallery-id');
    const descInput = document.getElementById('picture-description');
    const preview = document.getElementById('picture-image-preview');
    const pictureImageInput = document.getElementById('picture-image');
    
    if (modalTitle) modalTitle.textContent = 'Modifier l\'Image';
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Modifier';
    }
    
    if (pictureIdInput) pictureIdInput.value = picture.id;
    if (galleryIdInput) galleryIdInput.value = galleryId;
    if (descInput) descInput.value = picture.description || '';
    
    // Afficher l'image existante
    if (preview) {
        preview.innerHTML = `<img src="${picture.image}" alt="Aperçu">`;
    }
    
    // Retirer le required du champ file lors de l'édition
    if (pictureImageInput) {
        pictureImageInput.removeAttribute('required');
    }
    
    // Fermer la modal de visualisation
    closeModal(pictureViewModal);
    
    if (pictureModal) {
        pictureModal.classList.add('show');
        pictureModal.style.display = 'flex';
    }
}

// Fonction pour confirmer la suppression d'une galerie
window.confirmDeleteGallery = function(id) {
    const gallery = allGalleries.find(g => g.id == id);
    if (!gallery) return;
    
    deleteType = 'gallery';
    deleteId = id;
    
    const deleteMessage = document.getElementById('delete-message');
    if (deleteMessage) {
        deleteMessage.innerHTML = `
            Voulez-vous vraiment supprimer la galerie <strong>${gallery.theme}</strong> ?
            <br><small class="text-warning">Cette action supprimera également toutes les images de la galerie.</small>
        `;
    }
    
    if (deleteModal) {
        deleteModal.classList.add('show');
        deleteModal.style.display = 'flex';
    }
};

// Fonction pour confirmer la suppression d'une image
function confirmDeletePicture(id) {
    deleteType = 'picture';
    deleteId = id;
    
    const deleteMessage = document.getElementById('delete-message');
    if (deleteMessage) {
        deleteMessage.textContent = 'Voulez-vous vraiment supprimer cette image ?';
    }
    
    if (deleteModal) {
        deleteModal.classList.add('show');
        deleteModal.style.display = 'flex';
    }
}

// Fonction pour fermer les modales
function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    hasUploadedImage = false;
}

// Fonction pour attacher tous les event listeners
function attachEventListeners() {
    // Bouton d'ajout de galerie
    const addGalleryBtn = document.getElementById('add-gallery-btn');
    if (addGalleryBtn) {
        addGalleryBtn.addEventListener('click', openAddGalleryModal);
    } else {
        console.warn('Bouton add-gallery-btn non trouvé');
    }
    
    // Recherche
    if (searchInput) {
        searchInput.addEventListener('input', filterGalleries);
    }
    
    // Gestion de l'upload d'image
    const pictureImageInput = document.getElementById('picture-image');
    if (pictureImageInput) {
        pictureImageInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            const preview = document.getElementById('picture-image-preview');
            
            if (file) {
                try {
                    currentImage = await fileToBase64(file);
                    if (preview) {
                        preview.innerHTML = `<img src="${currentImage}" alt="Aperçu">`;
                    }
                    hasUploadedImage = true;
                } catch (error) {
                    console.error('Erreur lors du chargement de l\'image:', error);
                    showNotification('Erreur lors du chargement de l\'image', 'error');
                }
            } else {
                if (preview) preview.innerHTML = '';
                currentImage = null;
            }
        });
    }
    
    // Soumission du formulaire de galerie
    if (galleryForm) {
        galleryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const galleryThemeInput = document.getElementById('gallery-theme');
            const formData = {
                theme: galleryThemeInput ? galleryThemeInput.value.trim() : ''
            };
            
            if (!formData.theme) {
                showNotification('Le thème de la galerie est requis', 'error');
                return;
            }
            
            try {
                const submitBtn = document.getElementById('gallery-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) btnText.textContent = 'Enregistrement...';
                }
                
                if (currentGalleryId) {
                    await updateGallery(currentGalleryId, formData);
                    showNotification('Galerie modifiée avec succès', 'success');
                } else {
                    await addGallery(formData);
                    showNotification('Galerie créée avec succès', 'success');
                }
                
                closeModal(galleryModal);
                await loadGalleries();
            } catch (error) {
                console.error('Erreur lors de l\'enregistrement:', error);
                showNotification(error.message, 'error');
            } finally {
                const submitBtn = document.getElementById('gallery-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = currentGalleryId ? 'Modifier' : 'Créer';
                    }
                }
            }
        });
    }
    
    // Soumission du formulaire d'image
    if (pictureForm) {
        pictureForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const descInput = document.getElementById('picture-description');
            const galleryIdInput = document.getElementById('picture-gallery-id');

                        let formData = {
                            description: descInput ? descInput.value.trim() : '',
                            gallery_id: galleryIdInput ? parseInt(galleryIdInput.value) : currentGalleryId
                        };

                        // Only add image if creating OR editing and a new image was uploaded
                        if (!currentPictureId || hasUploadedImage) {
                            formData.image = [currentImage];
                        }
            
            if (!currentImage && !currentPictureId) {
                showNotification('Veuillez sélectionner une image', 'error');
                return;
            }
            
            try {
                const submitBtn = document.getElementById('picture-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) btnText.textContent = 'Enregistrement...';
                }
                
                if (currentPictureId) {
                    await updatePicture(currentPictureId, formData);
                    showNotification('Image modifiée avec succès', 'success');
                } else {
                    await addPicture(formData);
                    showNotification('Image ajoutée avec succès', 'success');
                }
                
                closeModal(pictureModal);
                await loadGalleries();
            } catch (error) {
                console.error('Erreur lors de l\'enregistrement:', error);
                showNotification(error.message, 'error');
            } finally {
                const submitBtn = document.getElementById('picture-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = currentPictureId ? 'Modifier' : 'Ajouter';
                    }
                }
            }
        });
    }
    
    // Fermeture des modales
    const closeButtons = [
        { id: 'close-gallery-modal', modal: galleryModal },
        { id: 'close-picture-modal', modal: pictureModal },
        { id: 'close-picture-view-modal', modal: pictureViewModal },
        { id: 'close-delete-modal', modal: deleteModal },
    ];
    
    closeButtons.forEach(({ id, modal }) => {
        const btn = document.getElementById(id);
        if (btn && modal) {
            btn.addEventListener('click', () => closeModal(modal));
        }
    });
    
    const cancelButtons = [
        { id: 'cancel-gallery-btn', modal: galleryModal },
        { id: 'cancel-picture-btn', modal: pictureModal },
        { id: 'cancel-delete-btn', modal: deleteModal }
    ];
    
    cancelButtons.forEach(({ id, modal }) => {
        const btn = document.getElementById(id);
        if (btn && modal) {
            btn.addEventListener('click', () => closeModal(modal));
        }
    });
    
    // Confirmation de suppression
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async function() {
            if (!deleteType || !deleteId) return;
            
            try {
                this.disabled = true;
                this.textContent = 'Suppression...';
                
                if (deleteType === 'gallery') {
                    await deleteGallery(deleteId);
                    showNotification('Galerie supprimée avec succès', 'success');
                } else if (deleteType === 'picture') {
                    await deletePicture(deleteId);
                    showNotification('Image supprimée avec succès', 'success');
                    closeModal(pictureViewModal);
                }
                
                closeModal(deleteModal);
                await loadGalleries();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                showNotification(error.message, 'error');
            } finally {
                this.disabled = false;
                this.textContent = 'Supprimer';
                deleteType = null;
                deleteId = null;
            }
        });
    }
    
    // Fermeture des modales en cliquant à l'extérieur
    const modals = [galleryModal, pictureModal, pictureViewModal, deleteModal, galleryViewModal];
    modals.forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Fermeture des modales avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal && modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// Fonction principale d'initialisation
function initializeGalleryDashboard() {
    console.log('Initialisation du dashboard des galeries...');
    
    // Initialiser les éléments DOM
    if (!initDOMElements()) {
        console.error('Échec de l\'initialisation des éléments DOM');
        return;
    }
    
    console.log('Éléments DOM initialisés avec succès');
    
    // Attacher les event listeners
    attachEventListeners();
    console.log('Event listeners attachés');
    
    // Charger les données
    loadGalleries();
    console.log('Chargement des galeries en cours...');
}

// Fonction d'initialisation compatible avec l'ancienne structure
export function initGallery() {
    // Vérifier si le DOM est déjà chargé
    if (document.readyState === 'loading') {
        // Le DOM n'est pas encore chargé, attendre l'événement DOMContentLoaded
        document.addEventListener('DOMContentLoaded', initializeGalleryDashboard);
    } else {
        // Le DOM est déjà chargé, initialiser immédiatement
        initializeGalleryDashboard();
    }
}

// Fonction de debug pour vérifier les éléments
window.debugGalleryElements = function() {
    console.log('=== DEBUG ÉLÉMENTS GALERIE ===');
    const elements = [
        'galleries-container',
        'add-gallery-btn',
        'search-galleries',
        'gallery-modal',
        'picture-modal',
        'gallery-form',
        'picture-form'
    ];
    
    elements.forEach(id => {
        const el = document.getElementById(id);
        console.log(`${id}:`, el ? '✓ Trouvé' : '✗ Manquant');
    });
};

