
<!-- Vérifier si user existe dans le localStorage sinon rediriger vers login -->
<script type="module">
  import { verifyTokenValidity } from '/service/api/auth.js';

  // Fonction utilitaire pour rediriger vers la page de connexion
  function redirectToLogin(message = null) {
    if (message) {
      console.log(message);
      alert('Session expirée ou utilisateur non autorisé. Vous serez redirigé vers la page de connexion.');
    }
    localStorage.removeItem('user');
    window.location.href = '/pages/admin/auth/login.php';
  }

  // Vérification de l'authentification
  async function checkAuthentication() {
    const user = localStorage.getItem('user');
    
    if (!user) {
      redirectToLogin();
      return;
    }

    try {
      const userData = JSON.parse(user);
      const token = userData?.tokenData?.token;
      console.log('Token trouvé:', token);

      if (!token) {
        redirectToLogin('Token non trouvé');
        return;
      }

      const isValid = await verifyTokenValidity(token);
      if (!isValid) {
        redirectToLogin('Vérification échouée');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification d\'authentification:', error);
      redirectToLogin();
    }
  }

  // Exécuter la vérification
  checkAuthentication();
</script>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/styles.css">
  <script src="https://kit.fontawesome.com/5563162149.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap" rel="stylesheet">

</head>
<body class="dashboard-body">
<div class="dashboard-layout">
  <aside class="dashboard-sidebar">
    <?php include '../../templates/components/layout/menu_dashboard.php'; ?>
  </aside>
  <main id="dashboard-content" class="dashboard-main">
    <!-- contenu dynamique -->
    <h1>Bienvenue dans le Dashboard Admin</h1>
    <p>Utilisez le menu à gauche pour naviguer entre les différentes sections.</p>
  </main>
</div>

  <script src="/script/admin/dashboard.js" type="module">
  </script>

</body>
</html>