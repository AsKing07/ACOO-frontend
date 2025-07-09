<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin="">
    </script>
    <script defer data-domain="acoo.charbelsnn.com" src="https://plausible.io/js/script.file-downloads.outbound-links.js"></script>

    <title>Club</title>
</head>
<body>

    <?php include __DIR__ . '/../templates/components/layout/header.php'; ?>
    <section id="club_container">

        <?php include __DIR__ . '/../templates/components/layout/menu_club.php'; ?>

        <div class="container_club">

            <section id="club_presentation">
                <div class="container_presentation">
                    <div id="title_club">
                        <h1>Présentation</h1>
                    </div>
                    <div class="content_presentation">
                        <div id="presentation">
                            <p> 
                                Implanté au Centre Marcel Baratta depuis des années, l'ACOO bénéficie 
                                d'installations spacieuses :
                            </p>
                            <div class="box color1">
                                Le club house (avec un espace détente, une terrasse et une table pour les repas, réunion, etc)
                            </div>
                            <div class="box color2">
                                Le garage à bateaux et ses trois travées, abritant 82 bateaux, du skiff au huit
                            </div>
                            <div class="box color3">
                                Le tank à ramer
                            </div>
                            <div class="box color4">
                                La salle de musculation et ergomètres.
                            </div>
                        </div>
                        <div class="carousel">
                            <button class="carousel-button prev">&#10094;</button>
                            <div class="carousel-window">
                                <div class="carousel-track">
                                <img src="" alt="1">
                                <img src="" alt="2">
                                <img src="" alt="3">
                                <img src="" alt="4">
                                <img src="" alt="5">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                <img src="" alt="6">
                                </div>
                            </div>
                            <button class="carousel-button next">&#10095;</button>
                        </div>
                    </div>
                </div>
            </section>
    
            <section id="club_histoire">
                <div id="title_club">
                    <h1>Histoire</h1>
                </div>
                <div class="timeline-container">
                    <div class="timeline" id="timeline">
                        <!-- Cercles des années -->
                        <div class="cercle">
                        <div class="year selected" data-year="1882">1882</div>
                        <div class="year" data-year="1900">1900</div>
                        <div class="year" data-year="1920">1920</div>
                        <div class="year" data-year="1926">1926</div>
                        <div class="year" data-year="1955">1955</div>
                        <div class="year" data-year="1958">1958</div>
                        <div class="year" data-year="1970">1970</div>
                        <div class="year" data-year="1982">1982</div>
                        <div class="year" data-year="1992">1992</div>
                        <div class="year" data-year="1994">1994</div>
                        <div class="year" data-year="2025">2025</div>
                        <div class="line"></div>
                        </div>
                    </div>

                    <!-- Contenu associé -->
                    <div class="content" id="content">
                        <img src="image2000.jpg" alt="2000">
                        <p>Description pour l’année 2000.</p>
                    </div>
                    </div>
            </section>
    
            <section id="club_equipe">
                <div id="title_club">
                    <h1>Equipe</h1>
                </div>
                <div class="container_equipe">
                    <!-- Peut etre faire un composant par la suite -->
                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                        </div>
                        <div class="container_social">
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>                            
                            </div>
                    </div>

                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                            <span>
                                email
                            </span>
                        </div>
                       
                    </div>

                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                        </div>
                        <div class="container_social">
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>                            
                            </div>
                    </div>

                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                        </div>
                        <div class="container_social">
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>                            
                            </div>
                    </div>

                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                        </div>
                        <div class="container_social">
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>                            
                            </div>
                    </div>
                    
                    <div class="container_card">
                        <div class="container_img">
                            <img src="" alt="">
                        </div>
                        <div class="container_info">
                            <h4>
                                Patrick HENRY
                            </h4>
                            <span>
                                Manager
                            </span>
                        </div>
                        <div class="container_social">
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>
                            <a href=""><img src="" alt=""></a>                            
                            </div>
                    </div>
                </div>
    
            </section>
    
            <section id="club_sports">
                <div id="title_club">
                    <h1>Sports</h1>
                </div>

               <div class="carousel-wrapper">
                    <button class="carousel-btn left" onclick="scrollCarousel(-1)">‹</button>

                    <div class="carousel" id="carousel">
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Rivière</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Indoor</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Avifit</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Para Aviron</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Santé</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Rivière</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Indoor</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Avifit</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Para Aviron</span></div>
                        <div class="aviron-item"><img src="../assets/images/Galerie1.png"><span class="aviron-title">Aviron Santé</span></div>
                        <!-- Ajoute ici d'autres éléments si tu veux tester -->
                    </div>

                    <button class="carousel-btn right" onclick="scrollCarousel(1)">›</button>
                </div>
                    
            </section>
    
            <section id="club_lieux">
                <div id="title_club">
                    <h1>Lieux de pratique</h1>
                </div>
                <div style="margin-bottom: 10px; padding: 10px;">
                    <button onclick="afficherParcours(parcours_foret, 'green')">🌲 Forêt</button>
                    <button onclick="afficherParcours(parcours_camping, 'orange')">🏕️ Camping</button>
                    <button onclick="afficherParcours(parcour_club, 'blue')">🚣 Club</button>
                </div>
                
                <div id="map" class="map leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">
                    <script>
                        const map = L.map('map').setView([47.8570, 1.9181], 14);

                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);

                        const parcours_foret = [
                            [47.86806, 1.90457],
                            [47.86827, 1.90516],
                            [47.86711, 1.90826],
                            [47.86299, 1.91342],
                            [47.85962, 1.91759],
                            [47.85855, 1.91933],
                            [47.85829, 1.92023]
                        ];

                        const parcours_camping = [
                            [47.86806, 1.90457],
                            [47.86827, 1.90516],
                            [47.86711, 1.90826],
                            [47.86299, 1.91342],
                            [47.85962, 1.91759],
                            [47.85855, 1.91933],
                            [47.85829, 1.92023],
                            [47.85763, 1.92259],
                            [47.85725, 1.92343],
                            [47.85722, 1.92363],
                            [47.85712, 1.92391],
                            [47.85654, 1.92447],
                            [47.85627, 1.92455],
                            [47.85615, 1.92469],
                            [47.85606, 1.92487],
                            [47.85578, 1.92516]
                        ];

                        const parcour_club = [
                            [47.86806, 1.90457],
                            [47.86827, 1.90516],
                            [47.86711, 1.90826],
                            [47.86299, 1.91342],
                            [47.85962, 1.91759],
                            [47.85855, 1.91933],
                            [47.85763, 1.92259],
                            [47.85725, 1.92343],
                            [47.85695, 1.92366],
                            [47.85611, 1.92393],
                            [47.85571, 1.92442],
                            [47.85559, 1.92480],
                            [47.85503, 1.92563],
                            [47.85493, 1.92593],
                            [47.85267, 1.93045]
                        ];

                        let currentPolyline = null;

                        function afficherParcours(parcours, color = 'blue') {
                            if (currentPolyline) {
                                map.removeLayer(currentPolyline);
                            }

                            currentPolyline = L.polyline(parcours, {
                                color: color,
                                weight: 4,
                                opacity: 0.8
                            }).addTo(map);

                            map.fitBounds(currentPolyline.getBounds());
                        }

                        const pointDepart = L.marker([47.86774, 1.90447]).addTo(map);
                        pointDepart.bindTooltip("🏁 Départ du parcours", {
                            permanent: true,
                            direction: "top",
                            offset: [0, -10],
                            className: "custom-tooltip"
                        });

                        // Afficher parcours forêt par défaut
                        afficherParcours(parcours_foret, 'green');

                        // Affichage des coordonnées au clic
                        map.on('click', function (e) {
                            const lat = e.latlng.lat.toFixed(5);
                            const lng = e.latlng.lng.toFixed(5);
                            console.log(`Latitude : ${lat}, Longitude : ${lng}`);
                            L.popup()
                                .setLatLng(e.latlng)
                                .setContent(`📍<strong>Lat :</strong> ${lat}<br><strong>Lng :</strong> ${lng}`)
                                .openOn(map);
                        });
                    </script>

                </div>

            </section>
    
            <section id="club_partenaire">
                <div id="title_club">
                    <h1>Partenaire</h1>
                </div>

                <div class="partenaire-gallery">
                    <div class="sponsor-logo" data-title="Nike" data-description="Sponsor officiel du club depuis 2021.">
                        <img src="http://s3.gomedia.us/wp-content/uploads/2015/05/Nike_Swoosh_Logo_Black_original.jpg" alt="Nike">
                    </div>
                    <div class="sponsor-logo" data-title="Red Bull" data-description="Partenaire des événements nationaux.">
                        <img src="http://www.pixelstalk.net/wp-content/uploads/2016/07/Red-Bull-Logo-Desktop-Wallpaper.jpg" alt="Red Bull">
                    </div>
                    <div class="sponsor-logo" data-title="Decathlon" data-description="Fournisseur officiel de matériel.">
                        <img src="https://www.danstapub.com/wp-content/uploads/2024/03/Wolff_Olins_Decathlon_Press_02_Logo_1920x1280-1536x1024.jpg" alt="Decathlon">
                    </div>
                    
                </div>

                <!-- Popup -->
                <div class="popup-overlay">
                    <div class="popup-content">
                        <img class="popup-logo" src="" alt="">
                        <h2 class="popup-title"></h2>
                        <p class="popup-description"></p>
                        <button class="popup-close">Fermer</button>
                    </div>
                </div>
            </section>
    
            <section id="club_sponsors">
                <div id="title_club">
                    <h1>Sponsors</h1>
                </div>

                <div class="sponsors-gallery">
                    <div class="sponsor-logo" data-title="Nike" data-description="Sponsor officiel du club depuis 2021.">
                        <img src="http://s3.gomedia.us/wp-content/uploads/2015/05/Nike_Swoosh_Logo_Black_original.jpg" alt="Nike">
                    </div>
                    <div class="sponsor-logo" data-title="Red Bull" data-description="Partenaire des événements nationaux.">
                        <img src="http://www.pixelstalk.net/wp-content/uploads/2016/07/Red-Bull-Logo-Desktop-Wallpaper.jpg" alt="Red Bull">
                    </div>
                    <div class="sponsor-logo" data-title="Decathlon" data-description="Fournisseur officiel de matériel.">
                        <img src="https://www.danstapub.com/wp-content/uploads/2024/03/Wolff_Olins_Decathlon_Press_02_Logo_1920x1280-1536x1024.jpg" alt="Decathlon">
                    </div>
                    
                </div>

                <!-- Popup -->
                <div class="popup-overlay">
                    <div class="popup-content">
                        <img class="popup-logo" src="" alt="">
                        <h2 class="popup-title"></h2>
                        <p class="popup-description"></p>
                        <button class="popup-close">Fermer</button>
                    </div>
                </div>
    
            </section>
        </div>

    </section>

    <?php include __DIR__ . '/../templates/components/layout/footer.php'; ?>
    <script type="module" src="../script/pages/club.js"></script>
    <script src="../script/club.js"></script>
    <script src="../script/histoire.js"></script>
    <script src="../script/sport.js"></script>
    <script src="../script/navbar.js"></script>
   
    
    
</body>
</html>