<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Connexion - ACOO Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/styles.css">

</head>
<body class="login-body">
  <div class="login-container">
    <img src="/assets/images/Logo.png" alt="Logo ACOO" class="login-logo" />
    <div class="login-title">Connexion à l'espace admin</div>
    <div class="login-error" id="login-error"></div>
   
         <form class="form" id="login-form" autocomplete="on">
      
        <div class="form__group">
            <input class="form__input" type="text" placeholder="" id="username" name="username" required autocomplete="username">
            <label class="form__label" for="username">Nom d'utilisateur</label>
        </div>
      <div class="form__group">
        <input class="form__input" placeholder="" type="password" id="password" name="password" required autocomplete="current-password">
        <label class="form__label" for="password">Mot de passe</label>
        
      </div>
      <button type="submit" class="login-btn">Se connecter</button>
    </form>
   
    <div class="cta-container" style="margin-top:1.2rem;font-size:0.98rem;text-align:center;">
      <a href="/pages/admin/auth/forgot-password.php" style="color:#39496B;text-decoration:underline;">Mot de passe oublié ?</a>
    </div>
   
   
    <!-- <div class="cta-container" style="margin-top:1.2rem;font-size:0.98rem;">
      <a href="/pages/admin/auth/register.php" style="color:#39496B;text-decoration:underline;">Créer un compte</a>
    </div> -->
  </div>
  <script type="module">
    import { login } from '/service/api/auth.js';

    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
      const username = form.username.value.trim();
      const password = form.password.value;
      const loginButton = form.querySelector('.login-btn');

      try {
        
        loginButton.disabled = true; // Désactiver le bouton pour éviter les soumissions multiples
        loginButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle; color:white;"></span>`;
        await login(username, password);
         window.location.href = '/pages/admin/index.php';
      
      } catch (err) {
        console.error(err);
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
        loginButton.disabled = false; // Reactiver le bouton après une erreur
        loginButton.innerHTML = 'Se connecter'; // Réinitialiser le texte du bouton
      }
    });
  </script>
</body>
</html>