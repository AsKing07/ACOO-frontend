import { showNotification } from "../showNotification.js";
import { getPartenaires, addPartenaire, updatePartenaire, deletePartenaire } from "../../service/api/partenairesApi.js";
import { fileToBase64 } from "../../service/imageFormatter.js";
// Variables globales
let allPartners = [];
let filteredPartners = [];
let currentPartnerId = null;
let currentImage = null;

// Éléments DOM - seront initialisés après le chargement du DOM
let partnersTableBody;
let partnersLoader;
let partnersCount;
let noPartnersMessage;
let searchInput;
let filterSelect;
let partnerModal;
let partnerViewModal;
let deletePartnerModal;
let partnerForm;
let partnerModalTitle;
let partnerSubmitBtn;



// Fonction pour afficher/masquer le loader
function toggleLoader(show) {
    if (partnersLoader) {
        partnersLoader.style.display = show ? 'block' : 'none';
    }
}

// Fonction pour mettre à jour le compteur
function updatePartnersCount() {
    if (partnersCount) {
        partnersCount.textContent = `${filteredPartners.length} partenaire(s)`;
    }
}

// Fonction pour rendre une ligne de tableau
function renderPartnerRow(partner) {
  
    const partnerType = partner.getPartnerType();
    
    return `
        <tr data-partner-id="${partner.id}">
            <td>
                <div class="event-table__name">
                    ${
                        partner.image
                        ? `<img src="${partner.image}" alt="${partner.name}" class="event-table__avatar">`
                        : `<span class=" event-table__avatar--icon"><i class="fas fa-user-tie"></i></span>`
                    }
                    <span>${partner.name}</span>
                </div>
            </td>
            <td title="${partner.description || ''}">
                ${partner.description ? (partner.description.length > 50 ? 
                    partner.description.substring(0, 50) + '...' : partner.description) : 'Aucune description'}
            </td>
            <td>
                <span class="event-table__type">${partnerType}</span>
            </td>
            <td>${partner.url && partner.url.trim() !== '' ? partner.url : '-'}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view-btn" onclick="viewPartner(${partner.id})" title="Voir">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editPartner(${partner.id})" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="confirmDeletePartner(${partner.id})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// Fonction pour rendre le tableau
function renderPartnersTable() {
    if (!partnersTableBody) return;
    
    if (filteredPartners.length === 0) {
        partnersTableBody.innerHTML = '';
        if (noPartnersMessage) noPartnersMessage.style.display = 'block';
    } else {
        if (noPartnersMessage) noPartnersMessage.style.display = 'none';
        partnersTableBody.innerHTML = filteredPartners.map(renderPartnerRow).join('');
    }
    updatePartnersCount();
}

// Fonction pour filtrer les partenaires
function filterPartners() {
    if (!searchInput || !filterSelect) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilter = filterSelect.value;
    
    filteredPartners = allPartners.filter(partner => {
        const matchesSearch = partner.name.toLowerCase().includes(searchTerm) ||
                            (partner.description && partner.description.toLowerCase().includes(searchTerm));
        
        const matchesType = !typeFilter || 
                          (typeFilter === 'sponsor' && partner.sponsor) ||
                          (typeFilter === 'partner' && !partner.sponsor);
        
        return matchesSearch && matchesType;
    });
    
    renderPartnersTable();
}

// Fonction pour charger les partenaires
async function loadPartners() {
    try {
        toggleLoader(true);
        allPartners = await getPartenaires();
        filteredPartners = [...allPartners];
        renderPartnersTable();
    } catch (error) {
        console.error('Erreur lors du chargement des partenaires:', error);
        showNotification('Erreur lors du chargement des partenaires', 'error');
    } finally {
        toggleLoader(false);
    }
}

// Fonction pour ouvrir la modal d'ajout
function openAddPartnerModal() {
    console.log('Ouverture de la modal d\'ajout de partenaire');
    
    if (!partnerModal) {
        console.error('Modal partenaire introuvable !');
        return;
    }
    
    currentPartnerId = null;
    currentImage = null;
    
    if (partnerModalTitle) partnerModalTitle.textContent = 'Ajouter un Partenaire';
    if (partnerSubmitBtn) partnerSubmitBtn.textContent = 'Ajouter';
    if (partnerForm) partnerForm.reset();
    
    const preview = document.getElementById('partner-image-preview');
    if (preview) preview.innerHTML = '';
    
    partnerModal.classList.add('show');
    partnerModal.style.display = 'flex';
}

// Fonction pour éditer un partenaire
window.editPartner = function(id) {
    const partner = allPartners.find(p => p.id == id);
    if (!partner || !partnerModal) return;
    
    currentPartnerId = id;
    currentImage = partner.image;
    
    if (partnerModalTitle) partnerModalTitle.textContent = 'Modifier le Partenaire';
    if (partnerSubmitBtn) partnerSubmitBtn.textContent = 'Modifier';
    
    // Remplir le formulaire
    const elements = {
        'partner-id': partner.id,
        'partner-name': partner.name,
        'partner-description': partner.description || '',
        'partner-url': partner.url || ''
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.value = value;
    });
    
    const sponsorCheckbox = document.getElementById('partner-sponsor');
    if (sponsorCheckbox) sponsorCheckbox.checked = partner.isSponsor;
    
    // Afficher l'image existante
    const preview = document.getElementById('partner-image-preview');
    if (preview && partner.image) {
        preview.innerHTML = `<img src="${partner.image}" alt="Aperçu">`;
    }
    
    partnerModal.classList.add('show');
    partnerModal.style.display = 'flex';
};

// Fonction pour voir un partenaire
window.viewPartner = function(id) {
    const partner = allPartners.find(p => p.id == id);
    if (!partner || !partnerViewModal) return;
    
    const elements = {
        'view-partner-name': partner.name,
        'view-partner-type': partner.getPartnerType(),
        'view-partner-description': partner.description || 'Aucune description disponible',
        'view-partner-year': partner.getCreationYear()
    };
    
    Object.entries(elements).forEach(([id, content]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = content;
    });
    
    const logoImg = document.getElementById('view-partner-image');
    if (logoImg) {
        logoImg.src = partner.image || 'https://via.placeholder.com/80x80?text=Logo';
        logoImg.alt = partner.name;
    }
    
    const websiteLink = document.getElementById('view-partner-url');
    if (websiteLink) {
        if (partner.url) {
            websiteLink.href = partner.url;
            websiteLink.style.display = 'inline-flex';
        } else {
            websiteLink.style.display = 'none';
        }
    }
    
    partnerViewModal.classList.add('show');
    partnerViewModal.style.display = 'flex';
};

// Fonction pour confirmer la suppression
window.confirmDeletePartner = function(id) {
    const partner = allPartners.find(p => p.id == id);
    if (!partner || !deletePartnerModal) return;
    
    currentPartnerId = id;
    const deleteNameElement = document.getElementById('delete-partner-name');
    if (deleteNameElement) deleteNameElement.textContent = partner.name;
    
    deletePartnerModal.classList.add('show');
    deletePartnerModal.style.display = 'flex';
};

// Fonction pour fermer les modales
function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Fonction d'initialisation des éléments DOM
function initializeElements() {
    // Éléments DOM
    partnersTableBody = document.getElementById('partners-table-body');
    partnersLoader = document.getElementById('partners-loader');
    partnersCount = document.getElementById('partners-count');
    noPartnersMessage = document.getElementById('no-partners-message');
    searchInput = document.getElementById('search-partners');
    filterSelect = document.getElementById('filter-type');
    
    // Modales
    partnerModal = document.getElementById('partner-modal');
    partnerViewModal = document.getElementById('partner-view-modal');
    deletePartnerModal = document.getElementById('delete-partner-modal');
    
    // Formulaire
    partnerForm = document.getElementById('partner-form');
    partnerModalTitle = document.getElementById('partner-modal-title');
    partnerSubmitBtn = document.getElementById('partner-submit-btn');
    
    // Vérification des éléments critiques
    const criticalElements = {
        'partners-table-body': partnersTableBody,
        'add-partner-btn': document.getElementById('add-partner-btn'),
        'partner-modal': partnerModal
    };
    
    Object.entries(criticalElements).forEach(([name, element]) => {
        if (!element) {
            console.error(`Élément critique manquant: ${name}`);
        }
    });
}

// Fonction d'initialisation des événements
function initializeEvents() {
    // Bouton d'ajout
    const addBtn = document.getElementById('add-partner-btn');
    if (addBtn) {
        console.log('Bouton ajouter trouvé, ajout de l\'event listener');
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clic détecté sur le bouton ajouter');
            openAddPartnerModal();
        });
    } else {
        console.error('Bouton add-partner-btn introuvable !');
    }
    
    // Recherche et filtres
    if (searchInput) searchInput.addEventListener('input', filterPartners);
    if (filterSelect) filterSelect.addEventListener('change', filterPartners);
    
    // Gestion de l'upload d'image
    const imageInput = document.getElementById('partner-image');
    if (imageInput) {
        imageInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            const preview = document.getElementById('partner-image-preview');
            
            if (file) {
                try {
                    currentImage = await fileToBase64(file);
                    if (preview) preview.innerHTML = `<img src="${currentImage}" alt="Aperçu">`;
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
    
    // Soumission du formulaire
    if (partnerForm) {
        partnerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('partner-name')?.value.trim() || '',
                description: document.getElementById('partner-description')?.value.trim() || '',
                url: document.getElementById('partner-url')?.value.trim() || '',
                sponsor: document.getElementById('partner-sponsor')?.checked || false,
                image: [currentImage]
            };
            
            if (!formData.name) {
                showNotification('Le nom du partenaire est requis', 'error');
                return;
            }
            
            try {
                if (partnerSubmitBtn) {
                    partnerSubmitBtn.disabled = true;
                    partnerSubmitBtn.textContent = 'Enregistrement...';
                }
                
                if (currentPartnerId) {
                    await updatePartenaire(currentPartnerId, formData);
                    showNotification('Partenaire modifié avec succès', 'success');
                } else {
                    await addPartenaire(formData);
                    showNotification('Partenaire ajouté avec succès', 'success');
                }
                
                closeModal(partnerModal);
                await loadPartners();
            } catch (error) {
                console.error('Erreur lors de l\'enregistrement:', error);
                showNotification(error.message, 'error');
            } finally {
                if (partnerSubmitBtn) {
                    partnerSubmitBtn.disabled = false;
                    partnerSubmitBtn.textContent = currentPartnerId ? 'Modifier' : 'Ajouter';
                }
            }
        });
    }
    
    // Événements de fermeture des modales
    const closeEvents = [
        { id: 'close-partner-modal', modal: partnerModal },
        { id: 'close-partner-view-modal', modal: partnerViewModal },
        { id: 'close-delete-partner-modal', modal: deletePartnerModal },
        { id: 'cancel-partner-btn', modal: partnerModal },
        { id: 'cancel-delete-partner-btn', modal: deletePartnerModal }
    ];
    
    closeEvents.forEach(({ id, modal }) => {
        const element = document.getElementById(id);
        if (element && modal) {
            element.addEventListener('click', () => closeModal(modal));
        }
    });
    
    // Confirmation de suppression
    const confirmDeleteBtn = document.getElementById('confirm-delete-partner-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async function() {
            if (!currentPartnerId) return;
            
            try {
                this.disabled = true;
                this.textContent = 'Suppression...';
                
                await deletePartenaire(currentPartnerId);
                showNotification('Partenaire supprimé avec succès', 'success');
                closeModal(deletePartnerModal);
                await loadPartners();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                showNotification(error.message, 'error');
            } finally {
                this.disabled = false;
                this.textContent = 'Supprimer';
            }
        });
    }
    
    // Fermeture des modales en cliquant à l'extérieur
    [partnerModal, partnerViewModal, deletePartnerModal].forEach(modal => {
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
            [partnerModal, partnerViewModal, deletePartnerModal].forEach(modal => {
                if (modal && modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// Fonction principale d'initialisation
export function initPartenairesDashboard() {
    console.log('Initialisation du dashboard partenaires');
    
    // Vérifier si le DOM est déjà chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM chargé, initialisation des éléments');
            initializeElements();
            initializeEvents();
            loadPartners();
        });
    } else {
        // DOM déjà chargé
        console.log('DOM déjà chargé, initialisation immédiate');
        initializeElements();
        initializeEvents();
        loadPartners();
    }
}

// Initialisation automatique
// initPartenairesDashboard();