const monthNames = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
];

const calendar = document.querySelector('.calendar');
const monthDisplay = calendar.querySelector('.month');
const calendarGrid = calendar.querySelector('.grid-calendar');
const prevBtn = calendar.querySelector('button:first-of-type');
const nextBtn = calendar.querySelector('button:last-of-type');

let currentDate = new Date(); // toujours la date visible

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDayOfPreviousMonth = new Date(year, month, 0);

  const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Lundi = 0
  const totalDays = lastDayOfMonth.getDate();
  const prevMonthDays = lastDayOfPreviousMonth.getDate();

  calendarGrid.innerHTML = '';

  // Jours du mois précédent
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const div = document.createElement('div');
    div.className = 'day adjacent';
    div.textContent = day;
    calendarGrid.appendChild(div);
  }

  // Jours du mois courant
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  for (let i = 1; i <= totalDays; i++) {
    const div = document.createElement('div');
    div.className = 'day';
    div.textContent = i;

    if (isCurrentMonth && i === today.getDate()) {
      div.style.border = '2px solid white';
    }

    calendarGrid.appendChild(div);
  }

  // Jours du mois suivant
  const totalDisplayed = startDay + totalDays;
  const remaining = 42 - totalDisplayed;

  for (let i = 1; i <= remaining; i++) {
    const div = document.createElement('div');
    div.className = 'day adjacent';
    div.textContent = i;
    calendarGrid.appendChild(div);
  }

  // Mise à jour du mois + année
  monthDisplay.innerHTML = `${monthNames[month]}<br>${year}`;
}

// Navigation
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Initialisation
renderCalendar(currentDate);
