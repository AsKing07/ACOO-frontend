const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const slideWidth = 320;
let currentIndex = 0;

const totalSlides = track.children.length;
const visibleSlides = 3;
const maxIndex = totalSlides - visibleSlides;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 < 0) ? maxIndex : currentIndex - 1;
  updateCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll('#menu_club .ram');
  const sections = document.querySelectorAll('#club_container .container_club > section');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');

      sections.forEach(section => {
        if (section.id === targetId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // Optionnel : afficher par défaut la première section uniquement
  sections.forEach((section, index) => {
    section.style.display = (index === 0) ? 'block' : 'none';
  });
});
