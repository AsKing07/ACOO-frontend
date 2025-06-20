import { showNotification } from "../showNotification.js";
import { User } from "../../service/models/User.js";
import { getAdmins, addAdmin, updateAdmin, deleteAdmin, getCurrentAdmin } from "../../service/api/adminApi.js";

export function initAdminProfilDashboard() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAdminDashboard);
    } else {
        initializeAdminDashboard();
    }
}

function initializeAdminDashboard() {
    console.log('Initialisation du dashboard des administrateurs...');

    // Variables globales internes à la fonction
    let allAdmins = [];
    let filteredAdmins = [];
    let currentAdmin = null;
    let deleteAdminId = null;

    // Éléments DOM
    const adminsTableBody = document.getElementById('admins-table-body');
    const adminsLoader = document.getElementById('admins-loader');
    const adminsCount = document.getElementById('admins-count');
    const noAdminsMessage = document.getElementById('no-admins-message');
    const searchInput = document.getElementById('search-admins');

    const deleteAdminModal = document.getElementById('delete-admin-modal');
    const adminForm = document.getElementById('adminForm');
    const profileForm = document.getElementById('profileForm');

    const adminListSection = document.getElementById('adminListSection');
    const adminProfileSection = document.getElementById('adminProfileSection');

    function initDOMElements() {
        const elements = {
            adminsTableBody,
            adminsLoader,
            searchInput,
            adminForm,
            profileForm
        };
        const missingElements = Object.entries(elements).filter(([_, el]) => !el);
        if (missingElements.length > 0) {
            console.error('Éléments DOM manquants:', missingElements.map(([key]) => key));
            return false;
        }
        return true;
    }

    function toggleLoader(show) {
        if (adminsLoader) {
            adminsLoader.style.display = show ? 'block' : 'none';
        }
    }

    function updateAdminsCount() {
        if (adminsCount) {
            adminsCount.textContent = `${filteredAdmins.length} administrateur(s)`;
        }
    }

    function renderAdminRow(admin) {
        const currentUser = User.getCurrentUser();
        const isCurrentUser = currentUser && currentUser.id === admin.id;

        return `
            <tr data-admin-id="${admin.id}">
                <td>
                    <div class="admin-info">
                        <div class="admin-avatar">${admin.getInitials()}</div>
                        <div class="admin-details">
                            <div class="admin-name">${admin.username}</div>
                        </div>
                    </div>
                </td>
                <td>${admin.email}</td>
                <td>
                    <span class="status-badge ${isCurrentUser ? 'current' : 'other'}">
                        ${isCurrentUser ? 'Vous' : 'Autre'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn delete-btn" 
                                onclick="confirmDeleteAdmin('${admin.id}', '${admin.username}')" 
                                title="Supprimer"
                                ${isCurrentUser ? 'disabled' : ''}>
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    function renderAdminsTable() {
        if (!adminsTableBody) return;

        if (filteredAdmins.length === 0) {
            adminsTableBody.innerHTML = '';
            if (noAdminsMessage) noAdminsMessage.style.display = 'block';
        } else {
            if (noAdminsMessage) noAdminsMessage.style.display = 'none';
            adminsTableBody.innerHTML = filteredAdmins.map(renderAdminRow).join('');
        }
        updateAdminsCount();
    }

    function filterAdmins() {
        if (!searchInput) return;

        const searchTerm = searchInput.value.toLowerCase();
        filteredAdmins = allAdmins.filter(admin =>
            admin.username.toLowerCase().includes(searchTerm) ||
            admin.email.toLowerCase().includes(searchTerm)
        );

        renderAdminsTable();
    }

    async function loadAdmins() {
        try {
            toggleLoader(true);
            allAdmins = await getAdmins();
            filteredAdmins = [...allAdmins];
            renderAdminsTable();
        } catch (error) {
            console.error('Erreur lors du chargement des administrateurs:', error);
            showNotification('Erreur lors du chargement des administrateurs', 'error');
        } finally {
            toggleLoader(false);
        }
    }

    async function loadCurrentProfile() {
        try {
            currentAdmin = await getCurrentAdmin();
            const profileId = document.getElementById('profile-id');
            const profileUsername = document.getElementById('profile-username');
            const profileEmail = document.getElementById('profile-email');
            const profileInitials = document.getElementById('profile-initials');

            if (profileId) profileId.value = currentAdmin.id;
            if (profileUsername) profileUsername.value = currentAdmin.username;
            if (profileEmail) profileEmail.value = currentAdmin.email;
            if (profileInitials) profileInitials.textContent = currentAdmin.getInitials();
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error);
            showNotification('Erreur lors du chargement du profil', 'error');
        }
    }

    window.confirmDeleteAdmin = function (adminId, adminName) {
        deleteAdminId = adminId;
        const deleteNameEl = document.getElementById('delete-admin-name');
        if (deleteNameEl) deleteNameEl.textContent = adminName;

        if (deleteAdminModal) {
            deleteAdminModal.classList.add('show');
            deleteAdminModal.style.display = 'flex';
        }
    };

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    function attachEventListeners() {
        const toggleFormBtn = document.getElementById('toggleFormBtn');
        if (toggleFormBtn) {
            toggleFormBtn.addEventListener('click', () => {
                if (adminForm) {
                    const isHidden = adminForm.classList.contains('hidden');
                    adminForm.classList.toggle('hidden');
                    if (isHidden) {
                        adminForm.reset();
                        adminForm.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }

        const closeFormBtn = document.getElementById('closeFormBtn');
        if (closeFormBtn && adminForm) {
            closeFormBtn.addEventListener('click', () => {
                adminForm.classList.add('hidden');
            });
        }

        const cancelFormBtn = document.getElementById('cancel-admin-btn');
        if (cancelFormBtn) {
            cancelFormBtn.addEventListener('click', () => {
                adminForm.classList.add('hidden');
            });
        }


        const toggleViewBtn = document.getElementById('toggleViewBtn');
        if (toggleViewBtn) {
            toggleViewBtn.addEventListener('click', () => {
                const isListVisible = !adminListSection.classList.contains('hidden');
                if (adminListSection) adminListSection.classList.toggle('hidden');
                if (adminProfileSection) adminProfileSection.classList.toggle('hidden');

                toggleViewBtn.innerHTML = isListVisible ?
                    '<i class="fas fa-list"></i> Afficher la liste des administrateurs' :
                    '<i class="fas fa-user-edit"></i> Afficher mon profil';

                if (!isListVisible) {
                    loadCurrentProfile();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterAdmins);
        }

        if (adminForm) {
            adminForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                const formData = {
                    username: document.getElementById('admin-username').value.trim(),
                    email: document.getElementById('admin-email').value.trim(),
                    password: document.getElementById('admin-password').value
                };
                if (!formData.username || !formData.email || !formData.password) {
                    showNotification('Tous les champs sont requis', 'error');
                    return;
                }

                try {
                    const submitBtn = document.getElementById('admin-submit-btn');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.querySelector('.btn-text').textContent = 'Ajout...';
                    }

                    await addAdmin(formData);
                    showNotification('Administrateur ajouté avec succès', 'success');
                    adminForm.reset();
                    adminForm.classList.add('hidden');
                    await loadAdmins();

                } catch (error) {
                    console.error('Erreur lors de l\'ajout:', error);
                    showNotification(error.message, 'error');
                } finally {
                    const submitBtn = document.getElementById('admin-submit-btn');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.querySelector('.btn-text').textContent = 'Ajouter';
                    }
                }
            });
        }

        if (profileForm) {
            profileForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                const adminId = document.getElementById('profile-id').value;
                const formData = {
                    username: document.getElementById('profile-username').value.trim(),
                    email: document.getElementById('profile-email').value.trim(),
                    password: document.getElementById('profile-password').value.trim()
                };

                if (!formData.username || !formData.email) {
                    showNotification('Le nom d\'utilisateur et l\'email sont requis', 'error');
                    return;
                }

                try {
                    const submitBtn = document.getElementById('profile-submit-btn');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.querySelector('.btn-text').textContent = 'Sauvegarde...';
                    }

                    await updateAdmin(adminId, formData);
                    showNotification('Profil mis à jour avec succès', 'success');

                    currentAdmin.username = formData.username;
                    currentAdmin.email = formData.email;

                    document.getElementById('profile-password').value = '';
                    await loadAdmins();

                } catch (error) {
                    console.error('Erreur lors de la mise à jour:', error);
                    showNotification(error.message, 'error');
                } finally {
                    const submitBtn = document.getElementById('profile-submit-btn');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.querySelector('.btn-text').textContent = 'Sauvegarder';
                    }
                }
            });
        }

        const closeDeleteBtn = document.getElementById('close-delete-admin-modal');
        const cancelDeleteBtn = document.getElementById('cancel-delete-admin-btn');

        if (closeDeleteBtn && deleteAdminModal) {
            closeDeleteBtn.addEventListener('click', () => closeModal(deleteAdminModal));
        }

        if (cancelDeleteBtn && deleteAdminModal) {
            cancelDeleteBtn.addEventListener('click', () => closeModal(deleteAdminModal));
        }

        const confirmDeleteBtn = document.getElementById('confirm-delete-admin-btn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', async function () {
                if (!deleteAdminId) return;

                try {
                    this.disabled = true;
                    this.textContent = 'Suppression...';
                    await deleteAdmin(deleteAdminId);
                    showNotification('Administrateur supprimé avec succès', 'success');
                    closeModal(deleteAdminModal);
                    await loadAdmins();

                } catch (error) {
                    console.error('Erreur lors de la suppression:', error);
                    showNotification(error.message, 'error');
                } finally {
                    this.disabled = false;
                    this.textContent = 'Supprimer';
                    deleteAdminId = null;
                }
            });
        }

        if (deleteAdminModal) {
            deleteAdminModal.addEventListener('click', function (e) {
                if (e.target === deleteAdminModal) {
                    closeModal(deleteAdminModal);
                }
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (deleteAdminModal && deleteAdminModal.classList.contains('show')) {
                    closeModal(deleteAdminModal);
                }
            }
        });
    }

    if (!initDOMElements()) {
        console.error('Échec de l\'initialisation des éléments DOM');
        return;
    }

    attachEventListeners();
    loadAdmins();
    loadCurrentProfile();
}


// Initialisation automatique
// initAdminProfilDashboard();
