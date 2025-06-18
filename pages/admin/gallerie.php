<main class="body-gallerie-dashboard">
    <div class="main-container">
        <h1>GALERIE</h1>

        <div class="upload-galerie">
            <h2>Déposez une nouvelle image dans la galerie</h2>

            <div class="upload-box">
                <input type="file" id="fileInput" accept="image/*">
                <label for="fileInput">Cliquez ou glissez une image ici</label>
            </div>

            <div class="select-folder">
                <label for="folderSelect">Choisir un dossier :</label>
                <select id="folderSelect">
                <option value="aviron">Aviron</option>
                <option value="competitions">Compétitions</option>
                <option value="paysage">Paysage</option>
                </select>
            </div>
        </div>

        <div class="galerie">
            <h2>Galerie d'images</h2>

            <div class="folder">
                <h3>Aviron</h3>
                <div class="images-grid">
                <img src="aviron1.jpg" alt="Aviron 1">
                <img src="aviron2.jpg" alt="Aviron 2">
                <img src="aviron3.jpg" alt="Aviron 3">
                </div>
            </div>

            <div class="folder">
                <h3>Compétitions</h3>
                <div class="images-grid">
                <img src="competition1.jpg" alt="Compétition 1">
                <img src="competition2.jpg" alt="Compétition 2">
                </div>
            </div>

            <div class="folder">
                <h3>Paysage</h3>
                <div class="images-grid">
                <img src="paysage1.jpg" alt="Paysage 1">
                <img src="paysage2.jpg" alt="Paysage 2">
                <img src="paysage3.jpg" alt="Paysage 3">
                <img src="paysage4.jpg" alt="Paysage 4">
                </div>
            </div>
        </div>

    </div>
</main>