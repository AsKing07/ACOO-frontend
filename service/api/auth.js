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


