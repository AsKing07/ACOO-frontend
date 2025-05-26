/**
 * Affiche une notification flottante.
 * @param {string} message - Le message à afficher.
 * @param {'success'|'error'|'warning'|'info'} [type='info'] - Le type de notification.
 * @param {number} [duration=3500] - Durée d'affichage en ms.
 */
export function showNotification(message, type = 'info', duration = 3500) {
    console.log(`Notification: ${message} (type: ${type}, durée: ${duration}ms)`);
  // Crée le conteneur s'il n'existe pas
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
  }

  // Crée la notif
  const notif = document.createElement('div');
  notif.className = `notification notification--${type}`;
  notif.textContent = message;

  // Animation d'apparition
  notif.style.opacity = '0';
  notif.style.transition = 'opacity 0.3s';
  setTimeout(() => notif.style.opacity = '1', 10);

  container.appendChild(notif);

  // Disparition automatique
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => container.removeChild(notif), 300);
  }, duration);
}