import { showNotification } from "../showNotification.js";
import { getMessagerie, deleteMessagerie } from "../../service/api/messagerieApi.js";

export function initMessagerieDashboard() {
  const messagerieContainer = document.querySelector('.conversation-list');
  const searchInput = document.querySelector('.search-bar input');

  let conversations = [];

  // Fonction pour créer un élément conversation DOM
  function createConversationElement(message) {
    const div = document.createElement('div');
    div.className = 'conversation';
    div.dataset.id = message.id;

    div.innerHTML = `
      <div class="avatar">
        <i class="fa fa-user-circle"></i>
      </div>
      <div class="details">
        <div class="name">${message.name}</div>
        <div class="phone">${message.mail}</div>
        <div class="last-msg">${message.subject || ''}</div>
        <div class="status actif">Actif</div>
      </div>
      <div class="actions">
        <button class="btn-repondre">Répondre</button>
        <button class="btn-supprimer">Supprimer</button>
      </div>
    `;

    // Bouton répondre : ouvre client mail local
    div.querySelector('.btn-repondre').addEventListener('click', () => {
      // Ouvre le client mail local avec mailto:
      const mailtoLink = `mailto:${encodeURIComponent(message.mail)}?subject=${encodeURIComponent('Re: ' + (message.subject || ''))}`;
      window.location.href = mailtoLink;
    });

    // Bouton supprimer : supprime via API et met à jour l'affichage
    div.querySelector('.btn-supprimer').addEventListener('click', async () => {
      if (confirm(`Supprimer la conversation avec ${message.name} ?`)) {
        try {
          await deleteMessagerie(message.id);
          // Retirer de la liste locale
          conversations = conversations.filter(c => c.id !== message.id);
          renderConversations(conversations);
          showNotification(`Conversation avec ${message.name} supprimée.`, "success");
        } catch (error) {
          console.error(error);
          showNotification(`Erreur lors de la suppression de la conversation avec ${message.name}.`, "error");
        }
      }
    });

    return div;
  }

  // Fonction pour afficher la liste des conversations
  function renderConversations(list) {
    messagerieContainer.innerHTML = '';
    if (list.length === 0) {
      messagerieContainer.innerHTML = '<p>Aucune conversation trouvée.</p>';
      return;
    }
    list.forEach(message => {
      const convEl = createConversationElement(message);
      messagerieContainer.appendChild(convEl);
    });
  }

  // Fonction de filtrage par recherche
  function filterConversations(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = conversations.filter(c =>
      c.name.toLowerCase().includes(lowerKeyword) ||
      c.mail.toLowerCase().includes(lowerKeyword) ||
      (c.subject && c.subject.toLowerCase().includes(lowerKeyword))
    );
    renderConversations(filtered);
  }

  // Chargement initial des conversations depuis l'API
  async function loadConversations() {
    try {
      conversations = await getMessagerie();
      renderConversations(conversations);
    } catch (error) {
      console.error(error);
      showNotification("Erreur lors du chargement des conversations.", "error");
    }
  }

  // Événement recherche
  searchInput.addEventListener('input', (e) => {
    filterConversations(e.target.value);
  });

  // Chargement initial
  loadConversations();
}

// initMessagerieDashboard();