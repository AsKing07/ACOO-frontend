const cercleContainer = document.querySelector('.cercle');
const years = document.querySelectorAll('.year');
const content = document.getElementById('content');

// Données par année (à adapter avec tes vraies images/textes)
const data = {
  2000: { img: "image2000.jpg", text: "Description 2000" },
  2005: { img: "image2005.jpg", text: "Description 2005" },
  2010: { img: "image2010.jpg", text: "Description 2010" },
  2015: { img: "image2015.jpg", text: "Description 2015" },
  2020: { img: "image2020.jpg", text: "Description 2020" },
  2021: { img: "image2021.jpg", text: "Description 2021" },
  2022: { img: "image2022.jpg", text: "Description 2022" },
  2023: { img: "image2023.jpg", text: "Description 2023" },
  2024: { img: "image2024.jpg", text: "Description 2024" },
  2025: { img: "image2025.jpg", text: "Description 2025" },
  2026: { img: "image2026.jpg", text: "Description 2026" },
  2027: { img: "image2027.jpg", text: "Description 2027" },
  2028: { img: "image2028.jpg", text: "Description 2028" },
  2029: { img: "image2029.jpg", text: "Description 2029" },
  2030: { img: "image2030.jpg", text: "Description 2030" },
  2031: { img: "image2031.jpg", text: "Description 2031" }
};

let selectedIndex = 0;

years.forEach((yearEl, index) => {
  yearEl.addEventListener('click', () => {
    const year = yearEl.textContent;

    // Mettre à jour le contenu à chaque clic
    if (data[year]) {
      content.innerHTML = `
        <img src="${data[year].img}" alt="${year}">
        <p>${data[year].text}</p>
      `;
    }

    // Gérer la sélection visuelle
    document.querySelector('.year.selected')?.classList.remove('selected');
    yearEl.classList.add('selected');

    // Direction du mouvement (index comparé)
    const direction = index > selectedIndex ? 1 : -1;

    // Glissement léger par pas fixe (utile même si élément visible)
    const scrollAmount = 100 * direction;
    cercleContainer.parentElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    selectedIndex = index;
  });
});
