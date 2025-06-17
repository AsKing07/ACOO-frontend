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



  <div class="dashboard-retour-site">
    <a href="/">ACCÉDER AU SITE</a>
  </div>

  <!-- Indicateur de chargement -->
  <div id="loading-indicator" class="loading-overlay hidden">
    <div class="loading-spinner"></div>
  </div>
</main>