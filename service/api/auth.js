import {User} from '../models/User.js';
import {API_BASE_URL} from '../config.js';

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

    if (!response.ok) {
    const errorData = await response.json();
    
    throw new Error(errorData.message || 'Erreur de connexion');
 
  }
    const data = await response.json();
    const user = User.fromApi(data);
    console.log('Utilisateur connecté:', user);
  localStorage.setItem('user', JSON.stringify(user));
  return user;

}

export async function logout() {
    localStorage.removeItem('user');
    // rediriger vers la page de connexion ou d'accueil
    window.location.href = '/admin/auth/login.html'; 
}

export async function register(username, email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });
    if (!response.ok) {
    const errorData = await response.json();
   
    if (response.status === 400) {
      const errorMessages = errorData.errors || [];
      throw new Error(errorMessages.join(' '));
    }

    throw new Error(errorData.message || 'Erreur d\'inscription');
  }
return response.status === 201;

}

export async function getUser() {
  const user = localStorage.getItem('user');
  if (user) {
    return User.fromApi(JSON.parse(user));
  }
  return null;
}

export async function forgotPassword(email)
{
  const response = await fetch(`${API_BASE_URL}/admin/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la demande de réinitialisation du mot de passe');
  }
  
  // Le backend se charge d'envoyer l'email avec le token
  return data.message || 'Un lien de réinitialisation a été envoyé à votre adresse email';
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_BASE_URL}/admin/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, password })
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la réinitialisation du mot de passe');
  }
  return data.message || 'Mot de passe réinitialisé avec succès';

}

export async function verifyTokenValidity(token = null) {
  // Si aucun token n'est fourni, récupérer celui de l'utilisateur connecté
  if (!token) {
    const user = await getUser();
    if (!user || !user.tokenData) {
      return false;
    }
    token = user.tokenData.token;
    
    // Vérifier d'abord la validité locale du token
    if (!user.isTokenValid()) {
      return false;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok || response.status === 401) {
      return false; // Token invalide ou expiré
    }
    
    return true; // Token valide
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

// Fonction helper pour vérifier l'authentification avant les requêtes API
export async function ensureAuthenticated() {
  const isValid = await verifyTokenValidity();
  
  if (!isValid) {
    alert('Votre session a expiré. Vous allez être redirigé vers la page de connexion.');
    localStorage.removeItem('user');
    window.location.href = '/pages/admin/auth/login.php';
    throw new Error('Token invalide ou expiré');
  }
  
  return true;
}
