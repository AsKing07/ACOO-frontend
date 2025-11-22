import { getEvents } from '../../../service/api/eventsApi.js';

function parseDate(datetimeStr) {
    if (!datetimeStr) return null;
    const [datePart, timePart] = datetimeStr.split(' ');
    if (!datePart || !timePart) return null;

    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    if (!day || !month || !year || !hours || !minutes) return null;

    // new Date(year, monthIndex, day, hours, minutes)
    return new Date(year, month - 1, day, hours, minutes);
}

function formatDate(datetimeStr) {
  const date = parseDate(datetimeStr);
  if (!date) return 'Date invalide';

  const day = date.toLocaleString('fr-FR', { day: 'numeric' });
  const month = date.toLocaleString('fr-FR', { month: 'long' });

  return `${day} ${month}`;
}

async function showLastTwoEvents() {
  try {
    const allEvents = await getEvents();

    const sorted = allEvents
      .filter(e => {
        if (!e.startDatetime) return false;
        const date = parseDate(e.startDatetime);
        return date && !isNaN(date.getTime());
      })
      .sort((a, b) => {
          const dateA = parseDate(a.startDatetime);
          const dateB = parseDate(b.startDatetime);
          return (dateB || 0) - (dateA || 0);
      });

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
