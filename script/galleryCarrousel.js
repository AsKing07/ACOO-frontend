import { getPictures } from "../service/api/pictureApi.js";

let galleryImages = [
  '../assets/images/Galerie1.png',
  '../assets/images/Galerie2.png',
  '../assets/images/Galerie3.png'
];

const container = document.querySelector('.gallery-section__container');
const track = container.querySelector('.gallery-section__track');
const prevBtn = container.querySelector('.gallery-section__nav--prev');
const nextBtn = container.querySelector('.gallery-section__nav--next');

function renderImages() {
  track.innerHTML = ''; // Nettoie le track avant d’injecter

  galleryImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'gallery-section__image';
    img.alt = `Photo ${i + 1}`;
    img.src = src;
    track.appendChild(img);
  });
}

// Fonction pour défiler horizontalement
function scrollTrack(direction = 'next') {
  const scrollAmount = 250; // adapte selon taille image
  if (direction === 'next') {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
}

async function loadCarouselImages() {
  try {
    const pictures = await getPictures();
    galleryImages = pictures.slice(0, 10).map(pic => pic.image);
    renderImages();
  } catch (e) {
    console.error('Erreur lors du chargement des images du carrousel', e);
    renderImages(); // fallback en local
  }
}

// Écouteurs sur les flèches
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => scrollTrack('prev'));
  nextBtn.addEventListener('click', () => scrollTrack('next'));
}

document.addEventListener('DOMContentLoaded', loadCarouselImages);
