

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
  const selectMenu = document.getElementById('select_nav');
  const sections = document.querySelectorAll('#club_container .container_club > section');

  // Fonction pour afficher la section ciblée
  function showSection(targetId) {
    sections.forEach(section => {
      section.style.display = (section.id === targetId) ? 'block' : 'none';
    });

    // Optionnel : si tu veux remettre la valeur du select à vide après clic
    if (selectMenu) {
      selectMenu.value = targetId;
    }
  }

  // Clic sur les rames
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      showSection(targetId);
    });
  });

  // Changement dans le menu select
  if (selectMenu) {
    selectMenu.addEventListener('change', () => {
      const targetId = selectMenu.value;
      if (targetId) {
        showSection(targetId);
      }
    });
  }

  // Par défaut : afficher la première section
  sections.forEach((section, index) => {
    section.style.display = (index === 0) ? 'block' : 'none';
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll("section");

  galleries.forEach(section => {
    const logos = section.querySelectorAll(".sponsor-logo");
    const popup = section.querySelector(".popup-overlay");

    if (!popup) return;

    const title = popup.querySelector(".popup-title");
    const description = popup.querySelector(".popup-description");
    const image = popup.querySelector(".popup-logo");
    const closeBtn = popup.querySelector(".popup-close");

    logos.forEach(logo => {
      logo.addEventListener("click", () => {
        title.textContent = logo.dataset.title;
        description.textContent = logo.dataset.description;
        image.src = logo.querySelector("img").src;
        image.alt = logo.dataset.title;
        popup.style.display = "flex";
      });
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
});
