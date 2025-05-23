
const galleryImages = [
  '../assets/images/Galerie1.png',
  '../assets/images/Galerie2.png',
  '../assets/images/Galerie3.png'
];
let currentIndex = 0;
const imageElements = document.querySelectorAll('.gallery-section__image');
const prevBtn = document.querySelector('.gallery-section__nav--prev');
const nextBtn = document.querySelector('.gallery-section__nav--next');

function updateGallery() {
  imageElements.forEach((img, i) => {
    const imageIndex = (currentIndex + i) % galleryImages.length;
    img.src = galleryImages[imageIndex];
  });
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