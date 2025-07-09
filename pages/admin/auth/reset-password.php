<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Réinitialiser le mot de passe - ACOO Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="login-body">
  <div class="login-container">
    <img src="/assets/images/Logo.png" alt="Logo ACOO" class="login-logo" />
    <div class="login-title">Nouveau mot de passe</div>
    <p style="text-align: center; color: #666; margin-bottom: 1.5rem; font-size: 0.95rem;">
      Choisissez un nouveau mot de passe sécurisé pour votre compte.
    </p>
    
    <div class="login-error" id="reset-error"></div>
    <div class="login-success" id="reset-success" style="display: none; color: #00d876; background: #e8f5e8; border-radius: 6px; padding: 0.7rem 1rem; margin-bottom: 1rem; font-size: 0.98rem; text-align: center;">
      Votre mot de passe a été réinitialisé avec succès !
    </div>
   
    <form class="form" id="reset-form" autocomplete="on">
      <div class="form__group">
        <input class="form__input" type="password" placeholder="" id="newPassword" name="newPassword" required autocomplete="new-password" minlength="6">
        <label class="form__label" for="newPassword">Nouveau mot de passe</label>
      </div>
      
      <div class="form__group">
        <input class="form__input" type="password" placeholder="" id="confirmPassword" name="confirmPassword" required autocomplete="new-password" minlength="6">
        <label class="form__label" for="confirmPassword">Confirmer le mot de passe</label>
      </div>
      
      <button type="submit" class="login-btn">Réinitialiser</button>
    </form>
   
    <div class="cta-container" style="margin-top:1.2rem;font-size:0.98rem;text-align:center;">
      <a href="/pages/admin/auth/login.php" style="color:#39496B;text-decoration:underline;">Retour à la connexion</a>
    </div>
  </div>
  
  <script type="module">
    import { resetPassword } from '/service/api/auth.js';

    const form = document.getElementById('reset-form');
    const errorDiv = document.getElementById('reset-error');
    const successDiv = document.getElementById('reset-success');

    // Récupérer le token depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Vérifier si le token est présent
    if (!token) {
      errorDiv.textContent = 'Token de réinitialisation manquant ou invalide.';
      errorDiv.style.display = 'block';
      form.style.display = 'none';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';
      
      const newPassword = form.newPassword.value;
      const confirmPassword = form.confirmPassword.value;
      const submitButton = form.querySelector('.login-btn');

      // Vérifier que les mots de passe correspondent
      if (newPassword !== confirmPassword) {
        errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
        errorDiv.style.display = 'block';
        return;
      }

      // Vérifier la longueur minimale
      if (newPassword.length < 6) {
        errorDiv.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        errorDiv.style.display = 'block';
        return;
      }

      try {
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle; color:white;"></span>`;
        
        const message = await resetPassword(token, newPassword);
        
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        form.reset();
        
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          window.location.href = '/pages/admin/auth/login.php';
        }, 2000);
        
      } catch (err) {
        console.error(err);
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Réinitialiser';
      }
    });

    // Validation en temps réel pour la confirmation du mot de passe
    const confirmPasswordField = document.getElementById('confirmPassword');
    const newPasswordField = document.getElementById('newPassword');

    confirmPasswordField.addEventListener('input', () => {
      if (confirmPasswordField.value && newPasswordField.value) {
        if (confirmPasswordField.value !== newPasswordField.value) {
          confirmPasswordField.setCustomValidity('Les mots de passe ne correspondent pas');
        } else {
          confirmPasswordField.setCustomValidity('');
        }
      }
    });

    newPasswordField.addEventListener('input', () => {
      if (confirmPasswordField.value && newPasswordField.value) {
        if (confirmPasswordField.value !== newPasswordField.value) {
          confirmPasswordField.setCustomValidity('Les mots de passe ne correspondent pas');
        } else {
          confirmPasswordField.setCustomValidity('');
        }
      }
    });
  </script>
</body>
</html>
