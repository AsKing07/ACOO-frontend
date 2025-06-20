import { getPictures } from "../service/api/pictureApi.js";

let galleryImages = [
  '../assets/images/Galerie1.png',
  '../assets/images/Galerie2.png',
  '../assets/images/Galerie3.png'
];
let currentIndex = 0;

const container = document.querySelector('.gallery-section__container');
const prevBtn = container.querySelector('.gallery-section__nav--prev');
const nextBtn = container.querySelector('.gallery-section__nav--next');

function renderImages() {
  // Supprime les anciennes images
  container.querySelectorAll('.gallery-section__image').forEach(img => img.remove());

  galleryImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'gallery-section__image';
    img.alt = `Photo ${i + 1}`;
    img.src = src;
    // Insère juste avant le bouton "next"
    container.insertBefore(img, nextBtn);
  });
}

function updateGallery() {
  // Décale les images selon currentIndex
  const imagesToShow = [];
  for (let i = 0; i < galleryImages.length; i++) {
    const idx = (currentIndex + i) % galleryImages.length;
    imagesToShow.push(galleryImages[idx]);
  }
  // Met à jour le DOM
  galleryImages = imagesToShow;
  renderImages();
}

async function loadCarouselImages() {
  try {
    const pictures = await getPictures();
    galleryImages = pictures.slice(0, 5).map(pic => pic.image);
    updateGallery();
  } catch (e) {
    console.error('Erreur lors du chargement des images du carrousel', e);
    updateGallery();
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGallery();
  });
}

document.addEventListener('DOMContentLoaded', loadCarouselImages);