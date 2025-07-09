import { showNotification } from "../showNotification.js";

export function initMessagerieDashboard() {
  // Supprimer une conversation
  document.querySelectorAll('.btn-supprimer').forEach(button => {
    button.addEventListener('click', () => {
      const conversation = button.closest('.conversation');
      const name = conversation.querySelector('.name')?.textContent || "cet utilisateur";

      if (confirm(`Supprimer la conversation avec ${name} ?`)) {
        conversation.remove();
        showNotification(`Conversation avec ${name} supprimée.`, "success");
      }
    });
  });

  // Répondre à une conversation
  document.querySelectorAll('.btn-repondre').forEach(button => {
    button.addEventListener('click', () => {
      const conversation = button.closest('.conversation');
      const name = conversation.querySelector('.name')?.textContent || "utilisateur inconnu";
      const lastMsg = conversation.querySelector('.last-msg');

      const response = prompt(`Répondre à ${name} :`);
      if (response) {
        lastMsg.textContent = response;
        showNotification(`Réponse envoyée à ${name}.`, "success");

        // Tu peux ici envoyer la réponse à un backend via fetch/ajax si besoin
      }
    });
  });
}
// initMessagerieDashboard();