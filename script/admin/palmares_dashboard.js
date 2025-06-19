import { showNotification } from "../showNotification.js";
import { getPalmares, addPalmares, updatePalmares, deletePalmares, getPalmaresById } from "../../service/api/palmaresApi.js";
import { getSports } from "../../service/api/sportApi.js";

import { fileToBase64 } from "../../service/imageFormatter.js";


// Initialisation
export function initPalmaresDashboard() {

    // Variables globales
let palmaresItems = [];
let sportsData = [];
let filteredPalmares = [];
let yearsOptions = [];
let uploadedImagesBase64 = [];
let currentPalmaresId = null;

// Éléments DOM
const palmaresListElement = document.getElementById('palmares-list');
const palmaresLoader = document.getElementById('palmares-loader');
const noResultsMessage = document.getElementById('no-palmares-message');

// Éléments filtres
const filterSport = document.getElementById('filter-sport');
const filterYear = document.getElementById('filter-year');
const searchInput = document.getElementById('search-palmares');

// Modales
const palmaresModal = document.getElementById('palmares-modal');
const viewPalmaresModal = document.getElementById('view-palmares-modal');
const deletePalmaresModal = document.getElementById('delete-palmares-modal');

// Formulaire et champs
const palmaresForm = document.getElementById('palmares-form');
const palmaresModalTitle = document.getElementById('palmares-modal-title');
const palmaresIdInput = document.getElementById('palmares-id');
const palmaresAthleteNameInput = document.getElementById('palmares-athlete-name');
const palmaresCompetitionInput = document.getElementById('palmares-competition');
const palmaresSportSelect = document.getElementById('palmares-sport');
const palmaresCategoryInput = document.getElementById('palmares-category');
const palmaresGenderSelect = document.getElementById('palmares-gender');
const palmaresResultInput = document.getElementById('palmares-result');
const palmaresYearInput = document.getElementById('palmares-year');
const palmaresImagesInput = document.getElementById('palmares-images');
const palmaresImagesPreview = document.getElementById('palmares-images-preview');

// Éléments de vue détaillée
const viewPalmaresTitle = document.getElementById('view-palmares-title');
const viewPalmaresImages = document.getElementById('view-palmares-images');
const viewPalmaresAthlete = document.getElementById('view-palmares-athlete');
const viewPalmaresCompetition = document.getElementById('view-palmares-competition');
const viewPalmaresSport = document.getElementById('view-palmares-sport');
const viewPalmaresCategory = document.getElementById('view-palmares-category');
const viewPalmaresGender = document.getElementById('view-palmares-gender');
const viewPalmaresResult = document.getElementById('view-palmares-result');
const viewPalmaresYear = document.getElementById('view-palmares-year');

// Éléments de suppression
const deletePalmaresName = document.getElementById('delete-palmares-name');
const confirmDeletePalmaresBtn = document.getElementById('confirm-delete-palmares-btn');

// Boutons
const addPalmaresBtn = document.getElementById('add-palmares-btn');
const closePalmaresModalBtn = document.getElementById('close-palmares-modal');
const closeViewPalmaresModalBtn = document.getElementById('close-view-palmares-modal');
const closeDeletePalmaresModalBtn = document.getElementById('close-delete-palmares-modal');
const cancelDeletePalmaresBtn = document.getElementById('cancel-delete-palmares-btn');



    // Définir l'année actuelle comme valeur par défaut
    palmaresYearInput.max = new Date().getFullYear();
    palmaresYearInput.value = new Date().getFullYear();


    // Fonction pour charger les données initiales
async function loadInitialData() {
    try {
        showLoader();

        // Charger les palmarès et les sports en parallèle
        const [palmaresResponse, sportsResponse] = await Promise.all([
            getPalmares(),
            getSports()
        ]);

        palmaresItems = Array.isArray(palmaresResponse) ? palmaresResponse : [palmaresResponse];
        sportsData = Array.isArray(sportsResponse) ? sportsResponse : [sportsResponse];

        // Extraire les années uniques pour le filtre
        const years = [...new Set(palmaresItems.map(item => item.year))].sort((a, b) => b - a);
        yearsOptions = years;

        // Peupler les filtres
        populateFilters();

        // Filtrer et afficher les palmarès
        filteredPalmares = [...palmaresItems];
        renderPalmaresList();

        hideLoader();
    } catch (error) {
        hideLoader();
        showNotification("Erreur lors du chargement des données: " + error.message, "error");
        console.error("Erreur de chargement:", error);
    }
}

// Fonction pour ajouter tous les écouteurs d'événements
function addEventListeners() {
    // Écouteurs pour les filtres
    filterSport.addEventListener('change', handleFilters);
    filterYear.addEventListener('change', handleFilters);
    searchInput.addEventListener('input', handleFilters);

    // Écouteurs pour les boutons principaux
    addPalmaresBtn.addEventListener('click', openAddPalmaresModal);

    // Écouteurs pour les modales
    closePalmaresModalBtn.addEventListener('click', () => closeModal(palmaresModal));
    closeViewPalmaresModalBtn.addEventListener('click', () => closeModal(viewPalmaresModal));
    closeDeletePalmaresModalBtn.addEventListener('click', () => closeModal(deletePalmaresModal));
    cancelDeletePalmaresBtn.addEventListener('click', () => closeModal(deletePalmaresModal));

    // Écouteur pour le formulaire
    palmaresForm.addEventListener('submit', handlePalmaresSubmit);

    // Écouteur pour l'upload d'images
    palmaresImagesInput.addEventListener('change', handleImagesUpload);

    // Écouteur pour la suppression
    confirmDeletePalmaresBtn.addEventListener('click', handlePalmaresDelete);

    // Fermeture des modales en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === palmaresModal) closeModal(palmaresModal);
        if (e.target === viewPalmaresModal) closeModal(viewPalmaresModal);
        if (e.target === deletePalmaresModal) closeModal(deletePalmaresModal);
    });
}

// Gestion des filtres
function handleFilters() {
    const selectedSport = filterSport.value;
    const selectedYear = filterYear.value;
    const searchTerm = searchInput.value.toLowerCase().trim();

    filteredPalmares = palmaresItems.filter(palmares => {
        const matchesSport = selectedSport === '' || palmares.sport === selectedSport;
        const matchesYear = selectedYear === '' || palmares.year.toString() === selectedYear;
        const matchesSearch = searchTerm === '' || 
            palmares.athleteName.toLowerCase().includes(searchTerm) ||
            palmares.competition.toLowerCase().includes(searchTerm) ||
            palmares.category.toLowerCase().includes(searchTerm);

        return matchesSport && matchesYear && matchesSearch;
    });

    renderPalmaresList();
}

// Remplir les options de filtres
function populateFilters() {
    // Remplir le filtre de sport
    filterSport.innerHTML = '<option value="">Tous les sports</option>';
    const uniqueSports = [...new Set(palmaresItems.map(item => item.sport))];

    sportsData.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport.id;
        option.textContent = sport.name;
        filterSport.appendChild(option);

        // Ajouter aussi au select du formulaire
        const formOption = document.createElement('option');
        formOption.value = sport.id;
        formOption.textContent = sport.name;
        palmaresSportSelect.appendChild(formOption);
    });

    // Remplir le filtre d'année
    filterYear.innerHTML = '<option value="">Toutes les années</option>';
    yearsOptions.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        filterYear.appendChild(option);
    });
}

// Afficher les palmarès
function renderPalmaresList() {
    // Vider la liste
    palmaresListElement.innerHTML = '';

    // Afficher un message si aucun résultat
    if (filteredPalmares.length === 0) {
        noResultsMessage.style.display = 'block';
        return;
    }

    noResultsMessage.style.display = 'none';

    // Ajouter chaque palmarès à la liste
    filteredPalmares.forEach(palmares => {
        const palmaresCard = createPalmaresCard(palmares);
        palmaresListElement.appendChild(palmaresCard);
    });
}

// Créer une carte de palmarès
function createPalmaresCard(palmares) {
    const palmaresElement = document.createElement('div');
    palmaresElement.className = 'editing-img-wording-container';
    palmaresElement.dataset.id = palmares.id;

    // Déterminer l'image à afficher
    let imageHtml = '';
    if (palmares.image && palmares.image.length > 0) {
        imageHtml = `
            <img src="${palmares.image}" alt="${palmares.athleteName}">
            <div class="year-badge">${palmares.year}</div>
        `;
    } else {
        imageHtml = `
            <div class="default-image">
                <i class="fa-solid fa-medal"></i>
            </div>
            <div class="year-badge">${palmares.year}</div>
        `;
    }

    // Trouver le nom du sport
    const sport = sportsData.find(s => s.id === palmares.sport);
    const sportName = sport ? sport.name : palmares.sport;

    // Construire le HTML de la carte
    palmaresElement.innerHTML = `
        <div class="edit-img">
            ${imageHtml}
            <div class="sport-badge">${sportName}</div>
        </div>
        <div class="edit-description">
            <h2>${palmares.athleteName}</h2>
            <h3>${palmares.competition}</h3>
            <div class="result-highlight">${palmares.result}</div>

            <div class="palmares-meta">
                <div class="category-gender">${palmares.category} | ${palmares.gender}</div>
            </div>

            <div class="palmares-actions">
                <button title="Voir" class=" btn-icon btn-view" data-id="${palmares.id}">
                   <i class="fas fa-eye"></i>
                </button>
                <button title="Modifier" class="btn-icon btn-edit" data-id="${palmares.id}">
                <i class="fas fa-edit"></i>
                </button>
                <button title="Supprimer" class=" btn-icon btn-delete" data-id="${palmares.id}">
                 <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    // Ajouter les écouteurs d'événements pour les boutons
    const viewBtn = palmaresElement.querySelector('.btn-view');
    const editBtn = palmaresElement.querySelector('.btn-edit');
    const deleteBtn = palmaresElement.querySelector('.btn-delete');

    viewBtn.addEventListener('click', () => openViewPalmaresModal(palmares.id));
    editBtn.addEventListener('click', () => openEditPalmaresModal(palmares.id));
    deleteBtn.addEventListener('click', () => openDeletePalmaresModal(palmares.id));

    return palmaresElement;
}

// Ouvrir la modale d'ajout de palmarès
function openAddPalmaresModal() {
    resetPalmaresForm();
    palmaresModalTitle.textContent = 'Ajouter un Champion';
    currentPalmaresId = null;
    openModal(palmaresModal);
}

// Ouvrir la modale de modification de palmarès
async function openEditPalmaresModal(palmaresId) {
    try {
        showLoader();

        // Récupérer les détails du palmarès
        const palmares = await getPalmaresById(palmaresId);

        // Remplir le formulaire avec les données
        palmaresIdInput.value = palmares.id;
        palmaresAthleteNameInput.value = palmares.athleteName;
        palmaresCompetitionInput.value = palmares.competition;
        palmaresSportSelect.value = palmares.sport;
        palmaresCategoryInput.value = palmares.category;
        palmaresGenderSelect.value = palmares.gender;
        palmaresResultInput.value = palmares.result;
        palmaresYearInput.value = palmares.year;

        // Afficher les images existantes si présentes
        palmaresImagesPreview.innerHTML = '';
        if (palmares.image) {
            const imagePreview = document.createElement('div');
            imagePreview.className = 'preview-item';
            imagePreview.innerHTML = `
                <img src="${palmares.image}" alt="Image">
                <button type="button" class="remove-image" data-index="0">&times;</button>
            `;
            palmaresImagesPreview.appendChild(imagePreview);

            // Ajouter l'écouteur pour le bouton de suppression
            const removeBtn = imagePreview.querySelector('.remove-image');
            removeBtn.addEventListener('click', () => {
                imagePreview.remove();
                uploadedImagesBase64 = [];
            });
        }

        palmaresModalTitle.textContent = 'Modifier un Champion';
        currentPalmaresId = palmares.id;

        hideLoader();
        openModal(palmaresModal);
    } catch (error) {
        hideLoader();
        showNotification("Erreur lors du chargement du palmarès: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Ouvrir la modale de visualisation de palmarès
async function openViewPalmaresModal(palmaresId) {
    try {
        showLoader();

        // Récupérer les détails du palmarès
        const palmares = await getPalmaresById(palmaresId);

        // Trouver le nom du sport
        const sport = sportsData.find(s => s.id === palmares.sport);
        const sportName = sport ? sport.name : palmares.sport;

        // Remplir les détails
        viewPalmaresTitle.textContent = `${palmares.athleteName} - ${palmares.competition}`;
        viewPalmaresAthlete.textContent = palmares.athleteName;
        viewPalmaresCompetition.textContent = palmares.competition;
        viewPalmaresSport.textContent = sportName;
        viewPalmaresCategory.textContent = palmares.category;
        viewPalmaresGender.textContent = palmares.gender;
        viewPalmaresResult.textContent = palmares.result;
        viewPalmaresYear.textContent = palmares.year;

        // Afficher les images
        viewPalmaresImages.innerHTML = '';
        if (palmares.image) {
            const imgElement = document.createElement('img');
            imgElement.src = palmares.image;
            imgElement.alt = palmares.athleteName;
            viewPalmaresImages.appendChild(imgElement);
        } else {
            viewPalmaresImages.innerHTML = '<div class="no-image">Aucune image disponible</div>';
        }

        hideLoader();
        openModal(viewPalmaresModal);
    } catch (error) {
        hideLoader();
        showNotification("Erreur lors du chargement du palmarès: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Ouvrir la modale de suppression de palmarès
async function openDeletePalmaresModal(palmaresId) {
    try {
        const palmares = palmaresItems.find(p => p.id === palmaresId);
        if (!palmares) {
            throw new Error("Palmarès non trouvé");
        }

        deletePalmaresName.textContent = `${palmares.athleteName} (${palmares.competition} ${palmares.year})`;
        currentPalmaresId = palmaresId;

        openModal(deletePalmaresModal);
    } catch (error) {
        showNotification("Erreur: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Gestion de la soumission du formulaire
async function handlePalmaresSubmit(e) {
    e.preventDefault();

    try {
        showLoader();

        // Récupérer les données du formulaire
        const palmaresData = {
            athleteName: palmaresAthleteNameInput.value,
            competition: palmaresCompetitionInput.value,
            sport: palmaresSportSelect.value,
            category: palmaresCategoryInput.value,
            gender: palmaresGenderSelect.value,
            result: palmaresResultInput.value,
            year: parseInt(palmaresYearInput.value),
            images: uploadedImagesBase64
        };

        let result;

        // Ajout ou modification selon le cas
        if (currentPalmaresId) {
            result = await updatePalmares(currentPalmaresId, palmaresData);
            showNotification("Palmarès modifié avec succès", "success");
        } else {
            result = await addPalmares(palmaresData);
            showNotification("Palmarès ajouté avec succès", "success");
        }

        // Mettre à jour la liste des palmarès
        await loadInitialData();

        // Fermer la modale
        closeModal(palmaresModal);

        hideLoader();
    } catch (error) {
        hideLoader();
        showNotification("Erreur lors de la sauvegarde: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Gestion de la suppression de palmarès
async function handlePalmaresDelete() {
    if (!currentPalmaresId) {
        showNotification("Erreur: ID de palmarès manquant", "error");
        return;
    }

    try {
        showLoader();

        // Supprimer le palmarès
        await deletePalmares(currentPalmaresId);

        // Mettre à jour la liste
        await loadInitialData();

        // Fermer la modale
        closeModal(deletePalmaresModal);

        showNotification("Palmarès supprimé avec succès", "success");

        hideLoader();
    } catch (error) {
        hideLoader();
        showNotification("Erreur lors de la suppression: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Gestion de l'upload d'images
async function handleImagesUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
        // Vider l'aperçu des images
        palmaresImagesPreview.innerHTML = '';
        uploadedImagesBase64 = [];

        // Pour chaque fichier
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Vérifier le type et la taille
            if (!file.type.startsWith('image/')) {
                showNotification("Seules les images sont acceptées", "error");
                continue;
            }

            if (file.size > 5 * 1024 * 1024) { // 5 Mo
                showNotification("L'image est trop grande (max 5 Mo)", "error");
                continue;
            }

            // Convertir en base64
            const base64 = await fileToBase64(file);
            uploadedImagesBase64.push(base64);

            // Créer l'aperçu
            const imagePreview = document.createElement('div');
            imagePreview.className = 'preview-item';
            imagePreview.innerHTML = `
                <img src="${base64}" alt="Image ${i + 1}">
                <button type="button" class="remove-image" data-index="${i}">&times;</button>
            `;
            palmaresImagesPreview.appendChild(imagePreview);

            // Ajouter l'écouteur pour le bouton de suppression
            const removeBtn = imagePreview.querySelector('.remove-image');
            removeBtn.addEventListener('click', () => {
                const index = parseInt(removeBtn.dataset.index);
                uploadedImagesBase64.splice(index, 1);

                // Mettre à jour les indices des autres boutons
                const allRemoveBtns = palmaresImagesPreview.querySelectorAll('.remove-image');
                for (let j = index + 1; j < allRemoveBtns.length; j++) {
                    allRemoveBtns[j].dataset.index = j - 1;
                }

                imagePreview.remove();
            });
        }
    } catch (error) {
        showNotification("Erreur lors du traitement des images: " + error.message, "error");
        console.error("Erreur:", error);
    }
}

// Réinitialiser le formulaire
function resetPalmaresForm() {
    palmaresForm.reset();
    palmaresIdInput.value = '';
    palmaresYearInput.value = new Date().getFullYear();
    palmaresImagesPreview.innerHTML = '';
    uploadedImagesBase64 = [];
}

// Fonctions utilitaires pour les modales
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Réactiver le défilement
}

// Fonctions utilitaires pour le loader
function showLoader() {
    palmaresLoader.style.display = 'block';
}

function hideLoader() {
    palmaresLoader.style.display = 'none';
}

    // Charger les données initiales
    loadInitialData();

    // Ajouter les écouteurs d'événements
    addEventListeners();
}



// Appeler la fonction d'initialisation
// initPalmaresDashboard();