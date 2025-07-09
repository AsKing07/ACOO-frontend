const cercleContainer = document.querySelector('.cercle');
const years = document.querySelectorAll('.year');
const content = document.getElementById('content');

// Données par année (à adapter avec tes vraies images/textes)
const data = {
  1882: { text: "Création de la Société Nautique du Loiret (SNL), sur les bords du Loiret, au niveau du bassin du Saint-Samson." },
  1900: { img: "/assets/images/1900.png", text: "La SNL quitte Olivet pour Orléans. L'aviron orléannais se pratique alors sur la Loire, au niveau du quai Barentin, à côté du Pont Joffre (emplacem" },
  1920: { img: "/assets/images/1920.png", text: "Création du club omnisports, garage Paul Besnard, sur le quai Saint-Laurent." },
  1926: { text: "Scission entre le club omnisports et la SNL Section aviron. Celle-ci retrouve son autonomie et prend le nom de la Société Nautique d'Orléans (SNO)." },
  1955: { img: "/assets/images/1955.png", text: "Arrivée de Marcel Baratta au sein de la SNO." },
  1958: { text: "La SNO reprend ses quartiers sur le Loiret et déménage ses locaux au Parc du Poutyl à Olivet." },
  1970: { text: "Inauguration du Centre Marcel Baratta (actuels locaux du club). La SNO devient la Société Nautique Orléans Olivet." },
  1982: { text: "Centenaire du club." },
  1992: { text: "Fusion entre la Section USO Aviron et la SNOO." },
  1994: { text: "Création de l'association au titre de l'Aviron Club d'Orléans Olivet (ACOO)." },
  2025: { text: "Refonte du site internet de l'association de l'Aviron Club d'Orléans Olivet (ACOO)." }
};

let selectedIndex = 0;

years.forEach((yearEl, index) => {
  yearEl.addEventListener('click', () => {
    const year = yearEl.textContent;

    // Mettre à jour le contenu à chaque clic
    if (data[year].img) {
      content.innerHTML = `
        <img src="${data[year].img}" alt="${year}">
        <p>${data[year].text}</p>
      `;
    }else{
      content.innerHTML = `
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
