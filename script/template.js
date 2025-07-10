    const select = document.getElementById('component-select');
    const container = document.getElementById('component-container');

    select.addEventListener('change', function() {
    const value = this.value;
    if (!value) {
        container.innerHTML = "<p style='text-align:center;color:#888;'>Sélectionnez un composant dans le menu déroulant pour l’afficher ici.</p>";
        return;
    }
    fetch(value)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;

            // Charger dynamiquement le script associé
            if (value.includes('formContact.php')) {
                import('../script/pages/contact/formContact.js');
            }
            if (value.includes('gallery_carousel.php')) {
                import('../script/galleryCarrousel.js');
            }
            if (value.includes('faq.php')) {
                import('../script/pages/contact/faq.js');
            }
            // Ajoute d'autres conditions selon tes besoins
        })
        .catch(() => {
            container.innerHTML = "<p style='color:red;text-align:center;'>Erreur lors du chargement du composant.</p>";
        });
});