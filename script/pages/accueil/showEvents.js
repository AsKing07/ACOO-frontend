import { getEvents } from '../../../service/api/eventsApi.js';

function formatDate(datetimeStr) {
  const date = new Date(datetimeStr);
  console.log('Formatted date:', date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

async function showLastTwoEvents() {
  try {
    const allEvents = await getEvents();

    const sorted = allEvents
      .filter(e => {
        // Vérifier que startDatetime existe et n'est pas vide
        if (!e.startDatetime) return false;
        
        // Vérifier que la date est valide après conversion
        const date = new Date(e.startDatetime);
        return !isNaN(date.getTime());
      })
      .sort((a, b) => new Date(b.startDatetime) - new Date(a.startDatetime));

    const twoLatest = sorted.slice(0, 2);

    const container = document.getElementById('event-section-accueil__cards');
    container.innerHTML = twoLatest.map(event => `
        <div class="event-mini-card">
            <div class="event-mini-card__date">
                <span class="event-mini-card__day">${formatDate(event.startDatetime)}</span>
            </div>
            <div class="event-mini-card__divider"></div>
            <div class="event-mini-card__content">
                <div class="event-mini-card__title">${event.title}</div>
                <div class="event-mini-card__desc">${event.content || 'Pas de description.'}</div>
            </div>
        </div>
    `).join('');
  } catch (err) {
    console.error(err);
    document.getElementById('event-section-accueil__cards').textContent = "Erreur lors du chargement des événements.";
  }
}

showLastTwoEvents();