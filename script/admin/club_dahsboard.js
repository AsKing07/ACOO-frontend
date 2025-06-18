/**
 * @fileoverview
 * Ce script initialise la gestion du dashboard du club, permettant de gérer l'organigramme
 * et les sports proposés par le club.
 * @module script/admin/club.js
 * @requires module:service/api/clubApi.js
 * @requires module:showNotification.js
 */

import { getStaff, addStaff, updateStaff, deleteStaff } from '../../service/api/staffApi.js';
import { getSports, addSport, updateSport, deleteSport } from '../../service/api/sportApi.js';
import { showNotification } from '../showNotification.js';

import { fileToBase64, getImageFromBase64 } from '../../service/imageFormatter.js';

export function initClub() {
  // Éléments DOM pour l'organigramme
  const staffsList = document.getElementById('staffs-list');
  const addStaffBtn = document.getElementById('add-staff-btn');
  const staffModal = document.getElementById('staff-modal');
  const deleteStaffModal = document.getElementById('delete-staff-modal');
  const closeStaffModal = document.getElementById('close-staff-modal');
  const closeDeleteStaffModal = document.getElementById('close-delete-staff-modal');
  const staffForm = document.getElementById('staff-form');
  const staffModalTitle = document.getElementById('staff-modal-title');
  const staffIdInput = document.getElementById('staff-id');
  const staffNameInput = document.getElementById('staff-name');
  const staffPhoneInput = document.getElementById('staff-phone');
  const staffEmailInput = document.getElementById('staff-email');
  const staffRoleInput = document.getElementById('staff-role');
  const staffPhotoInput = document.getElementById('staff-photo');
  const staffSubmitBtn = document.getElementById('staff-submit-btn');
  const confirmDeleteStaffBtn = document.getElementById('confirm-delete-staff-btn');
  const cancelDeleteStaffBtn = document.getElementById('cancel-delete-staff-btn');
  const organigrammeLoader = document.getElementById('organigramme-loader');

  // Éléments DOM pour les sports
  const sportsList = document.getElementById('sports-list');
  const addSportBtn = document.getElementById('add-sport-btn');
  const sportModal = document.getElementById('sport-modal');
  const deleteSportModal = document.getElementById('delete-sport-modal');
  const closeSportModal = document.getElementById('close-sport-modal');
  const closeDeleteSportModal = document.getElementById('close-delete-sport-modal');
  const sportForm = document.getElementById('sport-form');
  const sportModalTitle = document.getElementById('sport-modal-title');
  const sportIdInput = document.getElementById('sport-id');
  const sportNameInput = document.getElementById('sport-name');
  const sportDescriptionInput = document.getElementById('sport-description');
  const sportPhotoInput = document.getElementById('sport-image');
  const sportContactInput = document.getElementById('sport-contact'); // Si nécessaire  
  const sportSubmitBtn = document.getElementById('sport-submit-btn');
  const confirmDeleteSportBtn = document.getElementById('confirm-delete-sport-btn');
  const cancelDeleteSportBtn = document.getElementById('cancel-delete-sport-btn');
    const sportLoader = document.getElementById('sports-loader');

  // Variables pour stocker les données
  let staffs = [];
  let sports = [];
  let staffToDelete = null;
  let sportToDelete = null;

  // Fonctions pour l'organigramme
  async function renderStaffs() {
    organigrammeLoader.style.display = 'block';
    try {
      staffs = await getStaff();
      staffsList.innerHTML = '';
      
      staffs.forEach(staff => {
        const staffEl = document.createElement('div');
        staffEl.className = 'staff';
        staffEl.innerHTML = `
          <img src="${staff.image}" alt="${staff.name}">
          <div class="info">
            <div class="name">${staff.name}</div>
            <div class="role">${staff.role}</div>
            <div class="email">${staff.mail}</div>
            <div class="phone">${staff.phoneNumber}</div>
          </div>
          <div class="staff-actions">
            <button class="btn-primary btn-edit" data-id="${staff.id}">Modifier</button>
            <button class="btn-danger btn-delete" data-id="${staff.id}">Supprimer</button>
          </div>
        `;
        staffsList.appendChild(staffEl);
      });

      attachStaffEventListeners();
    } catch (err) {
      showNotification(err.message || "Erreur lors du chargement des membres.", 'error');
    }
    finally {
      organigrammeLoader.style.display = 'none';
    }
  }

  function attachStaffEventListeners() {
    document.querySelectorAll('.staff .btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => openEditStaffModal(e.target.dataset.id));
    });
    
    document.querySelectorAll('.staff .btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => openDeleteStaffModal(e.target.dataset.id));
    });
  }

  function openEditStaffModal(id) {
    const staff = staffs.find(m => m.id == id);
    if (!staff) return;
    
    staffModalTitle.textContent = "Modifier un membre";
    staffIdInput.value = staff.id;
    staffNameInput.value = staff.name;
    staffPhoneInput.value = staff.phoneNumber || '';
    staffEmailInput.value = staff.mail || '';
    staffPhotoInput.value = '';
    staffRoleInput.value = staff.role;
    staffModal.style.display = 'flex';
  }

  function openDeleteStaffModal(id) {
    staffToDelete = id;
    deleteStaffModal.style.display = 'flex';
  }

  // Fonctions pour les sports
  async function renderSports() {
    sportLoader.style.display = 'block';
    try {
      sports = await getSports();
      sportsList.innerHTML = '';
      
 sports.forEach(sport => {
    const sportEl = document.createElement('div');
    sportEl.className = 'sport-card';
    sportEl.innerHTML = `
        <div class="sport-card__content">
        <div class="sport-card__image">

            <img src="${sport.images[0]}" alt="${sport.name}">
        </div>
            <div class="sport-card__info">
                <h3 class="sport-card__name">${sport.name}</h3>
                <p class="sport-card__description">${sport.description || ''}</p>
            </div>
            <div class="sport-card__actions">
                <button class="btn-primary btn-edit-sport" data-id="${sport.id}">Modifier</button>
                <button class="btn-danger btn-delete-sport" data-id="${sport.id}">Supprimer</button>
            </div>
        </div>
    `;
    sportsList.appendChild(sportEl);
});

      attachSportEventListeners();
    } catch (err) {
      showNotification(err.message || "Erreur lors du chargement des sports.", 'error');
    }
    finally {
      sportLoader.style.display = 'none';
    }
  }

  function attachSportEventListeners() {
    document.querySelectorAll('.btn-edit-sport').forEach(btn => {
      btn.addEventListener('click', (e) => openEditSportModal(e.target.dataset.id));
    });
    
    document.querySelectorAll('.btn-delete-sport').forEach(btn => {
      btn.addEventListener('click', (e) => openDeleteSportModal(e.target.dataset.id));
    });
  }

  function openEditSportModal(id) {
    const sport = sports.find(s => s.id == id);
    if (!sport) return;
    
    sportModalTitle.textContent = "Modifier un sport";
    sportIdInput.value = sport.id;
    sportNameInput.value = sport.name;
    sportDescriptionInput.value = sport.description || '';
    sportPhotoInput.value = '';
    sportContactInput.value = sport.contact || '';
  
    sportModal.style.display = 'flex';
  }

  function openDeleteSportModal(id) {
    sportToDelete = id;
    deleteSportModal.style.display = 'flex';
  }

  // Event listeners pour les boutons et modals
  if (addStaffBtn) {
    addStaffBtn.addEventListener('click', () => {
      staffModalTitle.textContent = "Ajouter un membre";
      staffForm.reset();
      staffIdInput.value = '';
      staffModal.style.display = 'flex';
    });
  }

  if (addSportBtn) {
    addSportBtn.addEventListener('click', () => {
      sportModalTitle.textContent = "Ajouter un sport";
      sportForm.reset();
      sportIdInput.value = '';
      sportModal.style.display = 'flex';
    });
  }

  // Fermeture des modals
  if (closeStaffModal) closeStaffModal.onclick = () => staffModal.style.display = 'none';
  if (closeDeleteStaffModal) closeDeleteStaffModal.onclick = () => deleteStaffModal.style.display = 'none';
  if (cancelDeleteStaffBtn) cancelDeleteStaffBtn.onclick = () => deleteStaffModal.style.display = 'none';
  
  if (closeSportModal) closeSportModal.onclick = () => sportModal.style.display = 'none';
  if (closeDeleteSportModal) closeDeleteSportModal.onclick = () => deleteSportModal.style.display = 'none';
  if (cancelDeleteSportBtn) cancelDeleteSportBtn.onclick = () => deleteSportModal.style.display = 'none';

  // Soumission des formulaires
  if (staffForm) {
    staffForm.onsubmit = async (e) => {
      e.preventDefault();
      staffSubmitBtn.disabled = true;
      const oldBtnContent = staffSubmitBtn.innerHTML;
      staffSubmitBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;

      // Logique pour gérer l'upload de la photo (photo encodée en base64)
     let photoBase64 = '/assets/images/profile-default.jpg';
if (staffPhotoInput.files.length > 0) {
  photoBase64 = await fileToBase64(staffPhotoInput.files[0]);
}
      const staffData = {
        name: staffNameInput.value,
        role: staffRoleInput.value,
        phoneNumber: staffPhoneInput.value,
        mail: staffEmailInput.value,
        image: [photoBase64],
        team: null  //to review
      };

      try {
        if (staffIdInput.value) {
          await updateStaff(staffIdInput.value, staffData);
        } else {
          await addStaff(staffData);
        }
        
        staffModal.style.display = 'none';
        renderStaffs();
        showNotification("Membre enregistré avec succès.", 'success');
      } catch (err) {
        showNotification(err.message || "Erreur lors de l'enregistrement du membre.", 'error');
      } finally {
        staffSubmitBtn.disabled = false;
        staffSubmitBtn.innerHTML = oldBtnContent;
      }
    };
  }

  if (sportForm) {
    sportForm.onsubmit = async (e) => {
      e.preventDefault();
      sportSubmitBtn.disabled = true;
      const oldBtnContent = sportSubmitBtn.innerHTML;
      sportSubmitBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;

      const sportData = {
        name: sportNameInput.value,
        description: sportDescriptionInput.value,
        contact: sportContactInput.value || '',
        image: sportPhotoInput.files.length > 0 ? [await fileToBase64(sportPhotoInput.files[0])] : ['photo-default.jpg']

      };

      try {
        if (sportIdInput.value) {
          await updateSport(sportIdInput.value, sportData);
        } else {
          await addSport(sportData);
        }
        
        sportModal.style.display = 'none';
        renderSports();
        showNotification("Sport enregistré avec succès.", 'success');
      } catch (err) {
        showNotification(err.message || "Erreur lors de l'enregistrement du sport.", 'error');
      } finally {
        sportSubmitBtn.disabled = false;
        sportSubmitBtn.innerHTML = oldBtnContent;
      }
    };
  }

  // Confirmation suppression
  if (confirmDeleteStaffBtn) {
    confirmDeleteStaffBtn.onclick = async () => {
      if (!staffToDelete) return;
      
      confirmDeleteStaffBtn.disabled = true;
      const oldBtnContent = confirmDeleteStaffBtn.innerHTML;
      confirmDeleteStaffBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;
      
      try {
        await deleteStaff(staffToDelete);
        staffToDelete = null;
        deleteStaffModal.style.display = 'none';
        renderStaffs();
        showNotification("Membre supprimé avec succès.", 'success');
      } catch (err) {
        showNotification(err.message || "Erreur lors de la suppression du membre.", 'error');
      } finally {
        confirmDeleteStaffBtn.disabled = false;
        confirmDeleteStaffBtn.innerHTML = oldBtnContent;
      }
    };
  }

  if (confirmDeleteSportBtn) {
    confirmDeleteSportBtn.onclick = async () => {
      if (!sportToDelete) return;
      
      confirmDeleteSportBtn.disabled = true;
      const oldBtnContent = confirmDeleteSportBtn.innerHTML;
      confirmDeleteSportBtn.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle;"></span>`;
      
      try {
        await deleteSport(sportToDelete);
        sportToDelete = null;
        deleteSportModal.style.display = 'none';
        renderSports();
        showNotification("Sport supprimé avec succès.", 'success');
      } catch (err) {
        showNotification(err.message || "Erreur lors de la suppression du sport.", 'error');
      } finally {
        confirmDeleteSportBtn.disabled = false;
        confirmDeleteSportBtn.innerHTML = oldBtnContent;
      }
    };
  }

  // Initialisation du dashboard
  renderStaffs();
  renderSports();
}

// Lancement de l'initialisation
initClub();


