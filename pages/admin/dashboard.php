<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/styles.css">
    <title>Dashboard</title>
</head>
<body>
    
        
    <?php 
        include "../../templates/components/menu_dashboard.html"
    ?>
    
    <div class="container_dashboard">

        <div class="dashboard-title">
            <h1>TABLEAU DE BORD</h1>
        </div>

        <div class="container-dashboard-graphic">

            <div class="dashboard-graphic">
                <img src="../../assets/images/graph-dashboard.png" alt="graphic">
            </div>

            <div class="graphic-index">

                <div class="index">
                    <span><b>Utilisateurs actifs</b></span>
                    <span ><b class="vert">(+23)</b>que la semaine dernière</span>
                </div>

                <div class="index">
                    <div><img src="../../assets/images/dashboard-icon-viewers.png" alt="icon">Visiteurs</div>
                    <span><b>32,984</b></span>
                </div>

                <div class="index">
                    <div><img src="../../assets/images/dashboard-icon-clicks.png" alt="icon">Clicks</div>
                    <span><b>2,45m</b></span>
                </div>

            </div>

        </div>

        <div class="container-dashbord-burger-calendar">
            <div class="dashboard-burger">
                <img src="../../assets/images/dashboard-burger.png" alt="graphic pizza">
            </div>
            <div class="dashboard-calendar">
                <img src="../../assets/images/dashboard-calendar.png" alt="calendar">
            </div>
        </div>

        <div class="container-dashboard-profil">

            <div class="dashboard-profil-title">
                <h2>PROFIL</h2>
            </div>

            <form action="#" method="POST">

                <div class="dashboard-profil-info-display"> 
                    <div class="dashboard-profil-info">
                        <div class="profil-info">
                            <label for="email">Mail</label>
                            <input type="email" id="email" name="email" required placeholder="Entrez votre email">
                        </div>
                        <div class="profil-info-croix">
                            <img src="../../assets/images/croix.png" alt="fermer">
                        </div>
                    </div>

                    <div class="dashboard-profil-info">
                        <div class="profil-info">
                            <label for="telephone">Téléphone</label>
                            <input type="tel" id="telephone" name="telephone" required placeholder="Entrez votre numéro de téléphone">
                        </div>
                        <div class="profil-info-croix">
                            <img src="../../assets/images/croix.png" alt="fermer">
                        </div>
                    </div>
                </div>
                <div class="dashboard-profil-info-display-solo"> 
                    <div class="dashboard-profil-info">
                        <div class="profil-info">
                            <label for="adresse">Adresse</label>
                            <input type="text" id="adresse" name="adresse" required placeholder="Entrez votre adresse">
                        </div>
                        <div class="profil-info-croix">
                            <img src="../../assets/images/croix.png" alt="fermer">
                        </div>
                    </div>
                </div>  

                <div class="dashboard-profil-info-btn">
                    <button class="custom-btn"></button>
                </div>
            </form>
            
        </div>           
        <div class="dashboard-retour-site">
            <a href="#">ACCEDER AU SITE</a>
        </div>
    </div>
        
    
</body>
</html>