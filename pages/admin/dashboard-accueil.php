<main class="accueil_dashboard">

  <div class="dashboard-title">
    <h1>TABLEAU DE BORD</h1>
  </div>

  <div class="accueil_dashboard-graphic">
    <div class="dashboard-graphic">
      <img src="../../assets/images/graph-dashboard.png" alt="graphic">
    </div>
    <div class="graphic-index">
      <div class="index">
        <span><b>Active Users</b></span>
        <span><b class="vert">(+23)</b> than last week.</span>
      </div>
      <div class="index">
        <div><img src="../../assets/images/dashboard-icon-viewers.png" alt="icon">Viewers</div>
        <span><b>32,984</b></span>
      </div>
      <div class="index">
        <div><img src="../../assets/images/dashboard-icon-clicks.png" alt="icon">Clicks</div>
        <span><b>2,42m</b></span>
      </div>
    </div>
  </div>

  <div class="accueil-dashbord-burger-calendar">
    <div class="dashboard-burger">
      <img src="../../assets/images/dashboard-burger.png" alt="graphic pizza">
    </div>
    <button style="border: none;">
          <div class="dashboard-calendar">
      <img src="../../assets/images/dashboard-calendar.png" alt="calendar">
    </div>
    </button>

  </div>

  <div class="container-dashboard-profil">
    <div class="dashboard-profil-title">
      <h2>PROFIL</h2>
    </div>
    <form id="form-dashboard-profil" class="dashboard-profil-form">
            <div class="dashboard-profil-info-display-solo">
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="username">Identité</label>
            <input disabled type="text" id="username" name="username">
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div class="dashboard-profil-info-display">
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="email">Mail</label>
            <input type="email" id="email" name="email" required >
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="telephone">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" disabled >
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div class="dashboard-profil-info-display-solo">
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="adresse">Adresse</label>
            <input disabled type="text" id="address" name="address" >
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div class="dashboard-profil-info-btn">
        <button type="submit" class="btn-primary">ACCEDER A MON PROFIL</button>
      </div>
    </form>
  </div>
  <div class="dashboard-retour-site">
    <a href="#">ACCÉDER AU SITE</a>
  </div>
</main>