import { getPalmares } from "../../service/api/palmaresApi.js";
import { getSports } from "../../service/api/sportApi.js";
import { Palmares } from "../../service/models/Palmares.js";
import { showNotification } from "../showNotification.js";

class PalmaresPage {
  constructor() {
    this.athletes = [];
    this.sports = [];
    this.container = document.getElementById("palmares-container");
    this.lastTrophiesContainer = document.getElementById("last-trophies-container");
    this.loader = document.getElementById("palmares-loader");
    this.message = document.getElementById("palmares-message");
    this.modal = document.getElementById("palmares-modal");
    this.modalContent = document.getElementById("palmares-modal-content");
    this.modalClose = document.getElementById("palmares-modal-close");
    this.init();
  }

  async init() {
    try {
      this.showLoader(true);
      const data = await getPalmares();
      this.athletes = Palmares.fromApi(data);
      this.sports = await getSports();
      this.displayLastTrophies();
      this.displayAthletes();
      this.initModalEvents();
    } catch (error) {
      console.error("Erreur lors du chargement des palmarès:", error);
      this.showMessage("Erreur lors du chargement du palmarès.");
      showNotification("Impossible de charger les données du palmarès", "error");
    } finally {
      this.showLoader(false);
    }
  }

  showLoader(show) {
    if (this.loader) this.loader.style.display = show ? "flex" : "none";
  }

  showMessage(message) {
    if (this.message) {
      this.message.textContent = message;
      this.message.style.display = "block";
    }
  }

  displayAthletes() {
    if (!this.container) return;

    if (this.athletes.length === 0) {
      this.showMessage("Aucun palmarès à afficher.");
      return;
    }

    this.container.innerHTML = this.athletes
      .map((athlete, index) => this.createAthleteCard(athlete, index))
      .join("");

    // Ajout des listeners "Coup d’œil"
    this.attachCardEvents();
  }

  attachCardEvents() {
    const buttons = document.querySelectorAll(".champion-card__btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const index = btn.dataset.index;
        const athlete = this.athletes[parseInt(index)];
        if (athlete) this.showAthleteModal(athlete);
      });
    });
  }

  createAthleteCard(athlete, index) {
    const mainImage = athlete.image || (athlete.images?.length > 0 ? athlete.images[0] : "");
    let sport = this.sports.find(s => s.id == athlete.sport);
    let sportName = sport ? sport.name : athlete.sport ;

    return `
      <div class="champion-card">
        <div class="champion-card__img-wrapper">
          <img src="${mainImage}" alt="${athlete.athleteName}" class="champion-card__img">
        </div>
        <div class="champion-card__info">
          <h3 class="champion-card__name">${athlete.athleteName}</h3>
          <p class="champion-card__meta">${athlete.competition} - ${athlete.year}</p>
          <p class="champion-card__result">${athlete.category} | ${sportName} | ${athlete.gender}</p>
          <span class="champion-card__badge">${athlete.result}</span>
          <button 
  title="Voir" 
  class="champion-card__btn" 
  data-index="${index}"
  style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background-color: #f0f0f0;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  "
>
  <i class="fas fa-eye" aria-hidden="true" style="pointer-events: none;"></i>
</button>


        </div>
      </div>
    `;
  }

  initModalEvents() {
    if (this.modalClose) {
      this.modalClose.addEventListener("click", () => this.closeModal());
    }

    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });
  }

  showAthleteModal(athlete) {
    if (!this.modalContent) return;

    const image = athlete.image || (athlete.images?.length > 0 ? athlete.images[0] : "");
       let sport = this.sports.find(s => s.id == athlete.sport);
    let sportName = sport ? sport.name : athlete.sport ;

    this.modalContent.innerHTML = `
      <img src="${image}" alt="${athlete.athleteName}" class="modal-img">
      <h3>${athlete.athleteName}</h3>
      <p><strong>Année :</strong> ${athlete.year}</p>
      <p><strong>Compétition :</strong> ${athlete.competition}</p>
      <p><strong>Résultat :</strong> ${athlete.result}</p>
      <p><strong>Sport :</strong> ${sportName}</p>
      <p><strong>Catégorie :</strong> ${athlete.category}</p>
      <p><strong>Sexe :</strong> ${athlete.gender}</p>
    `;

    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  displayLastTrophies() {
    if (!this.lastTrophiesContainer) return;

    if (this.athletes.length === 0) {
      this.lastTrophiesContainer.innerHTML = '<p>Aucun trophée à afficher.</p>';
      return;
    }

    // Trier par année décroissante puis par date de création pour avoir les plus récents
    const sortedAthletes = [...this.athletes].sort((a, b) => {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Prendre les 3 premiers (plus récents)
    const lastThreeTrophies = sortedAthletes.slice(0, 3);

    this.lastTrophiesContainer.innerHTML = lastThreeTrophies
      .map((athlete) => this.createTrophyCard(athlete))
      .join("");
  }

  createTrophyCard(athlete) {
    const mainImage = athlete.image || (athlete.images?.length > 0 ? athlete.images[0] : "../assets/images/trophees.png");
    let sport = this.sports.find(s => s.id == athlete.sport);
    let sportName = sport ? sport.name : athlete.sport;

    return `
      <div class="card">
        <img src="${mainImage}" alt="${athlete.athleteName}">
        <div class="card__head">${athlete.result}</div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PalmaresPage();
});
