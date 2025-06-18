/**
 * @fileoverview
 * Script pour la gestion du dashboard des informations du club.
 * Gère les contacts, réseaux sociaux et contenus textuels (introductions).
 * @module script/admin/informations_dashboard.js
 * @requires module:service/api/contactClubApi.js
 * @requires module:service/api/socialMediasApi.js
 * @requires module:service/api/introductionApi.js
 * @requires module:showNotification.js
 */

import { getContactClub, updateContactClub } from '../../service/api/contactClubApi.js';
import { getSocialMedias, addSocialMedia, updateSocialMedia, deleteSocialMedia } from '../../service/api/socialMediasApi.js';
import { getIntroductions, getIntroductionByTitle, updateIntroduction, addIntroduction } from '../../service/api/introductionApi.js';
import { showNotification } from '../showNotification.js';
import { fileToBase64} from '../../service/imageFormatter.js';

export function initInformationsDashboard() {
    // Éléments DOM - Contact
    const contactForm = document.getElementById('form-dashboard-profil');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const addressInput = document.getElementById('address');
    const contactLoader = document.getElementById('contact-loader');
    const saveContactBtn = document.getElementById('save-contact-btn');
    const editIcons = document.querySelectorAll('.edit-icon');

    // Éléments DOM - Réseaux Sociaux
    const addSocialBtn = document.getElementById('add-social-btn');
    const socialMediasList = document.getElementById('social-medias-list');
    const socialLoader = document.getElementById('social-loader');
    const socialModal = document.getElementById('social-modal');
    const socialForm = document.getElementById('social-form');
    const closeSocialModal = document.getElementById('close-social-modal');
    const cancelSocialBtn = document.getElementById('cancel-social-btn');
    const saveSocialBtn = document.getElementById('save-social-btn');
    const socialIdInput = document.getElementById('social-id');
    const socialPlatformInput = document.getElementById('social-platform');
    const socialUrlInput = document.getElementById('social-url');
    const socialIconUrlInput = document.getElementById('social-icon-url');
    const socialImageInput = document.getElementById('social-image');
    const socialModalTitle = document.getElementById('social-modal-title');

    // Éléments DOM - Suppression Réseaux Sociaux
    const deleteSocialModal = document.getElementById('delete-social-modal');
    const cancelDeleteSocialBtn = document.getElementById('cancel-delete-social-btn');
    const confirmDeleteSocialBtn = document.getElementById('confirm-delete-social-btn');

    // Éléments DOM - Contenus Textuels
    const editContentBtns = document.querySelectorAll('.edit-content-btn');
    const viewContentBtns = document.querySelectorAll('.view-content-btn');
    const contentModal = document.getElementById('content-modal');
    const viewContentModal = document.getElementById('view-content-modal');
    const contentForm = document.getElementById('content-form');
    const closeContentModal = document.getElementById('close-content-modal');
    const closeViewContentModal = document.getElementById('close-view-content-modal');
    const cancelContentBtn = document.getElementById('cancel-content-btn');
    const saveContentBtn = document.getElementById('save-content-btn');
    const contentModalTitle = document.getElementById('content-modal-title');
    const contentIdInput = document.getElementById('content-id');
    const contentTitleInput = document.getElementById('content-title');
    const contentDescriptionInput = document.getElementById('content-description');
    const contentImagesInput = document.getElementById('content-images');

    // Variables globales
    let currentContactClub = null;
    let socialMedias = [];
    let socialToDelete = null;
    let introductions = [];
    let currentEditingContent = null;
    let selectedImages = []; // Pour stocker les images sélectionnées
let existingImages = []; // Pour stocker les images existantes lors de l'édition


    // ===========================================
    // FONCTIONS UTILITAIRES
    // ===========================================

    function disableButton(button, originalText) {
        button.disabled = true;
        button.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;
        return originalText;
    }

    function enableButton(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
    }

    function toggleInputEdit(input, enable) {
        input.disabled = !enable;
        if (enable) {
            input.focus();
        }
    }

    // ===========================================
    // GESTION DES CONTACTS DU CLUB
    // ===========================================

    async function loadContactClub() {
        contactLoader.style.display = 'block';
        try {
            currentContactClub = await getContactClub();
            
            emailInput.value = currentContactClub.email || '';
            telephoneInput.value = currentContactClub.telephone || '';
            addressInput.value = currentContactClub.adresse || '';

            // Désactiver tous les champs par défaut
            emailInput.disabled = true;
            telephoneInput.disabled = true;
            addressInput.disabled = true;

        } catch (error) {
            showNotification(error.message || 'Erreur lors du chargement des informations de contact.', 'error');
        } finally {
            contactLoader.style.display = 'none';
        }
    }

    // Gestion des icônes d'édition
    editIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const field = e.target.dataset.field;
            const input = document.getElementById(field);
            
            if (input.disabled) {
                toggleInputEdit(input, true);
                icon.className = 'fa-solid fa-check edit-icon';
            } else {
                toggleInputEdit(input, false);
                icon.className = 'fa-regular fa-edit edit-icon';
            }
        });
    });

    // Soumission du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnText = saveContactBtn.innerHTML;
            disableButton(saveContactBtn, originalBtnText);

            const contactData = {
                phoneNumber: telephoneInput.value,
                mail: emailInput.value,
                address: addressInput.value
            };

            try {
                if (currentContactClub && currentContactClub.id) {
                    await updateContactClub(currentContactClub.id, contactData);
                } else {
                    // Si pas d'ID, c'est un ajout (cas improbable mais géré)
                    currentContactClub = await addContactClub(contactData);
                }
                
                showNotification('Informations de contact mises à jour avec succès.', 'success');
                
                // Désactiver tous les champs et remettre les icônes en mode édition
                emailInput.disabled = true;
                telephoneInput.disabled = true;
                addressInput.disabled = true;
                
                editIcons.forEach(icon => {
                    icon.className = 'fa-regular fa-edit edit-icon';
                });

            } catch (error) {
                showNotification(error.message || 'Erreur lors de la mise à jour des informations de contact.', 'error');
            } finally {
                enableButton(saveContactBtn, originalBtnText);
            }
        });
    }

    // ===========================================
    // GESTION DES RÉSEAUX SOCIAUX
    // ===========================================

    async function loadSocialMedias() {
        socialLoader.style.display = 'block';
        try {
            socialMedias = await getSocialMedias();
            renderSocialMedias();
        } catch (error) {
            showNotification(error.message || 'Erreur lors du chargement des réseaux sociaux.', 'error');
        } finally {
            socialLoader.style.display = 'none';
        }
    }

    function renderSocialMedias() {
        socialMediasList.innerHTML = '';
        
        if (!Array.isArray(socialMedias)) {
            socialMedias = [socialMedias];
        }

        socialMedias.forEach(social => {
            const socialCard = document.createElement('div');
            socialCard.className = 'social-media-card';
            socialCard.innerHTML = `
                <div class="social-header">
                    <div class="social-icon ${social.platform}">
                        ${   getSocialIcon(social.platform)}
                    </div>
                    <div class="platform-name">${social.platform}</div>
                </div>
                <div class="social-url">${social.url}</div>
                <div class="social-actions">
                    <button class="btn btn-primary btn-edit-social" data-id="${social.id}">Modifier</button>
                    <button class="btn btn-danger btn-delete-social" data-id="${social.id}">Supprimer</button>
                </div>
            `;
            socialMediasList.appendChild(socialCard);
        });

        // Ajouter les événements
        document.querySelectorAll('.btn-edit-social').forEach(btn => {
            btn.addEventListener('click', (e) => openEditSocialModal(e.target.dataset.id));
        });
        
        document.querySelectorAll('.btn-delete-social').forEach(btn => {
            btn.addEventListener('click', (e) => openDeleteSocialModal(e.target.dataset.id));
        });
    }

    function getSocialIcon(platform) {
        const icons = {
            facebook: '<i class="fa-brands fa-facebook"></i>',
            instagram: '<i class="fab fa-instagram"></i>',
            linkedin: '<i class="fa-brands fa-linkedin"></i>',
            twitter: '<i class="fa-brands fa-square-x-twitter"></i>">',
            x: '<i class="fa-brands fa-square-x-twitter"></i>',
            youtube: '<i class="fa-brands fa-youtube"></i>',
            tiktok: '<i class="fa-brands fa-tiktok"></i>'
        };
        return icons[platform.toLowerCase()] || '<i class="fas fa-link"></i>';
    }

    function openAddSocialModal() {
        socialModalTitle.textContent = 'Ajouter un réseau social';
        socialForm.reset();
        socialIdInput.value = '';
        socialModal.style.display = 'flex';
    }

    function openEditSocialModal(id) {
        const social = socialMedias.find(s => s.id == id);
        if (!social) return;

        socialModalTitle.textContent = 'Modifier le réseau social';
        socialIdInput.value = social.id;
        socialPlatformInput.value = social.platform;
        socialUrlInput.value = social.url;
        socialIconUrlInput.value = social.iconUrl || '';
        socialModal.style.display = 'flex';
    }

    function openDeleteSocialModal(id) {
        socialToDelete = id;
        deleteSocialModal.style.display = 'flex';
    }

    function closeSocialModals() {
        socialModal.style.display = 'none';
        deleteSocialModal.style.display = 'none';
        socialToDelete = null;
    }

    // Événements réseaux sociaux
    if (addSocialBtn) {
        addSocialBtn.addEventListener('click', openAddSocialModal);
    }

    if (closeSocialModal) {
        closeSocialModal.addEventListener('click', closeSocialModals);
    }

    if (cancelSocialBtn) {
        cancelSocialBtn.addEventListener('click', closeSocialModals);
    }

    if (cancelDeleteSocialBtn) {
        cancelDeleteSocialBtn.addEventListener('click', closeSocialModals);
    }

    if (socialForm) {
        socialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnText = saveSocialBtn.innerHTML;
            disableButton(saveSocialBtn, originalBtnText);

            const socialData = {
                platform: socialPlatformInput.value,
                url: socialUrlInput.value,
                iconUrl: socialIconUrlInput.value,
                image: socialImageInput.files[0] || null
            };

            try {
                if (socialIdInput.value) {
                    await updateSocialMedia(socialIdInput.value, socialData);
                    showNotification('Réseau social mis à jour avec succès.', 'success');
                } else {
                    await addSocialMedia(socialData);
                    showNotification('Réseau social ajouté avec succès.', 'success');
                }
                
                closeSocialModals();
                loadSocialMedias();

            } catch (error) {
                showNotification(error.message || 'Erreur lors de l\'enregistrement du réseau social.', 'error');
            } finally {
                enableButton(saveSocialBtn, originalBtnText);
            }
        });
    }

    if (confirmDeleteSocialBtn) {
        confirmDeleteSocialBtn.addEventListener('click', async () => {
            if (!socialToDelete) return;

            const originalBtnText = confirmDeleteSocialBtn.innerHTML;
            disableButton(confirmDeleteSocialBtn, originalBtnText);

            try {
                await deleteSocialMedia(socialToDelete);
                showNotification('Réseau social supprimé avec succès.', 'success');
                closeSocialModals();
                loadSocialMedias();
            } catch (error) {
                showNotification(error.message || 'Erreur lors de la suppression du réseau social.', 'error');
            } finally {
                enableButton(confirmDeleteSocialBtn, originalBtnText);
            }
        });
    }

    // ===========================================
    // GESTION DES CONTENUS TEXTUELS
    // ===========================================

    async function loadIntroductions() {
        try {
            introductions = await getIntroductions();
            
            if (!Array.isArray(introductions)) {
                introductions = [introductions];
            }
            
            updateContentDescriptions();
        } catch (error) {
            showNotification(error.message || 'Erreur lors du chargement des contenus.', 'error');
        }
    }

    function updateContentDescriptions() {
        const contentTitles = [
            'Histoire du club',
            'A propos de nous',
            'Vie du club',
            'Guide de l\'avironnier'
        ];

        contentTitles.forEach(title => {
            const introduction = introductions.find(intro => intro.title === title);
            const card = document.querySelector(`[data-title="${title}"]`);
            
            if (card) {
                const descriptionElement = card.querySelector('.edit-wording_description');
                if (introduction && introduction.description) {
                    descriptionElement.textContent = introduction.description;
                } else {
                    descriptionElement.textContent = 'Aucun contenu disponible. Cliquez sur "Modifier" pour ajouter du contenu.';
                }
            }
        });
    }

    function openViewContentModal(title) {
        const introduction = introductions.find(intro => intro.title === title);
        
        document.getElementById('view-content-modal-title').textContent = title;
        document.getElementById('view-content-title').textContent = title;
        
        if (introduction) {
            // Afficher les images
            const imagesContainer = document.getElementById('view-content-images');
            imagesContainer.innerHTML = '';
            
            if (introduction.image && Array.isArray(introduction.image) && introduction.image.length > 0) {
                introduction.image.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = title;
                    imagesContainer.appendChild(img);
                });
            }
            else if(introduction.image)
            {
                const img = document.createElement('img');
                img.src = introduction.image;
                img.alt = title;
                imagesContainer.appendChild(img);

            }
            else{
                imagesContainer.innerHTML = 'Aucune image disponible.';
            }
            
            // Afficher la description
            document.getElementById('view-content-description').innerHTML = introduction.description || 'Aucun contenu disponible.';
        } else {
            document.getElementById('view-content-images').innerHTML = '';
            document.getElementById('view-content-description').innerHTML = 'Aucun contenu disponible.';
        }
        
        viewContentModal.style.display = 'flex';
    }

   function openEditContentModal(title) {
    currentEditingContent = title;
    const introduction = introductions.find(intro => intro.title === title);
    
    contentModalTitle.textContent = `Modifier - ${title}`;
    contentTitleInput.value = title;
    
    // Réinitialiser les images
    selectedImages = [];
    existingImages = [];
    
    if (introduction) {
        contentIdInput.value = introduction.id;
        contentDescriptionInput.value = introduction.description || '';
        
        // Gérer les images existantes
        if (introduction.images && Array.isArray(introduction.images)) {
            existingImages = [...introduction.images];
        }
    } else {
        contentIdInput.value = '';
        contentDescriptionInput.value = '';
    }
    
    // Réinitialiser le champ file
    contentImagesInput.value = '';
    renderImagePreview();
    
    contentModal.style.display = 'flex';
}


   function closeContentModals() {
    contentModal.style.display = 'none';
    viewContentModal.style.display = 'none';
    currentEditingContent = null;
    
    // Réinitialiser les images
    selectedImages = [];
    existingImages = [];
    
    // Cacher la prévisualisation
    const previewContainer = document.getElementById('image-preview-container');
    if (previewContainer) {
        previewContainer.style.display = 'none';
    }
}


    // Événements contenus textuels
    editContentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            openEditContentModal(title);
        });
    });

    viewContentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            openViewContentModal(title);
        });
    });

    if (closeContentModal) {
        closeContentModal.addEventListener('click', closeContentModals);
    }

    if (closeViewContentModal) {
        closeViewContentModal.addEventListener('click', closeContentModals);
    }

    if (cancelContentBtn) {
        cancelContentBtn.addEventListener('click', closeContentModals);
    }

   if (contentForm) {
    contentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalBtnText = saveContentBtn.innerHTML;
        disableButton(saveContentBtn, originalBtnText);

        try {
            // Convertir les nouvelles images sélectionnées en base64
            const newImagesBase64 = [];
            for (let file of selectedImages) {
                const base64 = await fileToBase64(file);
                newImagesBase64.push(base64);
            }
            
            // Combiner les images existantes et les nouvelles
            const allImages = [...existingImages, ...newImagesBase64];

            const contentData = {
                title: contentTitleInput.value,
                description: contentDescriptionInput.value,
                images: allImages
            };

            if (contentIdInput.value) {
                // Mise à jour
                await updateIntroduction(contentIdInput.value, contentData);
                showNotification('Contenu mis à jour avec succès.', 'success');
            } else {
                // Ajout
                await addIntroduction(contentData);
                showNotification('Contenu ajouté avec succès.', 'success');
            }
            
            closeContentModals();
            loadIntroductions();

        } catch (error) {
            showNotification(error.message || 'Erreur lors de l\'enregistrement du contenu.', 'error');
        } finally {
            enableButton(saveContentBtn, originalBtnText);
        }
    });
}


    // Gestionnaire pour la sélection de fichiers images
if (contentImagesInput) {
    contentImagesInput.addEventListener('change', (e) => {
        selectedImages = Array.from(e.target.files);
        renderImagePreview();
    });
}


    // ===========================================
    // GESTION DES UPLOADS D'IMAGES
    // ===========================================
// Fonction de prévisualisation des images
    function renderImagePreview() {
    const previewContainer = document.getElementById('image-preview-container');
    const previewGrid = document.getElementById('image-preview');
    
    if (selectedImages.length === 0 && existingImages.length === 0) {
        previewContainer.style.display = 'none';
        return;
    }
    
    previewContainer.style.display = 'block';
    previewGrid.innerHTML = '';
    
    // Afficher les images existantes
    existingImages.forEach((imageUrl, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.innerHTML = `
            <img src="${imageUrl}" alt="Image existante ${index + 1}">
            <button type="button" class="remove-image" onclick="removeExistingImage(${index})">&times;</button>
        `;
        previewGrid.appendChild(previewItem);
    });
    
    // Afficher les nouvelles images sélectionnées
    selectedImages.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Nouvelle image ${index + 1}">
                <button type="button" class="remove-image" onclick="removeSelectedImage(${index})">&times;</button>
            `;
        };
        reader.readAsDataURL(file);
        
        previewGrid.appendChild(previewItem);
    });
}

function removeExistingImage(index) {
    existingImages.splice(index, 1);
    renderImagePreview();
}

function removeSelectedImage(index) {
    selectedImages.splice(index, 1);
    renderImagePreview();
}


    // ===========================================
    // INITIALISATION
    // ===========================================

    async function init() {
        showNotification('Chargement du dashboard des informations...', 'info');
        
        try {
            await Promise.all([
                loadContactClub(),
                loadSocialMedias(),
                loadIntroductions()
            ]);
            
            showNotification('Dashboard des informations chargé avec succès.', 'success');
        } catch (error) {
            showNotification('Erreur lors du chargement du dashboard.', 'error');
        }
    }

    // Lancer l'initialisation
    init();
}

// Initialiser le dashboard
// initInformationsDashboard();