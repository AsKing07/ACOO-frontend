<main id="container_admin">
  <div class="container_dashboard_admin">
    <!-- Bouton toggle -->
    <div>
        <button id="toggleFormBtn" class="btn-primary">Ajouter un administrateur</button>
        <button id="toggleViewBtn" class="btn-primary">Afficher mon profil</button>
    </div>

    <!-- Formulaire d'ajout d'administrateur -->
    <form id="adminForm" class="hidden">
      <h2>Ajouter un administrateur</h2>
      <input type="text" placeholder="Nom d'utilisateur">
      <input type="email" placeholder="Email">
      <input type="tel" placeholder="Téléphone">
      <input type="text" placeholder="Adresse">
      <button type="submit" class="btn-primary">Ajouter</button>
    </form>
    

    <!-- Tableau des administrateurs -->
    <section id="adminListSection">
        <h2>Liste des administrateurs</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>admin01</td>
                    <td>admin01@mail.com</td>
                    <td>0600000001</td>
                    <td>123 rue des Lilas</td>
                </tr>
                <tr>
                    <td>admin02</td>
                    <td>admin02@mail.com</td>
                    <td>0600000002</td>
                    <td>456 avenue des Roses</td>
                </tr>
            </tbody>
        </table>
    </section>

    <!-- Section de modification -->
    <section id="adminProfileSection" class="hidden">
        <h2>Modifier mon profil</h2>
        <ul class="modification-section">
            <li><input type="text" placeholder="Modifier le nom d'utilisateur"></li>
            <li><input type="email" placeholder="Modifier l'email"></li>
            <li><input type="tel" placeholder="Modifier le téléphone"></li>
            <li><input type="text" placeholder="Modifier l'adresse"></li>
            <li><button class="btn-primary">Sauvegarder</button></li>
        </ul>
    </section>
</main>