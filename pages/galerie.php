<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../css/styles.css">
  <title>ACOO: Aviron Orléans</title>
 
</head>

<body class="body-accueil">
  <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>

  <section class="highlighted-image">
    <img src="../assets/images/Galerie1.png" alt="Champions" class="highlighted-image__img">
    <div class="highlighted-image__overlay-box">
      <h1>L’image en vedette de la semaine</h1>
    </div>
  </section>

  <section class="gallery-section">
    <h2 style="text-align: center;">Galerie</h2>

    <form class="search-form" onsubmit="return false;">
      <input type="text" id="searchInput" placeholder="Rechercher une image..." class="search-input">
      <button id="searchBtn" class="btn-primary">Rechercher</button>
    </form>

    <div class="gallery-filters">
      <button class="btn-primary" data-category="Récent">Récent</button>
      <button class="btn-primary" data-category="Paysage">Paysage</button>
      <button class="btn-primary" data-category="Champions">Champions</button>
      <button class="btn-primary" data-category="Avirons">Avirons</button>
      <button class="btn-primary" data-category="Trophées">Trophées</button>
    </div>

    <div class="gallery-section__container">
      <button class="gallery-section__nav gallery-section__nav--prev">‹</button>

      <div class="gallery-images" id="galleryImages">
        <!-- Exemple images -->
        <img src="../assets/images/Galerie1.png" alt="champion aviron" data-category="Champions" class="gallery-img">
        <img src="../assets/images/Galerie2.png" alt="paysage coucher soleil" data-category="Paysage" class="gallery-img">
        <img src="../assets/images/Galerie3.png" alt="trophée équipe" data-category="Trophées" class="gallery-img">
        <img src="../assets/images/Galerie1.png" alt="rivière aviron" data-category="Avirons" class="gallery-img">
        <img src="../assets/images/Galerie2.png" alt="lever de soleil" data-category="Paysage" class="gallery-img">
        <img src="../assets/images/Galerie3.png" alt="champions victoire" data-category="Champions" class="gallery-img">
        <img src="../assets/images/Galerie1.png" alt="aviron trophée" data-category="Trophées" class="gallery-img">
        <img src="../assets/images/Galerie2.png" alt="team aviron" data-category="Avirons" class="gallery-img">
        <img src="../assets/images/Galerie3.png" alt="récent compétition" data-category="Récent" class="gallery-img">
      </div>

      <button class="gallery-section__nav gallery-section__nav--next">›</button>
    </div>

    <div class="gallery-pagination" id="pagination"></div>
    <div class="gallery-page-indicator" id="pageIndicator"></div>
  </section>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const allImages = Array.from(document.querySelectorAll(".gallery-img"));
      const galleryContainer = document.getElementById("galleryImages");
      const searchInput = document.getElementById("searchInput");
      const searchBtn = document.getElementById("searchBtn");
      const filterButtons = document.querySelectorAll(".gallery-filters .btn-primary");
      const pagination = document.getElementById("pagination");
      const pageIndicator = document.getElementById("pageIndicator");
      const btnPrev = document.querySelector(".gallery-section__nav--prev");
      const btnNext = document.querySelector(".gallery-section__nav--next");

      let currentPage = 1;
      const imagesPerPage = 6;
      let filteredImages = [...allImages];
      let activeCategory = "";

      function showImages(page) {
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        galleryContainer.innerHTML = '';

        const start = (page - 1) * imagesPerPage;
        const end = start + imagesPerPage;

        filteredImages.slice(start, end).forEach(img => {
          galleryContainer.appendChild(img);
        });

        updatePagination(totalPages, page);
        pageIndicator.textContent = `Page ${page} sur ${totalPages}`;
        currentPage = page;
      }

      function updatePagination(totalPages, currentPage) {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          if (i === currentPage) btn.classList.add('active');
          btn.addEventListener("click", () => showImages(i));
          pagination.appendChild(btn);
        }
      }

      function filterImages(keyword = "", category = "") {
        filteredImages = allImages.filter(img => {
          const alt = img.alt.toLowerCase();
          const cat = img.dataset.category.toLowerCase();
          return (
            (keyword === "" || alt.includes(keyword.toLowerCase())) &&
            (category === "" || cat === category.toLowerCase())
          );
        });
        showImages(1);
      }

      searchBtn.addEventListener("click", () => {
        filterImages(searchInput.value, activeCategory);
      });

      searchInput.addEventListener("input", () => {
        filterImages(searchInput.value, activeCategory);
      });

      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const category = button.dataset.category;

          if (activeCategory === category) {
            activeCategory = "";
            button.classList.remove("active");
          } else {
            activeCategory = category;
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
          }

          filterImages(searchInput.value, activeCategory);
        });
      });

      btnPrev.addEventListener("click", () => {
        if (currentPage > 1) showImages(currentPage - 1);
      });

      btnNext.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        if (currentPage < totalPages) showImages(currentPage + 1);
      });

      showImages(1);
    });
  </script>

  <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>
</body>

<script src="../script/navbar.js"></script>
<script src="../script/formContact.js"></script>
<script src="../script/galleryCarrousel.js"></script>
</html>
