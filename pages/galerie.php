<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <title>ACOO: Aviron Orléans - Galerie</title>
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>

    <style>
  html {
    scroll-behavior: smooth;
  }
</style>

</head>

<body class="body-gallery">
    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

    <!-- Section image en vedette -->
    <section class="highlighted-image">
  <div id="featured-image-container">
    <img src="../assets/images/Galerie1.png" alt="Image en vedette" class="highlighted-image__img" id="featured-img">
    <div class="highlighted-image__overlay-box">
  <div class="overlay-header">
    <h1>L'image en vedette de la semaine</h1>
    <a href="#gallery-section" class="go-down-btn" aria-label="Aller à la galerie">
      <i class="fas fa-arrow-down"></i>
    </a>
  </div>
  <p class="featured-description" id="featured-description">
    Découvrez les moments forts de notre club d'aviron
  </p>
</div>

  </div>
  <div class="featured-loader" id="featured-loader" style="display: none;">
    <div class="loader-spinner"></div>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    {
      src: "../assets/images/Galerie1.png",
      desc: "Découvrez les moments forts de notre club d'aviron"
    },
    {
      src: "../assets/images/Galerie2.png",
      desc: "Un paysage paisible au lever du soleil"
    },
    {
      src: "../assets/images/Galerie3.png",
      desc: "Nos champions célébrant leur victoire"
    }
  ];

  const imgElement = document.getElementById("featured-img");
  const descElement = document.getElementById("featured-description");
  const loader = document.getElementById("featured-loader");

  let currentIndex = 0;

  function changeImage() {
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.classList.add("fade-out");

      setTimeout(() => {
        imgElement.src = images[currentIndex].src;
        descElement.textContent = images[currentIndex].desc;
        imgElement.classList.remove("fade-out");
        imgElement.classList.add("fade-in");
        loader.style.display = "none";

        setTimeout(() => imgElement.classList.remove("fade-in"), 500);
      }, 500);
    }, 300);
  }

  setInterval(changeImage, 5000); 
});
</script>


    <!-- Section galerie principale -->
    <section class="gallery-section" id="gallery-section">
       <div class="gallery-header">
            <h2>Découvrez Notre Galerie</h2>
            <p class="gallery-subtitle">Explorez les moments mémorables de notre club d'aviron</p>
        </div>

        <!-- Contrôles de recherche et filtres -->
        <div class="gallery-controls">
            <form class="search-form" onsubmit="return false;">
                <div class="search-container">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="searchInput" placeholder="Rechercher une image..." class="search-input">
                    <button type="button" id="clearSearch" class="clear-search" style="display: none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </form>

            <!-- Filtres par galerie -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-gallery="all">
                    <i class="fas fa-th"></i>
                    <span>Toutes</span>
                </button>
                <div id="gallery-filters-container">
                    <!-- Les filtres seront générés dynamiquement -->
                </div>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="gallery-stats" id="gallery-stats">
            <div class="stat-item">
                <span class="stat-number" id="total-images">0</span>
                <span class="stat-label">Images</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="total-galleries">0</span>
                <span class="stat-label">Galeries</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="filtered-count">0</span>
                <span class="stat-label">Affichées</span>
            </div>
        </div>

        <!-- Loader principal -->
        <div class="gallery-loader" id="gallery-loader">
            <div class="loader-spinner"></div>
            <p>Chargement des images...</p>
        </div>

        <!-- Conteneur des images -->
        <div class="gallery-main">
            <div class="gallery-section__container">
                <button class="gallery-section__nav gallery-section__nav--prev" id="nav-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <div class="gallery-images" id="galleryImages">
                    <!-- Les images seront chargées dynamiquement -->
                </div>

                <button class="gallery-section__nav gallery-section__nav--next" id="nav-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <!-- Message d'absence d'images -->
            <div class="no-images-message" id="no-images-message" style="display: none;">
                <i class="fas fa-images"></i>
                <h3>Aucune image trouvée</h3>
                <p>Aucune image ne correspond à vos critères de recherche.</p>
            </div>
        </div>

        <!-- Pagination -->
        <div class="gallery-pagination-container">
            <div class="gallery-pagination" id="pagination"></div>
            <div class="gallery-page-indicator" id="pageIndicator"></div>
        </div>
    </section>

    <!-- Lightbox pour affichage grand format -->
    <div class="lightbox" id="lightbox" style="display: none;">
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" id="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-nav lightbox-prev" id="lightbox-prev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav lightbox-next" id="lightbox-next">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="" alt="" id="lightbox-image">
                <div class="lightbox-loader" id="lightbox-loader">
                    <div class="loader-spinner"></div>
                </div>
            </div>
            <div class="lightbox-info">
                <h3 id="lightbox-title"></h3>
                <p id="lightbox-description"></p>
                <div class="lightbox-meta">
                    <span class="lightbox-gallery" id="lightbox-gallery"></span>
                    <span class="lightbox-date" id="lightbox-date"></span>
                </div>
                <div class="lightbox-counter" id="lightbox-counter"></div>
            </div>
        </div>
    </div>

    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>

    <script>
      
    </script>
    <!-- Scripts -->
    <script type="module" src="../script/pages/gallery.js"></script>
    <script src="../script/navbar.js"></script>
</body>
</html>
