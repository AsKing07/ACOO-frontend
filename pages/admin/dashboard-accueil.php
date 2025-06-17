<main class="accueil_dashboard">
  <div class="dashboard-title">
    <h1>Tableau de bord analytique</h1>
  </div>

  <!-- Métriques en temps réel et agrégées -->
  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="card__body">
          <div class="stat-content">
            <div class="stat-icon realtime-icon">⚡</div>
            <div class="stat-info">
              <h3 id="realtime-visitors">--</h3>
              <p>Visiteurs actuels</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="card__body">
          <div class="stat-content">
            <div class="stat-icon visitors-icon">👥</div>
            <div class="stat-info">
              <h3 id="total-visitors">--</h3>
              <p>Visiteurs uniques (7j)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="card__body">
          <div class="stat-content">
            <div class="stat-icon pageviews-icon">📄</div>
            <div class="stat-info">
              <h3 id="total-pageviews">--</h3>
              <p>Pages vues</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="card__body">
          <div class="stat-content">
            <div class="stat-icon bounce-icon">⏱️</div>
            <div class="stat-info">
              <h3 id="visits">--</h3>
              <p>Nombre de visites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Graphique des visiteurs -->
  <section class="chart-section">
    <div class="card">
      <div class="card__body">
        <h3 class="section-title">Visiteurs (7 derniers jours)</h3>
        <div class="chart-container">
          <canvas id="visitors-chart"></canvas>
        </div>
      </div>
    </div>
  </section>

  <!-- Tables des données -->
  <section class="tables-section">
    <div class="tables-grid">
      <!-- Pages populaires -->
      <div class="card">
        <div class="card__body">
          <h3 class="section-title">Pages populaires</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Visiteurs</th>
                </tr>
              </thead>
              <tbody id="pages-table">
                <!-- Les données seront injectées ici par JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Trafic par pays -->
      <div class="card">
        <div class="card__body">
          <h3 class="section-title">Trafic par pays</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Pays</th>
                  <th>Visiteurs</th>
                </tr>
              </thead>
              <tbody id="countries-table">
                <!-- Les données seront injectées ici par JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section profil  -->
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
            <input type="email" id="email" name="email" required>
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="telephone">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" disabled>
          </div>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div class="dashboard-profil-info-display-solo">
        <div class="dashboard-profil-info">
          <div class="profil-info">
            <label for="adresse">Adresse</label>
            <input disabled type="text" id="address" name="address">
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
    <a href="/">ACCÉDER AU SITE</a>
  </div>

  <!-- Indicateur de chargement -->
  <div id="loading-indicator" class="loading-overlay hidden">
    <div class="loading-spinner"></div>
  </div>
</main>