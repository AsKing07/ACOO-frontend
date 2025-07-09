<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mot de passe oublié - ACOO Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="login-body">
  <div class="login-container">
    <img src="/assets/images/Logo.png" alt="Logo ACOO" class="login-logo" />
    <div class="login-title">Mot de passe oublié</div>
    <p style="text-align: center; color: #666; margin-bottom: 1.5rem; font-size: 0.95rem;">
      Entrez votre adresse email pour recevoir un lien de réinitialisation de votre mot de passe.
    </p>
    
    <div class="login-error" id="forgot-error"></div>
    <div class="login-success" id="forgot-success" style="display: none; color: #00d876; background: #e8f5e8; border-radius: 6px; padding: 0.7rem 1rem; margin-bottom: 1rem; font-size: 0.98rem; text-align: center;">
      Un lien de réinitialisation a été envoyé à votre adresse email.
    </div>
   
    <form class="form" id="forgot-form" autocomplete="on">
      <div class="form__group">
        <input class="form__input" type="email" placeholder="" id="email" name="email" required autocomplete="email">
        <label class="form__label" for="email">Adresse email</label>
      </div>
      
      <button type="submit" class="login-btn">Envoyer le lien</button>
    </form>
   
    <div class="cta-container" style="margin-top:1.2rem;font-size:0.98rem;text-align:center;">
      <a href="/pages/admin/auth/login.php" style="color:#39496B;text-decoration:underline;">Retour à la connexion</a>
    </div>
  </div>
  
  <script type="module">
    import { forgotPassword } from '/service/api/auth.js';

    const form = document.getElementById('forgot-form');
    const errorDiv = document.getElementById('forgot-error');
    const successDiv = document.getElementById('forgot-success');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';
      
      const email = form.email.value.trim();
      const submitButton = form.querySelector('.login-btn');

      try {
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="loader" style="width:18px;height:18px;border-width:3px;vertical-align:middle; color:white;"></span>`;
        
        await forgotPassword(email);
        
        successDiv.style.display = 'block';
        form.reset();
        
        // Optionnel: rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          window.location.href = '/pages/admin/auth/login.php';
        }, 3000);
        
      } catch (err) {
        console.error(err);
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Envoyer le lien';
      }
    });
  </script>
</body>
</html>
