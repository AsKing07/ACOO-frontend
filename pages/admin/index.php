
<!-- Vérifier si user existe dans le localStorage sinon rediriger vers login -->
<script type="module">
  import { verifyTokenValidity } from '/service/api/auth.js';
const user = localStorage.getItem('user');

// if (!user) {
//   window.location.href = '/pages/admin/auth/login.php';
// } else {
//   try {
//     const userData = JSON.parse(user);
//     const token = userData.tokenData.token;
   
//     if (
//       !token 
//     ) {


//     alert('Session expirée ou utilisateur non autorisé. Vous serez redirigé vers la page de connexion.');
//     // Redirection vers la page de connexion
//     localStorage.removeItem('user'); // Nettoyer le localStorage
//       window.location.href = '/pages/admin/auth/login.php';
//     }
//     else{
//      const isValid = await verifyTokenValidity(token);
//       if (!isValid) {
//         alert('Session expirée ou utilisateur non autorisé. Vous serez redirigé vers la page de connexion.');
//         // Redirection vers la page de connexion
//         localStorage.removeItem('user'); // Nettoyer le localStorage
//         window.location.href = '/pages/admin/auth/login.php';
//       }
//     }
//   } catch (e) {
//     window.location.href = '/pages/admin/auth/login.php';
//   }
// }
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