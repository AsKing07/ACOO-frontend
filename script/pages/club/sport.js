


function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 240; // approx width + gap
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function updateArrowVisibility() {
    const carousel = document.getElementById('carousel');
    const leftBtn = document.querySelector('.carousel-btn.left');
    const rightBtn = document.querySelector('.carousel-btn.right');

    const isScrollable = carousel.scrollWidth > carousel.clientWidth;

    leftBtn.style.display = isScrollable ? 'block' : 'none';
    rightBtn.style.display = isScrollable ? 'block' : 'none';
}

window.addEventListener('load', updateArrowVisibility);
window.addEventListener('resize', updateArrowVisibility);