import { showNotification } from "../showNotification.js";


export function initAdminProfilDashboard() {
    // Ici sera le code JavaScript pour gérer le tableau de bord des profils administrateurs
    showNotification("Le tableau de bord des profils administrateurs est en cours de développement.", "info");
}
initAdminProfilDashboard();

// Remarque: Le code ci-dessus est un espace réservé pour la fonctionnalité du tableau de bord des profils administrateurs.
// Il n'y a pas de logique spécifique implémentée pour le moment.

// Toggle formulaire d’ajout d’admin
document.getElementById('toggleFormBtn').addEventListener('click', () => {
  const form = document.getElementById('adminForm');
  form.classList.toggle('hidden');
});

// Toggle entre liste et profil
document.getElementById('toggleViewBtn').addEventListener('click', () => {
  const list = document.getElementById('adminListSection');
  const profile = document.getElementById('adminProfileSection');
  const btn = document.getElementById('toggleViewBtn');

  const isListVisible = !list.classList.contains('hidden');

  // Toggle visibility
  list.classList.toggle('hidden');
  profile.classList.toggle('hidden');

  // Change button text
  btn.textContent = isListVisible ? 'Afficher la liste des administrateurs' : 'Afficher mon profil';
});
