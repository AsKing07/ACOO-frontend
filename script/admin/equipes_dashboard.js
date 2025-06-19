import { showNotification } from "../showNotification.js";
import { getTeams, addTeam, updateTeam, deleteTeam } from "../../service/api/teamApi.js";
import { getSports } from "../../service/api/sportApi.js";
import { fileToBase64 } from "../../service/imageFormatter.js";

// Variables globales
let teams = [];
let sports = [];
let filteredTeams = [];
let currentTeam = null;
let currentEditingTeamId = null;
let uploadedImagesBase64 = [];

// Éléments DOM
let teamsLoader, teamsList, noTeamsMessage;
let teamModal, viewTeamModal, deleteTeamModal;
let teamForm, sportFilter, searchInput;
let addTeamBtn, submitTeamBtn, cancelTeamBtn;
let teamSportSelect, teamNameInput, teamRoleInput, teamImagesInput, teamImagesPreview;


// Fonction utilitaire pour formater la taille des fichiers
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Fonction pour afficher/masquer les loaders
function toggleLoader(element, show) {
    if (element) {
        element.style.display = show ? 'flex' : 'none';
    }
}

// Fonction pour afficher/masquer les boutons de chargement
function toggleButtonLoader(button, loading) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        if (btnText) btnText.style.opacity = '0';
        if (btnLoader) btnLoader.style.display = 'block';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (btnText) btnText.style.opacity = '1';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

// Fonction pour initialiser les éléments DOM
function initializeDOM() {
    // Loaders et containers
    teamsLoader = document.getElementById('teams-loader');
    teamsList = document.getElementById('teams-list');
    noTeamsMessage = document.getElementById('no-teams-message');
    
    // Modales
    teamModal = document.getElementById('team-modal');
    viewTeamModal = document.getElementById('view-team-modal');
    deleteTeamModal = document.getElementById('delete-team-modal');
    
    // Formulaire et filtres
    teamForm = document.getElementById('team-form');
    sportFilter = document.getElementById('sport-filter');
    searchInput = document.getElementById('search-teams');
    
    // Boutons
    addTeamBtn = document.getElementById('add-team-btn');
    submitTeamBtn = document.getElementById('submit-team-btn');
    cancelTeamBtn = document.getElementById('cancel-team-btn');
    
    // Champs de formulaire
    teamSportSelect = document.getElementById('team-sport');
    teamNameInput = document.getElementById('team-name');
    teamRoleInput = document.getElementById('team-role');
    teamImagesInput = document.getElementById('team-images');
    teamImagesPreview = document.getElementById('team-images-preview');
}

// Fonction pour charger les sports
async function loadSports() {
    try {
        sports = await getSports();
        populateSportSelects();
    } catch (error) {
        console.error('Erreur lors du chargement des sports:', error);
        showNotification('Erreur lors du chargement des sports', 'error');
    }
}

// Fonction pour peupler les selects de sports
function populateSportSelects() {
    // Vider les selects
    sportFilter.innerHTML = '<option value="">Tous les sports</option>';
    teamSportSelect.innerHTML = '<option value="">Sélectionner un sport</option>';
    
    // Ajouter les options
    sports.forEach(sport => {
        const option1 = document.createElement('option');
        option1.value = sport.id;
        option1.textContent = sport.name;
        sportFilter.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = sport.id;
        option2.textContent = sport.name;
        teamSportSelect.appendChild(option2);
    });
}

// Fonction pour charger les équipes
async function loadTeams() {
    toggleLoader(teamsLoader, true);
    teamsList.style.display = 'none';
    noTeamsMessage.style.display = 'none';
    
    try {
        teams = await getTeams();
        filteredTeams = [...teams];
        renderTeams();
        showNotification('Équipes chargées avec succès', 'success');
    } catch (error) {
        console.error('Erreur lors du chargement des équipes:', error);
        showNotification('Erreur lors du chargement des équipes', 'error');
        noTeamsMessage.style.display = 'block';
    } finally {
        toggleLoader(teamsLoader, false);
    }
}

// Fonction pour obtenir le nom d'un sport par son ID
function getSportName(sportId) {
    const sport = sports.find(s => s.id == sportId);
    return sport ? sport.name : 'Sport inconnu';
}

// Fonction pour rendre les équipes
function renderTeams() {
    teamsList.innerHTML = '';
    
    if (filteredTeams.length === 0) {
        noTeamsMessage.style.display = 'block';
        teamsList.style.display = 'none';
        return;
    }
    
    noTeamsMessage.style.display = 'none';
    teamsList.style.display = 'grid';
    
    filteredTeams.forEach(team => {
        const teamCard = createTeamCard(team);
        teamsList.appendChild(teamCard);
    });
}

// Fonction pour créer une carte d'équipe
function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.setAttribute('data-team-id', team.id);
    
    const sportName = getSportName(team.sportId);
    const hasImages = team.images && team.images.length > 0;
    const firstImage = hasImages ? team.images[0] : null;
    const description = team.role || 'Aucune description disponible';
    
    card.innerHTML = `
        <div class="team-card-header">
            ${firstImage ? 
                `<img src="${firstImage}" alt="${team.name}" class="team-image">
                 <div class="team-image-overlay"></div>` :
                `<i class="fas fa-users team-placeholder"></i>`
            }
            <div class="team-badge">${sportName}</div>
        </div>
        <div class="team-card-body">
            <h3 class="team-name">${team.name}</h3>
            <p class="team-sport">${sportName}</p>
            <p class="team-description">${description}</p>
            <div class="team-actions">
                <button class="btn-icon btn-view" onclick="viewTeam(${team.id})" title="Voir les détails">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-edit" onclick="editTeam(${team.id})" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="confirmDeleteTeam(${team.id})" title="Supprimer">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Fonction pour filtrer les équipes
function filterTeams() {
    const sportFilterValue = sportFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    
    filteredTeams = teams.filter(team => {
        const matchesSport = !sportFilterValue || team.sportId == sportFilterValue;
        const matchesSearch = !searchValue || 
            team.name.toLowerCase().includes(searchValue) ||
            (team.role && team.role.toLowerCase().includes(searchValue));
        
        return matchesSport && matchesSearch;
    });
    
    renderTeams();
}

// Fonction pour ouvrir la modal d'ajout d'équipe
function openAddTeamModal() {
    currentEditingTeamId = null;
    uploadedImagesBase64 = [];
    
    // Reset du formulaire
    teamForm.reset();
    teamImagesPreview.innerHTML = '';
    
    // Titre de la modal
    document.getElementById('team-modal-title').textContent = 'Ajouter une équipe';
    document.getElementById('team-id').value = '';
    
    // Afficher la modal
    teamModal.style.display = 'flex';
    teamNameInput.focus();
}

// Fonction pour éditer une équipe
async function editTeam(teamId) {
    currentEditingTeamId = teamId;
    const team = teams.find(t => t.id == teamId);
    
    if (!team) {
        showNotification('Équipe non trouvée', 'error');
        return;
    }
    
    // Pré-remplir le formulaire
    document.getElementById('team-modal-title').textContent = 'Modifier l\'équipe';
    document.getElementById('team-id').value = team.id;
    teamSportSelect.value = team.sportId;
    teamNameInput.value = team.name;
    teamRoleInput.value = team.role || '';
    
    // Afficher les images existantes
    uploadedImagesBase64 = team.images || [];
    renderImagePreview();
    
    // Afficher la modal
    teamModal.style.display = 'flex';
    teamNameInput.focus();
}

// Fonction pour voir les détails d'une équipe
async function viewTeam(teamId) {
    const team = teams.find(t => t.id == teamId);
    
    if (!team) {
        showNotification('Équipe non trouvée', 'error');
        return;
    }
    
    // Remplir les détails
    document.getElementById('view-team-title').textContent = `Détails de ${team.name}`;
    document.getElementById('view-team-sport').textContent = getSportName(team.sportId);
    document.getElementById('view-team-name').textContent = team.name;
    document.getElementById('view-team-role').textContent = team.role || 'Aucune description disponible';
    
    // Afficher les images
    const imagesGallery = document.getElementById('view-team-images');
    imagesGallery.innerHTML = '';
    
    if (team.images && team.images.length > 0) {
        team.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${team.name} - Image ${index + 1}`;
            img.className = 'gallery-image';
            img.onclick = () => openImageLightbox(image);
            imagesGallery.appendChild(img);
        });
    } else {
        imagesGallery.innerHTML = '<p>Aucune image disponible</p>';
    }
    
    // Afficher la modal
    viewTeamModal.style.display = 'flex';
}

// Fonction pour ouvrir une lightbox d'image (optionnel)
function openImageLightbox(imageSrc) {
    // Simple ouverture dans un nouvel onglet
    window.open(imageSrc, '_blank');
}

// Fonction pour confirmer la suppression
async function confirmDeleteTeam(teamId) {
    const team = teams.find(t => t.id == teamId);
    
    if (!team) {
        showNotification('Équipe non trouvée', 'error');
        return;
    }
    
    document.getElementById('delete-team-name').textContent = team.name;
    
    // Stocker l'ID pour la suppression
    document.getElementById('confirm-delete-team-btn').setAttribute('data-team-id', teamId);
    
    deleteTeamModal.style.display = 'flex';
}

// Fonction pour supprimer une équipe
async function deleteTeamConfirmed() {
    const teamId = document.getElementById('confirm-delete-team-btn').getAttribute('data-team-id');
    const deleteBtn = document.getElementById('confirm-delete-team-btn');
    
    toggleButtonLoader(deleteBtn, true);
    
    try {
        await deleteTeam(teamId);
        
        // Retirer l'équipe de la liste locale
        teams = teams.filter(t => t.id != teamId);
        filterTeams();
        
        // Fermer la modal
        deleteTeamModal.style.display = 'none';
        
        showNotification('Équipe supprimée avec succès', 'success');
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showNotification('Erreur lors de la suppression de l\'équipe', 'error');
    } finally {
        toggleButtonLoader(deleteBtn, false);
    }
}

// Fonction pour gérer la sélection d'images
async function handleImageSelection(event) {
    const files = event.target.files;
    
    if (files.length === 0) return;
    
    // Validation des fichiers
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    for (const file of files) {
        if (file.size > maxSize) {
            showNotification(`Le fichier ${file.name} est trop volumineux (max 5 Mo)`, 'error');
            return;
        }
        
        if (!allowedTypes.includes(file.type)) {
            showNotification(`Le fichier ${file.name} n'est pas un format d'image supporté`, 'error');
            return;
        }
    }
    
    // Convertir en base64
    try {
        uploadedImagesBase64 = [];
        for (const file of files) {
            const base64 = await fileToBase64(file);
            uploadedImagesBase64.push(base64);
        }
        
        renderImagePreview();
    } catch (error) {
        console.error('Erreur lors de la conversion des images:', error);
        showNotification('Erreur lors du traitement des images', 'error');
    }
}

// Fonction pour afficher l'aperçu des images
function renderImagePreview() {
    teamImagesPreview.innerHTML = '';
    
    uploadedImagesBase64.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        previewItem.innerHTML = `
            <img src="${image}" alt="Aperçu ${index + 1}" class="preview-image">
            <button type="button" class="remove-image" onclick="removeImage(${index})" title="Supprimer cette image">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        teamImagesPreview.appendChild(previewItem);
    });
}

// Fonction pour supprimer une image de l'aperçu
function removeImage(index) {
    uploadedImagesBase64.splice(index, 1);
    renderImagePreview();
}

// Fonction pour sauvegarder une équipe
async function saveTeam(event) {
    event.preventDefault();
    
    // Validation du formulaire
    if (!teamSportSelect.value) {
        showNotification('Veuillez sélectionner un sport', 'error');
        teamSportSelect.focus();
        return;
    }
    
    if (!teamNameInput.value.trim()) {
        showNotification('Veuillez entrer un nom d\'équipe', 'error');
        teamNameInput.focus();
        return;
    }
    
    toggleButtonLoader(submitTeamBtn, true);
    
    try {
        const teamData = {
            sport: teamSportSelect.value,
            name: teamNameInput.value.trim(),
            role: teamRoleInput.value.trim(),
            images: uploadedImagesBase64
        };
        
        let savedTeam;
        
        if (currentEditingTeamId) {
            // Modification
            savedTeam = await updateTeam(currentEditingTeamId, teamData);
            
            // Mettre à jour dans la liste locale
            const index = teams.findIndex(t => t.id == currentEditingTeamId);
            if (index !== -1) {
                teams[index] = savedTeam;
            }
            
            showNotification('Équipe modifiée avec succès', 'success');
        } else {
            // Ajout
            savedTeam = await addTeam(teamData);
            teams.push(savedTeam);
            showNotification('Équipe ajoutée avec succès', 'success');
        }
        
        // Rafraîchir l'affichage
        filterTeams();
        
        // Fermer la modal
        teamModal.style.display = 'none';
        
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        showNotification('Erreur lors de la sauvegarde de l\'équipe', 'error');
    } finally {
        toggleButtonLoader(submitTeamBtn, false);
    }
}

// Fonction pour fermer les modales
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = 'none';
    }
}

// Fonction pour gérer les clics en dehors des modales
function handleModalBackdropClick(event, modalElement) {
    if (event.target === modalElement) {
        closeModal(modalElement);
    }
}

// Fonction d'initialisation des événements
function initializeEvents() {
    // Boutons principaux
    addTeamBtn.addEventListener('click', openAddTeamModal);
    submitTeamBtn.addEventListener('click', saveTeam);
    cancelTeamBtn.addEventListener('click', () => closeModal(teamModal));
    
    // Filtres
    sportFilter.addEventListener('change', filterTeams);
    searchInput.addEventListener('input', filterTeams);
    
    // Gestion des images
    teamImagesInput.addEventListener('change', handleImageSelection);
    
    // Fermeture des modales
    document.getElementById('close-team-modal').addEventListener('click', () => closeModal(teamModal));
    document.getElementById('close-view-team-modal').addEventListener('click', () => closeModal(viewTeamModal));
    document.getElementById('close-delete-team-modal').addEventListener('click', () => closeModal(deleteTeamModal));
    
    // Confirmation de suppression
    document.getElementById('confirm-delete-team-btn').addEventListener('click', deleteTeamConfirmed);
    document.getElementById('cancel-delete-team-btn').addEventListener('click', () => closeModal(deleteTeamModal));
    
    // Clics en dehors des modales
    teamModal.addEventListener('click', (e) => handleModalBackdropClick(e, teamModal));
    viewTeamModal.addEventListener('click', (e) => handleModalBackdropClick(e, viewTeamModal));
    deleteTeamModal.addEventListener('click', (e) => handleModalBackdropClick(e, deleteTeamModal));
    
    // Gestion des touches Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(teamModal);
            closeModal(viewTeamModal);
            closeModal(deleteTeamModal);
        }
    });
}

// Rendre les fonctions accessibles globalement pour les événements onclick
window.viewTeam = viewTeam;
window.editTeam = editTeam;
window.confirmDeleteTeam = confirmDeleteTeam;
window.removeImage = removeImage;

// Fonction principale d'initialisation
export async function initEquipesDashboard() {
    try {
        // Initialiser les éléments DOM
        initializeDOM();
        
        // Initialiser les événements
        initializeEvents();
        
        // Charger les données en parallèle
        await Promise.all([
            loadSports(),
            loadTeams()
        ]);
        
        showNotification('Dashboard des équipes initialisé avec succès', 'success');
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du dashboard des équipes:', error);
        showNotification('Erreur lors de l\'initialisation du dashboard', 'error');
    }
}

// Initialisation
// initEquipesDashboard();