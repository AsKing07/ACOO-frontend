const cercleContainer = document.querySelector('.cercle');
const years = document.querySelectorAll('.year');
const content = document.getElementById('content');

// Données par année (à adapter avec tes vraies images/textes)
const data = {
  1882: { img: "image2000.jpg", text: "Création de la Société Nautique du Loiret (SNL), sur les bords du Loiret, au niveau du bassin du Saint-Samson." },
  1900: { img: "image2005.jpg", text: "La SNL quitte Olivet pour Orléans. L'aviron orléannais se pratique alors sur la Loire, au niveau du quai Barentin, à côté du Pont Joffre (emplacem" },
  1920: { img: "image2010.jpg", text: "Création du club omnisports, garage Paul Besnard, sur le quai Saint-Laurent." },
  1926: { img: "image2015.jpg", text: "Scission entre le club omnisports et la SNL Section aviron. Celle-ci retrouve son autonomie et prend le nom de la Société Nautique d'Orléans (SNO)." },
  1955: { img: "image2020.jpg", text: "Arrivée de Marcel Baratta au sein de la SNO." },
  1958: { img: "image2021.jpg", text: "La SNO reprend ses quartiers sur le Loiret et déménage ses locaux au Parc du Poutyl à Olivet." },
  1970 : { img: "image2022.jpg", text: "Inauguration du Centre Marcel Baratta (actuels locaux du club). La SNO devient la Société Nautique Orléans Olivet." },
  1982: { img: "image2023.jpg", text: "Centenaire du club." },
  1992: { img: "image2024.jpg", text: "Fusion entre la Section USO Aviron et la SNOO." },
  1994: { img: "image2025.jpg", text: "Création de l'association au titre de l'Aviron Club d'Orléans Olivet (ACOO)." },
 
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
